import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { CtShell, CtHero } from "@/components/ct-shell";
import { ValidationBeat } from "@/components/validation-modal";
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
    <CtShell crumbs={[{ label: "Home", to: "/" }, { label: "Building", to: "/hacking" }, { label: "Repurpose Engine" }]}>
      <main>
        <CtHero file="05 / Building — Repurpose Engine" title={<>Write once. <span>Ship everywhere.</span></>}
          lede={<>Repurpose Engine turns one post into ten platform-native versions — each one shaped for where it lives, not the same text pasted everywhere.</>}>
          <div className="btnrow">
            <a href="https://repurpose.stevepeeleii.com" target="_blank" rel="noreferrer" className="btn" onClick={() => trackCta("Try App", "hacking page", "https://repurpose.stevepeeleii.com")}>
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
                <a href="https://repurpose.stevepeeleii.com" target="_blank" rel="noreferrer" className="btn" onClick={() => trackCta("Try App", "hacking page", "https://repurpose.stevepeeleii.com")}>
                  Open the app <ArrowUpRight size={14} />
                </a>
              </div>
              <p className="mono" style={{ marginTop: 18, color: "var(--muted)" }}>Built by SPIIX.</p>
              <p style={{ marginTop: 16 }}>
                <Link to="/hacking/$appSlug/changelog" params={{ appSlug: "repurpose-engine" }} className="go" style={{ color: "var(--kin)", fontFamily: "'JetBrains Mono',monospace", fontSize: 10, textTransform: "uppercase", letterSpacing: ".08em", textDecoration: "none" }}>
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
