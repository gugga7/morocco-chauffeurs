import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { locales } from "@/i18n/config";
import { getService, getAllServices, getAllVehicles, getAllCities } from "@/lib/content";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { BookingPlaceholder } from "@/components/ui/booking-placeholder";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { CTASection } from "@/components/sections/cta-section";
import { SectionHeader } from "@/components/ui/section-header";
import { MapPin } from "lucide-react";

export function generateStaticParams() {
  const services = getAllServices();
  return locales.flatMap((locale) =>
    services.map((s) => ({ locale, service: s.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; service: string }>;
}): Promise<Metadata> {
  const { service: slug } = await params;
  try {
    getService(slug);
  } catch {
    return {};
  }
  const t = await getTranslations("services");
  return {
    title: t(`${slug}.meta.title`),
    description: t(`${slug}.meta.description`),
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ locale: string; service: string }>;
}) {
  const { service: slug } = await params;
  const locale = await getLocale();
  const t = await getTranslations("servicePage");
  const tServices = await getTranslations("services");
  const tFleet = await getTranslations("fleet");
  const tCities = await getTranslations("cities");
  const tNav = await getTranslations("nav");

  let service;
  try {
    service = getService(slug);
  } catch {
    notFound();
  }

  const serviceName = tServices(`${slug}.name`);
  const steps = [
    tServices(`${slug}.steps.0`),
    tServices(`${slug}.steps.1`),
    tServices(`${slug}.steps.2`),
  ];

  // Get FAQ items
  const faqItems = service.faqKeys.map((key) => ({
    question: tServices(`${slug}.faq.${key}.question`),
    answer: tServices(`${slug}.faq.${key}.answer`),
  }));

  // Get available vehicles
  const allVehicles = getAllVehicles();
  const serviceVehicles = allVehicles.filter((v) =>
    service.availableVehicles.includes(v.slug)
  );

  // Get available cities
  const allCities = getAllCities();
  const serviceCities = allCities.filter((c) =>
    service.availableCities.includes(c.slug)
  );

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[50vh] items-end overflow-hidden pb-12">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${service.heroImage}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-night/80 via-night/40 to-night/20" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            locale={locale}
            items={[
              { label: tNav("home"), href: "" },
              { label: tNav("services"), href: "/services" },
              { label: serviceName },
            ]}
          />
          <h1 className="mt-2 font-serif text-4xl font-bold text-white sm:text-5xl md:text-6xl">
            {t("heroTitle", { service: serviceName })}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80 leading-relaxed">
            {tServices(`${slug}.description`)}
          </p>
        </div>
      </section>

      {/* Booking */}
      <div className="relative z-10 -mt-8 px-4">
        <BookingPlaceholder />
      </div>

      {/* How It Works */}
      <section className="py-20 bg-sand">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow={t("howItWorks")}
            title={t("howItWorksTitle")}
          />
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {steps.map((step, i) => (
              <div key={i} className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gold text-white font-serif text-xl font-bold">
                  {i + 1}
                </div>
                <p className="text-xs font-semibold tracking-[0.15em] text-gold uppercase mb-2">
                  {t("step", { number: String(i + 1) })}
                </p>
                <p className="text-sm text-body leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Available Vehicles */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow={t("forThisService")}
            title={t("availableVehicles")}
          />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {serviceVehicles.map((vehicle) => (
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
                    {t("passengers", { count: String(vehicle.capacity) })}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Cities Where Available */}
      <section className="py-20 bg-sand">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow={t("citiesAvailable")}
            title={t("citiesAvailable")}
          />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {serviceCities.map((city) => (
              <Link
                key={city.slug}
                href={`/${locale}/destinations/${city.slug}`}
                className="group flex items-center gap-3 rounded-xl bg-white p-4 shadow-sm hover:shadow-lg transition-shadow"
              >
                <MapPin className="h-5 w-5 text-gold shrink-0" />
                <div>
                  <p className="font-serif text-sm font-bold text-night group-hover:text-gold transition-colors">
                    {tCities(`${city.slug}.name`)}
                  </p>
                  <p className="text-xs text-muted">
                    {tCities(`${city.slug}.tagline`)}
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
        title={t("faqTitle", { service: serviceName })}
        items={faqItems}
      />

      {/* CTA */}
      <CTASection />
    </>
  );
}
