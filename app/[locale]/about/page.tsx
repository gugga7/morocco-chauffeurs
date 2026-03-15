import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { SectionHeader } from "@/components/ui/section-header";
import { CTASection } from "@/components/sections/cta-section";
import {
  Users,
  Car,
  Clock,
  BadgeDollarSign,
  MapPinned,
  ShieldCheck,
} from "lucide-react";

const reasons = [
  { key: "reason1", icon: Users },
  { key: "reason2", icon: Car },
  { key: "reason3", icon: Clock },
  { key: "reason4", icon: BadgeDollarSign },
  { key: "reason5", icon: MapPinned },
  { key: "reason6", icon: ShieldCheck },
];

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("about");
  return {
    title: t("title"),
    description: t("intro"),
  };
}

export default async function AboutPage() {
  const t = await getTranslations("about");

  return (
    <>
      {/* Hero */}
      <section className="bg-night py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <p className="mb-3 text-xs font-semibold tracking-[0.25em] text-gold uppercase">
            {t("eyebrow")}
          </p>
          <h1 className="font-serif text-4xl font-bold text-white sm:text-5xl">
            {t("title")}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/70">
            {t("intro")}
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-sand">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-5">
          <p className="text-body leading-relaxed">{t("story1")}</p>
          <p className="text-body leading-relaxed">{t("story2")}</p>
          <p className="text-body leading-relaxed">{t("story3")}</p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <p className="mb-3 text-xs font-semibold tracking-[0.2em] uppercase text-gold">
            {t("missionEyebrow")}
          </p>
          <h2 className="font-serif text-3xl font-bold text-night md:text-4xl">
            {t("missionTitle")}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-body leading-relaxed">
            {t("mission")}
          </p>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-sand">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow={t("whyChooseUs")}
            title={t("whyChooseUsTitle")}
          />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {reasons.map(({ key, icon: Icon }) => (
              <div
                key={key}
                className="rounded-2xl bg-white p-8 shadow-sm"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10">
                  <Icon className="h-6 w-6 text-gold" />
                </div>
                <h3 className="font-serif text-lg font-bold text-night mb-2">
                  {t(`${key}Title`)}
                </h3>
                <p className="text-sm text-body leading-relaxed">
                  {t(key)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
