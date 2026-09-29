import Image from "next/image"
import { SiteHeader } from "@/components/site-header"
import { BuildField } from "@/components/build-field"
import { Reveal } from "@/components/reveal"
import { teamMembers, websites, partners, teamIntro, heroTagline, aboutStatement, facts } from "@/lib/data"
import stats from "@/lib/stats.json"

const HIGHLIGHT = "Fedora on RISC-V"

function linkLabel(url: string) {
  const u = new URL(url)
  return (u.host + u.pathname).replace(/\/$/, "")
}

export default function Home() {
  const [before, after] = aboutStatement.split(HIGHLIGHT)
  return (
    <>
      <SiteHeader />
      <main>
        <BuildField releases={stats.releases} statsSource={stats.source}>
          <div className="kicker">
            <span className="dot" />
            <span>$ uname -m <b>riscv64</b></span>
            <span>多啦V盟</span>
          </div>
          <h1>
            <span className="ln"><span>Fedora,</span></span>
            <span className="ln"><span>rebuilt for</span></span>
            <span className="ln"><span className="v">RISC-V.</span></span>
          </h1>
          <p className="lede">{heroTagline}</p>
          <div className="cta">
            <a className="btn btn-gold" href="https://images.fedoravforce.org/">Download images <span className="arr">→</span></a>
            <a className="btn btn-line" href="https://github.com/fedora-riscv">GitHub</a>
          </div>
        </BuildField>

        <section id="about">
          <div className="wrap">
            <div className="sec-head rv"><div className="eyebrow">About us</div></div>
            <p className="statement rv">
              {after === undefined ? aboutStatement : <>{before}<em>{HIGHLIGHT}</em>{after}</>}
            </p>
            <div className="about-cols">
              <p className="intro rv">{teamIntro}</p>
              <div className="facts rv">
                {facts.map((f) => (
                  <div className="fact" key={f.title}><b>{f.title}</b><span>{f.text}</span></div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="svc-sec" id="websites">
          <div className="wrap">
            <div className="sec-head rv"><div className="eyebrow">Resources</div><h2 className="h2">Our websites.</h2></div>
            <div className="svc">
              {websites.map((w) => (
                <a className="rv" key={w.name} href={w.link} target="_blank" rel="noopener noreferrer">
                  <div className="shot"><Image src={w.image} alt={`${w.name} screenshot`} width={1280} height={720} /></div>
                  <div className="t">
                    <span className="d">{linkLabel(w.link)}</span>
                    <h3>{w.name}</h3>
                    <p>{w.description}</p>
                    <span className="go" aria-hidden="true">→</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="partners-sec" id="partners">
          <div className="wrap">
            <div className="sec-head rv"><div className="eyebrow">Ecosystem</div><h2 className="h2">Our partners.</h2></div>
            <div className="partners">
              {partners.map((row, i) => (
                <div className={`prow t${Math.min(i + 1, 3)}`} key={i}>
                  {row.map((p) => (
                    <a className="logo-tile rv" key={p.name} href={p.link} target="_blank" rel="noopener noreferrer" aria-label={`${p.name} Website`}>
                      <Image src={p.logo} alt={`${p.name} logo`} width={360} height={120} />
                    </a>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="team-sec" id="team">
          <div className="wrap">
            <div className="sec-head rv"><div className="eyebrow">People</div><h2 className="h2">Team members.</h2></div>
            <div className="people">
              {teamMembers.map((m) => (
                <div className="person rv" key={m.name}>
                  <div className="face"><Image src={m.avatarSrc} alt={m.name} width={400} height={400} /></div>
                  <div className="info">
                    <div>
                      <h3>{m.name}</h3>
                      {m.title && <div className="role">{m.title}</div>}
                      {m.company && <div className="co">{m.company}</div>}
                    </div>
                    {m.links && (
                      <div className="ln">
                        {Object.entries(m.links).map(([key, l]) => (
                          <a key={key} href={l.url} target="_blank" rel="noopener noreferrer" aria-label={`${m.name} on ${key === "github" ? "GitHub" : l.label}`}>
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
            <div className="eyebrow">Get in touch</div>
            <h2 className="rv">Bring a board.<br />We&apos;ll bring <span className="v">Fedora.</span></h2>
            <div className="row rv">
              <div className="mail"><span>EMAIL</span><Image src="/email.png" alt="Email Address" width={296} height={39} /></div>
              <a className="btn btn-line" href="https://github.com/fedora-riscv" target="_blank" rel="noopener noreferrer">github.com/fedora-riscv <span className="arr">→</span></a>
            </div>
          </div>
        </section>
      </main>
      <footer className="foot">
        <div className="wrap">
          <span>&copy; 2026 Fedora-V Force. All rights reserved.</span>
          <nav>
            <a href="https://github.com/fedora-riscv" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://blog.fedoravforce.com" target="_blank" rel="noopener noreferrer">Blog</a>
            <a href="https://images.fedoravforce.org/" target="_blank" rel="noopener noreferrer">Downloads</a>
          </nav>
        </div>
      </footer>
      <Reveal />
    </>
  )
}
