import { createFileRoute } from "@tanstack/react-router";
import { SpiixEngagementPage } from "@/components/spiix-page";
import { getSpiixEngagement } from "@/data/spiix";
const engagement=getSpiixEngagement("elite-mentorship");
export const Route=createFileRoute("/spiix/engage/elite-mentorship")({head:()=>({meta:[{title:`${engagement.label} — SPIIX`},{name:"description",content:engagement.summary},{property:"og:title",content:`${engagement.label} — SPIIX`},{property:"og:description",content:engagement.summary},{property:"og:type",content:"website"},{name:"twitter:card",content:"summary"}],links:[{rel:"canonical",href:"https://stevepeeleii.com/spiix/engage/elite-mentorship"}]}),component:()=> <SpiixEngagementPage slug="elite-mentorship"/>});