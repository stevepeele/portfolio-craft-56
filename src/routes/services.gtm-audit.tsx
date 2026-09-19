import { createFileRoute } from "@tanstack/react-router";
import { OfferPage } from "@/components/offer-page";
import { getOffer } from "@/data/offers";

const offer = getOffer("gtm-audit");
export const Route = createFileRoute("/services/gtm-audit")({ head: () => ({ meta: [{ title: "5-Day GTM & Funnel Audit — Steve Peele II" }, { name: "description", content: offer.summary }, { name: "robots", content: "noindex, nofollow" }, { property: "og:title", content: offer.name }, { property: "og:description", content: offer.summary }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }] }), component: () => <OfferPage offer={offer} /> });