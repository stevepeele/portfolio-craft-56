export const primaryNav = [
  { to: "/", label: "Home", exact: true, match: ["/"] },
  { to: "/work", label: "Portfolio", exact: false, match: ["/work", "/portfolio"] },
  { to: "/spiix", label: "SPIIX", exact: false, match: ["/spiix", "/advisory", "/services"] },
  { to: "/music", label: "Music", exact: false, match: ["/music"] },
  { to: "/blog", label: "Blog", exact: false, match: ["/blog"] },
] as const;

export type HackingNavGroup = "start" | "board" | "apps";

export type HackingNavItem = {
  to: string;
  label: string;
  blurb: string;
  group: HackingNavGroup;
};

export const hackingNav: HackingNavItem[] = [
  { to: "/hacking", label: "Why I build", blurb: "The building thesis", group: "start" },
  { to: "/hacking/status", label: "Status", blurb: "Build log", group: "board" },
  { to: "/hacking/whats-next", label: "What's next", blurb: "The build queue", group: "board" },
  { to: "/hacking/progress", label: "Progress", blurb: "Live build board", group: "board" },
  { to: "/hacking/binsly", label: "Binsly", blurb: "Own your link layer", group: "apps" },
  { to: "/hacking/profolio", label: "Profolio", blurb: "One baseline, many stories", group: "apps" },
  { to: "/hacking/stageplot-ai", label: "StagePlot AI", blurb: "Input list → stage plot", group: "apps" },
  { to: "/hacking/dardo", label: "Dardo", blurb: "AI sidekick for agents", group: "apps" },
  { to: "/hacking/stampd", label: "Stampd", blurb: "Shift & pay tracker", group: "apps" },
  { to: "/hacking/repurpose-engine", label: "Repurpose Engine", blurb: "One post, ten platforms", group: "apps" },
  { to: "/hacking/gigsplit", label: "GigSplit", blurb: "Band pay splitter", group: "apps" },
  { to: "/hacking/quotequick", label: "QuoteQuick", blurb: "Contractor quotes in minutes", group: "apps" },
  { to: "/hacking/monitor-mix-cheat", label: "Monitor Mix Cheat", blurb: "Input list → monitor mix", group: "apps" },
  { to: "/hacking/muse-vault", label: "Muse Vault", blurb: "Prompts, skills & automations", group: "apps" },
  { to: "/hacking/local-growth-fix", label: "Local Growth Fix", blurb: "The $750 audit", group: "apps" },
  { to: "/hacking/smart-access", label: "Smart Access", blurb: "Coming soon", group: "apps" },
  { to: "/hacking/nexus", label: "Nexus", blurb: "Coming soon", group: "apps" },
];

export const hackingNavGroups: { key: HackingNavGroup; label: string }[] = [
  { key: "start", label: "" },
  { key: "board", label: "Board" },
  { key: "apps", label: "Apps" },
];

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
