import { createServerFn } from "@tanstack/react-start";
import { setResponseHeader } from "@tanstack/react-start/server";
import { serverSpamCheck } from "./spam-guard.server";
import { growthLadderSignupSchema } from "./growth-ladders-leads";

export const recordGrowthLadderSignup = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => growthLadderSignupSchema.parse(input))
  .handler(async ({ data }) => {
    setResponseHeader("Cache-Control", "no-store");
    // Spam hardening (PLX-76): silent reject, never throws — bots can't
    // distinguish a block from a success.
    if (serverSpamCheck(data, "growth-ladders")) return { stored: false };
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("growth_ladders_signups").upsert({
      id: data.id, name: data.name, email: data.email, company: data.company,
      role: data.role, weakest_rung: data.weakestRung, scores: data.scores,
    }, { onConflict: "id", ignoreDuplicates: true });
    if (error) { console.error("Growth Ladders record failed", error.code); return { stored: false }; }
    return { stored: true };
  });
