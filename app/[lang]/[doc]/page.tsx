import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Fragment, type ReactNode } from "react";
import { getDictionary } from "@/dictionaries";
import { hasLocale, localize, type Locale } from "@/lib/i18n";

/*
 * The legal pages. Text comes from documents/legal/ in the Screendibs repo (Jonathan Nuss's
 * drafts), copied into content/legal/ by `node documents/legal/sync.mjs`. Never edit the copies.
 *
 * French versions go in content/legal/fr/ under the same file names. Until a document has one,
 * /fr shows the English text under a notice saying the French version is being prepared.
 */

const DOCS = {
  terms: "website-terms-of-use.md",
  "platform-terms": "terms-of-service.md",
  privacy: "privacy-policy.md",
  cookies: "cookie-notice.md",
  disclaimer: "disclaimer.md",
} as const;

type DocKey = keyof typeof DOCS;

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(DOCS).map((doc) => ({ doc }));
}

const LEGAL_DIR = join(process.cwd(), "content", "legal");

/** The document in `lang`, or the English one when there is no translation yet. */
function read(key: DocKey, lang: Locale): { text: string; translated: boolean } {
  if (lang !== "en") {
    const localized = join(LEGAL_DIR, lang, DOCS[key]);
    if (existsSync(localized)) return { text: readFileSync(localized, "utf8"), translated: true };
  }
  return { text: readFileSync(join(LEGAL_DIR, DOCS[key]), "utf8"), translated: lang === "en" };
}

const isDoc = (doc: string): doc is DocKey => doc in DOCS;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; doc: string }>;
}): Promise<Metadata> {
  const { lang, doc } = await params;
  if (!hasLocale(lang) || !isDoc(doc)) return {};
  const { text, translated } = read(doc, lang);
  const title = (translated && text.match(/^# (.*)$/m)?.[1]) || getDictionary(lang).legal.tabs[doc];
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

export default async function LegalPage({
  params,
}: {
  params: Promise<{ lang: string; doc: string }>;
}) {
  const { lang, doc } = await params;
  if (!hasLocale(lang) || !isDoc(doc)) notFound();
  const key = doc;
  const t = getDictionary(lang).legal;
  const { text, translated } = read(key, lang);

  return (
    <main className="page legal-page">
      <nav className="legal-tabs" aria-label={t.navLabel}>
        {(Object.keys(DOCS) as DocKey[]).map((k) => (
          <Link
            key={k}
            href={localize(lang, `/${k}`)}
            className={k === key ? "is-current" : undefined}
            aria-current={k === key ? "page" : undefined}
          >
            {t.tabs[k]}
          </Link>
        ))}
      </nav>
      {!translated && t.untranslated ? <p className="note legal-untranslated">{t.untranslated}</p> : null}
      <article className="legal-doc" lang={translated ? undefined : "en"}>
        {toBlocks(text).map((b, i) => {
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
