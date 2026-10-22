// Replaces the site URL used for SEO (canonical, hreflang, Open Graph,
// JSON-LD, robots.txt, sitemap.xml) in every file that holds it.
//
//   node scripts/set-domain.mjs https://the-coffee-shot.<account>.workers.dev
//   node scripts/set-domain.mjs https://www.thecoffeeshot.pe
//
// Then deploy again: npx wrangler@4 deploy

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const FILES = ["index.html", "en/index.html", "robots.txt", "sitemap.xml"];
const MARKER = /<link rel="canonical" href="(https?:\/\/[^/"]+)\/">/;

const next = (process.argv[2] || "").trim().replace(/\/+$/, "");
if (!/^https:\/\/[a-z0-9.-]+\.[a-z]{2,}$/i.test(next)) {
  console.error("Usage: node scripts/set-domain.mjs https://your-domain.com");
  process.exit(1);
}

const match = readFileSync(join(root, "index.html"), "utf8").match(MARKER);
if (!match) {
  console.error("Could not find the current domain in index.html (canonical link).");
  process.exit(1);
}
const current = match[1];
if (current === next) {
  console.log(`Already set to ${next}`);
  process.exit(0);
}

for (const file of FILES) {
  const path = join(root, file);
  const text = readFileSync(path, "utf8");
  const count = text.split(current).length - 1;
  writeFileSync(path, text.split(current).join(next));
  console.log(`${file}: ${count} replaced`);
}
console.log(`\n${current}  ->  ${next}`);
