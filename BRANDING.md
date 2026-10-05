# Branding and third-party assets

The source code of this repository is licensed under the [MIT License](LICENSE). The license covers the code, the documentation and the build configuration.

It does **not** cover the following, which are included only so the website works as published:

| Asset                                                                                                                                                             | Where                    | Owner                  |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ | ---------------------- |
| The ESC name and the ESC logo, in every form (`src/assets/esc-logo.svg`, `public/logo.svg`, favicons, `og-image.png`, the logo embedded in `public/offline.html`) | `src/assets/`, `public/` | ESC Software           |
| Client logos (LAET, DOPE, ETO, UNG)                                                                                                                               | `public/clients/`        | The respective clients |

## If you reuse this project

- Replace the ESC name, logo, favicons and Open Graph image with your own. A checklist is in [docs/CUSTOMIZATION.md](docs/CUSTOMIZATION.md).
- Remove `public/clients/` and the `clients` list in `src/config/site.ts`, or add logos you have permission to display.
- Replace the company data in `src/config/site.ts` (name, email, phone, address, opening hours, social profiles) and the statistics in `src/content.ts`.
- Do not present a copy of the site as ESC Software or imply any affiliation with it.

## Questions

Write to **hello@esc-software.com**.
