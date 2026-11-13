import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import NewsletterArchive from "@/components/NewsletterArchive";
import NewsletterIssue from "@/components/NewsletterIssue";
import { getDictionary } from "@/lib/i18n";
import { getAllIssues, getIssue, getIssues, weekLabel } from "@/lib/newsletter";

export const dynamicParams = false;

/* Scheduled issues get a route too; the page 404s until their publish date. */
export function generateStaticParams() {
  return getAllIssues().map((i) => ({ week: i.week }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ week: string }>;
}): Promise<Metadata> {
  const { week } = await params;
  const issue = getIssue(week);
  if (!issue) notFound();
  const { locale, t } = await getDictionary();
  return {
    title: `${t.meta.newsletterTitle}: ${t.newsletter.weekOf.toLowerCase()} ${weekLabel(issue.week, locale)}`,
    description: issue.posts.map((p) => p.title).join(" · "),
  };
}

export default async function NewsletterIssuePage({
  params,
}: {
  params: Promise<{ week: string }>;
}) {
  const { week } = await params;
  const issue = getIssue(week);
  if (!issue) notFound();

  const { locale, t } = await getDictionary();
  const n = t.newsletter;

  return (
    <main className="page nl-page">
      <section className="nl-top">
        <p className="eyebrow">
          <Link href="/newsletter">{n.eyebrow}</Link>
        </p>
        <h1>
          {n.weekOf} {weekLabel(issue.week, locale)}
        </h1>
        {n.englishOnly ? (
          <p className="note" lang="fr">
            {n.englishOnly}
          </p>
        ) : null}
      </section>

      <NewsletterIssue issue={issue} />

      <NewsletterArchive issues={getIssues()} current={issue.week} locale={locale} t={n} />
    </main>
  );
}
