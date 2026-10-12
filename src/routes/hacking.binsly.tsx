import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const title = "Binsly — Own Your Link Layer | Steve Peele II";
const description =
  "Binsly: Steve Peele II's experiment in owning the link layer. Why he built it, how it works, what he thinks, and what he's seeing.";

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
    kicker: "Why",
    heading: "The link in bio is rented land.",
    body: "Every link-in-bio tool sits between you and your audience, and the terms can change whenever the platform feels like it. Your links — the actual paths people take to find your work — shouldn't live on someone else's lease. Binsly is the experiment in owning that layer outright: your links, your rules, no algorithmic middleman deciding who sees what.",
  },
  {
    kicker: "How",
    heading: "A link library that works like you do.",
    body: "Binsly is a personal link hub and library. Drop in links, organize them, share one URL. It's built to be fast and invisible — the tool gets out of the way so the destination does the talking. No vanity metrics dashboard you'll never open, no upsell maze. Links in, links out.",
  },
  {
    kicker: "What I think",
    heading: "Small tools beat platforms at one job.",
    body: "The pattern I keep coming back to: a tiny tool that does exactly one thing will outlast every platform that tries to do everything. Binsly doesn't want to be your CRM or your analytics suite. It wants to be the most reliable link you own. That restraint is the whole product strategy.",
  },
  {
    kicker: "Results I'm seeing",
    heading: "Early days, learning in public.",
    body: "Binsly is still in the learning phase — I'm watching how people actually use their link layer versus how I assumed they would. The honest finding so far: the people who care about owning their links really care, and everyone else just wants the thing to work. Both are fine. The tool serves both.",
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
              <ArrowLeft className="size-4" /> Hacking
            </Link>
            <p className="eyebrow mt-8">Hacking / Binsly</p>
            <h1 className="mt-5 text-4xl font-bold sm:text-5xl">
              Own your <span className="text-gradient">link layer.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              A link-in-bio and link library experiment. Your links, your rules.
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
      </main>
      <SiteFooter />
    </div>
  );
}
