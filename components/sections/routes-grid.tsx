import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { getAllRoutes } from "@/lib/content";
import { SectionHeader } from "@/components/ui/section-header";
import { ArrowRight, Clock, MapPin } from "lucide-react";

export async function RoutesGrid() {
  const locale = await getLocale();
  const t = await getTranslations("sections");
  const tRoutes = await getTranslations("routes");
  const routes = getAllRoutes().slice(0, 4);

  return (
    <section className="py-20 bg-night">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow={t("popularJourneys")}
          title={t("mostRequestedRoutes")}
          dark
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {routes.map((route) => {
            const hours = Math.floor(route.durationMinutes / 60);
            const mins = route.durationMinutes % 60;

            return (
              <Link
                key={route.slug}
                href={`/${locale}/routes/${route.slug}`}
                className="group flex items-center gap-6 rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition-colors duration-300"
              >
                <div className="flex-1">
                  <h3 className="font-serif text-lg font-bold text-sand mb-3">
                    {tRoutes(`${route.slug}.name`)}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-white/50">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {route.distanceKm} km
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {hours}h{mins > 0 ? ` ${mins}m` : ""}
                    </span>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-gold shrink-0 transition-transform group-hover:translate-x-1" />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
