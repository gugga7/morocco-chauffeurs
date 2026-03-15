import { getTranslations } from "next-intl/server";
import { MapPin, Clock, Briefcase, Star } from "lucide-react";

export async function TrustBar() {
  const t = await getTranslations("trustBar");

  const stats = [
    { icon: MapPin, value: "13+", label: t("destinations") },
    { icon: Clock, value: "24/7", label: t("availability") },
    { icon: Briefcase, value: "6", label: t("serviceTypes") },
    { icon: Star, value: "5★", label: t("rating") },
  ];

  return (
    <section className="bg-night py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-center justify-center gap-3 text-center">
              <stat.icon className="h-7 w-7 text-gold shrink-0" />
              <div>
                <p className="text-3xl font-bold text-white">{stat.value}</p>
                <p className="text-sm text-white/70 tracking-wide uppercase mt-0.5">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
