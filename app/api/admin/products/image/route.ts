import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { products } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function POST(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("productImage") as File;
    const productId = formData.get("productId") as string;

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

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, message: "File size must be less than 5MB" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadsDir = join(process.cwd(), "public", "products");
    await mkdir(uploadsDir, { recursive: true });

    const timestamp = Date.now();
    const extension = file.name.split(".").pop();
    const filename = `product-${productId}-${timestamp}.${extension}`;
    const filepath = join(uploadsDir, filename);

    await writeFile(filepath, buffer);

    const imageUrl = `/products/${filename}`;

    // Update product with image URL
    await db
      .update(products)
      .set({ imageUrl })
      .where(eq(products.id, parseInt(productId)));

    return NextResponse.json({ success: true, imageUrl });
  } catch (error) {
    console.error("Error uploading product image:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

