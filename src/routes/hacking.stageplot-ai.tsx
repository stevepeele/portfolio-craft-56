import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Check } from "lucide-react";
import { CtShell, CtHero, CtLabel } from "@/components/ct-shell";
import { ValidationBeat } from "@/components/validation-modal";

const title = "StagePlot AI — Input List to Stage Plot | Steve Peele II";
const description =
  "StagePlot AI: paste a band's input list, get a professional stage plot + channel sheet in seconds. Built for live sound engineers.";

export const Route = createFileRoute("/hacking/stageplot-ai")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://stevepeeleii.com/hacking/stageplot-ai" }],
  }),
  component: StagePlotPage,
});

const features = [
  "Smart mic defaults — Beta 52 on kick, SM57 on snare, the choices you'd make anyway",
  "Override anything — type “gtr1 e609” and it respects your judgment",
  "Top-down SVG stage plot with wedges, DIs, and mic positions",
  "Numbered channel sheet with monitor mix assignments",
  "Gig header — band, venue, date, FOH contact — prints on the PDF",
  "Stage notes, editable cells, saved plots, print to PDF",
];

const nextItems = [
  "Drag-and-drop stage canvas editor",
  "Venue profile presets",
  "Share an editable plot with bandmates",
  "Combined stage plot + input list production PDF",
  "Input list templates by ensemble type",
];

function StagePlotPage() {
  return (
    <CtShell crumbs={[{ label: "Home", to: "/" }, { label: "Building", to: "/hacking" }, { label: "StagePlot AI" }]}>
      <main>
        <CtHero file="05 / Building — StagePlot AI" title={<>Input list in. <span>Stage plot out.</span></>}
          lede={<>Paste a band's input list, get a professional stage plot + channel sheet in seconds. No more PowerPoint rectangles at 1am.</>}>
          <div className="btnrow">
            <a href="https://stageplot.stevepeeleii.com/" target="_blank" rel="noreferrer" className="btn">
              Try StagePlot AI <ArrowUpRight size={14} />
            </a>
          </div>
        </CtHero>

        <section className="blk first">
          <div className="wrap">
            <CtLabel n="01">Why I built it</CtLabel>
            <h2 className="shead">The 1am stage plot problem.</h2>
            <p className="lede dim" style={{ marginTop: 16 }}>It's 1am. Load-in's at 8. The input list finally arrives — 19 channels and three "???s" — and you're in PowerPoint drawing rectangles. The mic choices are 90% automatic anyway. The layout follows conventions everyone knows. The channel sheet is formatting. None of it's hard. It's just tedious. So I automated the tedious part.</p>

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
                <a href="https://stageplot.stevepeeleii.com/" target="_blank" rel="noreferrer" className="btn">
                  Open StagePlot AI <ArrowUpRight size={14} />
                </a>
              </div>
              <p className="mono" style={{ marginTop: 18, color: "var(--muted)" }}>Built by SPIIX.</p>
              <p style={{ marginTop: 16 }}>
                <Link to="/hacking/$appSlug/changelog" params={{ appSlug: "stageplot-ai" }} className="go" style={{ color: "var(--kin)", fontFamily: "'JetBrains Mono',monospace", fontSize: 10, textTransform: "uppercase", letterSpacing: ".08em", textDecoration: "none" }}>
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
