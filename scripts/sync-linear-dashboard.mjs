#!/usr/bin/env node
// Pulls Linear projects + their issues into src/data/linear-dashboard.json
// RULE: only projects carrying the "Pub" project label are included.
// Run: node scripts/sync-linear-dashboard.mjs
import { execSync } from "node:child_process";
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const PROJECTS = ["P-PLX-7", "P-PLX-8", "P-PLX-9", "P-PLX-10", "P-PLX-11", "P-PLX-12", "P-PLX-13", "P-PLX-14", "P-PLX-15", "P-PLX-16", "P-PLX-17", "P-PLX-18"];
const PUB_LABEL = "Pub";

function call(name, args) {
  const out = execSync(`linear call-tool --name ${name} --arguments-json '${JSON.stringify(args)}'`, {
    encoding: "utf8",
    maxBuffer: 32 * 1024 * 1024,
  });
  const d = JSON.parse(out);
  return JSON.parse(d.result.content[0].text);
}

function hasPubLabel(proj) {
  const labels = proj.labels ?? [];
  return labels.some((l) => (typeof l === "string" ? l : l?.name) === PUB_LABEL);
}

const projects = [];
for (const pid of PROJECTS) {
  const proj = call("get_project", { query: pid });
  if (!hasPubLabel(proj)) {
    console.log(pid, proj.name, "-> skipped (no Pub label)");
    continue;
  }
  const iss = call("list_issues", { project: pid, limit: 100 });
  const issues = (iss.issues ?? []).map((x) => ({
    id: x.id,
    title: x.title,
    status: typeof x.status === "object" ? x.status?.name : x.status,
    priority: typeof x.priority === "object" ? x.priority?.name : x.priority,
    url: x.url,
    updated: (x.updatedAt ?? "").slice(0, 10),
  }));
  projects.push({
    identifier: proj.id,
    name: proj.name,
    color: proj.color,
    url: proj.url,
    status: proj.status?.name ?? null,
    issues,
  });
  console.log(pid, proj.name, "->", issues.length, "issues");
}

const payload = { generatedAt: new Date().toISOString().slice(0, 10), projects };
const dest = join(root, "src", "data", "linear-dashboard.json");
mkdirSync(dirname(dest), { recursive: true });
writeFileSync(dest, JSON.stringify(payload, null, 1) + "\n");
console.log("wrote", dest);
