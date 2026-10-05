import ScrollReveal from "./ScrollReveal";
import { Code2, Server, Cpu, Brain, ShoppingCart, type LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { content as t } from "@/content";
import type { AreaIcon } from "@/content";

const icons: Record<AreaIcon, LucideIcon> = {
  web: Code2,
  ecommerce: ShoppingCart,
  enterprise: Server,
  iot: Cpu,
  ai: Brain,
};

/** Services section: one card per entry in `content.services.areas`. Its heading and anchor are the "services" section of the page. */
const TechSection = () => {
  const { services } = t;
  return (
    <section
      id={t.ids.services}
      aria-labelledby="services-title"
      className="bg-black py-20 sm:py-44 relative overflow-hidden"
    >
      <div className="container mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-4 lg:sticky lg:top-32">
            <ScrollReveal>
              <span className="label-text">{services.label}</span>
              <h2
                id="services-title"
                className="font-display font-black text-[clamp(2.8rem,5vw,4.5rem)] metallic-text leading-[0.85] tracking-[-0.03em] py-4"
              >
                {services.title}
              </h2>
              <p className="font-mono-accent text-white/60 text-sm mt-6 leading-relaxed max-w-sm">
                {services.intro}
              </p>
              <p className="font-mono-accent text-white/35 text-xs mt-4 max-w-xs leading-relaxed">
                {services.outro}
              </p>
            </ScrollReveal>
          </div>
          <div className="lg:col-span-8 space-y-4">
            {services.areas.map((area, i) => {
              const Icon = icons[area.icon];
              return (
                <ScrollReveal key={area.title} delay={i * 0.06}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.35 }}
                    className="relative rounded-md p-6 sm:p-8 group overflow-hidden border border-white/[0.05] bg-gradient-to-b from-white/[0.02] to-transparent"
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-white/[0.05] to-transparent" />
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                      <div className="flex gap-4">
                        <div className="mt-1">
                          <Icon
                            className="w-5 h-5 text-white/25 group-hover:text-white/70 transition duration-500"
                            strokeWidth={1.2}
                          />
                        </div>
                        <div>
                          <h3 className="font-display font-black text-xl sm:text-2xl text-white/85 group-hover:text-white transition duration-500 tracking-tight">
                            {area.title}
                          </h3>
                          <p className="font-mono-accent text-sm text-white/50 mt-2 leading-relaxed max-w-md group-hover:text-white/70 transition duration-500">
                            {area.desc}
                          </p>
                          <p className="font-mono-accent text-xs text-white/30 mt-2 max-w-md group-hover:text-white/50 transition duration-500">
                            {area.extra}
                          </p>
                          <div className="flex flex-wrap gap-2 mt-4">
                            {area.tags.map((tag) => (
                              <span
                                key={tag}
                                className="font-mono-accent text-[12px] px-2 py-1 rounded bg-white/[0.03] border border-white/[0.06] text-white/40 group-hover:text-white/70 group-hover:border-white/20 transition-all duration-400"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      {area.stat && (
                        <div className="flex md:flex-col md:items-end items-center justify-between gap-2 md:gap-0">
                          <div className="font-display font-black text-2xl sm:text-3xl text-white/25 group-hover:text-white transition duration-700">
                            {area.stat}
                          </div>
                          <span className="font-mono-accent text-[10px] text-white/30 group-hover:text-white/50 transition duration-500">
                            {area.statLabel}
                          </span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechSection;
