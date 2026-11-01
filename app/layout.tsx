import type { Metadata, Viewport } from "next";
import { Inter_Tight } from "next/font/google";
import SiteFooter from "@/components/SiteFooter";
import SiteNav from "@/components/SiteNav";
import { getDictionary } from "@/lib/i18n";
import "./globals.css";

/* The site's one family. Only exposed as a variable: the corner mark is drawn
   with its own hard-coded Helvetica stack (rig.ts / SdMark), so nothing here
   can move it. */
const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-inter-tight",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getDictionary();
  return {
    title: {
      default: "Screendibs",
      template: "%s — Screendibs",
    },
    description: t.meta.siteDescription,
  };
}

export const viewport: Viewport = {
  themeColor: "#EAE7DA",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { locale, t } = await getDictionary();
  return (
    <html lang={locale} className={interTight.variable}>
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
        <SiteNav locale={locale} t={{ nav: t.nav, lang: t.lang }} />
        {children}
        <SiteFooter t={{ nav: t.nav, footer: t.footer }} />
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  );
}
