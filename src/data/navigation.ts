export const primaryNav = [
  { to: "/", label: "Home", exact: true, match: ["/"] },
  { to: "/work", label: "Work", exact: false, match: ["/work"] },
  { to: "/advisory", label: "SPIIX", exact: false, match: ["/advisory", "/services"] },
  { to: "/music", label: "Music", exact: false, match: ["/music"] },
] as const;

export type Pathway = {
  id: string;
  label: string;
  need: string;
  destination: string;
  to: "/" | "/work" | "/advisory" | "/services" | "/music";
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
    to: "/services",
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
    to: "/advisory",
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
