import { createFileRoute } from "@tanstack/react-router";
import { MusicProjectPage } from "@/components/music-project-page";
import { getMusicProject } from "@/data/music-projects";

const project = getMusicProject("vacillantes")!;

export const Route = createFileRoute("/music/vacillantes")({
  head: () => ({ meta: [
    { title: `Vacillantes — ${project.tagline} | Steve Peele II` },
    { name: "description", content: project.bio },
    { property: "og:title", content: `Vacillantes — Steve Peele II` },
    { property: "og:description", content: project.bio },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ], links: [{ rel: "canonical", href: "https://stevepeeleii.com/music/vacillantes" }] }),
  component: () => <MusicProjectPage project={project} />,
});
