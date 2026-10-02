import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Compass, X } from "lucide-react";
import { OPEN_GUIDE_EVENT, pathways } from "@/data/navigation";

export function SpiiGuide() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const onOpen = () => {
      returnFocus.current = document.activeElement as HTMLElement;
      setOpen(true);
    };
    window.addEventListener(OPEN_GUIDE_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_GUIDE_EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    panel?.querySelector<HTMLElement>("a,button")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "Tab" && panel) {
        const items = Array.from(panel.querySelectorAll<HTMLElement>("a,button"));
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    const onDown = (e: PointerEvent) => {
      const t = e.target as Node;
      if (!panel?.contains(t) && !triggerRef.current?.contains(t)) close();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  function close(restore = true) {
    setOpen(false);
    if (restore) (returnFocus.current ?? triggerRef.current)?.focus?.();
  }

  return (
    <div className="pointer-events-none fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-[60] flex flex-col items-end sm:inset-x-auto sm:right-6 sm:bottom-6">
      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="false"
          aria-labelledby="spii-guide-title"
          className="spii-guide-panel pointer-events-auto mb-3 max-h-[min(70vh,560px)] w-full overflow-y-auto overscroll-contain rounded-2xl border border-border bg-surface p-4 shadow-2xl sm:w-[380px]"
        >
          <div className="flex items-start justify-between gap-3 px-1">
            <div>
              <p className="eyebrow">Find your way</p>
              <h2 id="spii-guide-title" className="mt-1 font-display text-lg font-bold">
                Which SPII do you need?
              </h2>
            </div>
            <button
              type="button"
              onClick={() => close()}
              aria-label="Close guide"
              className="rounded-md p-1.5 text-muted-foreground hover:text-foreground"
            >
              <X className="size-4" />
            </button>
          </div>
          <ul className="mt-3 space-y-1.5">
            {pathways.map((p) => (
              <li key={p.id}>
                <Link
                  to={p.to}
                  hash={p.hash}
                  onClick={() => close(false)}
                  className="group block rounded-xl border border-transparent px-3 py-2.5 transition-colors hover:border-border hover:bg-surface-raised focus-visible:border-primary focus-visible:outline-none"
                >
                  <span className="flex items-center justify-between gap-2 text-sm font-semibold text-foreground">
                    {p.label}
                    <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                  </span>
                  <span className="mt-0.5 block text-xs text-muted-foreground">{p.need}</span>
                  <span className="mt-1 block text-[11px] font-semibold tracking-widest text-primary uppercase">
                    {p.destination}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        onClick={() => (open ? close() : setOpen(true))}
        className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-border bg-surface-raised px-4 py-2.5 text-sm font-semibold text-foreground shadow-lg transition-colors hover:border-primary/60"
      >
        <Compass className="size-4 text-primary" aria-hidden="true" />
        {open ? "Close guide" : "Which SPII do you need?"}
      </button>
    </div>
  );
}
