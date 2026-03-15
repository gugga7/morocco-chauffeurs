import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, MessageCircle } from "lucide-react";

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
    {
      icon: MapPin,
      label: t("addressLabel"),
      value: t("address"),
      href: undefined as string | undefined,
    },
    {
      icon: Phone,
      label: t("phoneLabel"),
      value: t("phone"),
      href: "tel:+212524000000",
    },
    {
      icon: Mail,
      label: t("emailLabel"),
      value: t("email"),
      href: "mailto:info@moroccochauffeurs.com",
    },
    {
      icon: Clock,
      label: t("hoursLabel"),
      value: t("hours"),
      href: undefined as string | undefined,
    },
  ];

  const socialLinks = [
    {
      icon: MessageCircle,
      label: "WhatsApp",
      href: "https://wa.me/212524000000",
    },
    {
      icon: Instagram,
      label: "Instagram",
      href: "https://instagram.com/moroccochauffeurs",
    },
    {
      icon: Facebook,
      label: "Facebook",
      href: "https://facebook.com/moroccochauffeurs",
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="bg-night py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <p className="mb-3 text-xs font-semibold tracking-[0.25em] text-gold uppercase">
            {t("eyebrow")}
          </p>
          <h1 className="font-serif text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            {t("title")}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base sm:text-lg text-white/70">
            {t("subtitle")}
          </p>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 sm:py-20 bg-sand">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {contactItems.map(({ icon: Icon, label, value, href }) => (
              <div
                key={label}
                className="rounded-2xl bg-white p-6 sm:p-8 shadow-sm"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10">
                  <Icon className="h-6 w-6 text-gold" />
                </div>
                <h3 className="font-serif text-lg font-bold text-night mb-2">
                  {label}
                </h3>
                {href ? (
                  <a
                    href={href}
                    className="text-sm text-body leading-relaxed hover:text-gold transition-colors"
                  >
                    {value}
                  </a>
                ) : (
                  <p className="text-sm text-body leading-relaxed">{value}</p>
                )}
              </div>
            ))}
          </div>

          {/* WhatsApp prominent link */}
          <div className="mt-8 rounded-2xl border border-green-200 bg-green-50 p-6 sm:p-8 text-center">
            <MessageCircle className="mx-auto mb-3 h-8 w-8 text-green-600" />
            <h3 className="font-serif text-lg font-bold text-night mb-2">
              {t("whatsappTitle")}
            </h3>
            <p className="text-sm text-body mb-4">
              {t("whatsappDescription")}
            </p>
            <a
              href="https://wa.me/212524000000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-6 py-3 text-sm font-semibold text-white hover:bg-green-700 transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              {t("whatsappButton")}
            </a>
          </div>
        </div>
      </section>

      {/* Social Media */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-bold text-night mb-6">
            {t("followUs")}
          </h2>
          <div className="flex items-center justify-center gap-4">
            {socialLinks.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-night/10 text-night/50 hover:text-gold hover:border-gold/50 transition-colors"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="bg-sand">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="mb-10 text-center">
            <p className="mb-3 text-xs font-semibold tracking-[0.2em] uppercase text-gold">
              {t("mapEyebrow")}
            </p>
            <h2 className="font-serif text-2xl font-bold text-night sm:text-3xl">
              {t("mapTitle")}
            </h2>
          </div>
          <div className="overflow-hidden rounded-2xl shadow-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d54267.45684468485!2d-8.03!3d31.63!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdafee8d96179e51%3A0x5950b6534f87adb8!2sMarrakech!5e0!3m2!1sen!2sma!4v1700000000000!5m2!1sen!2sma"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Morocco Chauffeurs - Marrakech Location"
              className="w-full"
            />
          </div>
        </div>
      </section>

      {/* CTA to Reservation */}
      <section className="bg-gradient-to-br from-night via-night/95 to-night py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="font-serif text-2xl font-bold text-white sm:text-3xl md:text-4xl">
            {t("readyToBook")}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base sm:text-lg text-white/70">
            {t("readyToBookDescription")}
          </p>
          <div className="mt-8">
            <Button href={`/${locale}/reservation`}>
              {t("ctaButton")}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
