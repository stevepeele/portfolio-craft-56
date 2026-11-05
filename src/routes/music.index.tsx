import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Music2 } from "lucide-react";
import { CtShell, CtHero, CtLabel } from "@/components/ct-shell";
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
  return (
    <CtShell crumbs={[{ label: "Home", to: "/" }, { label: "Music" }]}>
      <main>
        <CtHero
          file="06 / Music"
          title={
            <>
              Music<span>.</span>
            </>
          }
          lede={
            <>
              Five projects.
              <br />
              One thread.
              <br />
              <br />
              Guitarist, songwriter, producer. The work speaks — pick a project and listen.
            </>
          }
        >
          <p className="mono" style={{ marginTop: 18, color: "var(--muted)" }}>
            STEVE PEELE II / GUITAR · SONGWRITING · PRODUCTION
          </p>
          <div className="btnrow">
            <a href="#projects" className="btn">
              The projects <ArrowRight size={14} />
            </a>
          </div>
        </CtHero>

        <section id="projects" className="blk first" style={{ scrollMarginTop: 70 }}>
          <div className="wrap">
            <CtLabel n="01">The Projects</CtLabel>
            <h2 className="shead">
              Five projects. <span>01—05</span>
            </h2>

            <div className="ecard feat rev">
              <img
                src={featured.image}
                alt={`${featured.name} editorial artwork`}
                width={1200}
                height={800}
                loading="lazy"
                style={{ width: "100%", height: "auto", display: "block", border: "1px solid var(--line)" }}
              />
              <p className="kicker" style={{ marginTop: 24 }}>
                <b>01 · Featured / {featured.role}</b>
              </p>
              <h3>{featured.name}</h3>
              <p style={{ color: "var(--text)", fontSize: 14 }}>{featured.tagline}</p>
              <p>{featured.bio}</p>
              <div className="btnrow">
                <Link to={`/music/${featured.slug}`} className="btn">
                  Explore the project <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>

            <div className="cards c4 rev stag" style={{ marginTop: 40 }}>
              {rest.map((project, index) => (
                <Link key={project.slug} to={`/music/${project.slug}`} className="card">
                  <img
                    src={project.image}
                    alt={`${project.name} editorial artwork`}
                    width={1024}
                    height={1024}
                    loading="lazy"
                    style={{ width: "100%", height: "auto", display: "block", border: "1px solid var(--line)" }}
                  />
                  <p className="ck" style={{ marginTop: 16 }}>
                    0{index + 2} · {project.status === "Current" ? "ACTIVE" : "CREATIVE HISTORY"}
                  </p>
                  <h3 style={{ fontSize: 24 }}>{project.name}</h3>
                  <p>{project.tagline}</p>
                  <p>{project.role}</p>
                  <span className="go">
                    Open <ArrowUpRight size={12} style={{ verticalAlign: "-2px" }} />
                  </span>
                </Link>
              ))}
            </div>
            <p className="mono" style={{ marginTop: 22, color: "var(--muted)" }}>
              Project images are generated editorial artwork, not band photographs or official release covers.
            </p>
          </div>
        </section>

        <section className="blk">
          <div className="wrap">
            <CtLabel n="02">A Parallel Practice</CtLabel>
            <h2 className="shead">
              Not the other life. <span>Part of the same one.</span>
            </h2>
            <p className="lede dim">
              Music is not an aside to the professional story. It&apos;s another place where listening, judgment, experimentation, and collaboration have to become something real.
            </p>
            <div className="cards c3 rev stag" style={{ marginTop: 36 }}>
              {PRACTICE_ITEMS.map(item => (
                <article key={item.title} className="card">
                  <p className="ck" style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Music2 size={14} color="#FF4D00" />
                  </p>
                  <h3 style={{ fontSize: 24 }}>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="blk">
          <div className="wrap">
            <CtLabel n="03">Keep the Conversation Going</CtLabel>
            <div className="ecard feat rev">
              <h3>Music, work, or whatever connects them.</h3>
              <div className="btnrow">
                <Link to="/contact" className="btn">
                  Contact Steve <ArrowRight size={14} />
                </Link>
                <Link to="/work" className="btn o">
                  Explore the portfolio <ArrowUpRight size={14} />
                </Link>
                <Link to="/spiix" className="btn o">
                  SPIIX <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </CtShell>
  );
}
