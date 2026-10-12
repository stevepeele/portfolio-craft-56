export type HackingApp = {
  slug: string;
  label: string;
  blurb: string;
  status: "live" | "soon";
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
    slug: "nexus",
    label: "Nexus",
    blurb: "Coming soon",
    status: "soon",
    description: "Details coming soon — this one's still taking shape on the workbench.",
    why: "Watch this space.",
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
    url: "https://monitor-mix-cheat-stevepeeles-projects.vercel.app/",
  },
  {
    name: "SubjectLine Lab",
    status: "next",
    description: "AI subject line generator + spam/deliverability scorer. Freemium → $12/mo.",
  },
  {
    name: "Repurpose Engine",
    status: "queued",
    description: "One post → 10 platform-native versions. $15/mo.",
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
    url: "https://monitor-mix-cheat-stevepeeles-projects.vercel.app/",
    updated: "2026-10-10",
    note: "Launched. Monitoring traction.",
  },
  {
    app: "Binsly",
    status: "live",
    url: "https://linklib.base44.app",
    updated: "2026-10-09",
    note: "Link library experiment, ongoing.",
  },
  {
    app: "SubjectLine Lab",
    status: "building",
    updated: "2026-10-10",
    note: "Next in the queue.",
  },
  {
    app: "Repurpose Engine",
    status: "queued",
    updated: "2026-10-10",
    note: "In the build queue.",
  },
  {
    app: "Proposal Pilot",
    status: "queued",
    updated: "2026-10-10",
    note: "In the build queue.",
  },
];
