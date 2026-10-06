# Plan: Rebuild SPIIX as an integrated microsite

SPIIX will become a distinct experience at `stevepeeleii.com/spiix`, modeled closely on the supplied Growth Engine site while remaining connected to Steve's portfolio. The current advisory and temporary offer URLs will redirect into the new structure.

## 1. SPIIX visual system and shared shell

- Create a dedicated SPIIX shell with its own dark industrial editorial system: condensed display typography, orange kinetic accent, mono labels, hard-edged controls, hairline grids, architectural imagery, and restrained motion.
- Rebuild the SPIIX header, responsive full-screen menu, footer, direct-contact block, and “Main site” return link.
- Keep the portfolio header/footer outside the microsite so SPIIX feels intentionally separate, while preserving an obvious route back to Steve's main site.
- Reuse the supplied SPIIX imagery locally; exclude Base44 platform branding and dormant authentication code.

## 2. Full SPIIX route structure

Recreate the source experience under these routes:

- `/spiix` — identity, positioning, proof, blueprint, and engagement overview
- `/spiix/os` — Audit → Strategy → Build → Scale operating system
- `/spiix/impact` — interactive growth-impact calculator
- `/spiix/signals` — Signal philosophy and Signal-vs-noise framework
- `/spiix/who-i-help` — field evidence and operating-system case narratives
- `/spiix/compare` — comparison of the three engagement paths
- `/spiix/connect` — five-step engagement intake plus direct booking/contact options
- `/spiix/engage/gtm-audit`
- `/spiix/engage/fractional-advisory`
- `/spiix/engage/elite-mentorship`
- `/spiix/signal-report` — unlisted, noindex transmission
- `/spiix/diagnostics` — unlisted, noindex diagnostic document experience

Copy, section hierarchy, interactions, engagement details, and CTA destinations will follow the supplied site closely. The linked site is treated as the source of truth for the new SPIIX offer.

## 3. Functional interactions

- Rebuild the expandable operating-system cards, active navigation, mobile menu, calculator, comparison table, and engagement crosslinks.
- Recreate the five-step intake as a complete client-side journey with validation and a final handoff to Steve's existing contact/booking channels; no unavailable Base44 backend dependency will be copied.
- Recreate the diagnostic gate as a usable on-page reveal without collecting or pretending to persist email data.
- Preserve keyboard access, visible focus, Escape behavior, reduced-motion support, and mobile-safe layouts.

## 4. Portfolio integration and redirects

- Change the main portfolio's SPIIX navigation destination to `/spiix`.
- Update homepage, contact, persistent identity guide, breadcrumbs, and every advisory/mentorship crosslink to the closest SPIIX destination.
- Redirect old paths:
  - `/advisory` → `/spiix`
  - `/services` → `/spiix/compare`
  - `/services/gtm-audit` → `/spiix/engage/gtm-audit`
  - `/services/website-build` → `/spiix/connect`
  - `/services/logistics` → `/spiix/connect`
- Remove the retired advisory/offers presentation once all old URLs resolve safely.

## 5. Search and sharing

- Give every public SPIIX page a unique title, description, Open Graph metadata, Twitter card, self-referencing canonical URL, and appropriate structured data.
- Keep `/spiix/signal-report` and `/spiix/diagnostics` out of navigation and mark both `noindex`.
- Preserve the main portfolio's metadata and information architecture outside SPIIX.

## 6. Verification

- Verify every SPIIX route, CTA, crosslink, redirect, accordion, calculator input, comparison view, intake step, and diagnostic reveal.
- Check desktop and mobile layouts, menu behavior, keyboard interaction, horizontal overflow, runtime errors, and final build status.
- Confirm the main site routes back into SPIIX correctly and SPIIX always provides a clear return to the main portfolio.

## Technical notes

- Implement SPIIX as nested TanStack routes and shared SPIIX-only components/data, without adding another router.
- Store supplied images in the project rather than hotlinking them.
- Use semantic design tokens and local component styles scoped to SPIIX so the microsite does not visually alter the portfolio.
- Keep the implementation frontend-only; no Cloud or database is required for this rebuild.
