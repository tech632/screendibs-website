import type { Metadata } from "next";
import ContactBlock from "@/components/ContactBlock";

export const metadata: Metadata = {
  title: "About",
  description:
    "Screendibs exists to make the discovery and evaluation of adaptable intellectual property more efficient, logical and actionable for entertainment industry professionals.",
};

/* All body copy on this page is verbatim from the company — don't copyedit. */

export default function AboutPage() {
  return (
    <main className="page">
      <section className="about-top">
        <p className="eyebrow">About us</p>
        <h1>
          Company mission: Screendibs exists to make the discovery and
          evaluation of adaptable intellectual property more efficient, logical
          and actionable for entertainment industry professionals.
        </h1>
      </section>

      <section className="section about-cols">
        <div className="about-col tone-sage" id="mission">
          <h2>Streamlining the search for adaptation rights.</h2>
          <p>
            Screendibs Technologies Inc. is breaking ground in the literary and
            entertainment industries.
          </p>
          <p>
            Our mission is to streamline the process of finding and securing
            adaptation rights for books, comics, video games and other valuable
            IP. Leveraging a database of over 100 million sources, our advanced
            search function allows users to locate what they desire. Users can
            inquire about the adaptation rights status and, if needed, obtain
            the contact information of the rights holder.
          </p>
        </div>

        <div className="about-col tone-coral" id="customers">
          <h2>Who we serve.</h2>
          <p>
            Our customers include film and television production companies,
            independent TV and film producers, streaming Studios, screenwriter,
            feeder producers, playwrights, gaming Studios, gaming companies,
            entrepreneurs and more.
          </p>
        </div>

        <div className="about-col tone-peri" id="platform">
          <h2>Independent film and TV producers looking for valuable IP?</h2>
          <p>
            Our platform helps independent producers quickly discover books,
            articles, comics, video games and more for adaptation — before
            competitors do.
          </p>
          <p>
            We offer enterprise customers a useful research tool for
            development teams to track and evaluate adaptation— ready IP.
          </p>
        </div>
      </section>

      <ContactBlock
        heading="Find your next story first."
        note="Prefer a conversation?"
      />
    </main>
  );
}
