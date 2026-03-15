import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { BookingPlaceholder } from "@/components/ui/booking-placeholder";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("reservation");
  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

export default async function ReservationPage() {
  const t = await getTranslations("reservation");

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
            {t("subtitle")}
          </p>
        </div>
      </section>

      {/* Booking */}
      <section className="bg-sand py-16 px-4" style={{ minHeight: "500px" }}>
        <BookingPlaceholder />
      </section>
    </>
  );
}
