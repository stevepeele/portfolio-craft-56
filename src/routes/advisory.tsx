import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/advisory")({ beforeLoad: () => { throw redirect({ href: "https://www.signalsbyspii.com/", statusCode: 301 }); } });