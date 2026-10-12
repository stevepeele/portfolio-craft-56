import { createFileRoute, redirect } from "@tanstack/react-router";
// The Monolith was the working title for Growth Ladders (SPIIX Document 01).
// Retired 2026-10-11: permanent redirect into the Growth Ladders funnel.
export const Route = createFileRoute("/spiix/monolith")({
  beforeLoad: () => {
    throw redirect({ to: "/growth-ladders", statusCode: 301 });
  },
  head: () => ({
    meta: [
      { title: "Monolith has moved — Growth Ladders | Steve Peele II" },
      { name: "description", content: "The Monolith is now Growth Ladders, the SPIIX book." },
      { name: "robots", content: "noindex" },
    ],
  }),
});
