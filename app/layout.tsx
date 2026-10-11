import type { Metadata, Viewport } from "next";
import { Inter_Tight } from "next/font/google";
import SiteFooter from "@/components/SiteFooter";
import SiteNav from "@/components/SiteNav";
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

export const metadata: Metadata = {
  title: {
    default: "Screendibs",
    template: "%s — Screendibs",
  },
  description: "Screendibs Technologies Inc. — Discover literary intellectual property and evaluate properties for film, television, streaming, and gaming adaptation.",
};

export const viewport: Viewport = {
  themeColor: "#EAE7DA",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={interTight.variable}>
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
        <SiteNav />
        {children}
        <SiteFooter />
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  );
}
