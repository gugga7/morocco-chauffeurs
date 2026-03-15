interface CityIntroProps {
  eyebrow: string;
  title: string;
  content: string;
}

export function CityIntro({ eyebrow, title, content }: CityIntroProps) {
  const paragraphs = content.split("\n\n").filter(Boolean);

  return (
    <section className="py-20 bg-sand">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <p className="mb-3 text-center text-xs font-semibold tracking-[0.2em] uppercase text-gold">
          {eyebrow}
        </p>
        <h2 className="mb-8 text-center font-serif text-3xl font-bold text-night md:text-4xl">
          {title}
        </h2>
        <div className="space-y-5">
          {paragraphs.map((p, i) => (
            <p key={i} className="text-body leading-relaxed">
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
