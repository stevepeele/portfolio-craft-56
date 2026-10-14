import { createFileRoute } from "@tanstack/react-router";
import { Suspense, lazy } from "react";

const SanityStudio = lazy(() => import("@/components/sanity-studio"));

export const Route = createFileRoute("/studio/$")({
  head: () => ({
    meta: [{ name: "robots", content: "noindex, nofollow" }, { title: "Content Studio" }],
  }),
  component: StudioPage,
});

function StudioPage() {
  return (
    <div className="min-h-screen bg-white">
      <Suspense
        fallback={
          <div className="flex min-h-screen items-center justify-center">
            <p className="text-sm text-muted-foreground">Loading studio…</p>
          </div>
        }
      >
        <SanityStudio />
      </Suspense>
    </div>
  );
}