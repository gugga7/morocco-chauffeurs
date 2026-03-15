import { getTranslations } from "next-intl/server";

export async function BookingPlaceholder() {
  const t = await getTranslations("booking");

  return (
    <div className="mx-auto max-w-4xl rounded-2xl overflow-hidden shadow-2xl bg-white">
      {/* Dark header bar */}
      <div className="bg-night px-6 py-4 flex items-center justify-between">
        <h3 className="text-white font-serif text-lg font-bold">
          {t("title")}
        </h3>
        <span className="text-muted text-xs">{t("poweredBy")}</span>
      </div>

      {/* Placeholder body */}
      <div className="px-6 py-16 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 rounded-full bg-sand flex items-center justify-center mb-4">
          <svg
            className="w-8 h-8 text-gold"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
        <p className="text-muted text-sm">{t("comingSoon")}</p>
      </div>
    </div>
  );
}
