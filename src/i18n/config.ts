export const locales = ["en", "fr", "ar"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeMeta: Record<Locale, { label: string; short: string; dir: "ltr" | "rtl"; og: string }> = {
  en: { label: "English", short: "EN", dir: "ltr", og: "en_US" },
  fr: { label: "Français", short: "FR", dir: "ltr", og: "fr_FR" },
  ar: { label: "العربية", short: "ع", dir: "rtl", og: "ar_TN" },
};

export function isLocale(value: string | undefined): value is Locale {
  return locales.includes(value as Locale);
}

/** Localized value: one entry per supported language. */
export type Localized<T> = Record<Locale, T>;

/** hreflang map for a path (without locale prefix), e.g. "/projects/bocaro". */
export function languageAlternates(path = "") {
  return {
    ...Object.fromEntries(locales.map((locale) => [locale, `/${locale}${path}`])),
    "x-default": `/${defaultLocale}${path}`,
  };
}
