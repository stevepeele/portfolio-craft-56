/* Case studies under /experience/case-studies.
   Every fact in this module traces to Steve's resume of record
   (Steve_Peele_Resume_2026.pdf) or the site's resume data module
   (src/data/resume.ts), which agree. No metric appears here that is
   not in one of those two sources. */

export type CaseStat = { value: string; label: string };

export type CaseSeat = {
  company: string;
  role: string;
  period: string;
  points: string[];
  stats: CaseStat[];
};

export type CaseStudy = {
  slug: string;
  company: string;
  shortName: string;
  role: string;
  period: string;
  sector: string;
  headline: string;
  lede: string;
  context: string[];
  mandate: string[];
  built: string[];
  outcomes: string[];
  stats: CaseStat[];
  visual: "launch-lifecycle" | "dotloop-growth" | "ebth-efficiency" | "tixxy-stages" | "seats-lift";
  visualCaption: string;
  seats?: CaseSeat[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "launch-by-ntt-data",
    company: "Launch by NTT DATA",
    shortName: "Launch by NTT DATA",
    role: "Head of Marketing Operations & Global Integration Lead",
    period: "June 2020 – Present",
    sector: "Global IT services · Marketing operations",
    headline: "$350M+ in pipeline on a 4:1 return",
    lede: "Global marketing operations for NTT DATA Group, a global IT services firm with 190,000+ employees worldwide: the stack, the data, and the demand programs behind $350M+ in pipeline.",
    context: [
      "Launch by NTT DATA — formerly Nexient — is part of NTT DATA Group, a global IT services firm with 190,000+ employees worldwide. The seat carries a global marketing-operations remit and an $8M+ budget.",
      "Marketing, sales, and regional teams all ran demand programs, but the operating layer underneath them — the technology stack, the integrations, the lifecycle data, the reporting — needed one owner. That is the seat.",
    ],
    mandate: [
      "Steer global marketing operations across the $8M+ budget and hold digital demand initiatives to a measurable return. Own the marketing technology stack and its data integrations, and keep lifecycle data clean from first touch to closed-won, so pipeline numbers could be trusted at every stage.",
    ],
    built: [
      "The marketing technology stack and data integrations across HubSpot, Salesforce, and Segment — one connected lifecycle record from first touch to closed-won.",
      "Automated performance reporting and optimized execution workflows, accelerating campaign velocity 25%.",
      "ABM programs engineered with sales leadership, built to lift lead-to-deal conversion on target accounts.",
      "Digital demand initiatives run across the global remit against the budget's return standard.",
    ],
    outcomes: [
      "The programs generated $350M+ in pipeline revenue while driving 4:1 ROI across digital demand initiatives. The ABM programs lifted lead-to-deal conversion 40% and closed $25M+ in new revenue.",
    ],
    stats: [
      { value: "$350M+", label: "pipeline generated" },
      { value: "4:1", label: "ROI across digital demand initiatives" },
      { value: "$25M+", label: "new revenue closed through ABM" },
      { value: "$8M+", label: "global budget owned" },
    ],
    visual: "launch-lifecycle",
    visualCaption:
      "The operating system: demand programs and ABM feed one integrated stack (HubSpot, Salesforce, Segment), so a contact's record stays clean from first touch to closed-won and reporting runs off the same data.",
  },
  {
    slug: "dotloop",
    company: "Dotloop",
    shortName: "Dotloop",
    role: "Marketing Operations Manager",
    period: "August 2009 – February 2016",
    sector: "Real estate SaaS · Startup to acquisition",
    headline: "400%+ user growth, startup stage to Zillow Group",
    lede: "Joined at the startup stage and built the marketing infrastructure that carried Dotloop through scale-up and its acquisition by Zillow Group.",
    context: [
      "Dotloop is a real estate SaaS company. Steve joined at the startup stage, when marketing infrastructure was whatever the small team could stand up by hand, and stayed through hypergrowth to the company's acquisition by Zillow Group.",
      "It is the longest run on the record — six and a half years — and the seat where the operations-first approach was formed: build the system, automate the scoring and nurture, and let growth compound on top of it.",
    ],
    mandate: [
      "Own the marketing infrastructure end to end: the systems that captured demand, scored and nurtured leads, and reported on what was working, from early startup through acquisition.",
    ],
    built: [
      "Marketing infrastructure built from the early startup stage through scale-up and the Zillow Group acquisition.",
      "Automated lead scoring, so the sales team worked the ready buyers first.",
      "Automated nurture workflows that carried the rest of the market until it was ready.",
    ],
    outcomes: [
      "User growth of 400%+ across the run. The automated lead scoring and nurture workflows cut customer acquisition cost 35% — growth that got cheaper as it got bigger, which is the combination an acquirer pays for.",
    ],
    stats: [
      { value: "400%+", label: "user growth across the run" },
      { value: "−35%", label: "customer acquisition cost" },
      { value: "Zillow Group", label: "acquirer" },
      { value: "2009 – 2016", label: "startup stage through acquisition" },
    ],
    visual: "dotloop-growth",
    visualCaption:
      "Indexed user growth across the run (start of the run = 100) and the shape of the seat: startup stage, scale-up, acquisition.",
  },
  {
    slug: "everything-but-the-house",
    company: "Everything But The House",
    shortName: "EBTH",
    role: "Digital Growth Manager",
    period: "January – May 2020",
    sector: "E-commerce · Acquisition growth",
    headline: "50% new-user growth on 20% less spend",
    lede: "A five-month seat scaling SEO, PPC, and email acquisition for Everything But The House (EBTH): more new users, higher conversion, lower spend.",
    context: [
      "Everything But The House (EBTH) is an e-commerce company. The seat was acquisition, full stop: own the channels that bring new users in — search, paid, and email — and make them produce more for less.",
    ],
    mandate: [
      "Scale the three acquisition channels (SEO, PPC, email) together rather than one at a time, and improve the efficiency of the whole system: growth up, spend down.",
    ],
    built: [
      "SEO acquisition, scaled across the catalog and content surface.",
      "PPC acquisition, restructured around conversion rather than clicks.",
      "Email acquisition programs feeding the same funnel.",
    ],
    outcomes: [
      "New-user growth of 50%. Conversion lifted 30% while spend was cut 20% — the rare quarter where every side of the equation moved the right way at once.",
    ],
    stats: [
      { value: "+50%", label: "new-user growth" },
      { value: "+30%", label: "conversion lift" },
      { value: "−20%", label: "spend" },
      { value: "3", label: "channels scaled together: SEO, PPC, email" },
    ],
    visual: "ebth-efficiency",
    visualCaption: "The quarter in one picture: the two lines that should go up did, and the one that should go down did.",
  },
  {
    slug: "tixxy",
    company: "Tixxy",
    shortName: "Tixxy",
    role: "Founder & Head of Growth",
    period: "December 2020 – December 2023",
    sector: "Founder venture · Acquired",
    headline: "$1M+ ARR in year one, from zero",
    lede: "The founder seat: a full-funnel go-to-market engine built from scratch, $1M+ ARR in the first year, 300% user growth, and positioning that led to acquisition.",
    context: [
      "Tixxy was Steve's own venture — founded, built, and grown with no inherited brand, no list, and no pipeline. Everything a hired growth leader usually finds waiting had to be created: the positioning, the funnel, the lifecycle programs, the measurement.",
    ],
    mandate: [
      "Build the entire go-to-market engine from zero and grow the company into something an acquirer would want: real revenue, growing users, and retention economics that hold up in diligence.",
    ],
    built: [
      "A full-funnel GTM engine from scratch: positioning, acquisition, conversion, and lifecycle in one system.",
      "Lifecycle engagement programs aimed squarely at churn and lifetime value.",
    ],
    outcomes: [
      "$1M+ ARR in year one and 300% user growth. Lifecycle engagement cut churn 25%, lifting lifetime value $200 per user. The company was positioned for a $7M acquisition — and was acquired.",
    ],
    stats: [
      { value: "$1M+", label: "ARR in year one" },
      { value: "300%", label: "user growth" },
      { value: "−25%", label: "churn, via lifecycle engagement" },
      { value: "+$200", label: "lifetime value per user" },
    ],
    visual: "tixxy-stages",
    visualCaption: "Zero to one, in stages: nothing inherited, each stage built on the last.",
  },
  {
    slug: "growth-seats",
    company: "The Growth Seats",
    shortName: "Growth seats",
    role: "Director and VP seats, 2016 – 2022",
    period: "February 2016 – March 2022",
    sector: "SaaS, data infrastructure, media, e-commerce services",
    headline: "Five seats, one play, five different markets",
    lede: "Between the two long runs sit five growth seats — Inman News, Astronomer, API Nation, Buyside, and Amify. Different markets, same play: build the demand system, instrument it, and let the numbers argue.",
    context: [
      "Each of these seats was a variation on one job: walk into a funnel that is underperforming its market, rebuild the system underneath it — experiments, attribution, onboarding, positioning, content — and produce a number the business can plan around.",
      "They are collected on one page because the pattern is the point. The per-seat records follow, with the figures from each.",
    ],
    mandate: [],
    built: [],
    outcomes: [],
    stats: [
      { value: "+70%", label: "organic traffic at Inman News" },
      { value: "+60%", label: "qualified leads at Astronomer" },
      { value: "$6M", label: "incremental revenue at Amify" },
      { value: "5", label: "seats, 2016 – 2022" },
    ],
    visual: "seats-lift",
    visualCaption: "The headline lift from each seat, as recorded: five different funnels, five different levers.",
    seats: [
      {
        company: "Amify",
        role: "Fractional VP of Marketing & Organizational Repositioning Lead",
        period: "January 2021 – March 2022",
        points: [
          "Led the company-wide brand repositioning and go-to-market strategy.",
          "Ran data-driven paid marketing that cut acquisition costs while growing retention.",
        ],
        stats: [
          { value: "+35%", label: "brand recognition" },
          { value: "$6M", label: "incremental revenue" },
          { value: "−15%", label: "acquisition costs" },
          { value: "+10%", label: "retention" },
        ],
      },
      {
        company: "Buyside",
        role: "Director of Platform Growth",
        period: "May – December 2020",
        points: [
          "Drove user onboarding and product growth initiatives.",
          "Built the Tableau and Google Analytics tracking frameworks the team reported from.",
        ],
        stats: [
          { value: "+50%", label: "platform adoption" },
          { value: "+30%", label: "marketing efficiency" },
        ],
      },
      {
        company: "API Nation",
        role: "Head of Growth Marketing",
        period: "January – December 2019",
        points: [
          "Scaled demand generation in HubSpot across Meta and email.",
          "Rebuilt campaign measurement on multi-touch attribution, with iterative testing on top.",
        ],
        stats: [
          { value: "+50%", label: "inbound demand" },
          { value: "+45%", label: "campaign ROI" },
        ],
      },
      {
        company: "Astronomer",
        role: "Director of Growth Experimentation",
        period: "April 2017 – December 2019",
        points: [
          "Ran rapid experiments across pricing, segmentation, and funnel stages.",
          "Turned test velocity into qualified pipeline.",
        ],
        stats: [
          { value: "+60%", label: "qualified leads" },
          { value: "+30%", label: "funnel conversion" },
        ],
      },
      {
        company: "Inman News",
        role: "Director of Demand Generation",
        period: "February 2016 – April 2017",
        points: [
          "Drove organic growth through full-funnel content and technical SEO.",
          "Lifted mid-funnel conversion alongside the traffic growth.",
        ],
        stats: [
          { value: "+70%", label: "organic traffic growth" },
          { value: "+30%", label: "mid-funnel conversions" },
        ],
      },
    ],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}

export function caseNeighbors(slug: string): {
  prev: CaseStudy | undefined;
  next: CaseStudy | undefined;
} {
  const i = caseStudies.findIndex((c) => c.slug === slug);
  if (i === -1) return { prev: undefined, next: undefined };
  return {
    prev: i > 0 ? caseStudies[i - 1] : undefined,
    next: i < caseStudies.length - 1 ? caseStudies[i + 1] : undefined,
  };
}
