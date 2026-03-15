import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { locales } from "@/i18n/config";
import { getVehicle, getAllVehicles, getAllServices } from "@/lib/content";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { BookingPlaceholder } from "@/components/ui/booking-placeholder";
import { CTASection } from "@/components/sections/cta-section";
import { SectionHeader } from "@/components/ui/section-header";
import { StructuredData } from "@/components/seo/structured-data";
import { productSchema } from "@/lib/seo";
import {
  Users,
  Briefcase,
  Check,
  Plane,
  Route,
  CalendarCheck,
  Clock,
  Map,
  Crown,
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
  const vehicles = getAllVehicles();
  return locales.flatMap((locale) =>
    vehicles.map((v) => ({ locale, vehicle: v.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; vehicle: string }>;
}): Promise<Metadata> {
  const { vehicle: slug } = await params;
  try {
    getVehicle(slug);
  } catch {
    return {};
  }
  const t = await getTranslations("fleet");
  return {
    title: t(`${slug}.meta.title`),
    description: t(`${slug}.meta.description`),
  };
}

export default async function FleetPage({
  params,
}: {
  params: Promise<{ locale: string; vehicle: string }>;
}) {
  const { vehicle: slug } = await params;
  const locale = await getLocale();
  const t = await getTranslations("fleetPage");
  const tFleet = await getTranslations("fleet");
  const tServices = await getTranslations("services");
  const tNav = await getTranslations("nav");

  let vehicle;
  try {
    vehicle = getVehicle(slug);
  } catch {
    notFound();
  }

  const vehicleName = tFleet(`${slug}.name`);
  const vehicleClass = tFleet(`${slug}.class`);

  // Get features
  const features = vehicle.features.map((featureKey) =>
    tFleet(`${slug}.features.${featureKey}`)
  );

  // Get available services
  const allServices = getAllServices();
  const vehicleServices = allServices.filter((s) =>
    vehicle.availableServices.includes(s.slug)
  );

  // Get other vehicles
  const allVehicles = getAllVehicles().filter((v) => v.slug !== slug);

  const vehicleDescription = tFleet(`${slug}.description`);

  return (
    <>
      <StructuredData data={productSchema(vehicleName, vehicleDescription, vehicle.capacity)} />
      {/* Hero */}
      <section className="relative flex min-h-[50vh] items-end overflow-hidden pb-12">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${vehicle.heroImage}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-night/80 via-night/40 to-night/20" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            locale={locale}
            items={[
              { label: tNav("home"), href: "" },
              { label: tNav("fleet"), href: "/fleet" },
              { label: vehicleName },
            ]}
          />
          <p className="mt-2 text-sm text-gold">{vehicleClass}</p>
          <h1 className="mt-2 font-serif text-4xl font-bold text-white sm:text-5xl md:text-6xl">
            {t("heroTitle", { vehicle: vehicleName })}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80 leading-relaxed">
            {vehicleDescription}
          </p>
        </div>
      </section>

      {/* Vehicle Specs */}
      <section className="py-20 bg-sand">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow={t("specifications")}
            title={t("vehicleSpecs")}
          />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Capacity */}
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <div className="mb-3 flex items-center gap-3">
                <Users className="h-6 w-6 text-gold" />
                <h3 className="font-serif text-lg font-bold text-night">
                  {t("passengers")}
                </h3>
              </div>
              <p className="text-2xl font-bold text-night">
                {t("seating", { count: String(vehicle.capacity) })}
              </p>
            </div>

            {/* Luggage */}
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <div className="mb-3 flex items-center gap-3">
                <Briefcase className="h-6 w-6 text-gold" />
                <h3 className="font-serif text-lg font-bold text-night">
                  {t("luggage")}
                </h3>
              </div>
              <p className="text-2xl font-bold text-night">
                {t("pieces", { count: String(vehicle.luggageCapacity) })}
              </p>
            </div>
          </div>

          {/* Features */}
          <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm">
            <h3 className="mb-4 font-serif text-lg font-bold text-night">
              {t("features")}
            </h3>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {features.map((feature, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-gold shrink-0" />
                  <span className="text-sm text-body">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Available Services */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow={t("forThisVehicle")}
            title={t("availableServices")}
          />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {vehicleServices.map((svc) => {
              const Icon = serviceIconMap[svc.slug] || Map;
              return (
                <Link
                  key={svc.slug}
                  href={`/${locale}/services/${svc.slug}`}
                  className="group rounded-2xl bg-sand p-8 transition-shadow hover:shadow-lg"
                >
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10">
                    <Icon className="h-6 w-6 text-gold" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-night mb-2">
                    {tServices(`${svc.slug}.name`)}
                  </h3>
                  <p className="text-sm text-body leading-relaxed">
                    {tServices(`${svc.slug}.shortDescription`)}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Booking */}
      <div className="bg-sand py-12 px-4">
        <BookingPlaceholder />
      </div>

      {/* Other Vehicles */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow={t("otherVehicles")}
            title={t("exploreOurFleet")}
          />
        </div>
        <div className="overflow-x-auto pb-4">
          <div className="mx-auto flex max-w-7xl gap-6 px-4 sm:px-6 lg:px-8">
            {allVehicles.map((v) => (
              <Link
                key={v.slug}
                href={`/${locale}/fleet/${v.slug}`}
                className="group flex-none w-72 overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={v.heroImage}
                    alt={tFleet(`${v.slug}.name`)}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="288px"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-base font-bold text-night">
                    {tFleet(`${v.slug}.name`)}
                  </h3>
                  <p className="mt-1 text-xs text-muted">
                    {v.capacity} pax
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection />
    </>
  );
}
