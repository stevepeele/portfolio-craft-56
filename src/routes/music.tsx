import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Music2 } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { MusicProjectCard } from "@/components/music-project-card";
import { musicProjects } from "@/data/music-projects";

export const Route = createFileRoute("/music")({
  head: () => ({ meta: [
    { title: "Music — Steve Peele II" },
    { name: "description", content: "Steve Peele II's music projects: Vacillantes (solo dark-synth), Until the Dead Walk, ColdHarbour, Wasted Away, and Grave Friends. Guitar, songwriting, production." },
    { property: "og:title", content: "Music — Steve Peele II" },
    { property: "og:description", content: "Five projects, one thread. Guitar, songwriting, production." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ], links: [{ rel: "canonical", href: "https://stevepeeleii.com/music" }] }), component: MusicPage,
});

function MusicPage() {
  const current = musicProjects[0];
  return <div className="music-page"><SiteHeader /><main>
    <section className="music-hero" data-reveal>
      {current && <img src={current.image} alt="Vacillantes editorial artwork" width={1024} height={1024} fetchPriority="high" />}
      <div className="music-wrap music-hero-content">
        <p className="music-kicker">STEVE PEELE II / GUITAR · SONGWRITING · PRODUCTION</p>
        <h1>Music.</h1>
        <p className="music-hero-line">Five projects.<br />One thread.</p>
        <p className="music-hero-copy">Guitarist, songwriter, producer. The work speaks — pick a project and listen.</p>
        <div className="music-hero-actions">
          <Button asChild variant="ghost" className="music-action"><a href="#projects">The projects <ArrowRight /></a></Button>
          <span className="music-kicker">01—05 / FIVE PROJECTS</span>
        </div>
      </div>
    </section>

    <section id="projects" className="music-wrap music-projects" data-reveal>
      <div className="music-section-label">
        <span className="music-kicker">THE PROJECTS</span>
        <span className="music-kicker">GUITARS / PEOPLE / PROCESS</span>
      </div>
      <div className="music-band-grid">
        {musicProjects.map((project, index) => (
          <MusicProjectCard key={project.slug} project={project} index={index} />
        ))}
      </div>
      <p className="music-art-note">Project images are generated editorial artwork, not band photographs or official release covers.</p>
    </section>

    <section className="music-practice" data-reveal>
      <div className="music-wrap">
        <p className="music-kicker">A PARALLEL PRACTICE</p>
        <h2>Not the other life.<br />Part of the same one.</h2>
        <div className="music-practice-grid">
          <p>Music is not an aside to the professional story. It's another place where listening, judgment, experimentation, and collaboration have to become something real.</p>
          <div>
            {[
              { title: "Listen before you move.", body: "In a band or in a room full of operators, you need to hear what's actually happening." },
              { title: "Make something together.", body: "Taste matters. So does showing up, working through the rough parts, and trusting the people beside you." },
              { title: "Let the work speak.", body: "You can explain the intention all day. Eventually, someone has to hear it." },
            ].map(item => (
              <article key={item.title}><Music2 /><div><h3>{item.title}</h3><p>{item.body}</p></div></article>
            ))}
          </div>
        </div>
      </div>
    </section>

    <section className="music-wrap music-contact" data-reveal>
      <p className="music-kicker">KEEP THE CONVERSATION GOING</p>
      <h2>Music, work,<br />or whatever connects them.</h2>
      <div>
        <Button asChild variant="ghost" className="music-action"><Link to="/contact">Contact Steve <ArrowRight /></Link></Button>
        <Link to="/work" className="music-text-link">Explore the portfolio <ArrowUpRight /></Link>
        <Link to="/spiix" className="music-text-link">SPIIX <ArrowUpRight /></Link>
      </div>
    </section>
  </main><SiteFooter /></div>;
}
