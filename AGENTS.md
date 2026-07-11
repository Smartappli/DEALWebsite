# AGENTS.md

This repository is a static multilingual marketing site for the DEAL suite. Keep changes small, deterministic, and easy to review.

## Project shape

- Root `index.html` is the canonical English (`en-US`) page.
- Each language folder (`fr/`, `de/`, `nl/`, etc.) contains a committed static `index.html`.
- Shared styling source is `src/styles.css`.
- Built stylesheet output is `styles.css`.
- Localized copy source is `src/i18n-copy.json`.
- PWA and SEO assets live at the repository root and in `assets/`.

## Working rules

- Treat this as a static site, not an app framework project.
- Preserve the canonical English page structure across localized pages.
- When changing user-facing copy, check whether the same change must be reflected in:
  - `index.html`
  - localized `*/index.html` files
  - `src/i18n-copy.json`
  - SEO and machine-readable assets such as `llms.txt`, `humans.txt`, `site.webmanifest`, or `sitemap.xml`
- Do not introduce a build step beyond the existing Tailwind CSS workflow unless explicitly requested.
- Do not remove committed static outputs just because they are generated; this repo intentionally commits deployable artifacts.

## Commands

- Install dependencies: `npm ci`
- Build CSS: `npm run build`
- Watch CSS during editing: `npm run watch`
- Local preview: `python -m http.server 8080 --directory .`

## Validation

For style changes:

- Run `npm run build`
- Confirm `styles.css` updates as expected
- Smoke-test the homepage and one localized route

For content or metadata changes:

- Verify canonical URLs, `hreflang`, manifest references, and asset paths still resolve
- Check whether service worker or offline assets need matching updates

## Editing guidance

- Prefer targeted edits over broad reformatting of HTML files.
- Keep metadata, structured data, and social tags aligned with page content.
- Preserve offline/PWA behavior unless the task explicitly changes it.
- Preserve `.htaccess`, caching intent, and static hosting compatibility.

## Handoff notes

When finishing a task, report:

- which files changed
- whether built artifacts were updated
- which validation steps were run
- any localized pages or SEO assets that still need follow-up
