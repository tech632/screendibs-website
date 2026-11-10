"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

interface Props {
  locale: "en" | "fr";
  /** Accessible label, already in the language being switched *to*. */
  label: string;
  /** Code of the language being switched to: "FR" or "EN". */
  code: string;
}

/* Flags as inline SVG: emoji flags don't render on Windows. */
const FrenchFlag = () => (
  <svg viewBox="0 0 3 2" aria-hidden="true">
    <rect width="1" height="2" fill="#002654" />
    <rect x="1" width="1" height="2" fill="#fff" />
    <rect x="2" width="1" height="2" fill="#CE1126" />
  </svg>
);

const UkFlag = () => (
  <svg viewBox="0 0 60 40" aria-hidden="true">
    <clipPath id="uk-flag-clip">
      <path d="M30,20 h30 v20 z v20 h-30 z h-30 v-20 z v-20 h30 z" />
    </clipPath>
    <rect width="60" height="40" fill="#012169" />
    <path d="M0,0 L60,40 M60,0 L0,40" stroke="#fff" strokeWidth="8" />
    <path d="M0,0 L60,40 M60,0 L0,40" clipPath="url(#uk-flag-clip)" stroke="#C8102E" strokeWidth="5" />
    <path d="M30,0 v40 M0,20 h60" stroke="#fff" strokeWidth="12" />
    <path d="M30,0 v40 M0,20 h60" stroke="#C8102E" strokeWidth="7" />
  </svg>
);

/**
 * The language switch in the nav corner. Shows the language you'd switch
 * *to*; clicking stores the choice in the `lang` cookie for a year and
 * re-renders the current page on the server in that language.
 */
export default function LangToggle({ locale, label, code }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const next = locale === "en" ? "fr" : "en";

  const onClick = () => {
    document.cookie = `lang=${next}; path=/; max-age=31536000; samesite=lax`;
    startTransition(() => router.refresh());
  };

  return (
    <button
      type="button"
      className="lang-toggle"
      onClick={onClick}
      aria-label={label}
      title={label}
      lang={next}
      disabled={pending}
    >
      <span className="lang-flag">{next === "fr" ? <FrenchFlag /> : <UkFlag />}</span>
      <span className="lang-code">{code}</span>
    </button>
  );
}
