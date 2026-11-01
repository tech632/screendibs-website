import { Fragment } from "react";
import type { Metadata } from "next";
import ContactBlock from "@/components/ContactBlock";
import { getDictionary, type Dictionary } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getDictionary();
  return { title: t.meta.teamTitle, description: t.meta.teamDescription };
}

type Tone = "sage" | "coral" | "peri";

/*
 * `tone` colours the rule over the quote.
 *
 * `bio` is third person and short — one entry per paragraph, two at most.
 * `quote` is a line from the person's favourite book, set the way a magazine
 * sets a pull quote; the quotation marks come from CSS. `lines` are broken
 * with <br /> inside one paragraph so the marks wrap the whole quote. The
 * citation reads "author, <i>work</i> note", where `note` is the optional
 * trailing detail (act and scene, original title, year).
 *
 * Roles, bios and notes are translated in lib/i18n; the quotes stay in their
 * original language whatever the page language.
 */
type MemberKey = keyof Dictionary["team"]["members"];

interface Member {
  key: MemberKey;
  name: string;
  quote: {
    lines: string[];
    author: string;
    work: string;
    /** Original-language title, shown before the year. */
    original?: string;
  };
  tone: Tone;
}

const TEAM = (t: Dictionary["team"]): (Member & Dictionary["team"]["members"][MemberKey])[] =>
  BASE.map((m) => ({ ...m, ...t.members[m.key] }));

const BASE: Member[] = [
  {
    key: "john",
    name: "John Feifer",
    tone: "coral",
    quote: {
      lines: [
        "All the world’s a stage,",
        "And all the men and women merely players;",
        "They have their exits and their entrances,",
        "And one man in his time plays many parts,",
        "His acts being seven ages.",
      ],
      author: "William Shakespeare",
      work: "As You Like It",
    },
  },
  {
    key: "jonathan",
    name: "Jonathan Nuss",
    tone: "sage",
    quote: {
      lines: ["If we want things to stay as they are, things will have to change."],
      author: "Giuseppe Tomasi di Lampedusa",
      work: "The Leopard",
      original: "Il Gattopardo",
    },
  },
  {
    key: "benjamin",
    name: "Benjamin Coriat",
    tone: "peri",
    quote: {
      lines: ["Not all those who wander are lost."],
      author: "J.R.R. Tolkien",
      work: "The Fellowship of the Ring",
    },
  },
];

export default async function TeamPage() {
  const { t } = await getDictionary();
  const tm = t.team;

  return (
    <main className="page">
      {/* Flush-left heading over a row of figures, each with a small line icon. */}
      <section className="team-top">
        <p className="eyebrow">{tm.eyebrow}</p>
        <h1>{tm.title}</h1>
        <ul className="team-stats">
          <li>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect x="3" y="5" width="18" height="15" rx="2" />
              <path d="M3 10h18M8 3v4M16 3v4" />
            </svg>
            <strong>{tm.stats[0].value}</strong>
            <span>{tm.stats[0].label}</span>
          </li>
          <li>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="9" cy="12" r="6" />
              <circle cx="15" cy="12" r="6" />
            </svg>
            <strong>{tm.stats[1].value}</strong>
            <span>{tm.stats[1].label}</span>
          </li>
          <li>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z" />
              <circle cx="12" cy="10" r="2.4" />
            </svg>
            <strong>{tm.stats[2].value}</strong>
            <span>{tm.stats[2].label}</span>
          </li>
        </ul>
      </section>

      {/*
        * One band a person: name across the top, bio on the left, quote on the right, stacked
        * on narrow screens. The row's tone colours the rule over the quote.
        */}
      <div className="team-grid">
        {TEAM(tm).map((m, i) => (
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
                {m.quoteNote &&
                  (m.quote.original ? (
                    <>
                      {" "}
                      (<i>{m.quote.original}</i>, {m.quoteNote})
                    </>
                  ) : /^\d+$/.test(m.quoteNote) ? (
                    <> ({m.quoteNote})</>
                  ) : (
                    <> {m.quoteNote}</>
                  ))}
              </cite>
            </aside>
          </section>
        ))}
      </div>

      <ContactBlock heading={tm.ctaHeading} t={t.contactBlock} />
    </main>
  );
}
