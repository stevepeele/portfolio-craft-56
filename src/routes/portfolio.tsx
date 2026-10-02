import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/portfolio")({
  beforeLoad: () => {
    throw redirect({ to: "/work", hash: "projects", statusCode: 301 });
  },
});
