import { createFileRoute } from "@tanstack/react-router";
import { SpiixShell } from "@/components/spiix-shell";

export const Route = createFileRoute("/spiix")({ component: SpiixShell });