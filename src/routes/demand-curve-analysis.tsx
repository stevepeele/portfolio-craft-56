import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowRight,
  BarChart3,
  Check,
  CircleDot,
  Eye,
  FlaskConical,
  Gauge,
  Lightbulb,
  Route as RouteIcon,
  Scale,
  Target,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const pageUrl = "https://stevepeeleii.com/demand-curve-analysis";

export const Route = createFileRoute("/demand-curve-analysis")({
  head: () => ({
    meta: [
      { title: "Demand Curve — Growth & Conversion Analysis | Steve Peele II" },
      {
        name: "description",
        content:
          "Steve Peele II's independent growth and conversion analysis of Demand Curve's landing-page offer, proof architecture, acquisition paths, and measurement model.",
      },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Demand Curve — Growth & Conversion Analysis" },
      {
        property: "og:description",
        content:
          "An operator's assessment of the path from paid click to qualified pipeline, revenue, and learning.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: pageUrl },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: pageUrl }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "Demand Curve — Growth & Conversion Analysis",
          description:
            "An independent analysis of Demand Curve's landing-page offer and paid-click-to-revenue conversion system.",
          author: { "@type": "Person", name: "Steve Peele II", url: "https://stevepeeleii.com" },
          mainEntityOfPage: pageUrl,
        }),
      },
    ],
  }),
  component: DemandCurveAnalysis,
});

const framework = [
  { label: "Observe", icon: Eye },
  { label: "Identify friction", icon: CircleDot },
  { label: "Prioritize leverage", icon: Target },
  { label: "Form a hypothesis", icon: Lightbulb },
  { label: "Test", icon: FlaskConical },
  { label: "Measure impact", icon: BarChart3 },
] as const;

const proof = [
  { company: "WorkOS", result: "9x", detail: "qualified leads from Google" },
  { company: "Snitcher", result: "~4x", detail: "paid revenue in 12 months" },
  { company: "FirmPilot", result: "8x+", detail: "ROAS" },
] as const;

const sections = [
  { id: "read", label: "My read" },
  { id: "immediate", label: "Immediate" },
  { id: "longer-term", label: "Longer term" },
  { id: "theses", label: "Strategic theses" },
  { id: "priorities", label: "Prioritization" },
] as const;

const segmentRows = [
  ["B2B / SaaS", "Paid acquisition", "Qualified pipeline", "Sales acceptance"],
  ["PLG", "Paid acquisition", "Signup + activation", "Retained user"],
  ["Ecommerce", "Paid acquisition", "Product experience", "Purchase + LTV"],
  ["Enterprise", "Demand generation", "Qualification", "Pipeline + revenue"],
] as const;

function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const available = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(available > 0 ? Math.min(100, (window.scrollY / available) * 100) : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-0.5 bg-border/40" aria-hidden="true">
      <div
        className="h-full bg-primary transition-[width] duration-150 motion-reduce:transition-none"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

function AnalysisHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
        <Link to="/" className="font-display text-sm font-bold">
          Steve Peele <span className="text-gradient">II</span>
        </Link>
        <span className="hidden text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase sm:block">
          Independent analysis
        </span>
        <Button asChild size="sm">
          <Link to="/contact">Let's Talk</Link>
        </Button>
      </div>
    </header>
  );
}

function SectionLabel({ number, children }: { number: string; children: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-display text-sm font-bold text-primary">{number}</span>
      <p className="eyebrow">{children}</p>
    </div>
  );
}

function DetailBlock({
  title,
  children,
  accent = false,
}: {
  title: string;
  children: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <div className={accent ? "border-l-2 border-primary pl-5" : "border-l border-border pl-5"}>
      <h3 className="text-xs font-bold tracking-[0.16em] text-muted-foreground uppercase">{title}</h3>
      <div className="mt-3 text-[0.98rem] leading-7 text-foreground/85">{children}</div>
    </div>
  );
}

function Measures({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
          <Check className="size-4 shrink-0 text-primary" aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
  );
}

function Opportunity({
  number,
  title,
  observation,
  hypothesis,
  experiment,
  measures,
  closing,
}: {
  number: string;
  title: string;
  observation: React.ReactNode;
  hypothesis: React.ReactNode;
  experiment: React.ReactNode;
  measures: string[];
  closing?: React.ReactNode;
}) {
  return (
    <article className="border-t border-border py-14 first:border-t-0 first:pt-0 sm:py-20">
      <SectionLabel number={number}>Opportunity</SectionLabel>
      <h2 className="mt-5 max-w-4xl text-3xl font-bold sm:text-4xl">{title}</h2>
      <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:gap-12">
        <DetailBlock title="Observation">{observation}</DetailBlock>
        <DetailBlock title="Hypothesis" accent>
          {hypothesis}
        </DetailBlock>
        <DetailBlock title="Experiment">{experiment}</DetailBlock>
        <DetailBlock title="Primary measures">
          <Measures items={measures} />
        </DetailBlock>
      </div>
      {closing ? (
        <blockquote className="mt-10 border-y border-border py-6 font-display text-xl font-semibold leading-relaxed sm:text-2xl">
          {closing}
        </blockquote>
      ) : null}
    </article>
  );
}

function DemandCurveAnalysis() {
  return (
    <div className="min-h-screen bg-background">
      <ReadingProgress />
      <AnalysisHeader />

      <main>
        <section className="hero-surface border-b border-border/60">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:py-28 lg:py-32">
            <div className="grid items-end gap-12 lg:grid-cols-[1fr_20rem]">
              <div>
                <p className="eyebrow">Growth & conversion analysis · September 2026</p>
                <h1 className="mt-6 max-w-5xl text-5xl leading-[1.02] font-bold sm:text-6xl lg:text-7xl">
                  Demand Curve
                  <span className="mt-2 block text-gradient">The page isn't the product.</span>
                </h1>
                <p className="mt-7 max-w-3xl text-lg leading-8 text-muted-foreground sm:text-xl">
                  An operator's assessment of the system between a paid click and economically valuable
                  growth — where the offer is strong, where friction remains, and where the moat could
                  get interesting.
                </p>
                <a href="#read" className="btn-primary mt-10">
                  Read the analysis <ArrowDown className="size-4" />
                </a>
              </div>

              <dl className="divide-y divide-border border-y border-border text-sm">
                <div className="flex justify-between gap-5 py-4">
                  <dt className="text-muted-foreground">Author</dt>
                  <dd className="font-semibold">Steve Peele II</dd>
                </div>
                <div className="flex justify-between gap-5 py-4">
                  <dt className="text-muted-foreground">Lens</dt>
                  <dd className="text-right font-semibold">Growth systems</dd>
                </div>
                <div className="flex justify-between gap-5 py-4">
                  <dt className="text-muted-foreground">Focus</dt>
                  <dd className="text-right font-semibold">Click → revenue</dd>
                </div>
                <div className="flex justify-between gap-5 py-4">
                  <dt className="text-muted-foreground">Read time</dt>
                  <dd className="font-semibold">12 minutes</dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-5">
          <div className="grid gap-12 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-20">
            <aside className="hidden lg:block">
              <nav className="sticky top-24 py-16" aria-label="Analysis sections">
                <p className="text-xs font-bold tracking-[0.16em] text-muted-foreground uppercase">
                  In this analysis
                </p>
                <ol className="mt-6 space-y-4 border-l border-border pl-4">
                  {sections.map((section, index) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className="flex gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <span className="font-display text-xs text-primary">0{index + 1}</span>
                        {section.label}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </aside>

            <div className="min-w-0">
              <section id="read" className="scroll-mt-24 py-20 sm:py-28">
                <SectionLabel number="00">My read</SectionLabel>
                <div className="mt-6 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
                  <div>
                    <h2 className="text-3xl font-bold sm:text-4xl">
                      A strong offer with an opportunity to demonstrate more of the rigor it sells.
                    </h2>
                    <div className="mt-7 space-y-5 text-lg leading-8 text-muted-foreground">
                      <p>
                        Demand Curve understands something many landing-page shops miss: the page is not
                        the product. The conversion system is the product.
                      </p>
                      <p>
                        Its paid-acquisition positioning and audit → redesign → test model are directionally
                        sound. The bigger question is whether the page itself demonstrates the level of
                        growth rigor the company is selling.
                      </p>
                    </div>
                  </div>
                  <blockquote className="panel flex items-center p-7 font-display text-2xl font-semibold leading-relaxed sm:p-9">
                    “The opportunity isn't a prettier page. It's a tighter loop between acquisition,
                    qualification, revenue and learning.”
                  </blockquote>
                </div>

                <div className="mt-16 border-y border-border py-8">
                  <p className="eyebrow">The operating loop</p>
                  <ol className="mt-7 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-3 xl:grid-cols-6">
                    {framework.map((item, index) => (
                      <li key={item.label} className="relative bg-background p-5">
                        <item.icon className="size-5 text-primary" aria-hidden="true" />
                        <span className="mt-5 block text-xs text-muted-foreground">0{index + 1}</span>
                        <span className="mt-1 block text-sm font-semibold">{item.label}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </section>

              <section id="immediate" className="scroll-mt-24 border-t border-border py-20 sm:py-28">
                <p className="eyebrow">Immediate opportunities</p>
                <h2 className="mt-4 max-w-3xl text-4xl font-bold sm:text-5xl">
                  Improve the first decision window.
                </h2>

                <div className="mt-16">
                  <Opportunity
                    number="01"
                    title="Make the value proposition qualify the buyer faster."
                    observation={
                      <div className="space-y-4">
                        <p>
                          “Great ads get the click. We design the pages that convert.” is clean and
                          understandable. But it establishes a category more than it establishes relevance.
                        </p>
                        <p>
                          A performance marketer still has to determine whether the offer fits their company,
                          acquisition model and commercial outcome — and why Demand Curve is the better choice.
                        </p>
                      </div>
                    }
                    hypothesis={
                      <p>
                        Make the ICP, problem and commercial outcome explicit above the fold. Qualified visitors
                        can self-identify faster; everyone else can self-select out.
                      </p>
                    }
                    experiment={
                      <div>
                        <p className="font-display text-xl font-semibold text-foreground">
                          Turn more paid clicks into qualified pipeline.
                        </p>
                        <p className="mt-2">
                          Landing-page audits, redesigns and experimentation for high-growth SaaS and B2B teams.
                        </p>
                        <div className="mt-5 flex flex-wrap gap-2">
                          {["Hundreds of pages optimized", "Built in weeks", "Tested against your control"].map(
                            (item) => (
                              <span key={item} className="rounded-full border border-input px-3 py-1 text-xs">
                                {item}
                              </span>
                            ),
                          )}
                        </div>
                      </div>
                    }
                    measures={[
                      "Hero CTA click-through",
                      "Qualified conversion rate",
                      "Bounce rate",
                      "Visitor → meeting rate",
                      "Meeting → opportunity rate",
                    ]}
                    closing="If someone has to scroll to understand who this is for and why it matters, we've already spent some of the conversion budget."
                  />

                  <Opportunity
                    number="02"
                    title="Move proof closer to the moment of skepticism."
                    observation={
                      <p>
                        The problem isn't a lack of performance evidence. It's proof architecture. Quantified
                        outcomes exist, but evidence is most useful while the buyer is deciding whether to keep
                        going.
                      </p>
                    }
                    hypothesis={
                      <p>
                        Move the strongest quantified customer outcomes into the first decision window and give
                        each enough context to read like an experiment result, not a logo wall.
                      </p>
                    }
                    experiment={
                      <div className="grid gap-3">
                        {proof.map((item) => (
                          <div key={item.company} className="flex items-baseline justify-between gap-4 border-b border-border pb-3">
                            <span className="font-semibold text-foreground">{item.company}</span>
                            <span className="text-right text-sm text-muted-foreground">
                              <strong className="mr-2 font-display text-xl text-foreground">{item.result}</strong>
                              {item.detail}
                            </span>
                          </div>
                        ))}
                        <p className="mt-2 text-sm">For each: Baseline → Intervention → Outcome.</p>
                      </div>
                    }
                    measures={[
                      "Scroll depth to CTA",
                      "CTA conversion",
                      "Case-study engagement",
                      "Meeting conversion",
                      "Sales-cycle progression",
                    ]}
                    closing="Don't make me believe you. Show me the experiment."
                  />
                </div>
              </section>

              <section id="longer-term" className="scroll-mt-24 border-t border-border py-20 sm:py-28">
                <p className="eyebrow">Longer-term opportunities</p>
                <h2 className="mt-4 max-w-3xl text-4xl font-bold sm:text-5xl">
                  Turn the page into an acquisition system.
                </h2>

                <div className="mt-16">
                  <Opportunity
                    number="03"
                    title="Stop making one page do the work of five acquisition experiences."
                    observation={
                      <p>
                        A SaaS founder, B2B demand-gen leader, PLG team, ecommerce marketer and enterprise
                        organization can arrive at the same URL with entirely different jobs to be done.
                      </p>
                    }
                    hypothesis={
                      <p>
                        Conversion should improve when each visitor experiences continuity across intent,
                        message, proof, experience and CTA instead of making that connection themselves.
                      </p>
                    }
                    experiment={
                      <div className="overflow-x-auto">
                        <table className="w-full min-w-[34rem] text-left text-sm">
                          <thead>
                            <tr className="border-b border-border text-xs text-muted-foreground uppercase">
                              <th className="pb-3 font-semibold">Segment</th>
                              <th className="pb-3 font-semibold">Source</th>
                              <th className="pb-3 font-semibold">Experience</th>
                              <th className="pb-3 font-semibold">Outcome</th>
                            </tr>
                          </thead>
                          <tbody>
                            {segmentRows.map((row) => (
                              <tr key={row[0]} className="border-b border-border/60">
                                {row.map((cell, index) => (
                                  <td key={cell} className={`py-3 pr-4 ${index === 0 ? "font-semibold text-foreground" : "text-muted-foreground"}`}>
                                    {cell}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    }
                    measures={[
                      "Message-match rate",
                      "Conversion by source",
                      "Qualified conversion rate",
                      "Cost per qualified opportunity",
                      "Pipeline per visitor",
                    ]}
                    closing="Treat the landing page less like a webpage and more like a routing layer for intent."
                  />

                  <Opportunity
                    number="04"
                    title="Turn Signal from a claim into an acquisition product."
                    observation={
                      <p>
                        Proprietary data and AI are difficult to evaluate when presented primarily as a
                        capability. The buyer cannot experience the advantage before buying.
                      </p>
                    }
                    hypothesis={
                      <p>
                        An interactive Signal benchmark can turn the differentiator from brand claim into proof
                        mechanism and, eventually, a demand-generation engine.
                      </p>
                    }
                    experiment={
                      <div>
                        <p className="font-semibold text-foreground">Signal Conversion Benchmark</p>
                        <p className="mt-2">
                          A prospect submits a page and receives a visual benchmark across message clarity,
                          intent alignment, proof, CTA architecture, friction, mobile experience, hierarchy and
                          conversion path.
                        </p>
                        <div className="mt-5 rounded-lg border border-primary/40 bg-primary/10 p-4 text-sm text-foreground">
                          “Your primary value proposition appears after the visitor has already encountered
                          three competing messages.”
                        </div>
                      </div>
                    }
                    measures={[
                      "Benchmark requests",
                      "Benchmark → meeting rate",
                      "Meeting → opportunity rate",
                      "Sales-cycle velocity",
                      "Win rate",
                    ]}
                    closing="Useful specificity creates demand."
                  />
                </div>
              </section>

              <section id="theses" className="scroll-mt-24 border-t border-border py-20 sm:py-28">
                <p className="eyebrow">Longer-term strategic theses</p>
                <h2 className="mt-4 max-w-3xl text-4xl font-bold sm:text-5xl">
                  The moat isn't the page. It's what the system learns.
                </h2>

                <div className="mt-14 divide-y divide-border border-y border-border">
                  <article className="grid gap-6 py-12 lg:grid-cols-[10rem_1fr]">
                    <SectionLabel number="05">Thesis</SectionLabel>
                    <div>
                      <h3 className="text-3xl font-bold">The real product is paid-click-to-revenue conversion.</h3>
                      <p className="mt-5 max-w-3xl leading-7 text-muted-foreground">
                        Landing pages are one layer. The more interesting system connects traffic, intent,
                        message match, experience, conversion, qualification, sales and revenue. Demand Curve's
                        work already reaches CRM, measurement, lead scoring, campaign architecture, creative
                        testing and LTV. The page can remain the entry point; the broader operating system is the
                        value.
                      </p>
                      <div className="mt-7 flex flex-wrap items-center gap-2 text-sm font-semibold">
                        {["Traffic", "Intent", "Message", "Experience", "Qualification", "Revenue"].map(
                          (item, index, values) => (
                            <span key={item} className="inline-flex items-center gap-2">
                              <span className="rounded-full border border-input px-3 py-1.5">{item}</span>
                              {index < values.length - 1 ? <ArrowRight className="size-3 text-muted-foreground" /> : null}
                            </span>
                          ),
                        )}
                      </div>
                    </div>
                  </article>

                  <article className="grid gap-6 py-12 lg:grid-cols-[10rem_1fr]">
                    <SectionLabel number="06">Thesis</SectionLabel>
                    <div>
                      <h3 className="text-3xl font-bold">Make every engagement compound into proprietary intelligence.</h3>
                      <p className="mt-5 max-w-3xl leading-7 text-muted-foreground">
                        Structure, anonymize and aggregate what every engagement produces: audience, source,
                        intent, offer, economics, architecture, objections, hypothesis, result, lead quality and
                        revenue outcome. Each new engagement should benefit from the last one.
                      </p>
                      <div className="panel mt-7 p-6 sm:p-8">
                        <div className="grid items-center gap-4 text-center text-sm font-semibold sm:grid-cols-[1fr_auto_1fr_auto_1fr]">
                          <span>More experiments</span>
                          <ArrowRight className="mx-auto size-4 text-primary max-sm:rotate-90" />
                          <span>Better benchmarks</span>
                          <ArrowRight className="mx-auto size-4 text-primary max-sm:rotate-90" />
                          <span>Better outcomes</span>
                        </div>
                      </div>
                    </div>
                  </article>

                  <article className="grid gap-6 py-12 lg:grid-cols-[10rem_1fr]">
                    <SectionLabel number="07">Thesis</SectionLabel>
                    <div>
                      <h3 className="text-3xl font-bold">Graduate from conversion rate optimization to conversion economics.</h3>
                      <p className="mt-5 max-w-3xl leading-7 text-muted-foreground">
                        A form submission, signup or opportunity is not automatically a win. The useful question
                        is whether the experiment created economically valuable growth.
                      </p>
                      <div className="mt-7 grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
                        {["Visitor", "Lead", "Qualified", "Opportunity", "Closed won", "LTV"].map((item) => (
                          <div key={item} className="border-t-2 border-primary pt-3 text-sm font-semibold">
                            {item}
                          </div>
                        ))}
                      </div>
                      <p className="mt-7 text-sm text-muted-foreground">
                        Guardrails: CAC · lead quality · sales acceptance · opportunity conversion · pipeline
                        velocity
                      </p>
                    </div>
                  </article>
                </div>
              </section>

              <section id="priorities" className="scroll-mt-24 border-t border-border py-20 sm:py-28">
                <p className="eyebrow">Prioritization</p>
                <h2 className="mt-4 max-w-3xl text-4xl font-bold sm:text-5xl">
                  Don't rebuild everything. Sequence the leverage.
                </h2>

                <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-border bg-border lg:grid-cols-3">
                  {[
                    {
                      phase: "Now",
                      description: "Low complexity. Clean testing surface.",
                      items: ["Clarify buyer + outcome above the fold", "Move quantified proof into the first decision window"],
                    },
                    {
                      phase: "Next",
                      description: "Build the scalable acquisition engine.",
                      items: ["Create segmented acquisition experiences", "Productize Signal into a diagnostic"],
                    },
                    {
                      phase: "Then",
                      description: "Turn learning into the moat.",
                      items: ["Expand from pages to conversion systems", "Build the proprietary learning loop", "Tie experiments to revenue economics"],
                    },
                  ].map((item, index) => (
                    <article key={item.phase} className="bg-surface p-7 sm:p-8">
                      <span className="font-display text-4xl font-bold text-gradient">0{index + 1}</span>
                      <h3 className="mt-5 text-2xl font-bold">{item.phase}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                      <ul className="mt-7 space-y-4">
                        {item.items.map((line) => (
                          <li key={line} className="flex gap-3 text-sm leading-6">
                            <Check className="mt-1 size-4 shrink-0 text-primary" />
                            {line}
                          </li>
                        ))}
                      </ul>
                    </article>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>

        <section className="border-y border-border bg-surface/40">
          <div className="mx-auto max-w-5xl px-5 py-20 text-center sm:py-28">
            <Gauge className="mx-auto size-7 text-primary" aria-hidden="true" />
            <p className="eyebrow mt-6">The bigger observation</p>
            <h2 className="mx-auto mt-5 max-w-4xl text-4xl leading-tight font-bold sm:text-5xl">
              Make the website behave more like the growth system being sold.
            </h2>
            <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-muted-foreground">
              Tighten the loop from acquisition to message match, UX, proof, conversion, qualification,
              revenue and learning — then feed that learning into the next experiment.
            </p>
            <div className="mx-auto mt-10 max-w-3xl border-y border-border py-7 font-display text-xl font-semibold leading-relaxed sm:text-2xl">
              Find the constraint. Form the hypothesis. Run the experiment. Measure the business outcome.
              Repeat.
            </div>
          </div>
        </section>

        <section className="hero-surface">
          <div className="mx-auto max-w-4xl px-5 py-20 text-center sm:py-24">
            <Scale className="mx-auto size-7 text-primary" aria-hidden="true" />
            <h2 className="mt-6 text-4xl font-bold sm:text-5xl">Want this kind of read on your growth system?</h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
              I work across strategy, acquisition, marketing operations and revenue — with the business outcome
              as the measure.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg">
                <Link to="/contact">
                  Let's Talk <ArrowRight />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/experience">
                  View experience <RouteIcon />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-background">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>Independent analysis by Steve Peele II.</p>
          <p>Not affiliated with or endorsed by Demand Curve.</p>
        </div>
      </footer>
    </div>
  );
}