/* The languages the site offers. No server-only imports here: the nav menu (a client component) reads it too. See ./index.ts. */

export const LANGUAGES = [
  { code: "en", name: "English", tag: "en", menu: "Language" },
  { code: "fr", name: "Français", tag: "fr-CA", menu: "Langue" },
  { code: "es", name: "Español", tag: "es", menu: "Idioma" },
  { code: "de", name: "Deutsch", tag: "de", menu: "Sprache" },
  { code: "ar", name: "العربية", tag: "ar", menu: "اللغة" },
  { code: "zh", name: "简体中文", tag: "zh-Hans", menu: "语言" },
  { code: "ja", name: "日本語", tag: "ja", menu: "言語" },
  { code: "ko", name: "한국어", tag: "ko", menu: "언어" },
] as const;

export type Locale = (typeof LANGUAGES)[number]["code"];
export const LOCALES = LANGUAGES.map((l) => l.code) as Locale[];

/** BCP 47 tag for <html lang> and Intl formatting. */
export const localeTag = (locale: Locale) => LANGUAGES.find((l) => l.code === locale)?.tag ?? "en";
