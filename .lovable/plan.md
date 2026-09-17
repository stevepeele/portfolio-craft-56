# Plan: Simplify the portfolio and rebuild Experience

## Goal
Turn the site into a tighter, more personal decision path: establish who Steve is, prove the outcomes, show the full career story, reinforce it with recommendations, and make contact effortless.

## Final site structure
- **Home** (`/`) — concise positioning, proof, capabilities, selected experience, recommendations, and focused next steps.
- **Results** (`/results`) — outcome-led case studies and business impact.
- **Recommendations** (`/recommendations`) — social proof from leaders, clients, and teammates.
- **Experience** (`/experience`) — the comprehensive, interactive career and project story.
- **About & Contact** (`/contact`) — Steve’s story, working style, direct contact options, booking, LinkedIn, and CV.

Preserve existing traffic with redirects:
- `/work` → `/results`
- `/portfolio` → `/experience`
- `/about` → `/contact`

## Navigation and action rules
- Reduce the shared header to the five destinations above.
- Label the combined destination **About & Contact**.
- Keep **Let’s Talk** consistently linked to `/contact`.
- Keep every **CV** action linked to `https://cv.stevepeeleii.com` in a new tab.
- Keep contextual actions literal: “View experience” opens Experience, “See recommendations” opens Recommendations, and “View results” opens Results.
- Remove duplicate actions when the visitor is already on that destination; each page gets one clear primary next step and, only when useful, one secondary action.
- Simplify the footer to the same core destinations plus direct contact, LinkedIn, and CV.

## Experience rebuild
Create a visually stronger narrative that merges the current Experience and Portfolio content:

1. **Opening proof** — role positioning, experience span, and verified career-scale metrics.
2. **Fluid career flow** — an alternating vertical timeline with clear chronology, company, role, period, discipline, selected outcome, and subtle motion that respects reduced-motion settings.
3. **Interactive company entries** — every company is a real button and opens an accessible modal containing:
   - company name and Steve’s role/period;
   - concise company description;
   - verified acquisition or company outcome where applicable;
   - official company link when verified;
   - portfolio project summary, measurable results, growth levers, and contribution bullets;
   - related recommendations only when a company relationship is supportable.
4. **Capability arc** — show how Steve’s work evolves across growth, demand generation, product growth, marketing operations, systems, and leadership.
5. **Closing action** — route “Let’s Talk” to the combined Contact page and retain a secondary CV action.

Use the existing factual resume content as the source of truth. Do not invent company facts, acquisitions, recommendation relationships, or impact claims; omit fields that cannot be verified.

## Content and visual direction
- Rewrite repetitive copy into Steve’s plainspoken, direct voice: systems-minded, commercially grounded, human, and confident without consultant clichés.
- Keep the established dark executive palette, but add stronger editorial pacing, oversized numbers, timeline rhythm, directional dividers, and restrained reveal/transition effects.
- Make the mobile experience feel intentionally sequenced rather than a stack of repeated cards.
- Remove every awards mention and delete the unused awards data.
- Keep certifications and education only where they add credibility without interrupting the career narrative.

## Search and sharing updates
- Rework titles, descriptions, Open Graph text, Twitter metadata, keywords, canonical URLs, and `og:url` for every remaining public page.
- Position Steve naturally around growth marketing leadership, marketing operations, demand generation, revenue growth, GTM strategy, fractional growth leadership, SaaS/startup growth, and Cincinnati/Ohio.
- Use the canonical domain `https://stevepeeleii.com`.
- Update structured data to describe Steve as a person and professional operator, without unsupported claims.
- Update crawler discovery for the new route set and remove obsolete route URLs from public discovery files.

## Technical approach
- Consolidate company, project, and recommendation relationships in the existing resume data source.
- Build a reusable accessible company-detail dialog with keyboard close, focus handling, backdrop close, and body-scroll protection.
- Use TanStack links for internal navigation and route redirects for retired URLs.
- Keep one H1 per page and semantic timeline, article, quotation, and contact markup.

## Verification
- Confirm all five navigation destinations and every CTA on desktop and mobile.
- Open and close multiple company dialogs by click, keyboard, close control, and backdrop.
- Confirm company links, CV links, LinkedIn, booking, email, and phone destinations.
- Verify old `/work`, `/portfolio`, and `/about` URLs land on their replacements.
- Check all remaining pages at mobile and desktop sizes for overflow, overlap, and coherent visual flow.
- Confirm no awards text remains, metadata is unique per page, browser console is clean, and the preview reports a successful build.

## Assumptions
- “Combine About and Contact” means `/contact` becomes the single **About & Contact** page, while `/about` redirects there.
- “Company description/purchase” means a short company description plus acquisition/purchase context where one is publicly verifiable.
