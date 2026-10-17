import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ValidationBeat } from "@/components/validation-modal";

const title = "Muse Vault — Stop Prompting From Scratch | Steve Peele II";
const description =
  "Muse Vault: a free gallery of 98 battle-tested Muse templates — system prompts, skills, crons, and workflows across Work, Money, Career, Create, Home & Life, and Health & Family.";

const appUrl = "https://muse-templates-stevepeeles-projects.vercel.app/";

export const Route = createFileRoute("/hacking/muse-vault")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://stevepeeleii.com/hacking/muse-vault" }],
  }),
  component: MuseVaultPage,
});

const features = [
  "98 templates — system prompts, skills, crons, and workflows",
  "Browse by format or by life track: Work, Money, Career, Create, Home & Life, Health & Family",
  "Ratings, reviews, and trending — the best stuff floats up on merit",
  "Curated collections with one-click install packs",
  "Community submissions, reviewed by a human, credited by name",
  "Free. No account. Copy, paste, follow the install steps — most install in under a minute",
];

function MuseVaultPage() {
  return (
    <div className="min-h-screen overflow-x-clip">
      <SiteHeader />
      <main>
        <section className="hero-surface border-b border-border/60">
          <div className="mx-auto max-w-4xl px-5 py-20">
            <Link to="/hacking" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="size-4" /> Building
            </Link>
            <p className="eyebrow mt-8">Building / Muse Vault</p>
            <h1 className="mt-5 text-4xl font-bold sm:text-5xl">
              Stop prompting <span className="text-gradient">from scratch.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              A free gallery of 98 battle-tested Muse templates. Find one, copy it, paste it
              into Muse, follow the install steps. Most install in under a minute.
            </p>
            <div className="mt-8">
              <a
                href={appUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-primary inline-flex items-center gap-2"
              >
                Open Muse Vault <ArrowUpRight className="size-4" />
              </a>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-5 py-20">
          <p className="eyebrow">Why I built it</p>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">Every morning I rebuilt my tools instead of reaching for them.</h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            The same briefing prompt, rewritten a hundred times. The same inbox triage setup. The
            same deep-research workflow before big decisions — each one from scratch, each one
            slightly worse than the last. I live inside Muse the way a carpenter lives inside a
            workshop. So I built the shelf.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            It started as Muse Templates, went through PromptVault, and landed on Muse Vault — two
            renames in one night. The final one stuck because it's honest about what it is: a
            vault. Shelf your best work, pull it down whenever you need it.
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
                "Moving to vault.stevepeeleii.com",
                "The request queue — most-wanted templates ship first",
                "More curated collections from the community",
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
              href={appUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-primary inline-flex items-center gap-2"
            >
              Open Muse Vault <ArrowUpRight className="size-4" />
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
