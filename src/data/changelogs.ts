export type ChangelogEntry = {
  date: string;
  type: "ship" | "update" | "fix" | "launch";
  title: string;
  detail: string;
  issueId?: string;
};

export const changelogs: Record<string, ChangelogEntry[]> = {
  binsly: [
    {
      date: "2026-10-13",
      type: "ship",
      title: "X bookmarks import",
      detail:
        "Shipped the Binsly X bookmarks import: bookmark.js parsing, URL unfurling, batch import pipeline, duplicate detection, AI summaries, and an x-bookmarks tag. The AI summaries are pending until the Base44 integration-credits balance is topped up.",
      issueId: "PLX-255",
    },
    {
      date: "2026-10-09",
      type: "fix",
      title: "Login/register header fix",
      detail:
        "Fixed the login/register header on the Binsly app and verified it live at linklib.base44.app.",
    },
    {
      date: "2026-10-09",
      type: "ship",
      title: "Facebook login live",
      detail:
        "Facebook login went live on Binsly; X login was ruled impossible on Base44, so it stays Facebook-only for now.",
    },
    {
      date: "2026-10-08",
      type: "update",
      title: "Evernote-influenced site restyle",
      detail:
        "Restyled all public pages — warm cream #F9F6F2 sections, one pastel accent per section, Baloo 2 headlines, black pill CTAs, mixed-media collage illustrations — while keeping the Binsly rose brand and core copy. Published live at linklib.base44.app.",
    },
    {
      date: "2026-10-08",
      type: "ship",
      title: "Marketing videos on the homepage",
      detail:
        "Delivered a 60-second hero product video plus a 10s spot, a 30s promo, and four 20-second premium-feature videos (Save from anywhere, AI files it for you, the calm reader, Binsly Pro). They autoplay muted inline and open a lightbox with audio + full controls on click.",
    },
    {
      date: "2026-10-08",
      type: "update",
      title: "Roadmap graphics + chat split live",
      detail:
        "Six high-fidelity roadmap illustrations added to the roadmap post and verified live; the HubSpot chat was split into a signed-out 'BIN FLOW' and a signed-in 'Binsly App Support' flow.",
    },
  ],
  profolio: [
    {
      date: "2026-10-14",
      type: "update",
      title: "Custom landing-page visuals",
      detail:
        "Custom dark-editorial hero visual plus two feature illustrations (capture-the-work, package-for-every-audience) generated to the parchment-on-near-black brand. Segment installed, SPIIX banner removed, Meet SPII corner card added. Deploy staged pending the Vercel quota reset — must go via API upload since the Vercel project is git-linked to the main-site repo.",
      issueId: "PLX-360",
    },
    {
      date: "2026-10-14",
      type: "update",
      title: "Moved to profolioapp.stevepeeleii.com",
      detail:
        "Assigned the clean profolioapp.stevepeeleii.com subdomain after the original profolio subdomain proved locked by a GoDaddy Website Builder product; GoDaddy CNAME added, old URLs keep working.",
      issueId: "PLX-321",
    },
    {
      date: "2026-10-13",
      type: "fix",
      title: "Re-deployed after main-site overwrite",
      detail:
        "Main-site git deploys overwrote the manually-deployed app on the Vercel 'profolio' project; re-deployed ~/workspace/profolio/ to reclaim the URL and verified 200 with Stripe routing correctly.",
      issueId: "PLX-267",
    },
    {
      date: "2026-10-12",
      type: "ship",
      title: "Profolio v2",
      detail:
        "PDF export, improved auth flows, and per-page analytics shipped. The Vercel project was briefly serving the main site instead of the app and was reclaimed to the correct alias.",
      issueId: "PLX-175",
    },
    {
      date: "2026-10-12",
      type: "ship",
      title: "Stripe checkout live",
      detail:
        "Stripe connected and the Profolio Pro $29/yr checkout wired up via STRIPE_PRICE_ID / STRIPE_SECRET_KEY in the Vercel production env; the subscriptions migration was applied in Supabase.",
    },
    {
      date: "2026-10-11",
      type: "fix",
      title: "App restored after main-site deploy collision",
      detail:
        "A main-site deploy to the git-linked Vercel 'profolio' project overwrote the Profolio app; the 8 app files were redeployed and the app verified live again.",
    },
    {
      date: "2026-10-10",
      type: "launch",
      title: "Profolio v1 launched",
      detail:
        "Portfolio builder rebuilt from scratch with real accounts: Supabase auth, marketing site, and free/pro tiers. Live at profolio-stevepeeles-projects.vercel.app.",
    },
  ],
  "stageplot-ai": [
    {
      date: "2026-10-14",
      type: "update",
      title: "Clean subdomain: stageplot.stevepeeleii.com",
      detail:
        "StagePlot AI moved to stageplot.stevepeeleii.com as part of the clean-subdomains rollout; the old vercel.app URL remains active.",
      issueId: "PLX-321",
    },
    {
      date: "2026-10-13",
      type: "update",
      title: "HubSpot tracking installed",
      detail:
        "HubSpot tracking snippet added at source, redeployed, and verified live on the app.",
    },
    {
      date: "2026-10-12",
      type: "ship",
      title: "StagePlot AI v2",
      detail:
        "Production PDF, shareable plot links, and a drag-drop canvas shipped; backlog issues PLX-86, PLX-46, PLX-84, and PLX-43 closed alongside.",
      issueId: "PLX-176",
    },
    {
      date: "2026-10-11",
      type: "fix",
      title: "Generate bug fixed + deployed",
      detail:
        "Found and fixed the generate bug locally, then deployed and verified live — showError/renderSavedList confirmed present in the live bundle.",
    },
    {
      date: "2026-10-10",
      type: "ship",
      title: "Pro upgrade",
      detail:
        "Gig header (band/venue/date/FOH contact, prints on PDF), click-to-edit channel table cells, monitor mix auto-assignment, freeform stage notes, and named save/load via localStorage.",
    },
    {
      date: "2026-10-10",
      type: "launch",
      title: "StagePlot AI launched",
      detail:
        "First app of the sprint: input list goes in, an SVG stage plot plus channel sheet comes out, with print-to-PDF. Live on Vercel, zero dependencies.",
    },
  ],
  "monitor-mix-cheat": [
    {
      date: "2026-10-14",
      type: "update",
      title: "Clean subdomain: monitormix.stevepeeleii.com",
      detail:
        "Monitor Mix Cheat moved to monitormix.stevepeeleii.com as part of the clean-subdomains rollout; the old vercel.app URL remains active.",
      issueId: "PLX-321",
    },
    {
      date: "2026-10-13",
      type: "fix",
      title: "Content-Profile header fix; schema migration attempt reverted",
      detail:
        "Committed the Content-Profile header fix and attempted a direct-schema PostgREST cutover, but the new schema had not propagated — so it was safely reverted to the sanctioned wrapper path. The app is fully functional via wrappers (create/get/revoke smoke-tested).",
      issueId: "PLX-96",
    },
    {
      date: "2026-10-13",
      type: "update",
      title: "HubSpot tracking installed",
      detail:
        "HubSpot tracking snippet injected at source, redeployed, and verified live.",
    },
    {
      date: "2026-10-13",
      type: "update",
      title: "Deploy-watch E2E verified",
      detail:
        "A no-op redeploy posted to Slack #deploys with the git log and deploy/inspector links — confirming real-time deploy notifications work end to end.",
      issueId: "PLX-288",
    },
    {
      date: "2026-10-12",
      type: "ship",
      title: "Monitor Mix Cheat v2 launched",
      detail:
        "Share links, dark venue mode, print layout, and editable cells shipped; the Supabase schema migration pilot completed.",
      issueId: "PLX-178",
    },
    {
      date: "2026-10-12",
      type: "update",
      title: "Joined the Building nav",
      detail:
        "v2 got its own page under Building on the main site — every live app is now linked from the site.",
    },
    {
      date: "2026-10-10",
      type: "launch",
      title: "Monitor Mix Cheat launched",
      detail:
        "Input list + venue in, per-channel monitor mix starting points out. Third app of the day.",
    },
  ],
  dardo: [
    {
      date: "2026-10-14",
      type: "update",
      title: "Custom landing-page visuals",
      detail:
        "Custom editorial hero illustration (agent walking from their car toward a house at dusk) plus 'Your day, captured' and 'Your follow-ups, written' illustrations, all in the pine/cream/clay brand. Segment installed, SPIIX banners deleted, Meet SPII card added. Deploy staged pending the Vercel quota reset.",
      issueId: "PLX-361",
    },
    {
      date: "2026-10-14",
      type: "update",
      title: "Clean subdomain: dardo.stevepeeleii.com",
      detail:
        "Dardo moved to dardo.stevepeeleii.com as part of the clean-subdomains rollout; the old vercel.app URL remains active.",
      issueId: "PLX-321",
    },
    {
      date: "2026-10-13",
      type: "update",
      title: "HubSpot tracking installed",
      detail:
        "HubSpot tracking snippet added at source, redeployed, and verified live.",
      issueId: "PLX-281",
    },
    {
      date: "2026-10-12",
      type: "ship",
      title: "Dardo v2",
      detail:
        "Follow-up approval queue, expense tracking, and smarter route classification shipped; also fixed a broken magic-link redirect (the Supabase allowlist only had a stale preview URL).",
      issueId: "PLX-179",
    },
    {
      date: "2026-10-12",
      type: "update",
      title: "Auth rebuilt",
      detail:
        "Rebuilt from magic-link-only to full Sign in / Sign up / Magic link tabs plus forgot-password reset. Deployed to dardo-smoky.vercel.app with the new code verified in the live bundle.",
    },
    {
      date: "2026-10-12",
      type: "launch",
      title: "Dardo v1 launched on Vercel",
      detail:
        "The AI day-sidekick for real estate agents went live: one-tap photo/voice capture, passive mileage tracking, and an AI evening brief. Supabase auth in, PostHog wired, backlog seeded.",
      issueId: "PLX-143",
    },
    {
      date: "2026-10-09",
      type: "launch",
      title: "Base44 prototype live",
      detail:
        "First working prototype of the $4.99/mo agent day-sidekick published at dardo-agent-flow.base44.app; comprehensive Base44 build guidance and a productization playbook delivered alongside.",
    },
  ],
  stampd: [
    {
      date: "2026-10-14",
      type: "update",
      title: "Custom landing-page visuals",
      detail:
        "Three custom stamp-motif illustrations (hero rubber-stamp STAMPED on a time card, START button with ON THE CLOCK stamp, pay record stamped PAID RIGHT) as responsive WebP. Segment installed, HubSpot loader removed, SPIIX slim banners removed, Meet SPII card added. Deploy staged pending the Vercel quota reset.",
      issueId: "PLX-359",
    },
    {
      date: "2026-10-14",
      type: "update",
      title: "Clean subdomain: stampd.stevepeeleii.com",
      detail:
        "Stampd moved to stampd.stevepeeleii.com as part of the clean-subdomains rollout; the old vercel.app URL remains active.",
      issueId: "PLX-321",
    },
    {
      date: "2026-10-13",
      type: "update",
      title: "HubSpot tracking installed",
      detail:
        "HubSpot tracking snippet added at source, redeployed, and verified live.",
      issueId: "PLX-284",
    },
    {
      date: "2026-10-12",
      type: "ship",
      title: "Stampd v3",
      detail:
        "Multi-rate + overtime pay, crew view, and a 3-tap shift-start flow shipped.",
      issueId: "PLX-180",
    },
    {
      date: "2026-10-12",
      type: "ship",
      title: "Stampd v2",
      detail:
        "Accounts with Supabase auth (email/password + magic link, per-user RLS, one-tap localStorage import), CSV + PDF exports with date-range picker, user-defined work types and locations with pay totals, and employer share links (/share/<token>, public read-only, revocable). The product definition was refined in-app.",
      issueId: "PLX-157",
    },
    {
      date: "2026-10-12",
      type: "launch",
      title: "Stampd v1 launched on Vercel",
      detail:
        "Clock in/out with live pay math and localStorage persistence; the $29 paywall remains stubbed.",
      issueId: "PLX-124",
    },
  ],
  "repurpose-engine": [
    {
      date: "2026-10-14",
      type: "update",
      title: "Clean subdomain: repurpose.stevepeeleii.com",
      detail:
        "Repurpose Engine moved to repurpose.stevepeeleii.com as part of the clean-subdomains rollout; the old vercel.app URL remains active.",
      issueId: "PLX-321",
    },
    {
      date: "2026-10-12",
      type: "ship",
      title: "Repurpose Engine v2",
      detail:
        "History + favorites, tone presets, guardrails, and a real /api/generate LLM route (OpenAI gpt-4o-mini, channel-specific prompts, tone preset + saved brand voice, fresh-angle regenerate) went live — the demo-mode asterisk is gone and it lights up fully once OPENAI_API_KEY lands in the Vercel env. Backlog issues PLX-137, PLX-134, PLX-136, PLX-116, PLX-115, and PLX-114 closed alongside.",
      issueId: "PLX-181",
    },
    {
      date: "2026-10-12",
      type: "launch",
      title: "Repurpose Engine v1 launched on Vercel",
      detail:
        "Content repurposer live with demo mode and PostHog wired in.",
      issueId: "PLX-130",
    },
  ],
  gigsplit: [
    {
      date: "2026-10-14",
      type: "update",
      title: "Clean subdomain: gigsplit.stevepeeleii.com",
      detail:
        "GigSplit moved to gigsplit.stevepeeleii.com as part of the clean-subdomains rollout; the old vercel.app URL remains active.",
      issueId: "PLX-321",
    },
    {
      date: "2026-10-13",
      type: "update",
      title: "HubSpot tracking installed",
      detail:
        "HubSpot tracking snippet added at source, redeployed, and verified live.",
      issueId: "PLX-282",
    },
    {
      date: "2026-10-12",
      type: "ship",
      title: "GigSplit v2",
      detail:
        "Band share sheet and saved lineups shipped; account creation and user settings added per the standing build standards. Backlog issues PLX-140 and PLX-139 closed alongside.",
      issueId: "PLX-182",
    },
    {
      date: "2026-10-12",
      type: "launch",
      title: "GigSplit v1 launched on Vercel",
      detail:
        "Gig-payout splitter live on Vercel with PostHog wired and the Linear backlog seeded.",
      issueId: "PLX-120",
    },
  ],
  quotequick: [
    {
      date: "2026-10-14",
      type: "update",
      title: "Clean subdomain: quotequick.stevepeeleii.com",
      detail:
        "QuoteQuick moved to quotequick.stevepeeleii.com as part of the clean-subdomains rollout; the old vercel.app URL remains active.",
      issueId: "PLX-321",
    },
    {
      date: "2026-10-13",
      type: "update",
      title: "HubSpot tracking installed",
      detail:
        "HubSpot tracking snippet added at source, redeployed, and verified live.",
      issueId: "PLX-283",
    },
    {
      date: "2026-10-12",
      type: "ship",
      title: "QuoteQuick v2",
      detail:
        "Customers + quote history, a service catalog, and quote approval links shipped.",
      issueId: "PLX-183",
    },
    {
      date: "2026-10-12",
      type: "launch",
      title: "QuoteQuick v1 launched on Vercel",
      detail:
        "Quick-quote builder live on Vercel with PostHog wired and the Linear backlog seeded.",
      issueId: "PLX-121",
    },
  ],
  "muse-vault": [
    {
      date: "2026-10-14",
      type: "ship",
      title: "Vault Scaffolding Kits",
      detail:
        "Five pre-wired framework kits on the Vault — Morning Operating System, Content Flywheel, Job Hunt Engine, Money Autopilot, Desktop Operator — each with an interactive SVG skill map, cross-kit interconnect map, numbered orchestration steps, and a copyable kit prompt.",
      issueId: "PLX-418",
    },
    {
      date: "2026-10-14",
      type: "update",
      title: "Rebranded to Muse Vault; 98 templates live",
      detail:
        "PromptVault rebranded to Muse Vault across titles, meta, cards, and JSON-LD; all 35 recreated viral prompts published as templates-d.js — 98 total templates live with 5 trending.",
    },
    {
      date: "2026-10-14",
      type: "update",
      title: "Trending flags, card attribution, 15 viral prompts",
      detail:
        "Three templates flagged trending (Second-in-Command, Morning Briefing, Deep Research), 'Built by PromptVault' attribution added to every template card, and 15 viral prompts sourced from X.com. Deployed live.",
      issueId: "PLX-328",
    },
    {
      date: "2026-10-14",
      type: "fix",
      title: "Template filter bugs fixed + redeployed",
      detail:
        "The dead category/track filters were a stale deployed build (click handlers calling handlers that didn't exist in the bundle) — fixed and redeployed, verified live. The 'Meet SPII' corner card was added and a dismissible email capture landed.",
      issueId: "PLX-326",
    },
    {
      date: "2026-10-14",
      type: "update",
      title: "Clean subdomain: vault.stevepeeleii.com",
      detail:
        "The gallery moved to vault.stevepeeleii.com (GoDaddy CNAME added); the old vercel.app URL remains active.",
      issueId: "PLX-321",
    },
    {
      date: "2026-10-14",
      type: "ship",
      title: "PromptVault batch #2: renamed, 63 templates, About page",
      detail:
        "Muse Templates renamed to PromptVault (clearer brand, cleaner subdomain). Gallery grew from 32 to 63 templates with 30 new additions; all 63 templates got upgraded install guides; the category/track selector bug was fixed via event delegation; an About page was added.",
      issueId: "PLX-306",
    },
    {
      date: "2026-10-14",
      type: "ship",
      title: "Muse Templates v2: 32 templates, full feature set",
      detail:
        "Gallery grew from 12 to 32 templates with dual-axis browsing by format + use-case track, ratings & reviews, 3 curated collections with one-click install packs, template submission + moderation flow, versioning/changelog, trending, and full SEO.",
      issueId: "PLX-296",
    },
    {
      date: "2026-10-13",
      type: "launch",
      title: "Muse Templates launched",
      detail:
        "Public template gallery launched with 12 ready-made system prompts, skills, crons & workflows (Second-in-Command, Morning Briefing, Inbox Triage, Deep Research, and 8 more) with copy-to-clipboard install. Live at muse-templates-stevepeeles-projects.vercel.app.",
      issueId: "PLX-295",
    },
  ],
  prepwise: [
    {
      date: "2026-10-14",
      type: "update",
      title: "Custom landing-page visuals",
      detail:
        "Custom editorial hero illustration (candidate walking into an interview room) plus step illustrations in the dark/amber brand; Segment Page Viewed now fires on the splash. Deploy staged pending the Vercel quota reset.",
      issueId: "PLX-357",
    },
    {
      date: "2026-10-14",
      type: "launch",
      title: "Interview Prep AI v1 built + deployed",
      detail:
        "Branded Prepwise: resume upload (PDF/DOCX) + LinkedIn paste, job req fetch + parse, AI prep guide (likely Q&A tied to your experience, STAR story bank, questions to ask, salary talking points, company intel), printable guide, and per-user saved preps. Splash live at prepwise.stevepeeleii.com; the authed routes need a redeploy once the Vercel daily deploy limit resets.",
      issueId: "PLX-339",
    },
  ],
};
