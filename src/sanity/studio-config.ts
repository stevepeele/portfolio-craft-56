import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";
import { structure } from "./structure";
import { stagedForReviewBadge } from "./review-workflow";

const projectId = import.meta.env["VITE_SANITY_PROJECT_ID"] as string;
const dataset = import.meta.env["VITE_SANITY_DATASET"] as string;

export const sanityStudioConfig = defineConfig({
  name: "default",
  title: "Steve Peele II — Content Studio",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [structureTool({ structure }), visionTool()],
  schema: { types: schemaTypes },
  document: {
    badges: (prev, context) =>
      context.schemaType === "post" ? [...prev, stagedForReviewBadge] : prev,
  },
});
