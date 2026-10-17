import type { MusicProject } from "@/data/music-projects";

const EMBED_LABELS = [
  { key: "spotify", label: "Spotify" },
  { key: "apple", label: "Apple Music" },
  { key: "youtube", label: "YouTube" },
  { key: "bandcamp", label: "Bandcamp" },
] as const;

export function MusicEmbedRow({ project }: { project: MusicProject }) {
  const available = EMBED_LABELS.filter(({ key }) => project.embeds[key]);
  if (available.length === 0) {
    return (
      <div className="music-embed-row" data-reveal>
        <p className="music-kicker">STREAMING LINKS COMING SOON</p>
      </div>
    );
  }
  return (
    <div className="music-embed-row" data-reveal>
      {available.map(({ key, label }) => (
        <div key={key} className="music-embed">
          <iframe
            src={project.embeds[key] ?? ""}
            title={`${project.name} on ${label}`}
            width="100%"
            height={key === "spotify" ? 352 : 200}
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
}
