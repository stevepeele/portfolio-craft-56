import { createFileRoute } from "@tanstack/react-router";
import { MusicProjectPage } from "@/components/music-project-page";
import { getMusicProject } from "@/data/music-projects";

const project = getMusicProject("coldharbour")!;

export const Route = createFileRoute("/music/coldharbour")({
  head: () => ({ meta: [
    { title: `ColdHarbour — ${project.tagline} | Steve Peele II` },
    { name: "description", content: project.bio },
    { property: "og:title", content: `ColdHarbour — Steve Peele II` },
    { property: "og:description", content: project.bio },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ], links: [{ rel: "canonical", href: "https://stevepeeleii.com/music/coldharbour" }] }),
  component: () => <MusicProjectPage project={project} />,
});
