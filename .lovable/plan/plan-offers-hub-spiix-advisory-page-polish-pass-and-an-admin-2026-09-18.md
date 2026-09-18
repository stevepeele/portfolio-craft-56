# Plan: Offers hub, SPIIX advisory page, polish pass, and an admin CMS

## 1. Bring SPIIX into this site

The SPIIX advisory content currently lives on its own separate site. It becomes a real part of this site at `/advisory`, rebuilt in the site's own look and voice, and reworked from an "apply" pitch into clearly productized advisory offers:

- Hero: "Growth is a skill. This is where you build it." — SPIIX as the advisory and mentorship practice of Pan Labs Consulting, with the 14+ years / $350M+ pipeline / 2 exits proof line.
- Pan Labs vs. SPIIX framing (consulting solves one company's problem; SPIIX teaches the work).
- Who it's for: new VP/CMO leaders, founders building a first growth engine, operators needing a second set of eyes.
- **Productized advisory tiers** replacing the single "Apply" path — three named, scoped options with what's included, cadence, and a clear next step (single strategy session, monthly advisory, and on-call retainer). Pricing is left as "starts at / scoped on the call" unless you give me numbers.
- How it works: Apply → Diagnose → Advise, restated as a concrete engagement flow.
- About the advisor block: current role at Launch by NTT DATA, Tixxy's $7M acquisition, Amify repositioning, Cincinnati base.
- Closing action: book a call, email, and a link back to the wider offers.

Assumptions: SPIIX stays branded as a practice of Pan Labs Consulting; `/advisory` is linked from the main navigation and from the offers hub, since it's now part of the site rather than a hidden asset. The old SPIIX address can point here later.

## 2. Offers pages (not in navigation)

Four pages, hidden from the menu, footer, and search engines, from your three offer documents:

- `/services` — overview of all offers with short summaries and links.
- `/services/gtm-audit` — The 5-Day GTM & Funnel Audit ($750 / $1,500 / $3,000).
- `/services/website-build` — Conversion-focused web builds ($750 / $2,500 / $4,500).
- `/services/logistics` — Digital presence management for freight & logistics ($500 / $1,200 / $2,500 per month).

Each follows the document structure: headline, proof stats, "What you get", "How it runs" (3 steps), three pricing tiers with the middle marked Most Popular, and a closing block wired to your email, phone, and booking link. Copy comes from the documents — nothing invented. The `stevepeeleeii` typos are corrected to `steve@stevepeeleii.com`.

Privacy: anyone with the link can view; pages carry a no-index tag, stay out of `robots.txt`, and are not linked from the public site.

## 3. Polish pass

- Unify section spacing, eyebrow labels, oversized metrics, and one clear primary action per page.
- Tighten CTAs: "Let's Talk" → Contact, CV button → `cv.stevepeeleii.com`, section CTAs point at what they reference.
- Restrained scroll-reveal and hover motion that respects reduced-motion settings.
- Mobile pass on every page for overflow, tap targets, and sequencing.
- Refresh titles, descriptions, Open Graph/Twitter text, canonical URLs on `https://stevepeeleii.com`, and Person/WebSite structured data.
- Remove awards mentions and unused data.

## 4. Admin + CMS

Enable Lovable Cloud (database, logins, server code) to power a private admin area at `/admin`.

- Email-and-password sign-in; you get the owner account and can invite others as editors.
- No public signup — accounts exist by invitation only.
- Editable content: home copy, experience, results/case studies, recommendations, capabilities, profile/contact details, the advisory and services offers with their tiers, and per-page search/social text.
- Draft/published state per record so you can stage changes.
- The public site reads published content; today's `src/data/resume.ts` content is loaded as starting data.
- Admin sections: Dashboard, Pages & copy, Experience, Results, Recommendations, Offers & Advisory, Team access, Settings.

## Technical notes

- Content tables in Postgres with row-level security: public read limited to published rows via a narrow anon policy; writes limited to authenticated users holding an `admin` or `editor` role.
- Roles in a separate `user_roles` table with a `has_role()` security-definer function — never on a profile row.
- Reads/writes via `createServerFn`; the admin subtree sits under the managed `_authenticated` layout with a role gate.
- Seed data ships as literal `INSERT` statements in the same migration that creates the tables.
- Routes: `src/routes/advisory.tsx`; `services.tsx` layout plus `services.index.tsx` and one file per offer, each `head()` carrying `robots: noindex, nofollow`.

## Verification

- Advisory page renders at mobile and desktop, tiers read clearly, all actions work, and it appears in navigation.
- Every services page renders correctly, links work, and no-index tags are present; pages absent from header, footer, and `robots.txt`.
- Sign in, edit each content type, publish, confirm the public page updates; confirm a signed-out visitor cannot reach `/admin` or write data.
- Build clean, console clean, metadata unique per page.

## Notes

- New pages and metadata reach your live domain on the next publish.
- Where the two website-build documents differ, the newer one-page version is the source.
- Tell me advisory prices if you want real numbers instead of "scoped on the call".
