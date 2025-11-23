"use client";

import { useState, useEffect } from "react";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/Button";
import { Filter } from "lucide-react";
import { i18nConfig } from "@/lib/i18n/config";

export const dynamic = 'force-dynamic';

interface Product {
  id: number;
  nameTr: string;
  nameEn: string;
  nameRu?: string;
  nameFa?: string;
  nameAz?: string;
  nameAr?: string;
  descriptionTr: string | null;
  descriptionEn: string | null;
  descriptionRu?: string | null;
  descriptionFa?: string | null;
  descriptionAz?: string | null;
  descriptionAr?: string | null;
  imageUrl: string | null;
  isFeatured: boolean;
  slug: string;
  categoryId: number | null;
  category?: {
    id: number;
    nameTr: string;
    nameEn: string;
    slug: string;
  };
}

interface Category {
  id: number;
  nameTr: string;
  nameEn: string;
  slug: string;
}

export default function ProductsPage({ params }: { params: { locale: string } }) {
  const locale = params.locale || "tr";
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products");
      const data = await response.json();
      if (data.success) {
        setProducts(data.data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/categories");
      const data = await response.json();
      if (data.success) {
        setCategories(data.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const t = {
    tr: {
      title: "Ürünlerimiz",
      subtitle: "Geniş ürün yelpazemizle hizmetinizdeyiz",
      filter: {
        all: "Tümü",
      },
      noProducts: "Bu kategoride ürün bulunamadı.",
      loading: "Yükleniyor...",
    },
    en: {
      title: "Our Products",
      subtitle: "At your service with our wide product range",
      filter: {
        all: "All",
      },
      noProducts: "No products found in this category.",
      loading: "Loading...",
    },
    ru: {
      title: "Наша Продукция",
      subtitle: "К вашим услугам с нашим широким ассортиментом продукции",
      filter: {
        all: "Все",
      },
      noProducts: "В этой категории товаров не найдено.",
      loading: "Загрузка...",
    },
    fa: {
      title: "محصولات ما",
      subtitle: "با طیف گسترده محصولات ما در خدمت شما هستیم",
      filter: {
        all: "همه",
      },
      noProducts: "محصولی در این دسته یافت نشد.",
      loading: "در حال بارگذاری...",
    },
    az: {
      title: "Məhsullarımız",
      subtitle: "Geniş məhsul çeşidimizlə xidmətinizdəyik",
      filter: {
        all: "Hamısı",
      },
      noProducts: "Bu kateqoriyada məhsul tapılmadı.",
      loading: "Yüklənir...",
    },
    ar: {
      title: "منتجاتنا",
      subtitle: "في خدمتكم مع مجموعة منتجاتنا الواسعة",
      filter: {
        all: "الكل",
      },
      noProducts: "لم يتم العثور على منتجات في هذه الفئة.",
      loading: "جاري التحميل...",
    },
  };

  const content = t[locale as keyof typeof t] || t.tr;

  // Helper function to get localized product name
  const getProductName = (product: Product) => {
    if (locale === "tr") return product.nameTr;
    if (locale === "en") return product.nameEn;
    if (locale === "ru") return product.nameRu || product.nameEn || product.nameTr;
    if (locale === "fa") return product.nameFa || product.nameEn || product.nameTr;
    if (locale === "az") return product.nameAz || product.nameTr || product.nameEn;
    if (locale === "ar") return product.nameAr || product.nameEn || product.nameTr;
    return product.nameEn || product.nameTr;
  };

  // Helper function to get localized product description
  const getProductDescription = (product: Product) => {
    if (locale === "tr") return product.descriptionTr || "";
    if (locale === "en") return product.descriptionEn || "";
    if (locale === "ru") return product.descriptionRu || product.descriptionEn || product.descriptionTr || "";
    if (locale === "fa") return product.descriptionFa || product.descriptionEn || product.descriptionTr || "";
    if (locale === "az") return product.descriptionAz || product.descriptionTr || product.descriptionEn || "";
    if (locale === "ar") return product.descriptionAr || product.descriptionEn || product.descriptionTr || "";
    return product.descriptionEn || product.descriptionTr || "";
  };

  const filteredProducts =
    activeFilter === "all"
      ? products
      : products.filter((product) => {
          if (activeFilter === "all") return true;
          const category = categories.find((cat) => cat.slug === activeFilter);
          return category && product.categoryId === category.id;
        });

  const filters = [
    { id: "all", label: content.filter.all },
    ...categories.map((cat) => ({
      id: cat.slug,
      label: locale === "tr" ? cat.nameTr : cat.nameEn,
    })),
  ];

  if (loading) {
    return (
      <div className="min-h-screen py-16">
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <p className="text-text-light text-lg">{content.loading}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-text-dark mb-4">
            {content.title}
          </h1>
          <p className="text-lg text-text-light">{content.subtitle}</p>
        </div>

        {/* Filters */}
        {categories.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="w-5 h-5 text-text-light" />
              <span className="text-sm font-semibold text-text-dark">
                {locale === "tr" ? "Filtrele:" : locale === "en" ? "Filter:" : locale === "ru" ? "Фильтр:" : locale === "fa" ? "فیلتر:" : locale === "az" ? "Filtrlə:" : "تصفية:"}
              </span>
            </div>
            <div className="flex flex-wrap gap-3">
              {filters.map((filter) => (
                <Button
                  key={filter.id}
                  variant={activeFilter === filter.id ? "primary" : "outline"}
                  size="md"
                  onClick={() => setActiveFilter(filter.id)}
                >
                  {filter.label}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={getProductName(product)}
              description={getProductDescription(product)}
              imageUrl={product.imageUrl || undefined}
              isFeatured={product.isFeatured}
              locale={locale}
              slug={product.slug}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-text-light text-lg">{content.noProducts}</p>
          </div>
        )}
      </div>
    </div>
  );
}
