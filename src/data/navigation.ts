export const primaryNav = [
  { to: "/", label: "Home", exact: true, match: ["/"] },
  { to: "/work", label: "Portfolio", exact: false, match: ["/work", "/portfolio"] },
  { to: "/spiix/monolith", label: "SPIIX", exact: false, match: ["/spiix", "/advisory", "/services"] },
  { to: "/music", label: "Music", exact: false, match: ["/music"] },
  { to: "/writing", label: "Writing", exact: false, match: ["/writing"] },
] as const;

export type HackingNavItem = {
  to: string;
  label: string;
  blurb: string;
};

export const hackingNav: HackingNavItem[] = [
  { to: "/hacking", label: "Why I hack", blurb: "The playground thesis" },
  { to: "/hacking/binsly", label: "Binsly", blurb: "Own your link layer" },
  { to: "/hacking/profolio", label: "Profolio", blurb: "One baseline, many stories" },
  { to: "/hacking/status", label: "Status", blurb: "Build log" },
  { to: "/hacking/smart-access", label: "Smart Access", blurb: "Coming soon" },
  { to: "/hacking/stageplot-ai", label: "StagePlot AI", blurb: "Input list → stage plot" },
  { to: "/hacking/nexus", label: "Nexus", blurb: "Coming soon" },
  { to: "/hacking/whats-next", label: "What's next", blurb: "The build queue" },
  { to: "/hacking/progress", label: "Progress", blurb: "Live build board" },
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
