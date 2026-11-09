import { Fragment } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ContactBlock from "@/components/ContactBlock";
import { getDictionary } from "@/dictionaries";
import { hasLocale } from "@/lib/i18n";

/*
 * The people are in dictionaries/en.ts and fr.ts (team.members). `tone` colours the rule over
 * the quote. The quote's citation reads "author, <i>work</i> note", or
 * "author, <i>work</i> (<i>noteWork</i>, note)" when noteWork is set.
 */

type Props = { params: Promise<{ lang: string }> };

/* One icon per stat in team.stats, in order. */
const STAT_ICONS = [
  <svg viewBox="0 0 24 24" aria-hidden="true" key="cal">
    <rect x="3" y="5" width="18" height="15" rx="2" />
    <path d="M3 10h18M8 3v4M16 3v4" />
  </svg>,
  <svg viewBox="0 0 24 24" aria-hidden="true" key="rings">
    <circle cx="9" cy="12" r="6" />
    <circle cx="15" cy="12" r="6" />
  </svg>,
  <svg viewBox="0 0 24 24" aria-hidden="true" key="pin">
    <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z" />
    <circle cx="12" cy="10" r="2.4" />
  </svg>,
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { meta } = getDictionary(lang);
  return { title: meta.teamTitle, description: meta.teamDescription };
}

export default async function TeamPage({ params }: Props) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);
  const team = t.team;

  return (
    <main className="page">
      {/* Flush-left heading over a row of figures, each with a small line icon. */}
      <section className="team-top">
        <p className="eyebrow">{team.eyebrow}</p>
        <h1>Sd* {team.heading}</h1>
        <ul className="team-stats">
          {team.stats.map((st, i) => (
            <li key={st.label}>
              {STAT_ICONS[i]}
              <strong>{st.value}</strong>
              <span>{st.label}</span>
            </li>
          ))}
        </ul>
      </section>

      {/*
        * One band a person: name across the top, bio on the left, quote on the right, stacked
        * on narrow screens. The row's tone colours the rule over the quote.
        */}
      <div className="team-grid">
        {team.members.map((m, i) => (
          <section className={`team-row tone-${m.tone}`} key={m.name}>
            <header className="team-head">
              <p className="section-index">{`0${i + 1}`}</p>
              <h2>{m.name}</h2>
              <p className="team-role">{m.role}</p>
            </header>

            <div className="team-body">
              {m.bio.map((para) => (
                <p className="team-bio" key={para}>
                  {para}
                </p>
              ))}
            </div>

            <aside className="team-quote">
              <blockquote>
                <p className={m.quote.lines.length > 2 ? "is-verse" : undefined}>
                  {m.quote.lines.map((line, j) => (
                    <Fragment key={line}>
                      {j > 0 && <br />}
                      {line}
                    </Fragment>
                  ))}
                </p>
              </blockquote>
              <cite>
                {m.quote.author}, <i>{m.quote.work}</i>
                {m.quote.noteWork ? (
                  <>
                    {" "}
                    (<i>{m.quote.noteWork}</i>, {m.quote.note})
                  </>
                ) : (
                  m.quote.note && <> {m.quote.note}</>
                )}
              </cite>
            </aside>
          </section>
        ))}
      </div>

      <ContactBlock lang={lang} t={t.contactBlock} heading={team.join} />
    </main>
  );
}
