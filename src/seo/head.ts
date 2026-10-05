import { SITE } from "@/config/site";
import { content } from "@/content";
import { SCHEMA_COPY, SEO, type Localized } from "./copy";

const abs = (path: string) => `${SITE.url}${path}`;

const escapeAttr = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const meta = (attr: "name" | "property", key: string, value: string) =>
  `<meta ${attr}="${key}" content="${escapeAttr(value)}" />`;

/** schema.org language-tagged value pair. */
const both = (v: Localized) => [
  { "@language": "pt-BR", "@value": v.pt },
  { "@language": "en", "@value": v.en },
];

const orgId = `${SITE.url}/#organization`;
const founderId = `${SITE.url}/#founder`;
const pageUrl = `${SITE.url}/`;

export const buildJsonLd = () => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["ProfessionalService", "SoftwareCompany"],
      "@id": orgId,
      name: SITE.name,
      alternateName: SITE.shortName,
      url: pageUrl,
      logo: { "@type": "ImageObject", url: abs("/icon-512.png"), width: 512, height: 512 },
      image: abs(SEO.ogImage),
      description: both(SCHEMA_COPY.description),
      slogan: SCHEMA_COPY.slogan,
      foundingDate: String(SITE.foundingYear),
      founder: { "@id": founderId },
      email: SITE.email,
      telephone: SITE.phoneE164,
      address: {
        "@type": "PostalAddress",
        streetAddress: SITE.address.street,
        addressLocality: SITE.address.city,
        addressRegion: SITE.address.region,
        postalCode: SITE.address.postalCode,
        addressCountry: SITE.address.country,
      },
      areaServed: [{ "@type": "Country", name: "Brazil" }, "Worldwide"],
      openingHoursSpecification: SITE.hours.map((h) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: h.days,
        opens: h.opens,
        closes: h.closes,
      })),
      knowsLanguage: ["pt-BR", "en", "es"],
      knowsAbout: SCHEMA_COPY.knowsAbout,
      sameAs: [SITE.social.instagram, SITE.social.linkedin],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        email: SITE.email,
        telephone: SITE.phoneE164,
        availableLanguage: ["Portuguese", "English", "Spanish"],
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: both(SCHEMA_COPY.catalogName),
        itemListElement: content.services.areas.map((area, i) => {
          const pt = SCHEMA_COPY.services[i].pt;
          return {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: both({ pt: pt.name, en: area.title }),
              description: both({ pt: pt.description, en: `${area.desc} ${area.extra}` }),
              serviceType: area.tags.join(", "),
              provider: { "@id": orgId },
              areaServed: "Worldwide",
            },
          };
        }),
      },
    },
    {
      "@type": "Person",
      "@id": founderId,
      name: SITE.founder.name,
      alternateName: SITE.founder.handle,
      jobTitle: both(SCHEMA_COPY.founderJobTitle),
      worksFor: { "@id": orgId },
      sameAs: SITE.founder.sameAs,
    },
    {
      "@type": "WebSite",
      "@id": `${SITE.url}/#website`,
      url: pageUrl,
      name: SITE.name,
      publisher: { "@id": orgId },
      inLanguage: "en",
    },
    {
      "@type": "WebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: SEO.title,
      description: SEO.description,
      inLanguage: "en",
      isPartOf: { "@id": `${SITE.url}/#website` },
      about: { "@id": orgId },
      primaryImageOfPage: abs(SEO.ogImage),
    },
    {
      // Matches the FAQ shown on the page, which is in English.
      "@type": "FAQPage",
      "@id": `${pageUrl}#faq`,
      inLanguage: "en",
      mainEntity: content.faq.items.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ],
});

/** <head> markup injected at prerender time. */
export const buildHead = () => {
  const jsonLd = JSON.stringify(buildJsonLd(), null, 2).replace(/</g, "\\u003c");
  const image = abs(SEO.ogImage);

  return [
    `<title>${escapeAttr(SEO.title)}</title>`,
    meta("name", "description", SEO.description),
    meta("name", "keywords", SEO.keywords),
    meta("name", "author", SITE.name),
    `<link rel="canonical" href="${pageUrl}" />`,
    meta("property", "og:type", "website"),
    meta("property", "og:site_name", SITE.name),
    meta("property", "og:locale", SEO.ogLocale),
    meta("property", "og:locale:alternate", SEO.ogLocaleAlternate),
    meta("property", "og:title", SEO.title),
    meta("property", "og:description", SEO.ogDescription),
    meta("property", "og:url", pageUrl),
    meta("property", "og:image", image),
    meta("property", "og:image:secure_url", image),
    meta("property", "og:image:type", "image/png"),
    meta("property", "og:image:width", "1200"),
    meta("property", "og:image:height", "630"),
    meta("property", "og:image:alt", SEO.ogImageAlt),
    meta("name", "twitter:card", "summary_large_image"),
    meta("name", "twitter:title", SEO.title),
    meta("name", "twitter:description", SEO.twitterDescription),
    meta("name", "twitter:image", image),
    meta("name", "twitter:image:alt", SEO.ogImageAlt),
    `<script type="application/ld+json">\n${jsonLd}\n</script>`,
  ].join("\n    ");
};

/** <head> markup for the 404 page: not indexable, no canonical. */
export const buildNotFoundHead = () =>
  [
    `<title>Page not found | ${escapeAttr(SITE.name)}</title>`,
    meta("name", "description", "This page does not exist or was moved."),
    meta("name", "author", SITE.name),
  ].join("\n    ");
