import { getTranslations } from "next-intl/server";

export async function Hero() {
  const t = await getTranslations("hero");

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero/homepage-hero.svg')" }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-night/60" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
        <p className="mb-4 text-xs font-semibold tracking-[0.25em] text-gold uppercase">
          {t("eyebrow")}
        </p>
        <h1 className="font-serif text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
          {t("title")}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80 leading-relaxed">
          {t("subtitle")}
        </p>
      </div>
    </section>
  );
}
