export const i18nConfig = {
  locales: ["tr", "en"],
  defaultLocale: "tr",
  localeNames: {
    tr: "Türkçe",
    en: "English",
  },
} as const;

export type Locale = (typeof i18nConfig.locales)[number];

