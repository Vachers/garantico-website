"use client";

import React from "react";
import { Award, Shield, CheckCircle, FileCheck } from "lucide-react";
import { Card } from "@/components/ui/Card";

interface QualityCertificatesProps {
  locale?: string;
}

export const QualityCertificates: React.FC<QualityCertificatesProps> = ({
  locale = "tr",
}) => {
  const t = {
    tr: {
      title: "Kalite Belgeleri ve Sertifikalar",
      subtitle: "Sertifikalı kalite güvencesi ile hizmetinizdeyiz",
      certificates: [
        {
          name: "HACCP",
          description: "Gıda Güvenliği Yönetim Sistemi",
          icon: Shield,
        },
        {
          name: "ISO 22000",
          description: "Gıda Güvenliği Yönetim Sistemi",
          icon: FileCheck,
        },
        {
          name: "EU Onaylı",
          description: "Avrupa Birliği Standartları",
          icon: CheckCircle,
        },
        {
          name: "Kalite Güvencesi",
          description: "Sürekli kalite kontrolü",
          icon: Award,
        },
      ],
    },
    en: {
      title: "Quality Certificates and Certifications",
      subtitle: "At your service with certified quality assurance",
      certificates: [
        {
          name: "HACCP",
          description: "Food Safety Management System",
          icon: Shield,
        },
        {
          name: "ISO 22000",
          description: "Food Safety Management System",
          icon: FileCheck,
        },
        {
          name: "EU Approved",
          description: "European Union Standards",
          icon: CheckCircle,
        },
        {
          name: "Quality Assurance",
          description: "Continuous quality control",
          icon: Award,
        },
      ],
    },
  };

  const content = t[locale as keyof typeof t] || t.tr;

  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-text-dark mb-4">
            {content.title}
          </h2>
          <p className="text-lg text-text-light">{content.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {content.certificates.map((cert, index) => {
            const Icon = cert.icon;
            return (
              <Card key={index} hover className="text-center">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-primary-ocean/10 rounded-full flex items-center justify-center mb-4">
                    <Icon className="w-8 h-8 text-primary-ocean" />
                  </div>
                  <h3 className="text-xl font-bold text-text-dark mb-2">
                    {cert.name}
                  </h3>
                  <p className="text-sm text-text-light">{cert.description}</p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

