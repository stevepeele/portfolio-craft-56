export const primaryNav = [
  { to: "/", label: "Home", exact: true, match: ["/"] },
  { to: "/work", label: "Portfolio", exact: false, match: ["/work", "/portfolio"] },
  { to: "/spiix", label: "SPIIX", exact: false, match: ["/spiix", "/advisory", "/services"] },
  { to: "/blog", label: "Blog", exact: false, match: ["/blog"] },
] as const;

export type HackingNavGroup = "start" | "track" | "apps";

export type HackingAppStatus = "live" | "building" | "soon";

export type HackingNavItem = {
  to: string;
  label: string;
  blurb: string;
  group: HackingNavGroup;
  status?: HackingAppStatus;
};

export const hackingNav: HackingNavItem[] = [
  { to: "/hacking", label: "Why I build", blurb: "The building thesis", group: "start" },
  { to: "/hacking/status", label: "Build log", blurb: "Every ship, newest first", group: "track" },
  {
    to: "/hacking/whats-next",
    label: "Up next",
    blurb: "What's in the queue",
    group: "track",
  },
  { to: "/hacking/progress", label: "Live board", blurb: "The build board, live", group: "track" },
  { to: "/hacking/binsly", label: "Binsly", blurb: "Own your link layer", group: "apps", status: "live" },
  {
    to: "/hacking/profolio",
    label: "Profolio",
    blurb: "One baseline, many stories",
    group: "apps",
    status: "live",
  },
  {
    to: "/hacking/stageplot-ai",
    label: "StagePlot AI",
    blurb: "Input list → stage plot",
    group: "apps",
    status: "live",
  },
  {
    to: "/hacking/monitor-mix-cheat",
    label: "Monitor Mix Cheat",
    blurb: "Input list → monitor mix",
    group: "apps",
    status: "live",
  },
  { to: "/hacking/dardo", label: "Dardo", blurb: "AI sidekick for agents", group: "apps", status: "live" },
  { to: "/hacking/stampd", label: "Stampd", blurb: "Shift & pay tracker", group: "apps", status: "live" },
  {
    to: "/hacking/repurpose-engine",
    label: "Repurpose Engine",
    blurb: "One post, ten platforms",
    group: "apps",
    status: "live",
  },
  {
    to: "/hacking/gigsplit",
    label: "GigSplit",
    blurb: "Band pay splitter",
    group: "apps",
    status: "live",
  },
  {
    to: "/hacking/quotequick",
    label: "QuoteQuick",
    blurb: "Contractor quotes in minutes",
    group: "apps",
    status: "live",
  },
  {
    to: "/hacking/muse-vault",
    label: "Muse Vault",
    blurb: "98 templates for Muse",
    group: "apps",
    status: "live",
  },
];

export const hackingNavGroups: { key: HackingNavGroup; label: string }[] = [
  { key: "start", label: "" },
  { key: "track", label: "Track" },
  { key: "apps", label: "Apps" },
];

export const hackingStatusDotClass: Record<HackingAppStatus, string> = {
  live: "bg-emerald-400",
  building: "bg-amber-400",
  soon: "bg-sky-400",
};

export const hackingMatch = ["/hacking"];

export type Pathway = {
  id: string;
  label: string;
  need: string;
  destination: string;
  to: "/" | "/work" | "/spiix" | "/spiix/compare" | "/music";
  hash?: string;
};

export const pathways: Pathway[] = [
  {
    id: "operator",
    label: "The persistent growth operator",
    need: "You need growth to work, and you want to see the numbers.",
    destination: "Work / Results",
    to: "/work",
    hash: "results",
  },
  {
    id: "rule-breaker",
    label: "The experimental rule breaker",
    need: "You want something scoped, built, and shipped fast.",
    destination: "SPIIX / Offers",
    to: "/spiix/compare",
  },
  {
    id: "executive",
    label: "The executive leader and proof maker",
    need: "You're evaluating a senior hire and want the career record.",
    destination: "Work / Experience",
    to: "/work",
    hash: "experience",
  },
  {
    id: "mentor",
    label: "The mentor and listener",
    need: "You could use an experienced sounding board.",
    destination: "SPIIX / Advisory",
    to: "/spiix",
  },
  {
    id: "thinker",
    label: "The thinker and sharer",
    need: "You're curious how I think about growth and systems.",
    destination: "Home / About Steve",
    to: "/",
    hash: "about",
  },
  {
    id: "artist",
    label: "The artist and performer",
    need: "You're here for the bands and the creative work.",
    destination: "Music / Projects",
    to: "/music",
    hash: "projects",
  },
];

export const OPEN_GUIDE_EVENT = "spii-guide:open";
export function openGuide() {
  if (typeof window !== "undefined") window.dispatchEvent(new Event(OPEN_GUIDE_EVENT));
}
