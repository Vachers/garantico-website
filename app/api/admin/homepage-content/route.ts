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

