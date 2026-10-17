import { createFileRoute } from "@tanstack/react-router";
import { MusicProjectPage } from "@/components/music-project-page";
import { getMusicProject } from "@/data/music-projects";

const project = getMusicProject("gravefriends")!;

export const Route = createFileRoute("/music/gravefriends")({
  head: () => ({ meta: [
    { title: `Grave Friends — ${project.tagline} | Steve Peele II` },
    { name: "description", content: project.bio },
    { property: "og:title", content: `Grave Friends — Steve Peele II` },
    { property: "og:description", content: project.bio },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ], links: [{ rel: "canonical", href: "https://stevepeeleii.com/music/gravefriends" }] }),
  component: () => <MusicProjectPage project={project} />,
});
