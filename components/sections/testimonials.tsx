import { getTranslations } from "next-intl/server";
import { getTestimonials } from "@/lib/content";
import { SectionHeader } from "@/components/ui/section-header";
import { Star, Quote } from "lucide-react";

export async function Testimonials() {
  const t = await getTranslations("sections");
  const tTestimonials = await getTranslations("testimonials");
  const testimonials = getTestimonials();

  if (testimonials.length === 0) return null;

  const featured = testimonials[0];

  return (
    <section className="py-20 bg-sand">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow={t("guestExperiences")}
          title={t("whatClientsSay")}
        />

        <div className="relative rounded-2xl bg-sand p-8 md:p-12">
          <Quote className="absolute top-6 left-6 h-10 w-10 text-gold/20" />
          <div className="relative">
            <div className="mb-4 flex gap-1">
              {Array.from({ length: featured.rating }).map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 fill-gold text-gold"
                />
              ))}
            </div>
            <blockquote className="text-night text-lg leading-relaxed font-serif italic">
              &ldquo;{tTestimonials(`${featured.id}.text`)}&rdquo;
            </blockquote>
            <div className="mt-6">
              <p className="font-semibold text-night">
                {tTestimonials(`${featured.id}.name`)}
              </p>
              <p className="text-sm text-muted">
                {tTestimonials(`${featured.id}.location`)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
