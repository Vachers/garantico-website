import { ProductSpotlight } from "@/components/ProductSpotlight";
import { QualityCertificates } from "@/components/QualityCertificates";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/Button";
import { Fish, Award, Truck, TrendingUp, Users, Globe, CheckCircle2, ArrowRight, Play } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
import { i18nConfig } from "@/lib/i18n/config";

// Force dynamic rendering to avoid static generation issues
export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({
    locale: locale,
  }));
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
        title: "Gelecek. Yeni Bir Değer",
        subtitle: "İnovasyon",
      },
      highlightTopics: {
        title: "Öne Çıkan Konular",
      },
      whoWeAre: {
        title: "Biz Kimiz",
        description: "Ürünlerimiz ve teknolojilerimiz, gıda, su ve çevre alanlarında çözümler sunmaktadır.",
        agriculture: {
          title: "Tarım",
          description: "Kapsamlı tarım çözümleri sağlayıcısı olarak, küresel tarımı destekliyoruz.",
        },
        water: {
          title: "Su",
          description: "Su çevre çözümlerimiz, su altyapısını desteklemektedir.",
        },
        environment: {
          title: "Çevre",
          description: "Üretim için sosyal altyapı ve refah dolu yaşamlara katkı sağlıyoruz.",
        },
        button: "Yarın İçin Temel",
      },
      innovation: {
        title: "İnovasyon",
        description: "Sosyal sorunları ele almak ve yeni hizmetler ve ürünler geliştirmek için vizyonumuz.",
        button: "Daha Fazla Bilgi",
      },
      sustainability: {
        title: "Sürdürülebilirlik",
        description: "Gıda, su ve çevreyi sürdürülebilir bir toplum için tek bir tema olarak ele alıyoruz.",
        button: "Daha Fazla Bilgi",
      },
    },
    en: {
      hero: {
        title: "The Future. A New Value",
        subtitle: "Innovation",
      },
      highlightTopics: {
        title: "Highlight Topics",
      },
      whoWeAre: {
        title: "Who We Are",
        description: "Our products and technologies provide solutions in food, water, and the environment.",
        agriculture: {
          title: "Agriculture",
          description: "As a comprehensive solutions provider for agriculture, we support farming globally.",
        },
        water: {
          title: "Water",
          description: "Our water environment solutions support water infrastructure.",
        },
        environment: {
          title: "Environment",
          description: "We contribute to social infrastructure for manufacturing and affluent lives.",
        },
        button: "Groundwork for Tomorrow",
      },
      innovation: {
        title: "Innovation",
        description: "Our vision for addressing social issues and developing new services and products.",
        button: "Learn More",
      },
      sustainability: {
        title: "Sustainability",
        description: "We approach food, water, and the environment as a singular theme for a sustainable society.",
        button: "Learn More",
      },
    },
  };

  const content = t[locale as keyof typeof t] || t.tr;

  // Sample products data
  const featuredProducts = [
    {
      id: 1,
      name: locale === "tr" ? "Balık Unu" : "Fish Meal",
      description:
        locale === "tr"
          ? "Premium kalite balık unu, %65+ protein içeriği ile yüksek besin değeri"
          : "Premium quality fish meal with high nutritional value, 65%+ protein content",
      isFeatured: true,
      slug: "balik-unu",
    },
    {
      id: 2,
      name: locale === "tr" ? "Tavuk Unu" : "Chicken Meal",
      description:
        locale === "tr"
          ? "Yüksek protein içerikli tavuk unu, hayvan yemi üretimi için ideal"
          : "High protein chicken meal, ideal for animal feed production",
      slug: "tavuk-unu",
    },
    {
      id: 3,
      name: locale === "tr" ? "Soya Küspesi" : "Soybean Meal",
      description:
        locale === "tr"
          ? "Bitkisel protein kaynağı, ekonomik ve besleyici"
          : "Plant-based protein source, economical and nutritious",
      slug: "soya-kuspesi",
    },
    {
      id: 4,
      name: locale === "tr" ? "Balık Yağı" : "Fish Oil",
      description:
        locale === "tr"
          ? "Omega-3 açısından zengin balık yağı, premium kalite"
          : "Omega-3 rich fish oil, premium quality",
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
        {/* Hero Section - Full width with background image */}
        <section className="relative w-full h-[85vh] md:h-[90vh] flex items-center justify-start overflow-hidden">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/hero-image.png')",
            }}
          >
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary-blue/85 via-primary-blue/70 to-primary-blue/50"></div>
          </div>
          
          {/* Content */}
          <div className="container mx-auto px-4 md:px-8 relative z-10">
            <div className="max-w-2xl">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight drop-shadow-2xl">
                {content.hero.title}
              </h1>
              <div className="flex items-center gap-3">
                <Play className="w-8 h-8 md:w-10 md:h-10 text-white drop-shadow-lg" />
                <span className="text-xl md:text-2xl text-white font-medium drop-shadow-lg">
                  {content.hero.subtitle}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Highlight Topics Section */}
        <section className="bg-white py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-text-dark mb-12 text-center">
              {content.highlightTopics.title}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="bg-gray-100 rounded-lg aspect-[4/3] flex items-center justify-center">
                  <span className="text-text-light">Topic {item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Who We Are Section */}
        <section className="bg-primary-light/10 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-text-dark mb-6">
                {content.whoWeAre.title}
              </h2>
              <p className="text-lg text-text-light">
                {content.whoWeAre.description}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {/* Agriculture */}
              <div className="bg-white rounded-lg overflow-hidden shadow-md">
                <div className="h-48 bg-gradient-to-br from-green-400 to-green-600"></div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-text-dark mb-3">
                    {content.whoWeAre.agriculture.title}
                  </h3>
                  <p className="text-text-light">
                    {content.whoWeAre.agriculture.description}
                  </p>
                </div>
              </div>

              {/* Water */}
              <div className="bg-white rounded-lg overflow-hidden shadow-md">
                <div className="h-48 bg-gradient-to-br from-primary-ocean to-primary-blue"></div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-text-dark mb-3">
                    {content.whoWeAre.water.title}
                  </h3>
                  <p className="text-text-light">
                    {content.whoWeAre.water.description}
                  </p>
                </div>
              </div>

              {/* Environment */}
              <div className="bg-white rounded-lg overflow-hidden shadow-md">
                <div className="h-48 bg-gradient-to-br from-primary-blue to-primary-ocean"></div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-text-dark mb-3">
                    {content.whoWeAre.environment.title}
                  </h3>
                  <p className="text-text-light">
                    {content.whoWeAre.environment.description}
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Button variant="primary" size="lg">
                {content.whoWeAre.button}
              </Button>
            </div>
          </div>
        </section>

        {/* Innovation Section - Split Layout */}
        <section className="bg-white py-16 md:py-24">
          <div className="grid md:grid-cols-2">
            <div className="bg-primary-blue text-white p-12 md:p-16 flex flex-col justify-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {content.innovation.title}
              </h2>
              <p className="text-lg text-primary-light mb-8">
                {content.innovation.description}
              </p>
              <Button variant="secondary" size="lg" className="w-fit">
                {content.innovation.button}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
            <div className="bg-gradient-to-br from-primary-ocean to-primary-blue h-96 md:h-auto"></div>
          </div>
        </section>

        {/* Sustainability Section - Split Layout (reversed) */}
        <section className="bg-white py-16 md:py-24">
          <div className="grid md:grid-cols-2">
            <div className="bg-gradient-to-br from-green-400 to-green-600 h-96 md:h-auto"></div>
            <div className="bg-primary-blue text-white p-12 md:p-16 flex flex-col justify-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {content.sustainability.title}
              </h2>
              <p className="text-lg text-primary-light mb-8">
                {content.sustainability.description}
              </p>
              <Button variant="secondary" size="lg" className="w-fit">
                {content.sustainability.button}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="bg-white py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-text-dark mb-4">
                {locale === "tr" ? "Ürünlerimiz" : "Our Products"}
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12">
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
          </div>
        </section>

        {/* Quality Certificates */}
        <QualityCertificates locale={locale} />
      </div>
    </>
  );
}
