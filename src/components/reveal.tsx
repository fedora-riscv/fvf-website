"use client"

import { useEffect } from "react"

// Fades in every `.rv` element as it scrolls into view. The layout script only hides
// them once JS is running, and everything is shown after a few seconds regardless.
export function Reveal() {
  useEffect(() => {
    (window as Window & { __fvfReveal?: boolean }).__fvfReveal = true
    const els = Array.from(document.querySelectorAll<HTMLElement>(".rv"))
    els.forEach((el, i) => { el.style.transitionDelay = `${(i % 5) * 70}ms` })
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target) }
      }),
      { rootMargin: "0px 0px -6% 0px" },
    )
    els.forEach((el) => io.observe(el))
    const fallback = setTimeout(() => els.forEach((el) => el.classList.add("in")), 5000)
    return () => { io.disconnect(); clearTimeout(fallback) }
  }, [])
  return null
}
