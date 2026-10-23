import Link from "next/link";
import SdMark from "./SdMark";

/* At launch the platform takes over screendibs.com and this site moves under "Company". */
const PLATFORM_URL = process.env.NEXT_PUBLIC_PLATFORM_URL ?? "https://screendibs.com";

export default function SiteFooter() {
  return (
    <footer className="footer" data-nav-theme="dark">
      <div className="footer-mark">
        <SdMark size={20} title="Screendibs" />
      </div>
      <nav aria-label="Footer">
        <Link href="/">Company</Link>
        <Link href="/about">About</Link>
        <Link href="/team">Team</Link>
        <Link href="/contact">Contact</Link>
        <Link href="/terms">Terms</Link>
        <Link href="/privacy">Privacy</Link>
        <Link href="/disclaimer">Disclaimer</Link>
        <a href={PLATFORM_URL}>Platform</a>
      </nav>
      <span>© Screendibs Technologies Inc. {new Date().getFullYear()}. Montreal, Canada.</span>
    </footer>
  );
}
