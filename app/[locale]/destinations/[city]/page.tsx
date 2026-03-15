import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { locales } from "@/i18n/config";
import { getCity, getAllCities, getAllServices, getAllVehicles, getAllRoutes } from "@/lib/content";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { BookingPlaceholder } from "@/components/ui/booking-placeholder";
import { CityIntro } from "@/components/sections/city-intro";
import { KeyLocations } from "@/components/sections/key-locations";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { CTASection } from "@/components/sections/cta-section";
import { SectionHeader } from "@/components/ui/section-header";
import {
  Plane,
  Route,
  CalendarCheck,
  Clock,
  Map,
  Crown,
  ArrowRight,
  MapPin,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const serviceIconMap: Record<string, LucideIcon> = {
  "airport-transfers": Plane,
  "city-to-city-transfers": Route,
  "event-transportation": CalendarCheck,
  "hourly-chauffeur": Clock,
  "multi-day-tours": Map,
  "vip-concierge": Crown,
};

export function generateStaticParams() {
  const cities = getAllCities();
  return locales.flatMap((locale) =>
    cities.map((city) => ({ locale, city: city.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; city: string }>;
}): Promise<Metadata> {
  const { city: slug } = await params;
  try {
    getCity(slug);
  } catch {
    return {};
  }
  const t = await getTranslations("cities");
  return {
    title: t(`${slug}.meta.title`),
    description: t(`${slug}.meta.description`),
  };
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ locale: string; city: string }>;
}) {
  const { city: slug } = await params;
  const locale = await getLocale();
  const t = await getTranslations("cityPage");
  const tCities = await getTranslations("cities");
  const tServices = await getTranslations("services");
  const tFleet = await getTranslations("fleet");
  const tRoutes = await getTranslations("routes");
  const tNav = await getTranslations("nav");

  let city;
  try {
    city = getCity(slug);
  } catch {
    notFound();
  }

  const cityName = tCities(`${slug}.name`);
  const cityTagline = tCities(`${slug}.tagline`);

  // Get landmarks
  const landmarkKeys = city.landmarks;
  const landmarks = landmarkKeys.map((key) => ({
    name: tCities(`${slug}.landmarks.${key}.name`),
    type: tCities(`${slug}.landmarks.${key}.type`),
  }));

  // Get FAQ items
  const faqItems = city.faqKeys.map((key) => ({
    question: tCities(`${slug}.faq.${key}.question`),
    answer: tCities(`${slug}.faq.${key}.answer`),
  }));

  // Get available routes
  const allRoutes = getAllRoutes();
  const cityRoutes = allRoutes.filter((r) => city.routesFrom.includes(r.slug));

  // Get available vehicles
  const allVehicles = getAllVehicles();
  const cityVehicles = allVehicles.filter((v) =>
    city.availableVehicles.includes(v.slug)
  );

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[60vh] items-end overflow-hidden pb-12">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${city.heroImage}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-night/80 via-night/40 to-night/20" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            locale={locale}
            items={[
              { label: tNav("home"), href: "" },
              { label: tNav("destinations"), href: "/destinations" },
              { label: cityName },
            ]}
          />
          <p className="mt-2 text-sm text-gold">{cityTagline}</p>
          <h1 className="mt-2 font-serif text-4xl font-bold text-white sm:text-5xl md:text-6xl">
            {t("heroTitle", { city: cityName })}
          </h1>
        </div>
      </section>

      {/* Booking */}
      <div className="relative z-10 -mt-8 px-4">
        <BookingPlaceholder />
      </div>

      {/* City Intro */}
      <CityIntro
        eyebrow={t("about", { city: cityName.toUpperCase() })}
        title={t("heartOf", { city: cityName })}
        content={tCities(`${slug}.intro`)}
      />

      {/* Available Services */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow={t("discover")}
            title={t("availableServices")}
          />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {city.availableServices.map((serviceSlug) => {
              const Icon = serviceIconMap[serviceSlug] || MapPin;
              return (
                <Link
                  key={serviceSlug}
                  href={`/${locale}/services/${serviceSlug}`}
                  className="group rounded-2xl bg-sand p-8 transition-shadow hover:shadow-lg"
                >
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10">
                    <Icon className="h-6 w-6 text-gold" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-night mb-2">
                    {tServices(`${serviceSlug}.name`)}
                  </h3>
                  <p className="text-sm text-body leading-relaxed">
                    {tServices(`${serviceSlug}.shortDescription`)}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Popular Routes */}
      {cityRoutes.length > 0 && (
        <section className="py-20 bg-sand">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeader
              eyebrow={t("from", { city: cityName.toUpperCase() })}
              title={t("popularRoutes")}
            />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {cityRoutes.map((route) => {
                const hours = Math.floor(route.durationMinutes / 60);
                const mins = route.durationMinutes % 60;
                return (
                  <Link
                    key={route.slug}
                    href={`/${locale}/routes/${route.slug}`}
                    className="group flex items-center gap-6 rounded-2xl bg-white p-6 shadow-sm hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="flex-1">
                      <h3 className="font-serif text-lg font-bold text-night mb-2">
                        {tRoutes(`${route.slug}.name`)}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-muted">
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
      )}

      {/* Key Locations */}
      <KeyLocations
        eyebrow={t("discover")}
        title={t("keyLocations", { city: cityName })}
        locations={landmarks}
      />

      {/* Available Vehicles */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow={t("inCity", { city: cityName.toUpperCase() })}
            title={t("availableVehicles")}
          />
        </div>
        <div className="overflow-x-auto pb-4">
          <div className="mx-auto flex max-w-7xl gap-6 px-4 sm:px-6 lg:px-8">
            {cityVehicles.map((vehicle) => (
              <Link
                key={vehicle.slug}
                href={`/${locale}/fleet/${vehicle.slug}`}
                className="group flex-none w-72 overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={vehicle.heroImage}
                    alt={tFleet(`${vehicle.slug}.name`)}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="288px"
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

      {/* FAQ */}
      <FaqAccordion
        eyebrow={t("frequentlyAsked")}
        title={t("faqTitle", { city: cityName })}
        items={faqItems}
      />

      {/* CTA */}
      <CTASection />
    </>
  );
}
