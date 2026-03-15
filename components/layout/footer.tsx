import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { Instagram, Facebook, MessageCircle } from "lucide-react";

const featuredCities = [
  "marrakech",
  "casablanca",
  "fez",
  "tangier",
  "rabat",
  "agadir",
] as const;

const featuredServices = [
  "airport-transfers",
  "city-to-city-transfers",
  "hourly-chauffeur",
  "multi-day-tours",
] as const;

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: MessageCircle, href: "#", label: "WhatsApp" },
];

export async function Footer() {
  const locale = await getLocale();
  const t = await getTranslations("footer");
  const tServices = await getTranslations("services");
  const tCities = await getTranslations("cities");

  return (
    <footer className="bg-[#111122] text-white/70">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link
              href={`/${locale}`}
              className="font-serif text-lg font-bold text-white tracking-wider"
            >
              MOROCCO CHAUFFEURS
            </Link>
            <p className="mt-4 text-sm leading-relaxed">
              {t("description")}
            </p>
            <div className="mt-6 flex items-center gap-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/50 hover:text-gold hover:border-gold/50 transition-colors"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wide uppercase mb-4">
              {t("destinations")}
            </h4>
            <ul className="space-y-2">
              {featuredCities.map((slug) => (
                <li key={slug}>
                  <Link
                    href={`/${locale}/destinations/${slug}`}
                    className="text-sm hover:text-gold transition-colors"
                  >
                    {tCities(`${slug}.name`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wide uppercase mb-4">
              {t("services")}
            </h4>
            <ul className="space-y-2">
              {featuredServices.map((slug) => (
                <li key={slug}>
                  <Link
                    href={`/${locale}/services/${slug}`}
                    className="text-sm hover:text-gold transition-colors"
                  >
                    {tServices(`${slug}.name`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wide uppercase mb-4">
              {t("contact")}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>info@moroccochauffeurs.com</li>
              <li>+212 600 000 000</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs">{t("copyright")}</p>
          <div className="flex items-center gap-4 text-xs">
            <Link
              href={`/${locale}/terms`}
              className="hover:text-gold transition-colors"
            >
              {t("terms")}
            </Link>
            <Link
              href={`/${locale}/privacy`}
              className="hover:text-gold transition-colors"
            >
              {t("privacy")}
            </Link>
            <span className="cursor-default">{t("cookies")}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
