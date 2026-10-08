import { z } from "zod";

export const challengeSchema = z.object({
  challenge: z.string().trim().min(30, "Add a little more context — at least 30 characters.").max(4000, "Keep your challenge under 4,000 characters."),
});

export const recommendationSchema = z.object({
  pathway: z.enum(["gtm-audit", "fractional-advisory", "elite-mentorship"]),
  headline: z.string(),
  rationale: z.string(),
  nextSteps: z.array(z.string()),
  question: z.string(),
}).strict();

export type PathwayRecommendation = z.infer<typeof recommendationSchema>;
export type GuidanceResponse = { recommendation: PathwayRecommendation | null; error: string | null };