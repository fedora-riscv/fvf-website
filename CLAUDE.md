# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
yarn dev          # Start local dev server (Next.js hot reload)
yarn build        # Production build (static export to ./out)
yarn start        # Serve production build locally
yarn lint         # Run ESLint
```

## Architecture

This is a **static-exported Next.js 14** site for the [Fedora-V Force](https://github.com/fedora-riscv/fvf-website) project — a team working on Fedora support for RISC-V architecture.

- **Framework:** Next.js 14 with App Router, TypeScript, React 18
- **Styling:** Tailwind CSS with CSS variable theming (HSL-based light/dark mode in `globals.css`)
- **UI Components:** shadcn/ui (Radix UI primitives) in `src/components/ui/`
- **Static Export:** `output: "export"` in `next.config.mjs` — no SSR, images unoptimized for static hosting
- **Deployment:** GitHub Actions (`.github/workflows/deploy.yml`) → GitHub Pages

## Key Conventions

- **Path alias:** `@/*` maps to `src/*` (configured in `tsconfig.json`)
- **Data-driven content:** All site content (team members, partner logos, sponsor info, website links) lives in `src/lib/data.ts`. To update site content, edit this file — not the components.
- **Type definitions:** `src/lib/types.d.ts` defines `TeamMember`, `Website`, `PartnerRow`, `Sponsor`
- **Component structure:** `src/components/home-page.tsx` is the main page component; `src/components/team-member-card.tsx` renders individual team cards
- **Static assets:** Avatars in `public/avatars/`, partner logos in `public/partner-logo/`, sponsor logos in `public/sponsor-logo/`
- **Fonts:** Geist Sans and Geist Mono loaded locally from `src/app/fonts/`
