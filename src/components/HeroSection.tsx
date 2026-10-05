import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import ScrollReveal from "./ScrollReveal";
import escLogo from "@/assets/esc-logo.svg";
import AnimatedCounter from "./AnimatedCounter";
import Highlight from "./Highlight";
import { content as t } from "@/content";

/** First screen: logo, headline (the page's only h1), lead text and the animated stats. Visible in the prerendered HTML so it paints fast. */
const HeroSection = () => {
  const { hero } = t;
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -100]);
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, 40]);

  return (
    <section
      id={t.ids.home}
      className="bg-black relative min-h-screen flex flex-col overflow-hidden py-6 sm:py-8"
      ref={ref}
    >
      <motion.div
        style={{ opacity, y }}
        className="relative z-10 flex flex-col flex-1 justify-between"
      >
        <div className="container mx-auto px-5 sm:px-8">
          <ScrollReveal immediate>
            <div className="flex items-center justify-between">
              <img
                src={escLogo}
                alt={hero.logoAlt}
                width={511}
                height={233}
                className="w-14 sm:w-20 h-auto"
              />
              <div className="flex items-center gap-4 sm:gap-6">
                <span className="font-mono-accent font-light text-[12px] hidden sm:block">
                  {hero.established}
                </span>
                <div className="relative">
                  <div className="w-1.5 h-1.5 rounded-full bg-silver/60 animate-pulse" />
                  <div className="absolute inset-0 w-1.5 h-1.5 rounded-full bg-silver/30 animate-ping" />
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        <motion.div className="px-5 sm:px-8 my-auto" style={{ y: textY }}>
          <ScrollReveal immediate delay={0.1}>
            <h1 className="font-display text-[clamp(3.5rem,15vw,6rem)] md:text-[clamp(2.8rem,12vw,13rem)] leading-[0.88] tracking-tight text-center md:text-left">
              <motion.span
                className="metallic-text block pt-4"
                initial={false}
                animate={{ x: 0, opacity: 1, filter: "blur(0)" }}
                transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                {hero.headline[0]}
              </motion.span>
              <motion.span
                className="md:stroke-text metallic-text block"
                initial={false}
                animate={{ x: 0, opacity: 1, filter: "blur(0)" }}
                transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                {hero.headline[1]}
              </motion.span>
              <span className="sr-only">{hero.srOnly}</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal immediate delay={0.5}>
            <div className="justify-items-center md:justify-items-start mt-6 sm:mt-8">
              <p className="font-mono-accent font-light text-[1rem] sm:text-[1rem] text-white/50 md:text-white/60 max-w-[280px] sm:max-w-sm mt-6 sm:mt-8 leading-relaxed text-center md:text-left">
                <Highlight text={hero.lead} className="text-foreground/90 md:text-silver-bright" />
              </p>
            </div>
          </ScrollReveal>
        </motion.div>

        <div className="container mx-auto px-5 sm:px-8">
          <ScrollReveal immediate delay={0.6}>
            <div className="pt-2 sm:pt-4">
              <div className="flex flex-col gap-6 sm:gap-8 sm:flex-row sm:items-end sm:justify-between">
                <div className="flex gap-6 sm:gap-8 md:gap-16 justify-center md:justify-start">
                  {hero.stats.map((s) => (
                    <div key={s.label} className="relative group flex-1 sm:flex-none">
                      <div className="absolute -inset-4 bg-foreground/[0.01] rounded-lg opacity-0 duration-700" />
                      <div className="relative">
                        <div className="font-display font-black text-2xl sm:text-3xl md:text-5xl text-silver-bright/80 tracking-tight">
                          <AnimatedCounter end={s.end} suffix={s.suffix} />
                        </div>
                        <div className="font-mono-accent font-medium mt-1 sm:mt-2 text-[0.65rem] sm:text-[0.8rem] tracking-wide text-foreground/50 text-center md:text-left">
                          <span className="block text-[0.65rem] text-foreground/60 md:hidden">
                            {s.short}
                          </span>
                          <span className="hidden md:block text-[0.8rem] text-white/[0.47]">
                            {s.label}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <a
                  href={`#${t.ids.contact}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(t.ids.contact)?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="group flex items-center gap-3 md:hidden"
                >
                  <span className="font-mono-accent font-normal text-xs text-foreground/60 uppercase group-hover:text-silver-bright transition-colors duration-500">
                    {hero.cta}
                  </span>
                  <motion.div
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-foreground/10 flex items-center justify-center group-hover:bg-foreground group-hover:border-foreground transition-all duration-500"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg
                      className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-foreground/40 group-hover:text-background transition-colors duration-500 rotate-45"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </motion.div>
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
