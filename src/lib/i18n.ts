import en from "@/locales/en.json"
import zh from "@/locales/zh.json"

// Each locale is a separate static page: English stays at "/" so existing links keep working.
// To add a language: add src/locales/<code>.json, register it below, and add a route group
// under src/app with its own layout and page.
export const locales = {
    en: { path: "/", htmlLang: "en", short: "EN" },
    zh: { path: "/zh/", htmlLang: "zh-CN", short: "中文" },
} as const

export type Locale = keyof typeof locales
export type Messages = typeof en

// typed against en.json so a missing or misspelled key in another locale fails the build
const zhMessages: Messages = zh

export const messages: Record<Locale, Messages> = { en, zh: zhMessages }

export const siteUrl = "https://www.fedoravforce.org"

// set when the visitor picks a language with the switch; always wins over the browser setting
export const prefKey = "fvf-lang"

// Inlined into the head of "/" so it runs before anything is painted: send the visitor to their
// saved language, or on a first visit to the one their browser prefers. "/zh/" etc. never redirect.
export const redirectScript = `try{if(location.pathname==="/"){var p=localStorage.getItem("${prefKey}"),m=${JSON.stringify(
    Object.fromEntries(Object.entries(locales).filter(([l]) => l !== "en").map(([l, v]) => [l, v.path])),
)},b=((navigator.languages&&navigator.languages[0])||navigator.language||"").toLowerCase().split("-")[0],l=p||b;if(m[l])location.replace(m[l]+location.hash)}}catch(e){}`

// "{name} logo" → "Radxa logo"
export function fmt(template: string, vars: Record<string, string>) {
    return template.replace(/\{(\w+)\}/g, (m, k: string) => vars[k] ?? m)
}
