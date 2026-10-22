/* Forge v3 — shared demo dataset + contracts.
   Used by the v3 console (index.html) and the per-client products page (client/index.html).
   Demo vs real: workspace/member/product data below is SEEDED DEMO DATA, labeled as such in the UI.
   Mutations made in the console persist to localStorage on this origin (key forge.v3.state)
   and are read back by both pages — that data flow is real. Accounts/auth are NOT built here:
   the identity seam belongs to the shared auth module (SPIIX-967); v3 models workspaces
   and roles on top of that seam, it does not create a competing account store. */
(function(){
"use strict";

var ROLES = {
  owner:   { label:"Owner",   can:{ view:true, edit:true, run:true, invite:true, gates:true,  publish:true,  billing:true  } },
  builder: { label:"Builder", can:{ view:true, edit:true, run:true, invite:false, gates:false, publish:true,  billing:false } },
  viewer:  { label:"Viewer",  can:{ view:true, edit:false, run:false, invite:false, gates:false, publish:false, billing:false } }
};

/* Autonomy tiers — Guided / Assisted / Intelligent as real behavior contracts.
   autoWork: operator executes non-gate steps without asking.
   In EVERY tier, gate steps (money / commitment / production deploy) hard-stop
   for an explicit owner approval. Gates are never bypassed — the Oscar guardrail pattern. */
var TIERS = {
  guided:     { label:"Guided",     autoWork:false, blurb:"Hand on the wheel. The operator proposes every step; nothing moves without your strike." },
  assisted:   { label:"Assisted",   autoWork:true,  blurb:"Co-pilot. The operator runs the work steps and pauses only at the gates." },
  intelligent:{ label:"Intelligent",autoWork:true,  blurb:"Full throttle. The operator runs Build/Ship end-to-end — and still hard-stops at money, commitment, and production-deploy gates." }
};
var GATE_KINDS = {
  money:      { label:"Money gate",      detail:"This step spends or charges money. Forge never crosses it alone." },
  commitment: { label:"Commitment gate", detail:"This step commits you — a contract, a public promise, a launch announcement. Your call, not the operator's." },
  deploy:     { label:"Production deploy gate", detail:"This step pushes to production. A human strikes the final blow, every time." }
};

/* Pipeline template for an operator run (Build → Ship). kind: work | gate. */
var PIPELINE = [
  { id:"spec",    label:"Spec the strike",            kind:"work", credits:6,  tokens: 4200 },
  { id:"scaffold",label:"Generate scaffold",          kind:"work", credits:14, tokens: 11800 },
  { id:"wire",    label:"Wire stack connections",     kind:"work", credits:10, tokens: 8600 },
  { id:"domain",  label:"Commit: register domain",    kind:"gate", gate:"commitment", credits:0, tokens: 300 },
  { id:"build",   label:"Build the product",          kind:"work", credits:22, tokens: 21400 },
  { id:"paid",    label:"Money: enable paid tier",    kind:"gate", gate:"money", credits:0, tokens: 300 },
  { id:"qa",      label:"QA pass + fixes",            kind:"work", credits:9,  tokens: 9800 },
  { id:"deploy",  label:"Deploy to production",       kind:"gate", gate:"deploy", credits:0, tokens: 300 },
  { id:"announce",label:"Ship: launch announcement",  kind:"work", credits:4,  tokens: 2600 }
];

var WORKSPACES = [
  {
    id:"studio", kind:"agency", name:"SPIIX Studio", tagline:"The agency forge — every client build runs through here.",
    accent:"#ff6a1a",
    operator:{ name:"Lauren", tier:"intelligent",
      guardrails:{ money:true, commitment:true, deploy:true } },
    products:[
      { name:"Forge", line:"Idea in. Product out.", status:"live", url:"/forge/",        forged:"2026-10-22" },
      { name:"Oscar", line:"AI front desk for home service companies.", status:"live", url:"/forge/products", forged:"2026-10-19" }
    ]
  },
  {
    id:"brightline", kind:"client", name:"Brightline Renovations", tagline:"Kitchen and bath remodeling, Cincinnati.",
    client:"Brightline Renovations LLC", contact:"Dana Whitfield", accent:"#e8b33c",
    operator:{ name:"Bram", tier:"assisted",
      guardrails:{ money:true, commitment:true, deploy:true } },
    products:[
      { name:"Brightline Booking", line:"Estimate booking that answers itself.", status:"live", url:"/forge/products", forged:"2026-10-14" },
      { name:"Project Gallery", line:"Before/after gallery with lead capture.", status:"building", url:"/forge/products", forged:"—" }
    ]
  },
  {
    id:"ledgerline", kind:"client", name:"Ledgerline", tagline:"Simple invoicing for freelancers.",
    client:"Ledgerline (solo founder)", contact:"Sam Okafor", accent:"#7fb069",
    operator:{ name:"Sable", tier:"guided",
      guardrails:{ money:true, commitment:true, deploy:true } },
    products:[
      { name:"Ledgerline", line:"Invoices a freelancer actually finishes.", status:"building", url:"/forge/products", forged:"—" }
    ]
  }
];

var MEMBERS = [
  { id:"m-steve",  name:"Steve Peele II", handle:"steve",  seats:{ studio:"owner",   brightline:"owner",   ledgerline:"owner"   } },
  { id:"m-maya",   name:"Maya Chen",      handle:"maya-builds", seats:{ studio:"builder", brightline:"builder", ledgerline:"viewer" } },
  { id:"m-jordan", name:"Jordan Reeves",  handle:"jreeves", seats:{ studio:"viewer",  brightline:"viewer",  ledgerline:"builder" } },
  { id:"m-dana",   name:"Dana Whitfield", handle:"dana-b", seats:{ studio:null,      brightline:"owner",   ledgerline:null } }
];

/* Seeded demo analytics per product (labeled DEMO in UI). */
var ANALYTICS = {
  "Forge":            { visitors: 1284, signups: 212, conversion: 16.5, series: [22,31,28,40,37,52,61] },
  "Oscar":            { visitors: 862,  signups: 96,  conversion: 11.1, series: [12,18,15,24,29,27,34] },
  "Brightline Booking":{ visitors: 431, signups: 58,  conversion: 13.5, series: [6,9,8,12,11,14,17] }
};

window.FORGE_V3 = {
  ROLES: ROLES, TIERS: TIERS, GATE_KINDS: GATE_KINDS, PIPELINE: PIPELINE,
  WORKSPACES: WORKSPACES, MEMBERS: MEMBERS, ANALYTICS: ANALYTICS,
  STATE_KEY: "forge.v3.state"
};
})();
// FORGE_V3_DATA_END
