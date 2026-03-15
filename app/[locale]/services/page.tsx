import Link from "next/link";
import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { getAllServices } from "@/lib/content";
import { Plane, Clock, Route, Mountain, PartyPopper, Crown } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { CTASection } from "@/components/sections/cta-section";

const serviceIcons: Record<string, React.ElementType> = {
  "airport-transfers": Plane,
  "hourly-chauffeur": Clock,
  "city-to-city-transfers": Route,
  "multi-day-tours": Mountain,
  "event-transportation": PartyPopper,
  "vip-concierge": Crown,
};

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  return {
    title: t("nav.services"),
  };
}

export default async function ServicesPage() {
  const locale = await getLocale();
  const t = await getTranslations();
  const services = getAllServices();

  return (
    <>
      <section className="bg-night py-20 text-center">
        <p className="text-gold text-xs tracking-[0.3em] mb-4">
          {t("sections.tailoredToYou")}
        </p>
        <h1 className="text-sand font-serif text-4xl md:text-5xl font-light">
          {t("sections.ourServices")}
        </h1>
      </section>

      <section className="bg-sand py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((svc) => {
              const Icon = serviceIcons[svc.slug] || Plane;
              return (
                <Link
                  key={svc.slug}
                  href={`/${locale}/services/${svc.slug}`}
                  className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow group"
                >
                  <Icon className="text-gold mb-4" size={32} />
                  <h2 className="text-night font-serif text-xl mb-2">
                    {t(`services.${svc.slug}.name`)}
                  </h2>
                  <p className="text-body text-sm leading-relaxed mb-4">
                    {t(`services.${svc.slug}.shortDescription`)}
                  </p>
                  <span className="text-gold text-xs tracking-widest">
                    {t("sections.viewDetails")} →
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
