import coldharbourArt from "@/assets/music/coldharbour.jpg";
import vacillantesArt from "@/assets/music/vacillantes.jpg";
import untilArt from "@/assets/music/until-the-dead-walk.jpg";
import graveArt from "@/assets/music/grave-friends.jpg";
import wastedArt from "@/assets/music/wasted-away.jpg";

export type MusicProject = {
  id: string;
  name: string;
  role?: string;
  status: "Current" | "Past";
  tagline: string;
  description: string;
  influence: string[];
  links: { label: string; href: string }[];
  /** Editorial generated artwork; replace with official imagery when supplied. */
  image: string;
};

export const musicIntro = {
  eyebrow: "The other practice",
  title: "Music isn't a hobby. It's the same discipline, louder.",
  body: "I've played, written, and performed music my whole adult life — the same years I've been building growth systems. The two practices feed each other: bands are teams, records are launches, and a live set is the most honest funnel there is. You find out immediately whether anyone cares.",
};

export const sharedThreads = [
  {
    title: "Bands are teams",
    body: "Five people, one outcome, no hiding. The same alignment work that makes a marketing org function makes a band tight.",
  },
  {
    title: "Records are launches",
    body: "Writing, sequencing, producing, releasing — it's a go-to-market motion with guitars. Scope, deadlines, and taste all matter.",
  },
  {
    title: "The stage doesn't lie",
    body: "Live performance is real-time feedback with no dashboard. That instinct for reading a room shows up in every strategy session.",
  },
];

export const musicProjects: MusicProject[] = [
  {
    id: "coldharbour",
    image: coldharbourArt,
    name: "ColdHarbour",
    role: "Guitar",
    status: "Current",
    tagline: "The current band.",
    description:
      "My active project. Guitar, writing, and the ongoing work of making something worth playing loud.",
    influence: [
      "Playing in an active band keeps the collaboration muscle honest — you can't ship a song alone.",
      "Rehearsal is iteration: try it, hear it, fix it. The same loop I run on campaigns.",
    ],
    links: [],
  },
  {
    id: "vacillantes",
    image: vacillantesArt,
    name: "Vacillantes",
    status: "Past",
    tagline: "A long-running creative history.",
    description:
      "A project with a long creative history — years of writing, recording, and playing that shaped how I think about craft and collaboration.",
    influence: [
      "Years in one project teach you how creative relationships endure: honesty, patience, and showing up.",
      "Long arcs over quick wins — the same bias I bring to building durable growth systems.",
    ],
    links: [],
  },
  {
    id: "until-the-dead-walk",
    image: untilArt,
    name: "Until the Dead Walk",
    status: "Past",
    tagline: "Heavy, deliberate, committed.",
    description: "One of the projects along the way. More detail coming soon.",
    influence: [
      "Every project leaves something behind — a way of working, a standard, a riff you can't stop hearing.",
    ],
    links: [],
  },
  {
    id: "grave-friends",
    image: graveArt,
    name: "Grave Friends",
    status: "Past",
    tagline: "Friends first, volume second.",
    description: "One of the projects along the way. More detail coming soon.",
    influence: [
      "The name says it — the best creative work happens with people you actually trust.",
    ],
    links: [],
  },
  {
    id: "wasted-away",
    image: wastedArt,
    name: "Wasted Away",
    status: "Past",
    tagline: "An early chapter.",
    description: "One of the projects along the way. More detail coming soon.",
    influence: [
      "Early projects are where you learn to finish things — a skill that transfers to everything.",
    ],
    links: [],
  },
];
