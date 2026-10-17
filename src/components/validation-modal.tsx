import { useEffect, useRef, useState } from "react";
import { Stamp } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { hackingApps, buildQueue, statusLog, hackingProgress } from "@/data/hacking";

const SEEN_KEY = "validation-modal-seen";

function getCounts() {
  return {
    live: hackingApps.filter((a) => a.status === "live").length,
    shipped: buildQueue.filter((q) => q.status === "shipped").length,
    logEntries: statusLog.length,
    milestones: hackingProgress.length,
  };
}

export function ValidationModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const counts = getCounts();
  const stats = [
    { value: counts.live, label: "live on the bench" },
    { value: counts.shipped, label: "shipped from the queue" },
    { value: counts.logEntries, label: "entries in the build log" },
    { value: counts.milestones, label: "progress milestones" },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-left">
          <p className="eyebrow">Building / The receipt</p>
          <DialogTitle className="mt-3 font-display text-3xl font-bold">
            It&apos;s real. <span className="text-gradient">All of it.</span>
          </DialogTitle>
          <DialogDescription className="text-base">
            You read the log. Here&apos;s the tally.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-3 py-2">
          {stats.map((s) => (
            <div key={s.label} className="rounded-xl border border-border/60 bg-surface px-4 py-5">
              <p className="font-display text-4xl font-bold text-foreground">{s.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="space-y-3 border-t border-border/60 pt-5">
          <p className="text-sm text-muted-foreground">
            content <span className="text-foreground/60">→</span> fabric{" "}
            <span className="text-foreground/60">→</span> scaffolding{" "}
            <span className="text-foreground/60">→</span> built{" "}
            <span className="text-foreground/60">→</span> community.
          </p>
          <p className="text-sm text-muted-foreground">
            The weird part? None of this was supposed to line up.{" "}
            <span className="text-foreground">It did.</span>
          </p>
        </div>

        <div className="flex justify-end pt-2">
          <DialogClose className="btn-primary inline-flex items-center gap-2">
            Back to the bench
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function ValidationBeat() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <section className="border-t border-border/60">
        <div className="mx-auto max-w-4xl px-5 py-20 text-center">
          <p className="eyebrow">Building / The receipt</p>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
            Still here? <span className="text-gradient">Run the validation.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            The apps are live, the log is the proof, and the whole stack adds up. One tap — I&apos;ll
            show you.
          </p>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="btn-primary mt-8 inline-flex items-center gap-2"
          >
            <Stamp className="size-4" aria-hidden="true" />
            Validate the work
          </button>
        </div>
      </section>
      <ValidationModal open={open} onOpenChange={setOpen} />
    </>
  );
}

/**
 * Drop at the bottom of /hacking/progress. Opens the validation modal once
 * per session when the visitor reaches the end of the build board —
 * the milestone moment: you read the whole thing, here's what it means.
 */
export function ValidationAutoOpen() {
  const [open, setOpen] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.sessionStorage.getItem(SEEN_KEY)) return;
    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          window.sessionStorage.setItem(SEEN_KEY, "1");
          setOpen(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div ref={sentinelRef} aria-hidden="true" className="h-px" />
      <ValidationModal open={open} onOpenChange={setOpen} />
    </>
  );
}
