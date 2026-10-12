// Compatibility shim — the site shell now lives in src/routes/__root.tsx.
// This file exists so legacy build references resolve to a valid module.
import type { ReactNode } from "react";

export default function PageLayout({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}
