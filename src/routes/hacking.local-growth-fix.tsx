import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const title = "Local Growth Fix — The $750 Audit | Steve Peele II";
const description =
  "Local Growth Fix: a $750 done-for-you website teardown for local businesses — deterministic site checks, an AI-written teardown, and a branded PDF through a public intake funnel.";

const appUrl = "https://local-growth-engine-stevepeeles-projects.vercel.app/intake";

export const Route = createFileRoute("/hacking/local-growth-fix")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://stevepeeleii.com/hacking/local-growth-fix" }],
  }),
  component: LocalGrowthFixPage,
});

const features = [
  "Deterministic site checks — the stuff a machine can verify in seconds",
  "AI teardown writer — what the checks mean, in plain language",
  "Branded PDF report — the deliverable, ready to hand over",
  "Public intake funnel — prospects enter, teardowns come out",
  "First-touch drafts generated from completed teardowns — reviewed before anything goes out",
  "$750, done-for-you — the fastest dollar on the board",
];

function LocalGrowthFixPage() {
  return (
    <div className="min-h-screen overflow-x-clip">
      <SiteHeader />
      <main>
        <section className="hero-surface border-b border-border/60">
          <div className="mx-auto max-w-4xl px-5 py-20">
            <Link to="/hacking" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="size-4" /> Building
            </Link>
            <p className="eyebrow mt-8">Building / Local Growth Fix</p>
            <h1 className="mt-5 text-4xl font-bold sm:text-5xl">
              The <span className="text-gradient">$750 audit.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              A done-for-you website teardown for local businesses. Deterministic site checks, an
              AI-written teardown, and a branded PDF — delivered through a public intake funnel.
            </p>
            <div className="mt-8">
              <a
                href={appUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-primary inline-flex items-center gap-2"
              >
                Start an audit <ArrowUpRight className="size-4" />
              </a>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-5 py-20">
          <p className="eyebrow">Why I built it</p>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">Local businesses don't need another report. They need the fix.</h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Most local business sites have the same five problems, and nobody's told the owner in
            language that survives a busy Tuesday. The audit wedge is the fastest dollar on the
            board: show them exactly what's broken, in 48 hours, for a price that doesn't need a
            committee.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            This is monetization sprint idea #1 — ranked by speed-to-cash and shipped first. The
            teardown doubles as content and as the top of the outreach machine: every completed
            teardown generates a first-touch draft in my voice, staged for review before anything
            goes out.
          </p>

          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {features.map((f) => (
              <div key={f} className="panel flex items-start gap-3 p-5">
                <Check className="mt-0.5 size-5 shrink-0 text-emerald-400" aria-hidden="true" />
                <p className="text-sm text-muted-foreground">{f}</p>
              </div>
            ))}
          </div>

          <div className="mt-16">
            <p className="eyebrow">What's next</p>
            <h3 className="mt-4 text-2xl font-bold">On the build queue</h3>
            <ul className="mt-6 space-y-3">
              {[
                "First paying audit clients from the outreach sequence",
                "Fix packages behind the audit — the teardown sells the work",
                "$299/mo retainer tier for ongoing fixes",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-muted-foreground">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-muted-foreground/50" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-16 text-center">
            <a
              href={appUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-primary inline-flex items-center gap-2"
            >
              Start an audit <ArrowUpRight className="size-4" />
            </a>
            <p className="mt-4 text-sm text-muted-foreground">Built by SPIIX.</p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
