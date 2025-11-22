"use client";

import { useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/Button";
import { Filter } from "lucide-react";
import { i18nConfig } from "@/lib/i18n/config";

// Note: generateStaticParams doesn't work with "use client" components
// This page will be dynamically rendered
export default function ProductsPage({ params }: { params: { locale: string } }) {
  const locale = params.locale || "tr";
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const t = {
    tr: {
      title: "Ürünlerimiz",
      subtitle: "Geniş ürün yelpazemizle hizmetinizdeyiz",
      filter: {
        all: "Tümü",
        protein: "Protein Kaynakları",
        plant: "Bitkisel Hammaddeler",
        oils: "Yağlar",
        additives: "Katkılar",
      },
    },
    en: {
      title: "Our Products",
      subtitle: "At your service with our wide product range",
      filter: {
        all: "All",
        protein: "Protein Sources",
        plant: "Plant-based Raw Materials",
        oils: "Oils",
        additives: "Additives",
      },
    },
  };

  const content = t[locale as keyof typeof t] || t.tr;

  // Sample products data - in real app, this would come from database
  const allProducts = [
    {
      id: 1,
      name: locale === "tr" ? "Balık Unu" : "Fish Meal",
      description:
        locale === "tr"
          ? "Premium kalite balık unu, %65+ protein"
          : "Premium quality fish meal, 65%+ protein",
      category: "protein",
      isFeatured: true,
      slug: "balik-unu",
    },
    {
      id: 2,
      name: locale === "tr" ? "Tavuk Unu" : "Chicken Meal",
      description:
        locale === "tr"
          ? "Yüksek protein içerikli tavuk unu"
          : "High protein chicken meal",
      category: "protein",
      slug: "tavuk-unu",
    },
    {
      id: 3,
      name: locale === "tr" ? "Kan Unu" : "Blood Meal",
      description:
        locale === "tr"
          ? "Yüksek protein kaynağı"
          : "High protein source",
      category: "protein",
      slug: "kan-unu",
    },
    {
      id: 4,
      name: locale === "tr" ? "SPC (Soya Protein Konsantresi)" : "SPC (Soy Protein Concentrate)",
      description:
        locale === "tr"
          ? "Soya protein konsantresi"
          : "Soy protein concentrate",
      category: "protein",
      slug: "spc",
    },
    {
      id: 5,
      name: locale === "tr" ? "Soya Küspesi" : "Soybean Meal",
      description:
        locale === "tr"
          ? "Bitkisel protein kaynağı"
          : "Plant-based protein source",
      category: "plant",
      slug: "soya-kuspesi",
    },
    {
      id: 6,
      name: locale === "tr" ? "Soya" : "Soybean",
      description:
        locale === "tr"
          ? "Ham soya"
          : "Raw soybean",
      category: "plant",
      slug: "soya",
    },
    {
      id: 7,
      name: locale === "tr" ? "Buğday Gluteni" : "Wheat Gluten",
      description:
        locale === "tr"
          ? "Buğday protein konsantresi"
          : "Wheat protein concentrate",
      category: "plant",
      slug: "bugday-gluteni",
    },
    {
      id: 8,
      name: locale === "tr" ? "Balık Yağı" : "Fish Oil",
      description:
        locale === "tr"
          ? "Omega-3 açısından zengin balık yağı"
          : "Omega-3 rich fish oil",
      category: "oils",
      slug: "balik-yagi",
    },
    {
      id: 9,
      name: locale === "tr" ? "Tavuk Yağı" : "Chicken Oil",
      description:
        locale === "tr"
          ? "Yüksek enerji içerikli tavuk yağı"
          : "High energy chicken oil",
      category: "oils",
      slug: "tavuk-yagi",
    },
    {
      id: 10,
      name: locale === "tr" ? "Vitamin ve Mineral Katkıları" : "Vitamin and Mineral Additives",
      description:
        locale === "tr"
          ? "Yem katkı maddeleri"
          : "Feed additives",
      category: "additives",
      slug: "vitamin-mineral",
    },
  ];

  const filteredProducts =
    activeFilter === "all"
      ? allProducts
      : allProducts.filter((product) => product.category === activeFilter);

  const filters = [
    { id: "all", label: content.filter.all },
    { id: "protein", label: content.filter.protein },
    { id: "plant", label: content.filter.plant },
    { id: "oils", label: content.filter.oils },
    { id: "additives", label: content.filter.additives },
  ];

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
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-text-light" />
            <span className="text-sm font-semibold text-text-dark">
              {locale === "tr" ? "Filtrele:" : "Filter:"}
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

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              description={product.description}
              isFeatured={product.isFeatured}
              locale={locale}
              slug={product.slug}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-text-light text-lg">
              {locale === "tr"
                ? "Bu kategoride ürün bulunamadı."
                : "No products found in this category."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

