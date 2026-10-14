import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { trackCta } from "@/lib/segment";

const title = "Repurpose Engine — One Post, Ten Platforms | Steve Peele II";
const description =
  "Repurpose Engine: write one post, get ten platform-native versions back. Each one shaped for where it lives — not the same text pasted everywhere. Why he's building it, how it works, and what's next.";

export const Route = createFileRoute("/hacking/repurpose-engine")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://stevepeeleii.com/hacking/repurpose-engine" }],
  }),
  component: RepurposeEnginePage,
});

const sections = [
  {
    kicker: "The problem",
    heading: "You write it once, then rewrite it nine more times.",
    body: "Every platform wants its own shape — the thread, the caption, the short script, the newsletter blurb. Pasting the same text everywhere looks lazy and performs worse, but rewriting it by hand for each platform is a second job nobody asked for.",
  },
  {
    kicker: "What it is",
    heading: "One post in. Ten platform-native versions out.",
    body: "Repurpose Engine takes a single post and returns versions shaped for where they live — tone, length, and format adjusted per platform. Not the same paragraph with different line breaks. Actual native versions, each one written like it belongs there.",
  },
  {
    kicker: "How it works",
    heading: "Write once. Ship everywhere.",
    body: "Drop in your post and pick your platforms. The engine produces each version with the conventions that platform rewards — hooks for short video, structure for threads, brevity for captions. You review, tweak anything that doesn't sound like you, and ship. The thinking stays yours; the reformatting doesn't eat your afternoon.",
  },
  {
    kicker: "What's next",
    heading: "In the queue, by design.",
    body: "Repurpose Engine is queued behind the current builds — the idea is scoped and waiting its turn. When it hits the bench, the first version will be deliberately small: text in, platform versions out, no accounts, no noise. The best version of this tool is the one that disappears into your workflow.",
  },
];

function RepurposeEnginePage() {
  return (
    <div className="min-h-screen overflow-x-clip">
      <SiteHeader />
      <main>
        <section className="hero-surface border-b border-border/60">
          <div className="mx-auto max-w-4xl px-5 py-20">
            <Link to="/hacking" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="size-4" /> Building
            </Link>
            <p className="eyebrow mt-8">Building / Repurpose Engine</p>
            <h1 className="mt-5 text-4xl font-bold sm:text-5xl">
              Write once. <span className="text-gradient">Ship everywhere.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              Repurpose Engine turns one post into ten platform-native versions —
              each one shaped for where it lives, not the same text pasted
              everywhere.
            </p>
            <div className="mt-8">
              <a
                href="https://repurpose.stevepeeleii.com"
                target="_blank"
                rel="noreferrer"
                className="btn-primary inline-flex items-center gap-2"
               onClick={() => trackCta("Try App", "hacking page", "https://repurpose.stevepeeleii.com")}>
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
              href="https://repurpose.stevepeeleii.com"
              target="_blank"
              rel="noreferrer"
              className="btn-primary inline-flex items-center gap-2"
             onClick={() => trackCta("Try App", "hacking page", "https://repurpose.stevepeeleii.com")}>
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
