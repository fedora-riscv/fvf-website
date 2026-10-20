import type { Metadata, Viewport } from "next"
import localFont from "next/font/local"
import { locales, messages, siteUrl, redirectScript, type Locale } from "@/lib/i18n"
import "@/app/globals.css"

const archivo = localFont({
  src: "../app/fonts/ArchivoItalic-VF.woff2",
  variable: "--font-archivo",
  weight: "800 900",
  style: "italic",
  declarations: [{ prop: "font-stretch", value: "100% 125%" }],
})
const redHatText = localFont({
  src: [
    { path: "../app/fonts/RedHatText-VF.woff2", style: "normal" },
    { path: "../app/fonts/RedHatText-Italic-VF.woff2", style: "italic" },
  ],
  variable: "--font-rh-text",
  weight: "400 600",
})
const redHatMono = localFont({
  src: "../app/fonts/RedHatMono-VF.woff2",
  variable: "--font-rh-mono",
  weight: "400 600",
})

export function localeMetadata(locale: Locale): Metadata {
  return {
    metadataBase: new URL(siteUrl),
    title: messages[locale].meta.title,
    description: messages[locale].meta.description,
    alternates: {
      canonical: locales[locale].path,
      languages: {
        ...Object.fromEntries(Object.values(locales).map((l) => [l.htmlLang, l.path])),
        "x-default": locales.en.path,
      },
    },
  }
}

export const viewport: Viewport = {
  themeColor: "#070D22",
  viewportFit: "cover",
}

// Every locale is its own root layout (so <html lang> is right in the static HTML); they all render this.
export function RootHtml({ locale, children }: { locale: Locale, children: React.ReactNode }) {
  return (
    <html lang={locales[locale].htmlLang} className={`${archivo.variable} ${redHatText.variable} ${redHatMono.variable}`} suppressHydrationWarning>
      {/* eslint-disable-next-line @next/next/no-head-element -- this is the root layout, shared by every locale */}
      <head>
        {locale === "en" && <script dangerouslySetInnerHTML={{ __html: redirectScript }} />}
        {/* lets CSS hide scroll-reveal blocks only when JS will reveal them again;
            if the app never boots (a chunk fails to load), show everything after 4s */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js');setTimeout(function(){if(!window.__fvfReveal)document.documentElement.classList.remove('js')},4000)" }} />
      </head>
      <body>{children}</body>
    </html>
  )
}
