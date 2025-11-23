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
    const [heroImage, overlayOpacity] = await Promise.all([
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

    return NextResponse.json({
      success: true,
      heroImage: heroImage[0]?.value || "/hero-image.png",
      overlayOpacity: overlayOpacity[0]?.value ? parseInt(overlayOpacity[0].value) : 40,
    });
  } catch (error) {
    console.error("Error fetching hero settings:", error);
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
    const file = formData.get("heroImage") as File;

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
    const filename = `hero-image-${timestamp}.${extension}`;
    const filepath = join(uploadsDir, filename);

    await writeFile(filepath, buffer);

    const heroUrl = `/${filename}`;

    // Delete old hero image setting
    const existing = await db
      .select()
      .from(siteSettings)
      .where(eq(siteSettings.key, "hero_image_url"))
      .limit(1);

    if (existing.length > 0) {
      await db
        .update(siteSettings)
        .set({ value: heroUrl, updatedAt: new Date() })
        .where(eq(siteSettings.key, "hero_image_url"));
    } else {
      await db.insert(siteSettings).values({
        key: "hero_image_url",
        value: heroUrl,
        type: "image",
      });
    }

    return NextResponse.json({ success: true, heroImage: heroUrl });
  } catch (error) {
    console.error("Error uploading hero image:", error);
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
    const { overlayOpacity } = body;

    if (overlayOpacity === undefined) {
      return NextResponse.json(
        { success: false, message: "overlayOpacity is required" },
        { status: 400 }
      );
    }

    const existing = await db
      .select()
      .from(siteSettings)
      .where(eq(siteSettings.key, "hero_overlay_opacity"))
      .limit(1);

    if (existing.length > 0) {
      await db
        .update(siteSettings)
        .set({ value: overlayOpacity.toString(), updatedAt: new Date() })
        .where(eq(siteSettings.key, "hero_overlay_opacity"));
    } else {
      await db.insert(siteSettings).values({
        key: "hero_overlay_opacity",
        value: overlayOpacity.toString(),
        type: "text",
      });
    }

    return NextResponse.json({ success: true, message: "Overlay opacity updated" });
  } catch (error) {
    console.error("Error updating overlay opacity:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

