import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, FlaskConical } from "lucide-react";
import { CtShell, CtHero, CtLabel } from "@/components/ct-shell";
import { ValidationBeat } from "@/components/validation-modal";
import { hackingApps } from "@/data/hacking";
import { hackingNav, hackingNavGroups } from "@/data/navigation";

const title = "Building — Why I Build Little Apps | Steve Peele II";
const description =
  "Steve Peele II's playground: small apps and experiments built fast to see what's possible. Binsly, Profolio, StagePlot AI, and what's next.";

export const Route = createFileRoute("/hacking/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title }, { property: "og:image", content: "https://stevepeeleii.com/og-building.jpg" }, { property: "og:image:width", content: "1200" }, { property: "og:image:height", content: "630" }, { name: "twitter:image", content: "https://stevepeeleii.com/og-building.jpg" },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://stevepeeleii.com/hacking" }],
  }),
  component: HackingPage,
});

const subPages = hackingNav.filter((n) => n.to !== "/hacking");

// Slugs with a real /hacking/<slug> page. Apps without one (e.g. still being
// built) render as non-link cards so the grid never points at a 404.
const pageSlugs = new Set(
  hackingNav
    .filter((n) => n.group === "apps")
    .map((n) => n.to.split("/").pop() ?? ""),
);

const appStatusMeta = {
  live: { label: "Live", dot: "live" },
  building: { label: "Building", dot: "building" },
  queued: { label: "Queued", dot: "soon" },
  soon: { label: "Soon", dot: "soon" },
} as const;

function HackingPage() {
  return (
    <CtShell crumbs={[{ label: "Home", to: "/" }, { label: "Building" }]}>
      <main>
        <CtHero
          file="05 / Building"
          title={
            <>
              I build little apps to see <span>what I can make.</span>
            </>
          }
          lede="No pitch decks. No roadmaps that outlive the quarter. Just tooling around with new technology, shipping small things fast, and keeping the ones that work. This is the workbench — everything below is something I actually built."
        >
          <div className="btnrow">
            <Link to="/hacking/whats-next" className="btn">
              What's next <ArrowRight size={14} />
            </Link>
            <Link to="/hacking/progress" className="btn o">
              Build progress
            </Link>
          </div>
        </CtHero>

        <section className="blk first">
          <div className="wrap">
            <CtLabel n="01">The apps</CtLabel>
            <h2 className="shead">On the bench right now.</h2>
            <div className="cards c3 rev stag">
              {hackingApps.map((app) => {
                const meta = appStatusMeta[app.status];
                const card = (
                  <>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <FlaskConical size={16} color="#808080" aria-hidden="true" />
                      <span className="flabel" style={{ display: "inline-flex", alignItems: "center", gap: 7 }}>
                        <span className={`dot ${meta.dot}`} aria-hidden="true" />
                        {meta.label}
                      </span>
                    </div>
                    <h3>{app.label}</h3>
                    <p style={{ color: "var(--text)", fontWeight: 600 }}>{app.blurb}</p>
                    <p>{app.description}</p>
                    {pageSlugs.has(app.slug) ? (
                      <span className="go">
                        Open the page <ArrowUpRight size={12} />
                      </span>
                    ) : (
                      <span className="go" style={{ color: "var(--muted)" }}>
                        Page coming soon
                      </span>
                    )}
                  </>
                );
                return pageSlugs.has(app.slug) ? (
                  <Link
                    key={app.slug}
                    to={`/hacking/${app.slug}` as "/hacking/binsly"}
                    className="card"
                  >
                    {card}
                  </Link>
                ) : (
                  <div key={app.slug} className="card">
                    {card}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="blk">
          <div className="wrap">
            <CtLabel n="02">Everything else</CtLabel>
            <h2 className="shead">The full index.</h2>
            {hackingNavGroups
              .filter((g) => g.key !== "start")
              .map((g) => (
                <div key={g.key} style={{ marginTop: 36 }}>
                  <p className="flabel" style={{ marginBottom: 14 }}>
                    <b>{g.label}</b>
                  </p>
                  <div className="rows rev">
                    {subPages
                      .filter((p) => p.group === g.key)
                      .map((p) => (
                        <Link key={p.to} to={p.to} className="row">
                          <span className="rk">{g.label}</span>
                          <span>
                            <h3>{p.label}</h3>
                            <p>{p.blurb}</p>
                          </span>
                          <span className="rgo">
                            <ArrowRight size={14} aria-hidden="true" />
                          </span>
                        </Link>
                      ))}
                  </div>
                </div>
              ))}
          </div>
        </section>
        <ValidationBeat />
      </main>
    </CtShell>
  );
}
