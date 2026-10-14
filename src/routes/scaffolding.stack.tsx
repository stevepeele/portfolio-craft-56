import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { ScaffoldingShell, SectionHead, DocTable, scaffoldingHead } from "@/components/scaffolding-shell";

const title = "Scaffolding — The Stack | Steve Peele II";
const description =
  "Every tool and service Steve runs, and what each one is for. A reference he can share with collaborators. Unlisted.";

export const Route = createFileRoute("/scaffolding/stack")({
  head: () => scaffoldingHead("/scaffolding/stack", title, description),
  component: StackPage,
});

const GROUPS: { group: ReactNode; head: string[]; rows: string[][] }[] = [
  {
    group: (
      <>
        Build & <span className="text-gradient">ship.</span>
      </>
    ),
    head: ["Tool", "What it's for"],
    rows: [
      ["Vercel", "Hosting and deploys for every project. Auto-deploys on push to main."],
      ["GitHub", "Source of truth — main-site repo plus every app repo."],
      ["Supabase", "Auth and Postgres. Several apps share one project; the free-tier limit is real."],
      ["Sanity", "Blog CMS — content, related reading, CTA blocks."],
      ["Segment", "Sitewide analytics — installed on every build, no exceptions."],
      ["Linear", "System of record. Every piece of build work lives in an issue, tracked as it happens."],
    ],
  },
  {
    group: (
      <>
        <span className="text-gradient">Money.</span>
      </>
    ),
    head: ["Tool", "What it's for"],
    rows: [
      ["Stripe", "Payments — currently unconnected on the apps, by standing order."],
      ["Plaid", "Linked accounts — balances, transactions, and spending visibility."],
    ],
  },
  {
    group: (
      <>
        Comms & <span className="text-gradient">CRM.</span>
      </>
    ),
    head: ["Tool", "What it's for"],
    rows: [
      ["Gmail + Google Calendar", "Email and scheduling. The calendar is the source of truth for time."],
      ["HubSpot", "CRM and site chat — an automated assistant triages the chat inbox."],
      ["Slack", "Deploy alerts — every deploy posts to #deploys."],
    ],
  },
  {
    group: (
      <>
        <span className="text-gradient">Create.</span>
      </>
    ),
    head: ["Tool", "What it's for"],
    rows: [
      ["Suno", "Music generation — the engine behind the Vacillantes project."],
      ["Granola", "Meeting notes and transcripts, synced into the second brain."],
      ["Evernote", "The second brain — 2013 to present, fully imported and searchable."],
    ],
  },
  {
    group: (
      <>
        <span className="text-gradient">Social.</span>
      </>
    ),
    head: ["Tool", "What it's for"],
    rows: [
      ["X", "@stevepeeleii — building in public, engaging with builders and founders."],
      ["Threads", "@stevepeeleii — cross-posted with X, same voice."],
      ["Instagram", "Visual work and music. Monitored for mentions."],
      ["Facebook", "Marketplace flips, community, and the long tail of real life."],
    ],
  },
  {
    group: (
      <>
        <span className="text-gradient">AI.</span>
      </>
    ),
    head: ["Tool", "What it's for"],
    rows: [
      ["Muse", "The AI second-in-command — coding, automation, research, operations."],
      ["OpenAI API", "Powers the Repurpose Engine's generation endpoint."],
      ["Anthropic API", "What Muse Frontends run on — the deployer brings their own key."],
    ],
  },
];

function StackPage() {
  return (
    <ScaffoldingShell
      path="/scaffolding/stack"
      eyebrow="Scaffolding / The Stack"
      title={
        <>
          The <span className="text-gradient">stack.</span>
        </>
      }
      intro="Every tool and service in the operation, and what each one is actually for. A reference for Steve — and for anyone he works with."
      updated="2026-10-14"
    >
      {GROUPS.map((g, i) => (
        <section key={i} className="space-y-6">
          <SectionHead n={String(i + 1).padStart(2, "0")} sub={i === 0 ? "What the whole thing is built on." : undefined}>
            {g.group}
          </SectionHead>
          <DocTable head={g.head} rows={g.rows} />
        </section>
      ))}

      <section className="space-y-6">
        <SectionHead n="07" sub="The rule that keeps the list short.">
          Why this <span className="text-gradient">list.</span>
        </SectionHead>
        <div className="panel space-y-3 p-5 text-sm text-muted-foreground sm:p-6">
          <p>
            <span className="font-semibold text-foreground">Every tool earns its place.</span> If something on this
            page stops pulling its weight, it gets cut — the stack stays small enough that one person can hold all
            of it in their head.
          </p>
          <p>
            <span className="font-semibold text-foreground">No tool sprawl, no zombie subscriptions.</span> New tools
            get a trial with a defined job; if the job isn't real, the tool doesn't stay.
          </p>
        </div>
      </section>
    </ScaffoldingShell>
  );
}
