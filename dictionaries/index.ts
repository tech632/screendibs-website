import type { Locale } from "@/lib/i18n";
import en, { type Dict } from "./en";
import fr from "./fr";

const DICTS: Record<Locale, Dict> = { en, fr };

export const getDictionary = (lang: Locale): Dict => DICTS[lang];
export type { Dict };
