import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ContactBlock from "@/components/ContactBlock";
import { getDictionary } from "@/dictionaries";
import { hasLocale } from "@/lib/i18n";

/* All body copy on this page is verbatim from the company — don't copyedit (dictionaries/en.ts). */

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { meta } = getDictionary(lang);
  return { title: meta.aboutTitle, description: meta.aboutDescription };
}

export default async function AboutPage({ params }: Props) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);
  const a = t.about;
  const cols = [
    { id: "mission", tone: "sage", ...a.mission },
    { id: "customers", tone: "coral", ...a.customers },
    { id: "platform", tone: "peri", ...a.platform },
  ];

  return (
    <main className="page">
      <section className="about-top">
        <p className="eyebrow">{a.eyebrow}</p>
        <h1>
          {a.headingStart} <span className="accent">{a.headingAccent}</span> {a.headingEnd}
        </h1>
      </section>

      <div className="about-cols">
        {cols.map((c) => (
          <div className={`about-col tone-${c.tone}`} id={c.id} key={c.id}>
            <h2>{c.heading}</h2>
            {c.paras.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        ))}
      </div>

      <ContactBlock lang={lang} t={t.contactBlock} heading={a.contactHeading} note={a.contactNote} />
    </main>
  );
}
