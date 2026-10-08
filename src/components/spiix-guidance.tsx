import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Link } from "@tanstack/react-router";
import { ArrowRight, LoaderCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getSpiixGuidance } from "@/lib/spiix-guidance.functions";
import { challengeSchema, type PathwayRecommendation } from "@/lib/ai/recommendation-schema";
import { getSpiixEngagement } from "@/data/spiix";

export function SpiixGuidance() {
  const recommend = useServerFn(getSpiixGuidance);
  const [challenge, setChallenge] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<PathwayRecommendation | null>(null);
  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (busy) return;
    const input = challengeSchema.safeParse({ challenge });
    if (!input.success) { setError(input.error.issues[0]?.message ?? "Describe your challenge."); return; }
    setError(null); setResult(null); setBusy(true);
    try {
      const response = await recommend({ data: input.data });
      setError(response.error); setResult(response.recommendation);
    } catch { setError("The connection was interrupted. You can contact Steve directly below."); }
    finally { setBusy(false); }
  }
  const engagement = result ? getSpiixEngagement(result.pathway) : null;
  return <section className="spiix-section spiix-guidance" aria-labelledby="guidance-heading">
    <div className="spiix-wrap">
      <div className="spiix-section-intro"><div><p className="spiix-kicker">/ FIND YOUR ACCESS POINT</p><h2 id="guidance-heading">What's getting in the way?</h2></div><p>Describe the growth problem, the decision, or the pressure on your team. Start there, not with an engagement name.</p></div>
      <div className="spiix-guidance-grid">
        <form onSubmit={submit} className="spiix-guidance-form">
          <div className="spiix-field"><label htmlFor="growth-challenge">Your growth challenge</label><textarea id="growth-challenge" rows={6} maxLength={4000} minLength={30} required value={challenge} disabled={busy} onChange={e => { setChallenge(e.target.value); setError(null); setResult(null); }} placeholder="We're getting leads, but sales isn't accepting them. Our tools don't agree on the numbers, and I need to know what to fix first." aria-describedby="guidance-privacy" /></div>
          <p id="guidance-privacy" className="spiix-guidance-note">AI-generated starting point, not a formal assessment. Your description is sent to the AI provider; don't include confidential information.</p>
          <Button type="submit" className="spiix-button" disabled={busy}>{busy ? <LoaderCircle className="animate-spin" /> : <Sparkles />}{busy ? "Reading the context…" : "Find my pathway"}</Button>
        </form>
        <div className="spiix-guidance-result" aria-live="polite" aria-busy={busy}>
          {error ? <div role="alert"><p className="spiix-kicker">/ GUIDANCE UNAVAILABLE</p><p className="spiix-lede">{error}</p><Link to="/spiix/compare" className="spiix-text-link">Compare engagements <ArrowRight /></Link></div> : result && engagement ? <>
            <p className="spiix-kicker">/ RECOMMENDED · {engagement.code}</p><h3>{engagement.label}</h3><p className="spiix-guidance-headline">{result.headline}</p><p>{result.rationale}</p>
            <ol>{result.nextSteps.map((step, index) => <li key={index}><span>0{index + 1}</span>{step}</li>)}</ol><p className="spiix-guidance-question">{result.question}</p>
            <Button asChild variant="ghost" className="spiix-button"><Link to={`/spiix/engage/${engagement.slug}`}>Explore {engagement.label} <ArrowRight /></Link></Button>
          </> : <><p className="spiix-kicker">/ CONTEXT BEFORE COMMITMENT</p><h3>{busy ? "Finding the useful next move." : "A constraint. A pathway. A next move."}</h3><p>{busy ? "Connecting your context to the right operating shape." : "Diagnosis, ongoing operating support, or a sounding board for the decisions on your desk."}</p></>}
        </div>
      </div>
    </div>
  </section>;
}