import { createFileRoute } from "@tanstack/react-router";
import "@/styles/core.css";
import { CORE_FONT_LINK } from "@/components/core-chrome";
import { CaseIndexView } from "@/components/case-study";

const title = "Case Studies | Steve Peele II";
const description =
  "Full case studies from Steve Peele II's career: Launch by NTT DATA, Dotloop's run to the Zillow Group acquisition, EBTH, Tixxy, and the growth seats — what each seat required, what was built, and the results.";

export const Route = createFileRoute("/experience/case-studies/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "https://stevepeeleii.com/experience/case-studies" },
      CORE_FONT_LINK,
    ],
  }),
  component: CaseIndexView,
});
