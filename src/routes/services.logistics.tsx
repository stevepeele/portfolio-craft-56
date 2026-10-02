import { createFileRoute } from "@tanstack/react-router";
import { OfferPage } from "@/components/offer-page";
import { getOffer } from "@/data/offers";

const offer = getOffer("logistics");
export const Route = createFileRoute("/services/logistics")({ head: () => ({ meta: [{ title: "Freight & Logistics Digital Management — Steve Peele II" }, { name: "description", content: offer.summary }, { name: "robots", content: "noindex, nofollow" }, { property: "og:title", content: offer.name }, { property: "og:description", content: offer.summary }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }], links: [{ rel: "canonical", href: "https://stevepeeleii.com/services/logistics" }] }), component: () => <OfferPage offer={offer} /> });