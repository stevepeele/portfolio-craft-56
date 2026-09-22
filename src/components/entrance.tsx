import { useEffect, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ArrowRight, X } from "lucide-react";

const DISMISS_KEY = "spii-entrance-dismissed";

type Path = {
  need: string;
  destination: string;
  to: string | null; // null = stay on home, just dismiss
  external?: string;
};

const paths: Path[] = [
  {
    need: "I need growth to work",
    destination: "The growth leader — pipeline, revenue, proof",
    to: null,
  },
  {
    need: "I could use a sounding board",
    destination: "SPIIX advisory & mentorship",
    to: "/advisory",
    external: "spiix.stevepeeleii.com",
  },
  {
    need: "I need something built",
    destination: "Fixed-scope builds & consulting",
    to: "/services",
    external: "build.stevepeeleii.com",
  },
  {
    need: "I'm here for the music",
    destination: "Bands, records, the creative practice",
    to: "/music",
    external: "music.stevepeeleii.com",
  },
  {
    need: "Show me the credentials",
    destination: "The full CV, no small talk",
    to: "/cv",
  },
];

export function Entrance() {
  const [state, setState] = useState<"pending" | "open" | "closing" | "closed">("pending");
  const navigate = useNavigate();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let dismissed = false;
    try {
      dismissed = window.localStorage.getItem(DISMISS_KEY) === "1";
    } catch {
      dismissed = false;
    }
    if (dismissed) {
      setState("closed");
      return;
    }
    const t = window.setTimeout(() => setState("open"), 400);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (state !== "open") return;
    panelRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismissForever();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const close = () => {
    setState("closing");
    window.setTimeout(() => setState("closed"), 300);
  };

  const dismissForever = () => {
    try {
      window.localStorage.setItem(DISMISS_KEY, "1");
    } catch {
      // storage unavailable; dismiss for this session only
    }
    close();
  };

  const go = (p: Path) => {
    if (p.to === null) {
      close();
      return;
    }
    dismissForever();
    navigate({ to: p.to });
  };

  if (state === "pending" || state === "closed") return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-xl transition-opacity duration-300 motion-reduce:transition-none ${
        state === "open" ? "opacity-100" : "opacity-0"
      }`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="entrance-title"
    >
      <div
        ref={panelRef}
        tabIndex={-1}
        className={`mx-5 w-full max-w-2xl outline-none transition-all duration-500 motion-reduce:transition-none ${
          state === "open" ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
        }`}
      >
        <div className="flex justify-end">
          <button
            type="button"
            onClick={dismissForever}
            aria-label="Dismiss and don't show again"
            className="rounded-md p-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <X className="size-5" />
          </button>
        </div>

        <p className="eyebrow text-center">Before you wander</p>
        <h2
          id="entrance-title"
          className="mt-4 text-center text-4xl leading-[1.05] font-bold sm:text-5xl"
        >
          So, who am I?
          <br />
          <span className="text-gradient">Depends what you need.</span>
        </h2>

        <div className="mt-10 space-y-2.5">
          {paths.map((p) => (
            <button
              key={p.need}
              type="button"
              onClick={() => go(p)}
              className="panel group flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:border-primary/50 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              <div>
                <p className="font-display text-base font-bold sm:text-lg">{p.need}</p>
                <p className="mt-0.5 text-xs text-muted-foreground sm:text-sm">
                  {p.destination}
                  {p.external ? (
                    <span className="text-muted-foreground/60"> · {p.external}</span>
                  ) : null}
                </p>
              </div>
              <ArrowRight className="size-5 shrink-0 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-primary" />
            </button>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
          <button
            type="button"
            onClick={() => {
              dismissForever();
              navigate({ to: "/about" });
            }}
            className="font-medium text-foreground hover:underline"
          >
            Meet Steve
          </button>
          <button
            type="button"
            onClick={dismissForever}
            className="text-muted-foreground hover:text-foreground"
          >
            Just looking around — don't show this again
          </button>
        </div>
      </div>
    </div>
  );
}
