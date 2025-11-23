import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { siteSettings } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

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
      .where(eq(siteSettings.key, "homepage_biologicals_section"))
      .limit(1);

    if (setting[0]?.value) {
      const data = JSON.parse(setting[0].value);
      return NextResponse.json({ success: true, data });
    }

    // Return default structure
    const defaultData = {
      enabled: true,
      leftBgColor: "#0c4a6e",
      accentColor: "#f97316",
      buttonColor: "#f97316",
      imageUrl: "",
      tr: {
        title: "Balık Unu",
        subtitle: "Kaliteli Yem Hammaddeleri",
        description: "Yüksek protein içeriği ve doğru aminoasit profili ile balık yemi üretiminde en uygun ürünleri keşfedin. Rejeneratif tarım, hayvan sağlığı ve neden önemli olduklarını öğrenin.",
        buttonText: "BALIK UNU NEDİR?",
      },
      en: {
        title: "Fish Meal",
        subtitle: "Quality Feed Materials",
        description: "Discover the most suitable products for fish feed production with high protein content and correct amino acid profile. Learn about regenerative agriculture, animal health and why they are important.",
        buttonText: "WHAT IS FISH MEAL?",
      },
      ru: {
        title: "Рыбная мука",
        subtitle: "Качественные кормовые материалы",
        description: "Откройте для себя наиболее подходящие продукты для производства рыбных кормов с высоким содержанием белка и правильным профилем аминокислот. Узнайте о регенеративном сельском хозяйстве, здоровье животных и почему это важно.",
        buttonText: "ЧТО ТАКОЕ РЫБНАЯ МУКА?",
      },
      fa: {
        title: "آرد ماهی",
        subtitle: "مواد خوراکی با کیفیت",
        description: "محصولات مناسب برای تولید خوراک ماهی با محتوای پروتئین بالا و پروفایل اسید آمینه صحیح را کشف کنید. درباره کشاورزی احیاکننده، سلامت حیوانات و اهمیت آنها بیاموزید.",
        buttonText: "آرد ماهی چیست؟",
      },
      az: {
        title: "Balıq unu",
        subtitle: "Keyfiyyətli yem materialları",
        description: "Yüksək protein tərkibi və düzgün amin turşusu profili ilə balıq yemi istehsalı üçün ən uyğun məhsulları kəşf edin. Reqenerativ kənd təsərrüfatı, heyvan sağlamlığı və onların niyə vacib olduğunu öyrənin.",
        buttonText: "BALIQ UNU NƏDİR?",
      },
      ar: {
        title: "وجبة السمك",
        subtitle: "مواد علفية عالية الجودة",
        description: "اكتشف المنتجات الأنسب لإنتاج علف الأسماك بمحتوى بروتين عالي وملف أحماض أمينية صحيح. تعرف على الزراعة المتجددة وصحة الحيوانات ولماذا هي مهمة.",
        buttonText: "ما هي وجبة السمك؟",
      },
    };

    return NextResponse.json({ success: true, data: defaultData });
  } catch (error) {
    console.error("Error fetching biologicals section:", error);
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
      .where(eq(siteSettings.key, "homepage_biologicals_section"))
      .limit(1);

    const value = JSON.stringify(data);

    if (existing.length > 0) {
      await db
        .update(siteSettings)
        .set({ value, updatedAt: new Date() })
        .where(eq(siteSettings.key, "homepage_biologicals_section"));
    } else {
      await db.insert(siteSettings).values({
        key: "homepage_biologicals_section",
        value,
        type: "json",
      });
    }

    return NextResponse.json({ success: true, message: "Section updated successfully" });
  } catch (error) {
    console.error("Error updating biologicals section:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("image") as File;

    if (!file) {
      return NextResponse.json(
        { success: false, message: "No file provided" },
        { status: 400 }
      );
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { success: false, message: "Invalid file type" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadsDir = join(process.cwd(), "public");
    await mkdir(uploadsDir, { recursive: true });

    const timestamp = Date.now();
    const extension = file.name.split(".").pop();
    const filename = `biologicals-image-${timestamp}.${extension}`;
    const filepath = join(uploadsDir, filename);

    await writeFile(filepath, buffer);

    const imageUrl = `/${filename}`;

    // Update the biologicals section with new image
    const existing = await db
      .select()
      .from(siteSettings)
      .where(eq(siteSettings.key, "homepage_biologicals_section"))
      .limit(1);

    let currentData = {};
    if (existing[0]?.value) {
      currentData = JSON.parse(existing[0].value);
    }

    const updatedData = { ...currentData, imageUrl };

    if (existing.length > 0) {
      await db
        .update(siteSettings)
        .set({ value: JSON.stringify(updatedData), updatedAt: new Date() })
        .where(eq(siteSettings.key, "homepage_biologicals_section"));
    } else {
      await db.insert(siteSettings).values({
        key: "homepage_biologicals_section",
        value: JSON.stringify(updatedData),
        type: "json",
      });
    }

    return NextResponse.json({ success: true, imageUrl });
  } catch (error) {
    console.error("Error uploading image:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

