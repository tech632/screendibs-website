import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/dictionaries";
import { hasLocale } from "@/lib/i18n";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { meta } = getDictionary(lang);
  return { title: meta.contactTitle, description: meta.contactDescription };
}

export default async function ContactPage({ params }: Props) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const c = getDictionary(lang).contact;

  /* PLACEHOLDER — none of these details are real and the form has no backend. */
  const details = [
    { label: c.details.general, value: "hello@screendibs.com", href: "mailto:hello@screendibs.com" },
    { label: c.details.press, value: "press@screendibs.com", href: "mailto:press@screendibs.com" },
    { label: c.details.careers, value: "jobs@screendibs.com", href: "mailto:jobs@screendibs.com" },
  ];

  return (
    <main className="page">
      <section className="contact-top">
        <p className="eyebrow">{c.eyebrow}</p>
        <h1>{c.heading}</h1>
        <p className="lede">{c.lede}</p>
      </section>

      <section className="contact-grid">
        <form className="contact-form" action="#" method="post">
          <div className="field">
            <label htmlFor="c-name">{c.name}</label>
            <input id="c-name" name="name" type="text" required />
          </div>
          <div className="field">
            <label htmlFor="c-email">{c.email}</label>
            <input id="c-email" name="email" type="email" required />
          </div>
          <div className="field">
            <label htmlFor="c-org">{c.organisation}</label>
            <input id="c-org" name="organisation" type="text" />
          </div>
          <div className="field">
            <label htmlFor="c-msg">{c.message}</label>
            <textarea id="c-msg" name="message" rows={6} required />
          </div>
          <button className="btn btn-coral" type="submit">
            {c.send}
          </button>
          <p className="note">{c.beta}</p>
        </form>

        <aside className="contact-aside">
          <dl className="contact-details">
            {details.map((d) => (
              <div key={d.label}>
                <dt>{d.label}</dt>
                <dd>
                  <a href={d.href}>{d.value}</a>
                </dd>
              </div>
            ))}
          </dl>

          <div className="contact-card">
            <span className="card-ast" aria-hidden>
              *
            </span>
            <h2>{c.studio}</h2>
            <p>{c.studioPlace}</p>
            <p className="note">{c.visits}</p>
          </div>
        </aside>
      </section>
    </main>
  );
}
