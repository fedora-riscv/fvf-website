"use client"

import Image from "next/image"
import { useCallback, useEffect, useState } from "react"
import { flushSync } from "react-dom"
import { SiteHeader } from "@/components/site-header"
import { BuildField } from "@/components/build-field"
import { Reveal } from "@/components/reveal"
import { teamMembers, websites, partners } from "@/lib/data"
import { locales, messages, fmt, prefKey, type Locale } from "@/lib/i18n"
import stats from "@/lib/stats.json"

function linkLabel(url: string) {
  const u = new URL(url)
  return (u.host + u.pathname).replace(/\/$/, "")
}

// Sets the first occurrence of `word` in `text` apart, e.g. in the accent colour
function accent(text: string, word: string, wrap: (w: string) => React.ReactNode) {
  const i = text.indexOf(word)
  if (i < 0) return text
  return <>{text.slice(0, i)}{wrap(word)}{text.slice(i + word.length)}</>
}

function localeFromPath(path: string) {
  const p = path.endsWith("/") ? path : path + "/"
  return (Object.keys(locales) as Locale[]).find((l) => locales[l].path === p)
}

// Every locale is prerendered as its own page, but switching happens in place: both message files
// are in the bundle, so we swap the text and the URL without reloading (no flash, hero keeps running).
export function Home({ locale: initial }: { locale: Locale }) {
  const [locale, setLocale] = useState(initial)
  const t = messages[locale]

  const apply = useCallback((next: Locale) => {
    // the languages differ in height, so keep the section under the header where it was
    const anchor = Array.from(document.querySelectorAll<HTMLElement>("main > section")).find((s) => s.getBoundingClientRect().bottom > 120)
    const before = anchor?.getBoundingClientRect().top ?? 0
    const swap = () => {
      flushSync(() => setLocale(next))
      document.documentElement.lang = locales[next].htmlLang
      document.title = messages[next].meta.title
      if (anchor) window.scrollBy({ top: anchor.getBoundingClientRect().top - before, behavior: "instant" })
    }
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches
    if (document.startViewTransition && !reduce) document.startViewTransition(swap)
    else swap()
  }, [])

  const switchTo = useCallback((next: Locale) => {
    history.pushState(null, "", locales[next].path)
    try { localStorage.setItem(prefKey, next) } catch {}
    apply(next)
  }, [apply])

  // back/forward between languages
  useEffect(() => {
    const onPop = () => { const l = localeFromPath(location.pathname); if (l) apply(l) }
    window.addEventListener("popstate", onPop)
    return () => window.removeEventListener("popstate", onPop)
  }, [apply])

  return (
    <>
      <SiteHeader locale={locale} onSwitch={switchTo} />
      <main>
        <BuildField release={stats.releases[0]} label={t.hero.canvas} legend={t.hero.legend}>
          <div className="kicker">
            <span className="dot" />
            <span>$ uname -m <b>riscv64</b></span>
            <span>{t.hero.kicker}</span>
          </div>
          <h1>
            {t.hero.lines.map((l, i) => (
              <span className="ln" key={i}><span>{accent(l, t.hero.accent, (w) => <span className="v">{w}</span>)}</span></span>
            ))}
          </h1>
          <p className="lede">{t.hero.tagline}</p>
          <div className="cta">
            <a className="btn btn-gold" href="https://images.fedoravforce.org/">{t.hero.downloadImages} <span className="arr">→</span></a>
            <a className="btn btn-line" href="https://github.com/fedora-riscv">GitHub</a>
          </div>
        </BuildField>

        <section id="about">
          <div className="wrap">
            <div className="sec-head rv"><div className="eyebrow">{t.about.eyebrow}</div></div>
            <p className="statement rv">
              {accent(t.about.statement, t.about.highlight, (w) => <em>{w}</em>)}
            </p>
            <div className="about-cols">
              <p className="intro rv">{t.about.intro}</p>
              <div className="facts rv">
                {t.about.facts.map((f) => (
                  <div className="fact" key={f.title}><b>{f.title}</b><span>{f.text}</span></div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="svc-sec" id="websites">
          <div className="wrap">
            <div className="sec-head rv"><div className="eyebrow">{t.websites.eyebrow}</div><h2 className="h2">{t.websites.title}</h2></div>
            <div className="svc">
              {websites.map((w) => (
                <a className="rv" key={w.link} href={w.link} target="_blank" rel="noopener noreferrer">
                  <div className="shot"><Image src={w.image} alt={fmt(t.websites.screenshot, { name: t.websites.items[w.id].name })} width={1280} height={720} /></div>
                  <div className="t">
                    <span className="d">{linkLabel(w.link)}</span>
                    <h3>{t.websites.items[w.id].name}</h3>
                    <p>{t.websites.items[w.id].description}</p>
                    <span className="go" aria-hidden="true">→</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="partners-sec" id="partners">
          <div className="wrap">
            <div className="sec-head rv"><div className="eyebrow">{t.partners.eyebrow}</div><h2 className="h2">{t.partners.title}</h2></div>
            <div className="partners">
              {partners.map((row, i) => (
                <div className={`prow t${Math.min(i + 1, 3)}`} key={i}>
                  {row.map((p) => (
                    <a className="logo-tile rv" key={p.name} href={p.link} target="_blank" rel="noopener noreferrer" aria-label={fmt(t.partners.site, { name: p.name })}>
                      <Image src={p.logo} alt={fmt(t.partners.logo, { name: p.name })} width={360} height={120} />
                    </a>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="team-sec" id="team">
          <div className="wrap">
            <div className="sec-head rv"><div className="eyebrow">{t.team.eyebrow}</div><h2 className="h2">{t.team.title}</h2></div>
            <div className="people">
              {teamMembers.map((m) => (
                <div className="person rv" key={m.name}>
                  <div className="face"><Image src={m.avatarSrc} alt={m.name} width={400} height={400} /></div>
                  <div className="info">
                    <div>
                      <h3>{m.name}</h3>
                      {m.role && <div className="role">{t.team.roles[m.role]}</div>}
                      {m.company && <div className="co">{t.team.companies[m.company]}</div>}
                    </div>
                    {m.links && (
                      <div className="ln">
                        {Object.entries(m.links).map(([key, l]) => (
                          <a key={key} href={l.url} target="_blank" rel="noopener noreferrer" aria-label={fmt(t.team.memberOn, { name: m.name, site: key === "github" ? "GitHub" : l.label })}>
                            {l.label} ↗
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="contact" id="contact">
          <Image className="mark" src="/fvf-mark-white.png" alt="" width={150} height={288} />
          <div className="wrap">
            <div className="eyebrow">{t.contact.eyebrow}</div>
            <h2 className="rv">
              {t.contact.lines.map((l, i) => (
                <span key={i}>{i > 0 && <br />}{accent(l, t.contact.accent, (w) => <span className="v">{w}</span>)}</span>
              ))}
            </h2>
            <div className="row rv">
              <div className="mail"><span>{t.contact.email}</span><Image src="/email.png" alt={t.contact.emailAlt} width={296} height={39} /></div>
              <a className="btn btn-line" href="https://github.com/fedora-riscv" target="_blank" rel="noopener noreferrer">github.com/fedora-riscv <span className="arr">→</span></a>
            </div>
          </div>
        </section>
      </main>
      <footer className="foot">
        <div className="wrap">
          <span>{t.footer.rights}</span>
          <nav>
            <a href="https://github.com/fedora-riscv" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://blog.fedoravforce.com" target="_blank" rel="noopener noreferrer">{t.footer.blog}</a>
            <a href="https://images.fedoravforce.org/" target="_blank" rel="noopener noreferrer">{t.footer.downloads}</a>
          </nav>
        </div>
      </footer>
      <Reveal />
    </>
  )
}
