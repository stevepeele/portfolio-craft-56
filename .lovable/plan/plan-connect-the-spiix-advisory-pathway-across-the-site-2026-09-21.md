# Plan: Connect the SPIIX advisory pathway across the site

The advisory page and the three offer pages already exist, but the rest of the site barely points at them. This connects them into one clear path: home → advisory → a specific offer → contact.

## 1. Home page

- New section after the results/capabilities blocks: "Ways to work with me", with two clear routes — advisory and mentorship (SPIIX) and fixed-scope offers — each with a one-line description and a link.
- Hero secondary action gains an advisory entry point alongside "View experience".
- Closing block mentions both an advisory conversation and a direct email, so the last thing on the page offers a real next step.

## 2. Advisory page

- Add a short block linking out to the individual offers by name (GTM audit, website build, logistics presence) instead of only the generic "Explore focused offers" button.
- Closing block gains a link to the contact page in addition to booking and email, so people who aren't ready to book still have a way through.

## 3. Offers

- The offers overview gets a line placing the offers next to advisory, with a link back to advisory for people who want ongoing help rather than a fixed project.
- Each offer page gets a footer-level "related" row: the other two offers plus advisory, so no offer page is a dead end.

## 4. Contact page

- Add a short "what are you here for?" row with three destinations: advisory, offers, and results/experience — so the contact page routes people instead of ending the journey.

## 5. Consistency

- All advisory and offer actions keep their current destinations: booking link for calls, `steve@stevepeeleii.com` for email, phone as listed.
- Offer pages stay hidden from search engines; linking them from the advisory and offers pages keeps them reachable only from inside that path, and they stay out of the header and footer menus.
- Advisory stays in the main menu as today.

## Technical notes

- Changes are limited to presentation: `src/routes/index.tsx`, `src/routes/advisory.tsx`, `src/routes/services.index.tsx`, `src/routes/contact.tsx`, and `src/components/offer-page.tsx` (shared related-offers row driven by the existing `offers` array in `src/data/offers.ts`).
- Internal navigation uses `<Link to>` with typed literal paths; offer links use the existing `/services/gtm-audit`, `/services/website-build`, `/services/logistics` routes.
- No new routes, no data model changes, no backend.

## Verification

- Every new link resolves to a real page on desktop and mobile widths.
- Offer pages still carry `noindex, nofollow`; header and footer menus unchanged apart from existing entries.
- Build clean and no console errors on home, advisory, offers, and contact.
