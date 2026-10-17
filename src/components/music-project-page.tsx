import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import type { CSSProperties } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { MusicEmbedRow } from "@/components/music-embed-row";
import { MusicTracklist } from "@/components/music-tracklist";
import { musicProjects, type MusicProject } from "@/data/music-projects";

export function MusicProjectPage({ project }: { project: MusicProject }) {
  const others = musicProjects.filter(p => p.slug !== project.slug);
  return (
    <div className="music-page" style={{ "--mu-accent": project.accent } as CSSProperties}><SiteHeader /><main>
      <section className="music-wrap music-proj-hero" data-reveal>
        <Link to="/music" className="music-back"><ArrowLeft /> All projects</Link>
        <div className="music-proj-head">
          <img src={project.image} alt={`${project.name} editorial artwork`} width={400} height={400} />
          <div>
            <p className="music-kicker">{project.status === "Current" ? "ACTIVE" : "CREATIVE HISTORY"} / {project.role.toUpperCase()}</p>
            <h1>{project.name}</h1>
            <p className="music-proj-tagline">{project.tagline}</p>
            <p>{project.bio}</p>
          </div>
        </div>
      </section>

      <section className="music-wrap" data-reveal>
        <p className="music-kicker">LINEUP</p>
        <dl className="music-lineup">
          {project.lineup.map(member => (
            <div key={member.name}><dt>{member.name}</dt><dd>{member.role}</dd></div>
          ))}
        </dl>
      </section>

      <section className="music-wrap" data-reveal>
        <p className="music-kicker">LISTEN</p>
        <MusicEmbedRow project={project} />
      </section>

      <section className="music-wrap" data-reveal>
        <p className="music-kicker">RELEASES</p>
        <MusicTracklist project={project} />
      </section>

      {(project.storeLinks.length > 0 || project.socials.length > 0) && (
        <section className="music-wrap" data-reveal>
          <p className="music-kicker">GET IT / FOLLOW</p>
          <div className="music-links">
            {project.storeLinks.map(link => (
              <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className="music-btn">{link.label}<ArrowUpRight /></a>
            ))}
            {project.socials.map(link => (
              <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className="music-btn">{link.label}<ArrowUpRight /></a>
            ))}
          </div>
        </section>
      )}

      <section className="music-wrap" data-reveal>
        <p className="music-kicker">OTHER PROJECTS</p>
        <div className="music-band-grid">
          {others.map(other => (
            <Link key={other.slug} to={`/music/${other.slug}`} className="music-band-card">
              <div className="music-card-image">
                <img src={other.image} alt={`${other.name} editorial artwork`} width={512} height={512} loading="lazy" />
              </div>
              <div className="music-card-copy">
                <div><h3>{other.name}</h3><ArrowUpRight /></div>
                <p>{other.tagline}</p>
              </div>
            </Link>
          ))}
        </div>
        <p className="music-art-note">Project images are generated editorial artwork, not band photographs or official release covers.</p>
      </section>

      <section className="music-wrap music-contact" data-reveal>
        <p className="music-kicker">KEEP THE CONVERSATION GOING</p>
        <h2>Music, work,<br />or whatever connects them.</h2>
        <div>
          <Button asChild variant="ghost" className="music-action"><Link to="/contact">Contact Steve <ArrowRight /></Link></Button>
        </div>
      </section>
    </main><SiteFooter /></div>
  );
}
