import { createFileRoute } from "@tanstack/react-router";
import { SpiixShell } from "@/components/spiix-shell";

export const Route = createFileRoute("/spiix")({
  component: SpiixShell,
  head: () => ({
    meta: [
      { title: "SPIIX — The Strategic Operating System for Growth" },
      {
        name: "description",
        content:
          "SPIIX is Steve Peele II's strategic operating system for B2B growth — diagnostics, blueprints, and engagement models for operators.",
      },
      { property: "og:title", content: "SPIIX — The Strategic Operating System for Growth" },
      {
        property: "og:description",
        content:
          "Diagnostics, blueprints, and engagement models for B2B growth operators.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
});