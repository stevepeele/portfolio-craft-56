import { createServerFn } from "@tanstack/react-start";
import { setResponseHeader } from "@tanstack/react-start/server";
import { growthLadderSignupSchema } from "./growth-ladders-leads";

export const recordGrowthLadderSignup = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => growthLadderSignupSchema.parse(input))
  .handler(async ({ data }) => {
    setResponseHeader("Cache-Control", "no-store");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("growth_ladders_signups").upsert({
      id: data.id, name: data.name, email: data.email, company: data.company,
      role: data.role, weakest_rung: data.weakestRung, scores: data.scores,
    }, { onConflict: "id", ignoreDuplicates: true });
    if (error) { console.error("Growth Ladders record failed", error.code); return { stored: false }; }
    return { stored: true };
  });
