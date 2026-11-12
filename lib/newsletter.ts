import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

/*
 * The weekly newsletter: the four LinkedIn posts picked each week, one file per
 * week in content/newsletter/, named after the Monday of that week
 * (2026-11-09.md). New issues are written by `npm run newsletter` — see
 * scripts/newsletter.mjs. Files are read at build/request time, so adding an
 * issue is just adding a file.
 *
 * Markdown subset: "## " starts a post (its title), "### " a subheading,
 * "- " list items, "> " the pull quote, **bold**, *italic*, and \* for a
 * literal asterisk (the Sd* mark).
 */

const DIR = join(process.cwd(), "content", "newsletter");

export type Block =
  | { type: "h3" | "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "quote"; text: string };

export interface Post {
  slug: string;
  title: string;
  hook?: string;
  blocks: Block[];
}

export interface Issue {
  /** Monday of the week, YYYY-MM-DD. Also the anchor id. */
  week: string;
  /** Day it went out (Fridays), YYYY-MM-DD. */
  published: string;
  posts: Post[];
}

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);

function parseFrontmatter(src: string): { meta: Record<string, string>; body: string } {
  const m = src.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!m) return { meta: {}, body: src };
  const meta: Record<string, string> = {};
  for (const line of m[1].split("\n")) {
    const kv = line.match(/^(\w+):\s*(.*)$/);
    if (kv) meta[kv[1]] = kv[2].trim();
  }
  return { meta, body: src.slice(m[0].length) };
}

function parsePosts(body: string): Post[] {
  const posts: Post[] = [];
  let post: Post | null = null;
  let open: Block | null = null;

  for (const raw of body.split("\n")) {
    const line = raw.trim();
    if (!line) {
      open = null;
      continue;
    }
    const h2 = line.match(/^## (.*)$/);
    if (h2) {
      post = { slug: slugify(h2[1]), title: h2[1], blocks: [] };
      posts.push(post);
      open = null;
      continue;
    }
    if (!post) continue;

    const h3 = line.match(/^### (.*)$/);
    if (h3) {
      post.blocks.push({ type: "h3", text: h3[1] });
      open = null;
    } else if (line.startsWith("- ")) {
      if (open?.type === "ul") open.items.push(line.slice(2));
      else post.blocks.push((open = { type: "ul", items: [line.slice(2)] }));
    } else if (line.startsWith("> ")) {
      if (open?.type === "quote") open.text += ` ${line.slice(2)}`;
      else post.blocks.push((open = { type: "quote", text: line.slice(2) }));
    } else if (open?.type === "p") {
      open.text += ` ${line}`;
    } else {
      post.blocks.push((open = { type: "p", text: line }));
    }
  }

  // The first paragraph of each post is its hook, set larger.
  for (const p of posts) {
    if (p.blocks[0]?.type === "p") p.hook = (p.blocks.shift() as { text: string }).text;
  }
  return posts;
}

/** All issues, newest first. */
export function getIssues(): Issue[] {
  let files: string[];
  try {
    files = readdirSync(DIR).filter((f) => /^\d{4}-\d{2}-\d{2}\.md$/.test(f));
  } catch {
    return [];
  }
  return files
    .sort()
    .reverse()
    .map((file) => {
      const { meta, body } = parseFrontmatter(
        readFileSync(join(DIR, file), "utf8").replace(/\r\n/g, "\n"),
      );
      const week = meta.week ?? file.slice(0, 10);
      return { week, published: meta.published ?? week, posts: parsePosts(body) };
    });
}

/** "2026-11-09" → a Date at noon UTC, so no timezone can push it a day. */
export const toDate = (ymd: string) => new Date(`${ymd}T12:00:00Z`);
