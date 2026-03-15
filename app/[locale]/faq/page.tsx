import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { CTASection } from "@/components/sections/cta-section";

const faqKeys = ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8", "q9", "q10"];

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("faq");
  return {
    title: t("title"),
    description: "Frequently asked questions about Morocco Chauffeurs private transportation services.",
  };
}

export default async function FaqPage() {
  const t = await getTranslations("faq");

  const items = faqKeys.map((key) => ({
    question: t(`items.${key}.question`),
    answer: t(`items.${key}.answer`),
  }));

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
        </div>
      </section>

      {/* FAQ Accordion */}
      <FaqAccordion
        eyebrow={t("eyebrow")}
        title={t("title")}
        items={items}
      />

      <CTASection />
    </>
  );
}
