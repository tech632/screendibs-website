import Link from "next/link";
import SdMark from "./SdMark";
import type { Dictionary } from "@/lib/i18n/en";

/* At launch the platform takes over screendibs.com and this site moves under "Company". */
const PLATFORM_URL = process.env.NEXT_PUBLIC_PLATFORM_URL ?? "https://screendibs.com";

export default function SiteFooter({ t }: { t: Pick<Dictionary, "nav" | "footer"> }) {
  return (
    <footer className="footer" data-nav-theme="dark">
      <div className="footer-mark">
        <SdMark size={20} title="Screendibs" />
      </div>
      <nav aria-label={t.footer.label}>
        <Link href="/">{t.nav.company}</Link>
        <Link href="/about">{t.nav.about}</Link>
        <Link href="/team">{t.nav.team}</Link>
        <Link href="/contact">{t.nav.contact}</Link>
        <Link href="/terms">{t.footer.terms}</Link>
        <Link href="/privacy">{t.footer.privacy}</Link>
        <Link href="/disclaimer">{t.footer.disclaimer}</Link>
        <a href={PLATFORM_URL}>{t.footer.platform}</a>
      </nav>
      <span>© Screendibs Technologies Inc. {new Date().getFullYear()}. {t.footer.place}</span>
    </footer>
  );
}
