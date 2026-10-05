# SEO

What the project does for search engines and AI crawlers, where each piece lives and how to change it.

## What is generated

| Piece                            | Where it comes from                   | Notes                                                                   |
| -------------------------------- | ------------------------------------- | ----------------------------------------------------------------------- |
| `<title>`, description, keywords | `src/seo/copy.ts` → `src/seo/head.ts` | Title ≤ 70 characters and description ≤ 160, enforced by tests          |
| Canonical URL                    | `SITE.url` in `src/config/site.ts`    | `https://esc-software.com/`                                             |
| Open Graph and Twitter cards     | `src/seo/head.ts`                     | `og-image.png` is 1200×630 (checked by a test)                          |
| JSON-LD                          | `buildJsonLd()` in `src/seo/head.ts`  | See below                                                               |
| Favicons and manifest            | `public/` and `index.html`            | `.ico`, 16/32 PNG, Apple touch icon, 192/512 icons, SVG                 |
| `sitemap.xml`                    | `public/sitemap.xml`                  | Home page, with its image                                               |
| `robots.txt`                     | `public/robots.txt`                   | Allows everything, names the main AI crawlers and points to the sitemap |
| `llms.txt`, `llms-full.txt`      | `public/`                             | Plain-text summary for AI crawlers (`llm.txt` copies exist as aliases)  |
| Section anchors                  | `content.ids` in `src/content.ts`     | `#services`, `#clients`, `#process`, `#faq`, `#contact`                 |

## Language strategy

The page is in English. The text shown in search results and link previews (title, description and the descriptions inside the JSON-LD) is written for the audience that finds the site there, and the structured data carries both Portuguese (`pt-BR`) and English values through schema.org language-tagged strings. The visible FAQ is in English, so the `FAQPage` markup is in English too: structured data must match what visitors can see.

If you reuse the project for another language, edit `src/seo/copy.ts` and `src/content.ts`, and set `htmlLang` and `ogLocale` in `copy.ts`.

## Structured data

The JSON-LD is one `@graph` with entities linked by `@id`:

- **`ProfessionalService` and `SoftwareCompany`**: name, logo, description (pt-BR and en), founding year, email, phone (E.164), postal address, opening hours, languages, topics, social profiles (`sameAs`), area served, contact point and an **offer catalog** with one `Service` per entry in `content.services.areas`.
- **`Person`**: the founder, linked to the company with `founder` and `worksFor`.
- **`WebSite`** and **`WebPage`**: the site and the home page.
- **`FAQPage`**: built from `content.faq.items`, the exact questions and answers shown on the page.

`AggregateRating` and `Review` are **deliberately absent**: add them only when there are real, verifiable reviews, because search engines penalize invented ones.

The JSON-LD is serialized with `<` escaped as `<`, so content can never close the `<script>` tag. A test checks this.

## Keeping it consistent

A few tests protect the SEO output (`src/seo/head.test.ts`, `src/test/public-files.test.ts`). They verify that titles and descriptions stay within display limits, that the canonical and Open Graph URLs match, that the JSON-LD parses and links its entities, that the FAQ markup equals the visible FAQ, that the sitemap and `robots.txt` agree with `SITE.url`, and that every icon and image the head refers to exists.

When you change company data, edit `src/config/site.ts` once and the head, JSON-LD, footer and contact section all follow. Also update the static text files by hand: `public/sitemap.xml`, `public/robots.txt`, `public/llms.txt`, `public/llms-full.txt` and their `llm*.txt` copies (a test checks that the copies are identical).

## After deploying

1. Add the domain to [Google Search Console](https://search.google.com/search-console) (the DNS method also covers subdomains) and submit `https://<your-domain>/sitemap.xml`.
2. Add it to [Bing Webmaster Tools](https://www.bing.com/webmasters) (it can import from Search Console).
3. Test the structured data with the [Rich Results Test](https://search.google.com/test/rich-results) and the [Schema Markup Validator](https://validator.schema.org).
4. Check how a link looks when shared with an Open Graph debugger (for example the LinkedIn Post Inspector).
5. Run [PageSpeed Insights](https://pagespeed.web.dev) on the live URL.

## What the project cannot do for you

Ranking depends heavily on things outside the code: links from other reputable sites, real reviews, a Google Business Profile, listings in directories, and more content (case studies, guides) that matches what people search for. A single landing page can rank for only a handful of terms. Treat the code as a solid foundation and invest in those.
