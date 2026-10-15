import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { LinearDashboard } from "@/components/linear-dashboard";

const title = "Scaffolding — Architecture | Steve Peele II";
const description =
  "Private reference: portfolio architecture diagrams, data map, per-app properties, live app directory, and the runbook. Unlisted.";

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

const TOPO_SVG = `<svg viewBox="0 0 1280 1310" width="100%" xmlns="http://www.w3.org/2000/svg" role="img"><rect x="0" y="0" width="1280" height="1310" rx="12" fill="#0e0f11" stroke="#2a2e35" stroke-width="1" /><text x="30" y="36" font-size="17" fill="#e8e6df" text-anchor="start" font-weight="700" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >System topology — who talks to what</text><text x="30" y="56" font-size="11" fill="#9aa0a8" text-anchor="start" font-weight="normal" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >as of 2026-10-12 · lines are live integrations; the DB strip inside each app box shows its data home</text><rect x="30" y="120" width="200" height="64" rx="8" fill="#17191d" stroke="#2a2e35" stroke-width="1" /><text x="44" y="144" font-size="14" fill="#e8e6df" text-anchor="start" font-weight="700" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >Steve</text><text x="44" y="166" font-size="11" fill="#9aa0a8" text-anchor="start" font-weight="normal" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >builds · deploys · administers</text><rect x="30" y="196" width="200" height="64" rx="8" fill="#17191d" stroke="#2a2e35" stroke-width="1" /><text x="44" y="220" font-size="14" fill="#e8e6df" text-anchor="start" font-weight="700" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >Visitors / users</text><text x="44" y="242" font-size="11" fill="#9aa0a8" text-anchor="start" font-weight="normal" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >use the apps</text><path d="M230,152 C265.0,152 265.0,152 300,152" fill="none" stroke="#d9a441" stroke-width="1.4"/><path d="M230,228 C265.0,228 265.0,240 300,240" fill="none" stroke="#9aa0a8" stroke-width="1.2" stroke-dasharray="5,4"/><text x="300" y="96" font-size="12" fill="#9aa0a8" text-anchor="start" font-weight="700" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >APPLICATIONS (grouped by host)</text><text x="760" y="96" font-size="12" fill="#9aa0a8" text-anchor="start" font-weight="700" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >BACKENDS &amp; SERVICES</text><text x="300" y="118" font-size="11" fill="#a78bfa" text-anchor="start" font-weight="700" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >LOVABLE · main site</text><rect x="300" y="130" width="340" height="56" rx="8" fill="#17191d" stroke="#2a2e35" stroke-width="1" /><line x1="300" y1="134" x2="300" y2="182" stroke="#a78bfa" stroke-width="3" /><circle cx="316" cy="150" r="4.5" fill="#58c98b"/><text x="328" y="154" font-size="13.5" fill="#e8e6df" text-anchor="start" font-weight="700" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >Main site</text><text x="328" y="171" font-size="10.5" fill="#9aa0a8" text-anchor="start" font-weight="normal" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >Fractional Demand Portfolio — public home…</text><rect x="301" y="168" width="338" height="17" rx="0" fill="#101216" stroke="none" stroke-width="1" /><text x="310" y="180" font-size="10" fill="#6aa8ff" text-anchor="start" font-weight="normal" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >DB: none</text><text x="300" y="226" font-size="11" fill="#6aa8ff" text-anchor="start" font-weight="700" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >VERCEL · stevepeeles-projects team</text><rect x="300" y="238" width="340" height="56" rx="8" fill="#17191d" stroke="#2a2e35" stroke-width="1" /><line x1="300" y1="242" x2="300" y2="290" stroke="#6aa8ff" stroke-width="3" /><circle cx="316" cy="258" r="4.5" fill="#58c98b"/><text x="328" y="262" font-size="13.5" fill="#e8e6df" text-anchor="start" font-weight="700" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >Profolio</text><text x="328" y="279" font-size="10.5" fill="#9aa0a8" text-anchor="start" font-weight="normal" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >Portfolio baselines — PDF export, per-page…</text><rect x="301" y="276" width="338" height="17" rx="0" fill="#101216" stroke="none" stroke-width="1" /><text x="310" y="288" font-size="10" fill="#6aa8ff" text-anchor="start" font-weight="normal" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >DB: profolio (own project) · public</text><rect x="300" y="302" width="340" height="56" rx="8" fill="#17191d" stroke="#2a2e35" stroke-width="1" /><line x1="300" y1="306" x2="300" y2="354" stroke="#6aa8ff" stroke-width="3" /><circle cx="316" cy="322" r="4.5" fill="#58c98b"/><text x="328" y="326" font-size="13.5" fill="#e8e6df" text-anchor="start" font-weight="700" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >Dardo</text><text x="328" y="343" font-size="10.5" fill="#9aa0a8" text-anchor="start" font-weight="normal" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >AI sidekick for real-estate agents —…</text><rect x="301" y="340" width="338" height="17" rx="0" fill="#101216" stroke="none" stroke-width="1" /><text x="310" y="352" font-size="10" fill="#6aa8ff" text-anchor="start" font-weight="normal" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >DB: dardo (home project) · dardo</text><rect x="300" y="366" width="340" height="56" rx="8" fill="#17191d" stroke="#2a2e35" stroke-width="1" /><line x1="300" y1="370" x2="300" y2="418" stroke="#6aa8ff" stroke-width="3" /><circle cx="316" cy="386" r="4.5" fill="#58c98b"/><text x="328" y="390" font-size="13.5" fill="#e8e6df" text-anchor="start" font-weight="700" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >Stampd</text><text x="328" y="407" font-size="10.5" fill="#9aa0a8" text-anchor="start" font-weight="normal" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >Time tracking — multi-rate + overtime, crew…</text><rect x="301" y="404" width="338" height="17" rx="0" fill="#101216" stroke="none" stroke-width="1" /><text x="310" y="416" font-size="10" fill="#6aa8ff" text-anchor="start" font-weight="normal" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >DB: dardo (shared) · stampd</text><rect x="300" y="430" width="340" height="56" rx="8" fill="#17191d" stroke="#2a2e35" stroke-width="1" /><line x1="300" y1="434" x2="300" y2="482" stroke="#6aa8ff" stroke-width="3" /><circle cx="316" cy="450" r="4.5" fill="#58c98b"/><text x="328" y="454" font-size="13.5" fill="#e8e6df" text-anchor="start" font-weight="700" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >Repurpose Engine</text><text x="328" y="471" font-size="10.5" fill="#9aa0a8" text-anchor="start" font-weight="normal" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >Content repurposing — history, favorites,…</text><rect x="301" y="468" width="338" height="17" rx="0" fill="#101216" stroke="none" stroke-width="1" /><text x="310" y="480" font-size="10" fill="#6aa8ff" text-anchor="start" font-weight="normal" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >DB: dardo (shared) · repurpose_engine (reserved —…</text><rect x="300" y="494" width="340" height="56" rx="8" fill="#17191d" stroke="#2a2e35" stroke-width="1" /><line x1="300" y1="498" x2="300" y2="546" stroke="#6aa8ff" stroke-width="3" /><circle cx="316" cy="514" r="4.5" fill="#58c98b"/><text x="328" y="518" font-size="13.5" fill="#e8e6df" text-anchor="start" font-weight="700" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >GigSplit</text><text x="328" y="535" font-size="10.5" fill="#9aa0a8" text-anchor="start" font-weight="normal" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >Band share sheet — saved lineups, splits</text><rect x="301" y="532" width="338" height="17" rx="0" fill="#101216" stroke="none" stroke-width="1" /><text x="310" y="544" font-size="10" fill="#6aa8ff" text-anchor="start" font-weight="normal" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >DB: dardo (shared) · gigsplit (reserved — auth only…</text><rect x="300" y="558" width="340" height="56" rx="8" fill="#17191d" stroke="#2a2e35" stroke-width="1" /><line x1="300" y1="562" x2="300" y2="610" stroke="#6aa8ff" stroke-width="3" /><circle cx="316" cy="578" r="4.5" fill="#58c98b"/><text x="328" y="582" font-size="13.5" fill="#e8e6df" text-anchor="start" font-weight="700" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >QuoteQuick</text><text x="328" y="599" font-size="10.5" fill="#9aa0a8" text-anchor="start" font-weight="normal" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >Quotes — customers, service catalog,…</text><rect x="301" y="596" width="338" height="17" rx="0" fill="#101216" stroke="none" stroke-width="1" /><text x="310" y="608" font-size="10" fill="#6aa8ff" text-anchor="start" font-weight="normal" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >DB: dardo (shared) · quotequick</text><rect x="300" y="622" width="340" height="56" rx="8" fill="#17191d" stroke="#2a2e35" stroke-width="1" /><line x1="300" y1="626" x2="300" y2="674" stroke="#6aa8ff" stroke-width="3" /><circle cx="316" cy="642" r="4.5" fill="#58c98b"/><text x="328" y="646" font-size="13.5" fill="#e8e6df" text-anchor="start" font-weight="700" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >StagePlot AI</text><text x="328" y="663" font-size="10.5" fill="#9aa0a8" text-anchor="start" font-weight="normal" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >Stage plots — drag-drop canvas, production…</text><rect x="301" y="660" width="338" height="17" rx="0" fill="#101216" stroke="none" stroke-width="1" /><text x="310" y="672" font-size="10" fill="#6aa8ff" text-anchor="start" font-weight="normal" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >DB: dardo (shared) · stageplot_ai (reserved — auth…</text><rect x="300" y="686" width="340" height="56" rx="8" fill="#17191d" stroke="#2a2e35" stroke-width="1" /><line x1="300" y1="690" x2="300" y2="738" stroke="#6aa8ff" stroke-width="3" /><circle cx="316" cy="706" r="4.5" fill="#58c98b"/><text x="328" y="710" font-size="13.5" fill="#e8e6df" text-anchor="start" font-weight="700" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >Monitor Mix Cheat</text><text x="328" y="727" font-size="10.5" fill="#9aa0a8" text-anchor="start" font-weight="normal" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >Monitor-mix cheat sheets — print layout,…</text><rect x="301" y="724" width="338" height="17" rx="0" fill="#101216" stroke="none" stroke-width="1" /><text x="310" y="736" font-size="10" fill="#6aa8ff" text-anchor="start" font-weight="normal" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >DB: dardo (shared) · monitor_mix_cheat</text><rect x="300" y="750" width="340" height="56" rx="8" fill="#17191d" stroke="#2a2e35" stroke-width="1" /><line x1="300" y1="754" x2="300" y2="802" stroke="#6aa8ff" stroke-width="3" /><circle cx="316" cy="770" r="4.5" fill="#58c98b"/><text x="328" y="774" font-size="13.5" fill="#e8e6df" text-anchor="start" font-weight="700" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >Mission Control</text><text x="328" y="791" font-size="10.5" fill="#9aa0a8" text-anchor="start" font-weight="normal" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >Internal ops dashboard — Linear / PostHog /…</text><rect x="301" y="788" width="338" height="17" rx="0" fill="#101216" stroke="none" stroke-width="1" /><text x="310" y="800" font-size="10" fill="#6aa8ff" text-anchor="start" font-weight="normal" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >DB: dardo (shared) · mission_control (reserved —…</text><rect x="300" y="814" width="340" height="56" rx="8" fill="#17191d" stroke="#2a2e35" stroke-width="1" /><line x1="300" y1="818" x2="300" y2="866" stroke="#6aa8ff" stroke-width="3" /><circle cx="316" cy="834" r="4.5" fill="#d9a441"/><text x="328" y="838" font-size="13.5" fill="#e8e6df" text-anchor="start" font-weight="700" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >Snout</text><text x="328" y="855" font-size="10.5" fill="#9aa0a8" text-anchor="start" font-weight="normal" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >Plain-language prompt → 4-tier tech-stack…</text><rect x="301" y="852" width="338" height="17" rx="0" fill="#101216" stroke="none" stroke-width="1" /><text x="310" y="864" font-size="10" fill="#6aa8ff" text-anchor="start" font-weight="normal" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >DB: dardo (shared) · snout</text><rect x="300" y="878" width="340" height="56" rx="8" fill="#17191d" stroke="#2a2e35" stroke-width="1" /><line x1="300" y1="882" x2="300" y2="930" stroke="#6aa8ff" stroke-width="3" /><circle cx="316" cy="898" r="4.5" fill="#58c98b"/><text x="328" y="902" font-size="13.5" fill="#e8e6df" text-anchor="start" font-weight="700" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >FlipList</text><text x="328" y="919" font-size="10.5" fill="#9aa0a8" text-anchor="start" font-weight="normal" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >Marketplace listing manager — format once…</text><rect x="301" y="916" width="338" height="17" rx="0" fill="#101216" stroke="none" stroke-width="1" /><text x="310" y="928" font-size="10" fill="#6aa8ff" text-anchor="start" font-weight="normal" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >DB: dardo (shared) · fliplist</text><rect x="300" y="942" width="340" height="56" rx="8" fill="#17191d" stroke="#2a2e35" stroke-width="1" /><line x1="300" y1="946" x2="300" y2="994" stroke="#6aa8ff" stroke-width="3" /><circle cx="316" cy="962" r="4.5" fill="#d9a441"/><text x="328" y="966" font-size="13.5" fill="#e8e6df" text-anchor="start" font-weight="700" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >AI Ops Command Center</text><text x="328" y="983" font-size="10.5" fill="#9aa0a8" text-anchor="start" font-weight="normal" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >Internal read-only AI observability — SRE,…</text><rect x="301" y="980" width="338" height="17" rx="0" fill="#101216" stroke="none" stroke-width="1" /><text x="310" y="992" font-size="10" fill="#6aa8ff" text-anchor="start" font-weight="normal" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >DB: dardo (shared) · aocc</text><rect x="300" y="1006" width="340" height="56" rx="8" fill="#17191d" stroke="#2a2e35" stroke-width="1" /><line x1="300" y1="1010" x2="300" y2="1058" stroke="#6aa8ff" stroke-width="3" /><circle cx="316" cy="1026" r="4.5" fill="#d9a441"/><text x="328" y="1030" font-size="13.5" fill="#e8e6df" text-anchor="start" font-weight="700" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >Local Growth Engine app</text><text x="328" y="1047" font-size="10.5" fill="#9aa0a8" text-anchor="start" font-weight="normal" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >Private internal ops app for Local Growth…</text><rect x="301" y="1044" width="338" height="17" rx="0" fill="#101216" stroke="none" stroke-width="1" /><text x="310" y="1056" font-size="10" fill="#6aa8ff" text-anchor="start" font-weight="normal" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >DB: dardo (shared) · local_growth_engine</text><text x="300" y="1102" font-size="11" fill="#58c98b" text-anchor="start" font-weight="700" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >BASE44 · external</text><rect x="300" y="1114" width="340" height="56" rx="8" fill="#17191d" stroke="#2a2e35" stroke-width="1" /><line x1="300" y1="1118" x2="300" y2="1166" stroke="#58c98b" stroke-width="3" /><circle cx="316" cy="1134" r="4.5" fill="#58c98b"/><text x="328" y="1138" font-size="13.5" fill="#e8e6df" text-anchor="start" font-weight="700" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >Binsly</text><text x="328" y="1155" font-size="10.5" fill="#9aa0a8" text-anchor="start" font-weight="normal" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >Link-in-bio / content (stays on Base44 per…</text><rect x="301" y="1152" width="338" height="17" rx="0" fill="#101216" stroke="none" stroke-width="1" /><text x="310" y="1164" font-size="10" fill="#6aa8ff" text-anchor="start" font-weight="normal" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >DB: Base44-managed (external)</text><text x="300" y="1210" font-size="11" fill="#9aa0a8" text-anchor="start" font-weight="700" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >NOT STARTED</text><rect x="300" y="1222" width="340" height="56" rx="8" fill="#17191d" stroke="#2a2e35" stroke-width="1" /><line x1="300" y1="1226" x2="300" y2="1274" stroke="#9aa0a8" stroke-width="3" /><circle cx="316" cy="1242" r="4.5" fill="#9aa0a8"/><text x="328" y="1246" font-size="13.5" fill="#e8e6df" text-anchor="start" font-weight="700" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >Roast</text><text x="328" y="1263" font-size="10.5" fill="#9aa0a8" text-anchor="start" font-weight="normal" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >Landing Page Roast — URL → scored AI…</text><rect x="301" y="1260" width="338" height="17" rx="0" fill="#101216" stroke="none" stroke-width="1" /><text x="310" y="1272" font-size="10" fill="#6aa8ff" text-anchor="start" font-weight="normal" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >DB: TBD</text><rect x="760" y="130" width="490" height="96" rx="8" fill="#17191d" stroke="#6aa8ff" stroke-width="1.5" /><text x="774" y="152" font-size="13.5" fill="#e8e6df" text-anchor="start" font-weight="700" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >Supabase org</text><text x="774" y="170" font-size="10.5" fill="#9aa0a8" text-anchor="start" font-weight="normal" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >auth + postgres + storage · 2/2 free-tier projects</text><rect x="760" y="236" width="490" height="56" rx="8" fill="#17191d" stroke="#2a2e35" stroke-width="1" /><text x="774" y="258" font-size="13.5" fill="#e8e6df" text-anchor="start" font-weight="700" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >Stripe</text><text x="774" y="276" font-size="10.5" fill="#9aa0a8" text-anchor="start" font-weight="normal" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >payments · live in Profolio only</text><rect x="760" y="302" width="490" height="56" rx="8" fill="#17191d" stroke="#2a2e35" stroke-width="1" /><text x="774" y="324" font-size="13.5" fill="#e8e6df" text-anchor="start" font-weight="700" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >OpenAI</text><text x="774" y="342" font-size="10.5" fill="#9aa0a8" text-anchor="start" font-weight="normal" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >Repurpose Engine generate (key pending)</text><rect x="760" y="368" width="490" height="56" rx="8" fill="#17191d" stroke="#2a2e35" stroke-width="1" /><text x="774" y="390" font-size="13.5" fill="#e8e6df" text-anchor="start" font-weight="700" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >PostHog</text><text x="774" y="408" font-size="10.5" fill="#9aa0a8" text-anchor="start" font-weight="normal" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >product analytics · VITE_POSTHOG_KEY</text><rect x="760" y="434" width="490" height="56" rx="8" fill="#17191d" stroke="#2a2e35" stroke-width="1" /><text x="774" y="456" font-size="13.5" fill="#e8e6df" text-anchor="start" font-weight="700" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >Segment</text><text x="774" y="474" font-size="10.5" fill="#9aa0a8" text-anchor="start" font-weight="normal" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >sitewide analytics · main site (+Snout opt.)</text><rect x="760" y="500" width="490" height="56" rx="8" fill="#17191d" stroke="#2a2e35" stroke-width="1" /><text x="774" y="522" font-size="13.5" fill="#e8e6df" text-anchor="start" font-weight="700" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >Linear API</text><text x="774" y="540" font-size="10.5" fill="#9aa0a8" text-anchor="start" font-weight="normal" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >read by Mission Control</text><rect x="760" y="566" width="490" height="64" rx="8" fill="#17191d" stroke="#2a2e35" stroke-width="1" /><text x="774" y="588" font-size="13.5" fill="#e8e6df" text-anchor="start" font-weight="700" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >GitHub</text><text x="774" y="606" font-size="10.5" fill="#9aa0a8" text-anchor="start" font-weight="normal" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >main-site repo connected · app repos local-only</text><rect x="760" y="640" width="490" height="56" rx="8" fill="#17191d" stroke="#2a2e35" stroke-width="1" /><text x="774" y="662" font-size="13.5" fill="#e8e6df" text-anchor="start" font-weight="700" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >HubSpot</text><text x="774" y="680" font-size="10.5" fill="#9aa0a8" text-anchor="start" font-weight="normal" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >main-site chat flows + CRM</text><path d="M640,158.0 C700.0,158.0 700.0,454.0 760,454.0" fill="none" stroke="#9aa0a8" stroke-width="1.2"/><rect x="639.205" y="296.5" width="61.589999999999996" height="19.5" rx="5" fill="#0e0f11" stroke="#2a2e35"/><text x="670.0" y="310.0" font-size="9.5" fill="#9aa0a8" text-anchor="middle" font-weight="normal" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >analytics</text><path d="M640,158.0 C700.0,158.0 700.0,660.0 760,660.0" fill="none" stroke="#9aa0a8" stroke-width="1.2"/><rect x="636.45" y="399.5" width="67.1" height="19.5" rx="5" fill="#0e0f11" stroke="#2a2e35"/><text x="670.0" y="413.0" font-size="9.5" fill="#9aa0a8" text-anchor="middle" font-weight="normal" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >chat + CRM</text><path d="M640,158.0 C700.0,158.0 700.0,388.0 760,388.0" fill="none" stroke="#9aa0a8" stroke-width="1.2"/><rect x="639.205" y="263.5" width="61.589999999999996" height="19.5" rx="5" fill="#0e0f11" stroke="#2a2e35"/><text x="670.0" y="277.0" font-size="9.5" fill="#9aa0a8" text-anchor="middle" font-weight="normal" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >analytics</text><path d="M640,266.0 C700.0,266.0 700.0,256.0 760,256.0" fill="none" stroke="#58c98b" stroke-width="1.2"/><rect x="633.695" y="251.5" width="72.60999999999999" height="19.5" rx="5" fill="#0e0f11" stroke="#2a2e35"/><text x="670.0" y="265.0" font-size="9.5" fill="#9aa0a8" text-anchor="middle" font-weight="normal" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >$29/yr live</text><path d="M640,266.0 C700.0,266.0 700.0,388.0 760,388.0" fill="none" stroke="#9aa0a8" stroke-width="1.2"/><path d="M640,458.0 C700.0,458.0 700.0,322.0 760,322.0" fill="none" stroke="#d9a441" stroke-width="1.2"/><rect x="630.94" y="380.5" width="78.11999999999999" height="19.5" rx="5" fill="#0e0f11" stroke="#2a2e35"/><text x="670.0" y="394.0" font-size="9.5" fill="#9aa0a8" text-anchor="middle" font-weight="normal" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >api/generate</text><path d="M640,778.0 C700.0,778.0 700.0,520.0 760,520.0" fill="none" stroke="#9aa0a8" stroke-width="1.2"/><rect x="639.205" y="639.5" width="61.589999999999996" height="19.5" rx="5" fill="#0e0f11" stroke="#2a2e35"/><text x="670.0" y="653.0" font-size="9.5" fill="#9aa0a8" text-anchor="middle" font-weight="normal" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >read-only</text><path d="M640,778.0 C700.0,778.0 700.0,256.0 760,256.0" fill="none" stroke="#9aa0a8" stroke-width="1.2"/><rect x="639.205" y="507.5" width="61.589999999999996" height="19.5" rx="5" fill="#0e0f11" stroke="#2a2e35"/><text x="670.0" y="521.0" font-size="9.5" fill="#9aa0a8" text-anchor="middle" font-weight="normal" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >read-only</text><path d="M640,778.0 C700.0,778.0 700.0,388.0 760,388.0" fill="none" stroke="#9aa0a8" stroke-width="1.2"/><rect x="639.205" y="573.5" width="61.589999999999996" height="19.5" rx="5" fill="#0e0f11" stroke="#2a2e35"/><text x="670.0" y="587.0" font-size="9.5" fill="#9aa0a8" text-anchor="middle" font-weight="normal" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >read-only</text><path d="M640,842.0 C700.0,842.0 700.0,454.0 760,454.0" fill="none" stroke="#9aa0a8" stroke-width="1.2"/><rect x="641.96" y="638.5" width="56.08" height="19.5" rx="5" fill="#0e0f11" stroke="#2a2e35"/><text x="670.0" y="652.0" font-size="9.5" fill="#9aa0a8" text-anchor="middle" font-weight="normal" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >optional</text><text x="760" y="728" font-size="11" fill="#9aa0a8" text-anchor="start" font-weight="normal" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >Every Supabase-backed app authenticates against its project&#x27;s shared auth pool;</text><text x="760" y="746" font-size="11" fill="#9aa0a8" text-anchor="start" font-weight="normal" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >data isolation is per-schema (grants) + per-row (RLS). See data map below.</text></svg>`;
const DMAP_SVG = `<svg viewBox="0 0 1280 754" width="100%" xmlns="http://www.w3.org/2000/svg" role="img"><rect x="0" y="0" width="1280" height="754" rx="12" fill="#0e0f11" stroke="#2a2e35"/><text x="30" y="36" font-size="17" fill="#e8e6df" text-anchor="start" font-weight="700" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >What holds what — Supabase data map</text><text x="30" y="56" font-size="11" fill="#9aa0a8" text-anchor="start" font-weight="normal" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >org at free-tier max (2 projects) · 2 projects, both ACTIVE_HEALTHY · all schemas RLS-enabled · platform schema NOT exposed to PostgREST</text><rect x="366" y="98" width="902" height="610" rx="10" fill="none" stroke="#6aa8ff" stroke-width="1.2" stroke-dasharray="7,5"/><rect x="12" y="98" width="346" height="221" rx="10" fill="none" stroke="#6aa8ff" stroke-width="1.2" stroke-dasharray="7,5"/><rect x="20" y="80" width="1240" height="30" rx="8" fill="#101216" stroke="#2a2e35" stroke-width="1" /><text x="36" y="100" font-size="13" fill="#e8e6df" text-anchor="start" font-weight="700" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >Supabase org</text><text x="24" y="126" font-size="12.5" fill="#6aa8ff" text-anchor="start" font-weight="700" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >profolio  ·  yphcackwchaxguzamyzq</text><text x="24" y="142" font-size="10.5" fill="#9aa0a8" text-anchor="start" font-weight="normal" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >Profolio (dedicated) · ACTIVE_HEALTHY · 2 auth users</text><rect x="20" y="156" width="330.0" height="149" rx="8" fill="#17191d" stroke="#2a2e35" stroke-width="1" /><text x="30" y="175" font-size="12" fill="#d9a441" text-anchor="start" font-weight="700" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >public</text><text x="30" y="190" font-size="10" fill="#9aa0a8" text-anchor="start" font-weight="normal" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" ></text><text x="30" y="206" font-size="10" fill="#e8e6df" text-anchor="start" font-weight="normal" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >· profiles</text><text x="30" y="221" font-size="10" fill="#e8e6df" text-anchor="start" font-weight="normal" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >· projects</text><text x="30" y="236" font-size="10" fill="#e8e6df" text-anchor="start" font-weight="normal" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >· skills</text><text x="30" y="251" font-size="10" fill="#e8e6df" text-anchor="start" font-weight="normal" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >· views</text><text x="30" y="266" font-size="10" fill="#e8e6df" text-anchor="start" font-weight="normal" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >· view_events</text><text x="30" y="281" font-size="10" fill="#e8e6df" text-anchor="start" font-weight="normal" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >· subscriptions</text><text x="30" y="296" font-size="10" fill="#e8e6df" text-anchor="start" font-weight="normal" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >· credentials(resume content, benign)</text><text x="378" y="126" font-size="12.5" fill="#6aa8ff" text-anchor="start" font-weight="700" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >dardo  ·  sddcdfpgbgawoywupmvz</text><text x="378" y="142" font-size="10.5" fill="#9aa0a8" text-anchor="start" font-weight="normal" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >shared platform DB · ACTIVE_HEALTHY · 2 auth users</text><rect x="374" y="156" width="287.3333333333333" height="104" rx="8" fill="#17191d" stroke="#2a2e35" stroke-width="1" /><text x="384" y="175" font-size="12" fill="#d9a441" text-anchor="start" font-weight="700" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >dardo</text><text x="384" y="190" font-size="10" fill="#9aa0a8" text-anchor="start" font-weight="normal" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >Dardo</text><text x="384" y="206" font-size="10" fill="#e8e6df" text-anchor="start" font-weight="normal" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >· captures</text><text x="384" y="221" font-size="10" fill="#e8e6df" text-anchor="start" font-weight="normal" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >· mileage_entries</text><text x="384" y="236" font-size="10" fill="#e8e6df" text-anchor="start" font-weight="normal" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >· expense_entries</text><text x="384" y="251" font-size="10" fill="#e8e6df" text-anchor="start" font-weight="normal" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >· follow_up_drafts</text><rect x="673.3333333333333" y="156" width="287.3333333333333" height="149" rx="8" fill="#17191d" stroke="#2a2e35" stroke-width="1" /><text x="683.3333333333333" y="175" font-size="12" fill="#d9a441" text-anchor="start" font-weight="700" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >stampd</text><text x="683.3333333333333" y="190" font-size="10" fill="#9aa0a8" text-anchor="start" font-weight="normal" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >Stampd</text><text x="683.3333333333333" y="206" font-size="10" fill="#e8e6df" text-anchor="start" font-weight="normal" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >· stampd_shifts</text><text x="683.3333333333333" y="221" font-size="10" fill="#e8e6df" text-anchor="start" font-weight="normal" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >· stampd_work_types</text><text x="683.3333333333333" y="236" font-size="10" fill="#e8e6df" text-anchor="start" font-weight="normal" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >· stampd_locations</text><text x="683.3333333333333" y="251" font-size="10" fill="#e8e6df" text-anchor="start" font-weight="normal" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >· stampd_pay_settings</text><text x="683.3333333333333" y="266" font-size="10" fill="#e8e6df" text-anchor="start" font-weight="normal" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >· stampd_crews</text><text x="683.3333333333333" y="281" font-size="10" fill="#e8e6df" text-anchor="start" font-weight="normal" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >· stampd_crew_memberships</text><text x="683.3333333333333" y="296" font-size="10" fill="#e8e6df" text-anchor="start" font-weight="normal" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >· stampd_share_links</text><rect x="972.6666666666665" y="156" width="287.3333333333333" height="89" rx="8" fill="#17191d" stroke="#2a2e35" stroke-width="1" /><text x="982.6666666666665" y="175" font-size="12" fill="#d9a441" text-anchor="start" font-weight="700" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >quotequick</text><text x="982.6666666666665" y="190" font-size="10" fill="#9aa0a8" text-anchor="start" font-weight="normal" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >QuoteQuick</text><text x="982.6666666666665" y="206" font-size="10" fill="#e8e6df" text-anchor="start" font-weight="normal" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >· qq_customers</text><text x="982.6666666666665" y="221" font-size="10" fill="#e8e6df" text-anchor="start" font-weight="normal" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >· qq_quotes</text><text x="982.6666666666665" y="236" font-size="10" fill="#e8e6df" text-anchor="start" font-weight="normal" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >· qq_catalog_items</text><rect x="374" y="317" width="287.3333333333333" height="74" rx="8" fill="#17191d" stroke="#2a2e35" stroke-width="1" /><text x="384" y="336" font-size="12" fill="#d9a441" text-anchor="start" font-weight="700" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >monitor_mix_cheat</text><text x="384" y="351" font-size="10" fill="#9aa0a8" text-anchor="start" font-weight="normal" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >Monitor Mix Cheat</text><text x="384" y="367" font-size="10" fill="#e8e6df" text-anchor="start" font-weight="normal" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >· mmc_cheat_sheet_shares</text><text x="384" y="382" font-size="10" fill="#e8e6df" text-anchor="start" font-weight="normal" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >· + 3 SECURITY DEFINER RPCs (migrated, wrappe…</text><rect x="673.3333333333333" y="317" width="287.3333333333333" height="119" rx="8" fill="#17191d" stroke="#2a2e35" stroke-width="1" /><text x="683.3333333333333" y="336" font-size="12" fill="#d9a441" text-anchor="start" font-weight="700" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >fliplist</text><text x="683.3333333333333" y="351" font-size="10" fill="#9aa0a8" text-anchor="start" font-weight="normal" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >FlipList</text><text x="683.3333333333333" y="367" font-size="10" fill="#e8e6df" text-anchor="start" font-weight="normal" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >· users</text><text x="683.3333333333333" y="382" font-size="10" fill="#e8e6df" text-anchor="start" font-weight="normal" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >· items</text><text x="683.3333333333333" y="397" font-size="10" fill="#e8e6df" text-anchor="start" font-weight="normal" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >· item_photos</text><text x="683.3333333333333" y="412" font-size="10" fill="#e8e6df" text-anchor="start" font-weight="normal" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >· listings</text><text x="683.3333333333333" y="427" font-size="10" fill="#e8e6df" text-anchor="start" font-weight="normal" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >· platform_templates</text><rect x="972.6666666666665" y="317" width="287.3333333333333" height="74" rx="8" fill="#17191d" stroke="#2a2e35" stroke-width="1" /><text x="982.6666666666665" y="336" font-size="12" fill="#d9a441" text-anchor="start" font-weight="700" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >snout</text><text x="982.6666666666665" y="351" font-size="10" fill="#9aa0a8" text-anchor="start" font-weight="normal" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >Snout</text><text x="982.6666666666665" y="367" font-size="10" fill="#e8e6df" text-anchor="start" font-weight="normal" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >· user_settings</text><text x="982.6666666666665" y="382" font-size="10" fill="#e8e6df" text-anchor="start" font-weight="normal" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >· saved_stacks</text><rect x="374" y="448" width="287.3333333333333" height="59" rx="8" fill="#17191d" stroke="#2a2e35" stroke-width="1" /><text x="384" y="467" font-size="12" fill="#d9a441" text-anchor="start" font-weight="700" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >local_growth_engine</text><text x="384" y="482" font-size="10" fill="#9aa0a8" text-anchor="start" font-weight="normal" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >Local Growth Engine app</text><text x="384" y="498" font-size="10" fill="#e8e6df" text-anchor="start" font-weight="normal" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >· 12 tables (ops domain) + 10 settings seed r…</text><rect x="673.3333333333333" y="448" width="287.3333333333333" height="59" rx="8" fill="#17191d" stroke="#2a2e35" stroke-width="1" /><text x="683.3333333333333" y="467" font-size="12" fill="#d9a441" text-anchor="start" font-weight="700" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >aocc</text><text x="683.3333333333333" y="482" font-size="10" fill="#9aa0a8" text-anchor="start" font-weight="normal" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >AI Ops Command Center</text><text x="683.3333333333333" y="498" font-size="10" fill="#e8e6df" text-anchor="start" font-weight="normal" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >· 33 tables (observability domain: providers,…</text><rect x="972.6666666666665" y="448" width="287.3333333333333" height="104" rx="8" fill="#17191d" stroke="#2a2e35" stroke-width="1" /><text x="982.6666666666665" y="467" font-size="12" fill="#d9a441" text-anchor="start" font-weight="700" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >platform</text><text x="982.6666666666665" y="482" font-size="10" fill="#9aa0a8" text-anchor="start" font-weight="normal" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >Platform (admin)</text><text x="982.6666666666665" y="498" font-size="10" fill="#e8e6df" text-anchor="start" font-weight="normal" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >· platform.products</text><text x="982.6666666666665" y="513" font-size="10" fill="#e8e6df" text-anchor="start" font-weight="normal" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >· platform.audit_events</text><text x="982.6666666666665" y="528" font-size="10" fill="#e8e6df" text-anchor="start" font-weight="normal" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >· platform.usage_events</text><text x="982.6666666666665" y="543" font-size="10" fill="#e8e6df" text-anchor="start" font-weight="normal" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >· (NOT exposed to PostgREST)</text><rect x="374" y="564" width="287.3333333333333" height="59" rx="8" fill="#17191d" stroke="#2a2e35" stroke-width="1" /><text x="384" y="583" font-size="12" fill="#d9a441" text-anchor="start" font-weight="700" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >stageplot_ai</text><text x="384" y="598" font-size="10" fill="#9aa0a8" text-anchor="start" font-weight="normal" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >StagePlot AI</text><text x="384" y="614" font-size="10" fill="#9aa0a8" text-anchor="start" font-weight="normal" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >· reserved — auth only, no tables yet</text><rect x="673.3333333333333" y="564" width="287.3333333333333" height="59" rx="8" fill="#17191d" stroke="#2a2e35" stroke-width="1" /><text x="683.3333333333333" y="583" font-size="12" fill="#d9a441" text-anchor="start" font-weight="700" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >gigsplit</text><text x="683.3333333333333" y="598" font-size="10" fill="#9aa0a8" text-anchor="start" font-weight="normal" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >GigSplit</text><text x="683.3333333333333" y="614" font-size="10" fill="#9aa0a8" text-anchor="start" font-weight="normal" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >· reserved — auth only, no tables yet</text><rect x="972.6666666666665" y="564" width="287.3333333333333" height="59" rx="8" fill="#17191d" stroke="#2a2e35" stroke-width="1" /><text x="982.6666666666665" y="583" font-size="12" fill="#d9a441" text-anchor="start" font-weight="700" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >repurpose_engine</text><text x="982.6666666666665" y="598" font-size="10" fill="#9aa0a8" text-anchor="start" font-weight="normal" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >Repurpose Engine</text><text x="982.6666666666665" y="614" font-size="10" fill="#9aa0a8" text-anchor="start" font-weight="normal" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >· reserved — auth only, no tables yet</text><rect x="374" y="635" width="287.3333333333333" height="59" rx="8" fill="#17191d" stroke="#2a2e35" stroke-width="1" /><text x="384" y="654" font-size="12" fill="#d9a441" text-anchor="start" font-weight="700" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >mission_control</text><text x="384" y="669" font-size="10" fill="#9aa0a8" text-anchor="start" font-weight="normal" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >Mission Control</text><text x="384" y="685" font-size="10" fill="#9aa0a8" text-anchor="start" font-weight="normal" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >· reserved — auth only, no tables yet</text><text x="30" y="724" font-size="11" fill="#9aa0a8" text-anchor="start" font-weight="normal" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >Isolation: schema grants (each app sees only its schema) + RLS per user row. Shared auth pool across apps in one project — accepted trade-off, revisit at 100 MAU/app.</text><text x="30" y="742" font-size="11" fill="#9aa0a8" text-anchor="start" font-weight="normal" font-family="system-ui,-apple-system,Segoe UI,Roboto,sans-serif" >platform schema is service-role only (Mission Control server routes); never exposed to PostgREST.</text></svg>`;

function SectionHead({ n, children, sub }: { n: string; children: React.ReactNode; sub?: string }) {
  return (
    <div>
      <p className="eyebrow">Scaffolding / {n}</p>
      <h2 className="mt-4 text-3xl font-bold sm:text-4xl">{children}</h2>
      {sub ? <p className="mt-4 max-w-3xl text-muted-foreground">{sub}</p> : null}
    </div>
  );
}

function GitHubTile() {
  const [d, setD] = useState<{ pushed: string; issues: number } | null>(null);
  useEffect(() => {
    let live = true;
    fetch("https://api.github.com/repos/stevepeele/portfolio-craft-56")
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => {
        if (live && j) setD({ pushed: j.pushed_at, issues: j.open_issues_count });
      })
      .catch(() => {});
    return () => {
      live = false;
    };
  }, []);
  const pushed = d ? new Date(d.pushed).toLocaleString() : "…";
  return (
    <a
      href="https://github.com/stevepeele/portfolio-craft-56"
      target="_blank"
      rel="noreferrer"
      className="panel group flex flex-col p-5 transition-colors hover:border-primary/50"
    >
      <div className="flex items-center justify-between">
        <p className="font-semibold">GitHub</p>
        <span className="inline-flex items-center gap-1 text-xs text-emerald-400">
          <span className="size-2 rounded-full bg-emerald-400" aria-hidden="true" /> live
        </span>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">
        Last push: <span className="text-foreground">{pushed}</span>
        <br />
        Open issues/PRs: <span className="text-foreground">{d ? d.issues : "…"}</span>
        <br />
        Branch: <span className="text-foreground">main</span> (Lovable-synced)
      </p>
      <span className="mt-3 inline-flex items-center gap-1 text-xs text-muted-foreground group-hover:text-foreground">
        Open repo <ArrowUpRight className="size-3.5" />
      </span>
    </a>
  );
}

const LINK_TILES: { name: string; fact: string; href: string; live: boolean }[] = [
  {
    name: "Mission Control",
    fact: "Linear / PostHog / Stripe read-only ops views, app cards, ship status. Requires sign-in (steve@stevepeeleii.com).",
    href: "https://mission-control-hw8t1tbra-stevepeeles-projects.vercel.app",
    live: false,
  },
  {
    name: "Vercel",
    fact: "Free tier · 100 deploys/day — quota blocked 2 deploys on 10/12. App projects deploy via file upload; none are git-connected.",
    href: "https://vercel.com/dashboard",
    live: false,
  },
  {
    name: "Supabase",
    fact: "Org at free-tier max: 2 projects, both ACTIVE_HEALTHY. 13 per-app schemas in the shared dardo project.",
    href: "https://supabase.com/dashboard",
    live: false,
  },
  {
    name: "Linear",
    fact: "P-PLX-8 Main Site + full portfolio. Public board shows Pub-labeled projects only. Board snapshot below.",
    href: "https://linear.app",
    live: false,
  },
  {
    name: "Stripe",
    fact: "Live in Profolio only ($29/yr product). Unconnected everywhere else.",
    href: "https://dashboard.stripe.com",
    live: false,
  },
  {
    name: "PostHog",
    fact: "Per-app VITE_POSTHOG_KEY instrumentation; read back by Mission Control.",
    href: "https://app.posthog.com",
    live: false,
  },
  {
    name: "Lovable",
    fact: "Fractional Demand Portfolio project. Pushes to main sync into the editor; auto-publish via API.",
    href: "https://lovable.dev/projects/9f39d75c-1693-480c-9a8c-d081aa55ee3c",
    live: false,
  },
  {
    name: "OpenAI",
    fact: "Repurpose Engine api/generate is wired but dormant — goes live when the key is pasted.",
    href: "https://platform.openai.com",
    live: false,
  },
  {
    name: "Segment",
    fact: "Sitewide on stevepeeleii.com (root route init, page + CTA tracking). Optional in Snout.",
    href: "https://app.segment.com",
    live: false,
  },
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
              The architecture, <span className="text-gradient">all of it.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              Private reference — what's connected to what, what holds what, every app's
              properties, and the live app directory. Unlisted and noindex; nothing links here.
              Everything on this page loads with no sign-in.
            </p>
            <p className="mt-4 text-xs text-muted-foreground">
              Generated 2026-10-12 · source: <code>~/workspace/your_files/portfolio-architecture/data.json</code> · regenerate with <code>python3 build.py</code> (emits this page too)
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 pt-10">
          <Link
            to="/scaffolding/organization"
            className="panel group flex items-center justify-between gap-4 p-5 transition-colors hover:border-foreground/30"
          >
            <span>
              <span className="text-xs uppercase tracking-widest text-muted-foreground">Related · Scaffolding</span>
              <span className="mt-1 block font-semibold text-foreground">
                Organization &amp; hierarchy — who does what: Lauren's triage, the Muse × Oscar split, both skill
                hierarchies, handoff contracts.
              </span>
            </span>
            <ArrowUpRight className="size-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
          </Link>
        </section>

        <section className="mx-auto max-w-6xl space-y-6 px-5 py-20">
          <SectionHead n="01" sub="Hosts → apps → backends and services. The blue strip inside each app box is its data home; curved lines are live third-party integrations.">
            System <span className="text-gradient">topology.</span>
          </SectionHead>
          <div className="panel overflow-x-auto p-2">
            <div className="min-w-[900px]" dangerouslySetInnerHTML={{ __html: TOPO_SVG }} />
          </div>
        </section>

        <section className="mx-auto max-w-6xl space-y-6 px-5 py-20">
          <SectionHead n="02" sub="Supabase org → projects → per-app schemas → tables. Thirteen schemas now live in the shared dardo project.">
            What holds <span className="text-gradient">what.</span>
          </SectionHead>
          <div className="panel overflow-x-auto p-2">
            <div className="min-w-[900px]" dangerouslySetInnerHTML={{ __html: DMAP_SVG }} />
          </div>
        </section>

        <section className="mx-auto max-w-6xl space-y-6 px-5 py-20">
          <SectionHead n="03" sub="One card per application: stack, source, hosting, data home, auth, integrations, status, Linear reference.">
            Application <span className="text-gradient">properties.</span>
          </SectionHead>
          <div className="grid gap-5 md:grid-cols-2"><article className="panel p-6">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-lg font-bold">Main site</h3>
        <span className="text-right text-xs text-emerald-400">live</span>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">Fractional Demand Portfolio — public home base (SPIIX, engagements, signal capture)</p>
      <dl className="mt-4 space-y-2 text-sm"><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Stack</dt><dd className="min-w-0">TanStack Start (React SSR)</dd></div><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Source</dt><dd className="min-w-0"><code>~/workspace/portfolio-craft-56 · GitHub stevepeele/portfolio-craft-56 (main)</code></dd></div><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Hosting</dt><dd className="min-w-0">Lovable · Lovable project 9f39d75c… (auto-publish approved)</dd></div><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Live URL</dt><dd className="min-w-0">https://stevepeeleii.com</dd></div><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Data home</dt><dd className="min-w-0">none</dd></div><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Auth</dt><dd className="min-w-0">none (public site; lead form via formsubmit.co → steve@stevepeeleii.com)</dd></div><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Integrations</dt><dd className="min-w-0"><span className="mr-1 mb-1 inline-block rounded-full border border-border/60 px-2.5 py-0.5 text-xs">Segment (sitewide analytics)</span><span className="mr-1 mb-1 inline-block rounded-full border border-border/60 px-2.5 py-0.5 text-xs">PostHog</span><span className="mr-1 mb-1 inline-block rounded-full border border-border/60 px-2.5 py-0.5 text-xs">HubSpot flows + tracking snippet</span></dd></div><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Linear</dt><dd className="min-w-0">P-PLX-8</dd></div></dl>
    </article>
<article className="panel p-6">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-lg font-bold">Profolio</h3>
        <span className="text-right text-xs text-emerald-400">live</span>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">Portfolio baselines — PDF export, per-page analytics, $29/yr paid tier</p>
      <dl className="mt-4 space-y-2 text-sm"><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Stack</dt><dd className="min-w-0">Vanilla JS (static) + api/ serverless fns</dd></div><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Source</dt><dd className="min-w-0"><code>~/workspace/profolio</code></dd></div><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Hosting</dt><dd className="min-w-0">Vercel · Vercel project `profolio`</dd></div><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Live URL</dt><dd className="min-w-0">https://profolio-stevepeeles-projects.vercel.app</dd></div><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Data home</dt><dd className="min-w-0">profolio (own project) · schema <code>public</code></dd></div><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Auth</dt><dd className="min-w-0">Supabase email/password + magic link</dd></div><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Integrations</dt><dd className="min-w-0"><span className="mr-1 mb-1 inline-block rounded-full border border-border/60 px-2.5 py-0.5 text-xs">Stripe live ($29/yr product; checkout/webhook/portal fns)</span><span className="mr-1 mb-1 inline-block rounded-full border border-border/60 px-2.5 py-0.5 text-xs">PostHog</span></dd></div><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Linear</dt><dd className="min-w-0">v2 sprint PLX-175–183</dd></div></dl>
    </article>
<article className="panel p-6">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-lg font-bold">Dardo</h3>
        <span className="text-right text-xs text-emerald-400">live</span>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">AI sidekick for real-estate agents — one-tap capture, mileage, evening brief</p>
      <dl className="mt-4 space-y-2 text-sm"><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Stack</dt><dd className="min-w-0">Vite + React</dd></div><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Source</dt><dd className="min-w-0"><code>~/workspace/dardo</code></dd></div><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Hosting</dt><dd className="min-w-0">Vercel · Vercel (team scope — not visible via API)</dd></div><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Live URL</dt><dd className="min-w-0">https://dardo-smoky.vercel.app</dd></div><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Data home</dt><dd className="min-w-0">dardo (home project) · schema <code>dardo</code></dd></div><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Auth</dt><dd className="min-w-0">Supabase email/password + magic link (AuthGate)</dd></div><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Integrations</dt><dd className="min-w-0"><span className="mr-1 mb-1 inline-block rounded-full border border-border/60 px-2.5 py-0.5 text-xs">Supabase Storage (private bucket, capture photos)</span><span className="mr-1 mb-1 inline-block rounded-full border border-border/60 px-2.5 py-0.5 text-xs">PostHog</span></dd></div><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Linear</dt><dd className="min-w-0">v2 sprint PLX-175–183</dd></div></dl>
    </article>
<article className="panel p-6">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-lg font-bold">Stampd</h3>
        <span className="text-right text-xs text-emerald-400">live</span>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">Time tracking — multi-rate + overtime, crew view, 3-tap start, employer share links</p>
      <dl className="mt-4 space-y-2 text-sm"><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Stack</dt><dd className="min-w-0">Vite + React</dd></div><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Source</dt><dd className="min-w-0"><code>~/workspace/stampd</code></dd></div><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Hosting</dt><dd className="min-w-0">Vercel · Vercel project `stampd`</dd></div><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Live URL</dt><dd className="min-w-0">https://stampd-stevepeeles-projects.vercel.app</dd></div><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Data home</dt><dd className="min-w-0">dardo (shared) · schema <code>stampd</code></dd></div><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Auth</dt><dd className="min-w-0">Supabase email/password + magic link</dd></div><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Integrations</dt><dd className="min-w-0"><span className="mr-1 mb-1 inline-block rounded-full border border-border/60 px-2.5 py-0.5 text-xs">PostHog</span></dd></div><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Linear</dt><dd className="min-w-0">v2 sprint PLX-175–183</dd></div></dl>
    </article>
<article className="panel p-6">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-lg font-bold">Repurpose Engine</h3>
        <span className="text-right text-xs text-emerald-400">live</span>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">Content repurposing — history, favorites, tone presets, AI generate</p>
      <dl className="mt-4 space-y-2 text-sm"><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Stack</dt><dd className="min-w-0">Vite + React + api/generate</dd></div><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Source</dt><dd className="min-w-0"><code>~/workspace/repurpose-engine</code></dd></div><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Hosting</dt><dd className="min-w-0">Vercel · Vercel project `repurpose-engine`</dd></div><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Live URL</dt><dd className="min-w-0">https://repurpose-engine-beryl.vercel.app</dd></div><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Data home</dt><dd className="min-w-0">dardo (shared) · schema <code>repurpose_engine (reserved — auth only today)</code></dd></div><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Auth</dt><dd className="min-w-0">Supabase email/password + magic link</dd></div><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Integrations</dt><dd className="min-w-0"><span className="mr-1 mb-1 inline-block rounded-full border border-border/60 px-2.5 py-0.5 text-xs">OpenAI (api/generate — goes live when he pastes the key)</span><span className="mr-1 mb-1 inline-block rounded-full border border-border/60 px-2.5 py-0.5 text-xs">PostHog</span></dd></div><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Linear</dt><dd className="min-w-0">v2 sprint PLX-175–183</dd></div></dl>
    </article>
<article className="panel p-6">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-lg font-bold">GigSplit</h3>
        <span className="text-right text-xs text-emerald-400">live</span>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">Band share sheet — saved lineups, splits</p>
      <dl className="mt-4 space-y-2 text-sm"><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Stack</dt><dd className="min-w-0">Vite + React</dd></div><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Source</dt><dd className="min-w-0"><code>~/workspace/gigsplit</code></dd></div><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Hosting</dt><dd className="min-w-0">Vercel · Vercel (team scope — not visible via API)</dd></div><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Live URL</dt><dd className="min-w-0">https://gigsplit-stevepeeles-projects.vercel.app</dd></div><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Data home</dt><dd className="min-w-0">dardo (shared) · schema <code>gigsplit (reserved — auth only today)</code></dd></div><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Auth</dt><dd className="min-w-0">Supabase email/password + magic link</dd></div><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Integrations</dt><dd className="min-w-0"><span className="mr-1 mb-1 inline-block rounded-full border border-border/60 px-2.5 py-0.5 text-xs">PostHog</span></dd></div><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Linear</dt><dd className="min-w-0">v2 sprint PLX-175–183</dd></div></dl>
    </article>
<article className="panel p-6">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-lg font-bold">QuoteQuick</h3>
        <span className="text-right text-xs text-emerald-400">live</span>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">Quotes — customers, service catalog, approval links</p>
      <dl className="mt-4 space-y-2 text-sm"><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Stack</dt><dd className="min-w-0">Vite + React</dd></div><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Source</dt><dd className="min-w-0"><code>~/workspace/quotequick</code></dd></div><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Hosting</dt><dd className="min-w-0">Vercel · Vercel project `quotequick`</dd></div><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Live URL</dt><dd className="min-w-0">https://quotequick-stevepeeles-projects.vercel.app</dd></div><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Data home</dt><dd className="min-w-0">dardo (shared) · schema <code>quotequick</code></dd></div><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Auth</dt><dd className="min-w-0">Supabase email/password + magic link</dd></div><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Integrations</dt><dd className="min-w-0"><span className="mr-1 mb-1 inline-block rounded-full border border-border/60 px-2.5 py-0.5 text-xs">PostHog</span></dd></div><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Linear</dt><dd className="min-w-0">v2 sprint PLX-175–183</dd></div></dl>
    </article>
<article className="panel p-6">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-lg font-bold">StagePlot AI</h3>
        <span className="text-right text-xs text-emerald-400">live</span>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">Stage plots — drag-drop canvas, production PDF, shareable plot links</p>
      <dl className="mt-4 space-y-2 text-sm"><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Stack</dt><dd className="min-w-0">Vanilla JS (static)</dd></div><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Source</dt><dd className="min-w-0"><code>~/workspace/stageplot-ai</code></dd></div><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Hosting</dt><dd className="min-w-0">Vercel · Vercel (team scope — not visible via API)</dd></div><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Live URL</dt><dd className="min-w-0">https://stageplot-ai-stevepeeles-projects.vercel.app</dd></div><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Data home</dt><dd className="min-w-0">dardo (shared) · schema <code>stageplot_ai (reserved — auth only today)</code></dd></div><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Auth</dt><dd className="min-w-0">Supabase email/password + magic link</dd></div><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Integrations</dt><dd className="min-w-0"><span className="mr-1 mb-1 inline-block rounded-full border border-border/60 px-2.5 py-0.5 text-xs">PostHog</span></dd></div><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Linear</dt><dd className="min-w-0">v2 sprint PLX-175–183</dd></div></dl>
    </article>
<article className="panel p-6">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-lg font-bold">Monitor Mix Cheat</h3>
        <span className="text-right text-xs text-emerald-400">live — schema migration in flight (code change local; redeploy blocked on Vercel daily quota)</span>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">Monitor-mix cheat sheets — print layout, share links, dark venue mode</p>
      <dl className="mt-4 space-y-2 text-sm"><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Stack</dt><dd className="min-w-0">Vanilla JS (static, RPC-only)</dd></div><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Source</dt><dd className="min-w-0"><code>~/workspace/monitor-mix-cheat</code></dd></div><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Hosting</dt><dd className="min-w-0">Vercel · Vercel project `monitor-mix-cheat`</dd></div><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Live URL</dt><dd className="min-w-0">https://monitor-mix-cheat.vercel.app</dd></div><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Data home</dt><dd className="min-w-0">dardo (shared) · schema <code>monitor_mix_cheat</code></dd></div><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Auth</dt><dd className="min-w-0">Supabase email/password + magic link</dd></div><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Integrations</dt><dd className="min-w-0"><span className="mr-1 mb-1 inline-block rounded-full border border-border/60 px-2.5 py-0.5 text-xs">PostHog</span></dd></div><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Linear</dt><dd className="min-w-0">P-PLX-20 pilot migration</dd></div></dl>
    </article>
<article className="panel p-6">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-lg font-bold">Mission Control</h3>
        <span className="text-right text-xs text-emerald-400">live</span>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">Internal ops dashboard — Linear / PostHog / Stripe read-only views</p>
      <dl className="mt-4 space-y-2 text-sm"><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Stack</dt><dd className="min-w-0">Vite + React + api/ proxy routes</dd></div><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Source</dt><dd className="min-w-0"><code>~/workspace/mission-control</code></dd></div><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Hosting</dt><dd className="min-w-0">Vercel · Vercel (team scope — not visible via API)</dd></div><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Live URL</dt><dd className="min-w-0">https://mission-control-hw8t1tbra-stevepeeles-projects.vercel.app</dd></div><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Data home</dt><dd className="min-w-0">dardo (shared) · schema <code>mission_control (reserved — auth only today)</code></dd></div><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Auth</dt><dd className="min-w-0">Supabase email/password + magic link (restricted to steve@stevepeeleii.com)</dd></div><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Integrations</dt><dd className="min-w-0"><span className="mr-1 mb-1 inline-block rounded-full border border-border/60 px-2.5 py-0.5 text-xs">Linear API</span><span className="mr-1 mb-1 inline-block rounded-full border border-border/60 px-2.5 py-0.5 text-xs">PostHog API</span><span className="mr-1 mb-1 inline-block rounded-full border border-border/60 px-2.5 py-0.5 text-xs">Stripe (read-only)</span></dd></div><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Linear</dt><dd className="min-w-0">v2 sprint PLX-175–183</dd></div></dl>
    </article>
<article className="panel p-6">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-lg font-bold">Snout</h3>
        <span className="text-right text-xs text-amber-400">built — deploy pending</span>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">Plain-language prompt → 4-tier tech-stack recommendations (MVP → top tier) with pricing</p>
      <dl className="mt-4 space-y-2 text-sm"><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Stack</dt><dd className="min-w-0">Next.js 16 + React 19 + TypeScript + Tailwind v4</dd></div><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Source</dt><dd className="min-w-0"><code>~/workspace/snout</code></dd></div><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Hosting</dt><dd className="min-w-0">Vercel · Vercel (deploy status TBD)</dd></div><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Live URL</dt><dd className="min-w-0">TBD</dd></div><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Data home</dt><dd className="min-w-0">dardo (shared) · schema <code>snout</code></dd></div><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Auth</dt><dd className="min-w-0">Supabase optional (degrades gracefully to localStorage)</dd></div><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Integrations</dt><dd className="min-w-0"><span className="mr-1 mb-1 inline-block rounded-full border border-border/60 px-2.5 py-0.5 text-xs">Segment optional</span></dd></div><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Linear</dt><dd className="min-w-0">P-PLX-22</dd></div></dl>
    </article>
<article className="panel p-6">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-lg font-bold">FlipList</h3>
        <span className="text-right text-xs text-emerald-400">live</span>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">Marketplace listing manager — format once for FB / Craigslist / Nextdoor, track status</p>
      <dl className="mt-4 space-y-2 text-sm"><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Stack</dt><dd className="min-w-0">Next.js 14 + Tailwind</dd></div><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Source</dt><dd className="min-w-0"><code>~/workspace/fliplist</code></dd></div><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Hosting</dt><dd className="min-w-0">Vercel · Vercel project prj_jlE7sx85GZCuMphZMNrbMLZVO30P</dd></div><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Live URL</dt><dd className="min-w-0">https://fliplist-26qtxmr7u-stevepeeles-projects.vercel.app</dd></div><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Data home</dt><dd className="min-w-0">dardo (shared) · schema <code>fliplist</code></dd></div><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Auth</dt><dd className="min-w-0">Supabase magic-link + password</dd></div><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Integrations</dt><dd className="min-w-0"><span className="mr-1 mb-1 inline-block rounded-full border border-border/60 px-2.5 py-0.5 text-xs">Supabase Storage (item photos)</span><span className="mr-1 mb-1 inline-block rounded-full border border-border/60 px-2.5 py-0.5 text-xs">PostHog</span></dd></div><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Linear</dt><dd className="min-w-0">P-PLX-23 (Pub)</dd></div></dl>
    </article>
<article className="panel p-6">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-lg font-bold">AI Ops Command Center</h3>
        <span className="text-right text-xs text-amber-400">built + verified — deploy blocked on Vercel daily quota</span>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">Internal read-only AI observability — SRE, FinOps, governance, usage intelligence</p>
      <dl className="mt-4 space-y-2 text-sm"><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Stack</dt><dd className="min-w-0">Next.js 14 + TypeScript + Tailwind</dd></div><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Source</dt><dd className="min-w-0"><code>~/workspace/ai-ops-command-center</code></dd></div><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Hosting</dt><dd className="min-w-0">Vercel · Vercel project `ai-ops-command-center` (created, not deployed)</dd></div><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Live URL</dt><dd className="min-w-0">not deployed yet</dd></div><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Data home</dt><dd className="min-w-0">dardo (shared) · schema <code>aocc</code></dd></div><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Auth</dt><dd className="min-w-0">email/password + magic link (first user steve@stevepeeleii.com → admin)</dd></div><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Integrations</dt><dd className="min-w-0"><span className="mr-1 mb-1 inline-block rounded-full border border-border/60 px-2.5 py-0.5 text-xs">/api/ingest + /api/alerts/evaluate (smoke-tested)</span><span className="mr-1 mb-1 inline-block rounded-full border border-border/60 px-2.5 py-0.5 text-xs">Demo Mode seeded (4,340 demo rows)</span></dd></div><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Linear</dt><dd className="min-w-0">P-PLX-21</dd></div></dl>
    </article>
<article className="panel p-6">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-lg font-bold">Local Growth Engine app</h3>
        <span className="text-right text-xs text-amber-400">v1 code complete — deploy + acceptance tests pending</span>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">Private internal ops app for Local Growth Fix ($750 site-conversion service)</p>
      <dl className="mt-4 space-y-2 text-sm"><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Stack</dt><dd className="min-w-0">Next.js + Supabase auth + RLS</dd></div><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Source</dt><dd className="min-w-0"><code>~/workspace/local-growth-engine-app</code></dd></div><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Hosting</dt><dd className="min-w-0">Vercel · not deployed yet</dd></div><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Live URL</dt><dd className="min-w-0">not deployed yet</dd></div><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Data home</dt><dd className="min-w-0">dardo (shared) · schema <code>local_growth_engine</code></dd></div><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Auth</dt><dd className="min-w-0">Supabase magic-link</dd></div><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Integrations</dt><dd className="min-w-0"><span className="text-muted-foreground">—</span></dd></div><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Linear</dt><dd className="min-w-0">P-PLX-19 (internal, no Pub label)</dd></div></dl>
    </article>
<article className="panel p-6">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-lg font-bold">Binsly</h3>
        <span className="text-right text-xs text-emerald-400">live — outside custom-code portfolio scope</span>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">Link-in-bio / content (stays on Base44 per his order)</p>
      <dl className="mt-4 space-y-2 text-sm"><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Stack</dt><dd className="min-w-0">Base44 (external)</dd></div><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Source</dt><dd className="min-w-0"><code>Base44 workspace (external)</code></dd></div><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Hosting</dt><dd className="min-w-0">Base44 · Base44-managed</dd></div><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Live URL</dt><dd className="min-w-0">https://linklib.base44.app</dd></div><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Data home</dt><dd className="min-w-0">Base44-managed (external)</dd></div><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Auth</dt><dd className="min-w-0">Base44 auth</dd></div><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Integrations</dt><dd className="min-w-0"><span className="text-muted-foreground">—</span></dd></div><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Linear</dt><dd className="min-w-0">n/a</dd></div></dl>
    </article>
<article className="panel p-6">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-lg font-bold">Roast</h3>
        <span className="text-right text-xs text-amber-400">ordered 2026-10-12 — v1 build not started</span>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">Landing Page Roast — URL → scored AI teardown, free teaser → $29 report</p>
      <dl className="mt-4 space-y-2 text-sm"><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Stack</dt><dd className="min-w-0">TBD</dd></div><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Source</dt><dd className="min-w-0"><code>not started</code></dd></div><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Hosting</dt><dd className="min-w-0">— · not started</dd></div><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Live URL</dt><dd className="min-w-0">n/a</dd></div><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Data home</dt><dd className="min-w-0">TBD</dd></div><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Auth</dt><dd className="min-w-0">TBD</dd></div><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Integrations</dt><dd className="min-w-0"><span className="text-muted-foreground">—</span></dd></div><div className="flex gap-3"><dt className="w-24 shrink-0 text-muted-foreground">Linear</dt><dd className="min-w-0">pending</dd></div></dl>
    </article></div>
        </section>

        <section className="mx-auto max-w-6xl space-y-6 px-5 py-20">
          <SectionHead n="04" sub="Every app, one tap away. All public links — nothing on this page needs a sign-in.">
            Live <span className="text-gradient">apps.</span>
          </SectionHead>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"><a href="https://stevepeeleii.com" target="_blank" rel="noreferrer" className="panel group flex flex-col p-5 transition-colors hover:border-primary/50">
      <div className="flex items-center justify-between gap-2">
        <p className="font-semibold">Main site</p>
        <span className="text-xs text-emerald-400">● live</span>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">Fractional Demand Portfolio — public home base (SPIIX, engagements, signal capture)</p>
      <span className="mt-3 inline-flex items-center gap-1 text-xs text-muted-foreground group-hover:text-foreground">Open <ArrowUpRight className="size-3.5" /></span>
    </a>
<a href="https://profolio-stevepeeles-projects.vercel.app" target="_blank" rel="noreferrer" className="panel group flex flex-col p-5 transition-colors hover:border-primary/50">
      <div className="flex items-center justify-between gap-2">
        <p className="font-semibold">Profolio</p>
        <span className="text-xs text-emerald-400">● live</span>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">Portfolio baselines — PDF export, per-page analytics, $29/yr paid tier</p>
      <span className="mt-3 inline-flex items-center gap-1 text-xs text-muted-foreground group-hover:text-foreground">Open <ArrowUpRight className="size-3.5" /></span>
    </a>
<a href="https://dardo-smoky.vercel.app" target="_blank" rel="noreferrer" className="panel group flex flex-col p-5 transition-colors hover:border-primary/50">
      <div className="flex items-center justify-between gap-2">
        <p className="font-semibold">Dardo</p>
        <span className="text-xs text-emerald-400">● live</span>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">AI sidekick for real-estate agents — one-tap capture, mileage, evening brief</p>
      <span className="mt-3 inline-flex items-center gap-1 text-xs text-muted-foreground group-hover:text-foreground">Open <ArrowUpRight className="size-3.5" /></span>
    </a>
<a href="https://stampd-stevepeeles-projects.vercel.app" target="_blank" rel="noreferrer" className="panel group flex flex-col p-5 transition-colors hover:border-primary/50">
      <div className="flex items-center justify-between gap-2">
        <p className="font-semibold">Stampd</p>
        <span className="text-xs text-emerald-400">● live</span>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">Time tracking — multi-rate + overtime, crew view, 3-tap start, employer share links</p>
      <span className="mt-3 inline-flex items-center gap-1 text-xs text-muted-foreground group-hover:text-foreground">Open <ArrowUpRight className="size-3.5" /></span>
    </a>
<a href="https://repurpose-engine-beryl.vercel.app" target="_blank" rel="noreferrer" className="panel group flex flex-col p-5 transition-colors hover:border-primary/50">
      <div className="flex items-center justify-between gap-2">
        <p className="font-semibold">Repurpose Engine</p>
        <span className="text-xs text-emerald-400">● live</span>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">Content repurposing — history, favorites, tone presets, AI generate</p>
      <span className="mt-3 inline-flex items-center gap-1 text-xs text-muted-foreground group-hover:text-foreground">Open <ArrowUpRight className="size-3.5" /></span>
    </a>
<a href="https://gigsplit-stevepeeles-projects.vercel.app" target="_blank" rel="noreferrer" className="panel group flex flex-col p-5 transition-colors hover:border-primary/50">
      <div className="flex items-center justify-between gap-2">
        <p className="font-semibold">GigSplit</p>
        <span className="text-xs text-emerald-400">● live</span>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">Band share sheet — saved lineups, splits</p>
      <span className="mt-3 inline-flex items-center gap-1 text-xs text-muted-foreground group-hover:text-foreground">Open <ArrowUpRight className="size-3.5" /></span>
    </a>
<a href="https://quotequick-stevepeeles-projects.vercel.app" target="_blank" rel="noreferrer" className="panel group flex flex-col p-5 transition-colors hover:border-primary/50">
      <div className="flex items-center justify-between gap-2">
        <p className="font-semibold">QuoteQuick</p>
        <span className="text-xs text-emerald-400">● live</span>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">Quotes — customers, service catalog, approval links</p>
      <span className="mt-3 inline-flex items-center gap-1 text-xs text-muted-foreground group-hover:text-foreground">Open <ArrowUpRight className="size-3.5" /></span>
    </a>
<a href="https://stageplot-ai-stevepeeles-projects.vercel.app" target="_blank" rel="noreferrer" className="panel group flex flex-col p-5 transition-colors hover:border-primary/50">
      <div className="flex items-center justify-between gap-2">
        <p className="font-semibold">StagePlot AI</p>
        <span className="text-xs text-emerald-400">● live</span>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">Stage plots — drag-drop canvas, production PDF, shareable plot links</p>
      <span className="mt-3 inline-flex items-center gap-1 text-xs text-muted-foreground group-hover:text-foreground">Open <ArrowUpRight className="size-3.5" /></span>
    </a>
<a href="https://monitor-mix-cheat.vercel.app" target="_blank" rel="noreferrer" className="panel group flex flex-col p-5 transition-colors hover:border-primary/50">
      <div className="flex items-center justify-between gap-2">
        <p className="font-semibold">Monitor Mix Cheat</p>
        <span className="text-xs text-emerald-400">● live</span>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">Monitor-mix cheat sheets — print layout, share links, dark venue mode</p>
      <span className="mt-3 inline-flex items-center gap-1 text-xs text-muted-foreground group-hover:text-foreground">Open <ArrowUpRight className="size-3.5" /></span>
    </a>
<a href="https://mission-control-hw8t1tbra-stevepeeles-projects.vercel.app" target="_blank" rel="noreferrer" className="panel group flex flex-col p-5 transition-colors hover:border-primary/50">
      <div className="flex items-center justify-between gap-2">
        <p className="font-semibold">Mission Control</p>
        <span className="text-xs text-emerald-400">● live</span>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">Internal ops dashboard — Linear / PostHog / Stripe read-only views</p>
      <span className="mt-3 inline-flex items-center gap-1 text-xs text-muted-foreground group-hover:text-foreground">Open <ArrowUpRight className="size-3.5" /></span>
    </a>
<div className="panel flex flex-col p-5 opacity-80">
      <div className="flex items-center justify-between gap-2">
        <p className="font-semibold">Snout</p>
        <span className="text-xs text-amber-400">● pending</span>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">Plain-language prompt → 4-tier tech-stack recommendations (MVP → top tier) with pricing</p>
      <span className="mt-3 text-xs text-muted-foreground">TBD</span>
    </div>
<a href="https://fliplist-26qtxmr7u-stevepeeles-projects.vercel.app" target="_blank" rel="noreferrer" className="panel group flex flex-col p-5 transition-colors hover:border-primary/50">
      <div className="flex items-center justify-between gap-2">
        <p className="font-semibold">FlipList</p>
        <span className="text-xs text-emerald-400">● live</span>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">Marketplace listing manager — format once for FB / Craigslist / Nextdoor, track status</p>
      <span className="mt-3 inline-flex items-center gap-1 text-xs text-muted-foreground group-hover:text-foreground">Open <ArrowUpRight className="size-3.5" /></span>
    </a>
<div className="panel flex flex-col p-5 opacity-80">
      <div className="flex items-center justify-between gap-2">
        <p className="font-semibold">AI Ops Command Center</p>
        <span className="text-xs text-amber-400">● pending</span>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">Internal read-only AI observability — SRE, FinOps, governance, usage intelligence</p>
      <span className="mt-3 text-xs text-muted-foreground">not deployed yet</span>
    </div>
<div className="panel flex flex-col p-5 opacity-80">
      <div className="flex items-center justify-between gap-2">
        <p className="font-semibold">Local Growth Engine app</p>
        <span className="text-xs text-amber-400">● pending</span>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">Private internal ops app for Local Growth Fix ($750 site-conversion service)</p>
      <span className="mt-3 text-xs text-muted-foreground">not deployed yet</span>
    </div>
<a href="https://linklib.base44.app" target="_blank" rel="noreferrer" className="panel group flex flex-col p-5 transition-colors hover:border-primary/50">
      <div className="flex items-center justify-between gap-2">
        <p className="font-semibold">Binsly</p>
        <span className="text-xs text-emerald-400">● live</span>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">Link-in-bio / content (stays on Base44 per his order)</p>
      <span className="mt-3 inline-flex items-center gap-1 text-xs text-muted-foreground group-hover:text-foreground">Open <ArrowUpRight className="size-3.5" /></span>
    </a>
<div className="panel flex flex-col p-5 opacity-80">
      <div className="flex items-center justify-between gap-2">
        <p className="font-semibold">Roast</p>
        <span className="text-xs text-muted-foreground">● not started</span>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">Landing Page Roast — URL → scored AI teardown, free teaser → $29 report</p>
      <span className="mt-3 text-xs text-muted-foreground">n/a</span>
    </div></div>
        </section>

        <section className="mx-auto max-w-6xl space-y-6 px-5 py-20">
          <SectionHead n="05" sub="Live where a public API allows it; deep links everywhere else. Secrets stay server-side — nothing here exposes a key.">
            Real-time <span className="text-gradient">monitoring.</span>
          </SectionHead>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <GitHubTile />
            {LINK_TILES.map((t) => (
              <a
                key={t.name}
                href={t.href}
                target="_blank"
                rel="noreferrer"
                className="panel group flex flex-col p-5 transition-colors hover:border-primary/50"
              >
                <div className="flex items-center justify-between">
                  <p className="font-semibold">{t.name}</p>
                  <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                    <span className="size-2 rounded-full bg-muted-foreground/60" aria-hidden="true" /> link
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{t.fact}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs text-muted-foreground group-hover:text-foreground">
                  Open <ArrowUpRight className="size-3.5" />
                </span>
              </a>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl space-y-6 px-5 py-20">
          <SectionHead n="06" sub="Live board snapshot, refreshed by the Linear dashboard sync.">
            Linear <span className="text-gradient">board.</span>
          </SectionHead>
          <LinearDashboard />
        </section>

        <section className="mx-auto max-w-6xl space-y-6 px-5 py-20">
          <SectionHead n="07" sub="The commands and locations that keep this page truthful.">
            <span className="text-gradient">Runbook.</span>
          </SectionHead>
          <div className="panel space-y-6 p-6 sm:p-8">
            <div>
              <h3 className="font-display text-lg font-bold">Regenerate this page</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Edit <code>~/workspace/your_files/portfolio-architecture/data.json</code>, then run{" "}
                <code>python3 build.py</code> — it emits both the standalone HTML and this route
                (<code>src/routes/scaffolding.architecture.tsx</code>). Commit + push; publish via Lovable.
              </p>
            </div>
            <div>
              <h3 className="font-display text-lg font-bold">Deploy an app</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                App sources live in <code>~/workspace/&lt;app&gt;</code>. Vercel projects deploy via file
                upload (none are git-connected). Watch the 100-deploys/day free-tier quota — it blocked
                two deploys on 2026-10-12.
              </p>
            </div>
            <div>
              <h3 className="font-display text-lg font-bold">Secrets</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Vercel env per project · Supabase PAT in Secure Vault · Stripe keys in Vercel env only.
                Never in the repo, never in chat. Four Vercel projects sit under a separate team scope
                (dardo, stageplot-ai, gigsplit, mission-control) — their env is source-derived, unverified via API.
              </p>
            </div>
            <div>
              <h3 className="font-display text-lg font-bold">Isolation model</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Schema grants (each app sees only its schema) + RLS per user row. Supabase Auth is
                project-level — schemas separate data, not identity (accepted trade-off; revisit at 100
                MAU per app). The <code>platform</code> schema is service-role only, never exposed to PostgREST.
              </p>
            </div>
            <div>
              <h3 className="font-display text-lg font-bold">Key references</h3>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                <li>Linear: P-PLX-8 (Main Site) · P-PLX-20 (Platform Architecture) · P-PLX-21/22/23 (apps)</li>
                <li>Supabase: <code>yphcackwchaxguzamyzq</code> (profolio) · <code>sddcdfpgbgawoywupmvz</code> (dardo, shared)</li>
                <li>Inventory roots: <code>~/workspace/platform-architecture/</code> (Phase 1, PLX-198)</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl space-y-6 px-5 py-20">
          <SectionHead n="08" sub="Platform services everything above plugs into.">
            Shared <span className="text-gradient">services.</span>
          </SectionHead>
          <div className="panel overflow-x-auto"><table className="w-full text-left text-sm">
      <thead><tr className="border-b border-border/60 text-xs tracking-widest text-muted-foreground uppercase">
        <th className="px-4 py-3">Service</th><th className="px-4 py-3">Role</th><th className="px-4 py-3">Detail</th>
      </tr></thead><tbody><tr className="border-b border-border/60 last:border-0"><td className="px-4 py-3 font-semibold whitespace-nowrap align-top">Supabase org</td><td className="px-4 py-3 text-muted-foreground align-top">Auth + Postgres + Storage for the whole portfolio</td><td className="px-4 py-3 text-muted-foreground align-top">2 projects at free-tier max: profolio (Profolio only) + dardo (shared platform DB, 12 per-app schemas). Paused legacy project deleted 2026-10-12.</td></tr><tr className="border-b border-border/60 last:border-0"><td className="px-4 py-3 font-semibold whitespace-nowrap align-top">Vercel (team: stevepeeles-projects)</td><td className="px-4 py-3 text-muted-foreground align-top">Hosting for every custom-code app</td><td className="px-4 py-3 text-muted-foreground align-top">Projects deploy via file upload — none are git-connected; sources live in ~/workspace only. 4 projects sit under a separate team scope (API couldn&#x27;t list them). Free tier: 100 deploys/day — quota blocked 2 deploys on 2026-10-12.</td></tr><tr className="border-b border-border/60 last:border-0"><td className="px-4 py-3 font-semibold whitespace-nowrap align-top">GitHub</td><td className="px-4 py-3 text-muted-foreground align-top">Source of truth for code</td><td className="px-4 py-3 text-muted-foreground align-top">Main site repo stevepeele/portfolio-craft-56 (connected). App repos local-only in ~/workspace; FlipList has 2 unpushed commits.</td></tr><tr className="border-b border-border/60 last:border-0"><td className="px-4 py-3 font-semibold whitespace-nowrap align-top">Lovable</td><td className="px-4 py-3 text-muted-foreground align-top">Main-site build + auto-publish</td><td className="px-4 py-3 text-muted-foreground align-top">Fractional Demand Portfolio project; pushes to main sync into the editor; auto-publish via deploy API (standing approval).</td></tr><tr className="border-b border-border/60 last:border-0"><td className="px-4 py-3 font-semibold whitespace-nowrap align-top">Base44</td><td className="px-4 py-3 text-muted-foreground align-top">Binsly hosting (external)</td><td className="px-4 py-3 text-muted-foreground align-top">Binsly lives at linklib.base44.app on Base44&#x27;s infra — outside the Supabase/Vercel topology.</td></tr><tr className="border-b border-border/60 last:border-0"><td className="px-4 py-3 font-semibold whitespace-nowrap align-top">Segment</td><td className="px-4 py-3 text-muted-foreground align-top">Sitewide analytics (main site)</td><td className="px-4 py-3 text-muted-foreground align-top">Initialized in root route, page + CTA event tracking. Optional in Snout.</td></tr><tr className="border-b border-border/60 last:border-0"><td className="px-4 py-3 font-semibold whitespace-nowrap align-top">PostHog</td><td className="px-4 py-3 text-muted-foreground align-top">Product analytics in the apps</td><td className="px-4 py-3 text-muted-foreground align-top">VITE_POSTHOG_KEY / NEXT_PUBLIC keys per app; also read back by Mission Control.</td></tr><tr className="border-b border-border/60 last:border-0"><td className="px-4 py-3 font-semibold whitespace-nowrap align-top">Stripe</td><td className="px-4 py-3 text-muted-foreground align-top">Payments</td><td className="px-4 py-3 text-muted-foreground align-top">Live in Profolio only ($29/yr product, checkout/webhook/portal). Unconnected everywhere else.</td></tr><tr className="border-b border-border/60 last:border-0"><td className="px-4 py-3 font-semibold whitespace-nowrap align-top">OpenAI</td><td className="px-4 py-3 text-muted-foreground align-top">AI generation</td><td className="px-4 py-3 text-muted-foreground align-top">Repurpose Engine api/generate (key not yet pasted — feature dormant until then).</td></tr><tr className="border-b border-border/60 last:border-0"><td className="px-4 py-3 font-semibold whitespace-nowrap align-top">Linear API</td><td className="px-4 py-3 text-muted-foreground align-top">Ops data</td><td className="px-4 py-3 text-muted-foreground align-top">Read by Mission Control (api/ proxy routes). 15 -preview Vercel projects are Local Growth Engine client previews.</td></tr><tr className="border-b border-border/60 last:border-0"><td className="px-4 py-3 font-semibold whitespace-nowrap align-top">HubSpot</td><td className="px-4 py-3 text-muted-foreground align-top">Main-site chat + CRM</td><td className="px-4 py-3 text-muted-foreground align-top">Live Chat flows on stevepeeleii.com; signed in as CRM of record 2026-10-12.</td></tr></tbody></table></div>
        </section>

        <section className="mx-auto max-w-4xl px-5 pb-24">
          <SectionHead n="09" sub="Assumptions and limits baked into the diagrams above.">
            Notes &amp; <span className="text-gradient">caveats.</span>
          </SectionHead>
          <ul className="mt-6 list-disc space-y-2 pl-5 text-muted-foreground"><li>Auth is uniform: every Supabase-backed app uses email/password + magic link. Supabase Auth is project-level — per-app schemas separate data, not identity (accepted trade-off, P-PLX-20; revisit at 100 MAU/app).</li><li>4 apps have Supabase auth but no tables yet (StagePlot AI, GigSplit, Repurpose Engine, Mission Control) — localStorage-first; schemas reserved.</li><li>User counts are trivial: 2 test users per Supabase project; zero production user data at risk.</li><li>Monitor Mix Cheat schema migration is in flight: code updated locally, redeploy + public-wrapper cleanup blocked on Vercel quota.</li><li>Vercel API couldn&#x27;t list 4 projects (dardo, stageplot-ai, gigsplit, mission-control) — separate team scope; env vars there are source-derived, unverified via API.</li></ul>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
