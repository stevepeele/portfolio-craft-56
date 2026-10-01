# Complete all outstanding site work

## Goal
Finish the approved simplification, pathway, interaction, content-cleanup, and Music-image work as one cohesive release. Preserve useful URLs, verified facts, the dark editorial identity, and the unlisted Demand Curve analysis.

## 1. Simplify the public site
- Reduce primary navigation to **Home, Work, SPIIX, Music, Let’s Talk** on desktop and mobile.
- Rebuild `/work` as the single evidence destination, combining the strongest verified results, career history, selected projects, and recommendations without repeating the same metrics in multiple formats.
- Fold the useful personal story and working philosophy from About into a clear homepage section.
- Keep `/contact` short, direct, and organized around the visitor’s reason for reaching out.
- Simplify the footer to essential contact details, the five core destinations, LinkedIn, and the external CV.

## 2. Preserve old links without preserving duplicate journeys
- Redirect `/experience`, `/portfolio`, and `/recommendations` to the relevant sections of `/work`.
- Redirect `/about` to the About section on the homepage.
- Redirect `/cv` to `https://cv.stevepeeleii.com`.
- Update every internal reference to those old pages, including the homepage and Demand Curve analysis.
- Keep `/services` and its offer pages live and reachable from SPIIX, but out of primary navigation.
- Keep `/demand-curve-analysis` unlisted, explicitly independent/non-affiliated, and `noindex, nofollow`.

## 3. Replace the blocking entrance with “Which SPII do you need?”
- Remove the automatic homepage overlay and its permanent-dismiss storage behavior.
- Add a persistent corner launcher on desktop and bottom-safe launcher on mobile, mounted across the site.
- Open an accessible, non-blocking chooser with six paths and explicit destinations:
  - Persistent growth operator → Work / Results
  - Experimental rule breaker → SPIIX / Offers
  - Executive leader and proof maker → Work / Experience
  - Mentor and listener → SPIIX / Advisory
  - Thinker and sharer → Home / About Steve
  - Artist and performer → Music / Projects
- Add smooth restrained transitions, click-away close, Escape, focus containment/restoration, keyboard traversal, mobile scrolling, and reduced-motion behavior.
- Add “Choose another path” actions on primary destinations and offer pages.

## 4. Make pathways self-orienting
- Add a reusable responsive breadcrumb below the header.
- Show **Home / SPIIX / Offers / Offer name** throughout the advisory and offer path.
- Show **Home / Music** on Music, preserving project context when a project dialog opens.
- Add visible active navigation states on desktop and mobile; SPIIX remains active throughout `/services` and its child pages.
- Ensure guide destinations and anchored sections land below sticky navigation with clear location labels.

## 5. Finish the Music page imagery
- Generate five distinct square, release-art-style editorial thumbnails for ColdHarbour, Vacillantes, Until the Dead Walk, Grave Friends, and Wasted Away.
- Keep them atmospheric and cohesive with the site, but do not present generated work as official album covers or archival band photography.
- Replace every “Photo coming soon” slot with the project thumbnail, with responsive crops, meaningful alt text, and the same artwork carried into each project dialog.
- Keep the artwork data-driven in the Music project records so supplied official imagery can replace it cleanly later.
- Do not invent genres, dates, roles, links, or release associations.

## 6. Content, SEO, and interaction cleanup
- Remove awards presentation and unsupported or contradictory wording discovered during consolidation.
- Preserve verified career metrics, but use them selectively and consistently.
- Standardize calls to action: **Let’s Talk** always opens `/contact`; CV actions use `cv.stevepeeleii.com`; contextual actions name and open their actual destination.
- Give every remaining content route complete, unique title, description, Open Graph title/description/type, and Twitter card metadata.
- Update canonicals and structured data for the consolidated information architecture.
- Extend the existing restrained Kinetic editorial motion to the rebuilt Home, Work, SPIIX, Music, and Contact experiences without hiding content or causing layout shifts.

## Technical details
- Store navigation and six pathway definitions in shared modules so labels and destinations cannot drift.
- Mount the guide once in the root layout; keep its state ephemeral and client-safe.
- Use TanStack route redirects and typed internal links; do not delete old public routes outright.
- Use semantic design tokens and existing accessible dialog/button patterns.
- Record the consolidated route architecture and generated-thumbnail replacement rule in `AGENTS.md`.

## Verification
- Check every core page, preserved redirect, anchor destination, offer link, external CV link, and contact action.
- Test header/footer active states, parent-active SPIIX behavior, breadcrumbs, and the guide from every core destination.
- Test guide open/close, Escape, click-away, focus return, keyboard order, and repeated reopening.
- Test all five Music cards and dialogs with their generated thumbnails on desktop and mobile.
- Confirm the Demand Curve page remains unlisted, noindex, responsive, and error-free.
- Inspect desktop and 411px mobile screenshots for overlap, clipping, sticky-element conflicts, and horizontal overflow.
- Confirm reduced-motion behavior, metadata, clean build output, no runtime/console errors, and no failed internal navigation.

## Known limitation
Official artwork cannot be sourced from linked project pages because no project URLs are currently stored or supplied. This pass will use clearly editorial, generated thumbnails; official images can replace them later without redesigning the page.
