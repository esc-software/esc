import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { SITE, withUtm } from "@/config/site";

const publicDir = path.resolve(__dirname, "../../public");
const read = (file: string) => readFileSync(path.join(publicDir, file), "utf-8");

describe("static files in public/", () => {
  it("lists the home page in the sitemap", () => {
    expect(read("sitemap.xml")).toContain(`<loc>${SITE.url}/</loc>`);
  });

  it("allows crawling and points robots.txt to the sitemap", () => {
    const robots = read("robots.txt");
    expect(robots).toMatch(/User-agent: \*\s+Allow: \//);
    expect(robots).toContain(`Sitemap: ${SITE.url}/sitemap.xml`);
  });

  it("ships the llms.txt files and their llm.txt aliases", () => {
    for (const file of ["llms.txt", "llms-full.txt", "llm.txt", "llm-full.txt"]) {
      expect(existsSync(path.join(publicDir, file))).toBe(true);
    }
    expect(read("llms.txt")).toBe(read("llm.txt"));
    expect(read("llms-full.txt")).toBe(read("llm-full.txt"));
    expect(read("llms.txt")).toContain(SITE.email);
  });

  it("has a web manifest whose icons exist", () => {
    const manifest = JSON.parse(read("site.webmanifest"));
    expect(manifest.icons.length).toBeGreaterThan(0);
    for (const icon of manifest.icons) {
      expect(existsSync(path.join(publicDir, icon.src.replace(/^\//, "")))).toBe(true);
    }
  });

  it("has a 1200x630 Open Graph image", () => {
    const png = readFileSync(path.join(publicDir, "og-image.png"));
    expect(png.subarray(1, 4).toString()).toBe("PNG");
    expect(png.readUInt32BE(16)).toBe(1200);
    expect(png.readUInt32BE(20)).toBe(630);
  });

  it("has every favicon the head references", () => {
    for (const file of [
      "favicon.ico",
      "favicon-16.png",
      "favicon-32.png",
      "apple-touch-icon.png",
      "icon-192.png",
      "icon-512.png",
      "logo.svg",
    ]) {
      expect(existsSync(path.join(publicDir, file))).toBe(true);
    }
  });

  it("has the logo of every client", () => {
    for (const client of SITE.clients) {
      expect(existsSync(path.join(publicDir, client.logo.replace(/^\//, "")))).toBe(true);
    }
  });
});

describe("offline page and service worker", () => {
  it("keeps the offline page out of search results", () => {
    expect(read("offline.html")).toContain('name="robots" content="noindex, nofollow"');
  });

  it("caches the offline page and serves it only for navigations", () => {
    const sw = read("sw.js");
    expect(sw).toContain('const OFFLINE_URL = "/offline.html"');
    expect(sw).toContain('request.mode !== "navigate"');
  });

  it("does not list the offline page in the sitemap", () => {
    expect(read("sitemap.xml")).not.toContain("offline");
  });
});

describe("site config", () => {
  it("adds UTM parameters to outbound links", () => {
    expect(withUtm("https://example.com", "footer")).toBe(
      "https://example.com?utm_source=esc_software&utm_medium=referral&utm_campaign=footer",
    );
  });

  it("uses a valid E.164 phone number", () => {
    expect(SITE.phoneE164).toMatch(/^\+\d{10,15}$/);
  });

  it("gives every client explicit image dimensions", () => {
    for (const client of SITE.clients) {
      expect(client.width).toBeGreaterThan(0);
      expect(client.height).toBeGreaterThan(0);
    }
  });
});
