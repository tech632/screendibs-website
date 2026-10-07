import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Talk to Screendibs.",
};

/* PLACEHOLDER — none of these details are real and the form has no backend. */
const DETAILS = [
  { label: "General", value: "hello@screendibs.com", href: "mailto:hello@screendibs.com" },
  { label: "Press", value: "press@screendibs.com", href: "mailto:press@screendibs.com" },
  { label: "Careers", value: "jobs@screendibs.com", href: "mailto:jobs@screendibs.com" },
];

export default function ContactPage() {
  return (
    <main className="page">
      <section className="contact-top">
        <p className="eyebrow">Screendibs</p>
        <h1>Get in touch.</h1>
        <p className="lede">
          Whether you are a producer scouting new material, an agent marketing a rights catalog,
          or a writer with a story to tell, we'd love to hear from you. Expect a response from
          our team within 1–2 business days.
        </p>
      </section>

      <section className="contact-grid">
        <form className="contact-form" action="#" method="post">
          <div className="field">
            <label htmlFor="c-name">Name</label>
            <input id="c-name" name="name" type="text" required />
          </div>
          <div className="field">
            <label htmlFor="c-email">Email</label>
            <input id="c-email" name="email" type="email" required />
          </div>
          <div className="field">
            <label htmlFor="c-org">Organisation</label>
            <input id="c-org" name="organisation" type="text" />
          </div>
          <div className="field">
            <label htmlFor="c-msg">Tell us about your catalog or development needs.</label>
            <textarea id="c-msg" name="message" rows={6} required />
          </div>
          <button className="btn btn-coral" type="submit">
            Send it
          </button>
          <p className="note">Our platform is currently in private beta. Send us a message to request early access.</p>
        </form>

        <aside className="contact-aside">
          <dl className="contact-details">
            {DETAILS.map((d) => (
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
            <h2>Studio</h2>
            <p>
              1050 Churchill Road
              <br />
              Mont-Royal, Quebec H3R 3B6
              <br />
              Canada
            </p>
            <p className="note">Visits by appointment.</p>
          </div>
        </aside>
      </section>
    </main>
  );
}
