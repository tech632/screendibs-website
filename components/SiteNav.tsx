"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import SdMark from "./SdMark";

const LINKS = [
  { href: "/", label: "Company" },
  { href: "/about", label: "About" },
  { href: "/team", label: "Team" },
];

export default function SiteNav() {
  const pathname = usePathname();
  const isHome = pathname === "/";

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
    <nav className="site-nav" aria-label="Primary">
      {/*
        On the home page the corner mark is the one the canvas flew there, so
        this is only its hit area and accessible name. Everywhere else there is
        no canvas, and the mark is drawn here.
      */}
      <Link className="nav-mark" href="/" aria-label="Screendibs — home">
        {isHome ? <span className="nav-mark-slot" /> : <SdMark size={18} />}
      </Link>

      <ul>
        {LINKS.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className={pathname === l.href ? "is-current" : undefined}
              aria-current={pathname === l.href ? "page" : undefined}
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
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
}
