"use client";

import { ProductInquiryForm } from "@/components/ProductInquiryForm";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";

export default function ContactPage({ params }: { params: { locale: string } }) {
  const locale = params.locale || "tr";

  const t = {
    tr: {
      title: "İletişim",
      subtitle: "Bizimle iletişime geçin",
      form: {
        title: "Teklif Formu",
        subtitle: "Size özel fiyat teklifi için formu doldurun",
      },
      contact: {
        title: "İletişim Bilgileri",
        address: {
          title: "Adres",
          office: "Ofis Adresi",
          warehouse: "Depo Adresi",
        },
        phone: "Telefon",
        email: "E-posta",
        whatsapp: "WhatsApp'tan Hızlı Fiyat",
      },
      map: {
        title: "Konumumuz",
      },
    },
    en: {
      title: "Contact",
      subtitle: "Get in touch with us",
      form: {
        title: "Quote Form",
        subtitle: "Fill out the form for a custom price quote",
      },
      contact: {
        title: "Contact Information",
        address: {
          title: "Address",
          office: "Office Address",
          warehouse: "Warehouse Address",
        },
        phone: "Phone",
        email: "Email",
        whatsapp: "Quick Price via WhatsApp",
      },
      map: {
        title: "Our Location",
      },
    },
  };

  const content = t[locale as keyof typeof t] || t.tr;

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+905551234567";
  const whatsappMessage =
    locale === "tr"
      ? "Merhaba, balık unu hakkında bilgi almak istiyorum."
      : "Hello, I would like to get information about fish meal.";
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="min-h-screen py-16" id="contact">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-text-dark mb-4">
            {content.title}
          </h1>
          <p className="text-lg text-text-light">{content.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Contact Form */}
          <div>
            <ProductInquiryForm defaultProductId={1} locale={locale} />
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{content.contact.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-primary-ocean flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-text-dark mb-1">
                      {content.contact.address.office}
                    </h4>
                    <p className="text-text-light text-sm">
                      {locale === "tr"
                        ? "İstanbul, Türkiye"
                        : "Istanbul, Turkey"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-primary-ocean flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-text-dark mb-1">
                      {content.contact.address.warehouse}
                    </h4>
                    <p className="text-text-light text-sm">
                      {locale === "tr"
                        ? "İstanbul, Türkiye"
                        : "Istanbul, Turkey"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Phone className="w-6 h-6 text-primary-ocean flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-text-dark mb-1">
                      {content.contact.phone}
                    </h4>
                    <a
                      href="tel:+905551234567"
                      className="text-primary-ocean hover:text-primary-accent text-sm"
                    >
                      +90 555 123 45 67
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Mail className="w-6 h-6 text-primary-ocean flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-text-dark mb-1">
                      {content.contact.email}
                    </h4>
                    <a
                      href="mailto:info@garantico.com"
                      className="text-primary-ocean hover:text-primary-accent text-sm"
                    >
                      info@garantico.com
                    </a>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                    <Button variant="secondary" size="md" className="w-full">
                      <MessageCircle className="w-5 h-5 mr-2" />
                      {content.contact.whatsapp}
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Map Section */}
        <Card>
          <CardHeader>
            <CardTitle>{content.map.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full h-96 bg-gray-200 rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3011.424789123456!2d28.9784!3d41.0082!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDAwJzI5LjUiTiAyOMKwNTgnNDIuMiJF!5e0!3m2!1str!2str!4v1234567890123!5m2!1str!2str"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={content.map.title}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

