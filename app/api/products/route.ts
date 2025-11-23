import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { products, categories } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const productsList = await db
      .select({
        id: products.id,
        nameTr: products.nameTr,
        nameEn: products.nameEn,
        nameRu: products.nameRu,
        nameFa: products.nameFa,
        nameAz: products.nameAz,
        nameAr: products.nameAr,
        descriptionTr: products.descriptionTr,
        descriptionEn: products.descriptionEn,
        descriptionRu: products.descriptionRu,
        descriptionFa: products.descriptionFa,
        descriptionAz: products.descriptionAz,
        descriptionAr: products.descriptionAr,
        imageUrl: products.imageUrl,
        isFeatured: products.isFeatured,
        slug: products.slug,
        categoryId: products.categoryId,
        active: products.active,
      })
      .from(products)
      .where(eq(products.active, true))
      .orderBy(desc(products.isFeatured), products.id);

    // Fetch categories for each product
    const productsWithCategories = await Promise.all(
      productsList.map(async (product) => {
        if (product.categoryId) {
          const category = await db
            .select()
            .from(categories)
            .where(eq(categories.id, product.categoryId))
            .limit(1);
          return {
            ...product,
            category: category[0] || null,
          };
        }
        return { ...product, category: null };
      })
    );

    return NextResponse.json({ success: true, data: productsWithCategories });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

