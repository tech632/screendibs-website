import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

/*
 * The weekly newsletter: the four LinkedIn posts selected each week, one after
 * another. One file per issue in content/newsletter/, named for the Monday of
 * its week (2026-11-09.md). To publish an issue, add a file; the archive and
 * the issue page pick it up on the next deploy.
 *
 * Each post in a file is:
 *   ## Title
 *   > Pull quote                (optional, one line)
 *   paragraphs, "### Subheading", "- " lists, **bold**
 *
 * The posts are the company's own wording — don't copyedit them.
 */

const DIR = join(process.cwd(), "content", "newsletter");

export type Block =
  | { type: "p" | "h3"; text: string }
  | { type: "ul"; items: string[] };

export interface Post {
  title: string;
  quote?: string;
  blocks: Block[];
}

export interface Issue {
  /** The Monday of the issue's week, YYYY-MM-DD. Also its URL slug. */
  week: string;
  posts: Post[];
}

function parse(week: string, md: string): Issue {
  const body = md.replace(/\r\n/g, "\n").replace(/^---\n[\s\S]*?\n---\n/, "");
  const posts: Post[] = [];
  let post: Post | null = null;
  let open: Block | null = null;

  for (const raw of body.split("\n")) {
    const line = raw.trim();
    if (!line) {
      open = null;
      continue;
    }
    if (line.startsWith("## ")) {
      posts.push((post = { title: line.slice(3), blocks: [] }));
      open = null;
      continue;
    }
    if (!post) continue;
    if (line.startsWith("> ")) {
      post.quote = line.slice(2);
      open = null;
    } else if (line.startsWith("### ")) {
      post.blocks.push({ type: "h3", text: line.slice(4) });
      open = null;
    } else if (line.startsWith("- ")) {
      if (open?.type === "ul") open.items.push(line.slice(2));
      else post.blocks.push((open = { type: "ul", items: [line.slice(2)] }));
    } else if (open?.type === "p") {
      open.text += ` ${line}`;
    } else {
      post.blocks.push((open = { type: "p", text: line }));
    }
  }
  return { week, posts };
}

/** Every issue, latest first. */
export function getIssues(): Issue[] {
  let files: string[] = [];
  try {
    files = readdirSync(DIR);
  } catch {
    return [];
  }
  return files
    .filter((f) => /^\d{4}-\d{2}-\d{2}\.md$/.test(f))
    .sort()
    .reverse()
    .map((f) => parse(f.slice(0, 10), readFileSync(join(DIR, f), "utf8")));
}

export function getIssue(week: string): Issue | undefined {
  return getIssues().find((i) => i.week === week);
}

/** "Nov 9, 2026" / "9 nov. 2026" — the issue is labelled "Week of …". */
export function weekLabel(week: string, locale: "en" | "fr"): string {
  const [y, m, d] = week.split("-").map(Number);
  return new Intl.DateTimeFormat(locale === "fr" ? "fr-CA" : "en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(y, m - 1, d)));
}
