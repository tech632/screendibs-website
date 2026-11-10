import type { Metadata } from "next";
import { getDictionary } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getDictionary();
  return { title: t.meta.contactTitle, description: t.meta.contactDescription };
}

/* PLACEHOLDER — none of these details are real and the form has no backend. */
const DETAILS = [
  { key: "general", label: "General", value: "hello@screendibs.com", href: "mailto:hello@screendibs.com" },
  { key: "press", label: "Press", value: "press@screendibs.com", href: "mailto:press@screendibs.com" },
  { key: "careers", label: "Careers", value: "jobs@screendibs.com", href: "mailto:jobs@screendibs.com" },
];

export default async function ContactPage() {
  const { t } = await getDictionary();
  const c = t.contact;

  return (
    <main className="page">
      <section className="contact-top">
        <p className="eyebrow">{c.eyebrow}</p>
        <h1>{c.title}</h1>
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
            <label htmlFor="c-org">{c.org}</label>
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
            {DETAILS.map((d) => (
              <div key={d.label}>
                <dt>{c.details[d.key as keyof typeof c.details]}</dt>
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
