import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

const KEY = "gl-banner-dismissed-v1";

export function EbookBanner() {
  const [show, setShow] = useState(false);
  useEffect(() => { setShow(localStorage.getItem(KEY) !== "1"); }, []);
  if (!show) return null;
  return (
    <div className="ebook-banner">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-5 py-2 text-xs sm:text-sm">
        <span className="ebook-banner-tag">New</span>
        <p className="min-w-0 flex-1 truncate">
          <strong>Growth Ladders — Operators Edition.</strong>
          <span className="hidden sm:inline"> What to climb so that every step matters.</span>
        </p>
        <Link to="/growth-ladders" className="ebook-banner-link">Climb the ladder ↑</Link>
        <button type="button" aria-label="Dismiss ebook banner" className="opacity-70 hover:opacity-100"
          onClick={() => { localStorage.setItem(KEY, "1"); setShow(false); }}>
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
