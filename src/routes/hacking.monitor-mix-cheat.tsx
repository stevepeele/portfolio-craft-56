import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { CtShell, CtHero } from "@/components/ct-shell";
import { ValidationBeat } from "@/components/validation-modal";
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
    <CtShell crumbs={[{ label: "Home", to: "/" }, { label: "Building", to: "/hacking" }, { label: "Monitor Mix Cheat" }]}>
      <main>
        <CtHero file="05 / Building — Monitor Mix Cheat" title={<>Stop guessing <span>the monitor mix.</span></>}
          lede={<>Instant cheat sheets for live sound engineers — wedge and IEM starting points, problem frequencies, and the mix logic that matters when the clock is running.</>}>
          <div className="btnrow">
            <a href="https://monitormix.stevepeeleii.com" target="_blank" rel="noreferrer" className="btn" onClick={() => trackCta("Try App", "hacking page", "https://monitormix.stevepeeleii.com")}>
              Try it live <ArrowUpRight size={14} />
            </a>
          </div>
        </CtHero>

        <section className="blk first">
          <div className="wrap">
            <div className="cards rev">
              {sections.map((s, i) => (
                <article key={s.kicker} className="card">
                  <p className="ck">{String(i + 1).padStart(2, "0")} / {s.kicker}</p>
                  <h3>{s.heading}</h3>
                  <p>{s.body}</p>
                </article>
              ))}
            </div>

            <div style={{ marginTop: 44 }}>
              <div className="btnrow" style={{ marginTop: 0 }}>
                <a href="https://monitormix.stevepeeleii.com" target="_blank" rel="noreferrer" className="btn" onClick={() => trackCta("Try App", "hacking page", "https://monitormix.stevepeeleii.com")}>
                  Open the app <ArrowUpRight size={14} />
                </a>
              </div>
              <p className="mono" style={{ marginTop: 18, color: "var(--muted)" }}>Built by SPIIX.</p>
              <p style={{ marginTop: 16 }}>
                <Link to="/hacking/$appSlug/changelog" params={{ appSlug: "monitor-mix-cheat" }} className="go" style={{ color: "var(--kin)", fontFamily: "'JetBrains Mono',monospace", fontSize: 10, textTransform: "uppercase", letterSpacing: ".08em", textDecoration: "none" }}>
                  Ship history →
                </Link>
              </p>
            </div>
          </div>
        </section>
        <ValidationBeat />
      </main>
    </CtShell>
  );
}
