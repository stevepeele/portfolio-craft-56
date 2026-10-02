export type Tier = {
  name: string;
  price: string;
  cadence?: string;
  features: string[];
  bestFor: string;
  popular?: boolean;
};

export type Offer = {
  slug: "gtm-audit" | "website-build" | "logistics";
  eyebrow: string;
  name: string;
  headline: string;
  lede: string;
  summary: string;
  stats: { value: string; label: string }[];
  whatYouGet: string[];
  howItRuns: { step: string; title: string; detail: string }[];
  tiers: Tier[];
  closing: { title: string; detail: string };
};

export const offerEntity = {
  brand: "Pan Labs Consulting, LLC",
  email: "steve@stevepeeleii.com",
  phone: "513.505.0624",
};

export const offers: Offer[] = [
  {
    slug: "gtm-audit",
    eyebrow: "Growth marketing & GTM strategy",
    name: "The 5-Day GTM & Funnel Audit",
    headline: "Find the highest-leverage fixes in five days.",
    lede:
      "A fixed-scope diagnostic that finds your highest-leverage fixes — delivered as a ready-to-execute action plan, not a deck.",
    summary:
      "A five-day diagnostic of your funnel, channels, and conversion points, delivered as a prioritized action plan you can execute immediately.",
    stats: [
      { value: "14+", label: "Years in growth marketing" },
      { value: "$350M+", label: "Annual pipeline supported" },
      { value: "$8M+", label: "Marketing budgets managed" },
      { value: "5+", label: "Regions integrated" },
    ],
    whatYouGet: [
      "A full review of your current funnel, channels, and conversion points.",
      "A written, prioritized action plan — ranked by impact vs. effort, not a wish list.",
      "A 45-minute walkthrough call to present findings and answer questions.",
      "A direct read on what matters now, what can wait, and what the team should stop doing.",
    ],
    howItRuns: [
      {
        step: "1",
        title: "Kickoff",
        detail: "45-minute call plus access to analytics, CRM, and ad accounts.",
      },
      {
        step: "2",
        title: "Audit",
        detail: "Three days of hands-on review — funnel, channels, CAC/LTV levers.",
      },
      {
        step: "3",
        title: "Delivery",
        detail: "Written action plan and walkthrough call, done within 5 business days.",
      },
    ],
    tiers: [
      {
        name: "Snapshot",
        price: "$750",
        features: ["Funnel + channel review", "Written summary", "No live call"],
        bestFor: "Solo founders, very early stage",
      },
      {
        name: "Standard Audit",
        price: "$1,500",
        popular: true,
        features: [
          "Full audit + written plan",
          "45-minute walkthrough call",
          "Prioritized by impact",
        ],
        bestFor: "Seed to Series A teams",
      },
      {
        name: "Audit + Roadmap",
        price: "$3,000",
        features: [
          "Everything in Standard",
          "30-day execution roadmap",
          "Owner & timeline assigned",
        ],
        bestFor: "Teams ready to execute now",
      },
    ],
    closing: {
      title: "Ready when you are.",
      detail: "This offer is scoped and priced — reach out to lock in a start date.",
    },
  },
  {
    slug: "website-build",
    eyebrow: "Conversion-focused web builds",
    name: "A Website Built to Convert",
    headline: "A website built to convert, not just look good.",
    lede:
      "Fixed-scope website builds and refreshes for small and mid-sized companies — designed by a growth marketer, not just a designer.",
    summary:
      "Fixed-scope builds and refreshes with analytics and conversion tracking wired in from day one.",
    stats: [
      { value: "1–4 wks", label: "Typical turnaround" },
      { value: "Fixed", label: "Price, no surprise invoices" },
      { value: "Mobile-first", label: "Every build, every time" },
      { value: "Built-in", label: "Analytics & conversion tracking" },
    ],
    whatYouGet: [
      "A modern, mobile-first site that reflects your brand and actually loads fast.",
      "Clear calls-to-action mapped to how your customers actually decide.",
      "Analytics and conversion tracking set up and explained in plain language.",
      "A short walkthrough so your team can update content without calling a developer.",
    ],
    howItRuns: [
      {
        step: "1",
        title: "Discovery",
        detail: "Short call to confirm goals, pages needed, and content you already have.",
      },
      {
        step: "2",
        title: "Build",
        detail: "Design and build in a private preview link — you see progress as it happens.",
      },
      {
        step: "3",
        title: "Launch",
        detail: "Final review, analytics check, go-live, and a walkthrough of how to manage it.",
      },
    ],
    tiers: [
      {
        name: "Landing Sprint",
        price: "$750",
        features: ["1 high-converting page", "Mobile-first build", "Basic analytics setup"],
        bestFor: "A single offer, event, or launch",
      },
      {
        name: "Full Site Rebuild",
        price: "$2,500",
        popular: true,
        features: ["Up to 6 pages", "Mobile-first + CMS", "Analytics & tracking included"],
        bestFor: "Replacing an outdated site",
      },
      {
        name: "Site + Growth Setup",
        price: "$4,500",
        features: [
          "Everything in Rebuild",
          "SEO foundation",
          "Conversion tracking & reporting",
        ],
        bestFor: "Teams ready to grow on it",
      },
    ],
    closing: {
      title: "Let's build something that pulls its weight.",
      detail:
        "Reach out to scope your project — pricing above is a starting point, not a final quote.",
    },
  },
  {
    slug: "logistics",
    eyebrow: "Digital presence management for freight & logistics",
    name: "Freight & Logistics Digital Management",
    headline: "Your freight moves fast. Your website shouldn't sit in park.",
    lede:
      "Monthly social media and website management built for freight, trucking, and logistics companies — so brokers, shippers, and drivers find a company that looks as reliable as it runs.",
    summary:
      "Monthly social content, website upkeep, and plain-language reporting for carriers and logistics operators.",
    stats: [
      { value: "14+ yrs", label: "Growth marketing experience" },
      { value: "$350M+", label: "Annual pipeline supported" },
      { value: "Fixed", label: "Monthly price, no surprises" },
      { value: "1", label: "Dedicated point of contact" },
    ],
    whatYouGet: [
      "Weekly social content — fleet updates, safety milestones, driver spotlights, hiring posts.",
      "Ongoing website upkeep — content updates, broken-link fixes, load-time and mobile checks.",
      "A monthly report in plain language: what got posted, what changed, what's working.",
      "One dedicated point of contact — no ticket queue, no rotating account managers.",
    ],
    howItRuns: [
      {
        step: "1",
        title: "Audit",
        detail: "Quick review of your current site and social accounts — what's working, what's not.",
      },
      {
        step: "2",
        title: "Setup",
        detail: "Content calendar built, website cleanup list created, tracking put in place.",
      },
      {
        step: "3",
        title: "Ongoing",
        detail: "Monthly management, posting, and reporting — cancel anytime, no long lock-in.",
      },
    ],
    tiers: [
      {
        name: "Visibility Starter",
        price: "$500",
        cadence: "/mo",
        features: ["2–3 social posts/week", "Basic website upkeep", "Monthly summary report"],
        bestFor: "Single-terminal or owner-operated fleets",
      },
      {
        name: "Growth Retainer",
        price: "$1,200",
        cadence: "/mo",
        popular: true,
        features: [
          "Daily social presence",
          "Website updates + basic SEO",
          "Monthly performance report",
        ],
        bestFor: "Growing regional carriers",
      },
      {
        name: "Full Digital Partner",
        price: "$2,500",
        cadence: "/mo",
        features: [
          "Everything in Growth",
          "Paid social & recruiting ads",
          "Quarterly strategy review",
        ],
        bestFor: "Multi-terminal operations",
      },
    ],
    closing: {
      title: "Let's get your digital presence moving as fast as your trucks.",
      detail:
        "Reach out to scope your account — pricing above is a starting point, adjustable to your fleet size.",
    },
  },
];

export const getOffer = (slug: Offer["slug"]) => offers.find((o) => o.slug === slug)!;

// SPIIX — advisory & mentorship practice of Pan Labs Consulting
export const advisory = {
  eyebrow: "Advisory & mentorship · Cincinnati, OH",
  headline: "Growth is a skill. This is where you build it.",
  lede:
    "SPIIX is the advisory and mentorship practice built off Pan Labs Consulting — direct access to the strategy, systems, and judgment behind $350M+ in pipeline, for the operators and leaders building their own.",
  stats: [
    { value: "14+", label: "Years scaling SaaS & tech" },
    { value: "$350M+", label: "Annual pipeline supported" },
    { value: "4", label: "Exit-related outcomes" },
  ],
  framing: {
    title: "Pan Labs is where I do the work. SPIIX is where I teach it.",
    body:
      "Consulting engagements solve one company's problem. SPIIX is the other side of that — a focused practice for the people building what I've already built: pipeline, teams, and go-to-market systems that hold up under pressure. No courses, no cohorts padded for scale. Just the calls that actually move you forward.",
  },
  audience: [
    "Marketing leaders stepping into their first VP or CMO seat and figuring out the job in real time.",
    "Founders building their first real growth engine and tired of guessing which channel to trust.",
    "Operators who need a second set of eyes on one hard decision — not another course.",
  ],
  tiers: [
    {
      name: "Working Session",
      price: "Single session",
      cadence: "one-time",
      features: [
        "90-minute deep dive on one constraint",
        "Written recap with the decision and next moves",
        "Async follow-up questions for two weeks",
      ],
      bestFor: "One hard decision that needs a second set of eyes",
    },
    {
      name: "Monthly Advisory",
      price: "Monthly cadence",
      cadence: "ongoing",
      popular: true,
      features: [
        "Two 1:1 calls a month on your priorities",
        "Review of plans, dashboards, and hiring decisions",
        "Direct message access between calls",
      ],
      bestFor: "New VP/CMO leaders and founders building the engine",
    },
    {
      name: "On-Call Partner",
      price: "Retainer",
      cadence: "ongoing",
      features: [
        "Weekly or on-demand cadence, set to your situation",
        "Board, budget, and GTM plan pressure-testing",
        "Same-day availability for the hard calls",
      ],
      bestFor: "Leaders in a high-stakes stretch who need judgment on tap",
    },
  ] satisfies Tier[],
  howItRuns: [
    {
      step: "1",
      title: "Apply",
      detail:
        "Tell me where you're stuck and what you're building toward. Every engagement starts with the real problem, not a form.",
    },
    {
      step: "2",
      title: "Diagnose",
      detail:
        "One working session to find the actual constraint — the thing underneath the thing you asked about.",
    },
    {
      step: "3",
      title: "Advise",
      detail:
        "Ongoing 1:1 cadence, set to the pace your situation needs — weekly, monthly, or on-call for the hard calls.",
    },
  ],
  advisor: [
    { label: "Now", detail: "Head of Marketing Operations & Global Integration, Launch by NTT DATA" },
    { label: "Scaled", detail: "Dotloop — founding team through acquisition by Zillow" },
    { label: "Operated", detail: "Across SaaS, technology, marketplaces, and growth-stage teams" },
    { label: "Base", detail: "Cincinnati, OH" },
  ],
  advisorBody:
    "Steve Peele II has spent 14+ years connecting marketing, product, sales, systems, and data for SaaS and technology companies — with $350M+ in annual pipeline exposure, $8M+ in managed budgets, and four exit-related outcomes. SPIIX turns that experience into practical judgment for your business, your team, and your numbers.",
};
