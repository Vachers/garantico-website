import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { MobileMenu } from "@/components/MobileMenu";
import Link from "next/link";
import { i18nConfig } from "@/lib/i18n/config";
import { Search, Globe } from "lucide-react";
import { db } from "@/lib/db";
import { navigationItems } from "@/lib/db/schema";
import { eq, asc } from "drizzle-orm";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale = params.locale || "tr";

  if (locale === "en") {
    return {
      title: "GarantiCo - Quality Fish Meal and Feed Raw Materials",
      description:
        "European quality fish meal and feed raw materials supplier. 65%+ protein, certified quality, fast delivery.",
      keywords: [
        "fish meal",
        "feed raw materials",
        "soybean meal",
        "chicken meal",
        "quality feed ingredients",
      ],
      openGraph: {
        title: "GarantiCo - Quality Fish Meal and Feed Raw Materials",
        description:
          "European quality fish meal and feed raw materials supplier. 65%+ protein, certified quality, fast delivery.",
        type: "website",
      },
    };
  }

  return {
    title: "GarantiCo - Kaliteli Balık Unu ve Yem Hammaddeleri",
    description:
      "Avrupa kalitesinde balık unu ve yem hammaddeleri tedarikçisi. %65+ protein, sertifikalı kalite, hızlı teslimat.",
    keywords: [
      "balık unu satışı",
      "yem hammaddeleri tedarikçisi",
      "soya küspesi satış",
      "tavuk unu toptan",
      "kaliteli yem hammaddesi",
    ],
    openGraph: {
      title: "GarantiCo - Kaliteli Balık Unu ve Yem Hammaddeleri",
      description:
        "Avrupa kalitesinde balık unu ve yem hammaddeleri tedarikçisi. %65+ protein, sertifikalı kalite, hızlı teslimat.",
      type: "website",
    },
  };
}

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const locale = params.locale || i18nConfig.defaultLocale;

  // Fetch menu items from database
  const menuItems = await db
    .select()
    .from(navigationItems)
    .where(eq(navigationItems.active, true))
    .orderBy(asc(navigationItems.order));

  const topMenuItems = menuItems.filter((item) => item.menuType === "top");
  const mainMenuItems = menuItems.filter((item) => item.menuType === "main");

  // Default menu items if database is empty
  const defaultTopMenu = [
    { labelTr: "Dünya İçin, Yaşam İçin", labelEn: "For Earth, For Life", href: "#", menuType: "top" as const },
  ];

  const defaultMainMenu = [
    { labelTr: "Ana Sayfa", labelEn: "Home", href: `/${locale}`, menuType: "main" as const },
    { labelTr: "Hakkımızda", labelEn: "About", href: `/${locale}/about`, menuType: "main" as const },
    { labelTr: "Ürünlerimiz", labelEn: "Products", href: `/${locale}/products`, menuType: "main" as const },
    { labelTr: "İletişim", labelEn: "Contact", href: `/${locale}/contact`, menuType: "main" as const },
  ];

  const displayTopMenu = topMenuItems.length > 0 ? topMenuItems : defaultTopMenu;
  const displayMainMenu = mainMenuItems.length > 0 ? mainMenuItems : defaultMainMenu;

  // Helper function to get menu label based on locale
  const getMenuLabel = (item: any) => {
    if (locale === "tr") return item.labelTr || item.label;
    if (locale === "en") return item.labelEn || item.label;
    if (locale === "ru") return item.labelRu || item.labelEn || item.labelTr || item.label;
    if (locale === "fa") return item.labelFa || item.labelEn || item.labelTr || item.label;
    if (locale === "az") return item.labelAz || item.labelTr || item.labelEn || item.label;
    if (locale === "ar") return item.labelAr || item.labelEn || item.labelTr || item.label;
    return item.labelEn || item.labelTr || item.label;
  };

  return (
    <html lang={locale}>
      <body className={inter.className}>
        {/* Top Bar - Thin teal bar */}
        <div className="bg-primary-ocean text-white text-sm py-2">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                {displayTopMenu.map((item, index) => (
                  <Link
                    key={`top-${item.href}-${index}`}
                    href={item.href}
                    className="hover:text-primary-light transition-colors"
                  >
                    {getMenuLabel(item)}
                  </Link>
                ))}
              </div>
              <div className="flex items-center gap-6">
                <LanguageSwitcher />
                <Link
                  href={`/${locale}/contact`}
                  className="hover:text-primary-light transition-colors"
                >
                  {locale === "tr" ? "İletişim" : "Contact"}
                </Link>
                <button className="hover:text-primary-light transition-colors">
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-20">
              <Link href={`/${locale}`} className="text-2xl font-bold text-primary-blue">
                GarantiCo
              </Link>
              <div className="hidden lg:flex items-center gap-8">
                {displayMainMenu.map((item, index) => (
                  <Link
                    key={`main-${item.href}-${index}`}
                    href={item.href}
                    className="text-text-dark hover:text-primary-ocean transition-colors font-medium text-sm"
                  >
                    {getMenuLabel(item)}
                  </Link>
                ))}
              </div>
              <MobileMenu locale={locale} menuItems={displayMainMenu} />
            </div>
          </div>
        </nav>

        <main>{children}</main>

        {/* Footer */}
        <footer className="bg-primary-blue text-white">
          <div className="container mx-auto px-4 py-12">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-bold mb-4">GarantiCo</h3>
                <p className="text-primary-light text-sm">
                  {locale === "tr"
                    ? "Kaliteli balık unu ve yem hammaddeleri tedarikçiniz"
                    : "Quality fish meal and feed raw materials supplier"}
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-4 text-sm">
                  {locale === "tr" ? "Keşfet" : "Discover"}
                </h4>
                <ul className="space-y-2 text-primary-light text-sm">
                  <li>
                    <Link href={`/${locale}`} className="hover:text-white">
                      {locale === "tr" ? "Ana Sayfa" : "Home"}
                    </Link>
                  </li>
                  <li>
                    <Link href={`/${locale}/about`} className="hover:text-white">
                      {locale === "tr" ? "Hakkımızda" : "About"}
                    </Link>
                  </li>
                  <li>
                    <Link href={`/${locale}/products`} className="hover:text-white">
                      {locale === "tr" ? "Ürünler" : "Products"}
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4 text-sm">
                  {locale === "tr" ? "Kurumsal" : "Corporate"}
                </h4>
                <ul className="space-y-2 text-primary-light text-sm">
                  <li>
                    <Link href={`/${locale}/about`} className="hover:text-white">
                      {locale === "tr" ? "Hakkımızda" : "About Us"}
                    </Link>
                  </li>
                  <li>
                    <Link href={`/${locale}/contact`} className="hover:text-white">
                      {locale === "tr" ? "İletişim" : "Contact"}
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4 text-sm">
                  {locale === "tr" ? "Yasal" : "Legal"}
                </h4>
                <ul className="space-y-2 text-primary-light text-sm">
                  <li>
                    <Link href="#" className="hover:text-white">
                      {locale === "tr" ? "Kullanım Şartları" : "Terms of Use"}
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-white">
                      {locale === "tr" ? "Gizlilik Politikası" : "Privacy Policy"}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-primary-ocean pt-8 text-center text-primary-light text-sm">
              <p>&copy; 2024 GarantiCo. {locale === "tr" ? "Tüm hakları saklıdır." : "All rights reserved."}</p>
            </div>
          </div>
        </footer>
        <WhatsAppButton locale={locale} />
      </body>
    </html>
  );
}
