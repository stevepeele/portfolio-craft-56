import { z } from "zod";
import { rungs } from "./growth-ladders-diagnostic";
import { formsubmitSignalEndpoint } from "./spiix-leads";

export const growthLadderSignupSchema = z.object({
  id: z.string().uuid(),
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  company: z.string().trim().min(1).max(160),
  role: z.string().trim().min(1).max(160),
  weakestRung: z.enum(rungs).nullable(),
  scores: z.array(z.number().int().min(0).max(2)).max(8).nullable(),
});
export type GrowthLadderSignup = z.infer<typeof growthLadderSignupSchema>;

export function growthLadderPayload(input: GrowthLadderSignup) {
  const d = growthLadderSignupSchema.parse(input);
  return {
    name: d.name, email: d.email, company: d.company, role: d.role,
    weakest_rung: d.weakestRung ?? "not taken",
    _subject: "New Growth Ladders signup", _template: "table",
  };
}

export async function deliverGrowthLadderSignup(input: GrowthLadderSignup) {
  const body = JSON.stringify(growthLadderPayload(input));
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const res = await fetch(formsubmitSignalEndpoint, {
        method: "POST", body, keepalive: true,
        headers: { "Content-Type": "application/json", Accept: "application/json" },
      });
      if (res.ok) return true;
    } catch { /* never block the reader */ }
  }
  return false;
}
