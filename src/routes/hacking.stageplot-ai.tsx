import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ValidationBeat } from "@/components/validation-modal";

const title = "StagePlot AI — Input List to Stage Plot | Steve Peele II";
const description =
  "StagePlot AI: paste a band's input list, get a professional stage plot + channel sheet in seconds. Built for live sound engineers.";

export const Route = createFileRoute("/hacking/stageplot-ai")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://stevepeeleii.com/hacking/stageplot-ai" }],
  }),
  component: StagePlotPage,
});

const features = [
  "Smart mic defaults — Beta 52 on kick, SM57 on snare, the choices you'd make anyway",
  "Override anything — type “gtr1 e609” and it respects your judgment",
  "Top-down SVG stage plot with wedges, DIs, and mic positions",
  "Numbered channel sheet with monitor mix assignments",
  "Gig header — band, venue, date, FOH contact — prints on the PDF",
  "Stage notes, editable cells, saved plots, print to PDF",
];

function StagePlotPage() {
  return (
    <div className="min-h-screen overflow-x-clip">
      <SiteHeader />
      <main>
        <section className="hero-surface border-b border-border/60">
          <div className="mx-auto max-w-4xl px-5 py-20">
            <Link to="/hacking" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="size-4" /> Building
            </Link>
            <p className="eyebrow mt-8">Building / StagePlot AI</p>
            <h1 className="mt-5 text-4xl font-bold sm:text-5xl">
              Input list in. <span className="text-gradient">Stage plot out.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              Paste a band's input list, get a professional stage plot + channel sheet in seconds.
              No more PowerPoint rectangles at 1am.
            </p>
            <div className="mt-8">
              <a
                href="https://stageplot.stevepeeleii.com/"
                target="_blank"
                rel="noreferrer"
                className="btn-primary inline-flex items-center gap-2"
              >
                Try StagePlot AI <ArrowUpRight className="size-4" />
              </a>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-5 py-20">
          <p className="eyebrow">Why I built it</p>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">The 1am stage plot problem.</h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            It's 1am. Load-in's at 8. The input list finally arrives — 19 channels and three "???s"
            — and you're in PowerPoint drawing rectangles. The mic choices are 90% automatic anyway.
            The layout follows conventions everyone knows. The channel sheet is formatting. None of
            it's hard. It's just tedious. So I automated the tedious part.
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
                "Drag-and-drop stage canvas editor",
                "Venue profile presets",
                "Share an editable plot with bandmates",
                "Combined stage plot + input list production PDF",
                "Input list templates by ensemble type",
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
              href="https://stageplot.stevepeeleii.com/"
              target="_blank"
              rel="noreferrer"
              className="btn-primary inline-flex items-center gap-2"
            >
              Open StagePlot AI <ArrowUpRight className="size-4" />
            </a>
            <p className="mt-4 text-sm text-muted-foreground">Built by SPIIX.</p>
          </div>
        </section>
        <ValidationBeat />
      </main>
      <SiteFooter />
    </div>
  );
}
