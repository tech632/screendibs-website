/*
 * The site's two languages. French comes first: under the Charter of the French Language,
 * Quebec visitors must be offered French at least as prominently as English. `proxy.ts`
 * sends unprefixed URLs to the visitor's browser language, and to French when it can't tell.
 */
export const LOCALES = ["fr", "en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "fr";

export const hasLocale = (value: string): value is Locale =>
  (LOCALES as readonly string[]).includes(value);

/** `/about` → `/fr/about`; `/` → `/fr`. */
export const localize = (lang: Locale, path: string) =>
  `/${lang}${path === "/" ? "" : path}`;

/** The same page in the other language: `/fr/about` → `/en/about`. */
export const switchLocale = (pathname: string, to: Locale) => {
  const rest = pathname.replace(/^\/(fr|en)(?=\/|$)/, "");
  return localize(to, rest || "/");
};

/** Picks the first supported language from an Accept-Language header. */
export function pickLocale(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return DEFAULT_LOCALE;
  const ranked = acceptLanguage
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const q = params.find((p) => p.trim().startsWith("q="));
      return { base: tag.toLowerCase().split("-")[0], q: q ? Number(q.split("=")[1]) : 1 };
    })
    .filter((x) => x.q > 0)
    .sort((a, b) => b.q - a.q);
  return ranked.map((x) => x.base).find(hasLocale) ?? DEFAULT_LOCALE;
}
