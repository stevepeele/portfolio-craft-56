# Kinetic editorial interaction and Demand Curve verification

## Goal
Make the portfolio feel more alive and responsive without making it busy. Use the selected **Kinetic editorial** direction: motion should clarify hierarchy, location, and cause-and-effect rather than decorate the page.

## Site-wide interaction language
- Add a small reusable reveal system for headings, proof blocks, timelines, and calls to action as they enter the viewport.
- Give links, cards, pathway choices, and buttons more tactile hover, focus, and press feedback while preserving the existing dark executive design.
- Animate key numbers and linear process diagrams only when they become visible; run each treatment once rather than continuously.
- Keep transitions short and restrained, prevent layout shifts, and fully disable nonessential movement when reduced motion is preferred.
- Apply the treatment selectively to the main Home, Work, SPIIX, Music, and Contact experiences so the system feels coherent rather than uniformly animated.

## Demand Curve analysis
- Fix the confirmed mobile overflow: the current page is 585px wide in a 411px viewport.
- Add a compact horizontal mobile section index; the current analysis navigation is hidden below the desktop breakpoint.
- Track the active section as the reader scrolls and synchronize it with the section index and top reading-progress line.
- Turn the six-step operating loop into a progressive sequence: nodes activate in order as the diagram enters view, with restrained hover/focus detail on desktop and touch-safe states on mobile.
- Reveal each opportunity and strategic thesis with a short rise/fade, while preserving every word, metric, disclaimer, and the independent/non-affiliated positioning.
- Strengthen the Now → Next → Then sequence with progressive emphasis and tactile cards, without changing the recommendation order.
- Keep the page unlisted, absent from shared navigation/footer, and `noindex, nofollow`.

## Technical details
- Prefer lightweight React/CSS and IntersectionObserver over adding a large animation dependency.
- Build reusable motion primitives with semantic design tokens; no hardcoded component colors or scroll hijacking.
- Keep focus states, anchor navigation, keyboard use, and screen-reader semantics intact.
- Preserve the current metadata and structured data, adding only missing required social metadata if verification finds a gap.

## Verification and fixes
- Recheck the latest build output after implementation and repair any reported errors.
- Test `/demand-curve-analysis` at desktop and mobile widths, including all anchor links, active-section updates, sticky behavior, progress, CTA destinations, overflow, and reduced-motion mode.
- Inspect screenshots of the hero, operating loop, opportunity sections, and prioritization sequence.
- Check browser console, runtime, and failed network requests; resolve every issue found within this scope.
- Smoke-test the shared motion behavior on Home, Work, SPIIX, Music, and Contact to ensure it never obscures content or blocks navigation.
