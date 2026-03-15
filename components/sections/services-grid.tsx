import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { SectionHeader } from "@/components/ui/section-header";
import {
  Plane,
  Route,
  CalendarCheck,
  Clock,
  Map,
  Crown,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Plane,
  Route,
  CalendarCheck,
  Clock,
  Map,
  Crown,
};

const services = [
  { slug: "airport-transfers", icon: "Plane" },
  { slug: "city-to-city-transfers", icon: "Route" },
  { slug: "event-transportation", icon: "CalendarCheck" },
  { slug: "hourly-chauffeur", icon: "Clock" },
  { slug: "multi-day-tours", icon: "Map" },
  { slug: "vip-concierge", icon: "Crown" },
] as const;

export async function ServicesGrid() {
  const locale = await getLocale();
  const t = await getTranslations("sections");
  const tServices = await getTranslations("services");

  return (
    <section className="py-20 bg-sand">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow={t("tailoredToYou")}
          title={t("ourServices")}
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ slug, icon }) => {
            const Icon = iconMap[icon];
            return (
              <Link
                key={slug}
                href={`/${locale}/services/${slug}`}
                className="group rounded-2xl bg-white p-8 shadow-sm hover:shadow-lg transition-shadow duration-300"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10">
                  <Icon className="h-6 w-6 text-gold" />
                </div>
                <h3 className="font-serif text-lg font-bold text-night mb-2">
                  {tServices(`${slug}.name`)}
                </h3>
                <p className="text-sm text-body leading-relaxed">
                  {tServices(`${slug}.shortDescription`)}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
