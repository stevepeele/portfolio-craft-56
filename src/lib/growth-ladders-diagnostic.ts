export const rungs = ["signal", "strategy", "systems", "scale"] as const;
export type Rung = (typeof rungs)[number];
export type Score = 0 | 1 | 2;

export const diagnosticItems: { rung: Rung; text: string }[] = [
  { rung: "signal", text: "For each metric on our main dashboard, we can name the last decision it changed." },
  { rung: "signal", text: "Marketing, sales, and finance report the same count for the same stage." },
  { rung: "strategy", text: "We can name the one constraint limiting useful output today, with evidence." },
  { rung: "strategy", text: "Our current priority has one owner, one metric, and a written stop rule." },
  { rung: "systems", text: "Every handoff has written acceptance criteria, a receiver, and a clock." },
  { rung: "systems", text: "Our critical workflow has a runbook a second operator has run end to end." },
  { rung: "scale", text: "We expand spend in bounded, reversible steps, not in one big commitment." },
  { rung: "scale", text: "A decision ledger records what we changed and what would reverse it." },
];

export function rungTotals(scores: Score[]): Record<Rung, number> {
  const totals: Record<Rung, number> = { signal: 0, strategy: 0, systems: 0, scale: 0 };
  diagnosticItems.forEach((item, i) => { totals[item.rung] += scores[i] ?? 0; });
  return totals;
}

/** Lowest total wins; ties go to the lower rung (lowest broken dependency). */
export function weakestRung(scores: Score[]): Rung {
  const totals = rungTotals(scores);
  let weakest: Rung = "signal";
  for (const r of rungs) if (totals[r] < totals[weakest]) weakest = r;
  return weakest;
}
