import ScrollReveal from "./ScrollReveal";
import { content as t } from "@/content";
import { SITE, withUtm } from "@/config/site";

const COPIES = 6;

/** Infinite marquee with the logos from `SITE.clients`. Duplicated copies are hidden from assistive technology. */
const ClientsSection = () => {
  const { clients } = SITE;

  return (
    <section
      id={t.ids.clients}
      aria-labelledby="clients-title"
      className="bg-black py-20 sm:py-24 relative overflow-hidden"
    >
      <div className="container mx-auto px-5 sm:px-8 mb-16 sm:mb-24">
        <ScrollReveal>
          <div>
            <span className="label-text">{t.clients.label}</span>
            <h2
              id="clients-title"
              className="font-display pt-4 font-black text-[clamp(3.5rem,10vw,6rem)] metallic-text metallic-text-reverse leading-[0.8] tracking-[-0.03em]"
            >
              {t.clients.title.replace(" ", " ")}
            </h2>
          </div>
        </ScrollReveal>
      </div>

      <div className="relative overflow-hidden">
        <div className="flex gap-20 animate-marquee w-max">
          {Array.from({ length: COPIES }, () => clients)
            .flat()
            .map((c, i) => {
              const isCopy = i >= clients.length;
              return (
                <a
                  key={i}
                  href={withUtm(c.url, "clients_section")}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-hidden={isCopy || undefined}
                  tabIndex={isCopy ? -1 : undefined}
                  className="group flex items-center justify-center"
                >
                  <div className="py-6 sm:py-8 flex items-center justify-center">
                    <img
                      src={c.logo}
                      alt={isCopy ? "" : `${c.name} — ${t.clients.altSuffix}`}
                      loading="lazy"
                      decoding="async"
                      width={c.width}
                      height={c.height}
                      className={`h-10 sm:h-12 md:h-14 w-auto opacity-30 grayscale object-contain transition-all duration-500 ease-out group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-110 ${
                        i % 2 === 0 ? "scale-100" : "scale-90 opacity-20"
                      }`}
                    />
                  </div>
                </a>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
