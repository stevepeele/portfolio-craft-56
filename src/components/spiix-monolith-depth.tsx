import { monolithDepth } from "@/data/spiix-monolith";
import { FrameworkTable } from "@/components/spiix-frameworks";

export function MonolithDepth({ chapter }: { chapter: number }) {
  const content = monolithDepth[chapter - 1];
  if (!content) return null;
  return <div className="sx-document-depth"><h3 className="sx-document-subhead">{content.title}</h3>{content.paragraphs.map(text => <p key={text}>{text}</p>)}{content.flow && <figure className="sx-operator-flow"><figcaption>OPERATOR MAP / CHAPTER {String(chapter).padStart(2,"0")}</figcaption><div>{content.flow.map((step,i)=><div key={step}><span>0{i+1}</span><strong>{step}</strong></div>)}</div></figure>}<FrameworkTable caption={content.caption} headings={content.headings} rows={content.rows}/><div className="sx-worked-example"><p className="spiix-kicker">ILLUSTRATIVE SCENARIO / NOT A CLIENT RESULT</p><h3>{content.example.title}</h3>{content.example.paragraphs.map(text=><p key={text}>{text}</p>)}</div></div>;
}