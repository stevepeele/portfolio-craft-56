import { createServerFn } from "@tanstack/react-start";
import { getRequest, setResponseHeader } from "@tanstack/react-start/server";
import { challengeSchema } from "./ai/recommendation-schema";
import { recommendPathway } from "./ai/guidance.server";

export const getSpiixGuidance = createServerFn({ method: 'POST' })
  .inputValidator((input: unknown) => challengeSchema.parse(input))
  .handler(async ({ data }) => {
    setResponseHeader('Cache-Control', 'no-store');
    return recommendPathway(data.challenge, getRequest());
  });