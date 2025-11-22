"use client";

import React from "react";
import { MessageCircle } from "lucide-react";

interface WhatsAppButtonProps {
  phoneNumber?: string;
  locale?: string;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+905551234567",
  locale = "tr",
}) => {
  const t = {
    tr: {
      message: "Merhaba, balık unu hakkında bilgi almak istiyorum.",
    },
    en: {
      message: "Hello, I would like to get information about fish meal.",
    },
  };

  const content = t[locale as keyof typeof t] || t.tr;
  const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(content.message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-success-green hover:bg-emerald-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center w-16 h-16 md:w-20 md:h-20"
      aria-label="WhatsApp ile iletişime geç"
    >
      <MessageCircle className="w-8 h-8 md:w-10 md:h-10" />
    </a>
  );
};

