import { ProductSpotlight } from "@/components/ProductSpotlight";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Package, Award, CheckCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
import { i18nConfig } from "@/lib/i18n/config";

export async function generateStaticParams() {
  const locales = i18nConfig.locales;
  const slugs = ["balik-unu", "fish-meal", "tavuk-unu", "soya-kuspesi"];
  
  return locales.flatMap((locale) =>
    slugs.map((slug) => ({
      locale: locale,
      slug: slug,
    }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  const locale = params.locale || "tr";
  const slug = params.slug;
  const isFishMeal = slug === "balik-unu" || slug === "fish-meal";

  if (isFishMeal) {
    if (locale === "en") {
      return {
        title: "Premium Quality Fish Meal - GarantiCo",
        description:
          "Premium quality fish meal with min 65% protein. HACCP certified. Ideal for fish and poultry feed production. Get a quote!",
        keywords: ["fish meal", "feed ingredients", "protein meal", "HACCP certified"],
      };
    }
    return {
      title: "Premium Kalite Balık Unu - GarantiCo",
      description:
        "Premium kalite balık unu. Min %65 protein, HACCP sertifikalı. Balık ve kümes hayvanları yemi üretimi için ideal. Teklif alın!",
      keywords: [
        "balık unu satışı",
        "balık unu fiyat",
        "premium balık unu",
        "HACCP sertifikalı balık unu",
      ],
    };
  }

  return {
    title: locale === "tr" ? "Ürün Detayları - GarantiCo" : "Product Details - GarantiCo",
  };
}

export default function ProductDetailPage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const locale = params.locale || "tr";
  const slug = params.slug;

  // In real app, fetch product data from database based on slug
  const isFishMeal = slug === "balik-unu" || slug === "fish-meal";

  const t = {
    tr: {
      back: "Ürünlere Dön",
      specifications: {
        title: "Teknik Özellikler",
        protein: "Protein: Min %65",
        ash: "Ham kül: Max %15",
        moisture: "Nem: Max %10",
        salt: "Tuz: Max %4",
      },
      packaging: {
        title: "Ambalaj Seçenekleri",
        options: ["25kg çuval", "50kg çuval", "1000kg big bag"],
      },
      certificates: {
        title: "Sertifikalar",
        items: ["HACCP", "EU Onaylı", "ISO 22000"],
      },
      usage: {
        title: "Kullanım Alanları",
        items: [
          "Balık yemi üretimi",
          "Kümes hayvanları yemi",
          "Evcil hayvan yemi",
        ],
      },
      cta: "Hemen Teklif Al",
    },
    en: {
      back: "Back to Products",
      specifications: {
        title: "Technical Specifications",
        protein: "Protein: Min 65%",
        ash: "Ash: Max 15%",
        moisture: "Moisture: Max 10%",
        salt: "Salt: Max 4%",
      },
      packaging: {
        title: "Packaging Options",
        options: ["25kg bag", "50kg bag", "1000kg big bag"],
      },
      certificates: {
        title: "Certificates",
        items: ["HACCP", "EU Approved", "ISO 22000"],
      },
      usage: {
        title: "Usage Areas",
        items: [
          "Fish feed production",
          "Poultry feed",
          "Pet food",
        ],
      },
      cta: "Get Quote Now",
    },
  };

  const content = t[locale as keyof typeof t] || t.tr;

  if (isFishMeal) {
    return (
      <div className="min-h-screen py-16">
        <div className="container mx-auto px-4">
          <Link
            href={`/${locale}/products`}
            className="inline-flex items-center gap-2 text-primary-ocean hover:text-primary-accent mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            {content.back}
          </Link>

          <ProductSpotlight locale={locale} />

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Certificates */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Award className="w-6 h-6 text-primary-ocean" />
                  <CardTitle>{content.certificates.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {content.certificates.items.map((cert, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-3 bg-primary-ocean/5 rounded-lg"
                    >
                      <CheckCircle className="w-5 h-5 text-success-green" />
                      <span className="font-medium text-text-dark">{cert}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Usage Areas */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Package className="w-6 h-6 text-primary-ocean" />
                  <CardTitle>{content.usage.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {content.usage.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-3 bg-primary-ocean/5 rounded-lg"
                    >
                      <CheckCircle className="w-5 h-5 text-primary-ocean" />
                      <span className="text-text-dark">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* CTA Section */}
          <div className="bg-primary-ocean text-white rounded-2xl p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              {locale === "tr"
                ? "Balık Unu Fiyat Teklifi Almak İster misiniz?"
                : "Would you like to get a Fish Meal price quote?"}
            </h2>
            <p className="text-xl text-primary-light mb-6">
              {locale === "tr"
                ? "Hemen iletişime geçin, size özel fiyat teklifi hazırlayalım."
                : "Contact us now, let us prepare a custom price quote for you."}
            </p>
            <Link href={`/${locale}/contact`}>
              <Button variant="secondary" size="lg">
                {content.cta}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // For other products, show a simpler detail page
  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <Link
          href={`/${locale}/products`}
          className="inline-flex items-center gap-2 text-primary-ocean hover:text-primary-accent mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          {content.back}
        </Link>

        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">
              {locale === "tr" ? "Ürün Detayları" : "Product Details"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-text-light">
              {locale === "tr"
                ? "Ürün detayları yakında eklenecek."
                : "Product details will be added soon."}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

