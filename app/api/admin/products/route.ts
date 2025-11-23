import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { products } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const productsList = await db
      .select()
      .from(products)
      .orderBy(desc(products.isFeatured), products.id);
    return NextResponse.json({ success: true, data: productsList });
  } catch (error) {
    console.error("Error fetching products:", error);
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
    const body = await request.json();

    // Validate required fields
    if (!body.nameTr || !body.nameEn || !body.slug) {
      return NextResponse.json(
        { success: false, message: "Name (TR/EN) and slug are required" },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const existing = await db
      .select()
      .from(products)
      .where(eq(products.slug, body.slug))
      .limit(1);

    if (existing.length > 0) {
      return NextResponse.json(
        { success: false, message: "Slug already exists" },
        { status: 400 }
      );
    }

    const newProduct = await db
      .insert(products)
      .values({
        nameTr: body.nameTr,
        nameEn: body.nameEn,
        slug: body.slug,
        descriptionTr: body.descriptionTr || null,
        descriptionEn: body.descriptionEn || null,
        imageUrl: body.imageUrl || null,
        isFeatured: body.isFeatured || false,
        active: body.active !== false,
        categoryId: body.categoryId || null,
        proteinMin: body.proteinMin || null,
        ashMax: body.ashMax || null,
        moistureMax: body.moistureMax || null,
      })
      .returning();

    return NextResponse.json({
      success: true,
      message: "Product created",
      data: newProduct[0],
    });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

