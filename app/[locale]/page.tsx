import { ProductSpotlight } from "@/components/ProductSpotlight";
import { QualityCertificates } from "@/components/QualityCertificates";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/Button";
import { Fish, Award, Truck } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
import { i18nConfig } from "@/lib/i18n/config";

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale = params.locale || "tr";

  if (locale === "en") {
    return {
      title: "GarantiCo - Quality Fish Meal and Feed Raw Materials Supplier",
      description:
        "European quality fish meal and feed raw materials supplier. 65%+ protein, certified quality, fast delivery. Get a quote!",
    };
  }

  return {
    title: "GarantiCo - Kaliteli Balık Unu ve Yem Hammaddeleri Tedarikçiniz",
    description:
      "Avrupa kalitesinde balık unu ve yem hammaddeleri tedarikçisi. %65+ protein, sertifikalı kalite, hızlı teslimat. Teklif alın!",
  };
}

export default function HomePage({ params }: { params: { locale: string } }) {
  const locale = params.locale || "tr";

  const t = {
    tr: {
      hero: {
        title: "Kaliteli Balık Unu ve Yem Hammaddeleri Tedarikçiniz",
        subtitle: "Avrupa Kalitesinde Balık Unu ve Yem Hammaddeleri",
        description: "20+ Yıllık Deneyimle Güvenilir Tedarik",
        cta: "Balık Unu Fiyat Teklifi Al",
        features: {
          protein: "%65+ Protein Oranında Balık Unu",
          certified: "Sertifikalı Kalite Güvencesi",
          delivery: "Hızlı Teslimat Ağı",
        },
      },
      products: {
        title: "Ürünlerimiz",
        subtitle: "Geniş ürün yelpazemizle hizmetinizdeyiz",
        viewAll: "Tümünü Gör",
      },
      stats: {
        title: "Neden GarantiCo?",
        experience: "20+ Yıl Deneyim",
        products: "50+ Ürün",
        customers: "500+ Müşteri",
      },
    },
    en: {
      hero: {
        title: "Quality Fish Meal and Feed Raw Materials Supplier",
        subtitle: "European Quality Fish Meal and Feed Raw Materials",
        description: "Reliable Supply with 20+ Years of Experience",
        cta: "Get Fish Meal Price Quote",
        features: {
          protein: "Fish Meal with 65%+ Protein",
          certified: "Certified Quality Assurance",
          delivery: "Fast Delivery Network",
        },
      },
      products: {
        title: "Our Products",
        subtitle: "At your service with our wide product range",
        viewAll: "View All",
      },
      stats: {
        title: "Why GarantiCo?",
        experience: "20+ Years Experience",
        products: "50+ Products",
        customers: "500+ Customers",
      },
    },
  };

  const content = t[locale as keyof typeof t] || t.tr;

  // Sample products data - in real app, this would come from database
  const featuredProducts = [
    {
      id: 1,
      name: locale === "tr" ? "Balık Unu" : "Fish Meal",
      description:
        locale === "tr"
          ? "Premium kalite balık unu, %65+ protein"
          : "Premium quality fish meal, 65%+ protein",
      isFeatured: true,
      slug: "balik-unu",
    },
    {
      id: 2,
      name: locale === "tr" ? "Tavuk Unu" : "Chicken Meal",
      description:
        locale === "tr"
          ? "Yüksek protein içerikli tavuk unu"
          : "High protein chicken meal",
      slug: "tavuk-unu",
    },
    {
      id: 3,
      name: locale === "tr" ? "Soya Küspesi" : "Soybean Meal",
      description:
        locale === "tr"
          ? "Bitkisel protein kaynağı"
          : "Plant-based protein source",
      slug: "soya-kuspesi",
    },
    {
      id: 4,
      name: locale === "tr" ? "Balık Yağı" : "Fish Oil",
      description:
        locale === "tr"
          ? "Omega-3 açısından zengin balık yağı"
          : "Omega-3 rich fish oil",
      slug: "balik-yagi",
    },
  ];

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "GarantiCo",
    description:
      locale === "tr"
        ? "Kaliteli balık unu ve yem hammaddeleri tedarikçisi"
        : "Quality fish meal and feed raw materials supplier",
    url: process.env.NEXT_PUBLIC_APP_URL || "https://garantico.com",
    logo: `${process.env.NEXT_PUBLIC_APP_URL || "https://garantico.com"}/logo.png`,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+90-555-123-45-67",
      contactType: "Customer Service",
      email: "info@garantico.com",
    },
    sameAs: [],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-blue via-primary-ocean to-primary-accent text-white py-20 md:py-32">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                {content.hero.title}
              </h1>
              <p className="text-xl md:text-2xl text-primary-light mb-8">
                {content.hero.subtitle}
              </p>
              <p className="text-lg mb-10">{content.hero.description}</p>

              <div className="grid md:grid-cols-3 gap-6 mb-10">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <Fish className="w-10 h-10 mx-auto mb-4" />
                  <p className="font-semibold">{content.hero.features.protein}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <Award className="w-10 h-10 mx-auto mb-4" />
                  <p className="font-semibold">{content.hero.features.certified}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                  <Truck className="w-10 h-10 mx-auto mb-4" />
                  <p className="font-semibold">{content.hero.features.delivery}</p>
                </div>
              </div>

              <Link href={`/${locale}/contact`}>
                <Button variant="secondary" size="lg">
                  {content.hero.cta}
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Product Spotlight */}
        <section className="container mx-auto px-4 py-16 -mt-8">
          <ProductSpotlight locale={locale} />
        </section>

        {/* Stats Section */}
        <section className="bg-slate-50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-text-dark mb-12">
              {content.stats.title}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-5xl font-bold text-primary-ocean mb-2">20+</div>
                <p className="text-lg text-text-light">{content.stats.experience}</p>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-primary-ocean mb-2">50+</div>
                <p className="text-lg text-text-light">{content.stats.products}</p>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-primary-ocean mb-2">500+</div>
                <p className="text-lg text-text-light">{content.stats.customers}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-text-dark mb-4">
              {content.products.title}
            </h2>
            <p className="text-lg text-text-light">{content.products.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                description={product.description}
                isFeatured={product.isFeatured}
                locale={locale}
                slug={product.slug}
              />
            ))}
          </div>

          <div className="text-center">
            <Link href={`/${locale}/products`}>
              <Button variant="outline" size="lg">
                {content.products.viewAll}
              </Button>
            </Link>
          </div>
        </section>

        {/* Quality Certificates */}
        <QualityCertificates locale={locale} />

        {/* CTA Section */}
        <section className="bg-primary-ocean text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {locale === "tr"
                ? "Balık Unu Fiyat Teklifi Almak İster misiniz?"
                : "Would you like to get a Fish Meal price quote?"}
            </h2>
            <p className="text-xl mb-8 text-primary-light">
              {locale === "tr"
                ? "Hemen iletişime geçin, size özel fiyat teklifi hazırlayalım."
                : "Contact us now, let us prepare a custom price quote for you."}
            </p>
            <Link href={`/${locale}/contact`}>
              <Button variant="secondary" size="lg">
                {content.hero.cta}
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
