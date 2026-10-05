# Security policy

## Supported versions

Only the latest version on the `main` branch (the one deployed at [esc-software.com](https://esc-software.com)) receives security fixes.

## Reporting a vulnerability

**Please do not open a public issue for a security problem.**

Report it privately by email to **hello@esc-software.com** with the subject `Security: <short summary>`. If you use GitHub, you can also open a [private security advisory](https://github.com/esc-software/esc/security/advisories/new).

Include, when you can:

- a description of the problem and its impact;
- steps to reproduce, or a proof of concept;
- the affected URL, file or commit;
- your name or handle if you would like to be credited.

What to expect: we aim to acknowledge your report within **5 business days**, keep you informed while we investigate, and credit you in the fix unless you prefer to stay anonymous. Please give us a reasonable time to fix the problem before disclosing it.

## Scope

In scope: the code in this repository and the site built from it.

Out of scope: the third-party services the site talks to (Google Tag Manager, Google Fonts for the icon font, and the contact and chat backends configured through environment variables, which live outside this repository), and social engineering, denial-of-service or physical attacks.

## Notes for people who deploy this project

- **`VITE_*` variables are public.** Vite inlines them into the JavaScript bundle. Never put a secret in them; point them to endpoints that are safe to expose and protect those endpoints on the server side (validation, rate limiting, CORS).
- **Dependencies:** production dependencies currently have no known vulnerabilities (`npm audit --omit=dev`). `npm audit` still reports advisories in `braces`, `micromatch` and `chokidar`, reached only through Tailwind CSS 3 at **build time**; they are not part of the shipped site and are not reachable from untrusted input. They go away when the project moves to Tailwind CSS 4.
- **Dependabot** is enabled to keep dependencies current.
