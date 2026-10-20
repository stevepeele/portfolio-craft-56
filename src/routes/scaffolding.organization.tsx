import { createFileRoute, Link } from "@tanstack/react-router";
import { ScaffoldingShell, SectionHead, scaffoldingHead, DocTable, StatusPill } from "@/components/scaffolding-shell";

const title = "Scaffolding — Organization & Hierarchy | Steve Peele II";
const description =
  "The orchestration stack: L0 Principal → L1 Command (Lauren, COO) → L2 execution arms → L3 the 8 lanes → L4 platforms. Full triage runbook, platform carrots, handoff contracts, kill switches. Unlisted.";

export const Route = createFileRoute("/scaffolding/organization")({
  head: () => scaffoldingHead("/scaffolding/organization", title, description),
  component: OrganizationPage,
});

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

/** L2 — Lauren's three direct-report arms. */
const ARMS: { name: string; tone: string; what: string; how: string[] }[] = [
  {
    name: "⚙️ Grokbot execution team",
    tone: "text-amber-300",
    what: "The thousand ICs. Mechanical, repeatable, zero-voice work — eyes and hands only.",
    how: [
      "Works strictly from seven-field task orders in P-PLX-33 (PLX-481–488). No seven fields, no job.",
      "Returns structured output to a defined file location + a Linear comment. Never delivers to Steve directly.",
      "Never sends, publishes, spends, or commits. Drafts park; builds go to Lauren as one-line requests.",
    ],
  },
  {
    name: "💬 Side-chat exec leaders",
    tone: "text-sky-300",
    what: "Specialized functions with their own charters, reporting to Lauren.",
    how: [
      "Atelier — design leader (concepts, mockups, brand systems, living knowledge bank).",
      "Oscar — the hunt lane: prospecting, enrichment, outreach, HubSpot pipeline stages.",
      "Spencer — presence: X + Threads engagement. Voice Standup, Forge, hiring engine as they mature.",
    ],
  },
  {
    name: "🤖 Cron / automation layer",
    tone: "text-foreground",
    what: "Jobs that run without being asked. Silent when clean; escalate only what needs a human.",
    how: [
      "Deploy watchers (Vercel → #deploys), changelog updater (daily 06:30 ET), docket digest.",
      "Marketplace buyer watch, Linear issue watch (5-min triage), comms triage, lead alerts.",
      "Lauren owns them all — creates, monitors, kills.",
    ],
  },
];

/** L3 — the 8 standing lanes. Sourced from PLX-481–488 (seven-field task orders). */
const LANES: { issue: string; lane: string; cadence: string; io: string; boundary: string }[] = [
  {
    issue: "PLX-481",
    lane: "Inbox triage",
    cadence: "Every 30 min, 06:00–23:00 ET",
    io: "HubSpot chat + Gmail + Nextdoor alerts → append-only report ~/workspace/oscar/grokbot-inbox-triage.md; P1s as Linear comments",
    boundary: "Flag / sort / prioritize only. Never replies.",
  },
  {
    issue: "PLX-482",
    lane: "CRM hygiene",
    cadence: "Nightly 02:00 ET + on-demand",
    io: "HubSpot companies/contacts/deals → ~/workspace/oscar/grokbot-crm-hygiene.md; SAFE fixes auto-applied + logged",
    boundary: "REVIEW fixes need Lauren's “APPLY”. Lauren reviews diffs before anything destructive.",
  },
  {
    issue: "PLX-483",
    lane: "Research sweeps",
    cadence: "On-demand batches; competitors weekly Mon 07:00 ET",
    io: "Prospect CSV / watchlist → ~/workspace/oscar/research/<slug>.md with fixed sections",
    boundary: "Read-only. No contact with researched parties, ever.",
  },
  {
    issue: "PLX-484",
    lane: "Draft prep",
    cadence: "Nightly / on-demand",
    io: "HubSpot deal + context → ~/workspace/oscar/drafts/<deal-id>-followup-<n>.md (To / Subject / Body / Why now)",
    boundary: "Drafts NEVER send from this lane. Lauren edits, Steve taps.",
  },
  {
    issue: "PLX-485",
    lane: "Daily brief builder",
    cadence: "Daily, assembled by 06:00 ET",
    io: "Overnight HubSpot + calendar + watcher logs → ~/workspace/oscar/daily-brief-raw/YYYY-MM-DD.md + Linear comment = handoff",
    boundary: "Raw inputs only. Lauren refines and serves the brief — Grokbot never sends it to Steve.",
  },
  {
    issue: "PLX-486",
    lane: "Meeting prep packets",
    cadence: "Nightly 21:00 ET + on-demand",
    io: "Tomorrow's external calendar events → ~/workspace/oscar/meeting-prep/YYYY-MM-DD-<slug>.md (who / context / what they want / checklist)",
    boundary: "Inference labeled as inference. Lauren reviews.",
  },
  {
    issue: "PLX-487",
    lane: "Lead list building",
    cadence: "On-demand, 10 prospects/batch",
    io: "Target profile → ~/workspace/oscar/lead-lists/YYYY-MM-DD-<segment>.csv (fixed columns) + method notes",
    boundary: "Lauren qualifies before any CRM import or outreach.",
  },
  {
    issue: "PLX-488",
    lane: "Social listening",
    cadence: "Twice daily 08:00 + 20:00 ET",
    io: "Keywords across X/Threads/LinkedIn/Reddit/FB → ~/workspace/oscar/social-listening.md (quote + sentiment + suggested action)",
    boundary: "Report-only. Never engages, never replies, never posts.",
  },
];

/** L4 — platforms. The "carrot" is what each platform provides that earns its place in the stack. */
const PLATFORMS: { group: string; rows: { platform: string; role: string; carrot: string; owner: string; constraint?: string }[] }[] = [
  {
    group: "Build substrate",
    rows: [
      { platform: "Vercel", role: "Hosts everything web", carrot: "Zero-config deploys, preview URLs, custom domains", owner: "Lauren", constraint: "100 deploys/day cap — hers to manage" },
      { platform: "GitHub", role: "Source of truth for code", carrot: "Version history, webhooks → Vercel, connector pushes", owner: "Lauren", constraint: "API pushes don't fire deploy webhooks — verify" },
      { platform: "Cloudflare Pages", role: "Preview overflow hosting", carrot: "Keeps the Vercel cap for Lauren's builds", owner: "Oscar" },
    ],
  },
  {
    group: "Data substrate",
    rows: [
      { platform: "Supabase", role: "Data + auth backend", carrot: "Postgres + Auth + RLS in one project", owner: "Lauren", constraint: "2-project free-tier limit" },
      { platform: "Sanity", role: "Blog CMS", carrot: "Structured content, API publishing", owner: "Lauren" },
      { platform: "Dropbox", role: "File mirror", carrot: "Every deliverable mirrored to the Muse Library", owner: "Lauren", constraint: "Team root not writable — member folder only" },
    ],
  },
  {
    group: "The pipe",
    rows: [
      { platform: "Segment", role: "Event pipeline", carrot: "One event taxonomy → every platform; never backend → platform direct", owner: "Lauren", constraint: "On every build, no exceptions (standing)" },
    ],
  },
  {
    group: "Systems of record",
    rows: [
      { platform: "Linear", role: "Work system of record", carrot: "Every handoff is an issue; the book of record", owner: "Lauren", constraint: "P-PLX-8 (site), P-PLX-33 (ops handoffs)" },
      { platform: "HubSpot", role: "CRM / pipeline", carrot: "Shared source of truth for deals; same-run logging", owner: "Oscar (stages/rules); Lauren (contacts)" },
      { platform: "Todoist", role: "Reminders / tasks", carrot: "“Muse”-labeled, never dateless — no cron reminders", owner: "Lauren" },
    ],
  },
  {
    group: "Execution runtime",
    rows: [
      { platform: "Grok / xAI", role: "Bot runtime", carrot: "Persistent cloud computers — the execution team's home", owner: "Lauren (task orders in)", constraint: "No API — management is browser-only" },
    ],
  },
  {
    group: "Voice",
    rows: [
      { platform: "ElevenLabs", role: "Conversational voice AI", carrot: "Real-time spoken agents (standup product)", owner: "Lauren" },
      { platform: "Retell", role: "Voice agent fallback", carrot: "Phone-call capable when needed", owner: "Lauren" },
    ],
  },
];

/** What Lauren keeps — triage areas she handles on her own discretion. */
const LAUREN_KEEPS: { area: string; scope: string }[] = [
  { area: "All builds, hosting & shipping", scope: "Every repo, Vercel project, domain, DNS record, the main site, all apps, all previews. Bots never touch these." },
  { area: "Judgment & voice", scope: "Anything in his voice, anything public-facing, strategy, creative direction. Never offloaded." },
  { area: "Job hunt engine", scope: "Five daily scans, scoring, auto-apply in-lane. Sprint: signed offer by Oct 26. Substantive replies stay his." },
  { area: "Money & benefits", scope: "Cash-flow visibility, Ohio benefits, pawn/loan logistics. Applications filled and parked at final review — never submitted." },
  { area: "Legal research & filings prep", scope: "Docket watch, filings drafted, petitions prepared. Filing itself is his action." },
  { area: "Inbox triage (judgment layer)", scope: "Grokbot flags and sorts; Lauren handles the humans. Ruthless archive on her call; drafts, never sends." },
  { area: "Marketplace & gear", scope: "Flip hunt, listings, buyer correspondence, pickup logistics." },
  { area: "Music production", scope: "Songwriter/producer across his projects — Vacillantes shipping, session work, releases." },
  { area: "Master documentation", scope: "This hub, runbooks, playbooks, the org chart itself. If a doc disagrees with reality, the doc is wrong." },
  { area: "The human threads", scope: "Family and personal relationships — above the pipeline, always. Nothing moves without his explicit word." },
];

/** Lauren's direct capabilities — the 8 branches she wields herself. */
const LAUREN_SKILLS: { group: string; blurb: string; skills: string[] }[] = [
  { group: "Build & ship", blurb: "Everything that turns an idea into a live URL.", skills: ["Linear (system of record)", "GitHub (repos, pushes)", "Vercel (deploys, domains, env)", "Documents (reports, PDFs, decks, sheets)", "Canva (design assets)", "Artifacts (web apps & pages)"] },
  { group: "Money & commerce", blurb: "Cash visibility, payments, and selling.", skills: ["Plaid (accounts, transactions)", "Stripe (payments, invoices)", "Shopify + Shop Pay", "Financial planning (budgets, payoff plans)", "Shopping & groceries", "Marketplaces (buy/sell/flip)", "Meta Ads + Catalog"] },
  { group: "Travel & booking", blurb: "Getting him places and into rooms.", skills: ["Flight booking + tracking", "Hotel booking", "Trip planning & transport", "Event tickets", "Restaurant reservations", "Place discovery"] },
  { group: "Communication", blurb: "Every surface he talks through — drafted first, sent only on his word.", skills: ["Gmail (triage, draft, send)", "Messaging (WhatsApp, Messenger, Slack)", "Instagram / Threads (posts, DMs)", "Device data (texts, calls)", "Spoken audio (voice notes)", "Podcast generation", "Social listening"] },
  { group: "Create", blurb: "Making things: images, music, words.", skills: ["Media generation (image/video)", "Image search", "Music discovery + Spotify", "Avatar studio", "Idea capture"] },
  { group: "Organize", blurb: "Calendars, tasks, notes, files — the back office.", skills: ["Scheduling (calendars, holds, invites)", "Meeting follow-up (decisions, owners)", "Todoist + Asana", "Evernote + Google Docs/Drive/Sheets", "Dropbox (Muse Library mirror)", "Knowledge organization"] },
  { group: "Operate", blurb: "The machine around the machine.", skills: ["HubSpot (CRM read/write, chat)", "Home control + cameras", "Health (Apple Health, HealthEx, records)", "Fitness tracking", "Tailscale (private network)", "Granola (meeting notes)"] },
  { group: "Custom, learned for him", blurb: "Playbooks built from recurring work, not bundled defaults.", skills: ["ElevenLabs voice calling", "Retell/Bland voice agents", "Sanity CMS ops", "Execution-state verification"] },
];

const HANDOFFS: { from: string; format: string; record: string }[] = [
  { from: "Steve → Lauren (request)", format: "Conversation. Terse is fine — she triages, scopes, and executes or delegates.", record: "Chat / Linear" },
  { from: "Lauren → Grokbot (task order)", format: "Linear issue in P-PLX-33 with all seven fields: named bot, exact inputs, output format + destination, approval boundary, escalation path, success metric, kill switch. No seven fields, no job.", record: "Linear · P-PLX-33" },
  { from: "Grokbot → Lauren (delivery)", format: "Structured output to the defined file location + Linear comment on the task-order issue. Never delivered directly to Steve.", record: "Linear · P-PLX-33 + ~/workspace/oscar/" },
  { from: "Lauren → Steve (served)", format: "Refined result — options + her recommendation. Never an open-ended question, never raw bot output.", record: "Chat" },
];

const HARD_RULES: string[] = [
  "Lauren is the singular interface. Steve talks to Lauren; Grokbot is reachable only through her task orders — never the default, never direct.",
  "Grokbot never sends, publishes, spends, or commits. Drafts park; builds go to Lauren as one-line requests; money moves only on Steve's explicit word.",
  "Every Grokbot job is a seven-field task order in P-PLX-33: named bot, exact inputs, output format + destination, approval boundary, escalation path, success metric, kill switch. No seven fields, no job.",
  "HubSpot same-run logging on every prospecting activity. No batching, ever — the pipeline stays visible to everyone.",
  "The Vercel deploy cap is Lauren's to manage. Preview overflow lives on Cloudflare Pages, not Vercel.",
  "Money, sends, filings, and commitments move only on Steve's explicit word. A bare “yes” to an either/or is not approval.",
  "Chat is for real-time only. The Linear issue is the record — create → assign → delegate → decide → close.",
  "When work overlaps a lane Lauren is actively handling, bots don't freelance — Lauren coordinates.",
  "Continuous offload: as Lauren finds work Grokbot can handle separately and just as well, she files the task order and tells Steve. Her capacity stays on work that needs thought.",
];

const KILL_SWITCHES: { trigger: string; action: string }[] = [
  { trigger: "Lauren comments “PAUSE <lane>”", action: "Bot stops at the next run/batch boundary and confirms pause in a comment within 30 minutes." },
  { trigger: "Steve says “stop” anywhere", action: "Immediate halt across all lanes, confirmation in chat." },
  { trigger: "Gate violation detected (send / publish / spend / commit)", action: "Lauren revokes the lane immediately, rolls back if possible, notifies Steve the same day." },
];

/* ------------------------------------------------------------------ */
/* Small presentational pieces                                         */
/* ------------------------------------------------------------------ */

function LayerNode({ n, name, sub, tone }: { n: string; name: string; sub: string; tone: string }) {
  return (
    <div className={`rounded-xl border px-4 py-3 ${tone}`}>
      <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">{n}</p>
      <p className="mt-1 text-sm font-semibold leading-tight">{name}</p>
      <p className="mt-1 text-xs text-muted-foreground leading-snug">{sub}</p>
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
          The orchestration <span className="text-gradient">stack.</span>
        </>
      }
      intro="Five layers, one chain of command. Steve sets direction; Lauren (COO) is the singular interface and owns every layer beneath her; Grokbot executes the mechanical work via scoped task orders; platforms are the substrate, each earning its place. Ruling final per Steve's 2026-10-14 org order — supersedes the 19:45 two-lead reconciliation."
      updated="2026-10-14"
    >
      {/* 00 — Who's who */}
      <section className="space-y-6">
        <SectionHead n="00" sub="The personalities and roles, defined. One page each — the name is the contract.">
          Who's <span className="text-gradient">who.</span>
        </SectionHead>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { to: "/scaffolding/organization/lauren", name: "⚡ Lauren", role: "COO · L1 Command", blurb: "The singular interface. Head of ingestion — everything funnels through her." },
            { to: "/scaffolding/organization/oscar", name: "Oscar", role: "The ops arm", blurb: "One entity, two faces: the work engine and the chatbot Steve talks to." },
            { to: "/scaffolding/organization/grokbot", name: "Grokbot (GB)", role: "Worker agents", blurb: "Lauren's internal name for workers inside the Oscar arm. Not a separate entity." },
            { to: "/scaffolding/organization/c3peeleo", name: "@c3peeleo", role: "Shelved X account", blurb: "The broken-robot character. Dead until Steve resurrects it." },
          ].map((p) => (
            <Link key={p.to} to={p.to} className="panel group p-5 transition-colors hover:border-foreground/40">
              <p className="font-semibold text-foreground group-hover:underline">{p.name}</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">{p.role}</p>
              <p className="mt-2 text-sm text-muted-foreground">{p.blurb}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* 01 — The stack */}
      <section className="space-y-6">
        <SectionHead n="01" sub="Read top-down: authority flows down, results flow up. Nothing skips a layer.">
          The stack, <span className="text-gradient">five layers.</span>
        </SectionHead>
        <div className="panel space-y-3 p-6">
          <LayerNode n="L0 · Principal" name="Steve Peele II" sub="Sets direction. Final calls. Owns all gates: money, sends, filings, commitments, identity — explicit word only." tone="border-foreground/40 bg-foreground/[0.07]" />
          <p className="text-center text-xs text-muted-foreground">▼ conversation — terse is fine</p>
          <LayerNode n="L1 · Command" name="Lauren (COO) — singular interface" sub="Owns judgment, voice, dev, and triage. Every request flows through her; every result flows back through her. Singular source of truth." tone="border-sky-400/40 bg-sky-400/[0.07]" />
          <p className="text-center text-xs text-muted-foreground">▼ task orders (Linear) · charters · crons</p>
          <div className="grid gap-3 md:grid-cols-3">
            <LayerNode n="L2 · Arm" name="Grokbot execution team" sub="The thousand ICs. Mechanical work via seven-field task orders (PLX-481–488). Eyes and hands, never voice." tone="border-amber-400/40 bg-amber-400/[0.07]" />
            <LayerNode n="L2 · Arm" name="Side-chat exec leaders" sub="Atelier (design), Oscar (hunt lane), Spencer (presence) — specialized functions, Lauren's direct reports." tone="border-border/60 bg-foreground/[0.02]" />
            <LayerNode n="L2 · Arm" name="Cron / automation layer" sub="Deploy watchers, changelog updater, docket digest, buyer watch, issue watch — silent when clean." tone="border-border/60 bg-foreground/[0.02]" />
          </div>
          <p className="text-center text-xs text-muted-foreground">▼ scoped lanes, each a standing Linear issue</p>
          <LayerNode n="L3 · Lanes" name="8 task-order lanes" sub="Inbox triage · CRM hygiene · research sweeps · draft prep · daily brief builder · meeting prep packets · lead lists · social listening. §04 for the full contracts." tone="border-border/60 bg-foreground/[0.02]" />
          <p className="text-center text-xs text-muted-foreground">▼ runs on</p>
          <LayerNode n="L4 · Platforms" name="The substrate" sub="Vercel · GitHub · Supabase · Sanity · Segment · Linear · HubSpot · Grok/xAI · Dropbox · Todoist · ElevenLabs. Each with its carrot — §06." tone="border-border/60 bg-foreground/[0.02]" />
        </div>
        <div className="panel p-5">
          <p className="font-semibold">The governing principle — resource economics</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Lauren's tokens and attention are the scarce resource. Mechanical, repetitive, low-judgment work offloads
            to Grokbot so her capacity stays on work that needs thought — sequenced by burn, highest first.
            Continuous offload is standing: whenever she catches herself doing work Grokbot can handle separately
            and just as well, she files the task order and tells Steve. He never interfaces with Grokbot directly;
            if Grokbot needs something from him, it comes through her.
          </p>
        </div>
      </section>

      {/* 02 — Execution arms */}
      <section className="space-y-6">
        <SectionHead n="02" sub="L2 — Lauren's three direct reports. Each has a defined shape; none freelances.">
          Execution <span className="text-gradient">arms.</span>
        </SectionHead>
        <div className="grid gap-4 lg:grid-cols-3">
          {ARMS.map((a) => (
            <div key={a.name} className="panel p-5">
              <p className={`font-semibold ${a.tone}`}>{a.name}</p>
              <p className="mt-1 text-xs text-muted-foreground">{a.what}</p>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {a.how.map((h, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-foreground/40">·</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* 03 — The lanes */}
      <section className="space-y-6">
        <SectionHead n="03" sub="L3 — the eight standing lanes. Each is a seven-field task order in P-PLX-33: named bot, exact inputs, output format + destination, approval boundary, escalation path, success metric, kill switch.">
          The eight <span className="text-gradient">lanes.</span>
        </SectionHead>
        <DocTable
          head={["Issue", "Lane", "Cadence", "Inputs → outputs", "Boundary"]}
          rows={LANES.map((l) => [l.issue, l.lane, l.cadence, l.io, l.boundary])}
        />
        <p className="text-xs text-muted-foreground">
          Named-bot assignment pending the Grokbot inventory survey (no API — browser only). Full contracts:{" "}
          <span className="font-mono">~/workspace/oscar/grokbot-handoff-protocol.md</span>
        </p>
      </section>

      {/* 04 — Triage runbook */}
      <section className="space-y-6">
        <SectionHead n="04" sub="Triage is a documented operation, not a vibe. Intake → classify → route → audit, every time.">
          The triage <span className="text-gradient">runbook.</span>
        </SectionHead>
        <div className="panel p-5">
          <p className="font-semibold">Intake channels — where work arrives</p>
          <ul className="mt-3 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
            <li><span className="text-foreground">Steve in chat</span> — the primary channel. Terse is fine; she triages.</li>
            <li><span className="text-foreground">Linear comments</span> — on-demand lane runs, REVIEW approvals, escalations.</li>
            <li><span className="text-foreground">Cron / watcher outputs</span> — deploy alerts, buyer watch, docket digest, issue watch.</li>
            <li><span className="text-foreground">Grokbot escalations</span> — P1 flags and REVIEW items surface via lane issues.</li>
          </ul>
        </div>
        <div className="panel space-y-0 divide-y divide-border/60">
          {[
            ["1 · Hard gate?", "Money, a send, a filing, or a commitment?", "→ Nothing moves without Steve's explicit word. A bare “yes” to an either/or is not approval."],
            ["2 · Mechanical & repeatable?", "Triage, hygiene, research, drafts, brief inputs, prep packets, listening, lead lists?", "→ Grokbot via a seven-field task order in P-PLX-33. Lauren reviews output before it reaches Steve."],
            ["3 · Judgment, voice, or build?", "Dev, creative, comms in his voice, strategy, anything public-facing?", "→ Lauren. She confirms, executes, and serves the refined result."],
            ["4 · Ambiguous / overlap?", "Touches multiple arms, or unclear whose it is?", "→ Lauren triages as the single point of contact. She coordinates — arms don't freelance on work she's handling."],
          ].map(([step, q, out]) => (
            <div key={step} className="grid gap-2 px-5 py-4 sm:grid-cols-[150px_1fr_1fr]">
              <p className="text-sm font-semibold text-foreground">{step}</p>
              <p className="text-sm text-muted-foreground">{q}</p>
              <p className="text-sm text-foreground">{out}</p>
            </div>
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="panel p-5">
            <p className="font-semibold">Routing — first match wins</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>· Gate → <span className="text-foreground">Steve</span> (explicit word required)</li>
              <li>· Mechanical → <span className="text-foreground">Grokbot lane</span> (matching PLX-481–488, or a new seven-field issue)</li>
              <li>· Judgment / build / voice → <span className="text-foreground">Lauren</span> directly</li>
              <li>· New recurring mechanical work → <span className="text-foreground">new lane</span> (continuous offload)</li>
            </ul>
          </div>
          <div className="panel p-5">
            <p className="font-semibold">SLAs & audit</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>· P1 escalation → Lauren same run; pause confirmed within 30 min</li>
              <li>· REVIEW items (CRM hygiene) → approved or rejected same day</li>
              <li>· Daily monitoring checklist runs after the 06:00 brief handoff</li>
              <li>· Spot-check one lane per day, rotating — gate violations kill the lane same day</li>
              <li>· P-PLX-33 is the audit trail. Chat is real-time only.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 05 — Platforms & carrots */}
      <section className="space-y-6">
        <SectionHead n="05" sub="L4 — the substrate. Every platform lists its carrot: the concrete value that earns its place. No carrot, no platform.">
          Platforms & <span className="text-gradient">their carrots.</span>
        </SectionHead>
        {PLATFORMS.map((g) => (
          <div key={g.group} className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{g.group}</p>
            <DocTable
              head={["Platform", "Role", "Carrot — why it stays", "Owner", "Constraint"]}
              rows={g.rows.map((r) => [r.platform, r.role, r.carrot, r.owner, r.constraint || "—"])}
            />
          </div>
        ))}
      </section>

      {/* 06 — Handoffs */}
      <section className="space-y-6">
        <SectionHead n="06" sub="Four links, one chain. Authority flows down; results flow up; nothing skips Lauren.">
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
            <span className="text-foreground">Assign</span> → the arm doing the work owns it.{" "}
            <span className="text-foreground">Delegate</span> → Lauren writes the seven-field task order, sets the due date.{" "}
            <span className="text-foreground">Decide</span> → issues labeled decision carry options + a recommendation; nothing moves without his word.{" "}
            <span className="text-foreground">Close</span> → Done only when the outcome is delivered, not when work starts. Comments replace side-channel DMs.
          </p>
          <p className="mt-3 text-sm">
            <StatusPill status="Active" /> <span className="text-muted-foreground">P-PLX-33 is the book of record for every handoff.</span>
          </p>
        </div>
      </section>

      {/* 07 — Rules & kill switches */}
      <section className="space-y-6">
        <SectionHead n="07" sub="Load-bearing. These don't bend for urgency, convenience, or momentum.">
          Hard rules & <span className="text-gradient">kill switches.</span>
        </SectionHead>
        <div className="panel divide-y divide-border/60">
          {HARD_RULES.map((r, i) => (
            <p key={i} className="px-5 py-3 text-sm text-muted-foreground">
              <span className="mr-2 font-semibold text-foreground">{String(i + 1).padStart(2, "0")}</span>
              {r}
            </p>
          ))}
        </div>
        <DocTable
          head={["Kill switch", "What happens"]}
          rows={KILL_SWITCHES.map((k) => [k.trigger, k.action])}
        />
      </section>

      {/* 08 — Lauren's direct stack */}
      <section className="space-y-6">
        <SectionHead n="08" sub="What stays with Lauren no matter what: the judgment layer and the capabilities she wields directly.">
          Lauren's direct <span className="text-gradient">stack.</span>
        </SectionHead>
        <DocTable
          head={["Area she keeps", "Scope"]}
          rows={LAUREN_KEEPS.map((t) => [t.area, t.scope])}
        />
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
        <p className="text-xs text-muted-foreground">
          Sources: 2026-10-14 reconciliation (~19:45–20:40 ET) · 2026-10-14 org order (~22:08 ET — Lauren COO,
          Grokbot execution team beneath; supersedes the two-lead model) · handoff protocol{" "}
          <span className="font-mono">~/workspace/oscar/grokbot-handoff-protocol.md</span> · lanes{" "}
          <span className="font-mono">PLX-481–488</span> · ops companion{" "}
          <Link to="/scaffolding/ops" className="underline hover:text-foreground">/scaffolding/ops</Link> · part of the
          Scaffolding + Architecture program — see also{" "}
          <Link to="/scaffolding/architecture" className="underline hover:text-foreground">Architecture</Link>.
        </p>
      </section>
    </ScaffoldingShell>
  );
}
