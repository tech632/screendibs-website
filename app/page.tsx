import Link from "next/link";
import Hero from "@/components/Hero";
import ContactBlock from "@/components/ContactBlock";
import SearchReveal from "@/components/SearchReveal";
import FactsTicker from "@/components/FactsTicker";

/*
 * Home = the company. The intro forges the mark, then scrolling walks through
 * what Screendibs is, and lands on a contact block.
 *
 * Copy marked VERBATIM is the company's own wording (it also lives on /about)
 * — don't copyedit it. Everything else is placeholder: swap the words, the
 * layout will hold.
 */

const PILLARS = [
  {
    tone: "sage",
    title: "AI Search",
    body: "Search beyond simple keywords. Conceptually match your project's logline, styling, or treatment with a vast database of existing works.",
  },
  {
    tone: "coral",
    title: "Clear Rights",
    body: "Instantly check whether matching properties are in the public domain, or locate verified rights holders, agents, and publishers.",
  },
  {
    tone: "peri",
    title: "Generate Reports",
    body: "Generate thorough, AI-compiled due-diligence reports covering adaptation-rights history, chain-of-title, and market analytics.",
  },
];

const STEPS = [
  {
    title: "Search",
    body: "Describe your concept or treatment in natural language. Our AI engine identifies semantically matching stories and literary properties.",
  },
  {
    title: "Inform",
    body: "Verify public domain status or locate contact info for copyright owners and representatives in seconds.",
  },
  {
    title: "Report",
    body: "Export investor-ready IP due-diligence reports detailing rights, chain-of-title, and comparable market analytics.",
  },
];

/* VERBATIM. The sentence "Our customers include …", one chip per segment —
   read in order, the chips reproduce it word for word. */
const CLIENTS = [
  "film and television production companies",
  "independent TV and film producers",
  "streaming Studios",
  "screenwriter",
  "feeder producers",
  "playwrights",
  "gaming Studios",
  "gaming companies",
  "entrepreneurs",
  "and more",
];

/* VERBATIM bodies. The enterprise title is ours — the source has none. */
const PITCHES = [
  {
    tone: "coral",
    title: "Independent film and TV producers looking for valuable IP?",
    body: "Our platform helps independent producers quickly discover books, articles, comics, video games and more for adaptation — before competitors do.",
  },
  {
    tone: "peri",
    title: "Enterprise development teams",
    body: "We offer enterprise customers a useful research tool for development teams to track and evaluate adaptation— ready IP.",
  },
];

const WHAT_SEARCHES = [
  {
    query: "14th-century foundational work of italian literature",
    answerLabel: "Found it",
    answer: "Dante Alighieri's La Divina Commedia, c. 1320 — the vernacular's founding epic, long since public domain.",
  },
  {
    query: "oldest surviving printed book",
    answerLabel: "Found it",
    answer: "The Diamond Sutra, printed in China in 868 CE — over five centuries before Gutenberg's press.",
  },
  {
    query: "who currently holds the rights to shakespeare's plays",
    answerLabel: "Found it",
    answer: "No one. Every Shakespeare play has been public domain for centuries — stage it, print it, remix it.",
  },
  {
    query: "who wrote the first novel",
    answerLabel: "Found it",
    answer: "Murasaki Shikibu's The Tale of Genji, c. 1010 — written in Japan, centuries before the word 'novel' existed anywhere else.",
  },
  {
    query: "oldest surviving epic poem in english",
    answerLabel: "Found it",
    answer: "Beowulf — composed some time between the 8th and 11th centuries. Author unknown, rights long moot.",
  },
  {
    query: "first major book printed in europe",
    answerLabel: "Found it",
    answer: "The Gutenberg Bible, c. 1455 — the first substantial book printed with movable type in the West.",
  },
];

const HOW_SEARCHES = [
  {
    query: "when does a book's copyright expire",
    answerLabel: "Found it",
    answer: "Most jurisdictions: life of the author plus 70 years. Some run longer — Mexico is 100, Jamaica 95 — so the same title can be public domain in one country and still under rights in another.",
  },
  {
    query: "can two people claim the same public-domain work",
    answerLabel: "Found it",
    answer: "Yes — the underlying work is free for anyone, but a specific translation, edition, or adaptation of it can still carry its own separate rights.",
  },
  {
    query: "what makes a work eligible for copyright at all",
    answerLabel: "Found it",
    answer: "Originality and fixation — it has to be your own expression, and it has to be set down somewhere, not just an idea in your head.",
  },
  {
    query: "does a translation need its own separate rights",
    answerLabel: "Found it",
    answer: "Yes — a translation is its own creative work. Translating a public-domain novel doesn't touch the original, but the translation itself can be claimed.",
  },
  {
    query: "what happens to unpublished manuscripts after death",
    answerLabel: "Found it",
    answer: "They're still protected — most jurisdictions run the same life-plus-70 clock whether or not the work was ever published.",
  },
  {
    query: "can you copyright a title or a one-line premise",
    answerLabel: "Found it",
    answer: "No — titles, names, and short phrases are generally too short to qualify. It's the expression that's protected, not the idea.",
  },
];

const IP_FACTS = [
  {
    label: "Oldest dispute",
    text: "Legend has it a 6th-century Irish king ruled on a copied psalter with ‘to every cow her calf, to every book its copy’ — the monk had to hand the copy over.",
  },
  {
    label: "First statute",
    text: "Britain's Statute of Anne, 1710, was the first law to grant rights to authors rather than to printers.",
  },
  {
    label: "Most expensive manuscript",
    text: "Bill Gates paid $30.8M for Leonardo da Vinci's Codex Leicester in 1994.",
  },
  {
    label: "Longest wait",
    text: "1928's Steamboat Willie spent 95 years under copyright before Mickey Mouse entered the US public domain on 1 January 2024.",
  },
  {
    label: "Biggest reversal",
    text: "‘Happy Birthday to You’ collected licensing fees for decades — until a 2016 ruling found the copyright claim had never actually held up.",
  },
  {
    label: "Slowest handover",
    text: "Sherlock Holmes is mostly public domain in the US, but ten 1920s stories kept parts of his character under copyright until 2023.",
  },
  {
    label: "Strangest patent",
    text: "US Patent 5,443,036, granted 1995: ‘a method of exercising a cat’ — using a laser pointer.",
  },
  {
    label: "No known death date",
    text: "Anonymous and pseudonymous works run on a different clock — often 70 to 95 years from publication instead of from a death no one recorded.",
  },
  {
    label: "No paperwork needed",
    text: "Since the 1886 Berne Convention, copyright applies the moment a work is fixed — no registration, no symbol, in most of the world.",
  },
  {
    label: "Longest term",
    text: "Mexico grants 100 years after the author's death, among the longest anywhere. The Berne Convention's own floor is just life plus 50.",
  },
  {
    label: "First trademark",
    text: "Bass Brewery's red triangle logo was registered in the UK in 1876 — the first mark ever entered under the world's first trademark law.",
  },
  {
    label: "Longest-running claim",
    text: "J.K. Rowling drafted the first Harry Potter outline in 1990. It took seven years and twelve rejections before Bloomsbury claimed it.",
  },
];

export default function Page() {
  return (
    <>
      <Hero />
      <main>
        <section className="section" id="company">
          <div className="section-split split-right">
            <div className="split-main">
              <div className="section-head">
                <span className="section-index">01 — What</span>
                <h2>Curating source IP rights for Adaptations.</h2>
              </div>
              {/* VERBATIM */}
              <p className="section-lede">
                Screendibs Technologies Inc. is breaking ground in the literary and entertainment industries.
                Our mission is to streamline the process of finding and securing adaptation rights for books,
                comics, video games and other valuable IP. Leveraging a database of over 100 million sources,
                our advanced search function allows users to locate what they desire. Users can inquire about
                the adaptation rights status and, if needed, obtain the contact information of the rights holder.
              </p>
              <div className="grid">
                {PILLARS.map((p) => (
                  <article className={`card card-${p.tone}`} key={p.title}>
                    <span className="card-ast" aria-hidden>
                      *
                    </span>
                    <h3>{p.title}</h3>
                    <p>{p.body}</p>
                  </article>
                ))}
              </div>
            </div>
            <div className="split-panel">
              <SearchReveal items={WHAT_SEARCHES} />
            </div>
          </div>
        </section>

        <section className="section section-band" id="how">
          <div className="section-split split-left">
            <div className="split-panel">
              <SearchReveal items={HOW_SEARCHES} />
            </div>
            <div className="split-main">
              <div className="section-head">
                <span className="section-index">02 — How</span>
                <h2>Search, inform, report.</h2>
              </div>
              <ol className="steps">
                {STEPS.map((step, i) => (
                  <li key={step.title}>
                    <span className="step-n">{`0${i + 1}`}</span>
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="section section-dusk" id="who" data-nav-theme="dark">
          <div className="section-split split-center">
            <div className="split-main">
              <div className="section-head">
                <span className="section-index">03 — Who</span>
                {/* VERBATIM */}
                <h2>Screendibs is positioned at the intersection of technology, literature and Entertainment.</h2>
              </div>
            </div>
            <div className="split-panel">
              <FactsTicker heading="A few things about IP, while you're here." facts={IP_FACTS} />
            </div>
            <div className="split-main">
              <p className="section-lede">
                Screendibs Technologies Inc. was founded in Mont-Royal, Quebec, in 2021 by Montreal film and fiction professionals.
                We believe that the best film, television, and gaming adaptations start with discovering the right story and connecting with the right people.
              </p>
              <Link className="btn btn-ghost" href="/team">
                Meet the team
              </Link>
            </div>
          </div>
          <div className="clients">
            <p className="clients-label">Our customers include</p>
            <ul className="clients-list">
              {CLIENTS.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section section-pitch" id="why" data-nav-theme="dark">
          <div className="section-head">
            <span className="section-index">04 — Why</span>
          </div>
          <div className="pitch-grid">
            {PITCHES.map((p) => (
              <article className={`pitch pitch-${p.tone}`} key={p.title}>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
                <a className="btn btn-coral" href="#contact">
                  Request access
                </a>
              </article>
            ))}
          </div>
        </section>

        <ContactBlock
          index="05 — Contact"
          heading="Request access to the discovery platform."
          note="For catalog integrations or custom API requests, use our full contact form."
        />
      </main>
    </>
  );
}
