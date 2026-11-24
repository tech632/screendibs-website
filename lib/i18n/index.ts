import { cookies } from "next/headers";
import en, { type Dictionary } from "./en";
import fr from "./fr";
import es from "./es";
import de from "./de";
import ar from "./ar";
import zh from "./zh";
import ja from "./ja";
import ko from "./ko";

/*
 * English and French (complete), plus Spanish, German, Arabic, Simplified
 * Chinese, Japanese and Korean (added 24 Nov 2026, machine-drafted, to be
 * reviewed). The choice lives in the `lang` cookie, set by the language menu in
 * the nav corner; English is the default. Reading the cookie makes routes
 * render per request, which is fine at our scale. Arabic keeps the
 * left-to-right layout for now (decided 24 Nov 2026).
 */

import { LANGUAGES, LOCALES, localeTag, type Locale } from "./languages";

export { LANGUAGES, LOCALES, localeTag, type Locale };
export const LANG_COOKIE = "lang";

const DICTS: Record<Locale, Omit<Dictionary, "lang">> = { en, fr, es, de, ar, zh, ja, ko };

const isLocale = (v: unknown): v is Locale => LOCALES.includes(v as Locale);

export async function getLocale(): Promise<Locale> {
  const value = (await cookies()).get(LANG_COOKIE)?.value;
  return isLocale(value) ? value : "en";
}


export async function getDictionary(): Promise<{ locale: Locale; t: Dictionary }> {
  const locale = await getLocale();
  const menu = LANGUAGES.find((l) => l.code === locale)?.menu ?? "Language";
  return { locale, t: { ...DICTS[locale], lang: { label: menu } } };
}

export type { Dictionary };
