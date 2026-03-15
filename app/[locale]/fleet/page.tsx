import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { getAllVehicles } from "@/lib/content";
import { SectionHeader } from "@/components/ui/section-header";
import { CTASection } from "@/components/sections/cta-section";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  return {
    title: t("nav.fleet"),
  };
}

export default async function FleetPage() {
  const locale = await getLocale();
  const t = await getTranslations();
  const vehicles = getAllVehicles();

  return (
    <>
      <section className="bg-night py-20 text-center">
        <p className="text-gold text-xs tracking-[0.3em] mb-4">
          {t("sections.travelInStyle")}
        </p>
        <h1 className="text-sand font-serif text-4xl md:text-5xl font-light">
          {t("sections.ourFleet")}
        </h1>
      </section>

      <section className="bg-sand py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {vehicles.map((v) => (
              <Link
                key={v.slug}
                href={`/${locale}/fleet/${v.slug}`}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative h-44 bg-night">
                  <Image
                    src={v.heroImage}
                    alt={t(`fleet.${v.slug}.name`)}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <h2 className="text-night font-serif text-lg">
                    {t(`fleet.${v.slug}.name`)}
                  </h2>
                  <p className="text-muted text-xs mt-1">
                    {t(`fleet.${v.slug}.class`)} · {v.capacity} passengers
                  </p>
                  <p className="text-gold text-xs tracking-widest mt-3">
                    {t("sections.viewDetails")} →
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
