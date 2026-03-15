export const locales = ["en", "fr", "es", "pt", "de", "zh", "ja"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  en: "English",
  fr: "Français",
  es: "Español",
  pt: "Português",
  de: "Deutsch",
  zh: "中文",
  ja: "日本語",
};
