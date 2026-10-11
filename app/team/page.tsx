import { Fragment, type ReactNode } from "react";
import type { Metadata } from "next";
import ContactBlock from "@/components/ContactBlock";

export const metadata: Metadata = {
  title: "Team",
  description: "The people behind Screendibs.",
};

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
 */
interface Member {
  name: string;
  role: string;
  bio: string[];
  quote: {
    lines: string[];
    author: string;
    work: string;
    note?: ReactNode;
  };
  tone: Tone;
}

const TEAM: Member[] = [
  {
    name: "John Feifer",
    role: "Co-Founder & CEO",
    tone: "coral",
    bio: [
      "John Feifer is a film professional with years of experience acquiring intellectual property for film and television. When he found the book of his dreams on his local library’s shelf, securing the adaptation rights still took almost a year.",
      "At Screendibs, John is building a platform that makes great stories easier to find and easier to acquire — helping producers and filmmakers pursue valuable IP faster, more affordably and with less friction.",
    ],
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
      note: "Act II, Scene VII",
    },
  },
  {
    name: "Jonathan Nuss",
    role: "Co-Founder, Legal and Corporate Affairs",
    tone: "sage",
    bio: [
      "Jonathan Nuss is a corporate and commercial lawyer with over a decade of experience advising businesses and organizations on transactions, financing, governance and regulatory matters. Before establishing his own practice, he practised at Dentons and Heenan Blaikie.",
      "At Screendibs, Jonathan draws on his legal and strategic experience to support the platform’s development and commercial relationships — helping create a more transparent and accessible marketplace connecting creators and producers.",
    ],
    quote: {
      lines: ["If we want things to stay as they are, things will have to change."],
      author: "Giuseppe Tomasi di Lampedusa",
      work: "The Leopard",
      note: (
        <>
          (<i>Il Gattopardo</i>, 1958)
        </>
      ),
    },
  },
  {
    name: "Benjamin Coriat",
    role: "COO",
    tone: "peri",
    bio: [
      "Benjamin Coriat is an AI engineer and quantitative researcher with experience in financial markets at BNP Paribas. His research has been presented at IJCAI and ACM ICAIF.",
      "At Screendibs, Benjamin leads the design and engineering of the platform — the semantic search, rights-clearing tools and due-diligence reports — so that finding the right story feels effortless.",
    ],
    quote: {
      lines: ["Not all those who wander are lost."],
      author: "J.R.R. Tolkien",
      work: "The Fellowship of the Ring",
      note: "(1954)",
    },
  },
];

export default function TeamPage() {
  return (
    <main className="page">
      {/* Flush-left heading over a row of figures, each with a small line icon. */}
      <section className="team-top">
        <p className="eyebrow">Screendibs</p>
        <h1>Sd* Team</h1>
        <ul className="team-stats">
          <li>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect x="3" y="5" width="18" height="15" rx="2" />
              <path d="M3 10h18M8 3v4M16 3v4" />
            </svg>
            <strong>2021</strong>
            <span>First studio adaptation deal</span>
          </li>
          <li>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="9" cy="12" r="6" />
              <circle cx="15" cy="12" r="6" />
            </svg>
            <strong>3</strong>
            <span>Disciplines: film, software, law</span>
          </li>
          <li>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z" />
              <circle cx="12" cy="10" r="2.4" />
            </svg>
            <strong>2</strong>
            <span>Bases: Montreal and France</span>
          </li>
        </ul>
      </section>

      {/*
        * One band a person: name across the top, bio on the left, quote on the right, stacked
        * on narrow screens. The row's tone colours the rule over the quote.
        */}
      <div className="team-grid">
        {TEAM.map((m, i) => (
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
                {m.quote.note && <> {m.quote.note}</>}
              </cite>
            </aside>
          </section>
        ))}
      </div>

      <ContactBlock heading="Want to join them?" />
    </main>
  );
}
