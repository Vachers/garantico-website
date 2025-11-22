import { ProductSpotlight } from "@/components/ProductSpotlight";
import { QualityCertificates } from "@/components/QualityCertificates";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/Button";
import { Fish, Award, Truck, TrendingUp, Users, Globe, CheckCircle2, ArrowRight, Sparkles } from "lucide-react";
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
        title: "Kaliteli Balık Unu ve Yem Hammaddeleri",
        subtitle: "Tedarikçiniz",
        description: "20+ yıllık deneyimle, Avrupa kalitesinde balık unu ve yem hammaddeleri tedarikinde sektörün güvenilir ortağı",
        cta: "Hemen Teklif Alın",
        ctaSecondary: "Ürünlerimizi Keşfedin",
        features: {
          protein: "%65+ Protein",
          certified: "Sertifikalı Kalite",
          delivery: "Hızlı Teslimat",
          global: "Global Tedarik",
        },
      },
      products: {
        title: "Ürün Portföyümüz",
        subtitle: "Geniş ürün yelpazemizle ihtiyaçlarınıza en uygun çözümü sunuyoruz",
        viewAll: "Tüm Ürünleri Görüntüle",
      },
      stats: {
        title: "Neden GarantiCo?",
        subtitle: "Sektördeki lider konumumuzun göstergeleri",
        experience: "20+ Yıl",
        experienceLabel: "Sektör Deneyimi",
        products: "50+ Ürün",
        productsLabel: "Ürün Çeşitliliği",
        customers: "500+",
        customersLabel: "Mutlu Müşteri",
        countries: "30+ Ülke",
        countriesLabel: "Global Ağ",
      },
      trust: {
        title: "Güvenilir İş Ortağınız",
        subtitle: "Kalite, güvenilirlik ve müşteri memnuniyeti odaklı hizmet anlayışımız",
        points: [
          "Sertifikalı kalite güvencesi",
          "Rekabetçi fiyatlandırma",
          "Zamanında teslimat",
          "7/24 müşteri desteği",
        ],
      },
    },
    en: {
      hero: {
        title: "Quality Fish Meal and Feed Raw Materials",
        subtitle: "Your Supplier",
        description: "With 20+ years of experience, we are the trusted partner in supplying European quality fish meal and feed raw materials",
        cta: "Get Quote Now",
        ctaSecondary: "Explore Products",
        features: {
          protein: "65%+ Protein",
          certified: "Certified Quality",
          delivery: "Fast Delivery",
          global: "Global Supply",
        },
      },
      products: {
        title: "Our Product Portfolio",
        subtitle: "We offer the most suitable solutions for your needs with our wide product range",
        viewAll: "View All Products",
      },
      stats: {
        title: "Why GarantiCo?",
        subtitle: "Indicators of our leading position in the industry",
        experience: "20+ Years",
        experienceLabel: "Industry Experience",
        products: "50+ Products",
        productsLabel: "Product Diversity",
        customers: "500+",
        customersLabel: "Happy Customers",
        countries: "30+ Countries",
        countriesLabel: "Global Network",
      },
      trust: {
        title: "Your Trusted Business Partner",
        subtitle: "Our service approach focused on quality, reliability and customer satisfaction",
        points: [
          "Certified quality assurance",
          "Competitive pricing",
          "On-time delivery",
          "24/7 customer support",
        ],
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
        {/* Hero Section - Ocean Theme with Ships */}
        <section className="relative bg-gradient-to-b from-primary-blue via-primary-ocean to-primary-blue text-white overflow-hidden min-h-[70vh] md:min-h-[85vh] flex items-center">
          {/* Ocean Background with Ships */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a4a6e] via-[#0284c7] to-[#0c4a6e]">
            {/* Ocean waves effect */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary-blue/50 to-transparent"></div>
            </div>
            
            {/* Ships illustration - using CSS */}
            <div className="absolute inset-0 overflow-hidden">
              {/* Ship 1 - Large container ship */}
              <div className="absolute bottom-[15%] left-[10%] w-32 md:w-48 opacity-80">
                <div className="relative">
                  <div className="w-full h-8 bg-orange-500 rounded-t-lg"></div>
                  <div className="w-full h-16 bg-gray-300 mt-2 rounded"></div>
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2 h-12 bg-gray-400"></div>
                  <div className="absolute top-2 left-2 w-8 h-6 bg-blue-600 rounded"></div>
                  <div className="absolute top-2 right-2 w-8 h-6 bg-blue-600 rounded"></div>
                </div>
              </div>
              
              {/* Ship 2 - Medium container ship */}
              <div className="absolute bottom-[12%] right-[15%] w-24 md:w-40 opacity-70">
                <div className="relative">
                  <div className="w-full h-6 bg-gray-400 rounded-t-lg"></div>
                  <div className="w-full h-12 bg-gray-200 mt-1 rounded"></div>
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1.5 h-10 bg-gray-500"></div>
                  <div className="absolute top-1 left-1 w-6 h-4 bg-blue-500 rounded"></div>
                </div>
              </div>
              
              {/* Ship 3 - Small ship in background */}
              <div className="absolute bottom-[18%] left-[40%] w-16 md:w-28 opacity-60">
                <div className="relative">
                  <div className="w-full h-5 bg-white rounded-t-lg"></div>
                  <div className="w-full h-10 bg-gray-100 mt-1 rounded"></div>
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-8 bg-gray-300"></div>
                </div>
              </div>
              
              {/* Ship 4 - Far background */}
              <div className="absolute bottom-[20%] right-[35%] w-12 md:w-24 opacity-50">
                <div className="relative">
                  <div className="w-full h-4 bg-white rounded-t"></div>
                  <div className="w-full h-8 bg-gray-100 mt-1 rounded"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
            <div className="max-w-6xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight text-white drop-shadow-lg">
                <span className="block">{content.hero.title}</span>
                <span className="block mt-2">{content.hero.subtitle}</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
                {content.hero.description}
              </p>

              {/* CTA Button */}
              <div className="flex justify-center">
                <Link href={`/${locale}/contact`}>
                  <Button variant="secondary" size="lg" className="text-lg px-10 py-6 shadow-2xl hover:shadow-3xl transition-all hover:scale-105">
                    {content.hero.cta}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Wave Divider */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-20 md:h-32">
              <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
            </svg>
          </div>
        </section>

        {/* Stats Section - Modern Cards */}
        <section className="bg-white py-16 md:py-24 -mt-1">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-text-dark mb-4">
                {content.stats.title}
              </h2>
              <p className="text-xl text-text-light max-w-2xl mx-auto">
                {content.stats.subtitle}
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              <div className="group text-center p-6 md:p-8 rounded-2xl bg-gradient-to-br from-primary-ocean/5 to-primary-blue/5 hover:shadow-xl transition-all duration-300 border border-primary-ocean/10 hover:border-primary-ocean/30">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-ocean/10 rounded-full mb-4 group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-8 h-8 text-primary-ocean" />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-primary-ocean mb-2">
                  {content.stats.experience}
                </div>
                <p className="text-sm md:text-base text-text-light font-medium">
                  {content.stats.experienceLabel}
                </p>
              </div>

              <div className="group text-center p-6 md:p-8 rounded-2xl bg-gradient-to-br from-primary-ocean/5 to-primary-blue/5 hover:shadow-xl transition-all duration-300 border border-primary-ocean/10 hover:border-primary-ocean/30">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-ocean/10 rounded-full mb-4 group-hover:scale-110 transition-transform">
                  <Award className="w-8 h-8 text-primary-ocean" />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-primary-ocean mb-2">
                  {content.stats.products}
                </div>
                <p className="text-sm md:text-base text-text-light font-medium">
                  {content.stats.productsLabel}
                </p>
              </div>

              <div className="group text-center p-6 md:p-8 rounded-2xl bg-gradient-to-br from-primary-ocean/5 to-primary-blue/5 hover:shadow-xl transition-all duration-300 border border-primary-ocean/10 hover:border-primary-ocean/30">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-ocean/10 rounded-full mb-4 group-hover:scale-110 transition-transform">
                  <Users className="w-8 h-8 text-primary-ocean" />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-primary-ocean mb-2">
                  {content.stats.customers}
                </div>
                <p className="text-sm md:text-base text-text-light font-medium">
                  {content.stats.customersLabel}
                </p>
              </div>

              <div className="group text-center p-6 md:p-8 rounded-2xl bg-gradient-to-br from-primary-ocean/5 to-primary-blue/5 hover:shadow-xl transition-all duration-300 border border-primary-ocean/10 hover:border-primary-ocean/30">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-ocean/10 rounded-full mb-4 group-hover:scale-110 transition-transform">
                  <Globe className="w-8 h-8 text-primary-ocean" />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-primary-ocean mb-2">
                  {content.stats.countries}
                </div>
                <p className="text-sm md:text-base text-text-light font-medium">
                  {content.stats.countriesLabel}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Product Spotlight */}
        <section className="container mx-auto px-4 py-16 md:py-24">
          <ProductSpotlight locale={locale} />
        </section>

        {/* Trust Section */}
        <section className="bg-gradient-to-br from-slate-50 to-white py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-text-dark mb-4">
                {content.trust.title}
              </h2>
              <p className="text-xl text-text-light">
                {content.trust.subtitle}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {content.trust.points.map((point, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-all border border-gray-100"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-primary-ocean/10 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-primary-ocean" />
                  </div>
                  <p className="text-text-dark font-medium text-left">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section className="container mx-auto px-4 py-16 md:py-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-text-dark mb-4">
              {content.products.title}
            </h2>
            <p className="text-xl text-text-light max-w-2xl mx-auto">
              {content.products.subtitle}
            </p>
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

          <div className="text-center">
            <Link href={`/${locale}/products`}>
              <Button variant="primary" size="lg" className="text-lg px-8 py-6">
                {content.products.viewAll}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </section>

        {/* Quality Certificates */}
        <QualityCertificates locale={locale} />

        {/* Final CTA Section */}
        <section className="relative bg-gradient-to-br from-primary-blue via-primary-ocean to-primary-accent text-white py-20 md:py-28 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}></div>
          </div>
          
          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                {locale === "tr"
                  ? "Balık Unu Fiyat Teklifi Almak İster misiniz?"
                  : "Would you like to get a Fish Meal price quote?"}
              </h2>
              <p className="text-xl md:text-2xl text-primary-light mb-10">
                {locale === "tr"
                  ? "Hemen iletişime geçin, size özel fiyat teklifi hazırlayalım."
                  : "Contact us now, let us prepare a custom price quote for you."}
              </p>
              <Link href={`/${locale}/contact`}>
                <Button variant="secondary" size="lg" className="text-lg px-10 py-6 shadow-2xl hover:shadow-3xl transition-all hover:scale-105">
                  {content.hero.cta}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
