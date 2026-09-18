# Plan: Unlisted services pages, polish pass, and an admin CMS

## 1. Services pages (not in navigation)

Four new pages, hidden from the menu, the footer, and search engines:

- `/services` — overview of all three offers with short summaries and links.
- `/services/gtm-audit` — The 5-Day GTM & Funnel Audit ($750 / $1,500 / $3,000).
- `/services/website-build` — Conversion-focused web builds ($750 / $2,500 / $4,500).
- `/services/logistics` — Digital presence management for freight & logistics ($500 / $1,200 / $2,500 per month).

Each page follows the structure in your documents: headline, proof stats, "What you get", "How it runs" (3 steps), a three-tier pricing table with the middle tier marked Most Popular, and a closing "reach out" block wired to your email, phone, and booking link. Copy comes straight from the documents — no invented claims. The email/site typos in one document (`stevepeeleeii`) are corrected to `steve@stevepeeleii.com`.

Privacy: anyone with the link can view; pages carry a no-index tag, are excluded from `robots.txt`, and are not linked from anywhere on the public site.

## 2. Polish pass

- Unify page rhythm: consistent section spacing, eyebrow labels, oversized metrics, and one clear primary action per page.
- Tighten CTA behavior: "Let's Talk" → Contact, CV button → `cv.stevepeeleii.com`, section CTAs point at what they reference.
- Add restrained scroll-reveal and hover motion that respects reduced-motion settings.
- Mobile pass on every page for overflow, tap targets, and sequencing.
- Refresh titles, descriptions, Open Graph/Twitter text, canonical URLs on `https://stevepeeleii.com`, and Person/WebSite structured data.
- Remove awards mentions and unused data.

## 3. Admin + CMS

Enable Lovable Cloud (database, logins, server code) to power a private admin area at `/admin`.

- Sign in with email and password; you get the owner account, and you can invite others as editors from the admin UI.
- No public signup — accounts only exist by invitation.
- Editable content: home page copy, experience entries, results/case studies, recommendations, capabilities, profile/contact details, the services offers and pricing tiers, and per-page search/social text.
- Each record has draft/published state, so you can stage changes before they go live.
- The public site reads published content from the database; current `src/data/resume.ts` content is loaded as the starting data so nothing looks empty on day one.
- Admin sections: Dashboard, Pages & copy, Experience, Results, Recommendations, Services, Team access, Settings.

## Technical notes

- Content tables in Postgres with row-level security: public read limited to published rows via a narrow anon policy; writes restricted to authenticated users holding an `admin` or `editor` role.
- Roles live in a separate `user_roles` table with a `has_role()` security-definer function — never on a profile row.
- Reads/writes go through `createServerFn` handlers; the admin subtree lives under the managed `_authenticated` layout with a role gate.
- Seed data ships as literal `INSERT` statements in the same migration that creates the tables.
- Services routes: `src/routes/services.tsx` (layout), `services.index.tsx`, and one file per offer; each `head()` includes `robots: noindex, nofollow`.

## Verification

- Every services page renders correctly at mobile and desktop, with working email/phone/booking links and no-index tags present.
- Services pages are absent from the header, footer, and `robots.txt`.
- Sign in, edit each content type, publish, and confirm the public page updates; confirm a signed-out visitor cannot reach `/admin` or write data.
- Build clean, console clean, metadata unique per page.

## Notes

- Head/metadata changes and the new pages appear at your live domain after the next publish.
- Where the two website-build documents differ, the newer one-page version is used as the source.
