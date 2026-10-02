import { createFileRoute } from "@tanstack/react-router";
import { OfferPage } from "@/components/offer-page";
import { getOffer } from "@/data/offers";

const offer = getOffer("website-build");
export const Route = createFileRoute("/services/website-build")({ head: () => ({ meta: [{ title: "Conversion-Focused Website Builds — Steve Peele II" }, { name: "description", content: offer.summary }, { name: "robots", content: "noindex, nofollow" }, { property: "og:title", content: offer.name }, { property: "og:description", content: offer.summary }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }], links: [{ rel: "canonical", href: "https://stevepeeleii.com/services/website-build" }] }), component: () => <OfferPage offer={offer} /> });