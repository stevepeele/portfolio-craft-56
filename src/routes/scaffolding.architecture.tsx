import { createFileRoute, Outlet } from "@tanstack/react-router";

const title = "Scaffolding — Main Site Infrastructure | Steve Peele II";
const description =
  "Private reference: stevepeeleii.com infrastructure — stack, scripts, data flows, deploys, env vars, DNS. Unlisted.";

export const Route = createFileRoute("/scaffolding/architecture")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "https://stevepeeleii.com/scaffolding/architecture" }],
  }),
  component: ArchitectureLayout,
});

function ArchitectureLayout() {
  return <Outlet />;
}
