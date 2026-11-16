import { createFileRoute, Link } from "@tanstack/react-router";
import { FlaskConical } from "lucide-react";
import { BuildingShell, BuildingHero } from "@/components/building-shell";
import { ValidationBeat } from "@/components/validation-modal";

const title = "Nexus | Steve Peele II";
const description = "Nexus is on the workbench. There is no public build yet.";

export const Route = createFileRoute("/hacking/nexus")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex, nofollow" },
    ],
    links: [{ rel: "canonical", href: "https://stevepeeleii.com/hacking/nexus" }],
  }),
  component: NexusPage,
});

function NexusPage() {
  return (
    <BuildingShell crumbs={[{ label: "Home", to: "/" }, { label: "Building", to: "/hacking" }, { label: "Nexus" }]}>
      <main>
        <BuildingHero
          file="05 / Building — Nexus"
          title={
            <>
              Ne<span>xus.</span>
            </>
          }
        />

        <section className="blk first">
          <div className="wrap">
            <div className="ecard rev" style={{ textAlign: "center" }}>
              <FlaskConical size={36} color="#FF4D00" aria-hidden="true" style={{ margin: "0 auto" }} />
              <h3>Still on the workbench.</h3>
              <p style={{ maxWidth: 560, margin: "10px auto 0" }}>
                Nothing public to try yet. The{" "}
                <Link to="/hacking/whats-next" style={{ color: "var(--text)", textDecoration: "underline", textUnderlineOffset: 4 }}>
                  build queue
                </Link>{" "}
                shows where it sits.
              </p>
            </div>
          </div>
        </section>
        <ValidationBeat />
      </main>
    </BuildingShell>
  );
}
