# DEAL public website

Static Progressive Web App for presenting DEALIoT, DEALHost and DEALData.

## Public Repositories

- DEALIoT: https://github.com/Smartappli/DEALIoT
- DEALHost: https://github.com/Smartappli/DEALHost
- DEALData: https://github.com/Smartappli/DEALData

## Local preview

```bash
python -m http.server 8080 --directory .
```

Open `http://localhost:8080`.

## Styling

The site uses Tailwind CSS CLI to compile `src/styles.css` into the static `styles.css` file served by GitHub Pages.

```bash
npm ci
npm run build
```

Use `npm run watch` while editing styles locally.

## Languages

- Default language: English US at `/`.
- All 24 official EU languages are available as static localized routes.
- `sitemap.xml` and page headers expose `hreflang` alternates.
- Localized page copy is maintained in `src/i18n-copy.json`.
- Localized pages are generated from the English canonical page and committed as static `index.html` files for each language route.

## PWA Assets

The website ships with:

- `site.webmanifest`: app identity, icons, shortcuts, language and display mode.
- `sw.js`: service worker with static asset caching and offline fallback.
- `offline.html`: offline fallback for failed navigation requests.
- `assets/icon-192.png`: install icon.
- `assets/icon-512.png`: high-resolution install icon.
- `assets/icon-maskable-512.png`: maskable install icon.

## SEO And GEO Assets

The public website ships with:

- `index.html`: default English canonical page, Open Graph, Twitter Card and schema.org JSON-LD.
- `fr/index.html` and every EU language route: localized page with its own canonical URL and `hreflang` alternates.
- `robots.txt`: crawler access plus sitemap discovery.
- `sitemap.xml`: canonical `smartappli.io` URLs and EU language alternates.
- `llms.txt`: concise machine-readable context for generative engines and AI agents.
- `humans.txt`: maintainer and repository reference.
- `assets/social-card.png`: primary 1200x630 social preview image for link sharing.
- `assets/social-card.svg`: editable vector source for the social preview.
- `.htaccess`: Apache cache, compression and security headers for non-GitHub Pages hosting.

`llms.txt` is included as helpful machine-readable guidance. It should not be treated as a guaranteed ranking factor.

## Performance And Caching

- HTML, `sw.js` and `site.webmanifest` are configured for revalidation.
- Versioned `styles.css` and `app.js` URLs can be cached for one year.
- The canonical and localized pages inline critical above-the-fold CSS, then load Google Fonts and the full stylesheet asynchronously to reduce render-blocking requests.
- Images, SVG icons and social cards are cached as immutable static assets.
- Text metadata files such as `robots.txt`, `sitemap.xml`, `humans.txt` and `llms.txt` use a one-day cache.
- `node_modules/` is intentionally committed in this repository to mirror the transferred website workspace exactly.

## Deployment

The website is externalized on `smartappli.io`. The repository is ready to be published as a static site from the repository root or through a GitHub Pages workflow.
