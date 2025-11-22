import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { products } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

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

    await db
      .update(products)
      .set({
        nameTr: body.nameTr,
        nameEn: body.nameEn,
        descriptionTr: body.descriptionTr,
        descriptionEn: body.descriptionEn,
        isFeatured: body.isFeatured,
        active: body.active,
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

