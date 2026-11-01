import { cookies } from "next/headers";
import en, { type Dictionary } from "./en";
import fr from "./fr";

/*
 * English and French only, for now (decided 30 Oct 2026). The choice lives in
 * the `lang` cookie, set by the toggle in the nav corner; English is the default.
 * Reading the cookie makes routes render per request, which is fine at our scale.
 */

export const LOCALES = ["en", "fr"] as const;
export type Locale = (typeof LOCALES)[number];
export const LANG_COOKIE = "lang";

const DICTS: Record<Locale, Dictionary> = { en, fr };

export async function getLocale(): Promise<Locale> {
  const value = (await cookies()).get(LANG_COOKIE)?.value;
  return value === "fr" ? "fr" : "en";
}

export async function getDictionary(): Promise<{ locale: Locale; t: Dictionary }> {
  const locale = await getLocale();
  return { locale, t: DICTS[locale] };
}

export type { Dictionary };
