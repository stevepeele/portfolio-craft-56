import type { MusicProject, Release } from "@/data/music-projects";

function releaseLabel(release: Release): string {
  const parts = [release.type.toUpperCase()];
  if (release.year) parts.push(String(release.year));
  if (release.note) parts.push(release.note);
  return parts.join(" · ");
}

export function MusicTracklist({ project }: { project: MusicProject }) {
  if (project.releases.length === 0) {
    return (
      <div className="music-tracklist" data-reveal>
        <p className="music-kicker">RELEASES COMING SOON</p>
      </div>
    );
  }
  return (
    <div className="music-tracklist" data-reveal>
      {project.releases.map(release => (
        <div key={release.title} className="music-track">
          <span>
            {release.spotify ? (
              <a href={release.spotify} target="_blank" rel="noreferrer">
                {release.title}
              </a>
            ) : (
              release.title
            )}
          </span>
          <span>{releaseLabel(release)}</span>
        </div>
      ))}
    </div>
  );
}
