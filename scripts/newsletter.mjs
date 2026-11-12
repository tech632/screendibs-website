#!/usr/bin/env node
/*
 * Turns the week's selected LinkedIn posts into a newsletter issue:
 * content/newsletter/<monday>.md, which /newsletter picks up on the next deploy.
 *
 *   npm run newsletter -- posts.txt              # from a text file
 *   npm run newsletter -- --doc <googleDocId>    # from a Google Doc (link-shared)
 *   npm run newsletter -- posts.txt --week 2026-11-16   # a specific week
 *
 * Input is the posts exactly as written for LinkedIn (e.g. the weekly
 * "posts_week_…" doc). Each post ends with its hashtag line, which is how the
 * posts are split; a line of "---" also works as a separator. Per post:
 *
 *   line 1                       → title
 *   next line                    → hook
 *   "Why it matters:" etc.       → subheading (short line ending in ":")
 *   "🎬 Label: text" under one   → bullet with a bold label
 *   "Sd* Pro Tip: …"             → bold lead-in
 *   “a quote with **bold**”      → pull quote
 *   #hashtags                    → dropped
 *
 * Leading emoji are stripped (the site doesn't use them). The output is plain
 * markdown, so check it and tweak by hand before committing if needed.
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = join(ROOT, "content", "newsletter");

function args() {
  const a = process.argv.slice(2);
  const opt = { file: null, doc: null, week: null, force: false };
  for (let i = 0; i < a.length; i++) {
    if (a[i] === "--doc") opt.doc = a[++i];
    else if (a[i] === "--week") opt.week = a[++i];
    else if (a[i] === "--force") opt.force = true;
    else opt.file = a[i];
  }
  opt.doc ??= process.env.NEWSLETTER_DOC_ID || null;
  if (!opt.file && !opt.doc) {
    console.error("Usage: npm run newsletter -- <posts.txt | --doc DOC_ID> [--week YYYY-MM-DD] [--force]");
    process.exit(1);
  }
  return opt;
}

const ymd = (d) => d.toISOString().slice(0, 10);

/** Monday of the week containing `d` (UTC). */
function mondayOf(d) {
  const m = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
  m.setUTCDate(m.getUTCDate() - ((m.getUTCDay() + 6) % 7));
  return m;
}

const EMOJI = /^[\p{Extended_Pictographic}\p{Regional_Indicator}\p{Emoji_Modifier}️‍⃣\s]+/u;
const stripEmoji = (s) => s.replace(EMOJI, "").trim();
const isHashtags = (s) => /^(#\w+\s*)+$/.test(s.trim());
const unescape = (s) => s.replace(/\\([!#*_\-.])/g, "$1"); // Google Docs' txt export escapes these
const esc = (s) => s.replace(/\bSd\*(?!\*)/g, "Sd\\*"); // the Sd* mark, not italics

function splitPosts(text) {
  const posts = [];
  let cur = [];
  for (const raw of text.replace(/\r\n/g, "\n").split("\n")) {
    const line = unescape(raw.trim());
    if (!line) continue;
    if (line === "---") {
      if (cur.length) posts.push(cur);
      cur = [];
      continue;
    }
    // A hashtag run can trail the last sentence ("…from? #BookToScreen #Netflix").
    const tagged = line.match(/^(.*?)\s*((?:#\w+\s*){2,})$/);
    if (isHashtags(line) || tagged) {
      if (tagged && tagged[1]) cur.push(tagged[1]);
      if (cur.length) posts.push(cur);
      cur = [];
      continue;
    }
    cur.push(line);
  }
  if (cur.length) posts.push(cur);
  return posts;
}

function toMarkdown(lines) {
  const out = [];
  const [title, ...rest] = lines.map(stripEmoji).filter(Boolean);
  out.push(`## ${title}`, "");
  let inList = false;
  rest.forEach((line, i) => {
    const quote = line.match(/^[“”"]\s*(.*?)\s*[“”"]$/);
    const sub = line.length < 50 && line.endsWith(":");
    const tip = line.match(/^(Sd\\?\*?\s*Pro Tip:)\s*(.*)$/i);
    const bullet = inList && line.match(/^([^:]{2,30}):\s+(.*)$/);

    if (quote) {
      if (inList) out.push("");
      inList = false;
      out.push(`> ${quote[1].trim()}`, "");
    } else if (sub) {
      if (inList) out.push("");
      inList = true;
      out.push(`### ${line.slice(0, -1)}`, "");
    } else if (tip) {
      if (inList) out.push("");
      inList = false;
      out.push(`**Sd\\* Pro Tip:** ${esc(tip[2])}`, "");
    } else if (bullet) {
      out.push(`- **${bullet[1]}:** ${esc(bullet[2])}`);
    } else {
      if (inList) out.push("");
      inList = false;
      out.push(esc(line), "");
    }
    if (i === rest.length - 1 && inList) out.push("");
  });
  return out.join("\n").replace(/\n{3,}/g, "\n\n").trim();
}

async function readInput(opt) {
  if (opt.file) return readFileSync(opt.file, "utf8");
  const url = `https://docs.google.com/document/d/${opt.doc}/export?format=txt`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Couldn't fetch the Google Doc (${res.status}). Is it shared "anyone with the link can view"?`);
  return res.text();
}

const opt = args();
const week = opt.week ? new Date(`${opt.week}T12:00:00Z`) : mondayOf(new Date());
const monday = mondayOf(week);
const friday = new Date(monday);
friday.setUTCDate(friday.getUTCDate() + 4);

const posts = splitPosts(await readInput(opt));
if (!posts.length) {
  console.error("No posts found in the input.");
  process.exit(1);
}
if (posts.length !== 4) console.warn(`Note: found ${posts.length} posts (the newsletter is usually 4).`);

const file = join(OUT_DIR, `${ymd(monday)}.md`);
if (existsSync(file) && !opt.force) {
  console.error(`${file} already exists. Pass --force to overwrite.`);
  process.exit(1);
}

const md = [
  "---",
  `week: ${ymd(monday)}`,
  `published: ${ymd(friday)}`,
  "---",
  "",
  posts.map(toMarkdown).join("\n\n"),
  "",
].join("\n");

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(file, md);
console.log(`Wrote ${file} (${posts.length} posts, week of ${ymd(monday)}).`);
