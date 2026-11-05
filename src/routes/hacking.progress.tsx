import { createFileRoute } from "@tanstack/react-router";
import { CtShell, CtHero } from "@/components/ct-shell";
import { ValidationBeat, ValidationAutoOpen } from "@/components/validation-modal";
import { LinearDashboard } from "@/components/linear-dashboard";

const title = "Progress — Live Build Board | Steve Peele II";
const description =
  "Live build board for Steve Peele II's building projects: what's live, what's building, what's queued.";

export const Route = createFileRoute("/hacking/progress")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://stevepeeleii.com/hacking/progress" }],
  }),
  component: ProgressPage,
});

function ProgressPage() {
  return (
    <CtShell crumbs={[{ label: "Home", to: "/" }, { label: "Building", to: "/hacking" }, { label: "Live board" }]}>
      <main>
        <CtHero
          file="05 / Building — Live board"
          title={
            <>
              The <span>build board.</span>
            </>
          }
          lede="Every project, one glance. Synced straight from Linear."
        />

        <section className="blk first">
          <div className="wrap">
            <div className="legacy">
              <LinearDashboard />
            </div>
          </div>
        </section>
        <ValidationBeat />
        <ValidationAutoOpen />
      </main>
    </CtShell>
  );
}
