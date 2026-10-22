import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, FlaskConical } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
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
  live: { label: "Live", cls: "bg-emerald-500/15 text-emerald-400" },
  building: { label: "Building", cls: "bg-amber-500/15 text-amber-400" },
  queued: { label: "Queued", cls: "bg-muted text-muted-foreground" },
  soon: { label: "Soon", cls: "bg-amber-500/15 text-amber-400" },
} as const;

function HackingPage() {
  return (
    <div className="min-h-screen overflow-x-clip">
      <SiteHeader />
      <main>
        <section className="hero-surface border-b border-border/60">
          <div className="mx-auto max-w-4xl px-5 py-20 text-center">
            <p className="eyebrow">Building / The workbench</p>
            <h1 className="mt-5 text-4xl font-bold sm:text-5xl">
              I build little apps to see <span className="text-gradient">what I can make.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              No pitch decks. No roadmaps that outlive the quarter. Just tooling around with new
              technology, shipping small things fast, and keeping the ones that work. This is the
              workbench — everything below is something I actually built.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link to="/hacking/whats-next" className="btn-primary">
                What's next <ArrowRight className="size-4" />
              </Link>
              <Link
                to="/hacking/progress"
                className="inline-flex items-center gap-2 rounded-full border border-input px-5 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                Build progress
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-20">
          <p className="eyebrow">Building / The apps</p>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">On the bench right now.</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {hackingApps.map((app) => {
              const card = (
                <>
                  <div className="flex items-center justify-between">
                    <FlaskConical className="size-5 text-muted-foreground" aria-hidden="true" />
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${appStatusMeta[app.status].cls}`}
                    >
                      {appStatusMeta[app.status].label}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-2xl font-bold">{app.label}</h3>
                  <p className="mt-1 text-sm font-medium text-muted-foreground">{app.blurb}</p>
                  <p className="mt-3 flex-1 text-sm text-muted-foreground">{app.description}</p>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-foreground">
                    {pageSlugs.has(app.slug) ? (
                      <>
                        Open the page{" "}
                        <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </>
                    ) : (
                      "Page coming soon"
                    )}
                  </span>
                </>
              );
              return pageSlugs.has(app.slug) ? (
                <Link
                  key={app.slug}
                  to={`/hacking/${app.slug}` as "/hacking/binsly"}
                  className="panel interactive-lift group flex flex-col p-7"
                >
                  {card}
                </Link>
              ) : (
                <div key={app.slug} className="panel flex flex-col p-7">
                  {card}
                </div>
              );
            })}
          </div>
        </section>

        <section className="border-t border-border/60">
          <div className="mx-auto max-w-6xl px-5 py-20">
            <p className="eyebrow">Building / Everything else</p>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">The full index.</h2>
            {hackingNavGroups
              .filter((g) => g.key !== "start")
              .map((g) => (
                <div key={g.key} className="mt-10">
                  <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
                    {g.label}
                  </p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {subPages
                      .filter((p) => p.group === g.key)
                      .map((p) => (
                        <Link
                          key={p.to}
                          to={p.to}
                          className="flex items-center justify-between rounded-xl border border-border/60 px-5 py-4 transition-colors hover:border-border hover:bg-surface"
                        >
                          <span>
                            <span className="block text-sm font-semibold text-foreground">{p.label}</span>
                            <span className="block text-xs text-muted-foreground">{p.blurb}</span>
                          </span>
                          <ArrowRight className="size-4 text-muted-foreground" aria-hidden="true" />
                        </Link>
                      ))}
                  </div>
                </div>
              ))}
          </div>
        </section>
        <ValidationBeat />
      </main>
      <SiteFooter />
    </div>
  );
}
