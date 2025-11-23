"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Globe } from "lucide-react";
import { i18nConfig } from "@/lib/i18n/config";

export const LanguageSwitcher: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const switchLanguage = (locale: string) => {
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length > 0 && i18nConfig.locales.includes(segments[0] as any)) {
      segments[0] = locale;
    } else {
      segments.unshift(locale);
    }
    setIsOpen(false);
    router.push(`/${segments.join("/")}`);
  };

  const currentLocale = pathname.split("/")[1] || i18nConfig.defaultLocale;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-2 py-1 hover:bg-white/10 transition-colors rounded"
      >
        <Globe className="w-4 h-4 text-white" />
        <span className="text-sm font-medium text-white uppercase">
          {currentLocale}
        </span>
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          {i18nConfig.locales.map((locale) => (
            <button
              key={locale}
              onClick={() => switchLanguage(locale)}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-primary-light/10 first:rounded-t-lg last:rounded-b-lg transition-colors ${
                currentLocale === locale
                  ? "bg-primary-ocean/10 text-primary-ocean font-semibold"
                  : "text-text-dark"
              }`}
            >
              {i18nConfig.localeNames[locale as keyof typeof i18nConfig.localeNames] || locale.toUpperCase()}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

