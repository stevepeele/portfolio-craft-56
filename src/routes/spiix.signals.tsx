import { createFileRoute, redirect } from "@tanstack/react-router";
// Consolidated 2026-10-11: /spiix/signals merged into /spiix/signal.
// One Signal page: the concept, the report, and the framework.
export const Route = createFileRoute("/spiix/signals")({
  beforeLoad: () => {
    throw redirect({ to: "/spiix/signal", statusCode: 301 });
  },
  head: () => ({
    meta: [
      { title: "Signal has moved — SPIIX | Steve Peele II" },
      { name: "description", content: "The Signal concept page now lives at /spiix/signal." },
      { name: "robots", content: "noindex" },
    ],
  }),
});
