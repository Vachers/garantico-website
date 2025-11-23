"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Package, ArrowRight, Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface ProductCardProps {
  id: number;
  name: string;
  description?: string;
  imageUrl?: string;
  isFeatured?: boolean;
  locale?: string;
  slug?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  description,
  imageUrl,
  isFeatured = false,
  locale = "tr",
  slug,
}) => {
  const t = {
    tr: {
      getQuote: "Teklif Al",
      learnMore: "Detaylar",
      featured: "Öne Çıkan",
    },
    en: {
      getQuote: "Get Quote",
      learnMore: "Learn More",
      featured: "Featured",
    },
    ru: {
      getQuote: "Получить предложение",
      learnMore: "Подробнее",
      featured: "Рекомендуемое",
    },
    fa: {
      getQuote: "دریافت قیمت",
      learnMore: "بیشتر بدانید",
      featured: "ویژه",
    },
    az: {
      getQuote: "Təklif Al",
      learnMore: "Ətraflı",
      featured: "Seçilmiş",
    },
    ar: {
      getQuote: "احصل على عرض",
      learnMore: "المزيد",
      featured: "مميز",
    },
  };

  const content = t[locale as keyof typeof t] || t.tr;

  return (
    <Card
      hover
      className={`group transition-all duration-300 ${
        isFeatured ? "ring-2 ring-primary-ocean shadow-lg" : "hover:shadow-md"
      }`}
    >
      {/* Image Section */}
      <div className="relative w-full h-56 bg-gradient-to-br from-primary-light/20 to-primary-ocean/10 overflow-hidden rounded-t-lg">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Package className="w-16 h-16 text-primary-ocean/30" />
          </div>
        )}
        {isFeatured && (
          <div className="absolute top-3 right-3 bg-primary-ocean text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-lg">
            <Star className="w-3 h-3 fill-current" />
            {content.featured}
          </div>
        )}
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content Section */}
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-bold text-text-dark group-hover:text-primary-ocean transition-colors">
          {name}
        </CardTitle>
      </CardHeader>

      {description && (
        <CardContent className="pt-0 pb-4">
          <p className="text-text-light text-sm line-clamp-3 leading-relaxed">
            {description}
          </p>
        </CardContent>
      )}

      {/* Actions */}
      <div className="p-6 pt-0 flex flex-col gap-3">
        {slug && (
          <Link href={`/${locale}/products/${slug}`} className="w-full">
            <Button variant="outline" size="md" className="w-full group/btn">
              {content.learnMore}
              <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </Link>
        )}
        <Button
          variant="primary"
          size="md"
          className="w-full"
          onClick={() => {
            window.location.href = `/${locale}/contact?product=${slug || id}`;
          }}
        >
          {content.getQuote}
        </Button>
      </div>
    </Card>
  );
};

