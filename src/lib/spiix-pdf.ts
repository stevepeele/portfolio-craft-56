import regularFont from "@/assets/spiix/fonts/document-regular.ttf?url";
import boldFont from "@/assets/spiix/fonts/document-bold.ttf?url";
import { monolithChapters } from "@/data/spiix-monolith";

/** Browser-only, semantic export: live document text, vector tables and diagrams, current instrument charts. */
export async function downloadMonolithPdf(root: HTMLElement) {
  const { jsPDF } = await import("jspdf");
  const pdf = new jsPDF({ unit: "mm", format: "a4", compress: true });
  const tokens = getComputedStyle(root.closest(".spiix") ?? root);
  const ink = tokens.getPropertyValue("--sx-bg").trim();
  const orange = tokens.getPropertyValue("--sx-kinetic").trim();
  const paper = tokens.getPropertyValue("--sx-text").trim();
  const line = tokens.getPropertyValue("--sx-muted").trim();
  for (const [url, name, style] of [[regularFont,"regular.ttf","normal"],[boldFont,"bold.ttf","bold"]] as const) {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Document font unavailable");
    const bytes = new Uint8Array(await response.arrayBuffer());
    let binary = "";
    for (let i=0;i<bytes.length;i+=8192) binary += String.fromCharCode(...bytes.subarray(i,i+8192));
    pdf.addFileToVFS(name,btoa(binary)); pdf.addFont(name,"Document",style);
  }
  const margin=18, width=174, bottom=274;
  let y=24;
  const chapterPages:number[]=[];
  const page=()=>{pdf.addPage();y=24;};
  const room=(height:number)=>{if(y+height>bottom)page();};
  const text=(value:string,size=10,bold=false)=>{
    const clean=value.replace(/\s+/g," ").trim();if(!clean)return;
    pdf.setFont("Document",bold?"bold":"normal");pdf.setFontSize(size);pdf.setTextColor(ink);
    const lines=pdf.splitTextToSize(clean,width) as string[];
    const leading=size*.47;
    for(const item of lines){room(leading);pdf.text(item,margin,y);y+=leading;}
    y+=bold?4:3;
  };
  const table=(element:HTMLTableElement)=>{
    if(element.caption)text(element.caption.textContent??"",9,true);
    const rows=Array.from(element.rows);const count=rows[0]?.cells.length??1;const cellWidth=width/count;
    const drawRow=(row:HTMLTableRowElement,header=false)=>{
      pdf.setFont("Document",header?"bold":"normal");pdf.setFontSize(8);
      const cells=Array.from(row.cells).map(cell=>pdf.splitTextToSize(cell.textContent?.replace(/\s+/g," ").trim()??"",cellWidth-6) as string[]);
      const height=Math.max(...cells.map(cell=>cell.length),1)*4+7;
      room(height);pdf.setDrawColor(line);pdf.setLineWidth(.15);
      cells.forEach((lines,i)=>{if(header){pdf.setFillColor(paper);pdf.rect(margin+i*cellWidth,y,cellWidth,height,"FD");}else pdf.rect(margin+i*cellWidth,y,cellWidth,height);pdf.setTextColor(ink);pdf.text(lines,margin+i*cellWidth+3,y+5,{lineHeightFactor:1.4});});y+=height;
    };
    const header=rows[0];
    for(let i=0;i<rows.length;i++){const row=rows[i];if(!row)continue;const before=pdf.getNumberOfPages();pdf.setFontSize(8);const h=Math.max(...Array.from(row.cells).map(c=>(pdf.splitTextToSize(c.textContent??"",cellWidth-6) as string[]).length))*4+7;if(y+h>bottom){page();if(header&&i>0)drawRow(header,true);}drawRow(row,i===0);if(pdf.getNumberOfPages()>before)pdf.setTextColor(ink);}
    y+=8;
  };
  const chart=async(svg:SVGSVGElement)=>{
    room(76);
    const clone=svg.cloneNode(true) as SVGSVGElement;
    const originals=[svg,...Array.from(svg.querySelectorAll("*"))];const copies=[clone,...Array.from(clone.querySelectorAll("*"))];
    originals.forEach((node,i)=>{const copy=copies[i];if(!(copy instanceof SVGElement))return;const styles=getComputedStyle(node);for(const prop of ["fill","stroke","font-family","font-size","stroke-width","stop-color","stop-opacity"]){copy.setAttribute(prop,styles.getPropertyValue(prop));}copy.style.animation="none";copy.style.strokeDasharray="none";copy.style.strokeDashoffset="0";});
    clone.setAttribute("xmlns","http://www.w3.org/2000/svg");clone.setAttribute("width","1520");clone.setAttribute("height","620");
    const blob=new Blob([new XMLSerializer().serializeToString(clone)],{type:"image/svg+xml"});const url=URL.createObjectURL(blob);
    try{const image=new Image();await new Promise<void>((resolve,reject)=>{image.onload=()=>resolve();image.onerror=()=>reject(new Error("Chart export unavailable"));image.src=url;});const canvas=document.createElement("canvas");canvas.width=1520;canvas.height=620;const context=canvas.getContext("2d");if(!context)throw new Error("Canvas unavailable");context.fillStyle=ink;context.fillRect(0,0,1520,620);context.drawImage(image,0,0);pdf.addImage(canvas.toDataURL("image/png"),"PNG",margin,y,width,71);y+=79;}finally{URL.revokeObjectURL(url);}
  };
  const walk=async(element:Element):Promise<void>=>{
    if(element.matches("button,a,input,select,textarea,[data-pdf-exclude]"))return;
    if(element instanceof HTMLTableElement){table(element);return;}
    if(element instanceof SVGSVGElement){if(element.classList.contains("sx-pipeline-chart"))await chart(element);return;}
    if(element.matches("figure:not(:has(svg))")){
      const caption=element.querySelector("figcaption");if(caption)text(caption.textContent??"",9,true);
      const blocks=element.querySelectorAll(".sx-architecture-stack>div,.sx-operator-flow>div>div,.sx-revenue-chain>div");
      if(blocks.length){for(const block of blocks){const content=block.textContent?.replace(/\s+/g," ").trim()??"";pdf.setFont("Document","normal");pdf.setFontSize(9);const lines=pdf.splitTextToSize(content,width-12) as string[];const h=lines.length*4.5+9;room(h);pdf.setDrawColor(orange);pdf.setLineWidth(.35);pdf.rect(margin,y,width,h);pdf.setTextColor(ink);pdf.text(lines,margin+6,y+6,{lineHeightFactor:1.4});y+=h+3;}const foot=element.querySelector(".sx-footnote");if(foot)text(foot.textContent??"",9);y+=5;return;}
    }
    if(element.matches("h2,h3,h4,p,figcaption,dt,dd,li,output")){text(element.textContent??"",element.matches("h2")?20:element.matches("h3,h4")?14:element.matches("dt,figcaption")?9:10,element.matches("h2,h3,h4,dt,figcaption"));return;}
    if(element.children.length===0){text(element.textContent??"",10,element.matches("strong"));return;}
    for(const child of Array.from(element.children))await walk(child);
  };
  pdf.setFillColor(ink);pdf.rect(0,0,210,297,"F");pdf.setFillColor(orange);pdf.rect(margin,28,22,2,"F");pdf.setFont("Document","bold");pdf.setTextColor(paper);pdf.setFontSize(18);pdf.text("SPIIX / DOCUMENT 01",margin,49);pdf.setFontSize(48);pdf.text(["THE","MONOLITH"],margin,104,{lineHeightFactor:1.05});pdf.setFontSize(13);pdf.text("THE STRATEGIC OPERATING MANUAL",margin,166);pdf.setFont("Document","normal");pdf.setFontSize(11);pdf.text(["The architecture behind repeatable growth.","Evidence. Choices. Workflows. Allocation."],margin,188,{lineHeightFactor:1.8});pdf.text("STEVE PEELE II / SPIIX",margin,247);pdf.setFontSize(9);pdf.text("Worked examples are illustrative. Scenarios are not forecasts.",margin,268);
  page();text("Contents",28,true);const tocPage=pdf.getNumberOfPages();
  const tocPositions:number[]=[];
  for(let i=0;i<monolithChapters.length;i++){tocPositions.push(y);text(`${String(i+1).padStart(2,"0")} / ${monolithChapters[i]}`,12,true);y+=8;}
  text("A working guide, not a promise of outcomes. Definitions, cohort maturity, economics, and operating capacity determine how these frameworks should be used.",10);
  const sections=Array.from(root.querySelectorAll<HTMLElement>(".sx-document-chapter"));
  for(const section of sections){page();chapterPages.push(pdf.getNumberOfPages());for(const child of Array.from(section.children))await walk(child);}
  pdf.setPage(tocPage);pdf.setFont("Document","normal");pdf.setFontSize(11);pdf.setTextColor(orange);chapterPages.forEach((number,i)=>pdf.text(String(number),198,tocPositions[i]??24,{align:"right"}));
  const total=pdf.getNumberOfPages();for(let i=2;i<=total;i++){pdf.setPage(i);pdf.setDrawColor(line);pdf.setLineWidth(.15);pdf.line(margin,282,192,282);pdf.setTextColor(ink);pdf.setFont("Document","normal");pdf.setFontSize(8);pdf.text("SPIIX / THE MONOLITH / STEVE PEELE II",margin,288);pdf.text(`${i} / ${total}`,192,288,{align:"right"});}
  pdf.setProperties({title:"The Monolith — SPIIX Operating Manual",author:"Steve Peele II",subject:"Strategic growth operating systems"});pdf.save("SPIIX-The-Monolith.pdf");
}