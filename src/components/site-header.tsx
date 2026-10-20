"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { locales, messages, type Locale } from "@/lib/i18n"

const sections = ["about", "websites", "partners", "team", "contact"] as const

export function SiteHeader({ locale, onSwitch }: { locale: Locale, onSwitch: (l: Locale) => void }) {
  const t = messages[locale].header
  const home = locales[locale].path
  const navLinks = sections.map((id) => ({ href: `#${id}`, label: t.nav[id] }))
  const others = (Object.keys(locales) as Locale[]).filter((l) => l !== locale)
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
    if (window.location.pathname !== home) return
    e.preventDefault()
    setOpen(false)
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" })
    if (window.location.hash) history.replaceState(null, "", home)
  }

  // a real link (works without JS, opens in a new tab), but a plain click switches in place
  const switchLang = (l: Locale) => (e: React.MouseEvent) => {
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    e.preventDefault()
    setOpen(false)
    onSwitch(l)
  }

  return (
    <header className={`top${solid ? " solid" : ""}${open ? " open" : ""}`}>
      <div className="wrap">
        <div className="bar">
          <Link className="brand" href={home} aria-label={t.home} onClick={toTop}>
            <Image src="/fvf-mark-white.png" alt="" width={150} height={288} priority />
            <span>Fedora-V Force</span>
          </Link>
          <nav className="links" aria-label="Sections">
            {navLinks.map((l) => <a key={l.href} href={l.href}>{l.label}</a>)}
          </nav>
          <div className="top-end">
            {others.map((l) => (
              <a className="lang" key={l} href={locales[l].path} hrefLang={locales[l].htmlLang} lang={locales[l].htmlLang} aria-label={messages[l].header.switchTo} onClick={switchLang(l)}>{locales[l].short}</a>
            ))}
            <a className="btn btn-gold btn-sm" href="https://images.fedoravforce.org/">{t.download} <span className="arr">→</span></a>
            <button className="menu-btn" aria-label={t.menu} aria-controls="mobile-nav" aria-expanded={open} onClick={() => setOpen(!open)}><i /></button>
          </div>
        </div>
        <nav className="mobile-links" id="mobile-nav" aria-label="Sections">
          {navLinks.map((l) => <a key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</a>)}
        </nav>
      </div>
    </header>
  )
}
