import { createFileRoute, Link } from "@tanstack/react-router";
import { ScaffoldingShell, SectionHead, scaffoldingHead, DocTable, StatusPill } from "@/components/scaffolding-shell";

const title = "Scaffolding — Organization & Hierarchy | Steve Peele II";
const description =
  "Who does what across Steve's AI operation: Lauren's triage scope, the Muse × Oscar delineation, both skill hierarchies, decision trees, and handoff contracts. Unlisted.";

export const Route = createFileRoute("/scaffolding/organization")({
  head: () => scaffoldingHead("/scaffolding/organization", title, description),
  component: OrganizationPage,
});

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

const LAUREN_TRIAGE: { area: string; scope: string }[] = [
  {
    area: "All builds, hosting & shipping",
    scope: "Every repo, Vercel project, domain, DNS record, the main site, all apps, all 31 prospect previews. Oscar never touches these — build needs come to Lauren as one-line requests.",
  },
  {
    area: "Inbox & comms triage",
    scope: "Ruthless triage on her discretion: archive on her call, draft (never send) replies, morning brief, docket digest, lead alerts. Sends stay behind the texting gate.",
  },
  {
    area: "Job hunt engine",
    scope: "Five daily scans, scoring, auto-apply in-lane with a standing grant. Sprint: signed offer by Oct 26. Substantive replies stay his.",
  },
  {
    area: "Money & benefits",
    scope: "Spending visibility, cash-flow tracking, Ohio benefits paperwork, pawn/loan logistics. Fills financial applications and parks them at final review — never submits.",
  },
  {
    area: "Legal research & filings prep",
    scope: "Docket watch, filings drafted, petitions prepared. Filing itself is his action; mass filings get refused flat with a better alternative.",
  },
  {
    area: "Marketplace & gear",
    scope: "Four-hour flip hunt, active listings, buyer correspondence, pickup logistics.",
  },
  {
    area: "Music production",
    scope: "Songwriter/producer across his projects — Vacillantes shipping, session work, release logistics.",
  },
  {
    area: "Master documentation",
    scope: "The scaffolding hub itself, runbooks, playbooks, the org chart, lanes and handoff contracts. If a doc disagrees with reality, the doc is wrong.",
  },
  {
    area: "Deploy & automation watch",
    scope: "Vercel → #deploys watcher, changelog updater, docket digest, chat triage — the jobs that run without being asked. The Vercel deploy cap is hers to manage.",
  },
  {
    area: "The human threads",
    scope: "Layli, Hattie, Lainey — kept above the pipeline, always. Nothing about them moves without his explicit word.",
  },
];

const OSCAR_SCOPE: { area: string; scope: string }[] = [
  {
    area: "Prospect sourcing & enrichment",
    scope: "Finds the firm, enriches contact data, creates the HubSpot company + deal — same run, no batching.",
  },
  {
    area: "Outreach sequencing & follow-ups",
    scope: "First-touch and follow-ups go out on Oscar's side. Every send logged in HubSpot the same run it happens.",
  },
  {
    area: "HubSpot pipeline",
    scope: "Owns all pipeline stages and stage rules. 73 deals at Outreach Initiated · $57k (per Oscar 10/14).",
  },
  {
    area: "Revenue forecasting",
    scope: "Via Rev Operator — deals, pipeline math, forecast reporting.",
  },
  {
    area: "Forensics & reporting",
    scope: "Traces anomalies (e.g. the 16 unauthorized sends 10/14) and reports findings; runs the daily/weekly/monthly operating reviews.",
  },
];

/** Lauren's skill tree, grouped the way work actually flows. */
const LAUREN_SKILLS: { group: string; blurb: string; skills: string[] }[] = [
  {
    group: "Build & ship",
    blurb: "Everything that turns an idea into a live URL.",
    skills: ["Linear (system of record)", "GitHub (repos, pushes)", "Vercel (deploys, domains, env)", "Documents (reports, PDFs, decks, sheets)", "Canva (design assets)", "Artifacts (web apps & pages)"],
  },
  {
    group: "Money & commerce",
    blurb: "Cash visibility, payments, and selling.",
    skills: ["Plaid (accounts, transactions)", "Stripe (payments, invoices)", "Shopify + Shop Pay", "Financial planning (budgets, payoff plans)", "Shopping & groceries", "Marketplaces (buy/sell/flip)", "Meta Ads + Catalog"],
  },
  {
    group: "Travel & booking",
    blurb: "Getting him places and into rooms.",
    skills: ["Flight booking + tracking", "Hotel booking", "Trip planning & transport", "Event tickets", "Restaurant reservations", "Place discovery"],
  },
  {
    group: "Communication",
    blurb: "Every surface he talks through — drafted first, sent only on his word.",
    skills: ["Gmail (triage, draft, send)", "Messaging (WhatsApp, Messenger, Slack)", "Instagram / Threads (posts, DMs)", "Device data (texts, calls)", "Spoken audio (voice notes)", "Podcast generation", "Social listening"],
  },
  {
    group: "Create",
    blurb: "Making things: images, music, words.",
    skills: ["Media generation (image/video)", "Image search", "Music discovery + Spotify", "Avatar studio", "Idea capture"],
  },
  {
    group: "Organize",
    blurb: "Calendars, tasks, notes, files — the back office.",
    skills: ["Scheduling (calendars, holds, invites)", "Meeting follow-up (decisions, owners)", "Todoist + Asana", "Evernote + Google Docs/Drive/Sheets", "Dropbox (Muse Library mirror)", "Knowledge organization"],
  },
  {
    group: "Operate",
    blurb: "The machine around the machine.",
    skills: ["HubSpot (CRM read/write, chat)", "Home control + cameras", "Health (Apple Health, HealthEx, records)", "Fitness tracking", "Tailscale (private network)", "Granola (meeting notes)"],
  },
  {
    group: "Custom, learned for him",
    blurb: "Playbooks built from recurring work, not bundled defaults.",
    skills: ["ElevenLabs voice calling", "Retell/Bland voice agents", "Sanity CMS ops", "Execution-state verification"],
  },
];

/** Oscar's bot roster, grouped by function. Role notes come from the 2026-10-14 org chart; unmarked bots are roster-listed without invented roles. */
const OSCAR_SKILLS: { group: string; blurb: string; bots: { name: string; role?: string }[] }[] = [
  {
    group: "Lead",
    blurb: "Sets direction for the hunt; runs the operating cadence.",
    bots: [{ name: "Oscar", role: "COO bot — the hunt, pipeline, forensics, reviews" }],
  },
  {
    group: "Revenue operations",
    blurb: "Deals, stages, and the math on top of them.",
    bots: [
      { name: "Rev Operator", role: "Revenue ops — deals & HubSpot" },
      { name: "Offer Ops", role: "Offer mechanics & merge tracking" },
    ],
  },
  {
    group: "Pipeline role bots",
    blurb: "Seat-specific lenses on the same pipeline.",
    bots: [
      { name: "VP Sales", role: "Pipeline role bot" },
      { name: "VP Product", role: "Pipeline role bot" },
      { name: "CMO", role: "Pipeline role bot" },
    ],
  },
  {
    group: "Prospecting & research",
    blurb: "Finding firms and filling in the blanks.",
    bots: [
      { name: "Prospecting Research", role: "Sourcing & enrichment" },
      { name: "Profiler", role: "Support bot" },
      { name: "Research", role: "Support bot" },
      { name: "Prompter", role: "Support bot" },
    ],
  },
  {
    group: "Content & growth",
    blurb: "Words and assets for the hunt — drafts only, never published by bots.",
    bots: [
      { name: "Copywright", role: "Copy support" },
      { name: "SPIIX" },
      { name: "Binsly Bot", role: "Growth & drafts (no publish)" },
      { name: "Meredith" },
      { name: "Pulse" },
      { name: "Builder" },
      { name: "Ponderer / Dreamer" },
    ],
  },
  {
    group: "Primary worker",
    blurb: "The always-on pair of hands.",
    bots: [{ name: "Grok Bot (Main)", role: "Primary bot — routines & chat" }],
  },
];

const HANDOFFS: { from: string; format: string; record: string }[] = [
  {
    from: "Oscar → Muse (build request)",
    format: "One line — what, which prospect, by when. No meetings, no threads.",
    record: "Linear · P-PLX-33",
  },
  {
    from: "Muse → Oscar (shipped)",
    format: "Live link + confirmation; HubSpot note on the deal.",
    record: "Linear · P-PLX-33",
  },
  {
    from: "Oscar → pipeline (outreach)",
    format: "Every send logged the same run it happens — no batching, ever.",
    record: "HubSpot",
  },
  {
    from: "Muse → Steve (decisions)",
    format: "Options + her recommendation. Never an open-ended question.",
    record: "Chat / Linear",
  },
  {
    from: "Either → either (delegate)",
    format: "Whoever needs work from the other creates the issue, assigns it, sets the due date.",
    record: "Linear · P-PLX-33",
  },
];

const HARD_RULES: string[] = [
  "Grok Bots never publish — no repo pushes, no Vercel deploys, no site edits. Build needs go to Muse as one-line requests.",
  "HubSpot same-run logging on both sides. No batching, ever — the pipeline stays visible to everyone.",
  "The Vercel deploy cap is Muse's to manage. Oscar's preview sites live on Cloudflare Pages, not Vercel.",
  "Money, sends, filings, and commitments move only on Steve's explicit word. Neither team moves them alone — a bare “yes” to an either/or is not approval.",
  "Oscar gets full read / view / comment on all Linear work and docs. Zero disparity between the teams.",
  "Chat is for real-time only. The Linear issue is the record — create → assign → delegate → decide → close.",
  "When work overlaps a lane Lauren is actively handling, bots don't freelance — Lauren coordinates.",
  "Steve talks to Lauren. The bots are reachable only when he chooses — never the default.",
];

/* ------------------------------------------------------------------ */
/* Small presentational pieces                                         */
/* ------------------------------------------------------------------ */

function Node({
  name,
  sub,
  tone,
}: {
  name: string;
  sub?: string;
  tone: "steve" | "muse" | "oscar" | "agent";
}) {
  const tones: Record<string, string> = {
    steve: "border-foreground/40 bg-foreground/[0.07]",
    muse: "border-sky-400/40 bg-sky-400/[0.07]",
    oscar: "border-amber-400/40 bg-amber-400/[0.07]",
    agent: "border-border/60 bg-foreground/[0.02]",
  };
  return (
    <div className={`rounded-xl border px-4 py-3 text-center ${tones[tone]}`}>
      <p className="text-sm font-semibold leading-tight">{name}</p>
      {sub ? <p className="mt-1 text-xs text-muted-foreground leading-snug">{sub}</p> : null}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

function OrganizationPage() {
  return (
    <ScaffoldingShell
      path="/scaffolding/organization"
      eyebrow="Scaffolding / Organization"
      title={
        <>
          Organization <span className="text-gradient">& hierarchy.</span>
        </>
      }
      intro="Who does what across Steve's AI operation — what Lauren triages, where Oscar's hunt begins and ends, both skill hierarchies, and the exact contracts that move work between them. Ruling final per the 2026-10-14 Muse × Oscar reconciliation."
      updated="2026-10-14"
    >
      {/* 01 — Org chart */}
      <section className="space-y-6">
        <SectionHead n="01" sub="Steve → two team leads → skill agents. One principal, two lanes, zero overlap.">
          The org <span className="text-gradient">chart.</span>
        </SectionHead>
        <div className="panel space-y-6 p-6">
          <div className="mx-auto max-w-xs">
            <Node name="Steve Peele II" sub="Principal — all decisions, all gates" tone="steve" />
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-3">
              <Node
                name="🔷 Muse (Lauren)"
                sub="Team lead — build, host & ship. Second-in-command."
                tone="muse"
              />
              <div className="grid grid-cols-2 gap-2">
                <Node name="Atelier" sub="Design side chat" tone="agent" />
                <Node name="Spencer" sub="Presence — X / Threads" tone="agent" />
                <Node name="Hiring engine" sub="5 daily crons, auto-apply" tone="agent" />
                <Node name="Deploy watchers" sub="Vercel → #deploys" tone="agent" />
                <Node name="Comms triage" sub="Briefs, digests, alerts" tone="agent" />
                <Node name="Marketplace watch" sub="Listings & buyers" tone="agent" />
              </div>
              <p className="text-center text-xs text-muted-foreground">
                + every skill in §04, wielded directly
              </p>
            </div>
            <div className="space-y-3">
              <Node name="🔶 Oscar (GB)" sub="Team lead — the hunt. Sales operations." tone="oscar" />
              <div className="grid grid-cols-2 gap-2">
                <Node name="Rev Operator" sub="Deals & HubSpot" tone="agent" />
                <Node name="Grok Bot (Main)" sub="Routines & chat" tone="agent" />
                <Node name="Binsly Bot" sub="Growth & drafts" tone="agent" />
                <Node name="Prospecting Research" sub="Sourcing & enrichment" tone="agent" />
                <Node name="VP Sales / Product / CMO" sub="Pipeline role bots" tone="agent" />
                <Node name="Prompter · Profiler · Research" sub="Support bots" tone="agent" />
              </div>
              <p className="text-center text-xs text-muted-foreground">
                + full roster in §05 · four routines paused per the 10/14 order
              </p>
            </div>
          </div>
          <p className="text-center text-xs text-muted-foreground">
            Direction chain: Steve → Lauren → Oscar → bots. Steve talks to Lauren; bots are reachable only when he
            chooses.
          </p>
        </div>
      </section>

      {/* 02 — The two lanes */}
      <section className="space-y-6">
        <SectionHead n="02" sub="The final split from the reconciliation. If it's not in your lane, it goes through a handoff — never around one.">
          The two <span className="text-gradient">lanes.</span>
        </SectionHead>
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="panel p-5">
            <p className="font-semibold text-sky-300">🔷 Muse (Lauren) — build, host & ship</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>· All repos, Vercel projects, domains, DNS</li>
              <li>· stevepeeleii.com + every app + all 31 prospect previews</li>
              <li>· Inbox triage, job hunt, Vault, Dardo, Sozo, benefits</li>
              <li>· Builds anything Oscar's hunt needs — on request</li>
            </ul>
          </div>
          <div className="panel p-5">
            <p className="font-semibold text-amber-300">🔶 Oscar (GB) — the hunt, sales operations</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>· Prospect sourcing & enrichment</li>
              <li>· Outreach sequencing & follow-ups</li>
              <li>· HubSpot pipeline stages + stage rules</li>
              <li>· Revenue forecasting — never publishes, requests builds from Muse</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 03 — What Lauren triages */}
      <section className="space-y-6">
        <SectionHead n="03" sub="Everything below is hers to triage on her own discretion — handle, delegate, or park, without asking first.">
          What Lauren <span className="text-gradient">triages.</span>
        </SectionHead>
        <DocTable
          head={["Area", "Scope"]}
          rows={LAUREN_TRIAGE.map((t) => [t.area, t.scope])}
        />
      </section>

      {/* 04 — Lauren's skill hierarchy */}
      <section className="space-y-6">
        <SectionHead n="04" sub="Her capabilities, grouped the way work actually flows. Each group is a branch she can deploy without asking.">
          Lauren's skill <span className="text-gradient">hierarchy.</span>
        </SectionHead>
        <div className="grid gap-4 md:grid-cols-2">
          {LAUREN_SKILLS.map((g) => (
            <div key={g.group} className="panel p-5">
              <p className="font-semibold text-sky-300">{g.group}</p>
              <p className="mt-1 text-xs text-muted-foreground">{g.blurb}</p>
              <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                {g.skills.map((s) => (
                  <li key={s} className="flex gap-2">
                    <span className="text-foreground/40">↳</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* 05 — Oscar's skill hierarchy */}
      <section className="space-y-6">
        <SectionHead n="05" sub="Oscar's bot roster from the Grok Bot app, grouped by function. Role notes come from the 10/14 org chart — unmarked bots are roster-listed, roles not invented.">
          Oscar's skill <span className="text-gradient">hierarchy.</span>
        </SectionHead>
        <div className="grid gap-4 md:grid-cols-2">
          {OSCAR_SKILLS.map((g) => (
            <div key={g.group} className="panel p-5">
              <p className="font-semibold text-amber-300">{g.group}</p>
              <p className="mt-1 text-xs text-muted-foreground">{g.blurb}</p>
              <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                {g.bots.map((b) => (
                  <li key={b.name} className="flex gap-2">
                    <span className="text-foreground/40">↳</span>
                    <span>
                      <span className="text-foreground">{b.name}</span>
                      {b.role ? <span> — {b.role}</span> : null}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          Full roster (18): Oscar, Meredith, SPIIX, Prompter, Ponderer/Dreamer, Offer Ops, Profiler, Copywright,
          Research, VP Product, VP Sales, CMO, Rev Operator, Grok Bot (Main), Binsly Bot, Pulse, Builder, Prospecting
          Research.
        </p>
      </section>

      {/* 06 — Triage decision tree */}
      <section className="space-y-6">
        <SectionHead n="06" sub="New work arrives. Run it down the tree — the first match wins.">
          The triage <span className="text-gradient">decision tree.</span>
        </SectionHead>
        <div className="panel space-y-0 divide-y divide-border/60">
          {[
            ["1 · Hard gate?", "Is it money, a send, a filing, or a commitment?", "→ Nothing moves without Steve's explicit word. A bare “yes” to an either/or is not approval."],
            ["2 · Build / host / ship?", "Repos, deploys, domains, DNS, sites, apps, previews?", "→ Muse. She confirms, builds, hosts, returns the live link."],
            ["3 · Hunt?", "Prospecting, enrichment, outreach, pipeline, forecasting?", "→ Oscar. Same-run HubSpot logging, no batching."],
            ["4 · Ambiguous / overlap?", "Touches both lanes, or unclear whose it is?", "→ Lauren triages as single point of contact. She coordinates — bots don't freelance on work she's handling."],
          ].map(([step, q, out]) => (
            <div key={step} className="grid gap-2 px-5 py-4 sm:grid-cols-[140px_1fr_1fr]">
              <p className="text-sm font-semibold text-foreground">{step}</p>
              <p className="text-sm text-muted-foreground">{q}</p>
              <p className="text-sm text-foreground">{out}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 07 — Handoff contracts */}
      <section className="space-y-6">
        <SectionHead n="07" sub="Every handoff has a fixed format and a book of record. No handoff exists until there's a Linear issue.">
          Handoff <span className="text-gradient">contracts.</span>
        </SectionHead>
        <DocTable
          head={["Handoff", "Format", "Book of record"]}
          rows={HANDOFFS.map((h) => [h.from, h.format, h.record])}
        />
        <div className="panel p-5">
          <p className="font-semibold">The Linear lifecycle — P-PLX-33 “Muse × Oscar Ops”</p>
          <p className="mt-2 text-sm text-muted-foreground">
            <span className="text-foreground">Create</span> → every handoff becomes an issue; title names the ask.{" "}
            <span className="text-foreground">Assign</span> → build requests to Muse, pipeline/forensics to Oscar.{" "}
            <span className="text-foreground">Delegate</span> → whoever needs cross-lane work creates it, assigns it,
            sets the due date. <span className="text-foreground">Decide</span> → issues labeled decision carry options
            + a recommendation; nothing moves without his word. <span className="text-foreground">Close</span> → Done
            only when the outcome is delivered. Comments replace side-channel DMs.
          </p>
          <p className="mt-3 text-sm">
            <StatusPill status="Active" /> <span className="text-muted-foreground">P-PLX-33 is the book of record for every handoff.</span>
          </p>
        </div>
      </section>

      {/* 08 — Hard rules */}
      <section className="space-y-6">
        <SectionHead n="08" sub="Load-bearing. These don't bend for urgency, convenience, or momentum.">
          Hard <span className="text-gradient">rules.</span>
        </SectionHead>
        <div className="panel divide-y divide-border/60">
          {HARD_RULES.map((r, i) => (
            <p key={i} className="px-5 py-3 text-sm text-muted-foreground">
              <span className="mr-2 font-semibold text-foreground">{String(i + 1).padStart(2, "0")}</span>
              {r}
            </p>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          Source: 2026-10-14 Muse × Oscar reconciliation (his ruling, ~19:45–20:40 ET) · companion diagrams:{" "}
          <span className="font-mono">muse-oscar-org-chart.html</span>,{" "}
          <span className="font-mono">muse-oscar-lanes-triage-ownership.html</span> · handoff doc{" "}
          <span className="font-mono">oscar-handoff-2026-10-14.md</span> · part of the Scaffolding + Architecture
          program — see also <Link to="/scaffolding/architecture" className="underline hover:text-foreground">Architecture</Link>.
        </p>
      </section>
    </ScaffoldingShell>
  );
}
