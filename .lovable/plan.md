# Plan: Update Site Title, Descriptions & Keywords for SEO

## Goal
Reposition the site around the high-demand, easy-ranking term **"fractional CMO"** (6,600 searches/mo, difficulty 24/100) while keeping **growth & product marketing** as supporting terms. Update titles and meta descriptions across every route, add a `<meta name="keywords">` tag, and lightly tune visible homepage copy so the targeted phrases appear naturally.

## Current state (confirmed)
- Root title (`src/routes/__root.tsx`): `Steve Peele II — Growth Marketing Executive`
- Homepage title (`src/routes/index.tsx`): `Steve Peele II — Growth & Product Marketing Executive`
- Leaf routes (`about`, `experience`, `work`, `contact`, `portfolio`) each have their own title + description; none target "fractional CMO".
- No `<meta name="keywords">` tag exists anywhere.
- No sitemap; `robots.txt` allows all crawlers.
- SEO finding `agent_content:growth_opportunity` recommends targeting "fractional cmo".

## Keyword targets (from Semrush, US)
Primary:
- **fractional cmo** — 6,600/mo, easy
- **fractional cmo services** — 2,400/mo, low competition
- **fractional chief marketing officer** — 1,300/mo
- **what is a fractional cmo** — 1,600/mo

Supporting (existing positioning):
- growth marketing, product marketing, GTM strategy, demand generation, Cincinnati

## Changes

### 1. Titles — per route (`head()` meta)
Lead with **Fractional CMO** + name, keep growth/product marketing as supporting roles.

| Route | New title |
|---|---|
| `__root` (default) | `Steve Peele II — Fractional CMO & Growth Marketing Leader` |
| `/` (home) | `Steve Peele II — Fractional CMO & Growth Marketing Leader` |
| `/about` | `About — Steve Peele II, Fractional CMO` |
| `/experience` | `Experience — Steve Peele II, Fractional CMO` |
| `/work` | `Results — Steve Peele II, Fractional CMO` |
| `/portfolio` | `Portfolio — Steve Peele II, Fractional CMO` |
| `/contact` | `Contact — Steve Peele II, Fractional CMO` |

### 2. Meta descriptions — per route
Rewrite each description to naturally include "fractional CMO", "growth marketing", and a concrete result ($350M+ pipeline, startup exits, 14+ years). Keep under ~155 chars. Example for homepage:

> Fractional CMO and growth marketing leader Steve Peele II — 14+ years scaling SaaS through GTM strategy, demand generation, and lifecycle marketing.

### 3. Open Graph tags
Update `og:title` and `og:description` on each leaf route to match the new title/description so social shares stay consistent.

### 4. `<meta name="keywords">` tag
Add to `__root.tsx` head (applies sitewide):
```
fractional cmo, fractional chief marketing officer, fractional cmo services, growth marketing, product marketing, GTM strategy, demand generation, SaaS marketing, Steve Peele II, Cincinnati
```

### 5. Homepage visible copy (light touch)
- Hero eyebrow: keep "Available for fractional & full-time leadership".
- Hero subhead: weave in "fractional CMO" once, e.g. "I'm Steve Peele II — a fractional CMO and growth marketing executive…" (preserve existing tone, no rewrite of structure).
No changes to other pages' visible content beyond metadata.

### 6. Root default title
Update the root `title` meta so any page without its own title also leads with the new positioning.

## Out of scope (not changing)
- Canonical tags, JSON-LD, sitemap, robots.txt, routes, visible page structure (except the homepage hero line noted above).

## After build
- Verify build passes (`/tmp/observability/build-errors.log`).
- Mark SEO finding `agent_content:growth_opportunity` as fixed via `seo_chat--update_findings` since the title and hero now target "fractional cmo".
- Note that titles/descriptions reach the live URL (`hi.stevepeeleii.com`) on the next publish — the preview reflects edits once the build lands.

## Notes for you
- "Fractional CMO" is what executives actually search for (6,600/mo) and is easy to rank for. Leading with it puts the site in front of real demand while keeping your growth/product marketing identity visible.
- The `<meta name="keywords">` tag is largely ignored by Google today but you asked for it, so it's included; the real SEO value comes from the titles, descriptions, and homepage copy.
