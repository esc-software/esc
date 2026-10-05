import ScrollReveal from "./ScrollReveal";
import { motion } from "framer-motion";
import { useState } from "react";
import { content as t } from "@/content";

/** Accordion with the FAQ from `content.faq`. Answers stay in the DOM when collapsed so crawlers and the FAQPage markup see them. */
const FAQSection = () => {
  const faqs = t.faq.items;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id={t.ids.faq}
      aria-labelledby="faq-title"
      className="bg-black py-20 sm:py-40 relative"
    >
      <div className="container mx-auto px-5 sm:px-8 max-w-3xl">
        <ScrollReveal>
          <div className="text-center mb-14 sm:mb-24">
            <span className="label-text">{t.faq.label}</span>
            <h2
              id="faq-title"
              className="font-display py-4 font-black text-[clamp(3.5rem,10vw,6rem)] metallic-text metallic-text-reverse leading-[0.8] tracking-[-0.03em]"
            >
              {t.faq.title}
            </h2>
          </div>
        </ScrollReveal>
        <div>
          {faqs.map((faq, i) => (
            <ScrollReveal key={i} delay={i * 0.04}>
              <div className="border-b border-border/20">
                <button
                  aria-expanded={openIndex === i}
                  aria-controls={`faq-answer-${i}`}
                  className="w-full flex items-center justify-between py-5 sm:py-7 text-left group"
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                >
                  <span className="font-mono-accent text-xs sm:text-sm font-medium text-white/80 group-hover:text-silver-bright transition-colors duration-500 pr-6 sm:pr-8">
                    {faq.q}
                  </span>
                  <motion.div
                    animate={{ rotate: openIndex === i ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="flex-shrink-0"
                  >
                    <span className="material-symbols-outlined font-extralight text-white group-hover:text-silver-bright transition-colors duration-500">
                      gesture
                    </span>
                  </motion.div>
                </button>
                <motion.div
                  id={`faq-answer-${i}`}
                  role="region"
                  initial={false}
                  animate={
                    openIndex === i ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }
                  }
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="font-mono-accent pb-5 sm:pb-7 text-xs sm:text-sm text-white/60 font-light leading-relaxed max-w-lg">
                    {faq.a}
                  </p>
                </motion.div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
