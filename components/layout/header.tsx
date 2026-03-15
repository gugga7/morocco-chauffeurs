import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { LanguageSwitcher } from "./language-switcher";
import { MobileNav } from "./mobile-nav";

const navLinks = [
  { key: "destinations", href: "/destinations" },
  { key: "services", href: "/services" },
  { key: "fleet", href: "/fleet" },
  { key: "about", href: "/about" },
  { key: "contact", href: "/contact" },
] as const;

export async function Header() {
  const locale = await getLocale();
  const t = await getTranslations("nav");

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-night/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href={`/${locale}`}
          className="font-serif text-lg font-bold tracking-wider text-white"
        >
          MOROCCO CHAUFFEURS
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map(({ key, href }) => (
            <Link
              key={key}
              href={`/${locale}${href}`}
              className="text-sm text-white/80 hover:text-white font-medium tracking-wide transition-colors"
            >
              {t(key)}
            </Link>
          ))}
          <Link
            href={`/${locale}/reservation`}
            className="rounded-lg bg-gold px-5 py-2 text-sm font-semibold text-white hover:bg-gold/90 transition-colors"
          >
            {t("bookNow")}
          </Link>
          <LanguageSwitcher />
        </nav>

        {/* Mobile nav */}
        <MobileNav />
      </div>
    </header>
  );
}
