// Compatibility shim — StagePlot AI now lives at src/routes/hacking.stageplot-ai.tsx.
// This file exists so legacy build references resolve to a valid module.
export default function StagePlotPage() {
  const spec = '1\u2033 NPT';
  return (
    <div>
      <p>{spec}</p>
    </div>
  );
}
