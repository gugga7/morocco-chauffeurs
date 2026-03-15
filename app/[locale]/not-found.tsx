import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { Compass } from "lucide-react";

export default async function NotFoundPage() {
  const locale = await getLocale();
  const t = await getTranslations("notFound");

  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-sand">
      <div className="mx-auto max-w-xl px-4 text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gold/10">
          <Compass className="h-10 w-10 text-gold" />
        </div>
        <h1 className="font-serif text-4xl font-bold text-night sm:text-5xl">
          {t("title")}
        </h1>
        <p className="mt-4 text-lg text-body leading-relaxed">
          {t("description")}
        </p>
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button href={`/${locale}`}>{t("goHome")}</Button>
          <Button variant="outline" href={`/${locale}/destinations`}>
            {t("viewDestinations")}
          </Button>
        </div>
      </div>
    </section>
  );
}
