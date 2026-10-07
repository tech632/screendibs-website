import Link from "next/link";

interface Props {
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
  index,
  heading,
  note,
  linkOut = true,
}: Props) {
  return (
    <section className="section section-contact" id="contact" data-nav-theme="dark">
      <div className="section-head">
        {index ? <span className="section-index">{index}</span> : null}
        <h2>{heading}</h2>
      </div>

      <form className="access" action="#" method="post">
        <input
          type="email"
          name="email"
          placeholder="you@company.com"
          aria-label="Email address"
          required
        />
        <button className="btn btn-coral" type="submit">
          Request access
        </button>
      </form>

      <p className="note">
        {note ? `${note} ` : null}
        {linkOut ? <Link href="/contact">Go to the contact page →</Link> : null}
      </p>
    </section>
  );
}
