import { RootHtml, localeMetadata } from "@/components/root-html"
import { locales } from "@/lib/i18n"

export { viewport } from "@/components/root-html"
export const metadata = { ...localeMetadata("en"), title: "404 · Fedora-V Force", alternates: undefined }

export default function GlobalNotFound() {
  return (
    <RootHtml locale="en">
      <main className="not-found">
        <div className="wrap">
          <div className="eyebrow">404</div>
          <h1 className="h2">Page not found.</h1>
          <p lang="zh-CN">页面不存在。</p>
          <div className="cta">
            <a className="btn btn-gold" href={locales.en.path}>Home <span className="arr">→</span></a>
            <a className="btn btn-line" href={locales.zh.path} lang="zh-CN">中文首页</a>
          </div>
        </div>
      </main>
    </RootHtml>
  )
}
