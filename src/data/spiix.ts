import { spiixOriginal } from "./spiix-reference";

export const spiixPhases = spiixOriginal.dm.map(phase => ({ code: phase.step, name: phase.name, verb: phase.title, line: phase.title, detail: phase.summary, modules: phase.deliverables, cadence: phase.meta }));

export type SpiixEngagement = {
  slug: "gtm-audit" | "fractional-advisory" | "elite-mentorship";
  code: string; label: string; title: string; summary: string; best: string; shape: string;
  kpis: { value: string; label: string }[];
  gets: { title: string; body: string }[];
  steps: { name: string; body: string }[];
  tiers: { name: string; price: string; best: string; features: string[]; featured?: boolean }[];
};

export const spiixEngagements: SpiixEngagement[] = spiixOriginal.gm.map(item=>({slug:item.slug,code:item.code,label:item.name,title:item.hero,summary:item.sub,best:item.summary,shape:item.slug==="gtm-audit"?"Fixed scope · 5 business days":item.slug==="fractional-advisory"?"Ongoing · weekly, monthly, or on-call":"1:1 only · no cohorts",kpis:item.stats.map(stat=>({...stat})),gets:item.deliverables.map((body,index)=>({title:`Deliverable 0${index+1}`,body})),steps:item.process.map(step=>({name:step.name,body:step.detail})),tiers:item.tiers.map(tier=>({...tier,price:item.slug==="gtm-audit"&&tier.name==="Snapshot"?"$1,500":tier.price,features:[...tier.features]}))}));

export function getSpiixEngagement(slug: SpiixEngagement["slug"]) {
  const engagement = spiixEngagements.find((item) => item.slug === slug);
  if (!engagement) throw new Error(`Unknown SPIIX engagement: ${slug}`);
  return engagement;
}

export const spiixEvidence = [
  { company: "NTT DATA / Nexient", metric: "$350M+", note: "Annual pipeline exposure across 5+ regions", layers: "Signal · Systems · Scale" },
  { company: "dotloop", metric: "400%", note: "User growth during a major scale period before Zillow acquisition", layers: "Strategy · Systems · Scale" },
  { company: "Portfolio record", metric: "$120M+", note: "Revenue impact across relevant programs and operating roles", layers: "Signal · Strategy · Scale" },
  { company: "Managed programs", metric: "$8M+", note: "Marketing budget experience with disciplined ROI accountability", layers: "Strategy · Scale" },
] as const;

export const spiixNav = [
  { label: "The OS", to: "/spiix/os" }, { label: "Impact", to: "/spiix/impact" },
  { label: "Signals", to: "/spiix/signals" },
  { label: "Compare", to: "/spiix/compare" }, { label: "Connect", to: "/spiix/connect" },
] as const;