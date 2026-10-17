import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { MusicProject } from "@/data/music-projects";

export function MusicProjectCard({ project, index }: { project: MusicProject; index: number }) {
  return (
    <Link to={`/music/${project.slug}`} className="music-band-card group" data-reveal>
      <div className="music-card-image">
        <img
          src={project.image}
          alt={`${project.name} editorial artwork`}
          width={1024}
          height={1024}
          loading="lazy"
        />
        <span className="music-card-number">0{index + 1}</span>
      </div>
      <div className="music-card-copy">
        <p className="music-kicker">{project.status === "Current" ? "ACTIVE" : "CREATIVE HISTORY"}</p>
        <div>
          <h3>{project.name}</h3>
          <ArrowUpRight />
        </div>
        <p>{project.tagline}</p>
        <p className="music-card-role">{project.role}</p>
      </div>
    </Link>
  );
}
