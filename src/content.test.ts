import { describe, expect, it } from "vitest";
import { SITE } from "@/config/site";
import { content } from "./content";

describe("page content", () => {
  it("uses unique section ids", () => {
    const ids = Object.values(content.ids);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("computes the years of activity from the founding year", () => {
    const years = content.hero.stats.find((s) => s.label.startsWith("Years"));
    expect(years?.end).toBe(new Date().getFullYear() - SITE.foundingYear);
    expect(years?.end).toBeGreaterThan(0);
  });

  it("gives every stat a positive number", () => {
    for (const s of content.hero.stats) expect(s.end).toBeGreaterThan(0);
  });

  it("describes every service completely", () => {
    for (const area of content.services.areas) {
      expect(area.title).toBeTruthy();
      expect(area.desc).toBeTruthy();
      expect(area.tags.length).toBeGreaterThan(0);
      // A stat needs its label and vice versa.
      expect(Boolean(area.stat)).toBe(Boolean(area.statLabel));
    }
  });

  it("has four numbered phases in the process", () => {
    expect(content.process.steps).toHaveLength(4);
    for (const step of content.process.steps) expect(step.deliverables.length).toBeGreaterThan(0);
  });

  it("has a question and an answer for every FAQ entry", () => {
    expect(content.faq.items.length).toBeGreaterThan(0);
    for (const item of content.faq.items) {
      expect(item.q.trim().endsWith("?")).toBe(true);
      expect(item.a.length).toBeGreaterThan(10);
    }
  });

  it("highlights text with balanced asterisks in the hero lead", () => {
    const asterisks = content.hero.lead.split("*").length - 1;
    expect(asterisks % 2).toBe(0);
  });
});
