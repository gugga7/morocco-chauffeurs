import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { locales } from "@/i18n/config";
import { getRoute, getAllRoutes, getAllVehicles } from "@/lib/content";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { BookingPlaceholder } from "@/components/ui/booking-placeholder";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { CTASection } from "@/components/sections/cta-section";
import { SectionHeader } from "@/components/ui/section-header";
import { StructuredData } from "@/components/seo/structured-data";
import { touristTripSchema } from "@/lib/seo";
import {
  MapPin,
  Clock,
  ArrowRight,
  Star,
  Navigation,
} from "lucide-react";

export function generateStaticParams() {
  const routes = getAllRoutes();
  return locales.flatMap((locale) =>
    routes.map((r) => ({ locale, route: r.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; route: string }>;
}): Promise<Metadata> {
  const { route: slug } = await params;
  try {
    getRoute(slug);
  } catch {
    return {};
  }
  const t = await getTranslations("routes");
  return {
    title: t(`${slug}.meta.title`),
    description: t(`${slug}.meta.description`),
  };
}

export default async function RoutePage({
  params,
}: {
  params: Promise<{ locale: string; route: string }>;
}) {
  const { route: slug } = await params;
  const locale = await getLocale();
  const t = await getTranslations("routePage");
  const tRoutes = await getTranslations("routes");
  const tCities = await getTranslations("cities");
  const tFleet = await getTranslations("fleet");
  const tNav = await getTranslations("nav");

  let route;
  try {
    route = getRoute(slug);
  } catch {
    notFound();
  }

  const routeName = tRoutes(`${slug}.name`);
  const originName = tCities(`${route.origin}.name`);
  const destName = tCities(`${route.destination}.name`);

  const hours = Math.floor(route.durationMinutes / 60);
  const mins = route.durationMinutes % 60;

  // Get FAQ items
  const faqItems = route.faqKeys.map((key) => ({
    question: tRoutes(`${slug}.faq.${key}.question`),
    answer: tRoutes(`${slug}.faq.${key}.answer`),
  }));

  // Get highlights
  const highlights = route.highlights.map((key) => ({
    key,
    description: tRoutes(`${slug}.highlights.${key}`),
  }));

  // Get suggested stops
  const stops = route.suggestedStops.map((key) => ({
    key,
    name: tRoutes(`${slug}.suggestedStops.${key}`),
  }));

  // Get recommended vehicles
  const allVehicles = getAllVehicles();
  const recVehicles = allVehicles.filter((v) =>
    route.recommendedVehicles.includes(v.slug)
  );

  // Get related routes (sharing origin or destination)
  const allRoutes = getAllRoutes();
  const relatedRoutes = allRoutes.filter(
    (r) =>
      r.slug !== slug &&
      (r.origin === route.origin ||
        r.destination === route.destination ||
        r.origin === route.destination ||
        r.destination === route.origin)
  );

  const routeDescription = tRoutes(`${slug}.description`);

  return (
    <>
      <StructuredData data={touristTripSchema(originName, destName, routeDescription)} />
      {/* Hero */}
      <section className="relative flex min-h-[50vh] items-end overflow-hidden bg-night pb-12">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-gold" />
          <div className="absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-gold" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            locale={locale}
            items={[
              { label: tNav("home"), href: "" },
              { label: "Routes", href: "/routes" },
              { label: routeName },
            ]}
          />
          <h1 className="mt-4 font-serif text-4xl font-bold text-white sm:text-5xl md:text-6xl">
            {t("heroTitle", { origin: originName, destination: destName })}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80 leading-relaxed">
            {routeDescription}
          </p>
        </div>
      </section>

      {/* Route Details */}
      <section className="py-12 bg-sand">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6">
            <div className="rounded-2xl bg-white p-6 shadow-sm text-center">
              <MapPin className="mx-auto mb-2 h-6 w-6 text-gold" />
              <p className="text-xs font-semibold tracking-[0.15em] uppercase text-gold mb-1">
                {t("distance")}
              </p>
              <p className="text-2xl font-bold text-night">
                {t("km", { count: String(route.distanceKm) })}
              </p>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-sm text-center">
              <Clock className="mx-auto mb-2 h-6 w-6 text-gold" />
              <p className="text-xs font-semibold tracking-[0.15em] uppercase text-gold mb-1">
                {t("duration")}
              </p>
              <p className="text-2xl font-bold text-night">
                {t("hours", { hours: String(hours), minutes: String(mins) })}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Booking */}
      <div className="bg-white py-12 px-4">
        <BookingPlaceholder />
      </div>

      {/* Highlights */}
      <section className="py-20 bg-sand">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow={t("highlights")}
            title={t("routeHighlights")}
          />
          <div className="space-y-6">
            {highlights.map((h, i) => (
              <div key={h.key} className="flex gap-4 rounded-2xl bg-white p-6 shadow-sm">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/10">
                  <Star className="h-5 w-5 text-gold" />
                </div>
                <p className="text-sm text-body leading-relaxed">
                  {h.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Suggested Stops */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow={t("suggestedStops")}
            title={t("suggestedStopsTitle")}
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {stops.map((stop) => (
              <div
                key={stop.key}
                className="flex items-center gap-3 rounded-xl bg-sand p-5"
              >
                <Navigation className="h-5 w-5 text-gold shrink-0" />
                <span className="font-serif text-sm font-bold text-night">
                  {stop.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recommended Vehicles */}
      <section className="py-20 bg-sand">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow={t("recommendedVehicles")}
            title={t("recommendedVehiclesTitle")}
          />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {recVehicles.map((vehicle) => (
              <Link
                key={vehicle.slug}
                href={`/${locale}/fleet/${vehicle.slug}`}
                className="group overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={vehicle.heroImage}
                    alt={tFleet(`${vehicle.slug}.name`)}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-base font-bold text-night">
                    {tFleet(`${vehicle.slug}.name`)}
                  </h3>
                  <p className="mt-1 text-xs text-muted">
                    {vehicle.capacity} pax
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Related Routes */}
      {relatedRoutes.length > 0 && (
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeader
              eyebrow={t("relatedRoutes")}
              title={t("relatedRoutesTitle")}
            />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {relatedRoutes.map((r) => {
                const rHours = Math.floor(r.durationMinutes / 60);
                const rMins = r.durationMinutes % 60;
                return (
                  <Link
                    key={r.slug}
                    href={`/${locale}/routes/${r.slug}`}
                    className="group flex items-center gap-6 rounded-2xl bg-sand p-6 hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="flex-1">
                      <h3 className="font-serif text-lg font-bold text-night mb-2">
                        {tRoutes(`${r.slug}.name`)}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-muted">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5" />
                          {r.distanceKm} km
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {rHours}h{rMins > 0 ? ` ${rMins}m` : ""}
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
      )}

      {/* FAQ */}
      <FaqAccordion
        eyebrow={t("frequentlyAsked")}
        title={t("faqTitle", { origin: originName, destination: destName })}
        items={faqItems}
      />

      {/* CTA */}
      <CTASection />
    </>
  );
}
