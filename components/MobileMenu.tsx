"use client";

import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { LanguageSwitcher } from "./LanguageSwitcher";

interface MobileMenuProps {
  locale: string;
  menuItems?: Array<{
    id?: number;
    labelTr: string;
    labelEn: string;
    href: string;
  }>;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ locale, menuItems: propMenuItems }) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = propMenuItems || [
    { href: `/${locale}`, labelTr: "Ana Sayfa", labelEn: "Home" },
    { href: `/${locale}/about`, labelTr: "Hakkımızda", labelEn: "About" },
    { href: `/${locale}/products`, labelTr: "Ürünlerimiz", labelEn: "Products" },
    { href: `/${locale}/contact`, labelTr: "İletişim", labelEn: "Contact" },
  ];

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
              {menuItems.map((item, index) => (
                <Link
                  key={item.id || item.href || index}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-text-dark hover:text-primary-ocean transition-colors py-2 border-b border-gray-200"
                >
                  {locale === "tr" ? item.labelTr : item.labelEn}
                </Link>
              ))}
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

