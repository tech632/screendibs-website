import Link from "next/link";
import { weekLabel, type Issue } from "@/lib/newsletter";
import type { Dictionary } from "@/lib/i18n/en";

interface Props {
  issues: Issue[];
  current?: string;
  locale: "en" | "fr";
  t: Dictionary["newsletter"];
}

/* Every issue, latest on top, each listed by its week and its four headlines. */
export default function NewsletterArchive({ issues, current, locale, t }: Props) {
  return (
    <section className="nl-archive band-deep" aria-labelledby="nl-archive-title">
      <h2 id="nl-archive-title">{t.archiveTitle}</h2>
      <ol className="nl-archive-list">
        {issues.map((issue, i) => (
          <li key={issue.week}>
            <Link
              href={`/newsletter/${issue.week}`}
              aria-current={issue.week === current ? "page" : undefined}
            >
              <span className="nl-archive-week">
                {t.weekOf} {weekLabel(issue.week, locale)}
                {i === 0 ? <span className="nl-archive-latest">{t.latest}</span> : null}
              </span>
              <span className="nl-archive-titles" lang="en">
                {issue.posts.map((p) => (
                  <span key={p.title}>{p.title}</span>
                ))}
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
