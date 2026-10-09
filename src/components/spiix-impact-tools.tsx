import { useId, useState, type CSSProperties } from "react";
import { spiixReferencePages } from "@/data/spiix-reference-pages";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export const formatMoney = (n: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
export function SpiixSlider({ label, value, onChange, min = 0, max = 100, step = 1, display }: { label: string; value: number; onChange: (n: number) => void; min?: number; max?: number; step?: number; display?: string }) {
  const id = `slider-${label.toLowerCase().replace(/[^a-z]+/g, "-")}`;
  return <div className="sx-slider"><div><label htmlFor={id}>{label}</label><output htmlFor={id}>{display ?? `${value}%`}</output></div><input id={id} aria-label={label} type="range" min={min} max={max} step={step} value={value} style={{ "--slider-fill": `${(value - min) / (max - min) * 100}%` } as CSSProperties} onChange={e => onChange(Number(e.target.value))} /><div className="sx-slider-scale"><span>{min.toLocaleString()}</span><span>{max.toLocaleString()}</span></div></div>;
}
export function PipelineChart({ multiplier = 1, projection = false, values: customValues, labels: customLabels, maxValue: customMax, axis = "money" }: { multiplier?: number; projection?: boolean; values?: number[]; labels?: string[]; maxValue?: number; axis?: "money" | "percent" }) {
 const id=useId().replace(/:/g,"");
 const values=customValues??[0,14,38,71,112,158,205,244,279,307,326,341,348,352];
 const max=customMax??360;
 const labels=customLabels??(projection?["M1","M6","M12","M18","M24"]:["2012","2015","2018","2021","2025"]);
 const points=values.map((value,index)=>`${60+index/(values.length-1)*660},${260-value*multiplier/max*220}`).join(" ");
 return <svg className="sx-pipeline-chart" viewBox="0 0 760 310" role="img" aria-label={projection?"Modeled growth curve":"Cumulative pipeline from 2012 to 2025"}><defs><linearGradient id={id} x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="var(--sx-kinetic)" stopOpacity=".24"/><stop offset="100%" stopColor="var(--sx-kinetic)" stopOpacity="0"/></linearGradient></defs>{[0,1,2,3,4].map(index=><g key={index}><line x1="60" y1={260-index*55} x2="720" y2={260-index*55} className="sx-chart-grid"/><text x="45" y={264-index*55} textAnchor="end">{axis==="percent"?`${index*max/4}%`:`$${Math.round(index*max/4)}M`}</text></g>)}<polygon points={`60,260 ${points} 720,260`} fill={`url(#${id})`}/><polyline className="sx-chart-line" points={points} pathLength="1"/>{labels.map((label,index)=><text key={label} x={60+index/(labels.length-1)*660} y="292" textAnchor="middle">{label}</text>)}</svg>;
}
export function VelocityModeler(){
 const [velocity,setVelocity]=useState(55),[adoption,setAdoption]=useState(50);
 const rate=velocity/100*.06;
 const pipeline=Array.from({length:12},(_,index)=>rate===0?2*(index+1):2*((1+rate)**(index+1)-1)/rate);
 const ceiling=20+adoption*.8;
 const adoptionCurve=Array.from({length:12},(_,index)=>ceiling-(ceiling-8)*.85**(index+1));
 const total=pipeline.at(-1)??0;
 return <div className="sx-modeler sx-clip"><div className="sx-modeler-title"><p className="spiix-kicker">FIG.03 — THE VELOCITY MODELER</p><span className="sx-live">● LIVE · DRAG TO MODEL</span></div><h3>Model the velocity</h3><div className="sx-modeler-grid"><div><p className="spiix-kicker">INPUTS</p><p className="sx-section-narrative">Two levers. Drag either one and the model re-runs on every frame.</p><SpiixSlider label="Pipeline velocity increase" value={velocity} onChange={setVelocity}/><SpiixSlider label="Adoption rate target" value={adoption} onChange={setAdoption}/><p className="sx-footnote">Illustrative scenario, not a forecast.</p></div><div className="sx-model-charts"><div><p className="sx-chart-label">PIPELINE VELOCITY</p><strong>{formatMoney(total*1000000)}</strong><PipelineChart projection values={pipeline} maxValue={40} labels={["M1","M4","M7","M10","M12"]}/><p className="sx-footnote">12-month cumulative, $2.0M monthly base.</p></div><div><p className="sx-chart-label">ADOPTION RATE</p><strong>{(adoptionCurve.at(-1)??0).toFixed(1)}%</strong><PipelineChart projection values={adoptionCurve} maxValue={100} axis="percent" labels={["M1","M4","M7","M10","M12"]}/><p className="sx-footnote">S-curve climb toward the adoption ceiling.</p></div></div></div></div>;
}
export function ImpactEngine(){
 const [revenue,setRevenue]=useState(100000),[headroom,setHeadroom]=useState(1.5),[horizon,setHorizon]=useState(12);
 const config=spiixReferencePages.Sm[horizon===3?0:horizon===6?1:2];
 const factor=headroom<=1?1.15:headroom<=2?1:headroom<=4?.85:.7;
 const ramp=(month:number)=>{if(month<config.rampStart)return 0;const progress=Math.min((month-config.rampStart)/(config.rampEnd-config.rampStart),1);return config.cap*(1-(1-progress)**3)+(progress>=1?config.drift*(month-config.rampEnd)*config.cap:0);};
 const curve=Array.from({length:25},(_,month)=>revenue*(1+ramp(month)*factor)/1000000);
 const incremental=curve.reduce((total,value)=>total+value*1000000-revenue,0);
 return <div className="sx-impact-engine"><SpiixSlider label="Monthly revenue" value={revenue} onChange={setRevenue} min={10000} max={500000} step={10000} display={formatMoney(revenue)}/><div className="sx-segment-field"><p>CONVERSION HEADROOM</p><div role="group" aria-label="Conversion headroom">{[{n:.8,label:"<1%"},{n:1.5,label:"1–2%"},{n:3,label:"2–4%"},{n:6,label:">4%"}].map(({n,label})=><Button key={n} variant="ghost" className="sx-segment" aria-pressed={headroom===n} onClick={()=>setHeadroom(n)}>{label}</Button>)}</div></div><div className="sx-segment-field"><p>HORIZON</p><div role="group" aria-label="Time horizon">{[{n:3,label:"90D"},{n:6,label:"6MO"},{n:12,label:"12MO"}].map(({n,label})=><Button key={n} variant="ghost" className="sx-segment" aria-pressed={horizon===n} onClick={()=>setHorizon(n)}>{label}</Button>)}</div></div><PipelineChart projection values={curve} maxValue={Math.max((curve.at(-1)??1)*1.1,.1)}/><div className="sx-model-totals" aria-live="polite"><div><span>24-MONTH CUMULATIVE UPLIFT</span><strong>{formatMoney(incremental)}</strong></div><div><span>MODELED MONTHLY VALUE</span><strong>{formatMoney((curve.at(-1)??0)*1000000)}</strong></div></div><p className="sx-footnote">Illustrative conversion scenario, not a forecast. Acquisition, retention, and cost assumptions remain unchanged.</p></div>;
}
export function FloatingImpactCalc() {
  return <Dialog><DialogTrigger asChild><Button className="sx-floating-calc spiix-button spiix-button-outline"><Calculator /> OS IMPACT CALC</Button></DialogTrigger><DialogContent className="spiix sx-impact-dialog"><p className="spiix-kicker">/ OS IMPACT CALCULATOR</p><DialogTitle>Find the leverage.</DialogTitle><DialogDescription>Model the economic effect of conversion headroom.</DialogDescription><ImpactEngine /><div className="sx-actions"><Button asChild variant="ghost" className="spiix-button spiix-button-outline"><Link to="/spiix/impact">Full engine <ArrowRight /></Link></Button><Button asChild className="spiix-button"><Link to="/spiix/engage/gtm-audit">The diagnostic <ArrowRight /></Link></Button></div></DialogContent></Dialog>;
}
