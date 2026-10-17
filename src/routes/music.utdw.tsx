import { createFileRoute } from "@tanstack/react-router";
import { MusicProjectPage } from "@/components/music-project-page";
import { getMusicProject } from "@/data/music-projects";

const project = getMusicProject("utdw")!;

export const Route = createFileRoute("/music/utdw")({
  head: () => ({ meta: [
    { title: `Until the Dead Walk — ${project.tagline} | Steve Peele II` },
    { name: "description", content: project.bio },
    { property: "og:title", content: `Until the Dead Walk — Steve Peele II` },
    { property: "og:description", content: project.bio },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ], links: [{ rel: "canonical", href: "https://stevepeeleii.com/music/utdw" }] }),
  component: () => <MusicProjectPage project={project} />,
});
