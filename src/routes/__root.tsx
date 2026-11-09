import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import { SpiiGuide } from "@/components/spii-guide";
import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import {
  initSpiix,
  spiixTrack,
  spiixIdentify,
  spiixPageview,
  spiixDecorate,
  spiixDistinctId,
  posthog,
} from "@/lib/spiix-posthog";
import { useSiteAnalytics } from "@/lib/site-analytics";
import { useLocation } from "@tanstack/react-router";

/* ------------------------------------------------------------------ */
/* SPIIX standard PostHog pipeline (SPIIX-1227, 2026-11-09).           */
/* PostHog project 613918 is the single client pipe for this property: */
/* no Segment client code initializes, no GA page tags. The standard   */
/* module registers org / brand / property_id / surface / env /        */
/* taxonomy_version plus first and last touch attribution on every     */
/* event, gates itself off non-production hosts, and captures a        */
/* pageview on load and on every SPA route change. hi.stevepeeleii.com */
/* is served by this same app and gets its own registry property_id.   */
/* The literal fallback is the public project key: a missing env var   */
/* must never ship a placeholder or silently kill analytics again.     */
/* ------------------------------------------------------------------ */
const POSTHOG_KEY =
  (import.meta.env["VITE_POSTHOG_KEY"] as string | undefined) ?? "phc_tN5yyT4HZcxr9XWPnMrEtPrD7gH2rnDiV59BKJsVwirX";
const POSTHOG_HOST = import.meta.env["VITE_POSTHOG_HOST"] as string | undefined;

function initAnalytics() {
  if (typeof window === "undefined") return;
  const isHi = window.location.hostname === "hi.stevepeeleii.com";
  initSpiix({
    key: POSTHOG_KEY,
    ...(POSTHOG_HOST ? { api_host: POSTHOG_HOST } : {}),
    property_id: isHi ? "stevepeeleii.hi" : "stevepeeleii.main",
    brand: "stevepeeleii",
    surface: "web",
    person_profiles: "identified_only",
    autocapture: true,
  });
  const w = window as unknown as { spiix?: unknown; posthog?: unknown };
  w.posthog = posthog;
  w.spiix = {
    track: spiixTrack,
    identify: spiixIdentify,
    pageview: spiixPageview,
    decorate: spiixDecorate,
    distinctId: spiixDistinctId,
  };
}

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: ({ matches }) => {
    // Self-referencing og:url for every page (PLX-617): child routes that set
    // their own og:url override this via meta dedup; all others inherit it.
    const pathname = matches[matches.length - 1]?.pathname ?? "/";
    const pageUrl = `https://stevepeeleii.com${pathname === "/" ? "" : pathname.replace(/\/$/, "")}`;
    return {
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Steve Peele II | Growth Marketing Leader, Operator & Musician" },
      {
        name: "description",
        content:
          "Steve Peele II is a growth marketing leader, operator, musician, and connector with 14+ years building scalable growth systems. $350M+ pipeline driven. Creator of SPIIX and Growth Ladders.",
      },
      { name: "author", content: "Steve Peele II" },
      {
        name: "keywords",
        content:
          "growth marketing leader, marketing operations, demand generation, revenue growth, SaaS growth, fractional growth leader, fractional CMO, go-to-market strategy, marketing technology, lifecycle marketing, growth strategy, pipeline generation, ABM, account-based marketing, SPIIX, Growth Ladders, Steve Peele II, Cincinnati, remote growth consultant",
      },
      { name: "robots", content: "index, follow" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Steve Peele II" },
      { property: "og:title", content: "Steve Peele II | Growth Marketing Leader, Operator & Musician" },
      {
        property: "og:description",
        content:
          "14+ years building scalable growth systems. $350M+ pipeline driven. Creator of SPIIX and Growth Ladders.",
      },
      { property: "og:url", content: pageUrl },
      { property: "og:image", content: "https://stevepeeleii.com/og-image.jpg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Steve Peele II — Growth Marketing Leader" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@stevepeeleii" },
      { name: "twitter:creator", content: "@stevepeeleii" },
      { name: "twitter:title", content: "Steve Peele II | Growth Marketing Leader, Operator & Musician" },
      {
        name: "twitter:description",
        content:
          "14+ years building scalable growth systems. $350M+ pipeline driven. Creator of SPIIX and Growth Ladders.",
      },
      { name: "twitter:image", content: "https://stevepeeleii.com/og-image.jpg" },
      { name: "theme-color", content: "#0a0a0a" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Steve Peele II",
          url: "https://stevepeeleii.com/",
          jobTitle: "Growth Marketing Leader",
          description:
            "Growth marketing leader, operator, musician, and connector with 14+ years building scalable growth systems. $350M+ pipeline driven. Creator of SPIIX and Growth Ladders.",
          sameAs: [
            "https://linkedin.com/in/spii",
            "https://x.com/stevepeeleii",
            "https://instagram.com/stevepeeleii",
          ],
        }),
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@400;600;700;800;900&family=DM+Sans:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&family=Space+Grotesk:wght@500;600;700&display=swap",
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "shortcut icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "icon", href: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png", sizes: "180x180" },
    ],
    };
  },

  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <script
          type="text/javascript"
          id="hs-script-loader"
          async
          defer
          src="//js.hs-scripts.com/22009185.js"
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useLocation({ select: (s) => s.pathname });

  // Behavioral analytics: scroll depth, outbound links, engaged time (resets per page).
  useSiteAnalytics(pathname);

  useEffect(() => {
    if (document.getElementById("hs-script-loader")) return;
    const script = document.createElement("script");
    script.id = "hs-script-loader";
    script.src = "https://js.hs-scripts.com/22009185.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }, []);

  // Standard PostHog pipeline: init once at the app root. The module
  // captures the initial pageview and every SPA route change itself.
  useEffect(() => {
    initAnalytics();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
      <SpiiGuide />
    </QueryClientProvider>
  );
}
