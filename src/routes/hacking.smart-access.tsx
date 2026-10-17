import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, FlaskConical } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
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
    <div className="min-h-screen overflow-x-clip">
      <SiteHeader />
      <main>
        <section className="hero-surface border-b border-border/60">
          <div className="mx-auto max-w-4xl px-5 py-20">
            <Link to="/hacking" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="size-4" /> Building
            </Link>
            <p className="eyebrow mt-8">Building / Smart Access</p>
            <h1 className="mt-5 text-4xl font-bold sm:text-5xl">
              Smart <span className="text-gradient">Access.</span>
            </h1>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-5 py-20 text-center">
          <FlaskConical className="mx-auto size-10 text-muted-foreground" aria-hidden="true" />
          <h2 className="mt-6 text-2xl font-bold">Still on the workbench.</h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            This one's taking shape — details coming soon. Check the{" "}
            <Link to="/hacking/whats-next" className="text-foreground underline underline-offset-4">
              build queue
            </Link>{" "}
            to see where it sits.
          </p>
        </section>
        <ValidationBeat />
      </main>
      <SiteFooter />
    </div>
  );
}
