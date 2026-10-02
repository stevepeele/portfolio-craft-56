import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/recommendations")({
  beforeLoad: () => {
    throw redirect({ to: "/work", hash: "recommendations", statusCode: 301 });
  },
});
