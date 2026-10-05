import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import App from "./App";
import { content } from "./content";
import { renderNotFound, renderPage } from "./entry-server";

const count = (html: string, pattern: RegExp) => (html.match(pattern) ?? []).length;

describe("home page", () => {
  const html = renderToString(<App pathname="/" />);

  it("has exactly one h1", () => {
    expect(count(html, /<h1[\s>]/g)).toBe(1);
  });

  it("renders every section with its anchor id", () => {
    for (const id of Object.values(content.ids)) {
      expect(html).toContain(`id="${id}"`);
    }
  });

  it("renders the hero text without hiding it, so it is visible before hydration", () => {
    expect(html).toMatch(/<span[^>]*style="opacity:1[^"]*"[^>]*>We Build<\/span>/);
  });

  it("renders every FAQ answer, even when collapsed", () => {
    for (const item of content.faq.items) {
      expect(html).toContain(item.a.replace(/'/g, "&#x27;"));
    }
  });

  it("serves the same page for /index.html", () => {
    expect(renderToString(<App pathname="/index.html" />)).toBe(html);
  });

  it("gives every image an alt attribute (empty only for decorative duplicates)", () => {
    const withoutAlt = count(html, /<img(?![^>]*\balt=)[^>]*>/g);
    expect(withoutAlt).toBe(0);
  });
});

describe("404 page", () => {
  it("is rendered for any other path", () => {
    const html = renderToString(<App pathname="/does-not-exist" />);
    expect(html).toContain("Not Found");
    expect(count(html, /<h1[\s>]/g)).toBe(1);
  });

  it("links back to the home page", () => {
    expect(renderNotFound().html).toContain('href="/"');
  });
});

describe("prerender entry", () => {
  it("returns markup, head tags and the document language", () => {
    const page = renderPage();
    expect(page.html.length).toBeGreaterThan(1000);
    expect(page.head).toContain("<title>");
    expect(page.htmlLang).toBe("en");
  });
});
