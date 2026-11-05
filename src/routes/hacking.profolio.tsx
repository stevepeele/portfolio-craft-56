import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Check } from "lucide-react";
import { CtShell, CtHero, CtLabel } from "@/components/ct-shell";
import { ValidationBeat } from "@/components/validation-modal";

const title = "Profolio — One Baseline, Many Stories | Steve Peele II";
const description =
  "Profolio: a professional portfolio builder. One private baseline of projects, skills, and credentials — then tailored views for whoever you're talking to.";

export const Route = createFileRoute("/hacking/profolio")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://stevepeeleii.com/hacking/profolio" }],
  }),
  component: ProfolioPage,
});

const features = [
  "One private baseline — projects with real metrics, skills, credentials",
  "Tailored views per audience — hiring managers see one story, clients another",
  "Shareable public links — no account needed on the receiving end",
  "Free to start (5 projects, 1 view) · Pro $29 one-time, unlimited",
];

const nextItems = [
  "Public directory of published baselines",
  "Baseline version history",
  "PDF export of a baseline",
  "Template gallery for baselines",
  "AI baseline draft generator",
];

function ProfolioPage() {
  return (
    <CtShell crumbs={[{ label: "Home", to: "/" }, { label: "Building", to: "/hacking" }, { label: "Profolio" }]}>
      <main>
        <CtHero file="05 / Building — Profolio" title={<>One baseline, <span>many stories.</span></>}
          lede={<>A professional portfolio builder. Log your projects with real metrics once — then package tailored views for whoever you're talking to.</>}>
          <div className="btnrow">
            <a href="https://profolioapp.stevepeeleii.com/" target="_blank" rel="noreferrer" className="btn">
              Try Profolio <ArrowUpRight size={14} />
            </a>
          </div>
        </CtHero>

        <section className="blk first">
          <div className="wrap">
            <CtLabel n="01">Why I built it</CtLabel>
            <h2 className="shead">One resume for every audience is lazy.</h2>
            <p className="lede dim" style={{ marginTop: 16 }}>I had a folder called "career stuff" — resumes from 2019, 2021, 2023, a nine-page master resume, cover letter templates with [COMPANY NAME] still in them. Every time I needed to send something, I'd stare at the folder and send the same generic PDF. Tailoring felt like a second job.</p>
            <p className="lede dim" style={{ marginTop: 16 }}>The answer was never "more resumes." It's one source of truth, packaged per audience. A view is a named slice of your baseline: these three projects, these skills, this credential. Share it as a link — that's the whole story they get. Nothing is public until you share.</p>

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
                <a href="https://profolioapp.stevepeeleii.com/" target="_blank" rel="noreferrer" className="btn">
                  Open Profolio <ArrowUpRight size={14} />
                </a>
              </div>
              <p className="mono" style={{ marginTop: 18, color: "var(--muted)" }}>Built by SPIIX.</p>
              <p style={{ marginTop: 16 }}>
                <Link to="/hacking/$appSlug/changelog" params={{ appSlug: "profolio" }} className="go" style={{ color: "var(--kin)", fontFamily: "'JetBrains Mono',monospace", fontSize: 10, textTransform: "uppercase", letterSpacing: ".08em", textDecoration: "none" }}>
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
