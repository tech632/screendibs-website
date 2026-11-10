import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import type { Metadata } from "next";
import Link from "next/link";
import { Fragment, type ReactNode } from "react";
import { getDictionary } from "@/lib/i18n";

/*
 * The legal pages. Text comes from documents/legal/ in the Screendibs repo (Jonathan Nuss's
 * drafts), copied into content/legal/ by `node documents/legal/sync.mjs`. Never edit the copies.
 *
 * French versions go in content/legal/fr/ under the same file names (drafts in
 * drafts/legal-beta/fr/). Until a document has one, French readers get the English text under
 * the `legal.untranslated` notice.
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

const LEGAL_DIR = join(process.cwd(), "content", "legal");

const read = (key: DocKey) => readFileSync(join(LEGAL_DIR, DOCS[key].file), "utf8");

/** The document in French when content/legal/fr/ has it, else null. */
const readFrench = (key: DocKey) => {
  const file = join(LEGAL_DIR, "fr", DOCS[key].file);
  return existsSync(file) ? readFileSync(file, "utf8") : null;
};

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
  const { locale, t } = await getDictionary();
  const french = locale === "fr" ? readFrench(key) : null;
  const showUntranslated = locale === "fr" && !french;

  return (
    <main className="page legal-page">
      <nav className="legal-tabs" aria-label={t.legal.tabsLabel}>
        {(Object.keys(DOCS) as DocKey[]).map((k) => (
          <Link
            key={k}
            href={`/${k}`}
            className={k === key ? "is-current" : undefined}
            aria-current={k === key ? "page" : undefined}
          >
            {t.legal.tabs[k]}
          </Link>
        ))}
      </nav>
      {showUntranslated && t.legal.untranslated ? (
        <p className="note legal-lang-note" lang="fr">
          {t.legal.untranslated}
        </p>
      ) : null}
      {t.legal.englishOnly ? (
        <p className="note legal-lang-note" lang="fr">
          {t.legal.englishOnly}
        </p>
      ) : null}
      <article className="legal-doc" lang={french ? "fr" : "en"}>
        {toBlocks(french ?? read(key)).map((b, i) => {
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
