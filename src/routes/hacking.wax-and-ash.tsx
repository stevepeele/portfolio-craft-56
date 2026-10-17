import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ValidationBeat } from "@/components/validation-modal";
import { trackCta } from "@/lib/segment";

const title = "Wax & Ash — A Love Note That Burns | Steve Peele II";
const description =
  "Wax & Ash: a digital dead-drop for two people. One shared board, one note at a time, no accounts — read it, and it burns forever. Why he built it, how the ritual works, and what's next.";

export const Route = createFileRoute("/hacking/wax-and-ash")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://stevepeeleii.com/hacking/wax-and-ash" }],
  }),
  component: WaxAndAshPage,
});

const sections = [
  {
    kicker: "The problem",
    heading: "Love letters got flattened into chat bubbles.",
    body: "Every message app treats a love note the same as a grocery list — same thread, same notification badge, same infinite scroll. There's no ceremony left in writing to someone you love. The anticipation, the sealing, the waiting — all of it got optimized away.",
  },
  {
    kicker: "What it is",
    heading: "A digital dead-drop for two people.",
    body: "Wax & Ash is a shared board between exactly two people. One note at a time. No accounts — the link is the identity. No notifications, no badges, no read receipts screaming for attention. A writes, seals, and leaves the note. B checks the link whenever they want, reads it, and the note burns forever — for both of them. Then the turn passes, and B writes back.",
  },
  {
    kicker: "How it works",
    heading: "Write. Seal. Leave. Burn.",
    body: "Share the board link with one person and that's the whole setup. When it's your turn, you compose your note and seal it. They open the link on their own time — no ping pulls them in — read what you wrote, and watch it burn. The ritual is the point: the novelty isn't ephemerality, it's the anticipation. Knowing a sealed note is waiting for you, and nobody else in the world can see it.",
  },
  {
    kicker: "What's next",
    heading: "The board is getting the ritual-object treatment.",
    body: "Wax & Ash is live at waxandash.stevepeeleii.com — the full A-to-B-to-A loop works end to end. The current pass is a board design and polish round: making the composer, the sealed state, the reading moment, and the burn feel like a ritual object, not a form. Free to use; no accounts, ever.",
  },
];

function WaxAndAshPage() {
  return (
    <div className="min-h-screen overflow-x-clip">
      <SiteHeader />
      <main>
        <section className="hero-surface border-b border-border/60">
          <div className="mx-auto max-w-4xl px-5 py-20">
            <Link to="/hacking" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="size-4" /> Building
            </Link>
            <p className="eyebrow mt-8">Building / Wax & Ash</p>
            <h1 className="mt-5 text-4xl font-bold sm:text-5xl">
              A love note <span className="text-gradient">that burns.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              Wax & Ash is a digital dead-drop for two people — one shared
              board, one note at a time, no accounts. Read it, and it burns
              forever.
            </p>
            <div className="mt-8">
              <a
                href="https://waxandash.stevepeeleii.com"
                target="_blank"
                rel="noreferrer"
                className="btn-primary inline-flex items-center gap-2"
               onClick={() => trackCta("Try App", "hacking page", "https://waxandash.stevepeeleii.com")}>
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
              href="https://waxandash.stevepeeleii.com"
              target="_blank"
              rel="noreferrer"
              className="btn-primary inline-flex items-center gap-2"
             onClick={() => trackCta("Try App", "hacking page", "https://waxandash.stevepeeleii.com")}>
              Open the app <ArrowUpRight className="size-4" />
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
