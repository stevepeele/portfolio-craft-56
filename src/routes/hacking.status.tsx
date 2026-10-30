import { createFileRoute } from "@tanstack/react-router";
import { CtShell, CtHero, CtLabel } from "@/components/ct-shell";
import { ValidationBeat } from "@/components/validation-modal";
import { LinearDashboard } from "@/components/linear-dashboard";
import { statusLog } from "@/data/hacking";

const title = "Status — Build Log | Steve Peele II";
const description =
  "What Steve Peele II has been building: a running log of launches, experiments, and what's shipping from the workbench.";

export const Route = createFileRoute("/hacking/status")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://stevepeeleii.com/hacking/status" }],
  }),
  component: StatusPage,
});

function StatusPage() {
  return (
    <CtShell crumbs={[{ label: "Home", to: "/" }, { label: "Building", to: "/hacking" }, { label: "Build log" }]}>
      <main>
        <CtHero
          file="05 / Building — Build log"
          title={
            <>
              The <span>build log.</span>
            </>
          }
          lede="What's shipped, in order. No roadmap theater — just the record."
        />

        <section className="blk first">
          <div className="wrap">
            <CtLabel n="01">Live board</CtLabel>
            <h2 className="shead">
              The <span>Linear board.</span>
            </h2>
            <p className="lede dim">
              Every website and dev project, straight from the tracker. Click any issue to open it
              in Linear.
            </p>
            <div className="legacy" style={{ marginTop: 36 }}>
              <LinearDashboard />
            </div>
          </div>
        </section>

        <section className="blk">
          <div className="wrap">
            <CtLabel n="02">Build log</CtLabel>
            <div className="rows rev">
              {statusLog.map((entry) => (
                <div key={`${entry.date}-${entry.title}`} className="row">
                  <span className="rk">{entry.date}</span>
                  <span>
                    <h3>{entry.title}</h3>
                    <p>{entry.detail}</p>
                  </span>
                  <span className="rgo"></span>
                </div>
              ))}
            </div>
          </div>
        </section>
        <ValidationBeat />
      </main>
    </CtShell>
  );
}
