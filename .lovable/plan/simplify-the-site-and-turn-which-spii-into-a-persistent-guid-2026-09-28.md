# Simplify the site and turn “Which SPII?” into a persistent guide

## Goal
Reduce the public site to a small, understandable set of destinations while preserving useful old URLs. Replace the blocking first-visit entrance with an optional guide that is always available, then make the Music and SPIIX journeys unmistakable on desktop and mobile.

## Simplified structure

Primary navigation becomes:

- **Home** — positioning, selected proof, how Steve thinks, and the main pathway choices
- **Work** — results, career experience, selected projects, and recommendations in one coherent evidence page
- **SPIIX** — advisory, mentorship, and links into focused offers
- **Music** — projects, creative practice, and related contact actions
- **Let’s Talk** — the single persistent contact action

Supporting destinations remain available without crowding the main navigation:

- **Offers** and their detail pages remain inside the SPIIX pathway.
- **CV** actions always open `cv.stevepeeleii.com`.
- The independent Demand Curve analysis remains unlisted and unchanged.

## Consolidate duplicate pages without breaking links

- Build `/work` into the comprehensive proof destination by combining the strongest material from Results, Experience, Portfolio, and Recommendations.
- Fold Steve’s personal story and working philosophy into a focused homepage section; keep `/contact` direct and action-oriented.
- Replace `/experience`, `/portfolio`, and `/recommendations` with permanent redirects to the relevant anchored sections on `/work`.
- Replace `/about` with a permanent redirect to the homepage’s About section.
- Replace the internal `/cv` page with a redirect to the established CV destination.
- Keep `/services` and its three offer pages live, unlisted, and reachable from SPIIX.
- Refresh internal links, metadata, canonical URLs, and structured data so retired pages no longer compete with their consolidated destinations.

## “Which SPII do you need?” guide

- Remove the automatic full-screen entrance from the homepage.
- Add a compact fixed corner action on desktop and a safe bottom action on mobile: **Which SPII do you need?**
- Expand it into an accessible, non-blocking chooser with six identities, concise need-based descriptions, and explicit destination labels.
- Use the approved hybrid mapping:
  - Persistent growth operator → **Work / Results**
  - Experimental rule breaker → **SPIIX / Focused offers**
  - Executive leader and proof maker → **Work / Experience**
  - Mentor and listener → **SPIIX / Advisory**
  - Thinker and sharer → **Home / About Steve**
  - Artist and performer → **Music / Projects**
- Keep the launcher available across the site; choosing a path closes it but never permanently removes it.
- Add polished open, close, and selection transitions with a complete reduced-motion fallback.
- Use proper focus containment, Escape behavior, click-away close, focus restoration, labels, and mobile scrolling.

## Pathway orientation

- Add a reusable responsive breadcrumb directly below the shared header.
- SPIIX trail: **Home / SPIIX / Offers / [Offer name]**.
- Music trail: **Home / Music**, with project context retained when a project modal opens.
- Work and homepage section destinations receive concise location labels when entered through the identity guide.
- Add a small **Choose another path** action on each primary destination and offer page that reopens the guide.
- Make desktop and mobile navigation visibly active, including parent-active behavior: SPIIX remains active throughout `/services` and offer pages.
- Ensure section links land below the sticky header and retain enough context to understand the destination immediately.

## Cohesion and cleanup

- Reduce repeated cards, duplicate statistics, and competing calls to action while retaining verified evidence.
- Standardize every primary action: **Let’s Talk** goes to `/contact`; CV actions go to `cv.stevepeeleii.com`; contextual actions go to the named page or section.
- Keep the existing dark editorial identity, but tighten spacing, hierarchy, labels, and transitions rather than adding decoration.
- Simplify the footer to essential contact details plus the same core destinations.
- Remove stale awards presentation and any unsupported or contradictory claims found during consolidation.

## Technical details

- Store the six pathway definitions in one shared data module so the launcher, labels, and return actions cannot drift.
- Mount the launcher once in the root layout so it works on every public page.
- Use typed internal navigation and route-aware matching for active states and breadcrumbs.
- Preserve old public URLs with route-level redirects rather than deleting them.
- Keep all state client-safe and ephemeral; no database or personal tracking is needed.
- Record the simplified route and shared-navigation decisions in the project architecture notes.

## Validation

- Test every primary link, redirect, anchored destination, offer link, CV action, and contact action.
- Test the launcher from every primary destination: open, select, close, Escape, click-away, keyboard traversal, focus return, and repeated reopening.
- Verify breadcrumbs and active states across `/music`, `/advisory`, `/services`, and every offer page.
- Check mobile and desktop layouts for clipping, overlap, touch targets, sticky elements, and correct scroll positioning.
- Confirm unique metadata on all remaining content pages, `noindex` on unlisted pages, clean runtime/build logs, and no broken internal links.
