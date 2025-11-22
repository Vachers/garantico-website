import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { MobileMenu } from "@/components/MobileMenu";
import Link from "next/link";
import { i18nConfig } from "@/lib/i18n/config";

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

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const locale = params.locale || i18nConfig.defaultLocale;

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <nav className="bg-primary-blue sticky top-0 z-50 shadow-lg">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16 md:h-20">
              <Link href={`/${locale}`} className="text-xl md:text-2xl font-bold text-white">
                GarantiCo
              </Link>
              <div className="hidden md:flex items-center gap-8">
                <Link
                  href={`/${locale}`}
                  className="text-white hover:text-primary-light transition-colors font-medium"
                >
                  {locale === "tr" ? "Ana Sayfa" : "Home"}
                </Link>
                <Link
                  href={`/${locale}/about`}
                  className="text-white hover:text-primary-light transition-colors font-medium"
                >
                  {locale === "tr" ? "Hakkımızda" : "About"}
                </Link>
                <Link
                  href={`/${locale}/products`}
                  className="text-white hover:text-primary-light transition-colors font-medium"
                >
                  {locale === "tr" ? "Ürünlerimiz" : "Products"}
                </Link>
                <Link
                  href={`/${locale}/contact`}
                  className="text-white hover:text-primary-light transition-colors font-medium"
                >
                  {locale === "tr" ? "İletişim" : "Contact"}
                </Link>
                <div className="w-px h-6 bg-white/30"></div>
                <LanguageSwitcher />
                <div className="w-px h-6 bg-white/30"></div>
                <Link
                  href={`/${locale}/contact`}
                  className="px-4 py-2 text-white hover:text-primary-light transition-colors font-medium"
                >
                  {locale === "tr" ? "İletişime Geçin" : "Contact Us"}
                </Link>
              </div>
              <MobileMenu locale={locale} />
            </div>
          </div>
        </nav>
        <main>{children}</main>
        <footer className="bg-primary-blue text-white py-8 mt-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">GarantiCo</h3>
                <p className="text-primary-light">
                  Kaliteli balık unu ve yem hammaddeleri tedarikçiniz
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Hızlı Linkler</h4>
                <ul className="space-y-2 text-primary-light">
                  <li>
                    <Link href={`/${locale}`} className="hover:text-white">
                      Ana Sayfa
                    </Link>
                  </li>
                  <li>
                    <Link href={`/${locale}/products`} className="hover:text-white">
                      Ürünlerimiz
                    </Link>
                  </li>
                  <li>
                    <Link href={`/${locale}/contact`} className="hover:text-white">
                      İletişim
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">İletişim</h4>
                <p className="text-primary-light">
                  Email: info@garantico.com
                  <br />
                  Tel: +90 555 123 45 67
                </p>
              </div>
            </div>
            <div className="border-t border-primary-ocean mt-8 pt-8 text-center text-primary-light">
              <p>&copy; 2024 GarantiCo. Tüm hakları saklıdır.</p>
            </div>
          </div>
        </footer>
        <WhatsAppButton locale={locale} />
      </body>
    </html>
  );
}

