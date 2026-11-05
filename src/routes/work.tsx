import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { CtShell, CtHero, CtLabel } from "@/components/ct-shell";
import { caseHighlights, experience, heroStats, portfolioProjects, profile, recommendations } from "@/data/resume";

const title = "Work — Results, Experience & Recommendations | Steve Peele II";
const description =
  "Steve Peele II's growth marketing record in one place: selected results, career experience, projects, and recommendations from leaders and teammates.";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title }, { property: "og:image", content: "https://stevepeeleii.com/og-work.jpg" }, { property: "og:image:width", content: "1200" }, { property: "og:image:height", content: "630" }, { name: "twitter:image", content: "https://stevepeeleii.com/og-work.jpg" },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://stevepeeleii.com/work" }],
  }),
  component: WorkPage,
});

const sections = [
  { id: "results", label: "Results" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "recommendations", label: "Recommendations" },
];

function WorkPage() {
  return (
    <CtShell crumbs={[{ label: "Home", to: "/" }, { label: "Portfolio" }]}>
      <main>
        <CtHero
          file="02 / Portfolio"
          title={
            <>
              Outcomes, not <span>activity reports.</span>
            </>
          }
          lede="Results, the roles behind them, the projects, and what people who worked with me say."
        >
          <nav aria-label="On this page" className="tags" style={{ marginTop: 30 }}>
            {sections.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="tag">
                {s.label}
              </a>
            ))}
          </nav>
        </CtHero>

        <section id="results" className="blk first" style={{ scrollMarginTop: 70 }}>
          <div className="wrap">
            <CtLabel n="01">The Results</CtLabel>
            <h2 className="shead">
              Selected <span>results.</span>
            </h2>
            <div className="statgrid rev">
              {heroStats.map((s) => (
                <div key={s.label}>
                  <strong>{s.value}</strong>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
            <div className="cards c2 rev stag" style={{ marginTop: 40 }}>
              {caseHighlights.map((c) => (
                <article key={c.company} className="card">
                  <p className="ck">
                    {c.sector}
                    {c.acquired && (
                      <>
                        {"  "}
                        <span className="badge">Acquired</span>
                      </>
                    )}
                  </p>
                  <h3>{c.company}</h3>
                  <div style={{ display: "grid", gap: 12, marginTop: 14 }}>
                    {c.metrics.map((m) => (
                      <div key={m.label}>
                        <span className="big">{m.value}</span>
                        <span
                          className="flabel"
                          style={{ display: "block", marginTop: 2, textTransform: "uppercase" }}
                        >
                          {m.label}
                        </span>
                      </div>
                    ))}
                  </div>
                  <p>{c.summary}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="experience" className="blk" style={{ scrollMarginTop: 70 }}>
          <div className="wrap">
            <CtLabel n="02">Experience</CtLabel>
            <h2 className="shead">
              Where I&apos;ve done <span>the work.</span>
            </h2>
            <div className="tl rev" style={{ marginBottom: 40 }}>
              {experience.map((e) => (
                <article key={e.company + e.role}>
                  <span className="when">{e.period}</span>
                  <h3>
                    {e.company}
                    {e.note ? <em>{e.note}</em> : null}
                  </h3>
                  <div className="role">{e.role}</div>
                  {e.bullets?.length ? (
                    <ul>
                      {e.bullets.map((b) => (
                        <li key={b}>
                          <span>—</span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </article>
              ))}
            </div>
            <a href={profile.cv} target="_blank" rel="noreferrer" className="btn o">
              View full CV <ArrowRight size={14} />
            </a>
          </div>
        </section>

        <section id="projects" className="blk" style={{ scrollMarginTop: 70 }}>
          <div className="wrap">
            <CtLabel n="03">Projects</CtLabel>
            <h2 className="shead">
              Selected <span>projects.</span>
            </h2>
            <div className="cards c2 rev stag">
              {portfolioProjects.map((p) => (
                <article key={p.title} className="card">
                  <p className="ck">
                    {p.company} · {p.period}
                  </p>
                  <h3 style={{ fontSize: 24 }}>{p.title}</h3>
                  <p>{p.summary}</p>
                  <ul className="tags" style={{ marginTop: 16, listStyle: "none" }}>
                    {p.levers.map((l) => (
                      <li key={l} className="tag">
                        {l}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="recommendations" className="blk" style={{ scrollMarginTop: 70 }}>
          <div className="wrap">
            <CtLabel n="04">Recommendations</CtLabel>
            <h2 className="shead">
              What leaders and <span>teammates say.</span>
            </h2>
            <div className="qgrid rev stag">
              {recommendations.map((r) => (
                <article key={r.name}>
                  <div className="qm">“</div>
                  <blockquote>&ldquo;{r.quote}&rdquo;</blockquote>
                  <h4>{r.name}</h4>
                  <p>{r.title}</p>
                </article>
              ))}
            </div>
            <div className="btnrow" style={{ marginTop: 36 }}>
              <Link to="/contact" className="btn">
                Let&apos;s Talk <ArrowRight size={14} />
              </Link>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="btn o">
                Read them on LinkedIn
              </a>
            </div>
          </div>
        </section>

        <section className="blk">
          <div className="wrap">
            <CtLabel n="05">Put the experience to work</CtLabel>
            <h2 className="shead">
              Need senior growth leadership <span>without a full-time hire?</span>
            </h2>
            <p className="lede dim">
              See how SPIIX combines fractional growth leadership, marketing operations, demand
              generation, and execution.
            </p>
            <div className="btnrow">
              <Link to="/fractional-growth-advisory" className="btn">
                Explore fractional growth advisory <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </CtShell>
  );
}
