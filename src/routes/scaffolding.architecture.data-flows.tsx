import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const title = "Scaffolding — Data Flows | Steve Peele II";
const description = "Private reference: data flows on stevepeeleii.com — leads, blog, analytics, chat. Unlisted.";

export const Route = createFileRoute("/scaffolding/architecture/data-flows")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: title },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "https://stevepeeleii.com/scaffolding/architecture/data-flows" }],
  }),
  component: DataFlowsPage,
});

function CodeBlock({ children }: { children: string }) {
  return (
    <div className="panel overflow-x-auto p-5">
      <pre className="font-mono text-xs leading-relaxed text-foreground/90 whitespace-pre">{children}</pre>
    </div>
  );
}

const SPIIX_LEAD = `  /spiix/signal — "Get the signal" form
        │  (name, email, company, message)
        ▼
  src/lib/spiix-leads.ts
        │  validated server-side
        ├──► formsubmit.co → steve@stevepeeleii.com   (direct email, no HubSpot)
        └──► Supabase (dardo) → service-only submission record (one retry)`;

const GL_LEAD = `  /growth-ladders — signup / download form
        │
        ▼
  src/lib/growth-ladders-leads.ts + src/lib/growth-ladders.functions.ts
        │
        ├──► Supabase (dardo) → lead tables
        └──► FormSubmit JSON → steve@stevepeeleii.com (backup delivery)`;

const BLOG_READ = `  Visitor → /blog or /blog/:slug  (SSR)
        │
        ▼
  TanStack Start server function
        │  GROQ query via Sanity client
        ▼
  Sanity API — k74pcbpp / production
        │  (images via cdn.sanity.io)
        ▼
  Rendered HTML → visitor`;

const BLOG_WRITE = `  Steve → stevepeeleii.com/studio  (embedded Sanity Studio, /studio/$ wildcard)
        │  login: Google / GitHub / email
        │  CORS: stevepeeleii.com + www.stevepeeleii.com (credentials allowed)
        ▼
  Sanity API — mutations to k74pcbpp / production
        │
        ▼
  Published → live on next page request (no rebuild needed)`;

const CHAT_FLOW = `  Visitor → HubSpot live chat widget (portal 22009185)
        │
        ▼
  HubSpot Conversations inbox
        │
        ▼
  cron hubspot-chat-watch (every 15 min)
        │  replies as Steve's assistant (on-site facts only)
        └──► tricky threads → escalated to Steve with thread link`;

function DataFlowsPage() {
  return (
    <div className="min-h-screen overflow-x-clip">
      <SiteHeader />
      <main>
        <section className="hero-surface border-b border-border/60">
          <div className="mx-auto max-w-4xl px-5 py-20">
            <Link to="/scaffolding/architecture" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="size-4" /> Architecture
            </Link>
            <p className="eyebrow mt-8">Scaffolding / Architecture / Data flows</p>
            <h1 className="mt-5 text-4xl font-bold sm:text-5xl">
              Data <span className="text-gradient">flows.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              Every path data takes through stevepeeleii.com — leads, content, analytics, chat. Unlisted and noindex.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl space-y-6 px-5 py-20">
          <p className="eyebrow">01</p>
          <h2 className="text-3xl font-bold">SPIIX signal <span className="text-gradient">leads.</span></h2>
          <CodeBlock>{SPIIX_LEAD}</CodeBlock>
          <p className="text-sm text-muted-foreground">Lead delivery must never delay reading access — the Monolith stays available even if delivery fails.</p>
        </section>

        <section className="mx-auto max-w-6xl space-y-6 px-5 py-20">
          <p className="eyebrow">02</p>
          <h2 className="text-3xl font-bold">Growth Ladders <span className="text-gradient">signups.</span></h2>
          <CodeBlock>{GL_LEAD}</CodeBlock>
        </section>

        <section className="mx-auto max-w-6xl space-y-6 px-5 py-20">
          <p className="eyebrow">03</p>
          <h2 className="text-3xl font-bold">Blog <span className="text-gradient">read path.</span></h2>
          <CodeBlock>{BLOG_READ}</CodeBlock>
        </section>

        <section className="mx-auto max-w-6xl space-y-6 px-5 py-20">
          <p className="eyebrow">04</p>
          <h2 className="text-3xl font-bold">Blog <span className="text-gradient">write path.</span></h2>
          <CodeBlock>{BLOG_WRITE}</CodeBlock>
        </section>

        <section className="mx-auto max-w-4xl px-5 pb-24">
          <p className="eyebrow">05</p>
          <h2 className="text-3xl font-bold">HubSpot <span className="text-gradient">chat.</span></h2>
          <CodeBlock>{CHAT_FLOW}</CodeBlock>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
