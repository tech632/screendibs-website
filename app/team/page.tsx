import type { Metadata } from "next";
import TeamPortrait, { type Tone } from "@/components/TeamPortrait";
import ContactBlock from "@/components/ContactBlock";

export const metadata: Metadata = {
  title: "Team",
  description: "The people behind Screendibs.",
};

/*
 * Drop photographs into /public/team/ — pass the path as `src` and the
 * coloured initials plate is gone.
 *
 * `bio` is first person and short — one entry per paragraph, some of them a
 * single line. `quote` is that person's own line, set the way a magazine sets
 * a pull quote; the quotation marks come from CSS.
 */
interface Member {
  name: string;
  role: string;
  bio: string[];
  quote: string;
  aside: string;
  tone: Tone;
  src?: string;
  /** object-position for the photograph, when a centre crop loses the face. */
  focus?: string;
}

const TEAM: Member[] = [
  {
    name: "Jonathan Nuss",
    role: "Co-founder",
    tone: "sage",
    bio: [
      "As a corporate lawyer at Heenan Blaikie and then Dentons, I spent years on financings and cross-border transactions, and I know how much of any deal comes down to one question: who actually owns what.",
      "Adaptation rights are no different. Chain of title is scattered across contracts, estates, agents and jurisdictions — and one missing link can stall a project for months.",
      "In 2020 I co-founded the COVID-19 Legal Resource Centre to put clear legal information in the hands of small businesses that couldn’t afford to go looking for it. My work in AI governance since has shown me that responsibly built technology can do the same at scale.",
      "Screendibs is where those two threads meet.",
      "I design the compliance, rights-verification and catalog-mapping workflows behind the platform, so producers can trust what they find and creators stay protected.",
      "The goal is simple: to make the rights clear before the deal begins.",
    ],
    quote: "A great story only becomes a great deal once the rights are clear.",
    src: "/team/jonathan-nuss.png",
    focus: "50% 30%",
    aside: "McGill Law // Uppsala University",
  },
  {
    name: "John Feifer",
    role: "Co-founder & CEO",
    tone: "coral",
    bio: [
      "As a film professional I spent years navigating the challenges of acquiring intellectual property for film and television and I know how difficult, expensive, and fiercely competitive it can be.",
      "Ironically, the adaptation that inspired me to start this company began with a moment of serendipity: I found the book of my dreams sitting on my local library’s shelf. But that was just the beginning…",
      "Securing those adaptation rights took almost a year and revealed just how much time, effort, uncertainty and considerable cost stand between a great story and its screen potential.",
      "I founded Screendibs to change all that.",
      "We’re building a platform that makes it dramatically easier for producers and filmmakers to discover promising stories, identify adaptation rights, and pursue valuable IP faster, more affordably, and with less friction.",
      "The goal is simple: to make great adaptations easier to find and easier to acquire.",
    ],
    quote: "The next unforgettable film or series is out there… waiting to be discovered.",
    src: "/team/john-feifer.png",
    focus: "50% 35%",
    aside: "London Film School // McGill University",
  },
  {
    name: "Benjamin Coriat",
    role: "Fractional Chief Operating Officer",
    tone: "peri",
    bio: [
      "As an AI engineer and quantitative researcher, my work has been teaching machines to find signal in noise — first in financial markets at BNP Paribas, then in research presented at IJCAI and ACM ICAIF.",
      "Story discovery turned out to be the same problem in a different language. The right book exists; it is buried under millions of others, and a keyword search will never surface it.",
      "Too much of adaptation still runs on luck, email threads and scattered catalogs. Modern AI can do better.",
      "I joined Screendibs to build that.",
      "I lead the design and engineering of the platform — the semantic search, the rights-clearing tools, the due-diligence reports — so that finding the right story feels effortless.",
      "The goal is simple: describe the story you want, and find it.",
    ],
    quote: "Finding the right story shouldn’t take luck. It should take a search.",
    src: "/team/benjamin-coriat.png",
    focus: "50% 24%",
    aside: "CentraleSupélec // McGill Data Science",
  },
];

export default function TeamPage() {
  return (
    <main className="page">
      {/* Centred heading over two columns of running text. */}
      <section className="team-top">
        <p className="eyebrow">Screendibs</p>
        <h1>Meet the team</h1>
        <div className="team-top-cols">
          <p>
            Screendibs was founded in Mont-Royal, Quebec, in November 2021 by a team
            of film producers and software designers who saw a persistent disconnect
            between publishing and screen adaptation. Valuable backlist books and emerging
            manuscripts were getting lost in email threads and fragmented rights catalogs.
          </p>
          <p>
            Today, we build tools that make literary IP discoverable and optioning
            straightforward. Working from Montreal, our multidisciplinary team brings
            together decades of experience in film development, semantic search technology,
            and interface design to change how the stories of tomorrow are found.
          </p>
        </div>
      </section>

      {/*
        * A 3x3 grid. The photograph sits on the diagonal — first column for the
        * first person, second for the second, third for the third — and the two
        * cells left over in each row are, reading left to right, always the bio
        * and then the quote. Placement is by grid-column, so the markup stays in
        * one order (photo, bio, quote) whichever cell the photograph lands in.
        */}
      <div className="team-grid">
        {TEAM.map((m, i) => (
          <section className={`team-row pic-${i + 1} tone-${m.tone}`} key={m.name}>
            <div className="portrait-slot">
              <TeamPortrait
                name={m.name}
                src={m.src}
                tone={m.tone}
                focus={m.focus}
                eager={i === 0}
              />
            </div>

            <div className="team-body">
              <p className="section-index">{`0${i + 1}`}</p>
              <h2>{m.name}</h2>
              <p className="team-role">{m.role}</p>
              {m.bio.map((para) => (
                <p className="team-bio" key={para}>
                  {para}
                </p>
              ))}
            </div>

            <aside className="team-quote">
              <blockquote>
                <p>{m.quote}</p>
              </blockquote>
              <p className="team-aside">{m.aside}</p>
            </aside>
          </section>
        ))}
      </div>

      <ContactBlock heading="Want to join them?" note="We hire slowly and read everything." />
    </main>
  );
}
