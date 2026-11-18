import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/services/")({ beforeLoad: () => { throw redirect({ href: "https://www.signalsbyspii.com/", statusCode: 301 }); } });