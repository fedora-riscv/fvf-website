# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
npm run dev           # Start local dev server (Next.js hot reload)
npm run build         # Production build (static export to ./out)
npm run lint          # Run ESLint
npm run update-stats  # Refresh src/lib/stats.json from openkoji, then commit it
```

## Architecture

A **static-exported Next.js** site for [Fedora-V Force](https://github.com/fedora-riscv/fvf-website), the team porting Fedora to RISC-V.

- **Framework:** Next.js App Router, TypeScript, React. `output: "export"`, images unoptimized.
- **Styling:** one hand-written stylesheet, `src/app/globals.css` (CSS variables, light/dark via `prefers-color-scheme`). No Tailwind or UI kit.
- **Fonts:** self-hosted woff2 in `src/app/fonts/` (Archivo italic for display, Red Hat Text, Red Hat Mono). The build never touches the network.
- **Deployment:** GitHub Actions (`.github/workflows/deploy.yml`) → GitHub Pages.

## Key Conventions

- **Text lives in `src/locales/<lang>.json`** (`en.json`, `zh.json`): every visible string, including intro, facts, website names and member roles. `src/lib/data.ts` holds only language-independent data (links, avatars, logos, and keys such as a member's `role` or a website's `id` that point into the JSON). `zh.json` is type-checked against `en.json`, so a missing key fails the build.
- **i18n:** English is served at `/`, Chinese at `/zh/` (`trailingSlash: true`). Each locale has its own root layout under a route group (`src/app/(en)`, `src/app/(zh)`) so the static HTML has the right `<html lang>` and hreflang links. The switch in the header works in place: `home.tsx` swaps the messages and calls `history.pushState`, with no page reload. To add a language, add its JSON, register it in `src/lib/i18n.ts`, and add a route group.
- **Language detection:** an inline script on `/` redirects to the saved choice (`localStorage["fvf-lang"]`, set by the switch) or, on a first visit, to the browser's preferred language. Locale URLs such as `/zh/` never redirect.
- **Partners are tiered:** `partners` is an array of rows (currently 3 + 4 + 2). Row order and membership are deliberate; the first row is shown largest.
- **Build stats are a committed snapshot:** `src/lib/stats.json` is produced by `scripts/update-stats.mjs` from `https://openkoji.iscas.ac.cn/pub/stats/<tag>_pkg_summary.json`. Nothing is fetched at build or run time, so the page never prints the figures; they only set the colour mix of the hero animation.
- **Hero animation:** `src/components/build-field.tsx` draws one square per package of the selected release on a canvas. It respects `prefers-reduced-motion`.
- **Static assets:** avatars in `public/avatars/`, partner logos in `public/partner-logo/`, site screenshots in `public/`. Crop logo SVG `viewBox`es to their content, or they render tiny.
