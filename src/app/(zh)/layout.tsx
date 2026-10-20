import { RootHtml, localeMetadata } from "@/components/root-html"

export { viewport } from "@/components/root-html"
export const metadata = localeMetadata("zh")

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <RootHtml locale="zh">{children}</RootHtml>
}
