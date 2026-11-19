import type { Metadata } from "next";
import NewsletterArchive from "@/components/NewsletterArchive";
import NewsletterIssue from "@/components/NewsletterIssue";
import { getDictionary } from "@/lib/i18n";
import { getIssues, weekLabel } from "@/lib/newsletter";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getDictionary();
  return { title: t.meta.newsletterTitle, description: t.meta.newsletterDescription };
}

/* The latest issue in full, then every issue by week, latest on top. */
export default async function NewsletterPage() {
  const { locale, t } = await getDictionary();
  const n = t.newsletter;
  const issues = getIssues();
  const latest = issues[0];

  return (
    <main className="page nl-page">
      <section className="nl-top">
        {/* Nov 13 meeting: the masthead is the big title, the week a medium line under it. */}
        <h1>{n.eyebrow}</h1>
        {latest ? <p className="nl-date">{`${n.weekOf} ${weekLabel(latest.week, locale)}`}</p> : null}
        <p className="lede">{n.lede}</p>
        {n.englishOnly ? (
          <p className="note" lang="fr">
            {n.englishOnly}
          </p>
        ) : null}
      </section>

      {latest ? <NewsletterIssue issue={latest} /> : <p className="nl-empty">{n.empty}</p>}

      {issues.length ? (
        <NewsletterArchive issues={issues} current={latest?.week} locale={locale} t={n} />
      ) : null}
    </main>
  );
}
