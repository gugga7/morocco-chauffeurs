import { getLocale, getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";

export async function CTASection() {
  const locale = await getLocale();
  const t = await getTranslations("sections");

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-night via-night/95 to-night py-24">
      {/* Decorative gold accent */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute -right-40 -top-40 h-80 w-80 rounded-full bg-gold" />
        <div className="absolute -left-20 -bottom-20 h-60 w-60 rounded-full bg-gold" />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center">
        <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl md:text-5xl">
          {t("readyToExperience")}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-white/70">
          {t("bookInMinutes")}
        </p>
        <div className="mt-8">
          <Button href={`/${locale}/reservation`}>
            {t("bookYourChauffeur")}
          </Button>
        </div>
      </div>
    </section>
  );
}
