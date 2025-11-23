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
    ru: {
      companyName: "ГарантиКо Корм и Сырьевая Промышленность",
      mainTitle: "Рыбная мука и кормовое сырье",
      introText: "Мы предлагаем вам наиболее подходящие продукты для производства рыбных кормов с высоким содержанием белка и правильным профилем аминокислот.",
      pureFish: {
        title: "100% Чистая Рыба",
        description: "Наша продукция производится только из свежей и охлажденной дикой рыбы. С высококачественным содержанием белка и сбалансированным профилем аминокислот, они обеспечивают превосходную производительность в рыбных кормах и других группах кормов.",
        contactButton: "Связаться",
      },
      benefits: {
        aminoAcid: {
          title: "Оптимальный Баланс Аминокислот",
          description: "Наша рыбная мука содержит все незаменимые аминокислоты, необходимые для здорового роста.",
        },
        digestibility: {
          title: "Максимальная Перевариваемость",
          description: "Наша технология низкотемпературной обработки обеспечивает высокую перевариваемость для оптимального усвоения питательных веществ.",
        },
        metabolism: {
          title: "Метаболизм и Энергетическая Эффективность",
          description: "Наши отобранные ингредиенты оптимизируют передачу энергии для активной жизни и улучшенного общего здоровья.",
        },
      },
      features: {
        fcr: {
          title: "Оптимизированная Производительность FCR",
          description: "Минимизирует потребление корма, максимизирует урожайность, достигает низких показателей FCR, поддерживает здоровье животных, снижает производственные затраты и способствует устойчивому росту.",
        },
        digestibility: {
          title: "Высокая Перевариваемость и Повышение Производительности",
          description: "Превосходная перевариваемость для максимальной питательной ценности, эффективное питание животных, улучшенная производительность роста и сниженные производственные затраты.",
        },
        quality: {
          title: "Современные Производственные Процессы и Контроль Качества",
          description: "Использует новейшие технологии низкотемпературной обработки и тщательные процедуры контроля качества для сохранения питательной ценности и обеспечения соответствия международным стандартам.",
        },
        immune: {
          title: "Продвинутая Иммунная Поддержка и Антиоксидантная Защита",
          description: "Формула, обогащенная природными антиоксидантами, укрепляет иммунную систему, снижает эффекты свободных радикалов, повышает устойчивость к окислительному стрессу и обеспечивает проактивную защиту от болезней.",
        },
      },
    },
    fa: {
      companyName: "صنعت خوراک و مواد اولیه گارانتیکو",
      mainTitle: "آرد ماهی و مواد اولیه خوراک",
      introText: "ما مناسب‌ترین محصولات را برای تولید خوراک ماهی با محتوای پروتئین بالا و پروفایل اسید آمینه صحیح به شما ارائه می‌دهیم.",
      pureFish: {
        title: "۱۰۰٪ ماهی خالص",
        description: "محصولات ما فقط از ماهی‌های تازه و سرد شده صید شده از طبیعت تولید می‌شوند. با محتوای پروتئین با کیفیت بالا و پروفایل اسید آمینه متعادل، عملکرد برتر در خوراک ماهی و سایر گروه‌های خوراک ارائه می‌دهند.",
        contactButton: "تماس",
      },
      benefits: {
        aminoAcid: {
          title: "تعادل بهینه اسید آمینه",
          description: "آرد ماهی ما شامل تمام اسیدهای آمینه ضروری لازم برای رشد سالم است.",
        },
        digestibility: {
          title: "قابلیت هضم حداکثر",
          description: "فناوری پردازش دمای پایین ما قابلیت هضم بالا را برای جذب بهینه مواد مغذی فراهم می‌کند.",
        },
        metabolism: {
          title: "متابولیسم و کارایی انرژی",
          description: "مواد تشکیل‌دهنده انتخابی ما انتقال انرژی را برای زندگی فعال و سلامت عمومی بهبود یافته بهینه می‌کند.",
        },
      },
      features: {
        fcr: {
          title: "عملکرد بهینه FCR",
          description: "مصرف خوراک را به حداقل می‌رساند، عملکرد را به حداکثر می‌رساند، نرخ‌های پایین FCR را به دست می‌آورد، سلامت حیوانات را پشتیبانی می‌کند، هزینه‌های تولید را کاهش می‌دهد و به رشد پایدار کمک می‌کند.",
        },
        digestibility: {
          title: "قابلیت هضم بالا و افزایش عملکرد",
          description: "قابلیت هضم برتر برای حداکثر ارزش غذایی، تغذیه کارآمد حیوانات، عملکرد رشد بهبود یافته و هزینه‌های تولید کاهش یافته.",
        },
        quality: {
          title: "فرآیندهای تولید مدرن و کنترل کیفیت",
          description: "از جدیدترین فناوری‌های پردازش دمای پایین و رویه‌های دقیق کنترل کیفیت برای حفظ ارزش غذایی و اطمینان از انطباق با استانداردهای بین‌المللی استفاده می‌کند.",
        },
        immune: {
          title: "پشتیبانی پیشرفته ایمنی و محافظت آنتی‌اکسیدانی",
          description: "فرمول غنی شده با آنتی‌اکسیدان‌های طبیعی، سیستم‌های ایمنی را تقویت می‌کند، اثرات رادیکال آزاد را کاهش می‌دهد، مقاومت در برابر استرس اکسیداتیو را افزایش می‌دهد و محافظت پیشگیرانه در برابر بیماری‌ها را فراهم می‌کند.",
        },
      },
    },
    az: {
      companyName: "GarantiCo Yem və Xammal Sənayesi",
      mainTitle: "Balıq unu və yem xammalları",
      introText: "Yüksək protein tərkibi və düzgün amin turşusu profili ilə balıq yemi istehsalı üçün ən uyğun məhsulları təklif edirik.",
      pureFish: {
        title: "100% Təmiz Balıq",
        description: "Məhsullarımız yalnız təzə və soyudulmuş vəhşi tutulmuş balıqlardan istehsal olunur. Yüksək keyfiyyətli protein tərkibi və balanslaşdırılmış amin turşusu profili ilə balıq yemi və digər yem qruplarında üstün performans təmin edir.",
        contactButton: "Əlaqə",
      },
      benefits: {
        aminoAcid: {
          title: "Optimal Amin Turşusu Balansı",
          description: "Balıq unlarımız sağlam böyümə üçün lazım olan bütün vacib amin turşularını ehtiva edir.",
        },
        digestibility: {
          title: "Maksimum Həzm Qabiliyyəti",
          description: "Aşağı temperatur emal texnologiyamız optimal qida mənimsəməsi üçün yüksək həzm qabiliyyəti təmin edir.",
        },
        metabolism: {
          title: "Metabolizm və Enerji Səmərəliliyi",
          description: "Seçilmiş tərkib maddələrimiz aktiv həyat və təkmilləşdirilmiş ümumi sağlamlıq üçün enerji ötürməsini optimallaşdırır.",
        },
      },
      features: {
        fcr: {
          title: "Optimallaşdırılmış FCR Performansı",
          description: "Yem istehlakını minimuma endirir, məhsuldarlığı maksimuma çatdırır, aşağı FCR nisbətləri əldə edir, heyvan sağlamlığını dəstəkləyir, istehsal xərclərini azaldır və davamlı böyüməyə töhfə verir.",
        },
        digestibility: {
          title: "Yüksək Həzm Qabiliyyəti və Performans Artımı",
          description: "Maksimum qida dəyəri üçün üstün həzm qabiliyyəti, səmərəli heyvan qidalanması, təkmilləşdirilmiş böyümə performansı və azaldılmış istehsal xərcləri.",
        },
        quality: {
          title: "Müasir İstehsal Prosesləri və Keyfiyyət Nəzarəti",
          description: "Qida dəyərini qorumaq və beynəlxalq standartlara uyğunluğu təmin etmək üçün ən son aşağı temperatur emal texnologiyaları və diqqətli keyfiyyət nəzarəti prosedurları istifadə olunur.",
        },
        immune: {
          title: "Təkmilləşdirilmiş İmmun Dəstək və Antioksidant Qoruma",
          description: "Təbii antioksidanlarla zənginləşdirilmiş formula, immun sistemlərini gücləndirir, sərbəst radikal təsirlərini azaldır, oksidativ stressə qarşı müqaviməti artırır və xəstəliklərə qarşı proaktiv qoruma təmin edir.",
        },
      },
    },
    ar: {
      companyName: "صناعة الأعلاف والمواد الخام جارانتي",
      mainTitle: "وجبة السمك والمواد الخام للأعلاف",
      introText: "نقدم لك المنتجات الأنسب لإنتاج علف الأسماك بمحتوى بروتين عالي وملف أحماض أمينية صحيح.",
      pureFish: {
        title: "100% سمك نقي",
        description: "يتم إنتاج منتجاتنا فقط من الأسماك الطازجة والمبردة المصطادة من البرية. مع محتوى بروتين عالي الجودة وملف أحماض أمينية متوازن، توفر أداءً متفوقاً في علف الأسماك ومجموعات الأعلاف الأخرى.",
        contactButton: "اتصل",
      },
      benefits: {
        aminoAcid: {
          title: "توازن الأحماض الأمينية الأمثل",
          description: "تحتوي وجبة السمك لدينا على جميع الأحماض الأمينية الأساسية اللازمة للنمو الصحي.",
        },
        digestibility: {
          title: "قابلية الهضم القصوى",
          description: "توفر تقنية المعالجة منخفضة الحرارة لدينا قابلية هضم عالية لامتصاص المغذيات الأمثل.",
        },
        metabolism: {
          title: "الأيض وكفاءة الطاقة",
          description: "تحسن المكونات المختارة لدينا نقل الطاقة للحياة النشطة والصحة العامة المحسنة.",
        },
      },
      features: {
        fcr: {
          title: "أداء FCR المحسّن",
          description: "يقلل من استهلاك العلف، ويزيد من الإنتاجية، ويحقق معدلات FCR منخفضة، ويدعم صحة الحيوانات، ويقلل من تكاليف الإنتاج، ويساهم في النمو المستدام.",
        },
        digestibility: {
          title: "قابلية الهضم العالية وزيادة الأداء",
          description: "قابلية هضم متفوقة لأقصى قيمة غذائية، وتغذية حيوانية فعالة، وأداء نمو محسّن، وتكاليف إنتاج مخفضة.",
        },
        quality: {
          title: "عمليات الإنتاج الحديثة ومراقبة الجودة",
          description: "يستخدم أحدث تقنيات المعالجة منخفضة الحرارة وإجراءات مراقبة الجودة الدقيقة للحفاظ على القيمة الغذائية وضمان الامتثال للمعايير الدولية.",
        },
        immune: {
          title: "دعم المناعة المتقدم والحماية المضادة للأكسدة",
          description: "صيغة غنية بمضادات الأكسدة الطبيعية لتقوية أنظمة المناعة، وتقليل آثار الجذور الحرة، وزيادة المقاومة للإجهاد التأكسدي، وتوفير حماية استباقية ضد الأمراض.",
        },
      },
    },
  };

  // Use database content if available, otherwise use default
  const content = contentSectionData?.[locale] || defaultContent[locale as keyof typeof defaultContent] || defaultContent.tr;
  const sectionBgColor = contentSectionData?.backgroundColor || "#e0f2fe";

  // Helper function to get localized text
  const getLocalizedText = (tr: string, en: string, ru?: string, fa?: string, az?: string, ar?: string) => {
    if (locale === "tr") return tr;
    if (locale === "en") return en;
    if (locale === "ru") return ru || en;
    if (locale === "fa") return fa || en;
    if (locale === "az") return az || tr;
    if (locale === "ar") return ar || en;
    return en;
  };

  // Sample products data
  const featuredProducts = [
    {
      id: 1,
      name: getLocalizedText("Balık Unu", "Fish Meal", "Рыбная мука", "آرد ماهی", "Balıq unu", "وجبة السمك"),
      description: getLocalizedText(
        "Premium kalite balık unu, %65+ protein içeriği ile yüksek besin değeri",
        "Premium quality fish meal with high nutritional value, 65%+ protein content",
        "Премиум качественная рыбная мука с высокой пищевой ценностью, содержание белка 65%+",
        "آرد ماهی با کیفیت ممتاز با ارزش غذایی بالا، محتوای پروتئین 65٪+",
        "Premium keyfiyyətli balıq unu, yüksək qida dəyəri ilə, 65%+ protein tərkibi",
        "وجبة سمك عالية الجودة بقيمة غذائية عالية، محتوى بروتين 65٪+"
      ),
      isFeatured: true,
      slug: "balik-unu",
    },
    {
      id: 2,
      name: getLocalizedText("Tavuk Unu", "Chicken Meal", "Куриная мука", "آرد مرغ", "Toyuq unu", "وجبة الدجاج"),
      description: getLocalizedText(
        "Yüksek protein içerikli tavuk unu, hayvan yemi üretimi için ideal",
        "High protein chicken meal, ideal for animal feed production",
        "Куриная мука с высоким содержанием белка, идеальна для производства кормов для животных",
        "آرد مرغ با محتوای پروتئین بالا، ایده‌آل برای تولید خوراک حیوانات",
        "Yüksək protein tərkibli toyuq unu, heyvan yemi istehsalı üçün ideal",
        "وجبة دجاج عالية البروتين، مثالية لإنتاج علف الحيوانات"
      ),
      slug: "tavuk-unu",
    },
    {
      id: 3,
      name: getLocalizedText("Soya Küspesi", "Soybean Meal", "Соевый шрот", "کنجاله سویا", "Soya küspəsi", "كسب فول الصويا"),
      description: getLocalizedText(
        "Bitkisel protein kaynağı, ekonomik ve besleyici",
        "Plant-based protein source, economical and nutritious",
        "Растительный источник белка, экономичный и питательный",
        "منبع پروتئین گیاهی، اقتصادی و مغذی",
        "Bitki əsaslı protein mənbəyi, iqtisadi və qidalandırıcı",
        "مصدر بروتين نباتي، اقتصادي ومغذي"
      ),
      slug: "soya-kuspesi",
    },
    {
      id: 4,
      name: getLocalizedText("Balık Yağı", "Fish Oil", "Рыбий жир", "روغن ماهی", "Balıq yağı", "زيت السمك"),
      description: getLocalizedText(
        "Omega-3 açısından zengin balık yağı, premium kalite",
        "Omega-3 rich fish oil, premium quality",
        "Рыбий жир, богатый омега-3, премиум качество",
        "روغن ماهی غنی از امگا 3، کیفیت ممتاز",
        "Omega-3 baxımından zəngin balıq yağı, premium keyfiyyət",
        "زيت سمك غني بأوميغا 3، جودة ممتازة"
      ),
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
            <div className="container mx-auto px-4">
              <div className="grid md:grid-cols-2 min-h-[500px] rounded-lg overflow-hidden shadow-lg">
                {/* Left Panel - Text Content */}
                <div 
                  className="p-12 md:p-16 flex flex-col justify-center"
                  style={{ backgroundColor: biologicalsSectionData?.leftBgColor || "#0c4a6e" }}
                >
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    {biologicalsSectionData?.[locale]?.title || getLocalizedText("Balık Unu", "Fish Meal", "Рыбная мука", "آرد ماهی", "Balıq unu", "وجبة السمك")}
                  </h2>
                  <p className="text-xl md:text-2xl font-bold mb-6" style={{ color: biologicalsSectionData?.accentColor || "#f97316" }}>
                    {biologicalsSectionData?.[locale]?.subtitle || getLocalizedText("Kaliteli Yem Hammaddeleri", "Quality Feed Materials", "Качественные кормовые материалы", "مواد خوراکی با کیفیت", "Keyfiyyətli yem materialları", "مواد علفية عالية الجودة")}
                  </p>
                  <p className="text-lg text-white/90 mb-8 leading-relaxed">
                    {biologicalsSectionData?.[locale]?.description || getLocalizedText(
                      "Yüksek protein içeriği ve doğru aminoasit profili ile balık yemi üretiminde en uygun ürünleri keşfedin. Rejeneratif tarım, hayvan sağlığı ve neden önemli olduklarını öğrenin.",
                      "Discover the most suitable products for fish feed production with high protein content and correct amino acid profile. Learn about regenerative agriculture, animal health and why they are important.",
                      "Откройте для себя наиболее подходящие продукты для производства рыбных кормов с высоким содержанием белка и правильным профилем аминокислот. Узнайте о регенеративном сельском хозяйстве, здоровье животных и почему это важно.",
                      "محصولات مناسب برای تولید خوراک ماهی با محتوای پروتئین بالا و پروفایل اسید آمینه صحیح را کشف کنید. درباره کشاورزی احیاکننده، سلامت حیوانات و اهمیت آنها بیاموزید.",
                      "Yüksək protein tərkibi və düzgün amin turşusu profili ilə balıq yemi istehsalı üçün ən uyğun məhsulları kəşf edin. Reqenerativ kənd təsərrüfatı, heyvan sağlamlığı və onların niyə vacib olduğunu öyrənin.",
                      "اكتشف المنتجات الأنسب لإنتاج علف الأسماك بمحتوى بروتين عالي وملف أحماض أمينية صحيح. تعرف على الزراعة المتجددة وصحة الحيوانات ولماذا هي مهمة."
                    )}
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
                      {biologicalsSectionData?.[locale]?.buttonText || getLocalizedText("BALIK UNU NEDİR?", "WHAT IS FISH MEAL?", "ЧТО ТАКОЕ РЫБНАЯ МУКА?", "آرد ماهی چیست؟", "BALIQ UNU NƏDİR?", "ما هي وجبة السمك؟")}
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
            </div>
          </section>
        )}

        {/* Products Section */}
        <section className="bg-white py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-text-dark mb-4">
                {getLocalizedText("Ürünlerimiz", "Our Products", "Наша продукция", "محصولات ما", "Məhsullarımız", "منتجاتنا")}
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
