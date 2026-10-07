import Link from "next/link";
import SdMark from "./SdMark";

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
      </nav>
      <span>© Screendibs Technologies Inc. {new Date().getFullYear()}</span>
    </footer>
  );
}
