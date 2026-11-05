import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { CtShell, CtHero } from "@/components/ct-shell";
import { ValidationBeat } from "@/components/validation-modal";

const title = "Binsly — Save Anything. Read It Later. | Steve Peele II";
const description =
  "Binsly: Steve Peele II's read-it-later inbox. Save anything, read it later. Why he built it, how it works, and what's next.";

export const Route = createFileRoute("/hacking/binsly")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://stevepeeleii.com/hacking/binsly" }],
  }),
  component: BinslyPage,
});

const sections = [
  {
    kicker: "The problem",
    heading: "Your reading list is scattered everywhere.",
    body: "Articles in one tab graveyard, videos in another, threads you'll never find again. The stuff you actually want to read gets buried under the stuff screaming for your attention right now. I needed one place where everything I save goes to wait for me — calm, organized, mine.",
  },
  {
    kicker: "What it is",
    heading: "A read-it-later inbox. Save anything, read it later.",
    body: "Binsly is a personal reading inbox. Drop in a link — an article, a video, a thread — and it waits for you in a clean, distraction-free space. No feed, no algorithm, no infinite scroll. Just the things you chose to save, presented the way they deserve to be read.",
  },
  {
    kicker: "How it works",
    heading: "Save it. Come back when you're ready.",
    body: "Send links to your Binsly inbox from anywhere. They land in a warm, readable library — rich post rendering, organized the way you think, searchable when you need something back. It's built for the way people actually consume: in bursts, on your own time, without the noise.",
  },
  {
    kicker: "What's next",
    heading: "Making the inbox smarter.",
    body: "The roadmap is about turning a great reading list into a great reading habit: better organization, smarter surfacing of what you saved but forgot, and sharing that doesn't feel like shouting into the void. The inbox is the foundation — everything else builds on making it the calmest place on your internet.",
  },
];

function BinslyPage() {
  return (
    <CtShell crumbs={[{ label: "Home", to: "/" }, { label: "Building", to: "/hacking" }, { label: "Binsly" }]}>
      <main>
        <CtHero file="05 / Building — Binsly" title={<>Save anything. <span>Read it later.</span></>}
          lede={<>Binsly is a read-it-later inbox — one calm place for everything you want to read, watch, or come back to. No feed. No algorithm. Just your stuff, waiting for you.</>}>
          <div className="btnrow">
            <a href="https://linklib.base44.app" target="_blank" rel="noreferrer" className="btn">
              Try Binsly <ArrowUpRight size={14} />
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
                <a href="https://linklib.base44.app" target="_blank" rel="noreferrer" className="btn">
                  Open Binsly <ArrowUpRight size={14} />
                </a>
              </div>
              <p className="mono" style={{ marginTop: 18, color: "var(--muted)" }}>Built by SPIIX.</p>
              <p style={{ marginTop: 16 }}>
                <Link to="/hacking/$appSlug/changelog" params={{ appSlug: "binsly" }} className="go" style={{ color: "var(--kin)", fontFamily: "'JetBrains Mono',monospace", fontSize: 10, textTransform: "uppercase", letterSpacing: ".08em", textDecoration: "none" }}>
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
