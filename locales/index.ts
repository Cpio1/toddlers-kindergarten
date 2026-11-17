import ru from "./ru";
import kk from "./kk";
import type { Dictionary, Locale } from "./types";

export const dictionaries: Record<Locale, Dictionary> = { ru, kk };
export const DEFAULT_LOCALE: Locale = "ru";
export const LOCALE_STORAGE_KEY = "toddlers-lang";
/** Подпись на переключателе: код HTML `kk`, но пользователь видит «KZ». */
export const LOCALE_LABELS: Record<Locale, string> = { ru: "RU", kk: "KZ" };

export type { Dictionary, Locale } from "./types";
