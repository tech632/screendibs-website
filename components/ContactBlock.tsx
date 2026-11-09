import Link from "next/link";
import type { Dict } from "@/dictionaries";
import { localize, type Locale } from "@/lib/i18n";

interface Props {
  lang: Locale;
  t: Dict["contactBlock"];
  index?: string;
  heading: string;
  note?: string;
  /** Show the "full contact page" link. Off on the contact page itself. */
  linkOut?: boolean;
}

/**
 * The short contact block. Lives at the bottom of the company page and is
 * reused at the top of the contact page. Used for requesting beta access.
 *
 * NOTE: the form has no backend yet.
 */
export default function ContactBlock({
  lang,
  t,
  index,
  heading,
  note,
  linkOut = true,
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
          placeholder={t.emailPlaceholder}
          aria-label={t.emailLabel}
          required
        />
        <button className="btn btn-coral" type="submit">
          {t.requestAccess}
        </button>
      </form>

      <p className="note">
        {note ? `${note} ` : null}
        {linkOut ? <Link href={localize(lang, "/contact")}>{t.goToContact}</Link> : null}
      </p>
    </section>
  );
}
