# Changelog

All notable changes to this project are documented here. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and the project uses [Semantic Versioning](https://semver.org/).

## [1.0.0] - 2026-10-05

First public release.

### Added

- Single-page site with hero, clients, services, process, FAQ and contact sections, plus a floating chat widget.
- Build-time prerendering: `index.html` and `404.html` are rendered from an SSR bundle and hydrated in the browser.
- Technical SEO: title and description, Open Graph and Twitter cards, canonical URL, favicons, web manifest, JSON-LD (company, founder, website, page, FAQ, offer catalog, opening hours), `sitemap.xml`, `robots.txt`, `llms.txt` and `llms-full.txt`.
- Offline page with a black and white snake game, served by a service worker that only handles failed navigations.
- Themed 404 page with a real `404` status, `noindex` and the custom cursor.
- Self-hosted variable fonts (Montserrat, Inter Tight, Google Sans Code) with preload, inlined CSS and deferred analytics.
- Vitest suite for the SEO output, page structure and public files.
- Documentation, contribution guide, Code of Conduct, security policy, CI workflow, Dependabot and issue and pull request templates.
- Dockerfile with nginx, `docker-compose.yml` and a Render blueprint.

### Changed

- Strict TypeScript and a stricter ESLint configuration.
- Routing reduced to a path check (the site has one page plus a 404), which removed the `react-router-dom` dependency.
- Vite 7 and Vitest 5.

### Removed

- Unused shadcn/ui components and the dependencies that only they used.
- Dead code: unused hooks, helpers, styles and assets.

[1.0.0]: https://github.com/esc-software/esc/releases/tag/v1.0.0
