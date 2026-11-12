"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import SdMark from "./SdMark";
import LangToggle from "./LangToggle";
import type { Dictionary } from "@/lib/i18n/en";

interface Props {
  locale: "en" | "fr";
  t: Pick<Dictionary, "nav" | "lang">;
}

export default function SiteNav({ locale, t }: Props) {
  const LINKS = [
    { href: "/", label: t.nav.company },
    { href: "/about", label: t.nav.about },
    { href: "/team", label: t.nav.team },
    { href: "/newsletter", label: t.nav.newsletter },
  ];

  const pathname = usePathname();
  const isHome = pathname === "/";
  // An issue page (/newsletter/2026-11-09) still belongs to its section.
  const isCurrent = (href: string) =>
    href === "/" ? isHome : pathname === href || pathname.startsWith(`${href}/`);

  // The page's background walks from cream down to black; the nav's own
  // cream backdrop only reads against the cream end of that. Flip it to a
  // dark backdrop whenever a `data-nav-theme="dark"` section (the "Who"
  // band, the contact block, the footer) is the thing actually under it.
  useEffect(() => {
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>('[data-nav-theme="dark"]'),
    );
    if (!targets.length) return;

    const navH = document.querySelector<HTMLElement>(".site-nav")?.offsetHeight ?? 86;
    const active = new Set<Element>();

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) active.add(entry.target);
          else active.delete(entry.target);
        }
        document.documentElement.classList.toggle("is-nav-dark", active.size > 0);
      },
      { rootMargin: `0px 0px -${Math.max(0, window.innerHeight - navH)}px 0px`, threshold: 0 },
    );
    targets.forEach((t) => io.observe(t));

    return () => {
      io.disconnect();
      document.documentElement.classList.remove("is-nav-dark");
    };
  }, [pathname]);

  return (
    <nav className="site-nav" aria-label={t.nav.primary}>
      {/*
        On the home page the corner mark is the one the canvas seared there, so
        this is only its hit area and accessible name. Everywhere else there is
        no canvas, and the mark is drawn here.
      */}
      <Link className="nav-mark" href="/" aria-label={t.nav.home}>
        {isHome ? <span className="nav-mark-slot" /> : <SdMark size={18} />}
      </Link>

      <ul>
        {LINKS.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className={isCurrent(l.href) ? "is-current" : undefined}
              aria-current={isCurrent(l.href) ? "page" : undefined}
            >
              {l.label}
            </Link>
          </li>
        ))}
        <li>
          <Link
            className={`btn btn-sm${pathname === "/contact" ? " is-current" : ""}`}
            href="/contact"
          >
            {t.nav.contact}
          </Link>
        </li>
        <li>
          <LangToggle locale={locale} label={t.lang.switchTo} code={t.lang.otherCode} />
        </li>
      </ul>
    </nav>
  );
}
