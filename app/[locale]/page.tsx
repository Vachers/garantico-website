import { ProductSpotlight } from "@/components/ProductSpotlight";
import { QualityCertificates } from "@/components/QualityCertificates";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/Button";
import { Fish, Award, TrendingUp, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
import { i18nConfig } from "@/lib/i18n/config";
import { db } from "@/lib/db";
import { siteSettings } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

// Force dynamic rendering to avoid static generation issues
export const dynamic = 'force-dynamic';
export const revalidate = 0; // Disable caching completely

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

export default async function HomePage({ params }: { params: { locale: string } }) {
  const locale = params.locale || "tr";

  // Fetch hero settings from database
  const [heroImageSetting, overlayOpacitySetting] = await Promise.all([
    db
      .select()
      .from(siteSettings)
      .where(eq(siteSettings.key, "hero_image_url"))
      .limit(1),
    db
      .select()
      .from(siteSettings)
      .where(eq(siteSettings.key, "hero_overlay_opacity"))
      .limit(1),
  ]);

  const heroImage = heroImageSetting[0]?.value || "/hero-image.png";
  const overlayOpacity = overlayOpacitySetting[0]?.value
    ? parseInt(overlayOpacitySetting[0].value)
    : 40;

  // Fetch homepage content section from database
  const [contentSectionSettings, biologicalsSectionSettings] = await Promise.all([
    db
      .select()
      .from(siteSettings)
      .where(eq(siteSettings.key, "homepage_content_section"))
      .limit(1),
    db
      .select()
      .from(siteSettings)
      .where(eq(siteSettings.key, "homepage_biologicals_section"))
      .limit(1),
  ]);

  let contentSectionData: any = null;
  if (contentSectionSettings[0]?.value) {
    try {
      contentSectionData = JSON.parse(contentSectionSettings[0].value);
    } catch (e) {
      console.error("Error parsing content section data:", e);
    }
  }

  let biologicalsSectionData: any = null;
  if (biologicalsSectionSettings[0]?.value) {
    try {
      biologicalsSectionData = JSON.parse(biologicalsSectionSettings[0].value);
    } catch (e) {
      console.error("Error parsing biologicals section data:", e);
    }
  }

  // Default content (fallback)
  const defaultContent = {
    tr: {
      companyName: "GarantiCo Yem & Hammadde Sanayi",
      mainTitle: "Balık Unu ve Yem Hammaddeleri",
      introText: "Yüksek protein içeriği ve doğru aminoasit profili ile balık yemi üretiminde en uygun ürünleri size sunuyoruz.",
      pureFish: {
        title: "%100 Saf Balık",
        description: "Ürünlerimiz, sadece taze ve soğutulmuş yabani yakalanmış balıklardan üretilmektedir. Yüksek kaliteli protein içeriği ve dengeli amino asit profili ile balık yemi ve diğer yem gruplarında üstün performans sunar.",
        contactButton: "İletişim",
      },
      benefits: {
        aminoAcid: {
          title: "Optimal Amino Asit Dengesi",
          description: "Balık unlarımız, sağlıklı büyüme için gerekli tüm temel amino asitleri içerir.",
        },
        digestibility: {
          title: "Maksimum Sindirilebilirlik",
          description: "Düşük sıcaklık işleme teknolojimiz, optimal besin emilimi için yüksek sindirilebilirlik sağlar.",
        },
        metabolism: {
          title: "Metabolizma ve Enerji Verimliliği",
          description: "Seçilmiş içeriklerimiz, aktif yaşam ve gelişmiş genel sağlık için enerji transferini optimize eder.",
        },
      },
      features: {
        fcr: {
          title: "Optimize Edilmiş FCR Performansı",
          description: "Yem tüketimini minimize eder, verimi maksimize eder, düşük FCR oranları sağlar, hayvan sağlığını destekler, üretim maliyetlerini azaltır ve sürdürülebilir büyümeye katkı sağlar.",
        },
        digestibility: {
          title: "Yüksek Sindirilebilirlik ve Performans Artışı",
          description: "Maksimum besin değeri için üstün sindirilebilirlik, verimli hayvan beslenmesi, gelişmiş büyüme performansı ve azaltılmış üretim maliyetleri.",
        },
        quality: {
          title: "Modern Üretim Süreçleri ve Kalite Kontrolü",
          description: "Besin değerini korumak ve uluslararası standartlara uygunluğu sağlamak için en son düşük sıcaklık işleme teknolojileri ve titiz kalite kontrol prosedürleri kullanılmaktadır.",
        },
        immune: {
          title: "Gelişmiş İmmün Destek ve Antioksidan Koruma",
          description: "Doğal antioksidanlarla zenginleştirilmiş formül, bağışıklık sistemlerini güçlendirir, serbest radikal etkilerini azaltır, oksidatif strese karşı direnci artırır ve hastalıklara karşı proaktif koruma sağlar.",
        },
      },
    },
    en: {
      companyName: "GarantiCo Feed & Raw Material Industry",
      mainTitle: "Fish Meal and Feed Raw Materials",
      introText: "We offer you the most suitable products for fish feed production with high protein content and the correct amino acid profile.",
      pureFish: {
        title: "100% Pure Fish",
        description: "Our products are produced only from fresh and chilled wild-caught fish. With high-quality protein content and a balanced amino acid profile, they offer superior performance in fish feed and other feed groups.",
        contactButton: "Contact",
      },
      benefits: {
        aminoAcid: {
          title: "Optimal Amino Acid Balance",
          description: "Our fish meals contain all essential amino acids necessary for healthy growth.",
        },
        digestibility: {
          title: "Maximum Digestibility",
          description: "Our low-temperature processing technology provides high digestibility for optimal nutrient absorption.",
        },
        metabolism: {
          title: "Metabolism and Energy Efficiency",
          description: "Our selected ingredients optimize energy transfer for active life and improved general health.",
        },
      },
      features: {
        fcr: {
          title: "Optimized FCR Performance",
          description: "Minimizes feed consumption, maximizes yield, achieves low FCR rates, supports animal health, reduces production costs, and contributes to sustainable growth.",
        },
        digestibility: {
          title: "High Digestibility and Performance Increase",
          description: "Superior digestibility for maximum nutritional value, efficient animal nutrition, improved growth performance, and reduced production costs.",
        },
        quality: {
          title: "Modern Production Processes and Quality Control",
          description: "Uses the latest low-temperature processing technologies and meticulous quality control procedures to preserve nutritional value and ensure compliance with international standards.",
        },
        immune: {
          title: "Advanced Immune Support and Antioxidant Protection",
          description: "Formula enriched with natural antioxidants to strengthen immune systems, reduce free radical effects, increase resistance to oxidative stress, and provide proactive protection against diseases.",
        },
      },
    },
  };

  // Use database content if available, otherwise use default
  const content = contentSectionData?.[locale] || defaultContent[locale as keyof typeof defaultContent] || defaultContent.tr;
  const sectionBgColor = contentSectionData?.backgroundColor || "#e0f2fe";

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
        <section className="relative w-full h-[85vh] md:h-[90vh] flex items-center justify-center overflow-hidden">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('${heroImage}')`,
            }}
          >
            {/* Overlay - opacity controlled from admin */}
            <div 
              className="absolute inset-0 bg-gradient-to-r from-primary-blue via-primary-blue to-primary-blue"
              style={{
                opacity: overlayOpacity / 100,
              }}
            ></div>
          </div>
        </section>

        {/* Main Content Section - Background color from admin */}
        <section className="py-16 md:py-24" style={{ backgroundColor: sectionBgColor }}>
          <div className="container mx-auto px-4">
            {/* Company Name and Title */}
            <div className="mb-8">
              <p className="text-sm md:text-base text-text-dark mb-2">{content.companyName}</p>
              <div className="w-16 h-0.5 bg-primary-ocean mb-4"></div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-dark mb-6">
                {content.mainTitle}
              </h2>
              <p className="text-base md:text-lg text-text-light max-w-3xl">
                {content.introText}
              </p>
            </div>

            {/* Two Column Layout */}
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-16">
              {/* Left Column - Pure Fish */}
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-text-dark mb-4">
                  {content.pureFish.title}
                </h3>
                <p className="text-base md:text-lg text-text-light mb-6 leading-relaxed">
                  {content.pureFish.description}
                </p>
                <Link href={`/${locale}/contact`}>
                  <Button variant="primary" size="lg">
                    {content.pureFish.contactButton}
                  </Button>
                </Link>
              </div>

              {/* Right Column - Benefits */}
              <div className="space-y-6">
                <div>
                  <h4 className="text-xl md:text-2xl font-bold text-text-dark mb-2">
                    {content.benefits.aminoAcid.title}
                  </h4>
                  <p className="text-base text-text-light leading-relaxed">
                    {content.benefits.aminoAcid.description}
                  </p>
                </div>
                <div>
                  <h4 className="text-xl md:text-2xl font-bold text-text-dark mb-2">
                    {content.benefits.digestibility.title}
                  </h4>
                  <p className="text-base text-text-light leading-relaxed">
                    {content.benefits.digestibility.description}
                  </p>
                </div>
                <div>
                  <h4 className="text-xl md:text-2xl font-bold text-text-dark mb-2">
                    {content.benefits.metabolism.title}
                  </h4>
                  <p className="text-base text-text-light leading-relaxed">
                    {content.benefits.metabolism.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Four Feature Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* FCR Performance */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="w-16 h-16 bg-primary-ocean/10 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="w-8 h-8 text-primary-ocean" />
                </div>
                <h4 className="text-lg font-bold text-text-dark mb-3">
                  {content.features.fcr.title}
                </h4>
                <p className="text-sm text-text-light leading-relaxed">
                  {content.features.fcr.description}
                </p>
              </div>

              {/* Digestibility */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="w-16 h-16 bg-primary-ocean/10 rounded-lg flex items-center justify-center mb-4">
                  <Fish className="w-8 h-8 text-primary-ocean" />
                </div>
                <h4 className="text-lg font-bold text-text-dark mb-3">
                  {content.features.digestibility.title}
                </h4>
                <p className="text-sm text-text-light leading-relaxed">
                  {content.features.digestibility.description}
                </p>
              </div>

              {/* Quality Control */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="w-16 h-16 bg-primary-ocean/10 rounded-lg flex items-center justify-center mb-4">
                  <Award className="w-8 h-8 text-primary-ocean" />
                </div>
                <h4 className="text-lg font-bold text-text-dark mb-3">
                  {content.features.quality.title}
                </h4>
                <p className="text-sm text-text-light leading-relaxed">
                  {content.features.quality.description}
                </p>
              </div>

              {/* Immune Support */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="w-16 h-16 bg-primary-ocean/10 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-8 h-8 text-primary-ocean" />
                </div>
                <h4 className="text-lg font-bold text-text-dark mb-3">
                  {content.features.immune.title}
                </h4>
                <p className="text-sm text-text-light leading-relaxed">
                  {content.features.immune.description}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Biologicals Section - Split Layout */}
        {biologicalsSectionData?.enabled !== false && (
          <section className="bg-white py-16 md:py-24">
            <div className="grid md:grid-cols-2 min-h-[500px]">
              {/* Left Panel - Text Content */}
              <div 
                className="p-12 md:p-16 flex flex-col justify-center"
                style={{ backgroundColor: biologicalsSectionData?.leftBgColor || "#0c4a6e" }}
              >
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  {biologicalsSectionData?.[locale]?.title || (locale === "tr" ? "Balık Unu" : "Fish Meal")}
                </h2>
                <p className="text-xl md:text-2xl font-bold mb-6" style={{ color: biologicalsSectionData?.accentColor || "#f97316" }}>
                  {biologicalsSectionData?.[locale]?.subtitle || (locale === "tr" ? "Kaliteli Yem Hammaddeleri" : "Quality Feed Materials")}
                </p>
                <p className="text-lg text-white/90 mb-8 leading-relaxed">
                  {biologicalsSectionData?.[locale]?.description || (locale === "tr" 
                    ? "Yüksek protein içeriği ve doğru aminoasit profili ile balık yemi üretiminde en uygun ürünleri keşfedin. Rejeneratif tarım, hayvan sağlığı ve neden önemli olduklarını öğrenin."
                    : "Discover the most suitable products for fish feed production with high protein content and correct amino acid profile. Learn about regenerative agriculture, animal health and why they are important.")}
                </p>
                <Link href={`/${locale}/products`}>
                  <Button 
                    variant="secondary" 
                    size="lg" 
                    className="w-fit"
                    style={{ 
                      backgroundColor: biologicalsSectionData?.buttonColor || "#f97316",
                      color: "white"
                    }}
                  >
                    {biologicalsSectionData?.[locale]?.buttonText || (locale === "tr" ? "BALIK UNU NEDİR?" : "WHAT IS FISH MEAL?")}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
              {/* Right Panel - Image */}
              <div 
                className="bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: biologicalsSectionData?.imageUrl 
                    ? `url('${biologicalsSectionData.imageUrl}')` 
                    : "url('/placeholder-biologicals.jpg')"
                }}
              >
                {!biologicalsSectionData?.imageUrl && (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">Resim yüklenecek</span>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

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
