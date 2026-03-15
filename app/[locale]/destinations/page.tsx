import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { getAllCities } from "@/lib/content";
import { SectionHeader } from "@/components/ui/section-header";
import { CTASection } from "@/components/sections/cta-section";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  return {
    title: t("nav.destinations"),
  };
}

export default async function DestinationsPage() {
  const locale = await getLocale();
  const t = await getTranslations();
  const cities = getAllCities();

  const tierLabels: Record<number, string> = {
    1: "Major Cities",
    2: "Popular Destinations",
    3: "Hidden Gems",
  };

  return (
    <>
      <section className="bg-night py-20 text-center">
        <p className="text-gold text-xs tracking-[0.3em] mb-4">
          {t("sections.exploreMorocco")}
        </p>
        <h1 className="text-sand font-serif text-4xl md:text-5xl font-light">
          {t("sections.ourDestinations")}
        </h1>
      </section>

      {[1, 2, 3].map((tier) => {
        const tierCities = cities.filter((c) => c.tier === tier);
        return (
          <section
            key={tier}
            className={tier % 2 === 1 ? "bg-sand py-12" : "bg-white py-12"}
          >
            <div className="max-w-6xl mx-auto px-6">
              <SectionHeader
                eyebrow={`TIER ${tier}`}
                title={tierLabels[tier]}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {tierCities.map((city) => (
                  <Link
                    key={city.slug}
                    href={`/${locale}/destinations/${city.slug}`}
                    className="group relative h-52 rounded-lg overflow-hidden"
                  >
                    <Image
                      src={city.heroImage}
                      alt={t(`cities.${city.slug}.name`)}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-4 left-4 z-10">
                      <h3 className="text-sand font-serif text-lg">
                        {t(`cities.${city.slug}.name`)}
                      </h3>
                      <p className="text-gold text-[10px] tracking-widest mt-1">
                        {t(`cities.${city.slug}.tagline`)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <CTASection />
    </>
  );
}
