import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Music2 } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { MusicProjectCard } from "@/components/music-project-card";
import { getMusicProject, musicProjects } from "@/data/music-projects";

export const Route = createFileRoute("/music/")({
  head: () => ({ meta: [
    { title: "Music — Steve Peele II" },
    { name: "description", content: "Steve Peele II's music projects: Vacillantes (solo dark-synth), Until the Dead Walk, ColdHarbour, Wasted Away, and Grave Friends. Guitar, songwriting, production." },
    { property: "og:title", content: "Music — Steve Peele II" }, { property: "og:image", content: "https://stevepeeleii.com/og-music.jpg" }, { property: "og:image:width", content: "1200" }, { property: "og:image:height", content: "630" }, { name: "twitter:image", content: "https://stevepeeleii.com/og-music.jpg" },
    { property: "og:description", content: "Five projects, one thread. Guitar, songwriting, production." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ], links: [{ rel: "canonical", href: "https://stevepeeleii.com/music" }] }), component: MusicPage,
});

const PRACTICE_ITEMS = [
  { title: "Listen before you move.", body: "In a band or in a room full of operators, you need to hear what's actually happening." },
  { title: "Make something together.", body: "Taste matters. So does showing up, working through the rough parts, and trusting the people beside you." },
  { title: "Let the work speak.", body: "You can explain the intention all day. Eventually, someone has to hear it." },
];

function MusicPage() {
  const featured = getMusicProject("vacillantes")!;
  const rest = musicProjects.filter(p => p.slug !== "vacillantes");
  return <div className="music-page"><SiteHeader /><main>
    <section className="music-hero music-hero-type" data-reveal>
      <div className="music-wrap music-hero-content">
        <p className="music-kicker">STEVE PEELE II / GUITAR · SONGWRITING · PRODUCTION</p>
        <h1>Music.</h1>
        <p className="music-hero-line">Five projects.<br />One thread.</p>
        <p className="music-hero-copy">Guitarist, songwriter, producer. The work speaks — pick a project and listen.</p>
        <div className="music-hero-actions">
          <Button asChild variant="ghost" className="music-action"><a href="#projects">The projects <ArrowRight /></a></Button>
        </div>
      </div>
    </section>

    <section id="projects" className="music-wrap music-projects" data-reveal>
      <div className="music-section-label">
        <span className="music-kicker">THE PROJECTS</span>
        <span className="music-kicker">01—05</span>
      </div>

      <Link to={`/music/${featured.slug}`} className="music-feature" data-reveal>
        <div className="music-feature-image">
          <img src={featured.image} alt={`${featured.name} editorial artwork`} width={1200} height={800} loading="lazy" />
          <span className="music-card-number">01</span>
        </div>
        <div className="music-feature-copy">
          <p className="music-kicker">FEATURED / {featured.role.toUpperCase()}</p>
          <h2>{featured.name}</h2>
          <p className="music-feature-tagline">{featured.tagline}</p>
          <p>{featured.bio}</p>
          <span className="music-feature-link">Explore the project <ArrowUpRight /></span>
        </div>
      </Link>

      <div className="music-band-grid music-band-grid-4">
        {rest.map((project, index) => (
          <MusicProjectCard key={project.slug} project={project} index={index + 1} />
        ))}
      </div>
      <p className="music-art-note">Project images are generated editorial artwork, not band photographs or official release covers.</p>
    </section>

    <section className="music-practice" data-reveal>
      <div className="music-wrap">
        <p className="music-kicker">A PARALLEL PRACTICE</p>
        <h2>Not the other life. Part of the same one.</h2>
        <p className="music-practice-lede">Music is not an aside to the professional story. It's another place where listening, judgment, experimentation, and collaboration have to become something real.</p>
        <div className="music-practice-cols">
          {PRACTICE_ITEMS.map(item => (
            <article key={item.title}><Music2 /><h3>{item.title}</h3><p>{item.body}</p></article>
          ))}
        </div>
      </div>
    </section>

    <section className="music-wrap music-contact music-contact-centered" data-reveal>
      <p className="music-kicker">KEEP THE CONVERSATION GOING</p>
      <h2>Music, work, or whatever connects them.</h2>
      <div className="music-contact-actions">
        <Button asChild variant="ghost" className="music-action"><Link to="/contact">Contact Steve <ArrowRight /></Link></Button>
        <Link to="/work" className="music-text-link">Explore the portfolio <ArrowUpRight /></Link>
        <Link to="/spiix" className="music-text-link">SPIIX <ArrowUpRight /></Link>
      </div>
    </section>
  </main><SiteFooter /></div>;
}
