export type HackingApp = {
  slug: string;
  label: string;
  blurb: string;
  status: "live" | "building" | "queued" | "soon";
  url?: string;
  description: string;
  why: string;
};

export const hackingApps: HackingApp[] = [
  {
    slug: "binsly",
    label: "Binsly",
    blurb: "Own your link layer",
    status: "live",
    url: "https://linklib.base44.app",
    description:
      "A link-in-bio and link library experiment — your links, your rules, no algorithmic middleman deciding who sees what.",
    why: "The link in bio is rented land. Binsly is the experiment in owning it.",
  },
  {
    slug: "profolio",
    label: "Profolio",
    blurb: "One baseline, many stories",
    status: "live",
    url: "https://profolioapp.stevepeeleii.com",
    description:
      "A professional portfolio builder. One private baseline of projects, skills, and credentials — then tailored views for whoever you're talking to.",
    why: "One resume for every audience is lazy. Maintaining five versions is a job. One baseline, many views.",
  },
  {
    slug: "smart-access",
    label: "Smart Access",
    blurb: "Coming soon",
    status: "soon",
    description: "Details coming soon — this one's still taking shape on the workbench.",
    why: "Watch this space.",
  },
  {
    slug: "stageplot-ai",
    label: "StagePlot AI",
    blurb: "Input list → stage plot",
    status: "live",
    url: "https://stageplot.stevepeeleii.com",
    description:
      "Paste a band's input list, get a professional stage plot + channel sheet in seconds. Built for live sound engineers who are tired of drawing rectangles in PowerPoint at 1am.",
    why: "90% of mic choices are automatic. The layout is standard. The channel sheet is formatting. So why do it by hand?",
  },
  {
    slug: "monitor-mix-cheat",
    label: "Monitor Mix Cheat",
    blurb: "Input list → monitor mix",
    status: "live",
    url: "https://monitormix.stevepeeleii.com",
    description:
      "Paste the band's input list and venue type, get per-channel monitor mix starting points — EQ, compression, and levels before the first soundcheck note.",
    why: "The 1am soundcheck scribble is a tradition nobody misses. If the input list is standard, the starting mix can be too.",
  },
  {
    slug: "nexus",
    label: "Nexus",
    blurb: "Coming soon",
    status: "soon",
    description: "Details coming soon — this one's still taking shape on the workbench.",
    why: "Watch this space.",
  },
  {
    slug: "dardo",
    label: "Dardo",
    blurb: "AI sidekick for agents",
    status: "live",
    url: "https://dardo.stevepeeleii.com",
    description:
      "An AI sidekick for real estate agents. One-tap capture, passive mileage and routing, and an evening brief with drafted follow-ups. $4.99/mo.",
    why: "The admin work between appointments eats the day. Dardo closes the day itself — and it's explicitly not another CRM.",
  },
  {
    slug: "stampd",
    label: "Stampd",
    blurb: "Shift & pay tracker",
    status: "live",
    url: "https://stampd.stevepeeleii.com",
    description:
      "A no-training shift and pay tracker for contractors and day laborers. Tap to clock in and out; the pay math handles itself. $29 one-time.",
    why: "The people doing the hardest work have the worst time records. If you can tap a button, you can use Stampd.",
  },
  {
    slug: "repurpose-engine",
    label: "Repurpose Engine",
    blurb: "One post, ten platforms",
    status: "live",
    url: "https://repurpose.stevepeeleii.com",
    description:
      "Write one post, get ten platform-native versions back — each shaped for where it lives, not the same text pasted everywhere.",
    why: "Rewriting the same post for every platform is a second job. The thinking stays yours; the reformatting shouldn't eat your afternoon.",
  },
  {
    slug: "gigsplit",
    label: "GigSplit",
    blurb: "Band pay splitter",
    status: "live",
    url: "https://gigsplit.stevepeeleii.com",
    description:
      "Enter the gig pay, add members and expenses, and see who gets what — with penny-exact math and paid tracking. $9 one-time.",
    why: "The payout argument in the parking lot is a tradition nobody likes. One clean screen ends it.",
  },
  {
    slug: "quotequick",
    label: "QuoteQuick",
    blurb: "Contractor quotes in minutes",
    status: "live",
    url: "https://quotequick.stevepeeleii.com",
    description:
      "Line items plus a job-site photo turn into a branded PDF quote, ready to send before you leave the driveway. $19 one-time.",
    why: "Slow quotes lose jobs. The contractor who answers in an hour with a clean number wins.",
  },
  {
    slug: "muse-vault",
    label: "Muse Vault",
    blurb: "98 templates for Muse",
    status: "live",
    url: "https://vault.stevepeeleii.com/",
    description:
      "A gallery of 98 ready-made templates for Muse — system prompts, skills, crons, and workflows across Work, Money, Career, Create, Home & Life, and Health & Family tracks. Ratings, reviews, curated collections, one-click install packs, community submissions, and 5 Scaffolding Kits. Launched on Product Hunt 2026-10-14.",
    why: "The best Muse setups are built, not discovered. Templates make the good ones shareable.",
  },
  {
    slug: "prepwise",
    label: "Prepwise",
    blurb: "Resume + job req → interview prep",
    status: "building",
    url: "https://prepwise.stevepeeleii.com",
    description:
      "Upload a resume (or paste LinkedIn), paste the job req, get a full interview prep guide: likely questions with answers tied to your experience, STAR story bank, questions to ask, salary talking points, company intel. Printable, past preps saved. Splash carries custom editorial illustrations (hero + step cards, 2026-10-14).",
    why: "He's interviewing. Generic prep advice is useless — the guide has to be built on his actual experience.",
  },
];

export type BuildQueueItem = {
  name: string;
  status: "shipped" | "next" | "queued";
  shippedDate?: string;
  description: string;
  url?: string;
};

export const buildQueue: BuildQueueItem[] = [
  {
    name: "Muse Vault",
    status: "shipped",
    shippedDate: "2026-10-14",
    description: "Template gallery for Muse — 98 ready-made templates across 6 use-case tracks, with ratings, curated collections, one-click install packs, community submissions, 5 Scaffolding Kits, and full install guides. Renamed from Muse Templates → PromptVault → Muse Vault; launched on Product Hunt 2026-10-14. Live at vault.stevepeeleii.com.",
    url: "https://vault.stevepeeleii.com/",
  },
  {
    name: "StagePlot AI",
    status: "shipped",
    shippedDate: "2026-10-10",
    description: "Input list → stage plot + channel sheet for live sound engineers.",
    url: "https://stageplot.stevepeeleii.com",
  },
  {
    name: "Profolio",
    status: "shipped",
    shippedDate: "2026-10-10",
    description: "Professional portfolio builder — one baseline, many tailored views.",
    url: "https://profolioapp.stevepeeleii.com",
  },
  {
    name: "Monitor Mix Cheat",
    status: "shipped",
    shippedDate: "2026-10-10",
    description: "Input list + venue type → monitor mix starting points (EQ, comp, levels).",
    url: "https://monitormix.stevepeeleii.com",
  },
  {
    name: "Dardo",
    status: "shipped",
    shippedDate: "2026-10-11",
    description: "AI sidekick for real estate agents — one-tap capture, evening brief. $4.99/mo.",
    url: "https://dardo.stevepeeleii.com",
  },
  {
    name: "Stampd",
    status: "shipped",
    shippedDate: "2026-10-11",
    description: "No-training shift & pay tracker for contractors and day laborers. $29 one-time.",
    url: "https://stampd.stevepeeleii.com",
  },
  {
    name: "Repurpose Engine",
    status: "shipped",
    shippedDate: "2026-10-11",
    description: "One post → platform-native versions for everywhere it lives.",
    url: "https://repurpose.stevepeeleii.com",
  },
  {
    name: "GigSplit",
    status: "shipped",
    shippedDate: "2026-10-11",
    description: "Band pay splitter — penny-exact payouts, who got paid tracking. $9 one-time.",
    url: "https://gigsplit.stevepeeleii.com",
  },
  {
    name: "QuoteQuick",
    status: "shipped",
    shippedDate: "2026-10-11",
    description: "Contractor quotes in minutes — line items + job-site photo → branded PDF. $19 one-time.",
    url: "https://quotequick.stevepeeleii.com",
  },
  {
    name: "Prepwise",
    status: "next",
    description: "Interview Prep AI v1: resume + job req → full prep guide (Q&A tied to your experience, STAR bank, questions to ask, salary talking points, company intel). Splash deployed at prepwise.stevepeeleii.com with custom editorial visuals (PLX-357); full auth flow ships on the next deploy once Vercel's daily deploy limit resets. (PLX-339)",
    url: "https://prepwise.stevepeeleii.com",
  },
  {
    name: "SubjectLine Lab",
    status: "next",
    description: "AI subject line generator + spam/deliverability scorer. Freemium → $12/mo.",
  },
  {
    name: "Proposal Pilot",
    status: "queued",
    description: "Client brief → structured proposal. $49 one-time.",
  },
  {
    name: "UTM Builder Pro",
    status: "queued",
    description: "Smart UTM links + history. Free → $8/mo.",
  },
  {
    name: "Landing Page Roast",
    status: "queued",
    description: "URL → scored AI teardown. Free teaser → $29 report.",
  },
];

export type StatusEntry = {
  date: string;
  title: string;
  detail: string;
};

export const statusLog: StatusEntry[] = [
  {
    date: "2026-10-17",
    title: "Building nav dropdown rebuilt — structure overhaul",
    detail:
      "SPIIX-705: the 'Building' dropdown had grown into 25 entries nobody could scan — including 11 changelog links and two 'coming soon' stubs. Rebuilt from a full inventory: the Changelogs group is gone from the nav (each app page now links its own ship history instead), Track holds Build log / Up next / Live board in plain words, and Apps lists the 10 real apps with status dots — adding the missing Monitor Mix Cheat and Muse Vault (renamed from PromptVault in the data to match the live /hacking/muse-vault page and the Product Hunt launch). Prepwise stays in the queue until its page ships; Smart Access and Nexus stay on the workbench page as coming-soon. Two /hacking index cards that 404'd (promptvault, prepwise) are fixed.",
  },
  {
    date: "2026-10-17",
    title: "Hacking pages: 'validate the work' modal beat",
    detail:
      "SPIIX-659: a validation modal across the /hacking experience — a 'Building / The receipt' beat at the foot of the index, all app pages, progress, status, and what's-next. One tap opens the receipt: live counts computed from hacking.ts (apps live, queue shipped, build-log entries, progress milestones), the quiet layers nod (content → fabric → scaffolding → built → community), and the line the whole thing earns — none of this was supposed to line up; it did. On /hacking/progress it also auto-opens once per session when you reach the end of the build board. Dark editorial, his voice, zero pitch.",
  },
  {
    date: "2026-10-14",
    title: "Scaffolding docs microsite: complete /scaffolding hub",
    detail:
      "PLX-398: built the complete scaffolding documentation hub — /scaffolding index plus 12 pages: architecture (cross-linked into the hub), projects index with 24 per-project doc pages (repo, Vercel project, live URL, stack, Linear project, notes — reconciled against a 23-project research inventory), infrastructure (Vercel/GitHub/Supabase/Sanity/Segment/HubSpot, secret locations, connector inventory), diagrams (portfolio topology, Supabase data map, deploy pipeline, lead/analytics/blog flows), tech considerations (build standards, ADRs, gotchas, security posture), runbook (8 incident playbooks), monitoring (status tiles, deploy watchers, cron inventory), deploys log, and changelog. All pages unlisted + noindex + canonical, no nav links. Changelog and deploys are data-driven JSON, kept current by a new daily cron (scaffolding-changelog-updater, ~06:30 ET) that merges GitHub commits, Linear completions, and Vercel deploys, then pushes via the connector so Vercel auto-deploys.",
  },
  {
    date: "2026-10-14",
    title: "Scaffolding: analytics/data-flows sub-pages fixed + real analytics deep dive",
    detail:
      "PLX-364: the /scaffolding/architecture/analytics and /data-flows sub-pages existed in the repo (PLX-335) but live they rendered the parent page's content — the parent route never rendered <Outlet/>, so child components never mounted (only the child's <title> showed). Fixed by converting /scaffolding/architecture to a bare-Outlet layout (services.tsx pattern) and moving the infrastructure content to a new /scaffolding/architecture/ index route. The analytics page got the full deep dive: Segment lifecycle (src/lib/segment.ts → __root.tsx, initSegment + segmentPage on nav), a 10-row event taxonomy table (event → where fired → destination, covering site-analytics.ts behavioral events, formsubmit.co lead routing, and HubSpot), integration notes (HubSpot portal 22009185 script, formsubmit.co routing via spiix-leads.ts / growth-ladders-leads.ts, Sanity CDN image flow), and PostHog gating (dormant unless VITE_POSTHOG_KEY set). No secrets or values — env names only; pages stay unlisted + noindex.",
  },
  {
    date: "2026-10-14",
    title: "Dardo — landing-page visuals: custom hero + section illustrations",
    detail:
      "Dardo's splash got real visuals: a custom editorial hero illustration (agent walking from their car toward a house at dusk, phone in hand, capture/voice/pin motifs) plus custom 'Your day, captured' and 'Your follow-ups, written' illustrations in the What-it-does and Evening-brief sections — all generated to match Dardo's pine/cream/clay brand, no stock. Integrated as optimized webp (explicit dimensions, lazy-load below the fold, no layout shift). Segment snippet now installed build-wide (same write key as the main site), SPIIX banner removed per the banners-off rule, and the dismissible 'Meet SPII' corner card added. Deploy with visuals staged — Vercel daily quota resets 8pm EDT 10/14. (PLX-361)",
  },
  {
    date: "2026-10-14",
    title: "Stampd landing refresh: custom illustrations, Segment, Meet SPII card",
    detail:
      "Stampd's splash landing page got its visuals pass: three custom stamp-motif illustrations (hero rubber-stamp STAMPED on a time card, gloved-finger START button with ON THE CLOCK stamp, pay-record stamped PAID RIGHT) — WebP, responsive srcset, no layout shift. SPIIX slim banners removed (banners OFF), HubSpot chat script removed, Segment installed (init + page view + landing CTA/identify tracking), and the dismissible Meet SPII corner card added. Deploy staged pending the 8pm EDT Vercel quota reset. (PLX-359)",
  },
  {
    date: "2026-10-14",
    title: "Profolio — custom landing-page visuals, hero + feature illustrations",
    detail:
      "Profolio's text-only landing page now carries a custom dark-editorial hero visual (professional-baseline motif) plus two supporting illustrations — capture-the-work and package-for-every-audience — all generated to the brand's parchment-on-near-black tokens, zero stock. Also: Segment snippet + CTA tracking installed (was missing; the page only had PostHog/Datadog), the SPIIX 'Get signals' banner removed (Banners OFF), and the dismissible 'Meet SPII' corner card added. Verified locally serving; deploy staged — Vercel daily quota exhausted until 8pm EDT 10/14, and it must go via API file upload: the profolio Vercel project is git-linked to the main-site repo, so a git deploy would steal the alias. (PLX-360)",
  },
  {
    date: "2026-10-14",
    title: "Dardo — landing-page visuals: custom hero + section illustrations",
    detail:
      "Dardo's splash got real visuals: a custom editorial hero illustration (agent walking from their car toward a house at dusk, phone in hand, capture/voice/pin motifs) plus custom 'Your day, captured' and 'Your follow-ups, written' illustrations in the What-it-does and Evening-brief sections — all generated to match Dardo's pine/cream/clay brand, no stock. Integrated as optimized webp (explicit dimensions, lazy-load below the fold, no layout shift). Segment snippet now installed build-wide (same write key as the main site), SPIIX banner removed per the banners-off rule, and the dismissible 'Meet SPII' corner card added. Deploy with visuals staged — Vercel daily quota resets 8pm EDT 10/14. (PLX-361)",
  },
  {
    date: "2026-10-14",
    title: "Prepwise — landing-page visuals: custom hero + step illustrations",
    detail:
      "Prepwise splash got real visuals: a custom editorial hero illustration (candidate walking into an interview room) plus custom illustrations on the step-01 resume and step-03 'walk in prepared' cards — all generated to match the app's dark/amber brand, no stock. Integrated with next/image (explicit dimensions, responsive sizes, no layout shift). Segment Page Viewed now fires on the splash via the root layout. Deploy with visuals staged — Vercel daily quota resets 8pm EDT 10/14. (PLX-357)",
  },
  {
    date: "2026-10-14",
    title: "Blog: CTA buttons, author closing note, auto related posts",
    detail:
      "Every blog post now ends with an 'A note from the author' card (contact: steve@stevepeeleii.com + contact page) and a Related reading section — manual picks first, automatic fallback by shared categories/tags, then latest posts. New ctaButton block type in the Sanity schema + renderer so posts can carry real CTA buttons (primary/secondary); the Muse Vault post gets Browse-the-Vault + Submit-a-template buttons. (PLX-354)",
  },
  {
    date: "2026-10-14",
    title: "PrepEdge — Interview Prep AI v1 built, deployed",
    detail:
      "Built and deployed the Interview Prep AI: resume upload (PDF/DOCX) + LinkedIn paste, job req fetch + parse, AI prep guide (likely Q&A tied to your experience, STAR story bank, questions to ask, salary talking points, company intel), printable guide, past preps saved per user, Segment tracking. Live splash at prepwise.stevepeeleii.com. Two loose ends: authed routes need a redeploy once Vercel's daily deploy limit resets (402 free-tier cap), and the GitHub repo creation needs his sign-in in the agent browser. (PLX-339)",
  },
  {
    date: "2026-10-14",
    title: "/Writing folded into /Blog as a combined stream",
    detail:
      "/writing now redirects to /blog (permanent, PLX-332) and the dead /writing route is removed. /Blog carries the de-emphasized 'Elsewhere' secondary stream of recent Substack + Medium posts (PLX-336: smaller 'Also on' cards, build-time RSS snapshot refreshed on every build, graceful degradation). Added the optional cross-posted callout: Sanity cards show an 'Also on Medium/Substack' badge when a title matches across sources. Nav and breadcrumbs updated: Writing → Blog. (PLX-332)",
  },
  {
    date: "2026-10-14",
    title: "Content Studio — review workflow (stage for review, never direct publish)",
    detail:
      "Sanity Studio at /studio now enforces Steve's standing rule: drafted posts are staged for review before anything is published. Added a 'Staged for review' flag on articles, a Review Queue list in the studio, and a warning-tone badge on staged drafts. Still needed: add stevepeeleii.com + www.stevepeeleii.com to the Sanity project's CORS origins and set SANITY_PREVIEW_TOKEN on Vercel for draft previews. (PLX-331)",
  },
  {
    date: "2026-10-14",
    title: "PromptVault — renamed, 63 templates, About page, subdomain",
    detail:
      "Muse Templates renamed to PromptVault (clearer brand, cleaner subdomain). Gallery grew from 32 to 63 templates with 30 new additions (tax prep, elder care, garden planner, retirement countdown, and 26 more). All 63 templates got upgraded install guides (prerequisites, steps, customization, troubleshooting). Category/track selector bug fixed via event delegation. About page added. Wired to vault.stevepeeleii.com — DNS CNAME record pending at GoDaddy. (PLX-306–PLX-311)",
  },
  {
    date: "2026-10-14",
    title: "Muse Templates v2 — 32 templates, full feature set",
    detail:
      "Shipped the complete Muse Templates build: gallery grew from 12 to 32 templates (salary negotiation, cold outreach, invoice chaser, wedding planner, personal CRM, and 15 more), dual-axis browsing by format + use-case track (Work, Money, Career, Create, Home & Life, Health & Family), ratings & reviews, 3 curated collections with one-click install packs, template submission + moderation flow, versioning/changelog, trending, and full SEO. (PLX-296–PLX-304)",
  },
  {
    date: "2026-10-13",
    title: "Muse Templates launched",
    detail:
      "Shipped a public template gallery for Muse — 12 ready-made system prompts, skills, crons & workflows (Second-in-Command, Morning Briefing, Inbox Triage, Deep Research, and 8 more) with copy-to-clipboard install. Live at muse-templates-stevepeeles-projects.vercel.app. (PLX-295)",
  },
  {
    date: "2026-10-13",
    title: "Proven-results cards reordered + acquired badges",
    detail:
      "Card order is now Launch by NTT DATA, Dotloop / Zillow, Astronomer, Amify (Tixxy moved out of the highlight set). Launch and Dotloop / Zillow carry an \"Acquired\" badge on the homepage and /work. (PLX-292)",
  },
  {
    date: "2026-10-13",
    title: "Full professional experience restored + testimonials rewritten",
    detail:
      "Restored all 10 roles to the site (Amify, Tixxy, Buyside, EBTH, API Nation, Astronomer, Inman News, Advisory alongside Launch and Dotloop) with metrics from the canonical resume, added 6 new portfolio project entries, and rewrote all 15 testimonials for sharper professional-capability focus. (PLX-287)",
  },
  {
    date: "2026-10-13",
    title: "Home refresh: results cards + logo strip",
    detail:
      "Proven-results cards simplified and doubled to four (Tixxy, Amify join Launch and Dotloop), plus a subtle marquee of everywhere the work got done. (PLX-291)",
  },
  {
    date: "2026-10-12",
    title: "Scaffolding page is now fully login-free",
    detail:
      "Dropped the Mission Control iframe from /scaffolding/architecture — the page now shows only data that needs no sign-in. Section 04 is a live-apps directory (every app, one tap away); Mission Control stays one tap away as a deep link.",
  },
  {
    date: "2026-10-12",
    title: "Hidden /scaffolding architecture page",
    detail:
      "Unlisted, noindex reference page: portfolio architecture diagrams, Supabase data map, per-app properties, the live Mission Control embed, monitoring tiles, and the runbook. Regenerates from the architecture data file.",
  },
  {
    date: "2026-10-12",
    title: "Segment analytics merged sitewide",
    detail:
      "Page tracking on every route, event tracking on every CTA and the Signal signup — the whole site now reports into one place.",
  },
  {
    date: "2026-10-12",
    title: "Publish queue: Lovable build cache",
    detail:
      "Site deploys are paused on a stale Lovable build error referencing files that don't exist. Support ticket filed — everything merged is waiting on their clear.",
  },
  {
    date: "2026-10-12",
    title: "Monitor Mix Cheat joins the Building nav",
    detail:
      "v2 (share links, dark venue mode, print layout) now has its own page under Building — every live app is linked from the site.",
  },
  {
    date: "2026-10-12",
    title: "Repurpose Engine v2 live with real generation",
    detail:
      "History, tone presets, and the LLM generate route went live on Vercel — the demo-mode asterisk is gone.",
  },
  {
    date: "2026-10-12",
    title: "Five apps shipped in one day",
    detail:
      "Dardo, Stampd, Repurpose Engine, GigSplit, and QuoteQuick all went live on Vercel — custom code, PostHog wired in, Linear projects + backlogs for each.",
  },
  {
    date: "2026-10-12",
    title: "Mission Control launched (private)",
    detail:
      "Private dashboard tracking all ten properties — traffic, revenue, Linear status, recent activity. Password login, per-app detail pages.",
  },
  {
    date: "2026-10-12",
    title: "Analytics live across the board",
    detail:
      "PostHog capturing on the main site and all five new apps, feeding Mission Control's traffic views.",
  },
  {
    date: "2026-10-12",
    title: "Public board shows Pub projects only",
    detail:
      "New rule: the Linear board on the site only pulls projects carrying the Pub label. Sprint and Mission Control stay private.",
  },
  {
    date: "2026-10-11",
    title: "Building nav simplified",
    detail:
      "The Hacking nav is now Building, with the picklist grouped into Board and Apps sections. Same pages, cleaner path.",
  },
  {
    date: "2026-10-12",
    title: "Monitor Mix Cheat v2 launched",
    detail:
      "Share links, dark venue mode, print layout, editable cells. Supabase schema migration pilot complete (soak healthy).",
  },
  {
    date: "2026-10-11",
    title: "Linear board goes native on the site",
    detail:
      "The dev tracker now lives on /hacking/status, /hacking/whats-next, and /hacking/progress — real Linear data, synced on every build. Hacking pages renamed to Building.",
  },
  {
    date: "2026-10-10",
    title: "Monitor Mix Cheat launched",
    detail: "Input list + venue → per-channel monitor mix starting points. Third app of the day.",
  },
  {
    date: "2026-10-10",
    title: "Profolio v1 — real accounts, real backend",
    detail: "Supabase auth, marketing site, free/pro tiers. Graduated from demo to product.",
  },
  {
    date: "2026-10-10",
    title: "StagePlot AI launched",
    detail: "First app of the sprint. Input list → stage plot + channel sheet, live on Vercel.",
  },
];

export type ProgressItem = {
  app: string;
  status: "live" | "building" | "queued";
  url?: string;
  updated: string;
  note: string;
};

export const hackingProgress: ProgressItem[] = [
  {
    app: "StagePlot AI",
    status: "live",
    url: "https://stageplot.stevepeeleii.com",
    updated: "2026-10-10",
    note: "Launched. Monitoring traction.",
  },
  {
    app: "Profolio",
    status: "live",
    url: "https://profolioapp.stevepeeleii.com",
    updated: "2026-10-14",
    note: "Landing-page visuals shipped: custom hero + 2 feature illustrations in the parchment-on-dark brand, Segment tracking + Meet SPII corner card added, SPIIX banner removed. Deploy staged — Vercel daily quota resets 8pm EDT 10/14; API-upload only (the profolio project is git-linked to the main-site repo, so a git deploy would steal the alias).",
  },
  {
    app: "Monitor Mix Cheat",
    status: "live",
    url: "https://monitormix.stevepeeleii.com",
    updated: "2026-10-12",
    note: "v2 live: share links, dark venue mode, print layout. Launch posts going out.",
  },
  {
    app: "Binsly",
    status: "live",
    url: "https://linklib.base44.app",
    updated: "2026-10-09",
    note: "Link library experiment, ongoing. Native Android app scoped.",
  },
  {
    app: "Dardo",
    status: "live",
    url: "https://dardo.stevepeeleii.com",
    updated: "2026-10-11",
    note: "v1 live with Supabase auth. Brief automation next.",
  },
  {
    app: "Stampd",
    status: "live",
    url: "https://stampd.stevepeeleii.com",
    updated: "2026-10-12",
    note: "v1 live. v2 in progress: accounts, exports, work types, employer share links.",
  },
  {
    app: "Repurpose Engine",
    status: "live",
    url: "https://repurpose.stevepeeleii.com",
    updated: "2026-10-12",
    note: "v2 live: history + tone presets + real LLM generation.",
  },
  {
    app: "GigSplit",
    status: "live",
    url: "https://gigsplit.stevepeeleii.com",
    updated: "2026-10-11",
    note: "Live. Monitoring traction.",
  },
  {
    app: "QuoteQuick",
    status: "live",
    url: "https://quotequick.stevepeeleii.com",
    updated: "2026-10-11",
    note: "Live. Monitoring traction.",
  },
  {
    app: "PrepEdge",
    status: "building",
    url: "https://prepwise.stevepeeleii.com",
    updated: "2026-10-14",
    note: "v1 deployed (splash live). Authed flow pending redeploy after Vercel daily deploy limit resets.",
  },
  {
    app: "SubjectLine Lab",
    status: "building",
    updated: "2026-10-12",
    note: "Next in the queue.",
  },
  {
    app: "Proposal Pilot",
    status: "queued",
    updated: "2026-10-12",
    note: "In the build queue.",
  },
  {
    app: "UTM Builder Pro",
    status: "queued",
    updated: "2026-10-12",
    note: "In the build queue.",
  },
  {
    app: "Landing Page Roast",
    status: "queued",
    updated: "2026-10-12",
    note: "In the build queue.",
  },
];
