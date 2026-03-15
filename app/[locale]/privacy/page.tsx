import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("privacy");
  return {
    title: t("title"),
    description: "Privacy policy for Morocco Chauffeurs luxury transportation services.",
  };
}

export default async function PrivacyPage() {
  const t = await getTranslations("privacy");

  const sections = [
    { title: t("dataCollectionTitle"), content: t("dataCollection") },
    { title: t("cookiesTitle"), content: t("cookies") },
    { title: t("yourRightsTitle"), content: t("yourRights") },
    { title: t("dataSecurityTitle"), content: t("dataSecurity") },
    { title: t("dataRetentionTitle"), content: t("dataRetention") },
  ];

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
          <p className="mt-4 text-sm text-white/50">{t("lastUpdated")}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-12">
          {sections.map(({ title, content }) => (
            <div key={title}>
              <h2 className="font-serif text-2xl font-bold text-night mb-4">
                {title}
              </h2>
              <p className="text-body leading-relaxed">{content}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
