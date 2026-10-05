/** Single source of truth for company data (UI, JSON-LD, SEO). */
export const SITE = {
  name: "ESC Software",
  shortName: "ESC",
  url: "https://esc-software.com",
  email: "hello@esc-software.com",
  phone: "+55 11 99303-1311",
  phoneE164: "+5511993031311",
  foundingYear: 2020,
  address: {
    street: "R. Padre Jacinto de Carvalhais, 44",
    district: "Jardim Santo Andre",
    city: "São Paulo",
    region: "SP",
    postalCode: "08390-350",
    country: "BR",
  },
  /** schema.org day names; times in 24h local time (America/Sao_Paulo). */
  hours: [
    { days: ["Monday", "Tuesday", "Wednesday", "Thursday"], opens: "10:00", closes: "18:00" },
    { days: ["Friday"], opens: "10:00", closes: "13:00" },
  ],
  social: {
    instagram: "https://www.instagram.com/esc_software",
    linkedin: "https://www.linkedin.com/company/esc-s/",
  },
  founder: {
    name: "Flavio Luiz",
    handle: "flazo0",
    sameAs: [
      "https://www.instagram.com/flazo0",
      "https://www.linkedin.com/in/flazo0",
      "https://github.com/flazo0",
      "https://www.tiktok.com/@flazoo0",
    ],
  },
  clients: [
    {
      name: "LAET",
      logo: "/clients/laet.png",
      width: 165,
      height: 168,
      url: "https://laet.gallery",
    },
    {
      name: "DOPE",
      logo: "/clients/dope.png",
      width: 167,
      height: 168,
      url: "https://dopetees.site",
    },
    {
      name: "ETO",
      logo: "/clients/eto.png",
      width: 387,
      height: 124,
      url: "https://www.etogallery.com.br",
    },
    {
      name: "UNG",
      logo: "/clients/ung.svg",
      width: 2048,
      height: 1075,
      url: "https://www.ungbr.com.br",
    },
  ],
} as const;

export const withUtm = (url: string, campaign: string) =>
  `${url}?utm_source=esc_software&utm_medium=referral&utm_campaign=${campaign}`;
