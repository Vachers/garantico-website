import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { products } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const id = parseInt(params.id);

    // Check if slug is being changed and if it already exists
    if (body.slug) {
      const existing = await db
        .select()
        .from(products)
        .where(eq(products.slug, body.slug))
        .limit(1);

      if (existing.length > 0 && existing[0].id !== id) {
        return NextResponse.json(
          { success: false, message: "Slug already exists" },
          { status: 400 }
        );
      }
    }

    await db
      .update(products)
      .set({
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
      .where(eq(products.id, id));

    return NextResponse.json({ success: true, message: "Product updated" });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const id = parseInt(params.id);

    // Soft delete - set active to false
    await db
      .update(products)
      .set({ active: false })
      .where(eq(products.id, id));

    return NextResponse.json({ success: true, message: "Product deleted" });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

