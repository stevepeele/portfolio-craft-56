// Compatibility shim — the footer now lives in src/components/site-footer.tsx.
// This file exists so legacy build references resolve to a valid module.
export default function SiteFooter() {
  return (
    <div>
      <p>Steve Peele II. All rights reserved.</p>
    </div>
  );
}
