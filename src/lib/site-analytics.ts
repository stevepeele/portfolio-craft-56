/**
 * Sitewide behavioral analytics (Segment).
 * Scroll depth, outbound link clicks, engaged time. Resets per page view.
 * Passive listeners only; everything is guarded and cleaned up on route change.
 */
import { useEffect, useRef } from "react";
import { track } from "@/lib/segment";

const SCROLL_DEPTHS = [25, 50, 75, 90] as const;
const ENGAGED_AT = [30, 120] as const;

// Fires "Engaged Visitor" once per session when a visitor exceeds 2 pages
// or 45 active seconds — used for Slack lead alerts.
const ENGAGED_VISITOR_PAGES = 2;
const ENGAGED_VISITOR_SECONDS = 45;

function isIdentified(): boolean {
  try {
    const a = window.analytics as unknown as {
      user?: () => { id?: () => string | null };
    };
    return !!a?.user?.()?.id?.();
  } catch {
    return false;
  }
}

function checkEngagedVisitor(pages: number, seconds: number, path: string) {
  try {
    if (sessionStorage.getItem("seg_engaged_visitor")) return;
    if (pages > ENGAGED_VISITOR_PAGES || seconds > ENGAGED_VISITOR_SECONDS) {
      sessionStorage.setItem("seg_engaged_visitor", "1");
      track("Engaged Visitor", {
        pages,
        seconds,
        path,
        identified: isIdentified(),
        visitor_type: isIdentified() ? "known" : "anonymous",
      });
    }
  } catch {
    /* sessionStorage unavailable — skip */
  }
}

export function useSiteAnalytics(path: string) {
  const fired = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (typeof window === "undefined") return;
    fired.current = new Set();
    const seen = fired.current;

    // Session page count — for the Engaged Visitor threshold.
    let pages = 1;
    try {
      pages = parseInt(sessionStorage.getItem("seg_pages") || "0", 10) + 1;
      sessionStorage.setItem("seg_pages", String(pages));
    } catch {
      /* ignore */
    }
    checkEngagedVisitor(pages, 0, path);

    // Scroll depth — passive, rAF-throttled, once per threshold per page.
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const el = document.documentElement;
        const max = el.scrollHeight - el.clientHeight;
        if (max <= 0) return;
        const pct = Math.min(100, Math.round((window.scrollY / max) * 100));
        for (const d of SCROLL_DEPTHS) {
          const key = `scroll-${d}`;
          if (pct >= d && !seen.has(key)) {
            seen.add(key);
            track("Scroll Depth Reached", { depth: d, path });
          }
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // Outbound links — delegated; skips internal, mailto:, tel:.
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest?.("a") as HTMLAnchorElement | null;
      if (!a?.href) return;
      if (a.href.startsWith("mailto:") || a.href.startsWith("tel:")) return;
      let url: URL;
      try {
        url = new URL(a.href, location.href);
      } catch {
        return;
      }
      if (url.hostname === location.hostname) return;
      track("Outbound Link Clicked", {
        url: url.href,
        text: (a.textContent || "").trim().slice(0, 80),
        location: path,
      });
    };
    document.addEventListener("click", onClick);

    // Engaged time — counts active-tab seconds only.
    let active = 0;
    const id = window.setInterval(() => {
      if (document.hidden) return;
      active += 1;
      for (const s of ENGAGED_AT) {
        const key = `engaged-${s}`;
        if (active >= s && !seen.has(key)) {
          seen.add(key);
          track("Page Engaged", { seconds: s, path });
        }
      }
      // Engaged Visitor: 45+ active seconds triggers the Slack alert.
      try {
        const p = parseInt(sessionStorage.getItem("seg_pages") || "1", 10);
        checkEngagedVisitor(p, active, path);
      } catch {
        /* ignore */
      }
    }, 1000);

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("click", onClick);
      window.clearInterval(id);
    };
  }, [path]);
}
