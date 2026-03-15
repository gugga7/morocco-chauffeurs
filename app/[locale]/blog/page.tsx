import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Newspaper } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("blog");
  return {
    title: t("title"),
    description: t("comingSoonDescription"),
  };
}

export default async function BlogPage() {
  const t = await getTranslations("blog");

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

      {/* Coming Soon */}
      <section className="py-32 bg-sand">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gold/10">
            <Newspaper className="h-10 w-10 text-gold" />
          </div>
          <h2 className="font-serif text-3xl font-bold text-night mb-4">
            {t("comingSoon")}
          </h2>
          <p className="text-body leading-relaxed">
            {t("comingSoonDescription")}
          </p>
        </div>
      </section>
    </>
  );
}
