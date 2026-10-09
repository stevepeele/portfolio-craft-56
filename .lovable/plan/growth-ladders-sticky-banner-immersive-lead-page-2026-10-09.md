# Growth Ladders — sticky banner + immersive lead page

## What gets built

### 1. Sticky ebook banner (main portfolio)
- Thin bar pinned above the site header on all main portfolio pages (not inside /spiix, not on the Growth Ladders page itself).
- Copy: "NEW · Growth Ladders — Operators Edition. What to climb so that every step matters." + "Climb the ladder" link to `/growth-ladders`.
- Dismissible (remembered on the device), keyboard accessible, collapses cleanly on phones.
- Uses a small taste of the Growth Ladders palette so it reads as a teaser, not a site restyle.

### 2. `/growth-ladders` — the page is the ladder
A self-contained brand used only on this page: no portfolio header/footer, its own fonts, colors, cursor, and sound-free motion. Scroll goes upward: the page opens at the bottom (ground level) and you climb.

```text
  [ SUMMIT ]  Your weakest rung -> signup form -> unlock
  [ 04 SCALE ]     own type + color, full screen
  [ 03 SYSTEMS ]   own type + color, full screen
  [ 02 STRATEGY ]  own type + color, full screen
  [ 01 SIGNAL ]    own type + color, full screen
  [ GROUND ]  Cover: "GROWTH LADDERS" + diagnostic entry
```

- Running altitude counter fixed on the edge (e.g. "ALT 0000 m" -> "ALT 4000 m"), rung marker, and a vertical rail with rung ticks that fill as you climb.
- Each rung is a full screen with its own personality, drawn straight from the book's ladder table:
  - 01 Signal — cold oscilloscope green on black, mono type, scanline/noise texture. Question: "What do we know, and what decision does it change?" Artifact: Signal Register.
  - 02 Strategy — paper white, red ink, tight serif. "What bounded intervention do we choose?" Artifact: Decision Brief.
  - 03 Systems — blueprint blue, technical grid, condensed grotesk. "How does it run without heroics?" Artifact: Runbook.
  - 04 Scale — molten amber/gold, huge display type. "What can it bear, and at what economics?" Artifact: Decision Ledger.
  - Each shows the work, the exit test, and one pull quote from the book ("Read first. Choose small. Build what holds. Scale what earns it.").
- Weird touches: rungs physically rendered as ladder bars between screens; type distorts slightly with scroll speed; a "you skipped a rung" warning flashes if someone jumps straight to the top; the ground screen has a faint ladder shadow; reduced-motion users get a calm, static version.

### 3. Quick diagnostic -> weakest rung -> signup
- 8 statements (2 per rung), adapted from the book's Growth Ladder Diagnostic, scored 0 / 1 / 2 ("A 2 you can't show is a 1").
- Result: lowest rung wins (ties go to the lower rung — "start at the lowest broken dependency"). The page auto-climbs to that rung, highlights it, then lands on the signup form with a tailored line ("Your constraint lives at Systems. Chapter 08–09 and the Systems Playbook start there.").
- Diagnostic can be started from the ground screen or skipped.

### 4. Lead capture
- Fields: name, email, company, role, plus the diagnostic result attached automatically.
- Each signup is saved in the backend (new table for Growth Ladders signups) and emailed to you through the same FormSubmit address the SPIIX form uses, with one silent retry. The visitor is never blocked by delivery.
- After signup: a "summit" confirmation screen with the download.

### 5. Search + sharing
- Page is indexable, with its own title, description, share tags, and Book structured data; added to the sitemap.

## Open items you should know about
- The book still has "[STEVE TO ADD]" placeholders (ISBN, Praise page). The landing page will not show endorsements or an ISBN.
- Download delivery: I'll host the PDF you linked on the site and unlock it after signup. If you'd rather email it only, or keep it private, say so.
- The book says every scenario is hypothetical; the page will carry that note and use no invented results.

## Technical details
- New route `src/routes/growth-ladders.tsx` with scoped stylesheet `src/styles/growth-ladders.css` (all selectors under a `.gl-root` scope) and fonts loaded via that route's head links only.
- Bottom-to-top climb: column-reverse layout with initial scroll to the bottom after hydration; altitude derived from scroll progress via a passive scroll listener + `requestAnimationFrame`; CSS view-timeline for rung reveals; `prefers-reduced-motion` disables distortion and auto-scroll.
- Diagnostic scoring in a pure, tested module `src/lib/growth-ladders-diagnostic.ts` (bun tests: scoring, tie-breaking to lowest rung).
- Banner component `src/components/EbookBanner.tsx` mounted in `SiteHeader`; hides on `/spiix*` and `/growth-ladders`; dismissal stored in localStorage read in `useEffect` (hydration-safe).
- Migration: `growth_ladders_signups` (RLS on, service-role only); public validated server function (zod) inserts the row, then client fires FormSubmit JSON to the existing token endpoint with `_subject: "New Growth Ladders signup"` and one retry.
- PDF copied to `public/growth-ladders-operators-edition.pdf`; link revealed post-signup.
- Head: unique title/description/og/twitter, canonical `https://stevepeeleii.com/growth-ladders`, JSON-LD `Book` + `BreadcrumbList`; sitemap entry added. AGENTS.md rule recorded for the scoped Growth Ladders brand.
- Verify: build clean, tests pass, Playwright at 1280 and 390 (climb, altitude counter, diagnostic routing, signup row saved, FormSubmit POST fires), banner shows on portfolio pages and not on /spiix or /growth-ladders.
