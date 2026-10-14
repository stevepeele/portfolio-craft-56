import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const title = "Monitor Mix Cheat — Input List → Monitor Mix | Steve Peele II";
const description =
  "Monitor Mix Cheat: paste the band's input list and venue type, get per-channel monitor mix starting points — EQ, compression, and levels before the first soundcheck note.";

const appUrl = "https://monitor-mix-cheat.vercel.app";

export const Route = createFileRoute("/hacking/monitor-mix-cheat")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://stevepeeleii.com/hacking/monitor-mix-cheat" }],
  }),
  component: MonitorMixCheatPage,
});

const features = [
  "Paste the input list, pick the venue type",
  "Per-channel starting points: EQ, compression, levels",
  "Share links — send the mix sheet to the band",
  "Dark venue mode for the actual gig",
  "Print layout for the tape-and-sharpie crowd",
  "Editable cells — adjust and keep the math",
];

function MonitorMixCheatPage() {
  return (
    <div className="min-h-screen overflow-x-clip">
      <SiteHeader />
      <main>
        <section className="hero-surface border-b border-border/60">
          <div className="mx-auto max-w-4xl px-5 py-20">
            <Link to="/hacking" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="size-4" /> Building
            </Link>
            <p className="eyebrow mt-8">Building / Monitor Mix Cheat</p>
            <h1 className="mt-5 text-4xl font-bold sm:text-5xl">
              Input list in, <span className="text-gradient">mix sheet out.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              Paste the band's input list and venue type, get per-channel monitor mix starting
              points — EQ, compression, and levels before the first soundcheck note.
            </p>
            <div className="mt-8">
              <a
                href={appUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-primary inline-flex items-center gap-2"
              >
                Open Monitor Mix Cheat <ArrowUpRight className="size-4" />
              </a>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-5 py-20">
          <p className="eyebrow">Why I built it</p>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">The 1am soundcheck scribble is a tradition nobody misses.</h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Ninety percent of mic choices are automatic. The starting EQ on a 58 is the starting
            EQ on a 58. If the input list is standard, the starting mix can be too — so the
            soundcheck starts from somewhere sane instead of a blank page.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            This is the companion to StagePlot AI: one turns the input list into the plot, the
            other turns it into the mix. Built by a live sound engineer who got tired of drawing
            rectangles in PowerPoint at 1am.
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
                "Saved venue presets — your rooms, your starting points",
                "Band profiles that remember their riders",
                "Export to the usual console file formats",
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
              Open Monitor Mix Cheat <ArrowUpRight className="size-4" />
            </a>
            <p className="mt-4 text-sm text-muted-foreground">Built by SPIIX.</p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
