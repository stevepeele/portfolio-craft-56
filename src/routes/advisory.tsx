import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/advisory")({ beforeLoad: () => { throw redirect({ to: "/spiix", statusCode: 301 }); } });