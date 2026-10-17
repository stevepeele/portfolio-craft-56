import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
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
    <div className="min-h-screen overflow-x-clip">
      <SiteHeader />
      <main>
        <section className="hero-surface border-b border-border/60">
          <div className="mx-auto max-w-4xl px-5 py-20">
            <Link to="/hacking" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="size-4" /> Building
            </Link>
            <p className="eyebrow mt-8">Building / Binsly</p>
            <h1 className="mt-5 text-4xl font-bold sm:text-5xl">
              Save anything. <span className="text-gradient">Read it later.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              Binsly is a read-it-later inbox — one calm place for everything
              you want to read, watch, or come back to. No feed. No algorithm.
              Just your stuff, waiting for you.
            </p>
            <div className="mt-8">
              <a
                href="https://linklib.base44.app"
                target="_blank"
                rel="noreferrer"
                className="btn-primary inline-flex items-center gap-2"
              >
                Try Binsly <ArrowUpRight className="size-4" />
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
              href="https://linklib.base44.app"
              target="_blank"
              rel="noreferrer"
              className="btn-primary inline-flex items-center gap-2"
            >
              Open Binsly <ArrowUpRight className="size-4" />
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
