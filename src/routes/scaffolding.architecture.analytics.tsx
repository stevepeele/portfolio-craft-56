import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const title = "Scaffolding — Analytics Wiring | Steve Peele II";
const description = "Private reference: analytics wiring on stevepeeleii.com — Segment, HubSpot, PostHog. Unlisted.";

export const Route = createFileRoute("/scaffolding/architecture/analytics")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: title },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "https://stevepeeleii.com/scaffolding/architecture/analytics" }],
  }),
  component: AnalyticsPage,
});

function CodeBlock({ children }: { children: string }) {
  return (
    <div className="panel overflow-x-auto p-5">
      <pre className="font-mono text-xs leading-relaxed text-foreground/90 whitespace-pre">{children}</pre>
    </div>
  );
}

const SEGMENT_LIFECYCLE = `  __root.tsx mounts
        │
        ▼
  initSegment()          ← injects Segment snippet once (src/lib/segment.ts)
  segmentPage()          ← fires page() on initial load
        │
  router subscribe (client nav)
        │
        ▼
  segmentPage()          ← fires page() on every route change
        │
  components call track("CTA Clicked", { cta, location })
        │                  ← src/lib/segment.ts track()
        ▼
  window.analytics.track → Segment → destinations`;

const EVENT_TABLE: { event: string; where: string; props: string }[] = [
  { event: "page", where: "__root.tsx (all routes)", props: "auto: path, url, title, referrer, canonical" },
  { event: "CTA Clicked", where: "components via track()", props: "cta, location" },
  { event: "Signal email capture", where: "SPIIX signal form", props: "form location" },
];

function AnalyticsPage() {
  return (
    <div className="min-h-screen overflow-x-clip">
      <SiteHeader />
      <main>
        <section className="hero-surface border-b border-border/60">
          <div className="mx-auto max-w-4xl px-5 py-20">
            <Link to="/scaffolding/architecture" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="size-4" /> Architecture
            </Link>
            <p className="eyebrow mt-8">Scaffolding / Architecture / Analytics</p>
            <h1 className="mt-5 text-4xl font-bold sm:text-5xl">
              Analytics <span className="text-gradient">wiring.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              How Segment, HubSpot, and PostHog are wired into stevepeeleii.com. Unlisted and noindex.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl space-y-6 px-5 py-20">
          <p className="eyebrow">01</p>
          <h2 className="text-3xl font-bold">Segment <span className="text-gradient">lifecycle.</span></h2>
          <CodeBlock>{SEGMENT_LIFECYCLE}</CodeBlock>
          <div className="panel space-y-3 p-6 text-sm text-muted-foreground">
            <p><span className="font-semibold text-foreground">Write key:</span> hardcoded in <code>src/lib/segment.ts</code> (client-safe by design — Segment keys are public).</p>
            <p><span className="font-semibold text-foreground">Rule:</span> analytics must never break the site — every call is wrapped in try/catch.</p>
            <p><span className="font-semibold text-foreground">Build standard:</span> Segment is installed on every build, no exceptions.</p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl space-y-6 px-5 py-20">
          <p className="eyebrow">02</p>
          <h2 className="text-3xl font-bold">Tracked <span className="text-gradient">events.</span></h2>
          <div className="panel overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border/60 text-xs uppercase tracking-widest text-muted-foreground">
                  <th className="px-4 py-3">Event</th>
                  <th className="px-4 py-3">Fired from</th>
                  <th className="px-4 py-3">Properties</th>
                </tr>
              </thead>
              <tbody>
                {EVENT_TABLE.map((r) => (
                  <tr key={r.event} className="border-b border-border/60 align-top last:border-0">
                    <td className="whitespace-nowrap px-4 py-3 font-mono text-xs font-semibold">{r.event}</td>
                    <td className="px-4 py-3 text-muted-foreground">{r.where}</td>
                    <td className="px-4 py-3 text-muted-foreground">{r.props}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mx-auto max-w-6xl space-y-6 px-5 py-20">
          <p className="eyebrow">03</p>
          <h2 className="text-3xl font-bold">HubSpot <span className="text-gradient">chat.</span></h2>
          <div className="panel space-y-3 p-6 text-sm text-muted-foreground">
            <p><span className="font-semibold text-foreground">Portal:</span> 22009185 (Pan Labs). Script <code>https://js.hs-scripts.com/22009185.js</code> injected in <code>__root.tsx</code>.</p>
            <p><span className="font-semibold text-foreground">Flows:</span> live chat only — no scripted branches, no AI agents, zero personalization tokens (standing order).</p>
            <p><span className="font-semibold text-foreground">Management:</span> cron <code>hubspot-chat-watch</code> replies as Steve's assistant using on-site facts; tricky threads escalate to him.</p>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-5 pb-24">
          <p className="eyebrow">04</p>
          <h2 className="text-3xl font-bold">PostHog <span className="text-gradient">(deferred).</span></h2>
          <div className="panel space-y-3 p-6 text-sm text-muted-foreground">
            <p>Instrumented in <code>__root.tsx</code> via <code>posthog-js</code> but <span className="text-amber-400">inactive</span>: <code>capture_pageview</code> and <code>autocapture</code> are off, and everything is skipped unless <code>VITE_POSTHOG_KEY</code> is set in Vercel env.</p>
            <p>To activate: set <code>VITE_POSTHOG_KEY</code> (+ optional <code>VITE_POSTHOG_HOST</code>) in the Vercel project env and redeploy.</p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
