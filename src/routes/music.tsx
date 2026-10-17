import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/music")({
  component: MusicLayout,
});

function MusicLayout() {
  return <Outlet />;
}
