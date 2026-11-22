/* Primary destinations for the legacy shell. Labels and routes mirror
   CORE_NAV_ITEMS in src/components/core-chrome.tsx so the two shells
   never disagree about what the site's sections are called. Home is
   the wordmark in both shells, not a nav item. */
/* Building (/hacking) is not in the global nav on Steve's order
   (2026-11-21); the section stays live at its URLs, unlinked, the same
   treatment Music had before it returned to the nav. Experience stays
   reachable from Work and the footer. */
/** SPIIX moved to its own site, Signals by SPII; the SPIIX entry links there. */
export const SIGNALS_URL = "https://www.signalsbyspii.com/";

export type PrimaryNavItem = {
  to: string;
  label: string;
  exact: boolean;
  match: readonly string[];
  href?: string;
};

export const primaryNav: PrimaryNavItem[] = [
  { to: "/work", label: "Work", exact: false, match: ["/work", "/portfolio", "/experience"] },
  { to: "/blog", label: "Writing", exact: false, match: ["/blog"] },
  { to: "/music", label: "Music", exact: false, match: ["/music"] },
  { to: "/spiix", href: SIGNALS_URL, label: "SPIIX", exact: false, match: ["/spiix", "/advisory", "/services"] },
];

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
  {
    to: "/hacking/muse-vault",
    label: "Muse Vault",
    blurb: "130 templates for Muse",
    group: "apps",
    status: "live",
  },
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
  href?: string;
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
    href: SIGNALS_URL,
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
    href: SIGNALS_URL,
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
