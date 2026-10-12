import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Circle, CircleDot, CheckCircle2 } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { LinearDashboard } from "@/components/linear-dashboard";
import { buildQueue } from "@/data/hacking";

const title = "What's Next — The Build Queue | Steve Peele II";
const description =
  "Steve Peele II's build queue: what shipped, what's next, and what's in line. A living list of small apps and experiments.";

export const Route = createFileRoute("/hacking/whats-next")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://stevepeeleii.com/hacking/whats-next" }],
  }),
  component: WhatsNextPage,
});

const statusMeta = {
  shipped: { icon: CheckCircle2, cls: "text-emerald-400", label: "Shipped" },
  next: { icon: CircleDot, cls: "text-amber-400", label: "Up next" },
  queued: { icon: Circle, cls: "text-muted-foreground", label: "Queued" },
} as const;

function WhatsNextPage() {
  return (
    <div className="min-h-screen overflow-x-clip">
      <SiteHeader />
      <main>
        <section className="hero-surface border-b border-border/60">
          <div className="mx-auto max-w-4xl px-5 py-20">
            <Link to="/hacking" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="size-4" /> Building
            </Link>
            <p className="eyebrow mt-8">Building / What's next</p>
            <h1 className="mt-5 text-4xl font-bold sm:text-5xl">
              The <span className="text-gradient">build queue.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              A living list, in order. Shipped things stay on the record; the rest is the plan
              until the plan changes.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-5 py-20">
          <div className="space-y-4">
            {buildQueue.map((item, i) => {
              const meta = statusMeta[item.status];
              const Icon = meta.icon;
              return (
                <article key={item.name} className="panel flex items-start gap-5 p-6 sm:p-7">
                  <span className="mt-1 font-display text-lg font-bold text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="font-display text-xl font-bold">{item.name}</h2>
                      <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${meta.cls}`}>
                        <Icon className="size-3.5" aria-hidden="true" />
                        {meta.label}
                        {item.shippedDate ? ` · ${item.shippedDate}` : ""}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                  </div>
                  {item.url && (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Open ${item.name}`}
                      className="mt-1 shrink-0 rounded-lg border border-border/60 p-2 text-muted-foreground hover:text-foreground"
                    >
                      <ArrowUpRight className="size-4" aria-hidden="true" />
                    </a>
                  )}
                </article>
              );
            })}
          </div>
          <p className="mt-10 text-center text-sm text-muted-foreground">
            Build tiny, ship fast, quit faster. — the operating principle
          </p>
        </section>

        <section className="border-t border-border/60">
          <div className="mx-auto max-w-6xl px-5 py-20">
            <p className="eyebrow">Building / Live board</p>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
              The <span className="text-gradient">Linear board.</span>
            </h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              The full tracker behind the queue — every project, every open issue.
            </p>
            <div className="mt-10">
              <LinearDashboard />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
