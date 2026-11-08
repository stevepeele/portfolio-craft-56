import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/recommendations")({
  beforeLoad: () => {
    // SPIIX-1199: recommendations now live on their own page at /quotes.
    throw redirect({ to: "/quotes", statusCode: 301 });
  },
});
