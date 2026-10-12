import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { LinearDashboard } from "@/components/linear-dashboard";
import { statusLog } from "@/data/hacking";

const title = "Status — Build Log | Steve Peele II";
const description =
  "What Steve Peele II has been building: a running log of launches, experiments, and what's shipping from the workbench.";

export const Route = createFileRoute("/hacking/status")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://stevepeeleii.com/hacking/status" }],
  }),
  component: StatusPage,
});

function StatusPage() {
  return (
    <div className="min-h-screen overflow-x-clip">
      <SiteHeader />
      <main>
        <section className="hero-surface border-b border-border/60">
          <div className="mx-auto max-w-4xl px-5 py-20">
            <Link to="/hacking" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="size-4" /> Building
            </Link>
            <p className="eyebrow mt-8">Building / Status</p>
            <h1 className="mt-5 text-4xl font-bold sm:text-5xl">
              The <span className="text-gradient">build log.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              What's shipped, in order. No roadmap theater — just the record.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-20">
          <p className="eyebrow">Building / Live board</p>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
            The <span className="text-gradient">Linear board.</span>
          </h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Every website and dev project, straight from the tracker. Click any issue to open it
            in Linear.
          </p>
          <div className="mt-10">
            <LinearDashboard />
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-5 py-20">
          <ol className="relative space-y-8 border-l border-border/60 pl-8">
            {statusLog.map((entry) => (
              <li key={`${entry.date}-${entry.title}`} className="relative">
                <span
                  className="absolute top-1.5 -left-8 size-3 -translate-x-1/2 rounded-full bg-primary"
                  aria-hidden="true"
                />
                <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
                  {entry.date}
                </p>
                <h2 className="mt-1 font-display text-xl font-bold">{entry.title}</h2>
                <p className="mt-2 text-muted-foreground">{entry.detail}</p>
              </li>
            ))}
          </ol>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
