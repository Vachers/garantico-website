"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Send, Loader2 } from "lucide-react";

interface ProductInquiryFormProps {
  defaultProductId?: number;
  locale?: string;
}

export const ProductInquiryForm: React.FC<ProductInquiryFormProps> = ({
  defaultProductId,
  locale = "tr",
}) => {
  const [formData, setFormData] = useState({
    productId: defaultProductId || 1,
    customerName: "",
    email: "",
    phone: "",
    company: "",
    quantity: "",
    deliveryLocation: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const t = {
    tr: {
      title: "Teklif Formu",
      subtitle: "Size özel fiyat teklifi için formu doldurun",
      fields: {
        name: "Ad Soyad *",
        email: "E-posta *",
        phone: "Telefon",
        company: "Şirket",
        product: "Ürün",
        quantity: "İhtiyaç Miktarı",
        delivery: "Teslimat Lokasyonu",
        message: "Mesajınız",
      },
      submit: "Gönder",
      submitting: "Gönderiliyor...",
      success: "Form başarıyla gönderildi! En kısa sürede size dönüş yapacağız.",
      error: "Bir hata oluştu. Lütfen tekrar deneyin.",
    },
    en: {
      title: "Quote Form",
      subtitle: "Fill out the form for a custom price quote",
      fields: {
        name: "Full Name *",
        email: "Email *",
        phone: "Phone",
        company: "Company",
        product: "Product",
        quantity: "Required Quantity",
        delivery: "Delivery Location",
        message: "Your Message",
      },
      submit: "Submit",
      submitting: "Submitting...",
      success: "Form submitted successfully! We will get back to you soon.",
      error: "An error occurred. Please try again.",
    },
  };

  const content = t[locale as keyof typeof t] || t.tr;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          language: locale,
        }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          productId: defaultProductId || 1,
          customerName: "",
          email: "",
          phone: "",
          company: "",
          quantity: "",
          deliveryLocation: "",
          message: "",
        });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{content.title}</CardTitle>
        <p className="text-sm text-text-light mt-2">{content.subtitle}</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              name="customerName"
              label={content.fields.name}
              value={formData.customerName}
              onChange={handleChange}
              required
            />
            <Input
              name="email"
              type="email"
              label={content.fields.email}
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              name="phone"
              type="tel"
              label={content.fields.phone}
              value={formData.phone}
              onChange={handleChange}
            />
            <Input
              name="company"
              label={content.fields.company}
              value={formData.company}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              name="quantity"
              label={content.fields.quantity}
              value={formData.quantity}
              onChange={handleChange}
              placeholder={locale === "tr" ? "Örn: 10 ton" : "e.g.: 10 tons"}
            />
            <Input
              name="deliveryLocation"
              label={content.fields.delivery}
              value={formData.deliveryLocation}
              onChange={handleChange}
            />
          </div>

          <Textarea
            name="message"
            label={content.fields.message}
            value={formData.message}
            onChange={handleChange}
            rows={4}
          />

          {submitStatus === "success" && (
            <div className="p-4 bg-success-green/10 border border-success-green rounded-lg text-success-green">
              {content.success}
            </div>
          )}

          {submitStatus === "error" && (
            <div className="p-4 bg-red-50 border border-red-500 rounded-lg text-red-500">
              {content.error}
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                {content.submitting}
              </>
            ) : (
              <>
                <Send className="w-5 h-5 mr-2" />
                {content.submit}
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

