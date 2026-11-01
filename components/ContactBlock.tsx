import Link from "next/link";
import type { Dictionary } from "@/lib/i18n/en";

interface Props {
  index?: string;
  heading: string;
  note?: string;
  /** Show the "full contact page" link. Off on the contact page itself. */
  linkOut?: boolean;
  t: Dictionary["contactBlock"];
}

/**
 * The short contact block. Lives at the bottom of the company page and is
 * reused at the top of the contact page. Used for requesting beta access.
 *
 * NOTE: the form has no backend yet.
 */
export default function ContactBlock({
  index,
  heading,
  note,
  linkOut = true,
  t,
}: Props) {
  return (
    <section className="section section-contact band-night" id="contact" data-nav-theme="dark">
      <header className="section-head">
        {index ? <p className="section-index">{index}</p> : null}
        <h2>{heading}</h2>
      </header>

      <form className="access" action="#" method="post">
        <input
          type="email"
          name="email"
          placeholder="you@company.com"
          aria-label={t.emailLabel}
          required
        />
        <button className="btn btn-coral" type="submit">
          {t.button}
        </button>
      </form>

      <p className="note">
        {note ? `${note} ` : null}
        {linkOut ? <Link href="/contact">{t.linkOut}</Link> : null}
      </p>
    </section>
  );
}
