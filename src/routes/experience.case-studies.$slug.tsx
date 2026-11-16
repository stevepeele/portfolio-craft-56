import { createFileRoute, notFound } from "@tanstack/react-router";
import "@/styles/core.css";
import { CORE_FONT_LINK } from "@/components/core-chrome";
import { CaseStudyView } from "@/components/case-study";
import { caseNeighbors, getCaseStudy } from "@/data/case-studies";

export const Route = createFileRoute("/experience/case-studies/$slug")({
  loader: ({ params }) => {
    const study = getCaseStudy(params.slug);
    if (!study) throw notFound();
    return { study, ...caseNeighbors(params.slug) };
  },
  head: ({ loaderData }) => {
    const study = loaderData?.study;
    const title = study
      ? `Case Study: ${study.company} | Steve Peele II`
      : "Case Study | Steve Peele II";
    const description = study
      ? `${study.company} — ${study.role}, ${study.period}. ${study.headline}. ${study.lede}`
      : "Case study from Steve Peele II's career in growth marketing and marketing operations.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [
        {
          rel: "canonical",
          href: `https://stevepeeleii.com/experience/case-studies/${study?.slug ?? ""}`,
        },
        CORE_FONT_LINK,
      ],
    };
  },
  component: CaseStudyRoute,
  notFoundComponent: () => (
    <div className="core-root">
      <main className="core-wrap">
        <div className="core-view-head">
          <h1>Case not found</h1>
          <p>That case study is not in the record. The full list is under Case studies.</p>
        </div>
      </main>
    </div>
  ),
});

function CaseStudyRoute() {
  const { study, prev, next } = Route.useLoaderData();
  return <CaseStudyView study={study} prev={prev} next={next} />;
}
