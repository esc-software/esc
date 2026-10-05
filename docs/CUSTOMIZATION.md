# Customization

Where to change what, and a checklist for turning the project into your own site.

## Where things live

| I want to change…                                                                      | Edit                                                                       |
| -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| Company name, URL, email, phone, address, hours, social profiles, founder, client list | `src/config/site.ts`                                                       |
| Page text (hero, services, process, FAQ, contact, footer, chat labels)                 | `src/content.ts`                                                           |
| Title, descriptions, keywords, schema descriptions, Open Graph image alt               | `src/seo/copy.ts`                                                          |
| Which JSON-LD entities and fields are generated                                        | `src/seo/head.ts`                                                          |
| Colors, spacing tokens, shared component classes                                       | CSS variables and layers in `src/index.css`; theme in `tailwind.config.ts` |
| Fonts                                                                                  | `src/fonts.css` (and the Fontsource packages in `package.json`)            |
| Section layout and animation                                                           | `src/components/*.tsx`                                                     |
| The 404 page                                                                           | `src/pages/NotFound.tsx`                                                   |
| The offline page and game                                                              | `public/offline.html` (bump `CACHE` in `public/sw.js` after editing)       |
| Sitemap, robots, `llms.txt`, manifest, favicons, Open Graph image                      | `public/`                                                                  |

## Checklist for your own site

1. **Company data:** edit `src/config/site.ts`. Footer, contact section, head tags and JSON-LD follow automatically.
2. **Copy:** rewrite `src/content.ts` (services, process, FAQ, stats) and `src/seo/copy.ts`. Keep the title within 70 characters and the description within 160; the tests will tell you if you do not.
3. **Stats:** `hero.stats` in `src/content.ts` contains numbers from the original company. Replace them with your own real numbers. The "years" stat is computed from `SITE.foundingYear`.
4. **Brand assets:**
   - Replace `src/assets/esc-logo.svg` (hero, footer, 404) and `public/logo.svg` (square mark used by favicons and the offline page).
   - Regenerate the favicons (`favicon.ico`, `favicon-16.png`, `favicon-32.png`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`) and `og-image.png` (1200×630).
   - Remove `public/clients/*` and the `clients` list in `src/config/site.ts` unless you have permission to show those logos. Client logos are **not** covered by the MIT license.
   - `public/offline.html` embeds the logo path inline; replace it there too.
5. **Domain:** change `https://esc-software.com` in `src/config/site.ts`, `public/sitemap.xml`, `public/robots.txt`, `public/llms.txt`, `public/llms-full.txt` (and the two `llm*.txt` copies), and `package.json`.
6. **Analytics:** replace the measurement ID in the `gtag` block of `index.html`, or delete the block.
7. **Backends:** set `VITE_CONTACT_BASE_URL` and `VITE_CHATBOT_BASE_URL`, or remove `FloatingChat` from `src/pages/Index.tsx` and the form from `ContactSection` if you do not have them. See [ARCHITECTURE.md](ARCHITECTURE.md#backend-contracts).
8. **Social links:** footer links are defined at the top of `src/components/Footer.tsx`; profile URLs for the schema are in `src/config/site.ts`.
9. **Search Console, Bing Webmaster and structured data tests:** see [SEO.md](SEO.md#after-deploying).
10. Run `npm run check && npm run build` and open the site.

## Adding a section

1. Add its copy to `src/content.ts` (type and data) and an id to `content.ids`.
2. Create `src/components/<Name>Section.tsx` using `content` and give the `<section>` the id and an `aria-labelledby` pointing at its `<h2>`.
3. Add it to `src/pages/Index.tsx`.
4. Keep it SSR-safe: no `window` or `document` access during render, and no content that is hidden until JavaScript runs.
5. Add or update a test in `src/App.test.tsx` if it affects the page structure.

## Adding a page

The site currently has one page and a 404. To add more:

1. Create the page in `src/pages/`.
2. Teach `src/App.tsx` to choose it from the path (or add a router).
3. In `scripts/prerender.mjs`, render and write one HTML file per route (`dist/<route>/index.html`), each with its own head tags (`src/seo/head.ts`).
4. Add the URL to `public/sitemap.xml` and give the page its own title, description and canonical URL.
5. Make sure the host serves those paths (see [DEPLOYMENT.md](DEPLOYMENT.md)).
