import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { getAllCities, getAllServices, getAllVehicles, getAllRoutes } from "@/lib/content";

const BASE_URL = "https://moroccochauffeurs.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const cities = getAllCities();
  const services = getAllServices();
  const vehicles = getAllVehicles();
  const routes = getAllRoutes();

  const entries: MetadataRoute.Sitemap = [];

  // Homepage for each locale
  for (const locale of locales) {
    entries.push({
      url: `${BASE_URL}/${locale}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    });
  }

  // Static pages
  const staticPages = [
    { path: "about", priority: 0.6 },
    { path: "contact", priority: 0.7 },
    { path: "faq", priority: 0.6 },
    { path: "blog", priority: 0.5 },
    { path: "reservation", priority: 0.9 },
    { path: "terms", priority: 0.3 },
    { path: "privacy", priority: 0.3 },
  ];

  for (const locale of locales) {
    for (const page of staticPages) {
      entries.push({
        url: `${BASE_URL}/${locale}/${page.path}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: page.priority,
      });
    }
  }

  // City pages — priority by tier
  for (const locale of locales) {
    for (const city of cities) {
      const priority = city.tier === 1 ? 0.9 : city.tier === 2 ? 0.8 : 0.7;
      entries.push({
        url: `${BASE_URL}/${locale}/destinations/${city.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority,
      });
    }
  }

  // Service pages
  for (const locale of locales) {
    for (const service of services) {
      entries.push({
        url: `${BASE_URL}/${locale}/services/${service.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }
  }

  // Fleet pages
  for (const locale of locales) {
    for (const vehicle of vehicles) {
      entries.push({
        url: `${BASE_URL}/${locale}/fleet/${vehicle.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  // Route pages
  for (const locale of locales) {
    for (const route of routes) {
      entries.push({
        url: `${BASE_URL}/${locale}/routes/${route.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }
  }

  return entries;
}
