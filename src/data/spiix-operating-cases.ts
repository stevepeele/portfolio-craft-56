export const operatingCases = [
  {
    title: "The lead target was hiding the routing failure.",
    context: "Illustrative B2B SaaS scenario. Two equivalent 30-day cohorts of 400 inbound leads, with equal channel mix and enough time to reach sales acceptance. These are invented teaching numbers—not an anonymized client result.",
    reading: "Lead volume held steady. Most rejection reasons were missing. A routing audit found duplicate records and no accountable owner for high-fit handoffs. More acquisition would have enlarged the leak.",
    intervention: "Signal: reconcile rejection reasons. Strategy: prioritize handoff quality over volume. Systems: assign one owner, deduplicate records, and route high-fit inquiries into a visible queue. Scale: hold spend until acceptance and response-time guardrails stabilize.",
    rows: [["Inbound leads", "400", "400"], ["Sales-accepted opportunities", "60", "90"], ["Acceptance rate", "15%", "22.5%"], ["Median first response", "18 hours", "4 hours"], ["Acquisition spend", "$12,000", "$12,000"], ["Cost per accepted opportunity", "$200", "$133.33"]],
    outcome: "The scenario produces 30 additional accepted opportunities and a 33.3% lower acquisition cost per accepted opportunity. It does not establish won revenue. Review stage progression, win rate, and sales capacity before increasing spend.",
    limitation: "A before/after comparison cannot isolate causality. Keep a holdout queue where practical; log concurrent sales staffing and pricing changes.",
  },
  {
    title: "A conversion win that was commercially worse.",
    context: "Illustrative acquisition experiment. Equal spend and 2,000 visitors per variant. Buyers are assigned consistently and evaluated over the same sales-maturity window. This is a worked scenario, not engagement evidence.",
    reading: "Variant B made it easier to submit, increasing leads by 50%. But sales accepted fewer of them. The landing-page dashboard declared a win while the commercial chain lost value.",
    intervention: "Read acceptance by cohort rather than aggregate lead rate. Preserve the original variant. Rewrite the buyer/problem statement and restore one qualification question. Keep the primary measure at accepted opportunities per visitor, with response time and cost as guardrails.",
    rows: [["Visitors", "2,000", "2,000"], ["Leads", "100", "150"], ["Visitor-to-lead rate", "5%", "7.5%"], ["Accepted opportunities", "30", "24"], ["Lead acceptance", "30%", "16%"], ["Spend", "$6,000", "$6,000"], ["Cost per accepted opportunity", "$200", "$250"]],
    outcome: "Variant B creates 50 more leads but six fewer accepted opportunities. Cost per accepted opportunity rises 25%. Stop expansion, inspect rejection reasons, and test message fit—not a still-shorter form.",
    limitation: "Small counts are directional, not proof of a durable effect. Set an adequate test horizon and uncertainty threshold before launch. Do not backfill a success criterion after seeing the result.",
  },
] as const;