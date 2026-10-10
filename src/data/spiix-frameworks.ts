export const osLayers = [
  { number: "01", name: "Signal", question: "What is actually happening?", output: "A trusted baseline and a named constraint", body: "Read the buyer journey before changing it. Reconcile CRM stages, acquisition sources, sales acceptance, retention, and unit economics. Segment the evidence: an average can hide the only customers worth acquiring.", skip: "You optimize a reporting artifact. More leads arrive, but sales rejects them and acquisition cost rises.", test: "Marketing and sales can reproduce the same cohort numbers and agree on the bottleneck.", owner: "Revenue leadership + operations" },
  { number: "02", name: "Strategy", question: "Which constraint deserves the next dollar?", output: "A choice, a hypothesis, and a stop rule", body: "Choose the buyer, problem, commercial outcome, and constraint. Rank interventions by downstream value, confidence, effort, and time to learn. Commit to a narrow test before committing to a large build.", skip: "The team ships disconnected work. Every channel gets attention; no commercial constraint gets resolved.", test: "One intervention has an owner, a primary metric, a guardrail, and a dated decision.", owner: "Growth leader + commercial owner" },
  { number: "03", name: "Systems", question: "Can the decision run without heroics?", output: "A measurable, repeatable workflow", body: "Install the workflow behind the choice: CRM definitions, routing, campaign logic, measurement, and handoff agreements. Build the smallest reliable system that closes the gap. Automation follows a working process, not the other way around.", skip: "A good idea stays dependent on a person. Leads stall at handoffs, data drifts, and every launch becomes a rescue.", test: "A second person can run the workflow, trace a record, and diagnose a failure.", owner: "Marketing operations + functional owners" },
  { number: "04", name: "Scale", question: "Does the result survive more volume?", output: "An allocation decision and the next baseline", body: "Expand only after the signal improves and the guardrails hold. Watch customer quality, cost, sales capacity, and retention alongside conversion. Revisit the constraint as volume changes; yesterday’s bottleneck may be solved.", skip: "You amplify the leak. Higher spend produces more activity while payback, quality, or delivery deteriorates.", test: "The result repeats across cohorts without breaking economics or operating capacity.", owner: "Executive sponsor + revenue team" },
] as const;

export const blueprintDepth = [
  { name: "Audit", time: "5 business days", input: "CRM, channel data, buyer journey, operating context", work: "Trace the funnel backward from revenue. Reconcile definitions, inspect handoffs, separate segment behavior, and rank the active constraints.", artifact: "Baseline, constraint map, prioritized diagnostic", exit: "The team agrees on what is broken and which evidence supports it." },
  { name: "Strategy", time: "2–3 weeks", input: "The diagnostic and commercial priorities", work: "Select the leverage point. Define the target buyer, message, intervention, experiment, dependencies, and decision criteria.", artifact: "Decision brief, test plan, sequencing, ownership", exit: "One test can be executed and judged without reinterpreting the strategy." },
  { name: "Build", time: "4–8 weeks", input: "Approved decisions and a bounded test", work: "Implement the workflows, routing, campaigns, instrumentation, and operating agreements. Validate real records through the complete path.", artifact: "Working system, measurement, runbook, handoff", exit: "The workflow operates end to end and its output can be read back." },
  { name: "Scale", time: "Ongoing monthly", input: "Observed results and operating capacity", work: "Review cohorts, allocate resources, remove the next constraint, and retire work that fails its stop rule. Feed the learning into the next audit.", artifact: "Allocation decisions, experiment ledger, next baseline", exit: "Economics and execution remain sound as volume increases." },
] as const;

export const signalReadings = [
  ["Acquisition", "Qualified opportunities by source and segment", "Traffic or cheap leads without sales acceptance", "Trace the cohort to opportunity and revenue before increasing spend."],
  ["Message", "The right buyer understands the problem and next step", "Clicks driven by curiosity without relevant intent", "Test a sharper buyer/problem claim; watch accepted-lead rate."],
  ["Conversion", "A stage improves without lowering customer quality", "Form fills rise while close rate falls", "Measure the next two stages, not just the local event."],
  ["Handoff", "Accepted leads advance within an agreed response window", "Sales and marketing debate two different totals", "Fix stage definitions, ownership, routing, and rejection reasons."],
  ["Economics", "Acquisition cost, payback, and retention support expansion", "Attributed pipeline is treated as booked revenue", "Separate opportunity value from won revenue and realized customer value."],
  ["Execution", "Work ships reliably and the team learns from it", "A busy calendar substitutes for a decision ledger", "Record the hypothesis, owner, result, and next allocation decision."],
] as const;

export const signalLoop = [
  { name: "Observe", text: "Name the commercial number. Read cohorts, buyer behavior, and operating failures. Check data completeness before drawing a conclusion." },
  { name: "Locate", text: "Find the stage that limits the whole system. Distinguish a symptom from a constraint: weak pipeline can come from targeting, conversion, or a broken handoff." },
  { name: "Decide", text: "State one testable hypothesis. Set the primary measure, guardrails, owner, review date, and evidence that would stop the work." },
  { name: "Act", text: "Run the smallest credible intervention. Hold unrelated changes steady so the result can inform a decision." },
  { name: "Read back", text: "Compare the relevant cohorts. Inspect downstream quality and cost. Scale, revise, or stop—and preserve the reason." },
] as const;

export const principles = [
  ["Growth is a system, not a campaign.", "A campaign can win attention. The system must convert that attention into accepted demand, revenue, and retained value."],
  ["Context comes before prescription.", "Stage, margin, sales motion, capacity, and customer behavior change the right answer. Borrow the reasoning, not someone else’s tactic."],
  ["Ownership is infrastructure.", "Every stage needs a definition, a responsible person, and a handoff agreement. A tool cannot resolve disputed accountability."],
  ["Automation follows a working process.", "Make the workflow correct, then make it faster. Automating a leak makes it more expensive."],
  ["A metric earns its place by changing a decision.", "Keep the readings that guide allocation. Label incomplete evidence and remove dashboard theater."],
  ["Scale is earned.", "A local conversion win is not permission to increase spend. Quality, payback, retention, and capacity must hold."],
] as const;

export const glossary = [
  ["Signal", "A defined measure with an agreed unit, cohort, time window, and decision attached."], ["Get the Signal", "The framework for defining measures, reading constraints, choosing an intervention, and checking the result."], ["The OS", "The mechanism that puts the framework to work through owners, workflows, decision rights, and review cadence."], ["Monolith", "The entire body of work: Get the Signal, the OS, Growth Ladders, operating guides, playbooks, instruments, and principles."], ["Noise", "Activity or data that does not resolve the decision at hand."],
  ["Constraint", "The limiting step that caps the system’s useful output."], ["Qualified opportunity", "A sales-accepted opportunity meeting an agreed buyer, need, and commercial definition."],
  ["Pipeline", "The value of open opportunities. Not booked revenue."], ["Pipeline velocity", "Expected won value per unit of time: opportunities × deal value × win rate ÷ sales-cycle length."],
  ["Conversion rate", "The share of a defined starting cohort that reaches a defined next stage."], ["Percentage point", "An absolute difference between rates. Moving from 2% to 3% is +1 point and +50% relative lift."],
  ["CAC", "Acquisition cost divided by acquired customers; define which costs and period are included."], ["Payback", "Time for customer contribution margin to recover acquisition cost."],
  ["Cohort", "A group sharing a start period or relevant characteristic, tracked consistently over time."], ["Guardrail", "A measure that must not deteriorate while the primary metric improves."],
  ["Stop rule", "A pre-agreed condition for ending, revising, or not scaling an experiment."], ["Decision ledger", "A record of the evidence, choice, owner, outcome, and next action."],
] as const;