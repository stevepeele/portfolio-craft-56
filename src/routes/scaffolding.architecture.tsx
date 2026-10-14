import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const title = "Scaffolding — Main Site Infrastructure | Steve Peele II";
const description =
  "Private reference: stevepeeleii.com infrastructure — stack, scripts, data flows, deploys, env vars, DNS. Unlisted.";

export const Route = createFileRoute("/scaffolding/architecture")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "https://stevepeeleii.com/scaffolding/architecture" }],
  }),
  component: ArchitecturePage,
});

function SectionHead({ n, children, sub }: { n: string; children: React.ReactNode; sub?: string }) {
  return (
    <div>
      <p className="eyebrow">Scaffolding / {n}</p>
      <h2 className="mt-4 text-3xl font-bold sm:text-4xl">{children}</h2>
      {sub ? <p className="mt-4 max-w-3xl text-muted-foreground">{sub}</p> : null}
    </div>
  );
}

function CodeBlock({ children }: { children: string }) {
  return (
    <div className="panel overflow-x-auto p-5">
      <pre className="font-mono text-xs leading-relaxed text-foreground/90 whitespace-pre">{children}</pre>
    </div>
  );
}

const STACK_DIAGRAM = `┌─────────────────────────────────────────────────────────────────┐
│                        stevepeeleii.com                            │
│                    (TanStack Start · SSR)                          │
└──────────────┬──────────────────────────────┬─────────────────────┘
               │                              │
     ┌─────────▼──────────┐        ┌──────────▼──────────┐
     │   Sanity CMS       │        │   Supabase          │
     │   k74pcbpp         │        │   dardo             │
     │   dataset: prod    │        │   sddcdfpgbgawoywup │
     │   /studio (embed)  │        │   auth + lead data  │
     └────────────────────┘        └─────────────────────┘
               │                              │
     ┌─────────▼──────────────────────────────▼──────────┐
     │              Vercel (stevepeeles-projects)         │
     │   project: stevepeeleii · prj_FJURyGFI1tDorfFPbG  │
     │   GitHub stevepeele/portfolio-craft-56 → auto     │
     └──────────────────────────────────────────────────┘`;

const DEPLOY_DIAGRAM = `  stevepeele/portfolio-craft-56 (GitHub, main)
                    │  push
                    ▼
  ┌──────────────────────────────────────┐
  │  Vercel — GitHub integration          │  (connected 2026-10-14)
  │  auto-deploy on every push to main    │
  └──────────────┬───────────────────────┘
                 │  build: bun run build
                 │  output: .vercel/output
                 ▼
  ┌──────────────────────────────────────┐
  │  Production deployment                │
  │  stevepeeleii.com · www · hi          │
  └──────────────────────────────────────┘

  Manual path: Vercel dashboard → Deployments → "…" → Redeploy
  (Redeploy rebuilds the SAME commit — it does not pull latest.
   Push a commit to deploy new code.)`;

const LEAD_FLOW = `  Visitor fills form (/contact, /spiix/signal, /growth-ladders)
                    │
        ┌───────────┴───────────┐
        ▼                       ▼
  formsubmit.co            Supabase (dardo)
  → steve@stevepeeleii.com  → lead tables
  (SPIIX signal)            (growth-ladders signups)`;

const BLOG_FLOW = `  Steve edits at /studio (Sanity Studio embedded, /studio/$ wildcard)
                    │  (CORS: stevepeeleii.com + www, credentials allowed)
                    ▼
  Sanity API — project k74pcbpp, dataset production
                    │  (GROQ queries, CDN images)
                    ▼
  Site fetches at request time (SSR) → /blog, /blog/:slug`;

const ANALYTICS_FLOW = `  Page view / CTA click / form interaction
                    │
        ┌───────────┼───────────┐
        ▼           ▼           ▼
     Segment     HubSpot     PostHog
  (hardcoded   (portal     (deferred —
   write key,   22009185,   active only if
   __root.tsx)  chat+CRM)   VITE_POSTHOG_KEY set)`;

const SCRIPT_ROWS: { name: string; where: string; what: string; status: string }[] = [
  {
    name: "Segment",
    where: "src/lib/segment.ts → __root.tsx (initSegment + segmentPage on nav)",
    what: "Sitewide analytics. Hardcoded write key. Page tracking on every client-side navigation; track() for CTA events.",
    status: "Live",
  },
  {
    name: "HubSpot",
    where: "__root.tsx line ~224 — js.hs-scripts.com/22009185.js",
    what: "Portal 22009185 (Pan Labs). Live Chat flows + CRM. Chat management cron replies as Steve's assistant.",
    status: "Live",
  },
  {
    name: "PostHog",
    where: "__root.tsx — posthog-js, gated on VITE_POSTHOG_KEY",
    what: "Product analytics. capture_pageview + autocapture OFF; manual trackPageview only. Skipped entirely until key is set.",
    status: "Deferred",
  },
  {
    name: "formsubmit.co",
    where: "src/lib/spiix-leads.ts, src/lib/growth-ladders-leads.ts, /spiix/signal route",
    what: "Lead delivery. SPIIX 'Get the signal' form emails steve@stevepeeleii.com directly. Growth-ladders signups → Supabase + FormSubmit.",
    status: "Live",
  },
  {
    name: "Sanity CDN",
    where: "Sanity client image URLs",
    what: "Blog/content images served from Sanity's CDN (cdn.sanity.io).",
    status: "Live",
  },
];

const ENV_ROWS: { name: string; scope: string; where: string }[] = [
  { name: "VITE_SUPABASE_URL", scope: "client", where: "Vercel project env (production/preview/dev)" },
  { name: "VITE_SUPABASE_PUBLISHABLE_KEY", scope: "client", where: "Vercel project env" },
  { name: "SUPABASE_SERVICE_ROLE_KEY", scope: "server-only", where: "Vercel project env — never in client bundle" },
  { name: "VITE_SANITY_PROJECT_ID", scope: "client", where: "Vercel project env (k74pcbpp)" },
  { name: "VITE_SANITY_DATASET", scope: "client", where: "Vercel project env (production)" },
  { name: "VITE_SANITY_API_VERSION", scope: "client", where: "Vercel project env" },
  { name: "VITE_POSTHOG_KEY", scope: "client", where: "Vercel project env — unset = PostHog skipped" },
  { name: "VITE_POSTHOG_HOST", scope: "client", where: "Vercel project env (defaults to us.i.posthog.com)" },
];

const DNS_ROWS: { host: string; type: string; value: string; registrar: string }[] = [
  { host: "@", type: "A", value: "76.76.21.21", registrar: "GoDaddy (stevepeeleii.com zone)" },
  { host: "www", type: "CNAME", value: "cname.vercel-dns.com", registrar: "GoDaddy" },
  { host: "hi", type: "CNAME", value: "cname.vercel-dns.com", registrar: "GoDaddy" },
  { host: "signalsbyspii.com @", type: "302 redirect", value: "→ https://stevepeeleii.com/spiix", registrar: "IONOS (forwarding rule)" },
];

const REDIRECT_ROWS: { source: string; dest: string; why: string }[] = [
  { source: "/writing, /writing/*", dest: "/blog, /blog/*", why: "Fold /Writing into /Blog (PLX-332)" },
  { source: "/spiix/monolith", dest: "/growth-ladders", why: "Monolith retired 2026-10-11" },
  { source: "*.vercel.app (old URLs)", dest: "stevepeeleii.com (path preserved)", why: "Post-migration canonicalization (PLX-329)" },
  { source: "/services", dest: "/spiix/compare", why: "Services consolidated" },
  { source: "/experience, /about, /cv, /recommendations", dest: "canonical equivalents", why: "Legacy URL cleanup" },
];

function ArchitecturePage() {
  return (
    <div className="min-h-screen overflow-x-clip">
      <SiteHeader />
      <main>
        <section className="hero-surface border-b border-border/60">
          <div className="mx-auto max-w-4xl px-5 py-20">
            <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="size-4" /> Home
            </Link>
            <p className="eyebrow mt-8">Scaffolding / Architecture</p>
            <h1 className="mt-5 text-4xl font-bold sm:text-5xl">
              Main site <span className="text-gradient">infrastructure.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              The single source of truth for how stevepeeleii.com works — stack, scripts,
              data flows, deploys, env vars, DNS. Unlisted and noindex; nothing links here.
            </p>
            <p className="mt-4 text-xs text-muted-foreground">
              Rebuilt 2026-10-14 after the Lovable → Vercel migration (PLX-335) · prior version generated 2026-10-12
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl space-y-6 px-5 py-20">
          <SectionHead n="01" sub="TanStack Start SSR on Vercel. Migrated off Lovable 2026-10-14 after the 00:30 EDT outage (corrupted hacking.ts → HTTP 500).">
            Stack <span className="text-gradient">overview.</span>
          </SectionHead>
          <CodeBlock>{STACK_DIAGRAM}</CodeBlock>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="panel p-5">
              <p className="font-semibold">Framework</p>
              <p className="mt-2 text-sm text-muted-foreground">TanStack Start — SSR via Nitro with the Vercel preset. File-based routes in <code>src/routes/</code>.</p>
            </div>
            <div className="panel p-5">
              <p className="font-semibold">Hosting</p>
              <p className="mt-2 text-sm text-muted-foreground">Vercel project <code>stevepeeleii</code> (<code>prj_FJURyGFI1tDorfFPbGab4PVTRUwO</code>), team <code>stevepeeles-projects</code>.</p>
            </div>
            <div className="panel p-5">
              <p className="font-semibold">Source</p>
              <p className="mt-2 text-sm text-muted-foreground">GitHub <code>stevepeele/portfolio-craft-56</code>, branch <code>main</code>. Auto-deploy connected 2026-10-14.</p>
            </div>
            <div className="panel p-5">
              <p className="font-semibold">CMS</p>
              <p className="mt-2 text-sm text-muted-foreground">Sanity project <code>k74pcbpp</code>, dataset <code>production</code>. Studio embedded at <code>/studio</code> (wildcard <code>/studio/$</code>).</p>
            </div>
            <div className="panel p-5">
              <p className="font-semibold">Database</p>
              <p className="mt-2 text-sm text-muted-foreground">Supabase project <code>dardo</code> (<code>sddcdfpgbgawoywupmvz</code>, us-east-1). Client in <code>src/integrations/supabase/</code>.</p>
            </div>
            <div className="panel p-5">
              <p className="font-semibold">Package manager</p>
              <p className="mt-2 text-sm text-muted-foreground">Bun. Build: <code>bun run build</code> → <code>.vercel/output</code>.</p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl space-y-6 px-5 py-20">
          <SectionHead n="02" sub="Every third-party script on the site: where it's initialized, what it does, and whether it's live. Detail: /scaffolding/architecture/analytics.">
            Script <span className="text-gradient">connections.</span>
          </SectionHead>
          <div className="panel overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border/60 text-xs uppercase tracking-widest text-muted-foreground">
                  <th className="px-4 py-3">Script</th>
                  <th className="px-4 py-3">Initialized</th>
                  <th className="px-4 py-3">What it does</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {SCRIPT_ROWS.map((r) => (
                  <tr key={r.name} className="border-b border-border/60 align-top last:border-0">
                    <td className="whitespace-nowrap px-4 py-3 font-semibold">{r.name}</td>
                    <td className="px-4 py-3 text-muted-foreground"><code className="text-xs">{r.where}</code></td>
                    <td className="px-4 py-3 text-muted-foreground">{r.what}</td>
                    <td className="px-4 py-3">
                      <span className={r.status === "Live" ? "text-emerald-400" : "text-amber-400"}>{r.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Link
            to="/scaffolding/architecture/analytics"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            Deep dive: analytics wiring <ArrowUpRight className="size-3.5" />
          </Link>
        </section>

        <section className="mx-auto max-w-6xl space-y-6 px-5 py-20">
          <SectionHead n="03" sub="How data moves through the site. Detail: /scaffolding/architecture/data-flows.">
            Data <span className="text-gradient">flows.</span>
          </SectionHead>
          <div className="grid gap-6 lg:grid-cols-3">
            <div>
              <p className="mb-3 font-semibold">Lead capture</p>
              <CodeBlock>{LEAD_FLOW}</CodeBlock>
            </div>
            <div>
              <p className="mb-3 font-semibold">Blog / content</p>
              <CodeBlock>{BLOG_FLOW}</CodeBlock>
            </div>
            <div>
              <p className="mb-3 font-semibold">Analytics fan-out</p>
              <CodeBlock>{ANALYTICS_FLOW}</CodeBlock>
            </div>
          </div>
          <Link
            to="/scaffolding/architecture/data-flows"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            Deep dive: data flows <ArrowUpRight className="size-3.5" />
          </Link>
        </section>

        <section className="mx-auto max-w-6xl space-y-6 px-5 py-20">
          <SectionHead n="04" sub="GitHub → Vercel. Auto-deploy connected 2026-10-14; before that, deploys were manual via dashboard.">
            Deployment <span className="text-gradient">pipeline.</span>
          </SectionHead>
          <CodeBlock>{DEPLOY_DIAGRAM}</CodeBlock>
          <div className="panel space-y-3 p-6 text-sm text-muted-foreground">
            <p><span className="font-semibold text-foreground">Normal flow:</span> push to <code>main</code> → Vercel builds → production. No approval needed (standing).</p>
            <p><span className="font-semibold text-foreground">Rollback:</span> Vercel dashboard → Deployments → promote a previous deployment.</p>
            <p><span className="font-semibold text-foreground">DNS rollback:</span> GoDaddy A records back to <code>185.158.133.1</code> (old Lovable IPs). MX untouched.</p>
            <p><span className="font-semibold text-foreground">Redirects live in:</span> <code>vercel.json</code> (see section 07). Changes require a deploy.</p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl space-y-6 px-5 py-20">
          <SectionHead n="05" sub="Names only — values live in Vercel project env (production / preview / dev). Never in the repo, never in chat.">
            Environment <span className="text-gradient">variables.</span>
          </SectionHead>
          <div className="panel overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border/60 text-xs uppercase tracking-widest text-muted-foreground">
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Scope</th>
                  <th className="px-4 py-3">Where it's set</th>
                </tr>
              </thead>
              <tbody>
                {ENV_ROWS.map((r) => (
                  <tr key={r.name} className="border-b border-border/60 align-top last:border-0">
                    <td className="whitespace-nowrap px-4 py-3 font-mono text-xs font-semibold">{r.name}</td>
                    <td className="px-4 py-3 text-muted-foreground">{r.scope}</td>
                    <td className="px-4 py-3 text-muted-foreground">{r.where}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mx-auto max-w-6xl space-y-6 px-5 py-20">
          <SectionHead n="06" sub="Four domains. DNS flipped 2026-10-14 ~02:03 EDT as part of the migration.">
            Domains &amp; <span className="text-gradient">DNS.</span>
          </SectionHead>
          <div className="panel overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border/60 text-xs uppercase tracking-widest text-muted-foreground">
                  <th className="px-4 py-3">Host</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Value</th>
                  <th className="px-4 py-3">Registrar</th>
                </tr>
              </thead>
              <tbody>
                {DNS_ROWS.map((r) => (
                  <tr key={r.host} className="border-b border-border/60 align-top last:border-0">
                    <td className="whitespace-nowrap px-4 py-3 font-mono text-xs font-semibold">{r.host}</td>
                    <td className="px-4 py-3 text-muted-foreground">{r.type}</td>
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{r.value}</td>
                    <td className="px-4 py-3 text-muted-foreground">{r.registrar}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mx-auto max-w-6xl space-y-6 px-5 py-20">
          <SectionHead n="07" sub="Canonicalization rules in vercel.json. All 301 unless noted.">
            <span className="text-gradient">Redirects.</span>
          </SectionHead>
          <div className="panel overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border/60 text-xs uppercase tracking-widest text-muted-foreground">
                  <th className="px-4 py-3">Source</th>
                  <th className="px-4 py-3">Destination</th>
                  <th className="px-4 py-3">Why</th>
                </tr>
              </thead>
              <tbody>
                {REDIRECT_ROWS.map((r) => (
                  <tr key={r.source} className="border-b border-border/60 align-top last:border-0">
                    <td className="whitespace-nowrap px-4 py-3 font-mono text-xs">{r.source}</td>
                    <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-muted-foreground">{r.dest}</td>
                    <td className="px-4 py-3 text-muted-foreground">{r.why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mx-auto max-w-6xl space-y-6 px-5 py-20">
          <SectionHead n="08" sub="The commands and locations that keep this page truthful.">
            <span className="text-gradient">Runbook.</span>
          </SectionHead>
          <div className="panel space-y-6 p-6 sm:p-8">
            <div>
              <h3 className="font-display text-lg font-bold">Deploy</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Push to <code>main</code> — Vercel auto-deploys (connected 2026-10-14). Manual: Vercel dashboard
                → Deployments → "…" → Redeploy (rebuilds the same commit; push to ship new code).
              </p>
            </div>
            <div>
              <h3 className="font-display text-lg font-bold">Push code</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Plain <code>git push</code> does not work from the VM (no credentials). Push via the GitHub
                connector <code>push_files</code> API instead. Verify with <code>git fetch</code> +{" "}
                <code>git show origin/main:&lt;path&gt;</code>.
              </p>
            </div>
            <div>
              <h3 className="font-display text-lg font-bold">Publish a blog post</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Edit at <code>stevepeeleii.com/studio</code> (Sanity Studio). CORS origins{" "}
                <code>https://stevepeeleii.com</code> and <code>https://www.stevepeeleii.com</code> must allow
                credentials (set in sanity.io/manage → k74pcbpp → API → CORS Origins).
              </p>
            </div>
            <div>
              <h3 className="font-display text-lg font-bold">Secrets</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Vercel project env only. Supabase PAT in Secure Vault. Never in the repo, never in chat,
                never in this page.
              </p>
            </div>
            <div>
              <h3 className="font-display text-lg font-bold">Key references</h3>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                <li>Linear: P-PLX-8 (Main Site) · PLX-325 (migration) · PLX-335 (this rebuild)</li>
                <li>Sanity: project <code>k74pcbpp</code>, dataset <code>production</code></li>
                <li>Supabase: <code>sddcdfpgbgawoywupmvz</code> (dardo, us-east-1)</li>
                <li>HubSpot: portal <code>22009185</code> (Pan Labs)</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-5 pb-24">
          <SectionHead n="09" sub="Assumptions and limits baked into the diagrams above.">
            Notes &amp; <span className="text-gradient">caveats.</span>
          </SectionHead>
          <ul className="mt-6 list-disc space-y-2 pl-5 text-muted-foreground">
            <li>Lovable is dead for this site — no Lovable API, no Lovable deploys, no Lovable sync. Any doc still referencing it is stale.</li>
            <li>PostHog is instrumented but dormant until <code>VITE_POSTHOG_KEY</code> is set in Vercel env.</li>
            <li>The AI quiz / SPIIX pathway recommender (ai.gateway.lovable.dev) was retired with the migration — quiz degrades gracefully.</li>
            <li>Binary assets (og-image.jpg) can't push via the GitHub connector API — upload via GitHub web UI or Vercel dashboard.</li>
            <li><code>package-lock.json</code> is excluded from connector pushes (size limit) — npm resolves from package.json.</li>
          </ul>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
