import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { siteSettings } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const setting = await db
      .select()
      .from(siteSettings)
      .where(eq(siteSettings.key, "homepage_content_section"))
      .limit(1);

    if (setting[0]?.value) {
      const data = JSON.parse(setting[0].value);
      return NextResponse.json({ success: true, data });
    }

    // Return default structure
    const defaultData = {
      backgroundColor: "#e0f2fe",
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

    return NextResponse.json({ success: true, data: defaultData });
  } catch (error) {
    console.error("Error fetching homepage content:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { data } = body;

    if (!data) {
      return NextResponse.json(
        { success: false, message: "Data is required" },
        { status: 400 }
      );
    }

    const existing = await db
      .select()
      .from(siteSettings)
      .where(eq(siteSettings.key, "homepage_content_section"))
      .limit(1);

    const value = JSON.stringify(data);

    if (existing.length > 0) {
      await db
        .update(siteSettings)
        .set({ value, updatedAt: new Date() })
        .where(eq(siteSettings.key, "homepage_content_section"));
    } else {
      await db.insert(siteSettings).values({
        key: "homepage_content_section",
        value,
        type: "json",
      });
    }

    return NextResponse.json({ success: true, message: "Content updated successfully" });
  } catch (error) {
    console.error("Error updating homepage content:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

