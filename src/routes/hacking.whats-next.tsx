import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Circle, CircleDot, CheckCircle2 } from "lucide-react";
import { CtShell, CtHero, CtLabel } from "@/components/ct-shell";
import { ValidationBeat } from "@/components/validation-modal";
import { LinearDashboard } from "@/components/linear-dashboard";
import { buildQueue } from "@/data/hacking";

const title = "What's Next — The Build Queue | Steve Peele II";
const description =
  "Steve Peele II's build queue: what shipped, what's next, and what's in line. A living list of small apps and experiments.";

export const Route = createFileRoute("/hacking/whats-next")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://stevepeeleii.com/hacking/whats-next" }],
  }),
  component: WhatsNextPage,
});

const statusMeta = {
  shipped: { icon: CheckCircle2, color: "#34d399", label: "Shipped" },
  next: { icon: CircleDot, color: "#fbbf24", label: "Up next" },
  queued: { icon: Circle, color: "#808080", label: "Queued" },
} as const;

function WhatsNextPage() {
  return (
    <CtShell crumbs={[{ label: "Home", to: "/" }, { label: "Building", to: "/hacking" }, { label: "Up next" }]}>
      <main>
        <CtHero
          file="05 / Building — What's next"
          title={
            <>
              The <span>build queue.</span>
            </>
          }
          lede="A living list, in order. Shipped things stay on the record; the rest is the plan until the plan changes."
        />

        <section className="blk first">
          <div className="wrap">
            <CtLabel n="01">The queue</CtLabel>
            <div className="rows rev">
              {buildQueue.map((item, i) => {
                const meta = statusMeta[item.status];
                const Icon = meta.icon;
                return (
                  <div key={item.name} className="row">
                    <span className="rk" style={{ display: "inline-flex", alignItems: "center", gap: 7, color: meta.color }}>
                      <Icon size={13} aria-hidden="true" />
                      <span style={{ color: "var(--muted)" }}>
                        {String(i + 1).padStart(2, "0")} · {meta.label}
                        {item.shippedDate ? ` · ${item.shippedDate}` : ""}
                      </span>
                    </span>
                    <span>
                      <h3>{item.name}</h3>
                      <p>{item.description}</p>
                    </span>
                    {item.url ? (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Open ${item.name}`}
                        className="rgo"
                      >
                        <ArrowUpRight size={15} aria-hidden="true" />
                      </a>
                    ) : (
                      <span className="rgo"></span>
                    )}
                  </div>
                );
              })}
            </div>
            <p className="mono" style={{ marginTop: 36, textAlign: "center", color: "var(--muted)" }}>
              Build tiny, ship fast, quit faster. — the operating principle
            </p>
          </div>
        </section>

        <section className="blk">
          <div className="wrap">
            <CtLabel n="02">Live board</CtLabel>
            <h2 className="shead">
              The <span>Linear board.</span>
            </h2>
            <p className="lede dim">
              The full tracker behind the queue — every project, every open issue.
            </p>
            <div className="legacy" style={{ marginTop: 36 }}>
              <LinearDashboard />
            </div>
          </div>
        </section>
        <ValidationBeat />
      </main>
    </CtShell>
  );
}
