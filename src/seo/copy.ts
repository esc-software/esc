/**
 * SEO copy. The page itself is English; search and social snippets are in
 * Brazilian Portuguese because that is where most searches come from.
 * Keep it plain and factual: only things the site actually does or states.
 */
export const SEO = {
  htmlLang: "en",
  ogLocale: "pt_BR",
  ogLocaleAlternate: "en_US",
  title: "ESC Software | Websites, Custom Systems & E-commerce Development",
  description:
    "Software house. Criamos sites, sistemas sob medida e lojas virtuais para clientes no Brasil e no exterior. Peça um orçamento.",
  ogDescription:
    "Sites, sistemas sob medida e lojas virtuais. Software house para clientes no Brasil e no exterior.",
  twitterDescription:
    "Sites, sistemas sob medida e lojas virtuais para clientes no Brasil e no exterior.",
  keywords:
    "software house, fábrica de software, desenvolvimento de sites, desenvolvimento de sistemas, criação de loja virtual, e-commerce, Shopify, Nuvemshop, Wix, consultoria tech, soluções digitais, custom software, web development, e-commerce development, ESC Software",
  ogImage: "/og-image.png",
  ogImageAlt: "ESC Software. We build the future: websites, custom systems and e-commerce.",
} as const;

export interface Localized {
  pt: string;
  en: string;
}

export const SCHEMA_COPY = {
  description: {
    pt: "A ESC é uma software house em São Paulo. Fazemos sites, sistemas sob medida, lojas virtuais, plataformas SaaS, sistemas de IA e projetos embarcados e IoT, para clientes no Brasil e no exterior.",
    en: "ESC is a software house in São Paulo, Brazil. It builds websites, custom systems, online stores, SaaS platforms, AI systems and embedded/IoT projects for clients in Brazil and abroad.",
  } satisfies Localized,
  slogan: "We build the future",
  catalogName: {
    pt: "Serviços da ESC Software",
    en: "ESC Software services",
  } satisfies Localized,
  founderJobTitle: { pt: "Fundador", en: "Founder" } satisfies Localized,
  knowsAbout: [
    "Desenvolvimento de software",
    "Software development",
    "Desenvolvimento de sites",
    "Website development",
    "E-commerce",
    "Shopify",
    "Nuvemshop",
    "Wix",
    "Sistemas sob medida",
    "Inteligência artificial",
    "Sistemas embarcados",
    "IoT",
    "SaaS",
  ],
  /** Same order as `content.services.areas`. */
  services: [
    {
      pt: {
        name: "Sites e plataformas web",
        description:
          "Sites institucionais, landing pages e plataformas web em React, Next.js e TypeScript, com SEO e foco em Core Web Vitals.",
      },
    },
    {
      pt: {
        name: "E-commerce e lojas virtuais",
        description:
          "Lojas virtuais com tema personalizado e integrações de pagamento, frete, estoque e ERP.",
      },
    },
    {
      pt: {
        name: "Sistemas sob medida e corporativos",
        description:
          "Sistemas sob medida e arquiteturas distribuídas (microsserviços, REST, GraphQL, ERP e dashboards) para operações críticas.",
      },
    },
    {
      pt: {
        name: "Sistemas embarcados e IoT",
        description:
          "Software para dispositivos e hardware em Embedded C, C++ e MQTT, com automação e processamento na borda.",
      },
    },
    {
      pt: {
        name: "Inteligência artificial",
        description:
          "Sistemas de IA para automação e previsão: machine learning, LLMs, NLP, visão computacional e RPA.",
      },
    },
  ],
} as const;
