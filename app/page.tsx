import Link from "next/link";
import Hero from "@/components/Hero";
import ContactBlock from "@/components/ContactBlock";
import SearchReveal from "@/components/SearchReveal";
import FactsTicker from "@/components/FactsTicker";
import { getDictionary } from "@/lib/i18n";

/*
 * Home = the company. The intro forges the mark, then scrolling walks through
 * what Screendibs is, and lands on a contact block.
 *
 * All copy lives in lib/i18n/en.ts and fr.ts (see the VERBATIM notes there).
 */

export default async function Page() {
  const { t } = await getDictionary();
  const h = t.home;
  const w = t.widgets;
  const withLabel = (items: { query: string; answer: string }[]) =>
    items.map((it) => ({ ...it, answerLabel: w.found }));

  return (
    <>
      <Hero title={t.hero.title} scrollLabel={w.scrollDown} />
      <main>
        <section className="section" id="company">
          <header className="section-head">
            <p className="section-index">{h.whatIndex}</p>
            <h2>{h.whatTitle}</h2>
          </header>
          <div className="section-split split-right">
            <div className="split-main">
              {/* VERBATIM */}
              <p className="section-lede">{h.whatLede}</p>
              <div className="grid">
                {h.pillars.map((p) => (
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
              <SearchReveal items={withLabel(h.whatSearches)} label={w.search} thinkingLabel={w.thinking} />
            </div>
          </div>
        </section>

        <section className="section band-deep" id="how">
          <header className="section-head">
            <p className="section-index">{h.howIndex}</p>
            <h2>{h.howTitle}</h2>
          </header>
          <div className="section-split split-left">
            <div className="split-panel">
              <SearchReveal items={withLabel(h.howSearches)} label={w.search} thinkingLabel={w.thinking} />
            </div>
            <div className="split-main">
              <ol className="steps">
                {h.steps.map((step, i) => (
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

        <section className="section band-night" id="who" data-nav-theme="dark">
          <header className="section-head">
            <p className="section-index">{h.whoIndex}</p>
            {/* VERBATIM */}
            <h2 className="statement">
              {h.whoStatement[0]}{" "}
              <span className="accent">{h.whoStatement[1]}</span>
            </h2>
          </header>
          <div className="section-split split-right">
            <div className="split-main">
              <h3 className="who-team">
                Sd<span aria-hidden>*</span> Team
              </h3>
              <p className="section-lede who-para">{h.whoPara}</p>
              <p className="section-lede">{h.whoPara2}</p>
              <Link className="btn btn-ghost" href="/team">
                {h.meetTeam}
              </Link>
            </div>
            <div className="split-panel">
              <FactsTicker heading={h.factsHeading} facts={h.facts} label={w.facts} totalWord={w.total} />
            </div>
          </div>
          <div className="clients">
            <p className="clients-label">{h.clientsLabel}</p>
            <ul className="clients-list">
              {h.clients.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section" id="why">
          <header className="section-head">
            <p className="section-index">{h.whyIndex}</p>
          </header>
          <div className="pitch-grid">
            {h.pitches.map((p) => (
              <article className={`pitch pitch-${p.tone}`} key={p.title}>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
                <a className="btn btn-coral" href="#contact">
                  {h.requestAccess}
                </a>
              </article>
            ))}
          </div>
        </section>

        <ContactBlock
          index={h.contactIndex}
          heading={h.contactHeading}
          note={h.contactNote}
          t={t.contactBlock}
        />
      </main>
    </>
  );
}
