"use client";

import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { LanguageSwitcher } from "./LanguageSwitcher";

interface MobileMenuProps {
  locale: string;
  menuItems?: Array<{
    id?: number;
    labelTr?: string;
    labelEn?: string;
    labelRu?: string;
    labelFa?: string;
    labelAz?: string;
    labelAr?: string;
    href: string;
  }>;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ locale, menuItems: propMenuItems }) => {
  const [isOpen, setIsOpen] = useState(false);

  const defaultMenuItems = [
    { 
      href: `/${locale}`, 
      labelTr: "Ana Sayfa", 
      labelEn: "Home",
      labelRu: "Главная",
      labelFa: "خانه",
      labelAz: "Ana Səhifə",
      labelAr: "الرئيسية",
    },
    { 
      href: `/${locale}/about`, 
      labelTr: "Hakkımızda", 
      labelEn: "About",
      labelRu: "О нас",
      labelFa: "درباره ما",
      labelAz: "Haqqımızda",
      labelAr: "من نحن",
    },
    { 
      href: `/${locale}/products`, 
      labelTr: "Ürünlerimiz", 
      labelEn: "Products",
      labelRu: "Продукция",
      labelFa: "محصولات",
      labelAz: "Məhsullarımız",
      labelAr: "المنتجات",
    },
    { 
      href: `/${locale}/contact`, 
      labelTr: "İletişim", 
      labelEn: "Contact",
      labelRu: "Контакты",
      labelFa: "تماس",
      labelAz: "Əlaqə",
      labelAr: "اتصل بنا",
    },
  ];

  const menuItems = propMenuItems || defaultMenuItems;

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-white hover:text-primary-light transition-colors"
        aria-label="Menu"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed top-16 right-0 w-64 bg-white shadow-lg z-50 h-[calc(100vh-4rem)] overflow-y-auto">
            <div className="flex flex-col p-4 space-y-4">
              {menuItems.map((item, index) => {
                // Fix href with current locale
                const fixHref = (href: string) => {
                  const segments = href.split("/").filter(Boolean);
                  if (segments.length > 0 && ["tr", "en", "ru", "fa", "az", "ar"].includes(segments[0])) {
                    segments[0] = locale;
                    return `/${segments.join("/")}`;
                  }
                  if (href.startsWith("/")) {
                    return `/${locale}${href}`;
                  }
                  return `/${locale}/${href}`;
                };

                const getLabel = () => {
                  if (locale === "tr") return item.labelTr || item.labelEn;
                  if (locale === "en") return item.labelEn || item.labelTr;
                  if (locale === "ru") return item.labelRu || item.labelEn || item.labelTr;
                  if (locale === "fa") return item.labelFa || item.labelEn || item.labelTr;
                  if (locale === "az") return item.labelAz || item.labelTr || item.labelEn;
                  if (locale === "ar") return item.labelAr || item.labelEn || item.labelTr;
                  return item.labelEn || item.labelTr;
                };

                return (
                  <Link
                    key={`mobile-${item.href}-${index}`}
                    href={fixHref(item.href)}
                    onClick={() => setIsOpen(false)}
                    className="text-text-dark hover:text-primary-ocean transition-colors py-2 border-b border-gray-200"
                  >
                    {getLabel()}
                  </Link>
                );
              })}
              <div className="pt-4 border-t border-gray-200">
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

