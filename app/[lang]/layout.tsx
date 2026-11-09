import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Inter_Tight } from "next/font/google";
import SiteFooter from "@/components/SiteFooter";
import SiteNav from "@/components/SiteNav";
import { getDictionary } from "@/dictionaries";
import { hasLocale, LOCALES } from "@/lib/i18n";
import "../globals.css";

/* The site's one family. Only exposed as a variable: the corner mark is drawn
   with its own hard-coded Helvetica stack (rig.ts / SdMark), so nothing here
   can move it. */
const interTight = Inter_Tight({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "700"],
  variable: "--font-inter-tight",
  display: "swap",
});

type Props = { params: Promise<{ lang: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return {
    title: {
      default: "Screendibs",
      template: "%s — Screendibs",
    },
    description: getDictionary(lang).meta.siteDescription,
    alternates: { languages: { fr: "/fr", en: "/en", "x-default": "/fr" } },
  };
}

export const viewport: Viewport = {
  themeColor: "#EAE7DA",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: Promise<{ lang: string }> }>) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <html lang={lang === "fr" ? "fr-CA" : "en-CA"} className={interTight.variable}>
      <head>
        {/* The home page's intro locks scrolling and holds the chrome at
            opacity 0 until the canvas hands over. Without JS nothing ever hands
            over, so undo both rather than serve a frozen, empty page. */}
        <noscript>
          <style>{`
            html.is-intro, html.is-intro body { overflow: auto; height: auto; }
            .site-nav, .scroll-books, .hero-copy h1 { opacity: 1; transform: none; }
            .seq-canvas, .mark-canvas, .seq-skip { display: none; }
            .hero { min-height: 0; padding-top: 22vh; }
          `}</style>
        </noscript>
      </head>
      <body>
        <SiteNav lang={lang} t={dict.nav} />
        {children}
        <SiteFooter lang={lang} t={dict.footer} nav={dict.nav} />
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  );
}
