import type { Metadata } from "next";
import ContactBlock from "@/components/ContactBlock";
import { getDictionary } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getDictionary();
  return { title: t.meta.aboutTitle, description: t.meta.aboutDescription };
}

/* All body copy on this page is the company's own wording, kept in
   lib/i18n/en.ts and fr.ts — don't copyedit. */

export default async function AboutPage() {
  const { t } = await getDictionary();
  const a = t.about;

  return (
    <main className="page">
      <section className="about-top">
        <p className="eyebrow">{a.eyebrow}</p>
        <h1>
          {a.mission[0]} <span className="accent">{a.mission[1]}</span> {a.mission[2]}
        </h1>
      </section>

      <div className="about-cols">
        <div className="about-col tone-sage" id="mission">
          <h2>{a.missionTitle}</h2>
          {a.missionParas.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>

        <div className="about-col tone-coral" id="customers">
          <h2>{a.customersTitle}</h2>
          <p>{a.customers}</p>
        </div>

        <div className="about-col tone-peri" id="platform">
          <h2>{a.platformTitle}</h2>
          {a.platformParas.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </div>

      <ContactBlock heading={a.ctaHeading} note={a.ctaNote} t={t.contactBlock} />
    </main>
  );
}
