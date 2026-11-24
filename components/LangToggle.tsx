"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { LANGUAGES, type Locale } from "@/lib/i18n/languages";

interface Props {
  locale: Locale;
  /** Accessible label for the menu, in the current language ("Language", "Langue"…). */
  label: string;
}

/**
 * The language menu in the nav corner: a native <select> dressed as the old
 * pill (keyboard and screen-reader friendly), each language named in its own
 * language. Choosing one stores it in the `lang` cookie for a year and
 * re-renders the current page on the server in that language.
 */
export default function LangToggle({ locale, label }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const onChange = (next: string) => {
    if (next === locale) return;
    document.cookie = `lang=${next}; path=/; max-age=31536000; samesite=lax`;
    startTransition(() => router.refresh());
  };

  return (
    <label className="lang-toggle" title={label} data-pending={pending || undefined}>
      <span className="sr-only">{label}</span>
      <span className="lang-code" aria-hidden="true">
        {locale.toUpperCase()}
      </span>
      <svg className="lang-chevron" viewBox="0 0 10 6" width="8" height="5" aria-hidden="true">
        <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" />
      </svg>
      <select value={locale} onChange={(e) => onChange(e.target.value)} disabled={pending} aria-label={label}>
        {LANGUAGES.map((l) => (
          <option key={l.code} value={l.code} lang={l.tag}>
            {l.name}
          </option>
        ))}
      </select>
    </label>
  );
}
