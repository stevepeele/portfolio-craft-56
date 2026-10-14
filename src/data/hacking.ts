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
    url: "https://profolio-stevepeeles-projects.vercel.app/",
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
    url: "https://stageplot-ai-stevepeeles-projects.vercel.app/",
    description:
      "Paste a band's input list, get a professional stage plot + channel sheet in seconds. Built for live sound engineers who are tired of drawing rectangles in PowerPoint at 1am.",
    why: "90% of mic choices are automatic. The layout is standard. The channel sheet is formatting. So why do it by hand?",
  },
  {
    slug: "monitor-mix-cheat",
    label: "Monitor Mix Cheat",
    blurb: "Input list → monitor mix",
    status: "live",
    url: "https://monitor-mix-cheat.vercel.app",
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
    url: "https://dardo-smoky.vercel.app",
    description:
      "An AI sidekick for real estate agents. One-tap capture, passive mileage and routing, and an evening brief with drafted follow-ups. $4.99/mo.",
    why: "The admin work between appointments eats the day. Dardo closes the day itself — and it's explicitly not another CRM.",
  },
  {
    slug: "stampd",
    label: "Stampd",
    blurb: "Shift & pay tracker",
    status: "live",
    url: "https://stampd-stevepeeles-projects.vercel.app",
    description:
      "A no-training shift and pay tracker for contractors and day laborers. Tap to clock in and out; the pay math handles itself. $29 one-time.",
    why: "The people doing the hardest work have the worst time records. If you can tap a button, you can use Stampd.",
  },
  {
    slug: "repurpose-engine",
    label: "Repurpose Engine",
    blurb: "One post, ten platforms",
    status: "live",
    url: "https://repurpose-engine-beryl.vercel.app",
    description:
      "Write one post, get ten platform-native versions back — each shaped for where it lives, not the same text pasted everywhere.",
    why: "Rewriting the same post for every platform is a second job. The thinking stays yours; the reformatting shouldn't eat your afternoon.",
  },
  {
    slug: "gigsplit",
    label: "GigSplit",
    blurb: "Band pay splitter",
    status: "live",
    url: "https://gigsplit-stevepeeles-projects.vercel.app",
    description:
      "Enter the gig pay, add members and expenses, and see who gets what — with penny-exact math and paid tracking. $9 one-time.",
    why: "The payout argument in the parking lot is a tradition nobody likes. One clean screen ends it.",
  },
  {
    slug: "quotequick",
    label: "QuoteQuick",
    blurb: "Contractor quotes in minutes",
    status: "live",
    url: "https://quotequick-stevepeeles-projects.vercel.app",
    description:
      "Line items plus a job-site photo turn into a branded PDF quote, ready to send before you leave the driveway. $19 one-time.",
    why: "Slow quotes lose jobs. The contractor who answers in an hour with a clean number wins.",
  },
  {
    slug: "muse-vault",
    label: "Muse Vault",
    blurb: "Prompts, skills & automations",
    status: "live",
    url: "https://muse-templates-stevepeeles-projects.vercel.app/",
    description:
      "A free gallery of 98 battle-tested Muse templates — system prompts, skills, crons, and workflows across Work, Money, Career, Create, Home & Life, and Health & Family tracks. Ratings, trending, curated collections, one-click install packs, community submissions with human review, and an About page.",
    why: "The best Muse setups are built, not discovered. Templates make the good ones shareable.",
  },
  {
    slug: "local-growth-fix",
    label: "Local Growth Fix",
    blurb: "The $750 audit",
    status: "live",
    url: "https://local-growth-engine-stevepeeles-projects.vercel.app/intake",
    description:
      "A $750 done-for-you website teardown for local businesses: deterministic site checks, an AI-written teardown, and a branded PDF — delivered through a public intake funnel.",
    why: "Local businesses don't need another report. They need someone to show them exactly what's broken and fix the expensive parts.",
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
    description: "Free gallery of 98 battle-tested Muse templates across 6 use-case tracks, with ratings, trending, curated collections, one-click install packs, community submissions with human review, and an About page. Renamed twice in one night — Muse Templates → PromptVault → Muse Vault. Moving to vault.stevepeeleii.com.",
    url: "https://muse-templates-stevepeeles-projects.vercel.app/",
  },
  {
    name: "Local Growth Fix",
    status: "shipped",
    shippedDate: "2026-10-14",
    description: "The $750 audit wedge v1: deterministic site checks + AI teardown writer + branded PDF, with a public intake funnel. Monetization sprint idea #1, shipped first.",
    url: "https://local-growth-engine-stevepeeles-projects.vercel.app/intake",
  },
  {
    name: "StagePlot AI",
    status: "shipped",
    shippedDate: "2026-10-10",
    description: "Input list → stage plot + channel sheet for live sound engineers.",
    url: "https://stageplot-ai-stevepeeles-projects.vercel.app/",
  },
  {
    name: "Profolio",
    status: "shipped",
    shippedDate: "2026-10-10",
    description: "Professional portfolio builder — one baseline, many tailored views.",
    url: "https://profolio-stevepeeles-projects.vercel.app/",
  },
  {
    name: "Monitor Mix Cheat",
    status: "shipped",
    shippedDate: "2026-10-10",
    description: "Input list + venue type → monitor mix starting points (EQ, comp, levels).",
    url: "https://monitor-mix-cheat.vercel.app/",
  },
  {
    name: "Dardo",
    status: "shipped",
    shippedDate: "2026-10-11",
    description: "AI sidekick for real estate agents — one-tap capture, evening brief. $4.99/mo.",
    url: "https://dardo-smoky.vercel.app",
  },
  {
    name: "Stampd",
    status: "shipped",
    shippedDate: "2026-10-11",
    description: "No-training shift & pay tracker for contractors and day laborers. $29 one-time.",
    url: "https://stampd-stevepeeles-projects.vercel.app",
  },
  {
    name: "Repurpose Engine",
    status: "shipped",
    shippedDate: "2026-10-11",
    description: "One post → platform-native versions for everywhere it lives.",
    url: "https://repurpose-engine-beryl.vercel.app",
  },
  {
    name: "GigSplit",
    status: "shipped",
    shippedDate: "2026-10-11",
    description: "Band pay splitter — penny-exact payouts, who got paid tracking. $9 one-time.",
    url: "https://gigsplit-stevepeeles-projects.vercel.app",
  },
  {
    name: "QuoteQuick",
    status: "shipped",
    shippedDate: "2026-10-11",
    description: "Contractor quotes in minutes — line items + job-site photo → branded PDF. $19 one-time.",
    url: "https://quotequick-stevepeeles-projects.vercel.app",
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
    date: "2026-10-14",
    title: "Blog publishing underway — 10 posts with custom visuals",
    detail:
      "Five long-form posts expanded to ~1,200 words each (pipeline operating systems, the 6-month fractional trap, analytics theater, how I actually work, Muse Vault launch) plus five new drafts (AI in practice, four exits and a job search, shipping broken, reading a room, building between bedtimes). Every post gets a custom dark-editorial hero illustration — no stock. Publishing to Sanity as the studio pipeline clears. (PLX-330)",
  },
  {
    date: "2026-10-14",
    title: "/Blog gains a Medium/Substack 'Elsewhere' stream",
    detail:
      "Sanity posts stay the hero; a subtle secondary section below pulls recent Medium and Substack items via RSS (cached hourly), labeled 'Also on' with links out to the originals. /writing now redirects to /blog. (PLX-332, PLX-336)",
  },
  {
    date: "2026-10-14",
    title: "Infrastructure docs rebuilt — /scaffolding/architecture",
    detail:
      "Replaced the stale Lovable-era page with the single source of truth for the site's infrastructure: stack, script connections, data flows, deployment pipeline, env var inventory, domains & DNS, redirects, and runbook — with analytics and data-flow sub-pages. (PLX-335)",
  },
  {
    date: "2026-10-14",
    title: "/studio unblocked — Sanity CORS + wildcard route",
    detail:
      "Two blockers fixed: Sanity CORS origins re-added with credentials allowed (studio login was rejecting), and a wildcard /studio route so /studio/structure resolves instead of 404ing after login. Studio is fully functional. (PLX-331)",
  },
  {
    date: "2026-10-14",
    title: "Main site moved off Lovable — now on Vercel",
    detail:
      "DNS cut over at GoDaddy (A records to Vercel, www/hi as CNAMEs), the Vercel project connected to GitHub for auto-deploys, and Lovable fully out of the loop. Old *.vercel.app links 301 to the custom domain with paths preserved. (PLX-325, PLX-329)",
  },
  {
    date: "2026-10-14",
    title: "Local Growth Fix audit wedge v1 live",
    detail:
      "Monetization sprint idea #1 shipped: deterministic site checks + AI teardown writer + branded PDF, with a public intake funnel. Outreach sequencing live — first-touch drafts generate from completed teardowns for his review before anything goes out. (PLX-316, PLX-317)",
  },
  {
    date: "2026-10-14",
    title: "Muse Vault — rebrand, 98 templates",
    detail:
      "Muse Templates renamed twice in one night and landed on Muse Vault. Gallery at 98 battle-tested templates across 6 tracks with ratings, trending, and community submissions. Moving to vault.stevepeeleii.com. (PLX-306–PLX-311)",
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
    app: "Muse Vault",
    status: "live",
    url: "https://muse-templates-stevepeeles-projects.vercel.app/",
    updated: "2026-10-14",
    note: "Rebranded from Muse Templates. 98 templates, ratings, trending, submissions. Moving to vault.stevepeeleii.com.",
  },
  {
    app: "Local Growth Fix",
    status: "live",
    url: "https://local-growth-engine-stevepeeles-projects.vercel.app/intake",
    updated: "2026-10-14",
    note: "Audit wedge v1 live: site checks + AI teardown + branded PDF + intake funnel. Outreach sequencing next.",
  },
  {
    app: "StagePlot AI",
    status: "live",
    url: "https://stageplot-ai-stevepeeles-projects.vercel.app/",
    updated: "2026-10-10",
    note: "Launched. Monitoring traction.",
  },
  {
    app: "Profolio",
    status: "live",
    url: "https://profolio-stevepeeles-projects.vercel.app/",
    updated: "2026-10-10",
    note: "v1 shipped with auth + backend. Stripe checkout pending.",
  },
  {
    app: "Monitor Mix Cheat",
    status: "live",
    url: "https://monitor-mix-cheat.vercel.app/",
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
    url: "https://dardo-smoky.vercel.app",
    updated: "2026-10-11",
    note: "v1 live with Supabase auth. Brief automation next.",
  },
  {
    app: "Stampd",
    status: "live",
    url: "https://stampd-stevepeeles-projects.vercel.app",
    updated: "2026-10-12",
    note: "v1 live. v2 in progress: accounts, exports, work types, employer share links.",
  },
  {
    app: "Repurpose Engine",
    status: "live",
    url: "https://repurpose-engine-beryl.vercel.app",
    updated: "2026-10-12",
    note: "v2 live: history + tone presets + real LLM generation.",
  },
  {
    app: "GigSplit",
    status: "live",
    url: "https://gigsplit-stevepeeles-projects.vercel.app",
    updated: "2026-10-11",
    note: "Live. Monitoring traction.",
  },
  {
    app: "QuoteQuick",
    status: "live",
    url: "https://quotequick-stevepeeles-projects.vercel.app",
    updated: "2026-10-11",
    note: "Live. Monitoring traction.",
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
