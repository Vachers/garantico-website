"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Fish, Award, Package, CheckCircle } from "lucide-react";

interface ProductSpotlightProps {
  locale?: string;
}

export const ProductSpotlight: React.FC<ProductSpotlightProps> = ({ locale = "tr" }) => {
  const t = {
    tr: {
      title: "Balık Unu",
      subtitle: "Premium Kalite",
      description: "Avrupa kalitesinde, %65+ protein oranına sahip premium balık unu. HACCP sertifikalı, balık ve kümes hayvanları yemi üretimi için ideal.",
      specs: {
        title: "Teknik Özellikler",
        protein: "Protein: Min %65",
        ash: "Ham kül: Max %15",
        moisture: "Nem: Max %10",
        salt: "Tuz: Max %4",
      },
      packaging: {
        title: "Ambalaj Seçenekleri",
        options: ["25kg çuval", "50kg çuval", "1000kg big bag"],
      },
      certificates: ["HACCP", "EU Onaylı", "ISO 22000"],
      cta: "Hemen Teklif Al",
    },
    en: {
      title: "Fish Meal",
      subtitle: "Premium Quality",
      description: "European quality fish meal with 65%+ protein content. HACCP certified, ideal for fish and poultry feed production.",
      specs: {
        title: "Technical Specifications",
        protein: "Protein: Min 65%",
        ash: "Ash: Max 15%",
        moisture: "Moisture: Max 10%",
        salt: "Salt: Max 4%",
      },
      packaging: {
        title: "Packaging Options",
        options: ["25kg bag", "50kg bag", "1000kg big bag"],
      },
      certificates: ["HACCP", "EU Approved", "ISO 22000"],
      cta: "Get Quote Now",
    },
  };

  const content = t[locale as keyof typeof t] || t.tr;

  return (
    <div className="bg-gradient-to-br from-primary-blue to-primary-ocean text-white rounded-2xl p-8 md:p-12 mb-12">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Fish className="w-8 h-8" />
            <span className="text-primary-light text-sm font-semibold uppercase tracking-wide">
              {content.subtitle}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{content.title}</h2>
          <p className="text-lg text-primary-light mb-6">{content.description}</p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-5 h-5" />
                <span className="font-semibold">{content.specs.protein}</span>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5" />
                <span className="font-semibold">{content.certificates[0]}</span>
              </div>
            </div>
          </div>

          <Button
            variant="secondary"
            size="lg"
            className="w-full md:w-auto"
            onClick={() => {
              const contactSection = document.getElementById("contact");
              contactSection?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            {content.cta}
          </Button>
        </div>

        <Card className="bg-white/95 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-text-dark">{content.specs.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-text-light">{content.specs.protein.split(":")[0]}</span>
              <span className="font-semibold text-text-dark">{content.specs.protein.split(":")[1]}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-text-light">{content.specs.ash.split(":")[0]}</span>
              <span className="font-semibold text-text-dark">{content.specs.ash.split(":")[1]}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-text-light">{content.specs.moisture.split(":")[0]}</span>
              <span className="font-semibold text-text-dark">{content.specs.moisture.split(":")[1]}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-text-light">{content.specs.salt.split(":")[0]}</span>
              <span className="font-semibold text-text-dark">{content.specs.salt.split(":")[1]}</span>
            </div>

            <div className="mt-6 pt-6 border-t">
              <div className="flex items-center gap-2 mb-3">
                <Package className="w-5 h-5 text-primary-ocean" />
                <span className="font-semibold text-text-dark">{content.packaging.title}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {content.packaging.options.map((option, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-primary-light/20 text-primary-ocean rounded-full text-sm font-medium"
                  >
                    {option}
                  </span>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

