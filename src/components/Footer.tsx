import escLogo from "@/assets/esc-logo.svg";
import { content as t } from "@/content";
import { SITE, withUtm } from "@/config/site";

const linkClass =
  "font-mono-accent text-[12px] sm:text-[13px] text-white/60 hover:text-muted-foreground transition-colors duration-500";

const socials = [
  { label: "Instagram", href: SITE.social.instagram },
  { label: "LinkedIn", href: SITE.social.linkedin },
  { label: "GitHub", href: "https://github.com/flazo0" },
  { label: "TikTok", href: "https://www.tiktok.com/@flazoo0" },
];

/** Footer with contact data, address, opening hours and social links, all read from `SITE` and `content`. */
const Footer = () => {
  const { address } = SITE;

  return (
    <footer className="bg-black py-10 sm:py-16">
      <div className="container mx-auto px-5 sm:px-8 flex flex-col gap-10">
        <div className="flex flex-col gap-6 sm:gap-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <a href={withUtm(SITE.url, "footer")} target="_blank" rel="noopener noreferrer">
              <img
                src={escLogo}
                alt={t.footer.logoAlt}
                width={511}
                height={233}
                loading="lazy"
                className="w-8 sm:w-10 h-auto"
              />
            </a>
            <div className="h-4 w-px bg-border/40" />
            <span className="font-mono-accent font-light text-[12px] sm:text-[13px] uppercase">
              {t.footer.tagline}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 md:gap-10">
            <a href={`mailto:${SITE.email}`} className={linkClass}>
              {SITE.email}
            </a>
            <a href={`tel:${SITE.phoneE164}`} className={linkClass}>
              {SITE.phone}
            </a>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-3 font-mono-accent text-[12px] sm:text-[13px] text-white/50">
          <address className="not-italic leading-relaxed">
            <span className="block text-white/[0.47] uppercase tracking-widest text-[11px] mb-2">
              {t.footer.address}
            </span>
            {address.street}
            <br />
            {address.district}, {address.city} - {address.region}
            <br />
            {address.postalCode}
          </address>
          <div className="leading-relaxed">
            <span className="block text-white/[0.47] uppercase tracking-widest text-[11px] mb-2">
              {t.footer.hoursLabel}
            </span>
            {t.contact.hours}
          </div>
          <nav aria-label={t.footer.social}>
            <span className="block text-white/[0.47] uppercase tracking-widest text-[11px] mb-2">
              {t.footer.social}
            </span>
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer me"
                    className={linkClass}
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p suppressHydrationWarning className="font-mono-accent text-[11px] text-white/[0.47]">
          © {new Date().getFullYear()} {SITE.name} · {t.footer.founder}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
