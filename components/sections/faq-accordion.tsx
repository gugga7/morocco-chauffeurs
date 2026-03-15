"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  eyebrow: string;
  title: string;
  items: FaqItem[];
  dark?: boolean;
}

export function FaqAccordion({
  eyebrow,
  title,
  items,
  dark = false,
}: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={`py-20 ${dark ? "bg-night" : "bg-white"}`}>
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p
            className={`mb-3 text-xs font-semibold tracking-[0.2em] uppercase ${
              dark ? "text-gold/80" : "text-gold"
            }`}
          >
            {eyebrow}
          </p>
          <h2
            className={`font-serif text-3xl font-bold md:text-4xl ${
              dark ? "text-white" : "text-night"
            }`}
          >
            {title}
          </h2>
        </div>

        <div className="divide-y divide-gray-200">
          {items.map((item, index) => (
            <div key={index}>
              <button
                onClick={() => toggle(index)}
                className={`flex w-full items-center justify-between py-5 text-left transition-colors ${
                  dark
                    ? "text-white hover:text-gold"
                    : "text-night hover:text-gold"
                }`}
              >
                <span className="pr-4 font-serif text-base font-bold">
                  {item.question}
                </span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-gold transition-transform duration-200 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-96 pb-5" : "max-h-0"
                }`}
              >
                <p
                  className={`text-sm leading-relaxed ${
                    dark ? "text-white/70" : "text-body"
                  }`}
                >
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
