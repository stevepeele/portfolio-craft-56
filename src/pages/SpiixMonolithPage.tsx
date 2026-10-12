// Compatibility shim — the SPIIX Monolith now lives at src/routes/spiix.monolith.tsx.
// This file exists so legacy build references resolve to a valid module.
export default function SpiixMonolithPage() {
  return (
    <div>
      <p>
        The Monolith has moved. See the SPIIX section for the current version.
      </p>
    </div>
  );
}
