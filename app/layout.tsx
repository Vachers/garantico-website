import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GarantiCo - Kaliteli Balık Unu ve Yem Hammaddeleri",
  description: "Avrupa kalitesinde balık unu ve yem hammaddeleri tedarikçisi.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

