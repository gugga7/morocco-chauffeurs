import Link from "next/link";
import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { getAllRoutes } from "@/lib/content";
import { SectionHeader } from "@/components/ui/section-header";
import { CTASection } from "@/components/sections/cta-section";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  return {
    title: t("sections.mostRequestedRoutes"),
  };
}

export default async function RoutesPage() {
  const locale = await getLocale();
  const t = await getTranslations();
  const routes = getAllRoutes();

  return (
    <>
      <section className="bg-night py-20 text-center">
        <p className="text-gold text-xs tracking-[0.3em] mb-4">
          {t("sections.popularJourneys")}
        </p>
        <h1 className="text-sand font-serif text-4xl md:text-5xl font-light">
          {t("sections.mostRequestedRoutes")}
        </h1>
      </section>

      <section className="bg-sand py-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {routes.map((route) => {
              const hours = Math.floor(route.durationMinutes / 60);
              const mins = route.durationMinutes % 60;
              const duration =
                mins > 0 ? `${hours}h ${mins}min` : `${hours}h`;

              return (
                <Link
                  key={route.slug}
                  href={`/${locale}/routes/${route.slug}`}
                  className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow flex justify-between items-center"
                >
                  <div>
                    <h2 className="text-night font-serif text-base">
                      {t(`routes.${route.slug}.name`)}
                    </h2>
                    <p className="text-muted text-xs mt-1">
                      {duration} · {route.distanceKm} km
                    </p>
                  </div>
                  <span className="text-gold text-xs tracking-widest">
                    {t("sections.book")} →
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
