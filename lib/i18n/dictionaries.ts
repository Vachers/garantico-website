import { Locale } from "./config";

const dictionaries: Record<Locale, () => Promise<any>> = {
  tr: () => import("./locales/tr.json").then((module) => module.default),
  en: () => import("./locales/en.json").then((module) => module.default),
  ru: () => import("./locales/ru.json").then((module) => module.default),
  fa: () => import("./locales/fa.json").then((module) => module.default),
  az: () => import("./locales/az.json").then((module) => module.default),
  ar: () => import("./locales/ar.json").then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => {
  return dictionaries[locale]();
};

