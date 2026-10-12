import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { hackingProgress } from "@/data/hacking";

const title = "Progress — Live Build Board | Steve Peele II";
const description =
  "Live build board for Steve Peele II's hacking projects: what's live, what's building, what's queued.";

export const Route = createFileRoute("/hacking/progress")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://stevepeeleii.com/hacking/progress" }],
  }),
  component: ProgressPage,
});

const statusStyle: Record<string, string> = {
  live: "bg-emerald-500/15 text-emerald-400",
  building: "bg-amber-500/15 text-amber-400",
  queued: "bg-muted text-muted-foreground",
};

function ProgressPage() {
  return (
    <div className="min-h-screen overflow-x-clip">
      <SiteHeader />
      <main>
        <section className="hero-surface border-b border-border/60">
          <div className="mx-auto max-w-4xl px-5 py-20">
            <Link to="/hacking" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="size-4" /> Hacking
            </Link>
            <p className="eyebrow mt-8">Hacking / Progress</p>
            <h1 className="mt-5 text-4xl font-bold sm:text-5xl">
              The <span className="text-gradient">build board.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              Every project, one glance. Live Linear sync is coming — for now this board is
              updated as builds ship.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-20">
          <div className="overflow-hidden rounded-xl border border-border/60">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border/60 bg-surface text-xs tracking-widest text-muted-foreground uppercase">
                  <th className="px-5 py-4 font-semibold">App</th>
                  <th className="px-5 py-4 font-semibold">Status</th>
                  <th className="hidden px-5 py-4 font-semibold md:table-cell">Note</th>
                  <th className="hidden px-5 py-4 font-semibold sm:table-cell">Updated</th>
                  <th className="px-5 py-4 font-semibold">
                    <span className="sr-only">Link</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {hackingProgress.map((p) => (
                  <tr key={p.app} className="border-b border-border/40 last:border-0 hover:bg-surface/50">
                    <td className="px-5 py-4 font-semibold text-foreground">{p.app}</td>
                    <td className="px-5 py-4">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyle[p.status]}`}>
                        {p.status === "live" ? "Live" : p.status === "building" ? "Building" : "Queued"}
                      </span>
                    </td>
                    <td className="hidden px-5 py-4 text-muted-foreground md:table-cell">{p.note}</td>
                    <td className="hidden px-5 py-4 text-muted-foreground sm:table-cell">{p.updated}</td>
                    <td className="px-5 py-4">
                      {p.url && (
                        <a
                          href={p.url}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`Open ${p.app}`}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <ArrowUpRight className="size-4" aria-hidden="true" />
                        </a>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            Synced with the 7 Apps Sprint board in Linear. Live API sync coming soon.
          </p>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
