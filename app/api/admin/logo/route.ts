import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { siteSettings } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const setting = await db
      .select()
      .from(siteSettings)
      .where(eq(siteSettings.key, "logo_url"))
      .limit(1);

    return NextResponse.json({
      success: true,
      logoUrl: setting[0]?.value || null,
    });
  } catch (error) {
    console.error("Error fetching logo:", error);
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
    const file = formData.get("logo") as File;

    if (!file) {
      return NextResponse.json(
        { success: false, message: "No file provided" },
        { status: 400 }
      );
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { success: false, message: "Invalid file type" },
        { status: 400 }
      );
    }

    // Save file to public/uploads directory
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create uploads directory if it doesn't exist
    const uploadsDir = join(process.cwd(), "public", "uploads");
    await mkdir(uploadsDir, { recursive: true });

    // Generate unique filename
    const timestamp = Date.now();
    const extension = file.name.split(".").pop();
    const filename = `logo-${timestamp}.${extension}`;
    const filepath = join(uploadsDir, filename);

    await writeFile(filepath, buffer);

    // Save URL to database
    const logoUrl = `/uploads/${filename}`;
    const existing = await db
      .select()
      .from(siteSettings)
      .where(eq(siteSettings.key, "logo_url"))
      .limit(1);

    if (existing.length > 0) {
      await db
        .update(siteSettings)
        .set({ value: logoUrl, updatedAt: new Date() })
        .where(eq(siteSettings.key, "logo_url"));
    } else {
      await db.insert(siteSettings).values({
        key: "logo_url",
        value: logoUrl,
        type: "image",
      });
    }

    return NextResponse.json({ success: true, logoUrl });
  } catch (error) {
    console.error("Error uploading logo:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

