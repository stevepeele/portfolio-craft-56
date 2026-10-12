// Compatibility shim — case studies now live under src/routes/work.tsx.
// This file exists so legacy build references resolve to a valid module.
export default function CaseStudyPage() {
  const title = "growth and retention";
  return (
    <div>
      <p>{title}</p>
    </div>
  );
}
