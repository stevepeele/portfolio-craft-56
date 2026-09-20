# Identity-led homepage entrance and connected pathways

## Goal
Turn the first visit to `stevepeeleii.com` into a brief, memorable identity-selection experience that reveals Steve’s different modes of work without blocking the fully loaded homepage. Build first-class SPIIX, consulting, and music pathways inside the main site, while preserving clear bridges to their related subdomains.

## Homepage entrance
- Add a full-viewport, accessible entrance layer over the already-rendered homepage, following the selected **Editorial identity selector** direction.
- Lead with an original, self-aware question in the spirit of “So, who am I to you?” and six polished identity choices:
  - Growth builder
  - Experimental challenger
  - Executive operator / proof maker
  - Mentor and listener
  - Thinker and sharer
  - Artist and performer
- Give every choice a short, human teaser and a visible destination cue; avoid service-card language.
- Map choices intentionally:
  - Growth builder → Results
  - Experimental challenger → SPIIX Advisory
  - Executive operator → Experience
  - Mentor and listener → SPIIX Advisory
  - Thinker and sharer → About
  - Artist and performer → Music
- Add **Meet Steve** to enter the homepage and a separate **Don’t show this again** action that permanently remembers the choice in that browser.
- Keep the entrance dismissible with Escape, keyboard navigable, focus-trapped while open, correctly announced to assistive technology, and restored only if browser storage is cleared.

## Motion and visual treatment
- Preserve the site’s deep navy/electric-blue system, but add a sharper editorial and liner-notes character instead of changing the whole brand.
- Animate the main question with restrained typographic movement and a subtle cursor/focus-responsive treatment; do not distort readability.
- Let the six identities respond through precise focus, underline, edge-light, and copy transitions rather than large visual effects.
- Choreograph entry and dismissal quickly, lock background scrolling while open, and provide a complete reduced-motion fallback.
- Create a compact mobile composition that fits the selection flow without clipped controls or inaccessible scrolling.

## SPIIX and consulting pathways
- Treat the existing `/advisory` page as the first-class SPIIX destination and refine its language and actions around mentorship, advisory, hard decisions, and leadership support.
- Treat `/services` and its three existing offer pages as the first-class consulting/build destination.
- Add a concise pathways section and contextual links so visitors can move among Steve, SPIIX, consulting/build work, and music without confusion.
- Wire **Advisory**, **Services**, and **Music** into shared navigation; keep the primary nav readable by moving secondary destinations into a deliberate overflow/mobile grouping if needed.
- Keep `spiix.stevepeeleii.com`, `build.stevepeeleii.com`, and `music.stevepeeleii.com` as labeled related-property links where useful, while internal pages remain the main browsing experience.
- Preserve CTA rules: **Let’s Talk** goes to Contact, CV actions go to `cv.stevepeeleii.com`, and pathway-specific actions go to their named destination.

## Music page
- Add `/music` as a standalone, indexable page with a darker, cinematic editorial treatment that still belongs to the main site.
- Explain that music is a parallel professional practice that reflects the same systems thinking, listening, collaboration, experimentation, and execution found in Steve’s operating work.
- Present ColdHarbour, Until the Dead Walk, Grave Friends, Wasted Away, and Vacillantes as selected projects.
- Use only supported facts: Steve currently plays guitar for ColdHarbour, has a long creative history with Vacillantes, and has the known release catalog already supplied. Do not invent dates, genres, roles, biographies, links, or achievements for projects lacking verified details.
- Add useful actions for exploring the music property and contacting Steve; leave unsupported project-specific links out until supplied.

## Search, sharing, and consistency
- Add unique title, description, Open Graph title/description, `og:type`, Twitter card, canonical URL, and relevant structured data to the new Music page.
- Refresh homepage metadata and structured data so Steve’s operator, advisor, and musician identities are represented naturally without keyword stuffing.
- Review Advisory and Services metadata and link language so SPIIX and consulting intent are distinct.
- Update shared footer pathways and ensure all internal destinations use native site navigation.

## Technical details
- Implement the entrance as a client-safe React component mounted only on the homepage.
- Read dismissal state after hydration to avoid server/client mismatch; store only the permanent dismissal flag locally and no personal data.
- Use semantic design tokens and existing shared controls/styles, extending global tokens only for the entrance and music-specific surfaces.
- Do not add a database or admin dependency for this experience.

## Validation
- Verify first visit, Meet Steve, each identity selection, Escape, focus trapping, browser refresh, and permanent dismissal behavior.
- Verify desktop and mobile layouts, reduced motion, scroll locking, touch targets, and no text overlap.
- Verify `/music`, `/advisory`, `/services`, all shared navigation links, related-property links, and CTA destinations.
- Confirm every content route has complete unique metadata, then check the final build, runtime logs, browser console, and network requests.
