import type { Metadata } from "next";
import { Fragment, type ReactNode } from "react";
import { getDictionary } from "@/lib/i18n";
import { getIssues, toDate, type Issue, type Post } from "@/lib/newsletter";

/*
 * The weekly newsletter: the four LinkedIn posts chosen each week, latest
 * issue in full at the top, every past issue kept below it. Posts are the
 * company's own copy (content/newsletter/) and are English only.
 *
 * Free for now. When it moves behind a subscription (planned after a first
 * free month), gate the past issues here — the latest can stay open as the
 * sample.
 */

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getDictionary();
  return { title: t.meta.newsletterTitle, description: t.meta.newsletterDescription };
}

/* **bold**, *italic*, and \* for a literal asterisk. */
const inline = (text: string): ReactNode =>
  text
    .replace(/\\\*/g, "\u0000")
    .split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g)
    .map((part, i) => {
      const lit = (s: string) => s.replace(/\u0000/g, "*");
      if (part.startsWith("**") && part.endsWith("**"))
        return <strong key={i}>{lit(part.slice(2, -2))}</strong>;
      if (part.length > 2 && part.startsWith("*") && part.endsWith("*"))
        return <em key={i}>{lit(part.slice(1, -1))}</em>;
      return <Fragment key={i}>{lit(part)}</Fragment>;
    });

function PostView({ post, n, anchor }: { post: Post; n: number; anchor: string }) {
  return (
    <article className="nl-post" id={`${anchor}-${post.slug}`}>
      <p className="nl-post-n">{String(n).padStart(2, "0")}</p>
      <div className="nl-post-body">
        <h3 className="nl-post-title">{inline(post.title)}</h3>
        {post.hook ? <p className="nl-hook">{inline(post.hook)}</p> : null}
        {post.blocks.map((b, i) => {
          if (b.type === "ul")
            return (
              <ul key={i}>
                {b.items.map((it, j) => (
                  <li key={j}>{inline(it)}</li>
                ))}
              </ul>
            );
          if (b.type === "quote")
            return (
              <blockquote key={i} className="nl-quote">
                {inline(b.text)}
              </blockquote>
            );
          if (b.type === "h3") return <h4 key={i}>{inline(b.text)}</h4>;
          return <p key={i}>{inline(b.text)}</p>;
        })}
      </div>
    </article>
  );
}

function IssuePosts({ issue }: { issue: Issue }) {
  return (
    <div className="nl-posts">
      {issue.posts.map((p, i) => (
        <PostView key={p.slug} post={p} n={i + 1} anchor={issue.week} />
      ))}
    </div>
  );
}

export default async function NewsletterPage() {
  const { locale, t } = await getDictionary();
  const n = t.newsletter;
  const issues = getIssues();
  const [latest, ...past] = issues;

  const fmt = new Intl.DateTimeFormat(locale === "fr" ? "fr-CA" : "en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
  const weekOf = (i: Issue) => `${n.weekOf} ${fmt.format(toDate(i.week))}`;

  return (
    <main className="page newsletter-page">
      <header className="nl-top">
        <p className="eyebrow">{n.eyebrow}</p>
        <h1>{n.title}</h1>
        <p className="lede">{n.lede}</p>
        {n.englishOnly ? (
          <p className="note" lang="fr">
            {n.englishOnly}
          </p>
        ) : null}
      </header>

      {latest ? (
        <section className="nl-issue" id={latest.week} aria-labelledby={`h-${latest.week}`} lang="en">
          <div className="nl-issue-head">
            <h2 id={`h-${latest.week}`}>{weekOf(latest)}</h2>
            <p className="nl-meta">
              {n.latest} · {n.published} {fmt.format(toDate(latest.published))}
            </p>
          </div>
          <IssuePosts issue={latest} />
        </section>
      ) : (
        <p className="lede">{n.empty}</p>
      )}

      {past.length ? (
        <section className="nl-archive" aria-labelledby="nl-archive-h">
          <h2 id="nl-archive-h">{n.archive}</h2>
          {past.map((issue) => (
            <details key={issue.week} className="nl-past" id={issue.week} lang="en">
              <summary>
                <span className="nl-past-week">{weekOf(issue)}</span>
                <span className="nl-past-titles">
                  {issue.posts.map((p) => (
                    <span key={p.slug}>{inline(p.title)}</span>
                  ))}
                </span>
              </summary>
              <IssuePosts issue={issue} />
            </details>
          ))}
        </section>
      ) : null}
    </main>
  );
}
