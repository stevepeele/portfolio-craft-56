import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { LinearDashboard } from "@/components/linear-dashboard";

const title = "Progress — Live Build Board | Steve Peele II";
const description =
  "Live build board for Steve Peele II's building projects: what's live, what's building, what's queued.";

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

function ProgressPage() {
  return (
    <div className="min-h-screen overflow-x-clip">
      <SiteHeader />
      <main>
        <section className="hero-surface border-b border-border/60">
          <div className="mx-auto max-w-4xl px-5 py-20">
            <Link to="/hacking" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="size-4" /> Building
            </Link>
            <p className="eyebrow mt-8">Building / Progress</p>
            <h1 className="mt-5 text-4xl font-bold sm:text-5xl">
              The <span className="text-gradient">build board.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              Every project, one glance. Synced straight from Linear.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-20">
          <LinearDashboard />
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
