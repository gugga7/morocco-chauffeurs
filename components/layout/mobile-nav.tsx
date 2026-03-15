"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navLinks = [
  { key: "destinations", href: "/destinations" },
  { key: "services", href: "/services" },
  { key: "fleet", href: "/fleet" },
  { key: "about", href: "/about" },
  { key: "contact", href: "/contact" },
] as const;

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const locale = useLocale();
  const t = useTranslations("nav");

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="text-white p-2 cursor-pointer"
        aria-label="Toggle menu"
      >
        {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-full bg-night/95 backdrop-blur-md border-t border-white/10">
          <nav className="flex flex-col px-6 py-4 gap-1">
            {navLinks.map(({ key, href }) => (
              <Link
                key={key}
                href={`/${locale}${href}`}
                onClick={() => setOpen(false)}
                className="text-white/80 hover:text-white py-3 text-sm font-medium tracking-wide transition-colors"
              >
                {t(key)}
              </Link>
            ))}
            <Link
              href={`/${locale}/reservation`}
              onClick={() => setOpen(false)}
              className="mt-3 inline-flex items-center justify-center rounded-lg bg-gold px-6 py-3 text-sm font-semibold text-white hover:bg-gold/90 transition-colors"
            >
              {t("bookNow")}
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}
