import { Locale } from "./config";

const dictionaries = {
  tr: () => import("./locales/tr.json").then((module) => module.default),
  en: () => import("./locales/en.json").then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => {
  return dictionaries[locale]();
};

