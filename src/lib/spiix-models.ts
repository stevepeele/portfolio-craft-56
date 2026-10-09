export function velocityScenario(velocity: number, adoption: number) {
  const baselineMonthly = 2_000_000;
  const months = Array.from({ length: 13 }, (_, month) => month);
  const adoptionValues = months.map(month => adoption * month / 12);
  let running = 0;
  const cumulative = months.map(month => { if (month > 0) running += baselineMonthly * (1 + velocity / 100 * (adoptionValues[month] ?? 0) / 100); return running; });
  return { baselineMonthly, baseline: baselineMonthly * 12, cumulative, adoptionValues, total: running, uplift: running - baselineMonthly * 12 };
}
export function impactScenario(revenue: number, lift: number, rampMonths: number) {
  const monthly = Array.from({ length: 25 }, (_, month) => revenue * (1 + lift / 100 * Math.min(month / rampMonths, 1)));
  const incremental = monthly.slice(1).reduce((total, amount) => total + amount - revenue, 0);
  return { monthly, incremental, final: monthly[24] ?? revenue, baseline: revenue * 24 };
}