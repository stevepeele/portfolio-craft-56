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
  initSegment()            ← injects Segment snippet once (src/lib/segment.ts)
  segmentPage()            ← fires page() on initial load
  useSiteAnalytics(path)   ← behavioral hooks (src/lib/site-analytics.ts)
        │
  router.history.subscribe (client nav)
        │
        ▼
  segmentPage()            ← fires page() on every route change
  trackPageview()          ← PostHog pageview (no-ops unless key set)
        │
  components call track("CTA Clicked", { cta, location })
        │                    ← src/lib/segment.ts track()
        ▼
  window.analytics.track → Segment → workspace destinations`;

const EVENT_TABLE: { event: string; where: string; destination: string }[] = [
  {
    event: "page",
    where: "__root.tsx — segmentPage() on mount + every client-side navigation (router.history.subscribe)",
    destination: "Segment → workspace destinations",
  },
  {
    event: "CTA Clicked",
    where: "Components via track() from src/lib/segment.ts (props: cta, location)",
    destination: "Segment → workspace destinations",
  },
  {
    event: "Engaged Visitor",
    where: "useSiteAnalytics — once per session when a visitor passes 2+ pages or 45+ active seconds (props: pages, seconds, path, visitor_type)",
    destination: "Segment → feeds the Slack lead-alert pipeline",
  },
  {
    event: "Scroll Depth Reached",
    where: "useSiteAnalytics — rAF-throttled scroll listener, thresholds 25 / 50 / 75 / 90% (props: depth, path)",
    destination: "Segment → workspace destinations",
  },
  {
    event: "Outbound Link Clicked",
    where: "useSiteAnalytics — delegated click listener; skips internal links, mailto:, tel: (props: url, text, location)",
    destination: "Segment → workspace destinations",
  },
  {
    event: "Page Engaged",
    where: "useSiteAnalytics — active-tab seconds counter, fires at 30 / 120s (props: seconds, path)",
    destination: "Segment → workspace destinations",
  },
  {
    event: "$pageview",
    where: "__root.tsx — trackPageview() on initial load + every client navigation",
    destination: "PostHog (deferred — skipped entirely unless VITE_POSTHOG_KEY is set)",
  },
  {
    event: "Lead submitted",
    where: "src/lib/spiix-leads.ts — /spiix/signal 'Get the signal' form, validated server-side",
    destination: "formsubmit.co → steve@stevepeeleii.com (direct email, no HubSpot) + Supabase (dardo) service-only record (one retry)",
  },
  {
    event: "Growth Ladders signup",
    where: "src/lib/growth-ladders-leads.ts + src/lib/growth-ladders.functions.ts — /growth-ladders signup/download form",
    destination: "Supabase (dardo) lead tables + FormSubmit backup email to steve@stevepeeleii.com",
  },
  {
    event: "Chat conversation",
    where: "HubSpot live chat widget on every page",
    destination: "HubSpot Conversations — portal 22009185 (Pan Labs)",
  },
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
            <p><span className="font-semibold text-foreground">Init:</span> <code>src/lib/segment.ts</code> exports <code>initSegment()</code> (injects the Segment snippet once), <code>segmentPage()</code> (fires <code>page()</code>), and <code>track()</code> (wraps <code>window.analytics.track</code>). Write key is hardcoded in the file — client-safe by design, not a secret.</p>
            <p><span className="font-semibold text-foreground">Wiring:</span> <code>__root.tsx</code> calls <code>initSegment()</code> + <code>segmentPage()</code> on mount and re-fires <code>segmentPage()</code> on every client-side navigation via <code>router.history.subscribe</code>. Behavioral hooks come from <code>useSiteAnalytics(pathname)</code> in <code>src/lib/site-analytics.ts</code>.</p>
            <p><span className="font-semibold text-foreground">Rule:</span> analytics must never break the site — every call is wrapped in try/catch and all listeners are passive/guarded.</p>
            <p><span className="font-semibold text-foreground">Build standard:</span> Segment is installed on every build, no exceptions.</p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl space-y-6 px-5 py-20">
          <p className="eyebrow">02</p>
          <h2 className="text-3xl font-bold">Event <span className="text-gradient">taxonomy.</span></h2>
          <p className="max-w-3xl text-sm text-muted-foreground">
            Every tracked event: where it fires and where the data lands. Segment is the primary pipeline;
            formsubmit.co and Supabase carry lead delivery; PostHog is dormant until its key is set.
          </p>
          <div className="panel overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border/60 text-xs uppercase tracking-widest text-muted-foreground">
                  <th className="px-4 py-3">Event</th>
                  <th className="px-4 py-3">Fired from</th>
                  <th className="px-4 py-3">Destination</th>
                </tr>
              </thead>
              <tbody>
                {EVENT_TABLE.map((r) => (
                  <tr key={r.event} className="border-b border-border/60 align-top last:border-0">
                    <td className="whitespace-nowrap px-4 py-3 font-mono text-xs font-semibold">{r.event}</td>
                    <td className="px-4 py-3 text-muted-foreground">{r.where}</td>
                    <td className="px-4 py-3 text-muted-foreground">{r.destination}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mx-auto max-w-6xl space-y-6 px-5 py-20">
          <p className="eyebrow">03</p>
          <h2 className="text-3xl font-bold">Integration <span className="text-gradient">notes.</span></h2>
          <div className="panel space-y-3 p-6 text-sm text-muted-foreground">
            <p><span className="font-semibold text-foreground">HubSpot:</span> portal <code>22009185</code> (Pan Labs). Script <code>https://js.hs-scripts.com/22009185.js</code> is injected in <code>__root.tsx</code> (id <code>hs-script-loader</code>, async + defer, appended to <code>document.body</code>).</p>
            <p><span className="font-semibold text-foreground">Flows:</span> live chat only — no scripted branches, no AI agents, zero personalization tokens (standing order). Conversations land in the HubSpot inbox; the <code>hubspot-chat-watch</code> cron replies as Steve&apos;s assistant using on-site facts, and tricky threads escalate to him.</p>
          </div>
          <div className="panel space-y-3 p-6 text-sm text-muted-foreground">
            <p><span className="font-semibold text-foreground">formsubmit.co:</span> the SPIIX &apos;Get the signal&apos; form at <code>/spiix/signal</code> is validated server-side in <code>src/lib/spiix-leads.ts</code>, then delivered via formsubmit.co JSON straight to <code>steve@stevepeeleii.com</code> — direct email, no HubSpot routing — plus a service-only submission record in Supabase (dardo) with one retry.</p>
            <p><span className="font-semibold text-foreground">Growth Ladders:</span> signups in <code>src/lib/growth-ladders-leads.ts</code> go to Supabase (dardo) lead tables first, with a FormSubmit backup email. Lead delivery must never delay reading access — the Monolith and downloads stay available even if delivery fails.</p>
          </div>
          <div className="panel space-y-3 p-6 text-sm text-muted-foreground">
            <p><span className="font-semibold text-foreground">Sanity CDN:</span> blog and content images are served from Sanity&apos;s CDN (<code>cdn.sanity.io</code>) via the Sanity client&apos;s image-URL builder — project <code>k74pcbpp</code>, dataset <code>production</code>. No image bytes live in the repo.</p>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-5 pb-24">
          <p className="eyebrow">04</p>
          <h2 className="text-3xl font-bold">PostHog <span className="text-gradient">(deferred).</span></h2>
          <div className="panel space-y-3 p-6 text-sm text-muted-foreground">
            <p>Instrumented in <code>__root.tsx</code> via <code>posthog-js</code> but <span className="text-amber-400">inactive</span>: <code>capture_pageview</code> and <code>autocapture</code> are off, and the module no-ops unless <code>VITE_POSTHOG_KEY</code> is set in the Vercel project env. <code>trackPageview()</code> is called on initial load and every client-side navigation, so activation needs no code change.</p>
            <p>To activate: set <code>VITE_POSTHOG_KEY</code> (+ optional <code>VITE_POSTHOG_HOST</code>, defaults to <code>https://us.i.posthog.com</code>) in the Vercel project env and redeploy.</p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
