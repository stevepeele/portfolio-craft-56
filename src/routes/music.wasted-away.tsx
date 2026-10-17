import { createFileRoute } from "@tanstack/react-router";
import { MusicProjectPage } from "@/components/music-project-page";
import { getMusicProject } from "@/data/music-projects";

const project = getMusicProject("wasted-away")!;

export const Route = createFileRoute("/music/wasted-away")({
  head: () => ({ meta: [
    { title: `Wasted Away — ${project.tagline} | Steve Peele II` },
    { name: "description", content: project.bio },
    { property: "og:title", content: `Wasted Away — Steve Peele II` },
    { property: "og:description", content: project.bio },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ], links: [{ rel: "canonical", href: "https://stevepeeleii.com/music/wasted-away" }] }),
  component: () => <MusicProjectPage project={project} />,
});
