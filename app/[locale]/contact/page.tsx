import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("contact");
  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

export default async function ContactPage() {
  const t = await getTranslations("contact");
  const locale = await getLocale();

  const contactItems = [
    { icon: MapPin, label: t("addressLabel"), value: t("address") },
    { icon: Phone, label: t("phoneLabel"), value: t("phone") },
    { icon: Mail, label: t("emailLabel"), value: t("email") },
    { icon: Clock, label: t("hoursLabel"), value: t("hours") },
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
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/70">
            {t("subtitle")}
          </p>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-20 bg-sand">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {contactItems.map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="rounded-2xl bg-white p-8 shadow-sm"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10">
                  <Icon className="h-6 w-6 text-gold" />
                </div>
                <h3 className="font-serif text-lg font-bold text-night mb-2">
                  {label}
                </h3>
                <p className="text-sm text-body leading-relaxed">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social */}
      <section className="py-12 bg-white">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-bold text-night mb-6">
            {t("followUs")}
          </h2>
          <div className="flex items-center justify-center gap-6">
            {["Instagram", "Facebook", "X", "LinkedIn"].map((platform) => (
              <span
                key={platform}
                className="text-sm font-semibold text-muted hover:text-gold transition-colors cursor-pointer"
              >
                {platform}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA to Reservation */}
      <section className="bg-gradient-to-br from-night via-night/95 to-night py-24">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl">
            {t("readyToBook")}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/70">
            {t("readyToBookDescription")}
          </p>
          <div className="mt-8">
            <Button href={`/${locale}/reservation`}>
              {t("readyToBook")}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
