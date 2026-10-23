import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { Metadata } from "next";
import Link from "next/link";
import { Fragment, type ReactNode } from "react";

/*
 * The legal pages. Text comes from documents/legal/ in the Screendibs repo (Jonathan Nuss's
 * drafts), copied into content/legal/ by `node documents/legal/sync.mjs`. Never edit the copies.
 */

const DOCS = {
  terms: { label: "Website terms", file: "website-terms-of-use.md" },
  "platform-terms": { label: "Platform terms", file: "terms-of-service.md" },
  privacy: { label: "Privacy", file: "privacy-policy.md" },
  cookies: { label: "Cookies", file: "cookie-notice.md" },
  disclaimer: { label: "Disclaimer", file: "disclaimer.md" },
} as const;

type DocKey = keyof typeof DOCS;

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(DOCS).map((doc) => ({ doc }));
}

const read = (key: DocKey) =>
  readFileSync(join(process.cwd(), "content", "legal", DOCS[key].file), "utf8");

export async function generateMetadata({
  params,
}: {
  params: Promise<{ doc: string }>;
}): Promise<Metadata> {
  const { doc } = await params;
  const title = read(doc as DocKey).match(/^# (.*)$/m)?.[1] ?? DOCS[doc as DocKey].label;
  return { title: title.replace(/^Screendibs /, "") };
}

type Block =
  | { type: "h1" | "h2" | "h3" | "p"; text: string }
  | { type: "ul"; items: string[] };

/* The drafts use only #/##/### headings, paragraphs, "- " lists and **bold**. */
function toBlocks(md: string): Block[] {
  const blocks: Block[] = [];
  let open: Block | null = null;
  for (const raw of md.replace(/\r\n/g, "\n").split("\n")) {
    const line = raw.trim();
    if (!line) {
      open = null;
      continue;
    }
    const h = line.match(/^(#{1,3}) (.*)$/);
    if (h) {
      blocks.push({ type: `h${h[1].length}` as "h1" | "h2" | "h3", text: h[2] });
      open = null;
    } else if (line.startsWith("- ")) {
      if (open?.type === "ul") open.items.push(line.slice(2));
      else blocks.push((open = { type: "ul", items: [line.slice(2)] }));
    } else if (open?.type === "p") {
      open.text += ` ${line}`;
    } else {
      blocks.push((open = { type: "p", text: line }));
    }
  }
  return blocks;
}

const inline = (text: string): ReactNode =>
  text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i}>{part.slice(2, -2)}</strong>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );

export default async function LegalPage({ params }: { params: Promise<{ doc: string }> }) {
  const { doc } = await params;
  const key = doc as DocKey;

  return (
    <main className="page legal-page">
      <nav className="legal-tabs" aria-label="Legal documents">
        {(Object.keys(DOCS) as DocKey[]).map((k) => (
          <Link
            key={k}
            href={`/${k}`}
            className={k === key ? "is-current" : undefined}
            aria-current={k === key ? "page" : undefined}
          >
            {DOCS[k].label}
          </Link>
        ))}
      </nav>
      <article className="legal-doc">
        {toBlocks(read(key)).map((b, i) => {
          if (b.type === "ul")
            return (
              <ul key={i}>
                {b.items.map((it, j) => (
                  <li key={j}>{inline(it)}</li>
                ))}
              </ul>
            );
          const Tag = b.type;
          return <Tag key={i}>{inline(b.text)}</Tag>;
        })}
      </article>
    </main>
  );
}
