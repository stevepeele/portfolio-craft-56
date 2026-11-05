import { createFileRoute, Link } from "@tanstack/react-router";
import { FlaskConical } from "lucide-react";
import { CtShell, CtHero } from "@/components/ct-shell";
import { ValidationBeat } from "@/components/validation-modal";

const title = "Smart Access — Coming Soon | Steve Peele II";
const description = "Smart Access: something new on Steve Peele II's workbench. Details coming soon.";

export const Route = createFileRoute("/hacking/smart-access")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://stevepeeleii.com/hacking/smart-access" }],
  }),
  component: SmartAccessPage,
});

function SmartAccessPage() {
  return (
    <CtShell crumbs={[{ label: "Home", to: "/" }, { label: "Building", to: "/hacking" }, { label: "Smart Access" }]}>
      <main>
        <CtHero
          file="05 / Building — Smart Access"
          title={
            <>
              Smart <span>Access.</span>
            </>
          }
        />

        <section className="blk first">
          <div className="wrap">
            <div className="ecard rev" style={{ textAlign: "center" }}>
              <FlaskConical size={36} color="#FF4D00" aria-hidden="true" style={{ margin: "0 auto" }} />
              <h3>Still on the workbench.</h3>
              <p style={{ maxWidth: 560, margin: "10px auto 0" }}>
                This one's taking shape — details coming soon. Check the{" "}
                <Link to="/hacking/whats-next" style={{ color: "var(--text)", textDecoration: "underline", textUnderlineOffset: 4 }}>
                  build queue
                </Link>{" "}
                to see where it sits.
              </p>
            </div>
          </div>
        </section>
        <ValidationBeat />
      </main>
    </CtShell>
  );
}
