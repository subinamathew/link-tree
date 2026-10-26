# link-tree

A static-first, configurable link-in-bio website designed for fast loading, strong privacy defaults, Storyblok headless CMS integration with visual editing, and agent-assisted implementation.

> This repository is intentionally specification-first. The implementation contract lives in `AGENTS.md`, `SKILLS.md`, and `docs/`.

## Product goals

- Render an ordered list of any number of link/content cards.
- Support simple buttons, horizontal images, vertical/portrait images, and video-link cards.
- Support multiple source/surface variants such as `default`, `instagram`, `tiktok`, `linkedin`, and future custom values.
- Seamless headless content authoring and visual editing with Storyblok.
- Keep the production site static-first with Sass and minimal or zero client-side JavaScript.
- Deploy cleanly to Netlify or Cloudflare.
- Keep visual design changeable through centralized design tokens.
- Provide first-class Impressum, Datenschutz, copyright, accessibility, and privacy guardrails for a Germany/EU-oriented deployment.

## Recommended implementation stack

- Eleventy (11ty) for static generation.
- Nunjucks templates for reusable HTML components.
- Sass/SCSS compiled to one production stylesheet.
- Storyblok headless CMS (Content Delivery API & Visual Editor bridge).
- JSON or YAML content/config validated against a schema with local fallback.

See `docs/ARCHITECTURE.md` for the full implementation contract.

## Privacy baseline

The default profile must not require a cookie-consent banner: no analytics, no ad pixels, no remote fonts, no social widgets, no third-party embeds, and no non-essential storage. YouTube content is represented as a link card or locally hosted preview image by default. Enabling embeds or analytics is a separate privacy-impacting feature and must not silently occur.

## Status

Architecture/specification scaffold. Implementation should be done from an agent branch and validated against the acceptance criteria in `AGENTS.md`.
