import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Check } from "lucide-react";
import { CtShell, CtHero, CtLabel } from "@/components/ct-shell";
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
  "130 templates — system prompts, skills, crons, and workflows",
  "Browse by format or by life track: Work, Money, Career, Create, Home & Life, Health & Family",
  "Ratings, reviews, and trending — the best stuff floats up on merit",
  "Curated collections with one-click install packs",
  "Community submissions, reviewed by a human, credited by name",
  "Free. No account. Copy, paste, follow the install steps — most install in under a minute",
];

const nextItems = [
  "Moving to vault.stevepeeleii.com",
  "The request queue — most-wanted templates ship first",
  "More curated collections from the community",
];

function MuseVaultPage() {
  return (
    <CtShell crumbs={[{ label: "Home", to: "/" }, { label: "Building", to: "/hacking" }, { label: "Muse Vault" }]}>
      <main>
        <CtHero file="05 / Building — Muse Vault" title={<>Stop prompting <span>from scratch.</span></>}
          lede={<>A free gallery of 98 battle-tested Muse templates. Find one, copy it, paste it into Muse, follow the install steps. Most install in under a minute.</>}>
          <div className="btnrow">
            <a href={appUrl} target="_blank" rel="noreferrer" className="btn">
              Open Muse Vault <ArrowUpRight size={14} />
            </a>
          </div>
        </CtHero>

        <section className="blk first">
          <div className="wrap">
            <CtLabel n="01">Why I built it</CtLabel>
            <h2 className="shead">Every morning I rebuilt my tools instead of reaching for them.</h2>
            <p className="lede dim" style={{ marginTop: 16 }}>The same briefing prompt, rewritten a hundred times. The same inbox triage setup. The same deep-research workflow before big decisions — each one from scratch, each one slightly worse than the last. I live inside Muse the way a carpenter lives inside a workshop. So I built the shelf.</p>
            <p className="lede dim" style={{ marginTop: 16 }}>It started as Muse Templates, went through PromptVault, and landed on Muse Vault — two renames in one night. The final one stuck because it's honest about what it is: a vault. Shelf your best work, pull it down whenever you need it.</p>

            <div className="ledger c2 rev" style={{ marginTop: 40 }}>
              {features.map((f) => (
                <div key={f} className="cell" style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <Check size={15} color="#FF4D00" style={{ flexShrink: 0, marginTop: 2 }} aria-hidden="true" />
                  <p className="body dim">{f}</p>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 56 }}>
              <CtLabel n="02">What&apos;s next</CtLabel>
              <h2 className="shead">On the build queue</h2>
              <div className="ledger rev">
                {nextItems.map((item) => (
                  <div key={item} className="cell">
                    <p className="body">
                      <span style={{ color: "var(--kin)", marginRight: 9 }}>—</span>
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginTop: 44 }}>
              <div className="btnrow" style={{ marginTop: 0 }}>
                <a href={appUrl} target="_blank" rel="noreferrer" className="btn">
                  Open Muse Vault <ArrowUpRight size={14} />
                </a>
              </div>
              <p className="mono" style={{ marginTop: 18, color: "var(--muted)" }}>Built by SPIIX.</p>
              <p style={{ marginTop: 16 }}>
                <Link to="/hacking/$appSlug/changelog" params={{ appSlug: "muse-vault" }} className="go" style={{ color: "var(--kin)", fontFamily: "'JetBrains Mono',monospace", fontSize: 10, textTransform: "uppercase", letterSpacing: ".08em", textDecoration: "none" }}>
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
