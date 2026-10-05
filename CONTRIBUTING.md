# Contributing

Thanks for taking the time to contribute. This guide explains how to set the project up, what we expect from a change and how to get it merged.

By participating you agree to follow the [Code of Conduct](CODE_OF_CONDUCT.md).

## Ways to contribute

- **Report a bug** or a problem with the published site: open an issue with the bug report template.
- **Suggest an improvement:** open an issue with the feature request template and describe the problem before the solution.
- **Fix something or add a feature:** open a pull request. For anything bigger than a small fix, open an issue first so we can agree on the approach.
- **Improve the docs:** typos, unclear steps and missing explanations are all welcome.
- **Security problems:** do not open a public issue. Follow [SECURITY.md](SECURITY.md).

## Development setup

You need **Node.js 20 or newer** and npm.

```bash
git clone https://github.com/<your-user>/esc.git
cd esc
npm install
npm run dev        # http://localhost:3000
```

Create a branch from `main` for your work, for example `fix/faq-aria` or `feat/projects-page`.

## Before you open a pull request

Run the same gate that CI runs:

```bash
npm run check      # typecheck + lint + format check + tests
npm run build      # the production build must succeed
```

If something fails on formatting, `npm run format` fixes it.

Checklist:

- [ ] `npm run check` and `npm run build` pass.
- [ ] New behavior has a test. SEO output, page structure and files in `public/` are covered by tests; keep that coverage when you change them.
- [ ] The change does not make the page worse for users: no layout shift, no content hidden until JavaScript runs, no new request in the critical path. See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).
- [ ] Visual changes include before and after screenshots in the pull request.
- [ ] Docs are updated when behavior, scripts or configuration change.

## Code style

- **TypeScript is strict.** Avoid `any`; prefer small, typed modules.
- **Formatting is automatic.** Prettier decides (`.prettierrc`). Do not hand-format.
- **Page copy lives in `src/content.ts`**, company data in `src/config/site.ts` and SEO text in `src/seo/copy.ts`. Do not hard-code text in components.
- **Components are small and typed.** Use the existing design tokens (CSS variables in `src/index.css`, Tailwind theme in `tailwind.config.ts`) instead of new ad hoc colors.
- **Comments explain why**, not what. The code should read clearly without a comment describing each line.
- **Accessibility is part of "done":** semantic elements, labelled controls, visible focus and text contrast of at least 4.5:1.

## Commit messages

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```text
feat: add a projects page
fix: keep the FAQ answers in the prerendered HTML
docs: explain how the prerender step works
perf: preload the hero font
test: cover the offline service worker
refactor: split the head builder
chore: update dependencies
```

Write the subject in the imperative, keep it under about 72 characters and use the body to explain the motivation when it is not obvious.

## Pull request process

1. Fork the repository and create your branch from `main`.
2. Make focused commits; keep unrelated changes in separate pull requests.
3. Fill in the pull request template.
4. A maintainer reviews it. Expect questions or requests for changes; they are about the code, not about you.
5. Once CI is green and the review is approved, a maintainer merges it.

## License

By contributing you agree that your contributions are licensed under the [MIT License](LICENSE). The ESC name, logo and client logos are not part of that license (see [BRANDING.md](BRANDING.md)).
