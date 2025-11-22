"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { Globe } from "lucide-react";
import { i18nConfig } from "@/lib/i18n/config";

export const LanguageSwitcher: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const switchLanguage = (locale: string) => {
    const segments = pathname.split("/");
    segments[1] = locale;
    router.push(segments.join("/"));
  };

  const currentLocale = pathname.split("/")[1] || i18nConfig.defaultLocale;

  return (
    <div className="relative group">
      <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors">
        <Globe className="w-5 h-5 text-white" />
        <span className="text-sm font-medium text-white uppercase">
          {currentLocale}
        </span>
      </button>
      <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
        {i18nConfig.locales.map((locale) => (
          <button
            key={locale}
            onClick={() => switchLanguage(locale)}
            className={`w-full text-left px-4 py-2 text-sm hover:bg-primary-light/10 first:rounded-t-lg last:rounded-b-lg ${
              currentLocale === locale
                ? "bg-primary-ocean/10 text-primary-ocean font-semibold"
                : "text-text-dark"
            }`}
          >
            {i18nConfig.localeNames[locale as keyof typeof i18nConfig.localeNames]}
          </button>
        ))}
      </div>
    </div>
  );
};

