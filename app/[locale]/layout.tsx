import type { ReactNode } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { locales, type Locale } from "@/i18n/config";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  const meta = messages.metadata as { title: string; description: string };

  const languages: Record<string, string> = {};
  for (const loc of locales) {
    languages[loc] = `https://moroccochauffeurs.com/${loc}`;
  }
  languages["x-default"] = "https://moroccochauffeurs.com/en";

  return {
    title: {
      default: meta.title,
      template: `%s | Morocco Chauffeurs`,
    },
    description: meta.description,
    alternates: {
      languages,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <Header />
      <main className="pt-16">{children}</main>
      <Footer />
    </NextIntlClientProvider>
  );
}
