import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/services")({
  component: ServicesLayout,
  head: () => ({
    meta: [
      { title: "Services — Steve Peele II" },
      {
        name: "description",
        content:
          "Growth advisory, GTM audits, and fractional leadership services from Steve Peele II.",
      },
      { property: "og:title", content: "Services — Steve Peele II" },
      {
        property: "og:description",
        content: "Growth advisory, GTM audits, and fractional leadership services.",
      },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://stevepeeleii.com/services" }],
  }),
});

function ServicesLayout() {
  return <Outlet />;
}