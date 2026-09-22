# Music Page with Band Modals

## Goal
A first-class `/music` page for Steve's professional music life — darker, more atmospheric than the business pages — with the five projects, photo slots ready for real band photos, and an accessible modal per band covering influence, links, and related recommendations.

## What gets built

### 1. Music data (`src/data/music.ts`)
Typed entries for the five projects. Only verified facts; nothing invented.
- **ColdHarbour** — Steve's current band; he plays guitar. Marked as active.
- **Vacillantes** — long-running creative history.
- **Until the Dead Walk**, **Grave Friends**, **Wasted Away** — listed as projects; details kept minimal until Steve supplies genre/years/role.
- Each entry: name, role (where known), status, short safe description, photo slot reference, optional streaming links (empty until supplied), influence notes, related recommendation IDs.

### 2. `/music` page (`src/routes/music.tsx`)
- Dark, cinematic editorial hero: music as a parallel professional practice — systems thinking, collaboration, experimentation. Not "a hobby."
- Project grid of five cards, each with a dedicated **photo slot** (styled placeholder panel with the band name, ready for a real photo to drop in), role/status line, and a "More" action opening the band modal.
- A short "what music and the work share" section tying the creative practice to how Steve operates professionally.
- CTA: Contact / booking.
- Own `head()`: unique title ("Music — Steve Peele II"), description, og:title, og:description.

### 3. Band modal (accessible, shadcn Dialog)
Opens from each project card. Contains:
- Band name + role/status
- **Influence on Steve's work** — how the project connects to his leadership/operations/creative approach
- **Links** — streaming/social slots (rendered only when URLs are supplied; no dead links)
- **Related recommendations** — pulled from the existing recommendations data only where a genuine connection exists; otherwise the section is omitted rather than padded
- Keyboard accessible, focus-trapped, Escape/close support, labeled for screen readers

### 4. Wiring & polish
- Add Music to header nav and footer.
- Contextual bridge from the About page (music mention links to `/music`).
- Match site design system: semantic tokens only, no hardcoded colors; darker/atmospheric treatment for this page within the existing token system.
- Update `roadmap.md`.

### 5. Verification
- Build passes; check `/tmp/observability/build-errors.log`.
- Playwright: `/music` loads, five cards render, modal opens/closes via click and keyboard, no console errors, mobile viewport check, nav links present.

## Not included (needs Steve's input later)
- Real band photos (slots are ready to receive them)
- Genres, active years, release names, streaming links for each band
- The homepage entrance overlay (separate planned work)

## Technical notes
- Route file `src/routes/music.tsx` with `createFileRoute("/music")`; route tree regenerates automatically.
- Dialog from existing shadcn `dialog` component (add via shadcn if not present).
- No backend, no Cloud needed.
