import ScrollReveal from "./ScrollReveal";
import { motion } from "framer-motion";
import { content as t } from "@/content";

/** The four delivery phases, from `content.process`. */
const ProcessSection = () => {
  const { steps } = t.process;
  return (
    <section
      id={t.ids.process}
      aria-labelledby="process-title"
      className="bg-black py-20 sm:py-40 relative overflow-hidden"
    >
      <div className="container mx-auto px-5 sm:px-8 relative z-10">
        <ScrollReveal>
          <div className="flex items-end justify-between mb-16 sm:mb-24">
            <div>
              <span className="label-text">{t.process.label}</span>
              <h2
                id="process-title"
                className="font-display pt-4 pr-2 font-black text-[clamp(3.5rem,10vw,6rem)] metallic-text metallic-text-reverse leading-[0.8] tracking-[-0.03em]"
              >
                {t.process.title}
              </h2>
            </div>
            <span className="font-mono-accent text-[12px] text-white/40 hidden md:block tracking-widest">
              {String(steps.length).padStart(2, "0")} {t.process.phases}
            </span>
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step, i) => (
            <ScrollReveal key={step.title} delay={i * 0.08}>
              <motion.div
                className="group relative h-full rounded-sm p-6 sm:p-8 border border-white/[0.04] bg-white/[0.015] hover:bg-white/[0.025] transition-all duration-500"
                whileHover={{ y: -6 }}
              >
                <span className="font-mono-accent text-[13px] tracking-widest text-white/30">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <motion.div
                  className="h-px bg-gradient-to-r from-white/10 to-transparent my-5"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 + i * 0.1 }}
                  style={{ transformOrigin: "left" }}
                />
                <h3 className="font-display font-black text-[22px] text-white tracking-tight mb-3">
                  {step.title}
                </h3>
                <p className="font-mono-accent text-[12px] text-white/50 leading-relaxed mb-5">
                  {step.desc}
                </p>
                <ul className="space-y-1">
                  {step.deliverables.map((d, idx) => (
                    <li
                      key={idx}
                      className="text-[11px] text-white/30 font-mono-accent flex items-center gap-2"
                    >
                      <span className="w-1 h-1 bg-white/30 rounded-full" /> {d}
                    </li>
                  ))}
                </ul>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent" />
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
