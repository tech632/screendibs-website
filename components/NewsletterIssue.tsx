import { Fragment, type ReactNode } from "react";
import type { Issue } from "@/lib/newsletter";

const TONES = ["sage", "coral", "peri"] as const;

const inline = (text: string): ReactNode =>
  text.split(/(\*\*.+?\*\*(?!\*))/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") && part.length > 4 ? (
      <strong key={i}>{part.slice(2, -2)}</strong>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );

/* One issue: its posts, one after another. The posts are written in English. */
export default function NewsletterIssue({ issue }: { issue: Issue }) {
  return (
    <div className="nl-issue" lang="en">
      {issue.posts.map((post, n) => (
        <article className={`nl-post tone-${TONES[n % TONES.length]}`} key={post.title}>
          <header className="nl-post-head">
            <p className="nl-post-n">{String(n + 1).padStart(2, "0")}</p>
            <h2>{post.title}</h2>
            {post.quote ? (
              <blockquote className="nl-quote">
                <p>“{post.quote}”</p>
              </blockquote>
            ) : null}
          </header>
          <div className="nl-post-body">
            {post.blocks.map((b, i) => {
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
          </div>
        </article>
      ))}
    </div>
  );
}
