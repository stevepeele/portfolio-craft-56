import { createFileRoute } from "@tanstack/react-router";
import { SpiixEngagementPage } from "@/components/spiix-page";
import { getSpiixEngagement } from "@/data/spiix";
const engagement=getSpiixEngagement("gtm-audit");
export const Route=createFileRoute("/spiix/engage/gtm-audit")({head:()=>({meta:[{title:`${engagement.label} — SPIIX`},{name:"description",content:engagement.summary},{property:"og:title",content:`${engagement.label} — SPIIX`},{property:"og:description",content:engagement.summary},{property:"og:type",content:"website"},{name:"twitter:card",content:"summary"}],links:[{rel:"canonical",href:"https://stevepeeleii.com/spiix/engage/gtm-audit"}]}),component:()=> <SpiixEngagementPage slug="gtm-audit"/>});