# Plan: Add "Download CV" actions pointing to cv.stevepeeleii.com

## Goal
Surface a downloadable-CV action (`https://cv.stevepeeleii.com`) in the places a visitor would expect to grab Steve's resume, using the existing dark/bold button styles. Treat it as an external link that opens in a new tab.

## Source of truth
- Add `cv: "https://cv.stevepeeleii.com"` to the `profile` object in `src/data/resume.ts` so every surface reads from one place.

## Where the CV action appears

1. **Header** (`src/components/site-header.tsx`) — desktop: add a compact "Download CV" ghost/outline button next to the existing "Let's Talk" CTA. Mobile: render it inside the mobile nav menu above the link list. Use `profile.cv`.
2. **Homepage hero** (`src/routes/index.tsx`) — add a "Download CV" button to the hero CTA row (alongside "Let's Talk" and "View experience"), and a second instance in the final CTA section near the email button.
3. **Experience page** (`src/routes/experience.tsx`) — add "Download CV" to the bottom CTA row next to "Let's Talk".
4. **About page** (`src/routes/about.tsx`) — add "Download CV" to the bottom CTA next to "Get in touch".
5. **Contact page** (`src/routes/contact.tsx`) — add a CV row to the contact `items` grid (label "Download CV", value "cv.stevepeeleii.com", `FileDown` icon), using `profile.cv`.
6. **Footer** (`src/components/site-footer.tsx`) — add a "Download CV" link in the footer link row alongside LinkedIn/Portfolio/Recommendations/Contact.

## Implementation details
- All CV links: `<a href={profile.cv} target="_blank" rel="noreferrer">`, styled with `btn-ghost` or `btn-outline` equivalent (match existing ghost buttons) so it reads as a secondary action next to primary "Let's Talk".
- Use the `FileDown` icon from `lucide-react` on buttons/cards where an icon fits the existing pattern.
- No new routes, no data model changes beyond the single `cv` field.

## Verification
- Build passes (`build OK` in build-errors.log).
- Playwright check: confirm the CV button is present and clickable on the homepage hero and contact page, and that it opens the correct external URL (new tab target).
