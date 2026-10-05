import { describe, expect, it } from "vitest";
import { SITE } from "@/config/site";
import { content } from "@/content";
import { SCHEMA_COPY, SEO } from "./copy";
import { buildHead, buildJsonLd, buildNotFoundHead } from "./head";

type Node = Record<string, unknown> & { "@type": string | string[]; "@id"?: string };

const graph = () => (buildJsonLd()["@graph"] as Node[]) ?? [];
const byType = (type: string) =>
  graph().find((n) =>
    Array.isArray(n["@type"]) ? n["@type"].includes(type) : n["@type"] === type,
  );

describe("meta tags", () => {
  const head = buildHead();

  it("keeps the title and description within what search engines display", () => {
    expect(SEO.title.length).toBeLessThanOrEqual(70);
    expect(SEO.description.length).toBeLessThanOrEqual(160);
    expect(SEO.ogDescription.length).toBeLessThanOrEqual(200);
  });

  it("escapes HTML in attribute values and in the title", () => {
    expect(head).toContain("<title>ESC Software | Websites, Custom Systems &amp; E-commerce");
    expect(head).not.toMatch(/content="[^"]*&(?!amp;|quot;|lt;|gt;)/);
  });

  it("points the canonical URL and Open Graph URL to the home page", () => {
    expect(head).toContain(`<link rel="canonical" href="${SITE.url}/" />`);
    expect(head).toContain(`property="og:url" content="${SITE.url}/"`);
  });

  it("uses an absolute 1200x630 Open Graph image", () => {
    expect(head).toContain(`property="og:image" content="${SITE.url}${SEO.ogImage}"`);
    expect(head).toContain('property="og:image:width" content="1200"');
    expect(head).toContain('property="og:image:height" content="630"');
    expect(head).toContain('name="twitter:card" content="summary_large_image"');
  });

  it("does not block indexing of the home page", () => {
    expect(head).not.toMatch(/noindex/i);
  });

  it("never lets JSON-LD close its own script tag", () => {
    const script = head.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
    expect(script).not.toBeNull();
    expect(script![1]).not.toContain("</");
    expect(() => JSON.parse(script![1])).not.toThrow();
  });
});

describe("404 head", () => {
  it("has a title and no canonical URL", () => {
    const head = buildNotFoundHead();
    expect(head).toContain("<title>Page not found | ESC Software</title>");
    expect(head).not.toContain("canonical");
  });
});

describe("JSON-LD", () => {
  it("describes the company with contact data and address from the site config", () => {
    const org = byType("SoftwareCompany")!;
    expect(org).toBeDefined();
    expect(org.url).toBe(`${SITE.url}/`);
    expect(org.telephone).toMatch(/^\+\d{10,15}$/);
    expect(org.email).toBe(SITE.email);
    expect(org.address).toMatchObject({
      "@type": "PostalAddress",
      postalCode: SITE.address.postalCode,
      addressCountry: "BR",
    });
  });

  it("lists every service in the offer catalog, in Portuguese and English", () => {
    const org = byType("SoftwareCompany")!;
    const items = (org.hasOfferCatalog as { itemListElement: unknown[] }).itemListElement;
    expect(items).toHaveLength(content.services.areas.length);
    expect(SCHEMA_COPY.services).toHaveLength(content.services.areas.length);
    const first = (
      items[0] as { itemOffered: { name: { "@language": string }[] } }
    ).itemOffered.name.map((n) => n["@language"]);
    expect(first).toEqual(["pt-BR", "en"]);
  });

  it("publishes opening hours that close after they open", () => {
    const org = byType("SoftwareCompany")!;
    const hours = org.openingHoursSpecification as { opens: string; closes: string }[];
    expect(hours.length).toBeGreaterThan(0);
    for (const h of hours) expect(h.opens < h.closes).toBe(true);
  });

  it("only links social profiles over https", () => {
    const org = byType("SoftwareCompany")!;
    const person = byType("Person")!;
    for (const url of [...(org.sameAs as string[]), ...(person.sameAs as string[])]) {
      expect(url).toMatch(/^https:\/\//);
    }
  });

  it("marks up the same FAQ that the page shows", () => {
    const faq = byType("FAQPage")!;
    const questions = (faq.mainEntity as { name: string }[]).map((q) => q.name);
    expect(questions).toEqual(content.faq.items.map((i) => i.q));
  });

  it("links the entities of the graph to each other by @id", () => {
    const ids = new Set(graph().map((n) => n["@id"]));
    expect(ids.has(`${SITE.url}/#organization`)).toBe(true);
    expect(ids.has(`${SITE.url}/#founder`)).toBe(true);
    expect(byType("Person")!.worksFor).toEqual({ "@id": `${SITE.url}/#organization` });
  });
});
