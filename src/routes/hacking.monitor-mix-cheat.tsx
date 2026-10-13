import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { trackCta } from "@/lib/segment";

const title = "Monitor Mix Cheat — Input List → Monitor Mix | Steve Peele II";
const description =
  "Monitor Mix Cheat: paste a band's input list and venue type, get per-channel monitor mix starting points — EQ, compression, and levels before the first soundcheck note. Why he's building it, how it works, and what's next.";

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

const sections = [
  {
    kicker: "The problem",
    heading: "Every soundcheck starts from zero.",
    body: "You know the band, the room, and the wedges — but the first hour is still spent rediscovering what you already knew: that vocal needs a cut at 400, the kick needs a gate, the snare top wants a little more body in the sidefills. It's skilled work spent on unskilled repetition.",
  },
  {
    kicker: "What it is",
    heading: "Input list in. Starting mix out.",
    body: "Monitor Mix Cheat takes the band's input list and the venue type, then hands you per-channel monitor mix starting points — EQ, compression, levels — the kind of first draft an experienced engineer would sketch before the band ever plays a note.",
  },
  {
    kicker: "How it works",
    heading: "Built for the desk, not the studio.",
    body: "Dark venue mode so you're not the guy with the glowing laptop. Share links to hand the draft to the band or the house engineer. A print layout for the tape-and-Sharpie crowd. Editable cells, because no cheat sheet survives contact with the drummer.",
  },
  {
    kicker: "What's next",
    heading: "Companion to StagePlot AI.",
    body: "StagePlot AI draws the stage; Monitor Mix Cheat dials the wedges. The pair covers the two things every live engineer does from scratch, every single gig. Next up: saved venue profiles, so a room you've mixed before starts where you left it.",
  },
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
              Walk into soundcheck <span className="text-gradient">with a first draft.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              Monitor Mix Cheat turns an input list and a venue type into
              per-channel monitor mix starting points — before the band plays
              a single note.
            </p>
            <div className="mt-8">
              <a
                href="https://monitor-mix-cheat.vercel.app"
                target="_blank"
                rel="noreferrer"
                className="btn-primary inline-flex items-center gap-2"
               onClick={() => trackCta("Try App", "hacking page", "https://monitor-mix-cheat.vercel.app")}>
                Try it live <ArrowUpRight className="size-4" />
              </a>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-5 py-20">
          <div className="space-y-16">
            {sections.map((s, i) => (
              <article key={s.kicker} className="panel p-8 sm:p-10">
                <p className="eyebrow">
                  0{i + 1} / {s.kicker}
                </p>
                <h2 className="mt-4 text-2xl font-bold sm:text-3xl">{s.heading}</h2>
                <p className="mt-4 leading-relaxed text-muted-foreground">{s.body}</p>
              </article>
            ))}
          </div>

          <div className="mt-16 text-center">
            <a
              href="https://monitor-mix-cheat.vercel.app"
              target="_blank"
              rel="noreferrer"
              className="btn-primary inline-flex items-center gap-2"
             onClick={() => trackCta("Try App", "hacking page", "https://monitor-mix-cheat.vercel.app")}>
              Open the app <ArrowUpRight className="size-4" />
            </a>
            <p className="mt-4 text-sm text-muted-foreground">Built by SPIIX.</p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
