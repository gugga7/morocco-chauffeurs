import Link from "next/link";
import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";

const featuredCities = ["marrakech", "casablanca", "fez", "tangier"] as const;

export async function DestinationsGrid() {
  const locale = await getLocale();
  const t = await getTranslations("sections");
  const tCities = await getTranslations("cities");

  return (
    <section className="py-20 bg-sand">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow={t("exploreMorocco")}
          title={t("ourDestinations")}
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredCities.map((slug) => (
            <Link
              key={slug}
              href={`/${locale}/destinations/${slug}`}
              className="group relative overflow-hidden rounded-2xl aspect-[3/4] block"
            >
              <Image
                src={`/images/cities/${slug}-hero.jpg`}
                alt={tCities(`${slug}.name`)}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"

              />
              <div className="absolute inset-0 bg-gradient-to-t from-night/80 via-night/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-serif text-xl font-bold text-white">
                  {tCities(`${slug}.name`)}
                </h3>
                <p className="mt-1 text-sm text-white/70">
                  {tCities(`${slug}.tagline`)}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button variant="outline" href={`/${locale}/destinations`}>
            {t("viewAllDestinations")}
          </Button>
        </div>
      </div>
    </section>
  );
}
