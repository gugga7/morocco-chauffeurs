interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  dark?: boolean;
}

export function SectionHeader({ eyebrow, title, dark = false }: SectionHeaderProps) {
  return (
    <div className="mb-10 text-center">
      <p
        className={`text-xs font-semibold tracking-[0.2em] uppercase mb-3 ${
          dark ? "text-gold/80" : "text-gold"
        }`}
      >
        {eyebrow}
      </p>
      <h2
        className={`font-serif text-3xl md:text-4xl font-bold ${
          dark ? "text-white" : "text-night"
        }`}
      >
        {title}
      </h2>
    </div>
  );
}
