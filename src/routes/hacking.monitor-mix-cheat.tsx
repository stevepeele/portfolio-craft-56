import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { trackCta } from "@/lib/segment";

const title = "Monitor Mix Cheat — Live Sound Monitor Cheat Sheets | Steve Peele II";
const description =
  "Monitor Mix Cheat: instant monitor mix cheat sheets for live sound engineers. Dial in wedge and IEM mixes faster, stop guessing, keep the stage happy. Why he built it and how it works.";

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
    heading: "Soundcheck eats the show.",
    body: "You're behind the console, the band's staring at you, and someone's yelling 'more me' for the third time. Every monitor mix starts from zero — which wedge, which aux, what the singer actually needs versus what they think they need. The knowledge lives in your head, and under pressure it evaporates.",
  },
  {
    kicker: "What it is",
    heading: "The cheat sheet you wish you had.",
    body: "Monitor Mix Cheat gives you instant reference for building monitor mixes: starting points for wedges and IEMs by instrument, common problem frequencies, and the signal flow logic that actually matters when the clock is running. It's the stuff experienced engineers know by feel, written down so you don't have to learn it the hard way.",
  },
  {
    kicker: "How it works",
    heading: "Look it up. Dial it in. Move on.",
    body: "Pick the scenario — wedge mix for a five-piece, IEM starting points for a vocalist, taming a boomy stage. Get the cheat sheet: what to push, what to cut, and why. No accounts, no onboarding, no friction. It's a reference tool, and it acts like one.",
  },
  {
    kicker: "What's next",
    heading: "Built by someone who mixes.",
    body: "Steve runs live sound and needed this to exist, so he built it. What's next is expanding the library — more instruments, more scenarios, and the edge cases you only hit at 11pm on a Saturday. If you mix monitors, this is for you.",
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
              Stop guessing <span className="text-gradient">the monitor mix.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              Instant cheat sheets for live sound engineers — wedge and IEM
              starting points, problem frequencies, and the mix logic that
              matters when the clock is running.
            </p>
            <div className="mt-8">
              <a
                href="https://monitormix.stevepeeleii.com"
                target="_blank"
                rel="noreferrer"
                className="btn-primary inline-flex items-center gap-2"
               onClick={() => trackCta("Try App", "hacking page", "https://monitormix.stevepeeleii.com")}>
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
              href="https://monitormix.stevepeeleii.com"
              target="_blank"
              rel="noreferrer"
              className="btn-primary inline-flex items-center gap-2"
             onClick={() => trackCta("Try App", "hacking page", "https://monitormix.stevepeeleii.com")}>
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
