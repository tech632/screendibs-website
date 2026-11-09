import Link from "next/link";
import { notFound } from "next/navigation";
import Hero from "@/components/Hero";
import ContactBlock from "@/components/ContactBlock";
import SearchReveal from "@/components/SearchReveal";
import FactsTicker from "@/components/FactsTicker";
import { getDictionary } from "@/dictionaries";
import { hasLocale, localize } from "@/lib/i18n";

/*
 * Home = the company. The intro forges the mark, then scrolling walks through
 * what Screendibs is, and lands on a contact block.
 *
 * All copy lives in dictionaries/en.ts and fr.ts. Copy marked VERBATIM there is the company's
 * own wording (it also lives on /about) — don't copyedit it.
 */

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);
  const h = t.home;
  const searchLabels = {
    chromeLabel: t.search.chrome,
    thinkingLabel: t.search.thinking,
    answerLabel: t.search.found,
  };

  return (
    <>
      <Hero headline={t.hero} scrollLabel={t.scrollDown} />
      <main>
        <section className="section" id="company">
          <header className="section-head">
            <p className="section-index">{h.what.index}</p>
            <h2>{h.what.heading}</h2>
          </header>
          <div className="section-split split-right">
            <div className="split-main">
              <p className="section-lede">{h.what.lede}</p>
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
              <SearchReveal items={h.whatSearches} {...searchLabels} />
            </div>
          </div>
        </section>

        <section className="section band-deep" id="how">
          <header className="section-head">
            <p className="section-index">{h.how.index}</p>
            <h2>{h.how.heading}</h2>
          </header>
          <div className="section-split split-left">
            <div className="split-panel">
              <SearchReveal items={h.howSearches} {...searchLabels} />
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
            <p className="section-index">{h.who.index}</p>
            <h2 className="statement">
              {h.who.statementStart} <span className="accent">{h.who.statementAccent}</span>
            </h2>
          </header>
          <div className="section-split split-right">
            <div className="split-main">
              <h3 className="who-team">
                Sd<span aria-hidden>*</span> {h.who.team}
              </h3>
              <p className="section-lede who-para">{h.who.para1}</p>
              <p className="section-lede">{h.who.para2}</p>
              <Link className="btn btn-ghost" href={localize(lang, "/team")}>
                {h.who.meetTeam}
              </Link>
            </div>
            <div className="split-panel">
              <FactsTicker
                heading={h.who.factsHeading}
                facts={h.ipFacts}
                chromeLabel={t.facts.chrome}
                totalLabel={t.facts.total}
              />
            </div>
          </div>
          <div className="clients">
            <p className="clients-label">{h.who.clientsLabel}</p>
            <ul className="clients-list">
              {h.clients.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section" id="why">
          <header className="section-head">
            <p className="section-index">{h.why.index}</p>
          </header>
          <div className="pitch-grid">
            {h.pitches.map((p) => (
              <article className={`pitch pitch-${p.tone}`} key={p.title}>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
                <a className="btn btn-coral" href="#contact">
                  {t.contactBlock.requestAccess}
                </a>
              </article>
            ))}
          </div>
        </section>

        <ContactBlock
          lang={lang}
          t={t.contactBlock}
          index={h.contact.index}
          heading={h.contact.heading}
          note={h.contact.note}
        />
      </main>
    </>
  );
}
