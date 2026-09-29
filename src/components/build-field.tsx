"use client"

import { useEffect, useRef, useState } from "react"
import type { ReleaseStats } from "@/lib/types"

// Every square is one Fedora source package. Statuses: built, not yet, needs porting, on hold.
const BASE = ["#2E78C2", "#131F48", "#E0A10E", "#46507A"]
const HOT = ["#FFE9A8", "#5C8FD6", "#FFF4CF", "#8C97C4"]
const LEVELS = 16
const INTRO_MS = 2600
const CELL_FADE_MS = 520

function mix(a: string, b: string, t: number) {
  const A = parseInt(a.slice(1), 16)
  const B = parseInt(b.slice(1), 16)
  const r = (A >> 16) + ((B >> 16) - (A >> 16)) * t
  const g = ((A >> 8) & 255) + (((B >> 8) & 255) - ((A >> 8) & 255)) * t
  const c = (A & 255) + ((B & 255) - (A & 255)) * t
  return `rgb(${r | 0},${g | 0},${c | 0})`
}
const PALETTE = BASE.map((b, s) => Array.from({ length: LEVELS + 1 }, (_, k) => mix(b, HOT[s], k / LEVELS)))

function rng(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const pct = (r: ReleaseStats) => ((100 * r.built) / r.total).toFixed(1)
const fmt = (n: number) => n.toLocaleString("en-US")

type Ripple = { x: number; y: number; t: number; v: number; life: number }

export function BuildField({ releases, statsSource, children }: { releases: ReleaseStats[]; statsSource: string; children: React.ReactNode }) {
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pctRef = useRef<HTMLSpanElement>(null)
  const subRef = useRef<HTMLElement>(null)
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const section = sectionRef.current!
    const canvas = canvasRef.current!
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    const rel = releases[current]
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches

    let W = 0, H = 0, P = 0
    let cx = new Float32Array(0), cy = new Float32Array(0)
    let status = new Uint8Array(0), start = new Float32Array(0)
    let ripples: Ripple[] = []
    let baseLayer: HTMLCanvasElement | null = null
    let mouse: { x: number; y: number } | null = null
    let visible = true
    let raf = 0
    let t0 = performance.now()

    const layout = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2)
      W = section.clientWidth
      H = section.clientHeight
      canvas.width = (W * dpr) | 0
      canvas.height = (H * dpr) | 0
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      baseLayer = null
      const n = rel.total
      P = Math.sqrt((W * H) / n)
      let cols = Math.ceil(W / P)
      let rows = Math.ceil(n / cols)
      while (rows * P < H - P) { P += 0.01; cols = Math.ceil(W / P); rows = Math.ceil(n / cols) }
      while (rows * P > H + P * 0.5) { P -= 0.01; cols = Math.ceil(W / P); rows = Math.ceil(n / cols) }
      const ox = (W - cols * P) / 2, oy = (H - rows * P) / 2
      cx = new Float32Array(n); cy = new Float32Array(n)
      for (let i = 0; i < n; i++) {
        cx[i] = ox + (i % cols) * P + P / 2
        cy[i] = oy + ((i / cols) | 0) * P + P / 2
      }
    }

    const seed = () => {
      const n = rel.total
      const rnd = rng(n)
      const all: number[] = []
      const push = (v: number, k: number) => { for (let i = 0; i < k; i++) all.push(v) }
      push(0, rel.built); push(1, rel.todo); push(2, rel.port); push(3, rel.hold)
      for (let i = n - 1; i > 0; i--) { const j = (rnd() * (i + 1)) | 0; [all[i], all[j]] = [all[j], all[i]] }
      status = Uint8Array.from(all)
      // builders ignite from the right half so the wave rolls in behind the headline
      const seeds = Array.from({ length: 6 }, () => [W * (0.45 + rnd() * 0.55), H * rnd()])
      const d = new Float32Array(n)
      let max = 0
      for (let i = 0; i < n; i++) {
        let m = Infinity
        for (const s of seeds) { const dx = cx[i] - s[0], dy = cy[i] - s[1], v = dx * dx + dy * dy; if (v < m) m = v }
        d[i] = Math.sqrt(m) + rnd() * P * 5
        if (d[i] > max) max = d[i]
      }
      start = new Float32Array(n)
      for (let i = 0; i < n; i++) start[i] = (d[i] / max) * INTRO_MS
    }

    const frame = (now: number) => {
      const el = reduce ? Infinity : now - t0
      const n = rel.total, s = P * 0.72, off = (P - s) / 2
      // base colors, grouped by status to keep fillStyle changes low
      const drawBase = (c: CanvasRenderingContext2D) => {
        c.fillStyle = "#070D22"
        c.fillRect(0, 0, W, H)
        for (let g = 0; g < 4; g++) {
          c.fillStyle = BASE[g]
          for (let i = 0; i < n; i++) {
            if ((el < start[i] ? 1 : status[i]) !== g) continue
            c.fillRect(cx[i] - P / 2 + off, cy[i] - P / 2 + off, s, s)
          }
        }
      }
      if (el < INTRO_MS + CELL_FADE_MS) {
        drawBase(ctx)
      } else {
        // after the intro the base layer never changes: draw it once, then blit
        if (!baseLayer) {
          baseLayer = document.createElement("canvas")
          baseLayer.width = canvas.width
          baseLayer.height = canvas.height
          const bctx = baseLayer.getContext("2d")!
          bctx.setTransform(canvas.width / W, 0, 0, canvas.height / H, 0, 0)
          drawBase(bctx)
        }
        ctx.drawImage(baseLayer, 0, 0, W, H)
      }
      // highlights: intro wavefront, ripples, pointer lamp
      let lit = 0
      for (let i = 0; i < n; i++) {
        let h = 0
        const k = (el - start[i]) / CELL_FADE_MS
        if (k >= 0) { if (status[i] === 0) lit++; if (k < 1 && status[i] !== 1) h = 1 - k }
        for (const r of ripples) {
          const age = (now - r.t) / 1000, R = age * r.v
          const dx = cx[i] - r.x, dy = cy[i] - r.y
          const dd = Math.abs(Math.sqrt(dx * dx + dy * dy) - R), band = P * 3.2
          if (dd < band) { const f = (1 - dd / band) * Math.max(0, 1 - age / r.life); if (f > h) h = f }
        }
        if (mouse) {
          const dx = cx[i] - mouse.x, dy = cy[i] - mouse.y, d2 = dx * dx + dy * dy, R = 150
          if (d2 < R * R) { const f = (1 - Math.sqrt(d2) / R) * 0.95; if (f > h) h = f }
        }
        if (h < 0.04) continue
        const g = el < start[i] ? 1 : status[i], z = s * (1 + h * 0.9)
        ctx.fillStyle = PALETTE[g][Math.round(h * LEVELS)]
        ctx.fillRect(cx[i] - z / 2, cy[i] - z / 2, z, z)
      }
      ripples = ripples.filter((r) => (now - r.t) / 1000 < r.life)
      const shown = reduce ? rel.built : Math.min(rel.built, lit)
      if (pctRef.current) pctRef.current.textContent = ((100 * shown) / n).toFixed(1) + "%"
      if (subRef.current) subRef.current.textContent = `${fmt(shown)} of ${fmt(n)} packages`
      if (!reduce && visible && !document.hidden) raf = requestAnimationFrame(frame)
    }
    const loop = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(frame) }

    const local = (e: PointerEvent) => { const r = section.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top } }
    const onMove = (e: PointerEvent) => { if (e.pointerType === "mouse") mouse = local(e) }
    const onLeave = () => { mouse = null }
    const onDown = (e: PointerEvent) => {
      if ((e.target as Element).closest("a,button")) return
      ripples.push({ ...local(e), t: performance.now(), v: 620, life: 2.2 })
      if (reduce) loop()
    }
    section.addEventListener("pointermove", onMove)
    section.addEventListener("pointerleave", onLeave)
    section.addEventListener("pointerdown", onDown)

    // ambient: somewhere a builder finishes a batch every couple of seconds
    const ambient = setInterval(() => {
      if (reduce || !visible || document.hidden || performance.now() - t0 < INTRO_MS) return
      ripples.push({ x: W * (0.35 + Math.random() * 0.65), y: H * Math.random(), t: performance.now(), v: 260 + Math.random() * 160, life: 1.6 })
    }, 1700)

    const io = new IntersectionObserver((es) => { visible = es[0].isIntersecting; if (visible && !reduce) loop() })
    io.observe(section)
    const onVis = () => { if (!document.hidden && !reduce) loop() }
    document.addEventListener("visibilitychange", onVis)

    // re-layout when the hero changes size; skip the intro after the first run
    let rz = 0
    const ro = new ResizeObserver(() => {
      clearTimeout(rz)
      rz = window.setTimeout(() => {
        if (section.clientWidth === W && section.clientHeight === H) return
        layout(); seed(); t0 = performance.now() - INTRO_MS - CELL_FADE_MS; loop()
      }, 160)
    })
    ro.observe(section)

    layout(); seed(); t0 = performance.now(); loop()

    return () => {
      cancelAnimationFrame(raf); clearInterval(ambient); clearTimeout(rz)
      io.disconnect(); ro.disconnect()
      document.removeEventListener("visibilitychange", onVis)
      section.removeEventListener("pointermove", onMove)
      section.removeEventListener("pointerleave", onLeave)
      section.removeEventListener("pointerdown", onDown)
    }
  }, [current, releases])

  const rel = releases[current]
  return (
    <section className="hero" ref={sectionRef}>
      <canvas ref={canvasRef} role="img" aria-label="Every Fedora source package as a square, lit when built for riscv64" />
      <div className="scrim" />
      <div className="hint">
        every square is one Fedora package<br />
        <i style={{ background: BASE[0] }} />built<i style={{ background: BASE[1], outline: "1px solid #34437A" }} />not yet<i style={{ background: BASE[2] }} />needs porting<i style={{ background: BASE[3] }} />on hold
      </div>
      <div className="wrap hero-in">
        {children}
        <div className="rail">
          <div className="now">
            <span className="l">{rel.tag}{rel.rawhide ? " rawhide" : ""} · built for riscv64</span>
            <span className="big" ref={pctRef}>{pct(rel)}%</span>
            <small ref={subRef}>{fmt(rel.built)} of {fmt(rel.total)} packages</small>
            <span className="asof">as of {rel.updated.slice(0, 10)} · <a href={statsSource} target="_blank" rel="noopener noreferrer">openkoji stats</a></span>
          </div>
          {releases.map((r, i) => (
            <button key={r.tag} className="rel" aria-pressed={i === current} onClick={() => setCurrent(i)}>
              <span className="n">{r.tag}{r.rawhide && <em>rawhide</em>}</span>
              <span className="p">{pct(r)}%</span>
              <span className="bar"><i style={{ width: `${pct(r)}%` }} /></span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
