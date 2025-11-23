export const i18nConfig = {
  locales: ["tr", "en", "ru", "fa", "az", "ar"],
  defaultLocale: "tr",
  localeNames: {
    tr: "Türkçe",
    en: "English",
    ru: "Русский",
    fa: "فارسی",
    az: "Azərbaycan",
    ar: "العربية",
  },
} as const;

export type Locale = (typeof i18nConfig.locales)[number];

