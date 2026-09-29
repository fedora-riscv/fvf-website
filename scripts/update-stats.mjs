// Refreshes src/lib/stats.json from the openkoji packaging stats.
// The site never fetches at build or run time; run this by hand and commit the result:
//   npm run update-stats
import { writeFile } from "node:fs/promises";

// the releases shown in the hero; move both forward when Fedora branches
const RELEASES = ["f42", "f43", "f44", "f45"];
const RAWHIDE = "f45";
const BASE = "https://openkoji.iscas.ac.cn/pub/stats";
// tags used by the stats site
const TAGS = { "已编包": "built", "未编包": "todo", "需移植": "port", "已搁置": "hold" };

const releases = [];
for (const tag of RELEASES) {
  const res = await fetch(`${BASE}/${tag}_pkg_summary.json`, { signal: AbortSignal.timeout(60_000) });
  if (!res.ok) throw new Error(`${tag}: HTTP ${res.status}`);
  const data = await res.json();
  if (!Array.isArray(data.packages)) throw new Error(`${tag}: response has no packages list`);
  const counts = { built: 0, todo: 0, port: 0, hold: 0 };
  for (const pkg of data.packages) {
    const key = TAGS[pkg.tag];
    if (!key) throw new Error(`${tag}: unknown tag "${pkg.tag}" on ${pkg.package_name}`);
    counts[key]++;
  }
  const total = counts.built + counts.todo + counts.port + counts.hold;
  if (total === 0) throw new Error(`${tag}: no packages`);
  releases.push({ tag, rawhide: tag === RAWHIDE, updated: data.last_updated, total, ...counts });
  console.log(`${tag}: ${counts.built}/${total} built`);
}

const out = new URL("../src/lib/stats.json", import.meta.url);
await writeFile(out, JSON.stringify({ source: `${BASE}/`, releases }, null, 2) + "\n");
console.log(`wrote ${out.pathname}`);
