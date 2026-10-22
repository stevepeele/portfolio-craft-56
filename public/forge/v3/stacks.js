// Forge v3 — Stack Marketplace template database
// Plain, opinionated defaults. Boring on purpose — boring ships.
window.FORGE_STACKS = [
  {
    id: "saas-starter",
    name: "SaaS Starter",
    author: "Forge (curated)",
    source: "curated",
    type: "Web app",
    blurb: "The default rig for a subscription web app with accounts, billing-ready structure, and an admin view. Fits a solo builder shipping a paid tool to a first hundred users.",
    rows: [
      { area: "Frontend", choice: "Next.js on Vercel", why: "Server rendering, routing, and API routes in one repo — no separate backend to babysit on day one." },
      { area: "Database", choice: "Supabase Postgres", why: "Real Postgres with row-level security, so tenant isolation is enforced in the database, not just in app code." },
      { area: "Auth", choice: "Supabase Auth", why: "Email, magic link, and OAuth in one service that already talks to your database rules." },
      { area: "Storage", choice: "Supabase Storage", why: "User uploads sit next to the database with the same permission model — no second storage bill or policy system." },
      { area: "Deploy", choice: "GitHub → Vercel", why: "Every push gets a preview URL, so you review the real thing before it is live." },
      { area: "Analytics", choice: "PostHog", why: "Product events, funnels, and feature flags in one tool — you learn what users do, not just that they arrived." },
      { area: "Email", choice: "Resend", why: "Transactional email with a clean API and templates in code, not buried in a marketing platform." }
    ],
    tierNote: {
      MVP: "One Next.js app, one Supabase project, no background jobs — ship the core workflow only.",
      Functional: "Add Stripe billing, roles and permissions, audit logging, and scheduled cleanup jobs.",
      Scalable: "Split heavy work into queues, add read replicas and caching, and put rate limits in front of the API."
    },
    forks: 312,
    uses: 1480
  },
  {
    id: "two-sided-marketplace",
    name: "Two-Sided Marketplace",
    author: "Forge (curated)",
    source: "curated",
    type: "Marketplace",
    blurb: "For buyers and sellers in the same product: listings, search, messaging, and payouts-ready data. Fits marketplaces where supply is curated first and demand follows.",
    rows: [
      { area: "Frontend", choice: "Next.js on Vercel", why: "Listing pages need SEO and fast first paint, while dashboards need app speed — Next.js does both in one codebase." },
      { area: "Database", choice: "Supabase Postgres", why: "Model buyers, sellers, listings, and orders as separate tables from day one — a two-sided model retrofitted later is painful." },
      { area: "Auth", choice: "Supabase Auth", why: "One login, two roles: buyer and seller permissions are checked by row-level security on every table." },
      { area: "Storage", choice: "Supabase Storage", why: "Listing photos live in public buckets with private buckets reserved for identity and payout documents." },
      { area: "Deploy", choice: "GitHub → Vercel", why: "Preview deploys let you test both sides of a transaction before either side sees it live." },
      { area: "Analytics", choice: "PostHog", why: "Track supply and demand as separate funnels — a marketplace fails when one side grows and the other stalls." },
      { area: "Jobs", choice: "Supabase Edge Functions + pg_cron", why: "Payout calculations, listing expiry, and notification digests run on a schedule without a separate worker fleet." }
    ],
    tierNote: {
      MVP: "Manual seller onboarding, no in-app payments — take the transaction off-platform or invoice it while you prove demand.",
      Functional: "Add Stripe Connect payouts, in-app messaging, reviews, and dispute flags on orders.",
      Scalable: "Add dedicated search (Typesense or Algolia), fraud checks, and separate read models for listing discovery."
    },
    forks: 248,
    uses: 910
  },
  {
    id: "booking-scheduling-rig",
    name: "Booking & Scheduling Rig",
    author: "Forge (curated)",
    source: "curated",
    type: "Booking & scheduling",
    blurb: "Availability, booking, reminders, and no-show handling for services that sell time. Fits coaches, studios, clinics, and field services that live or die by the calendar.",
    rows: [
      { area: "Frontend", choice: "Next.js on Vercel", why: "A public booking page that loads fast on a phone matters more than any dashboard feature." },
      { area: "Database", choice: "Supabase Postgres", why: "Availability and bookings are relational by nature — exclusion constraints in Postgres prevent double-booking at the database level." },
      { area: "Auth", choice: "Supabase Auth", why: "Customers book as guests or with a magic link; staff get full accounts and calendar-level permissions." },
      { area: "Deploy", choice: "GitHub → Vercel", why: "Calendar changes ship safely with preview deploys you can test against a copy of real availability." },
      { area: "Analytics", choice: "PostHog", why: "Watch the booking funnel step by step — most drop-off is one confusing screen, and this finds it." },
      { area: "Email", choice: "Resend", why: "Confirmations, reminders, and reschedule notices are the product here — transactional email gets its own reliable channel, not a newsletter tool." },
      { area: "Jobs", choice: "Supabase Edge Functions + pg_cron", why: "Reminder sends, no-show marking, and slot release run on schedule even when nobody has the app open." }
    ],
    tierNote: {
      MVP: "One calendar, one service, email reminders only — prove people will book before you automate anything else.",
      Functional: "Add multiple staff calendars, deposits via Stripe, SMS reminders, and waitlists for full slots.",
      Scalable: "Add timezone-safe recurring rules, resource booking (rooms, gear), and sync with external calendars both ways."
    },
    forks: 186,
    uses: 720
  },
  {
    id: "content-media-engine",
    name: "Content & Media Engine",
    author: "Forge (curated)",
    source: "curated",
    type: "Content & media",
    blurb: "Publish fast, get found, and keep the archive portable. Fits newsletters, publications, course libraries, and media brands where the content is the product.",
    rows: [
      { area: "Frontend", choice: "Next.js on Vercel (static-first)", why: "Content pages render static and cache at the edge — fast everywhere, cheap at any traffic level." },
      { area: "Database", choice: "Supabase Postgres", why: "Posts, authors, tags, and paywall state in one queryable store — your archive is data, not trapped in a page builder." },
      { area: "Auth", choice: "Supabase Auth", why: "Magic-link sign-in for subscribers and members; no passwords for readers to forget or leak." },
      { area: "Storage", choice: "Supabase Storage + CDN", why: "Images and media served from the edge with transformations, instead of hot-linking files from an editor's laptop." },
      { area: "Deploy", choice: "GitHub → Vercel", why: "Editorial changes and code changes ship through the same pipeline, with previews editors can actually read." },
      { area: "Analytics", choice: "PostHog", why: "See which articles drive signups, not just pageviews — vanity traffic does not pay for the next article." },
      { area: "Email", choice: "Resend", why: "New-post alerts and member mail run as transactional sends with deliverability you can inspect." }
    ],
    tierNote: {
      MVP: "Static pages, one author, free archive — publish on a cadence before you build any member features.",
      Functional: "Add paid memberships, gated posts, comments, and a proper editorial workflow with drafts and review.",
      Scalable: "Add full-text search, recommendations, multiple publications on one backend, and media transcoding pipelines."
    },
    forks: 204,
    uses: 860
  },
  {
    id: "ai-tool-wrapper",
    name: "AI Tool Wrapper",
    author: "Forge (curated)",
    source: "curated",
    type: "AI tool",
    blurb: "A focused tool around a model API: accounts, usage limits, saved outputs, and a docs front door. Fits single-job AI utilities where cost control matters as much as output quality.",
    rows: [
      { area: "Frontend", choice: "Next.js on Vercel", why: "The app shell and the API routes live together, so streaming responses and usage checks stay in one place." },
      { area: "Database", choice: "Supabase Postgres", why: "Prompts, outputs, and per-user usage counters in Postgres give you a real cost ledger, not a guess." },
      { area: "Auth", choice: "Supabase Auth", why: "Every model call maps to a user and a quota — anonymous unlimited access is how AI tools go broke." },
      { area: "Storage", choice: "Supabase Storage", why: "Generated files and uploads are stored per user with signed URLs, so outputs stay private by default." },
      { area: "Deploy", choice: "GitHub → Vercel", why: "Ship prompt and UI changes together, with previews you can test against real model calls before launch." },
      { area: "Analytics", choice: "PostHog", why: "Track cost per feature and per cohort alongside usage — you need margin visibility, not just engagement." },
      { area: "Jobs", choice: "Supabase Edge Functions + pg_cron", why: "Long generations, retries, and usage resets run as background jobs instead of blocking the request." }
    ],
    tierNote: {
      MVP: "One model, one job, hard usage caps per user, no fine-tuning — wrap the API well before you train anything.",
      Functional: "Add Stripe usage billing, saved history, team workspaces, and a public docs page for the API surface.",
      Scalable: "Add request queues, model routing by cost and quality, caching for repeat inputs, and abuse detection."
    },
    forks: 367,
    uses: 1620
  },
  {
    id: "community-board",
    name: "Community Board",
    author: "Forge (curated)",
    source: "curated",
    type: "Community",
    blurb: "Posts, replies, profiles, and moderation basics for a focused community that is not trying to be a social network. Fits niche forums, member clubs, and course cohorts.",
    rows: [
      { area: "Frontend", choice: "Next.js on Vercel", why: "Threads need shareable URLs and fast loads for logged-out readers, plus app speed for members — one framework covers both." },
      { area: "Database", choice: "Supabase Postgres", why: "Posts, votes, and follows are joins all the way down; Postgres handles the graph without a special database." },
      { area: "Auth", choice: "Supabase Auth", why: "OAuth and magic-link sign-in lower the barrier to a first post, which is where communities live or die." },
      { area: "Storage", choice: "Supabase Storage", why: "Avatars and post images with per-user policies — members only ever touch their own files." },
      { area: "Deploy", choice: "GitHub → Vercel", why: "Moderation and posting fixes ship in minutes with previews, which matters when a thread is going sideways." },
      { area: "Analytics", choice: "PostHog", why: "Measure lurkers-to-posters conversion and thread depth — raw signups tell you nothing about health." },
      { area: "Email", choice: "Resend", why: "Reply notifications and weekly digests bring people back; that loop is the retention engine." }
    ],
    tierNote: {
      MVP: "One board, text posts only, manual moderation — a small room with clear rules beats empty features.",
      Functional: "Add categories, rich profiles, reply notifications, reporting, and moderator roles with an action log.",
      Scalable: "Add realtime updates, full-text search, rate limits and spam scoring, and digest personalization."
    },
    forks: 142,
    uses: 540
  },
  {
    id: "metrics-dashboard-rig",
    name: "Metrics Dashboard Rig",
    author: "Forge (curated)",
    source: "curated",
    type: "Data & dashboards",
    blurb: "Ingest numbers on a schedule, store them clean, and show charts people trust. Fits client reporting, internal ops boards, and product metrics for small teams.",
    rows: [
      { area: "Frontend", choice: "Vite + React on Vercel", why: "A dashboard is a pure app with no SEO needs — Vite keeps the build simple and the bundle small." },
      { area: "Database", choice: "Supabase Postgres", why: "Metrics land in typed tables with views for each chart, so the frontend reads answers, not raw event soup." },
      { area: "Auth", choice: "Supabase Auth", why: "Row-level security scopes every query to the viewer's accounts — clients only ever see their own numbers." },
      { area: "Deploy", choice: "GitHub → Vercel", why: "Chart changes are low-risk and frequent; push-to-deploy with previews keeps the loop tight." },
      { area: "Analytics", choice: "PostHog", why: "Track which charts people actually open and export — unused reports get cut, not maintained forever." },
      { area: "Jobs", choice: "Supabase Edge Functions + pg_cron", why: "Source pulls, rollups, and freshness checks run on a schedule, so the board is current before anyone opens it." },
      { area: "Email", choice: "Resend", why: "Scheduled summary emails put the headline numbers in inboxes for people who will never log in." }
    ],
    tierNote: {
      MVP: "One data source, nightly import, five charts maximum — a board people trust beats a wall of widgets.",
      Functional: "Add hourly sync, date-range comparisons, CSV exports, and per-client branded views.",
      Scalable: "Add materialized rollups, alerting on thresholds, a warehouse export, and realtime tiles where freshness pays."
    },
    forks: 178,
    uses: 690
  },
  {
    id: "indie-saas-on-a-budget",
    name: "Indie SaaS on a Budget",
    author: "maya-builds",
    source: "community",
    type: "Web app",
    blurb: "A stripped-down SaaS rig that stays on free tiers until revenue shows up. Built for a side project with paying users but no budget for infrastructure sprawl.",
    rows: [
      { area: "Frontend", choice: "Vite + React on Vercel (free tier)", why: "No server rendering to pay for — a static app on the free tier handles early traffic fine." },
      { area: "Database", choice: "Supabase Postgres (free tier)", why: "Free Postgres with auth included removes the two bills a solo project feels first." },
      { area: "Auth", choice: "Supabase Auth", why: "Magic links only — no password reset flow to build, support, or secure." },
      { area: "Storage", choice: "Supabase Storage (free tier)", why: "Keeps everything in one free project instead of adding a separate storage account." },
      { area: "Deploy", choice: "GitHub → Vercel", why: "Push to deploy, no CI bill, no server to patch at midnight." },
      { area: "Analytics", choice: "PostHog (free tier)", why: "Generous free event volume covers the stage where you are still learning what the product is." }
    ],
    tierNote: {
      MVP: "Free tiers everywhere, one feature, a payment link instead of integrated billing.",
      Functional: "Move to paid Supabase and Vercel tiers the month MRR covers them — not before.",
      Scalable: "Rebuild the frontend as Next.js only when SEO or server rendering becomes a real requirement."
    },
    forks: 54,
    uses: 238
  },
  {
    id: "realtime-ops-dashboard",
    name: "Realtime Ops Dashboard",
    author: "ironpine-dev",
    source: "community",
    type: "Data & dashboards",
    blurb: "A live board for operations that change by the minute: orders, jobs, vehicles, or queues. Built where a five-minute-old number is a wrong number.",
    rows: [
      { area: "Frontend", choice: "Vite + React on Vercel", why: "A single-page app subscribed to live updates — no page loads between the event and the screen." },
      { area: "Database", choice: "Supabase Postgres", why: "State changes write once to Postgres and fan out from there, keeping a single source of truth." },
      { area: "Auth", choice: "Supabase Auth", why: "Ops roles map to row-level security, so dispatchers, drivers, and viewers each see their slice." },
      { area: "Deploy", choice: "GitHub → Vercel", why: "Frontend ships independently of the data pipeline, so display fixes never restart ingestion." },
      { area: "Analytics", choice: "PostHog", why: "Used sparingly here — to see which live tiles the team actually watches during a shift." },
      { area: "Jobs", choice: "Supabase Realtime + Edge Functions", why: "Realtime subscriptions push row changes to the board instantly, while Edge Functions handle webhooks from outside systems." }
    ],
    tierNote: {
      MVP: "Poll every 15 seconds instead of true realtime — simpler, and honest about the freshness on screen.",
      Functional: "Switch hot tables to Supabase Realtime, add stale-data indicators and an event history view.",
      Scalable: "Add a dedicated event stream, partitioned time-series tables, and retention jobs for old operational data."
    },
    forks: 37,
    uses: 149
  },
  {
    id: "small-commerce-storefront",
    name: "Small-Commerce Storefront",
    author: "cincy-makes",
    source: "community",
    type: "Commerce",
    blurb: "A lean storefront for a small catalog — tens of products, not thousands. Built for a maker selling direct without renting a heavyweight commerce platform.",
    rows: [
      { area: "Frontend", choice: "Next.js on Vercel", why: "Product pages need search visibility and fast mobile loads; checkout stays hosted so you never touch card data." },
      { area: "Database", choice: "Supabase Postgres", why: "Products, variants, and orders in plain tables you own — inventory logic stays readable and exportable." },
      { area: "Auth", choice: "Supabase Auth", why: "Guest checkout first, accounts optional for order history — accounts are a retention tool, not a gate." },
      { area: "Storage", choice: "Supabase Storage", why: "Product photos in a public bucket with CDN delivery, organized per product from the start." },
      { area: "Deploy", choice: "GitHub → Vercel", why: "Sale pages and price changes go live in minutes with a preview the owner can approve from a phone." },
      { area: "Analytics", choice: "PostHog", why: "See where carts die — product page, shipping reveal, or payment — before spending on ads." },
      { area: "Email", choice: "Resend", why: "Order confirmations, shipping notices, and abandoned-cart nudges from one transactional sender." }
    ],
    tierNote: {
      MVP: "Stripe payment links per product, manual fulfillment, no cart — sell the first ten orders the simple way.",
      Functional: "Add a real cart, discount codes, inventory counts, and automated order and shipping emails.",
      Scalable: "Add variant-level inventory, preorders, a wholesale price tier, and feeds to external marketplaces."
    },
    forks: 48,
    uses: 201
  }
];
// FORGE_STACKS_END
