#!/usr/bin/env node
/*
 * Turn the week's four LinkedIn posts into a newsletter issue.
 *
 *   npm run newsletter -- posts.txt
 *   npm run newsletter -- posts.txt --week 2026-11-16 --publish 2026-11-20
 *
 * posts.txt holds the posts exactly as they are pasted on LinkedIn, one after
 * another. A post ends at its hashtag line (the one with #Screendibs). The
 * script writes content/newsletter/<Monday of the week>.md; commit and push it
 * and the site shows the issue from its publish date (the Friday of that week
 * unless --publish says otherwise). See lib/newsletter.ts for the file format.
 *
 * The wording is never changed. Only LinkedIn's packaging is: hashtags are
 * dropped, the quote line becomes the pull quote, the "Why it matters:" line
 * becomes a subheading and the three emoji lines under it become a list.
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = join(ROOT, "content", "newsletter");

const EMOJI = /^(?:\p{Extended_Pictographic}|\p{Regional_Indicator})/u;
const HASHTAGS = /(?:^|\s)#[\p{L}\p{N}_]+/gu;
const QUOTE_MARKS = /^[“”"«»\s]+|[“”"«»\s]+$/g;

const iso = (d) => d.toISOString().slice(0, 10);

function mondayOf(date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  d.setUTCDate(d.getUTCDate() - ((d.getUTCDay() + 6) % 7));
  return d;
}

function addDays(isoDate, n) {
  const d = new Date(`${isoDate}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return iso(d);
}

/** Split the pasted text into posts: each one ends at its hashtag line. */
function splitPosts(text) {
  const posts = [];
  let current = [];
  for (const raw of text.replace(/\r\n/g, "\n").split("\n")) {
    const line = raw.trim();
    const hadTags = /#Screendibs\b/i.test(line);
    const clean = line.replace(HASHTAGS, "").trim();
    if (clean) current.push(clean);
    if (hadTags) {
      posts.push(current);
      current = [];
    }
  }
  if (current.length) posts.push(current);
  return posts.filter((p) => p.length > 1);
}

function toMarkdown(lines) {
  const [title, ...rest] = lines;
  let quote = "";
  const body = [];
  let inList = false;

  for (const line of rest) {
    // The quote card line: wrapped in quotation marks.
    if (/^[“”"«]/.test(line)) {
      quote = line.replace(QUOTE_MARKS, "");
      inList = false;
      continue;
    }
    // "Why it matters:" and its variants: a short line that is only a lead-in.
    if (/^[^.!?]{3,60}:$/.test(line) && !EMOJI.test(line)) {
      body.push("", `### ${line}`, "");
      inList = true;
      continue;
    }
    // Under a lead-in: emoji + short label + colon + one sentence.
    const item = line.match(/^(\S+)\s+([^:]{2,40}):\s+(.+)$/u);
    if (inList && item && EMOJI.test(line)) {
      body.push(`- ${item[1]} **${item[2]}:** ${item[3]}`);
      continue;
    }
    inList = false;
    const tip = line.match(/^(Sd\*\s*Pro Tip):\s*(.+)$/i);
    body.push("", tip ? `**${tip[1]}:** ${tip[2]}` : line);
  }

  const out = [`## ${title}`, ""];
  if (quote) out.push(`> ${quote}`);
  out.push(...body);
  return out.join("\n").replace(/\n{3,}/g, "\n\n").trim();
}

// ---------------------------------------------------------------- run ---

const args = process.argv.slice(2);
const flag = (name) => {
  const i = args.indexOf(`--${name}`);
  return i === -1 ? undefined : args[i + 1];
};
const input = args.find((a, i) => !a.startsWith("--") && !args[i - 1]?.match(/^--(week|publish)$/));

if (!input) {
  console.error("Usage: npm run newsletter -- <posts.txt> [--week YYYY-MM-DD] [--publish YYYY-MM-DD] [--force]");
  process.exit(1);
}

const week = flag("week") ?? iso(mondayOf(new Date()));
const publish = flag("publish") ?? addDays(week, 4);
for (const [name, value] of [["week", week], ["publish", publish]]) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value) || Number.isNaN(Date.parse(value))) {
    console.error(`--${name} must be a date like 2026-11-16, got "${value}".`);
    process.exit(1);
  }
}
if (new Date(`${week}T00:00:00Z`).getUTCDay() !== 1) {
  console.error(`--week must be a Monday; ${week} is not.`);
  process.exit(1);
}

const posts = splitPosts(readFileSync(input, "utf8"));
if (!posts.length) {
  console.error("No posts found. Each post must end with its hashtag line (the one with #Screendibs).");
  process.exit(1);
}

const file = join(OUT_DIR, `${week}.md`);
if (existsSync(file) && !args.includes("--force")) {
  console.error(`${file} already exists. Pass --force to replace it.`);
  process.exit(1);
}

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(
  file,
  `---\nweek: ${week}\npublish: ${publish}\n---\n\n${posts.map(toMarkdown).join("\n\n")}\n`,
);

console.log(`Wrote ${file}`);
console.log(`  ${posts.length} posts, week of ${week}, goes live ${publish}.`);
posts.forEach((p, i) => console.log(`  ${i + 1}. ${p[0]}`));
if (posts.length !== 4) console.log(`  Note: an issue normally has 4 posts; this one has ${posts.length}.`);
console.log("Read the file over, then commit and push it. The site shows it from the publish date.");
