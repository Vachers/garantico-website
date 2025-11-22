import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { siteSettings } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const settings = await db.select().from(siteSettings);
    const settingsMap = settings.reduce((acc, setting) => {
      acc[setting.key] = setting.value;
      return acc;
    }, {} as Record<string, string | null>);

    return NextResponse.json({
      success: true,
      data: {
        address: settingsMap.address || "",
        phone: settingsMap.phone || "",
        email: settingsMap.email || "",
        whatsapp: settingsMap.whatsapp || "",
        officeAddress: settingsMap.office_address || "",
        warehouseAddress: settingsMap.warehouse_address || "",
      },
    });
  } catch (error) {
    console.error("Error fetching settings:", error);
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

    const settingsToUpdate = [
      { key: "phone", value: body.phone },
      { key: "email", value: body.email },
      { key: "whatsapp", value: body.whatsapp },
      { key: "office_address", value: body.officeAddress },
      { key: "warehouse_address", value: body.warehouseAddress },
    ];

    for (const setting of settingsToUpdate) {
      const existing = await db
        .select()
        .from(siteSettings)
        .where(eq(siteSettings.key, setting.key))
        .limit(1);

      if (existing.length > 0) {
        await db
          .update(siteSettings)
          .set({ value: setting.value, updatedAt: new Date() })
          .where(eq(siteSettings.key, setting.key));
      } else {
        await db.insert(siteSettings).values({
          key: setting.key,
          value: setting.value,
          type: "text",
        });
      }
    }

    return NextResponse.json({ success: true, message: "Settings updated" });
  } catch (error) {
    console.error("Error updating settings:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

