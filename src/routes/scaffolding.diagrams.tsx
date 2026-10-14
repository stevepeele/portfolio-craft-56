import { createFileRoute } from "@tanstack/react-router";
import { ScaffoldingShell, SectionHead, CodeBlock, scaffoldingHead } from "@/components/scaffolding-shell";

const title = "Scaffolding — Diagrams | Steve Peele II";
const description =
  "Private reference: system topology, Supabase data map, deploy pipeline, and lead/analytics flows across the portfolio. Unlisted.";

export const Route = createFileRoute("/scaffolding/diagrams")({
  head: () => scaffoldingHead("/scaffolding/diagrams", title, description),
  component: DiagramsPage,
});

const PORTFOLIO_TOPOLOGY = `                          ┌─────────────────────────────┐
                          │      stevepeeleii.com       │
                          │   TanStack Start · Vercel   │
                          │  portfolio-craft-56 (main)  │
                          └──────┬──────────────┬───────┘
                                 │              │
              ┌──────────────────┘              └──────────────────┐
              │                                                   │
   ┌──────────▼──────────┐                           ┌───────────▼───────────┐
   │   Sanity CMS        │                           │   Supabase (dardo)    │
   │   k74pcbpp / prod   │                           │   sddcdfpgbgawoywup   │
   │   blog + content    │                           │   auth + lead tables  │
   └─────────────────────┘                           └───────────┬───────────┘
                                                                │
              ┌──────────────────┬──────────────┬────────────────┼───────────────┐
              │                  │              │                │               │
   ┌──────────▼───────┐ ┌────────▼────────┐ ┌───▼──────────┐ ┌──▼───────────┐ ┌─▼──────────────┐
   │ Mission Control  │ │ Local Growth Fix│ │  9 v2 apps   │ │    Vault     │ │ Sozo Loveland  │
   │ missioncontrol.  │ │  ops app        │ │ StagePlot AI │ │ vault.       │ │ sozo-loveland  │
   │ stevepeeleii.com │ │ (Vercel)        │ │ Profolio …   │ │ stevepeeleii │ │ (Vercel)       │
   └──────────────────┘ └─────────────────┘ │ GigSplit …   │ │ .com         │ └────────────────┘
                                           └──────────────┘ └────────────────┘
   Shared services (all properties): Segment analytics · Slack #deploys alerts
   · Linear (P-PLX-8 + per-app projects) · GitHub stevepeele`;

const SUPABASE_MAP = `  Supabase project "dardo" (sddcdfpgbgawoywupmvz, us-east-1)
  Free tier → 2-project limit → MULTIPLE APPS SHARE THIS PROJECT

  ┌──────────────────────────────────────────────────────────┐
  │ auth.users                                               │
  │  └─ Mission Control: steve@stevepeeleii.com only          │
  │  └─ per-app sign up/login (each v2 app ships auth)        │
  ├──────────────────────────────────────────────────────────┤
  │ lead tables                                              │
  │  ├─ growth-ladders signups (main site /growth-ladders)    │
  │  ├─ SPIIX signal submissions (service-only records)       │
  │  └─ per-app data (each app's own tables, same project)   │
  ├──────────────────────────────────────────────────────────┤
  │ service-only tables                                      │
  │  └─ AI access-denial state (SPIIX pathway recommender)    │
  │     — persists across restarts, no visitor data stored    │
  └──────────────────────────────────────────────────────────┘

  Client wiring: src/integrations/supabase/ (main site)
  Server keys: SUPABASE_SERVICE_ROLE_KEY — Vercel env, server-only, never in bundle`;

const DEPLOY_PIPELINE = `  MAIN SITE
  ─────────
  stevepeele/portfolio-craft-56 (GitHub, main)
      │ push  (via connector push_files API — plain git push has no creds on VM)
      ▼
  Vercel — GitHub integration (connected 2026-10-14)
      │ build: bun run build → .vercel/output
      ▼
  Production: stevepeeleii.com · www · hi

  APPS
  ────
  per-app GitHub repo (main) → Vercel project → auto-deploy on push
  (where connected; some apps deploy via Vercel dashboard)

  CAPS & GOTCHAS
  ──────────────
  • 402 api-deployments-free-per-day: 100 deploys/day cap — retry next day
  • Redeploy rebuilds the SAME commit — push to ship new code
  • Binary assets (og-image.jpg) can't push via connector API — use GitHub web UI
  • package-lock.json excluded from connector pushes (size limit)`;

const LEAD_FLOWS = `  /contact, /spiix/signal, /growth-ladders (visitor fills form)
                        │
            ┌───────────┴────────────┐
            ▼                        ▼
      formsubmit.co            Supabase (dardo)
      → steve@stevepeeleii.com  → lead tables
      (SPIIX "Get the signal")  (growth-ladders signups)

  NOTE: the HubSpot form/workflow path was killed by his "stop." (2026-10-09).
  Lead delivery is direct email + Supabase — no HubSpot routing.`;

const ANALYTICS_FANOUT = `  Page view / CTA click / form interaction
                    │
        ┌───────────┼───────────┐
        ▼           ▼           ▼
     Segment     HubSpot     PostHog
  (hardcoded   (portal     (deferred —
   write key,   22009185,   active only if
   __root.tsx)  chat+CRM)   VITE_POSTHOG_KEY set)

  Segment: initSegment + segmentPage on every client-side navigation
           track() on CTA events — see /scaffolding/architecture/analytics`;

const BLOG_FLOW = `  Steve edits at stevepeeleii.com/studio (Sanity Studio, /studio/$ wildcard)
      │  CORS: stevepeeleii.com + www.stevepeeleii.com, credentials allowed
      ▼
  Sanity API — project k74pcbpp, dataset production (GROQ, CDN images)
      │
      ▼
  Site fetches at request time (SSR) → /blog, /blog/:slug

  Every post: hero image + supporting visuals (his standing order).
  Posts end with "A note from the author" card + Related reading.`;

function DiagramsPage() {
  return (
    <ScaffoldingShell
      path="/scaffolding/diagrams"
      eyebrow="Scaffolding / Diagrams"
      title={
        <>
          How it all <span className="text-gradient">fits together.</span>
        </>
      }
      intro="Topology, data maps, pipelines, and flows across the portfolio. ASCII on purpose — readable in any terminal, version-controlled like code."
      updated="2026-10-14"
    >
      <section className="space-y-6">
        <SectionHead n="01" sub="Main site, apps, shared backend, and shared services in one view.">
          Portfolio <span className="text-gradient">topology.</span>
        </SectionHead>
        <CodeBlock>{PORTFOLIO_TOPOLOGY}</CodeBlock>
      </section>

      <section className="space-y-6">
        <SectionHead n="02" sub="One Supabase project backs many apps — the free-tier 2-project limit made sharing the architecture.">
          Supabase <span className="text-gradient">data map.</span>
        </SectionHead>
        <CodeBlock>{SUPABASE_MAP}</CodeBlock>
      </section>

      <section className="space-y-6">
        <SectionHead n="03" sub="GitHub → Vercel for the main site and every app.">
          Deploy <span className="text-gradient">pipeline.</span>
        </SectionHead>
        <CodeBlock>{DEPLOY_PIPELINE}</CodeBlock>
      </section>

      <section className="space-y-6">
        <SectionHead n="04" sub="Where visitor data goes when someone reaches out.">
          Lead capture <span className="text-gradient">flows.</span>
        </SectionHead>
        <CodeBlock>{LEAD_FLOWS}</CodeBlock>
      </section>

      <section className="space-y-6">
        <SectionHead n="05" sub="Every tracked event fans out to three destinations.">
          Analytics <span className="text-gradient">fan-out.</span>
        </SectionHead>
        <CodeBlock>{ANALYTICS_FANOUT}</CodeBlock>
      </section>

      <section className="space-y-6">
        <SectionHead n="06" sub="Sanity Studio → API → SSR pages.">
          Blog <span className="text-gradient">publishing flow.</span>
        </SectionHead>
        <CodeBlock>{BLOG_FLOW}</CodeBlock>
      </section>
    </ScaffoldingShell>
  );
}
