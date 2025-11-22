import { MetadataRoute } from "next";
import { i18nConfig } from "@/lib/i18n/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://garantico.com";

  const routes = [
    "",
    "/about",
    "/products",
    "/contact",
    "/products/balik-unu",
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  i18nConfig.locales.forEach((locale) => {
    routes.forEach((route) => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === "" ? "daily" : "weekly",
        priority: route === "" ? 1 : route === "/products/balik-unu" ? 0.9 : 0.8,
      });
    });
  });

  return sitemapEntries;
}

