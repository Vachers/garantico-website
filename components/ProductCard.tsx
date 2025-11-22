"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Package, ArrowRight } from "lucide-react";
import Link from "next/link";

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
    },
    en: {
      getQuote: "Get Quote",
      learnMore: "Learn More",
    },
  };

  const content = t[locale as keyof typeof t] || t.tr;

  return (
    <Card hover className={isFeatured ? "ring-2 ring-primary-ocean" : ""}>
      {imageUrl && (
        <div className="w-full h-48 bg-gray-200 rounded-t-lg mb-4 overflow-hidden">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <Package className="w-5 h-5 text-primary-ocean" />
          {isFeatured && (
            <span className="px-2 py-1 bg-primary-ocean text-white text-xs font-semibold rounded">
              Öne Çıkan
            </span>
          )}
        </div>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      {description && (
        <CardContent>
          <p className="text-text-light text-sm line-clamp-3">{description}</p>
        </CardContent>
      )}
      <div className="p-6 pt-0 flex flex-col sm:flex-row gap-3">
        {slug && (
          <Link href={`/${locale}/products/${slug}`} className="flex-1">
            <Button variant="outline" size="md" className="w-full">
              {content.learnMore}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        )}
        <Button
          variant="primary"
          size="md"
          className="flex-1"
          onClick={() => {
            const contactSection = document.getElementById("contact");
            if (contactSection) {
              contactSection.scrollIntoView({ behavior: "smooth" });
            } else {
              window.location.href = `/${locale}/contact`;
            }
          }}
        >
          {content.getQuote}
        </Button>
      </div>
    </Card>
  );
};

