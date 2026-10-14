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
