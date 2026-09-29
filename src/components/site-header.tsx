"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"

export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#websites", label: "Websites" },
  { href: "#partners", label: "Partners" },
  { href: "#team", label: "Team" },
  { href: "#contact", label: "Contact" },
]

export function SiteHeader() {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false) }
    const wide = matchMedia("(min-width: 861px)")
    const onWide = () => { if (wide.matches) setOpen(false) }
    window.addEventListener("keydown", onKey)
    wide.addEventListener("change", onWide)
    return () => { window.removeEventListener("keydown", onKey); wide.removeEventListener("change", onWide) }
  }, [open])

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Next treats a link to the current route as a no-op, so scroll back up ourselves
  const toTop = (e: React.MouseEvent) => {
    if (window.location.pathname !== "/") return
    e.preventDefault()
    setOpen(false)
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" })
    if (window.location.hash) history.replaceState(null, "", "/")
  }

  return (
    <header className={`top${solid ? " solid" : ""}${open ? " open" : ""}`}>
      <div className="wrap">
        <div className="bar">
          <Link className="brand" href="/" aria-label="Fedora-V Force home" onClick={toTop}>
            <Image src="/fvf-mark-white.png" alt="" width={150} height={288} priority />
            <span>Fedora-V Force</span>
          </Link>
          <nav className="links" aria-label="Sections">
            {navLinks.map((l) => <a key={l.href} href={l.href}>{l.label}</a>)}
          </nav>
          <div className="top-end">
            <a className="btn btn-gold btn-sm" href="https://images.fedoravforce.org/">Download <span className="arr">→</span></a>
            <button className="menu-btn" aria-label="Menu" aria-controls="mobile-nav" aria-expanded={open} onClick={() => setOpen(!open)}><i /></button>
          </div>
        </div>
        <nav className="mobile-links" id="mobile-nav" aria-label="Sections">
          {navLinks.map((l) => <a key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</a>)}
        </nav>
      </div>
    </header>
  )
}
