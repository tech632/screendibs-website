import Link from "next/link";
import type { Dict } from "@/dictionaries";
import { localize, type Locale } from "@/lib/i18n";
import SdMark from "./SdMark";

/* At launch the platform takes over screendibs.com and this site moves under "Company". */
const PLATFORM_URL = process.env.NEXT_PUBLIC_PLATFORM_URL ?? "https://screendibs.com";

export default function SiteFooter({
  lang,
  t,
  nav,
}: {
  lang: Locale;
  t: Dict["footer"];
  nav: Dict["nav"];
}) {
  const l = (path: string) => localize(lang, path);
  return (
    <footer className="footer" data-nav-theme="dark">
      <div className="footer-mark">
        <SdMark size={20} title="Screendibs" />
      </div>
      <nav aria-label={t.label}>
        <Link href={l("/")}>{nav.company}</Link>
        <Link href={l("/about")}>{nav.about}</Link>
        <Link href={l("/team")}>{nav.team}</Link>
        <Link href={l("/contact")}>{nav.contact}</Link>
        <Link href={l("/terms")}>{t.terms}</Link>
        <Link href={l("/privacy")}>{t.privacy}</Link>
        <Link href={l("/disclaimer")}>{t.disclaimer}</Link>
        <a href={PLATFORM_URL}>{t.platform}</a>
      </nav>
      <span>© Screendibs Technologies Inc. {new Date().getFullYear()}. {t.place}</span>
    </footer>
  );
}
