import Link from "next/link";
import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { getAllVehicles } from "@/lib/content";
import { SectionHeader } from "@/components/ui/section-header";

export async function FleetCarousel() {
  const locale = await getLocale();
  const t = await getTranslations("sections");
  const tFleet = await getTranslations("fleet");
  const vehicles = getAllVehicles();

  return (
    <section className="py-20 bg-sand">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow={t("travelInStyle")}
          title={t("ourFleet")}
        />
      </div>

      {/* Horizontal scroll */}
      <div className="overflow-x-auto pb-4">
        <div className="mx-auto flex max-w-7xl gap-6 px-4 sm:px-6 lg:px-8">
          {vehicles.map((vehicle) => {
            const isSvg = vehicle.heroImage.endsWith(".svg");
            return (
              <Link
                key={vehicle.slug}
                href={`/${locale}/fleet/${vehicle.slug}`}
                className="group flex-none w-72 overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-night/5">
                  <Image
                    src={vehicle.heroImage}
                    alt={tFleet(`${vehicle.slug}.name`)}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="288px"
                    unoptimized={isSvg}
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-base font-bold text-night">
                    {tFleet(`${vehicle.slug}.name`)}
                  </h3>
                  <p className="mt-1 text-xs text-muted">
                    {vehicle.capacity} pax
                  </p>
                  <span className="mt-3 inline-block text-xs font-semibold text-gold tracking-wide">
                    {t("viewDetails")} &rarr;
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
