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
import posthog from "posthog-js";
import { initSegment, segmentPage } from "@/lib/segment";
import { useSiteAnalytics } from "@/lib/site-analytics";
import { useLocation } from "@tanstack/react-router";

/* ------------------------------------------------------------------ */
/* PostHog analytics (decision made 2026-10-11).                       */
/* Activates only when VITE_POSTHOG_KEY is set; until then every       */
/* capture is skipped. Client-side only — never runs during SSR.       */
/* ------------------------------------------------------------------ */
const POSTHOG_KEY = import.meta.env['VITE_POSTHOG_KEY'] as string | undefined;
const POSTHOG_HOST =
  (import.meta.env['VITE_POSTHOG_HOST'] as string | undefined) ?? "https://us.i.posthog.com";

let posthogReady = false;

function ensurePostHog(): boolean {
  if (posthogReady) return true;
  if (typeof window === "undefined" || !POSTHOG_KEY) return false;
  try {
    posthog.init(POSTHOG_KEY, {
      api_host: POSTHOG_HOST,
      capture_pageview: false,
      autocapture: false,
      persistence: "localStorage",
    });
    posthogReady = true;
    return true;
  } catch {
    return false;
  }
}

/** Fire-and-forget pageview. Never throws; analytics must never break the site. */
function trackPageview(): void {
  if (!ensurePostHog()) return;
  try {
    posthog.capture("$pageview");
  } catch {
    /* analytics must never break the site */
  }
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
  head: () => ({
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
      { property: "og:url", content: "https://stevepeeleii.com/" },
      { property: "og:image", content: "https://stevepeeleii.com/og-image.png" },
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
      { name: "twitter:image", content: "https://stevepeeleii.com/og-image.png" },
      { name: "theme-color", content: "#0a0a0a" },
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
    ],
    scripts: [
      { src: "https://www.datadoghq-browser-agent.com/us1/v6/datadog-rum.js" },
      {
        children: `window.DD_RUM && window.DD_RUM.init({clientToken:'pub0722b229b08951a6e9d8e723dce79005',applicationId:'c1a7361a-873c-4035-a0d5-556078770b73',site:'datadoghq.com',service:'main-site',sessionSampleRate:100,sessionReplaySampleRate:20,trackUserInteractions:true,trackResources:true,trackLongTasks:true});`,
      },
    ],
  }),

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
  const router = useRouter();
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

  // PostHog pageviews: initial load + every client-side navigation.
  useEffect(() => {
    trackPageview();
    const unsub = router.history.subscribe(() => {
      trackPageview();
    });
    return unsub;
  }, [router]);

  // Segment: init once + page tracking on every client-side navigation.
  useEffect(() => {
    initSegment();
    segmentPage();
    const unsub = router.history.subscribe(() => {
      segmentPage();
    });
    return unsub;
  }, [router]);

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
      <SpiiGuide />
    </QueryClientProvider>
  );
}
