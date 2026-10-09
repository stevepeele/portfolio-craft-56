# Standalone SPIIX service page — /fractional-growth-advisory

## Goal
A search-findable service page on the main portfolio that positions SPIIX as a service (fractional growth advisory), styled with the main portfolio system, and funneling readers into the /spiix microsite.

## What gets built

### 1. New route: `src/routes/fractional-growth-advisory.tsx`
- Main-portfolio page: `SiteHeader` + `SiteFooter`, dark bold portfolio style (deep navy surfaces, electric-blue accents, metric-led copy). NOT the SPIIX industrial fidelity system — that stays scoped to `/spiix`.
- Content sections (plainspoken voice, no invented facts):
  - **Hero** — positioning: fractional growth advisory / strategic operating system for founders and operators; primary CTA `GET THE SIGNAL` → `/spiix/signal`; secondary `READ THE OS` → `/spiix/os`.
  - **Who it's for** — resource-constrained SaaS/startup operators; the problems solved (chaotic marketing, unclear funnel ownership, disconnected tools, weak reporting) drawn from existing SPIIX copy.
  - **Three ways in** — the existing engagement paths from `spiixOriginal.gm` (GTM & Funnel Audit, Fractional Advisory, Elite Mentorship), each linking into its `/spiix/engage/*` page.
  - **How the work reads** — the SPIIX loop as a journey: `/spiix/monolith` (framework) → `/spiix/os` (operating layer) → `/spiix/signals` (signal framework) → `/spiix/signal` (conversion).
  - **Proof strip** — verified career proof only (14+ years, $350M+ pipeline exposure, dotloop/NTT context) plus a pull quote from `featuredRecommendations`.
  - **Final CTA** — GET THE SIGNAL + direct contact (email/phone from `profile`).

### 2. SEO (indexable — this page is the search entry point)
- `head()`: unique title ("Fractional Growth Advisory — SPIIX by Steve Peele II"), description, og:title, og:description, og:type website, twitter:card, canonical `https://stevepeeleii.com/fractional-growth-advisory`.
- JSON-LD: `ProfessionalService` (SPIIX / Steve Peele II) + `BreadcrumbList` (Home → SPIIX service page).
- No robots noindex — deliberately the opposite of the unlisted microsite pages.

### 3. Sitemap (new — none exists today)
- Create `public/sitemap.xml` listing the indexable public routes (home, work, spiix service page, music, about, contact, recommendations, experience, CV) and add a `Sitemap:` line to `public/robots.txt`.

## Constraints honored
- Nav unchanged: SPIIX item stays at `/spiix/monolith` (per your call). The new page is reachable from search, footer/related links, and directly.
- No "apply" language anywhere; master conversion CTA stays GET THE SIGNAL.
- No invented clients, titles, dates, or results; worked numbers labeled as illustrative if used.
- Main-site styling untouched elsewhere.

## Verify
- Build clean; route resolves at `/fractional-growth-advisory` at 1280 and 390 widths (no horizontal overflow).
- Head tags render (title, canonical, JSON-LD) via Playwright DOM check.
- All internal links resolve; no broken `/spiix/*` targets.
