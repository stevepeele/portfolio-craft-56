import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";

const revealSelector = [
  "main section h1",
  "main section h2",
  "main section article",
  "main section .panel",
  "main section [data-reveal]",
].join(",");

export function ScrollMotion() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const elements = Array.from(document.querySelectorAll<HTMLElement>(revealSelector));

    if (reducedMotion || !("IntersectionObserver" in window)) {
      elements.forEach((element) => element.dataset.revealed = "true");
      return;
    }

    document.documentElement.dataset.motion = "ready";
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          (entry.target as HTMLElement).dataset.revealed = "true";
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8%", threshold: 0.08 },
    );

    elements.forEach((element, index) => {
      element.dataset.reveal = "";
      element.style.setProperty("--reveal-delay", `${Math.min(index % 3, 2) * 55}ms`);
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}