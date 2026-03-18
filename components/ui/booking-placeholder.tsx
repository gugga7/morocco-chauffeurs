import { getTranslations } from "next-intl/server";

export async function BookingPlaceholder() {
  const t = await getTranslations("booking");

  return (
    <div className="mx-auto max-w-4xl">
      <h3 className="text-center font-serif text-2xl font-bold text-night mb-6">
        {t("title")}
      </h3>
      <div
        style={{
          position: "relative",
          width: "100%",
          height: 0,
          paddingBottom: "56.25%",
        }}
      >
        <iframe
          src="https://app.transmov.com/embed/moroccochauffeurs"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            border: "2px solid #3b82f6",
            borderRadius: "8px",
          }}
          frameBorder="0"
        />
      </div>
    </div>
  );
}
