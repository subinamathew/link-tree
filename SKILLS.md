# SKILLS.md

This file describes the capabilities an implementation agent should use and the boundaries it must respect.

## Skill: static-site-architecture

Use when creating or changing page structure, routing, layouts, or build behavior.

Rules:
- favor generated HTML over runtime rendering;
- preserve zero-JS output unless a feature requires JS;
- keep deployment portable between Netlify and Cloudflare;
- do not couple content to a hosting provider.

Deliverables:
- Eleventy config;
- layouts/partials/components;
- predictable output in `_site/`.

## Skill: content-schema

Use when adding or modifying profile data, links, media cards, surfaces, or display rules.

Rules:
- schema-first;
- validate build input;
- reject unknown item types unless intentionally versioned;
- treat all authored HTML as untrusted unless explicitly sanitized.

Deliverables:
- schema file;
- example content;
- validation script/tests;
- migration notes for breaking changes.

## Skill: storyblok-component

Use whenever a UI component or visual variant changes.

Rules:
- Storyblok blok schemas in `storyblok/components.json`;
- production markup must be the same markup rendered by the site templates;
- components support Storyblok `_editable` attributes for visual click-to-edit selection;
- expose surface and variant options in the blok schema.

Deliverables:
- updated `storyblok/components.json`;
- Nunjucks component template with Storyblok compatibility;
- accessibility and responsive verification.

## Skill: sass-design-system

Use for all presentation work.

Rules:
- update tokens before scattering new values;
- semantic tokens are preferred over literal colors in components;
- new brand/styleguide inputs should primarily change token files, not component selectors;
- keep components themeable through CSS custom properties;
- strict adherence to brand colors: never change colors based on URL parameters, surfaces, or sublinks. Brand identity and action colors must remain unified and consistent across all pages and views.

Deliverables:
- token updates;
- component SCSS;
- styleguide notes if a new token is introduced.

## Skill: privacy-review

Use whenever adding analytics, embeds, forms, external assets, CDNs, scripts, storage, or third-party network requests.

Rules:
- strict privacy profile remains default;
- document every new external domain and purpose;
- do not add consent banners merely as decoration;
- if a feature would likely require consent, keep it disabled until the consent architecture is deliberately implemented.

Deliverables:
- update `docs/PRIVACY-DEPENDENCIES.md`;
- update legal/privacy implementation notes;
- tests or build checks where feasible.

## Skill: germany-legal-page-integration

Use to implement the legal-page templates and operator-config structure.

Rules:
- do not fabricate legal details;
- keep operator identity/contact data in configuration;
- use stable routes `/impressum/` and `/datenschutz/`;
- legal copy is an operator responsibility and must be reviewed for the real deployment.

Deliverables:
- templates;
- data placeholders clearly marked as placeholders;
- no fake names/addresses.

## Skill: performance-review

Use for images, fonts, CSS, JS, embeds, and deployment changes.

Rules:
- system fonts by default;
- responsive local images;
- lazy-load below-the-fold media;
- avoid layout shifts;
- avoid unnecessary preloads;
- production JS target remains 0 KB.

Deliverables:
- bundle/build inspection;
- documented exceptions.

## Skill: deployment

Use for Netlify or Cloudflare deployment configuration.

Rules:
- static output only;
- no provider-specific runtime requirement unless approved;
- security headers should be conservative and documented;
- preview deployments must not expose secrets.

Deliverables:
- `netlify.toml` and/or Cloudflare Pages instructions;
- caching/header rules;
- documented build command and output directory.

## Skill: surface-routing-and-switching

Use when configuring or modifying surfaces, localized city routes, channel targeting, or test preview environments.

Rules:
- Standard surface shortcuts and canonical routes:
  - `<domain>/ig` and `<domain>/instagram` -> switch `instagram`
  - `<domain>/wob` and `<domain>/wolfsburg` -> switch `wolfsburg`
  - `<domain>/gf` and `<domain>/gifhorn` -> switch `gifhorn`
  - `<domain>/he` and `<domain>/helmstedt` (including `/Helmstedt`) -> switch `helmstedt`
- Default behavior:
  - Surface-specific buttons and items (`showOn: ['gifhorn']`, `showOn: ['wolfsburg']`, etc.) must NOT be shown on the default route (`/`).
  - Only general/universal links without `showOn` restrictions or with `default` are visible on `/`.
- Test preview switcher:
  - The interactive switcher toolbar (`.surface-switcher`) is ONLY rendered on `/test` (`/test/index.html`).
  - Production landing routes (`/`, `/gf`, `/wob`, etc.) must remain uncluttered and show only the final tailored link list without the test toolbar.
- Client-side & query parameter fallback:
  - URL parameters (`?surface=<slug>` and `?switch=<slug>`) work dynamically across all pages via `surface-switcher.js`.
- Brand color preservation:
  - Surfaces, routes, and URL parameters strictly control content filtering/targeting only; they must NEVER change brand colors, button styles, or theme tokens. All surfaces, sublinks, and routes retain the canonical brand colors.

Deliverables:
- `src/_data/surfaces.js` route definitions;
- `src/content/surfaces.njk` static multi-route pagination;
- `src/content/test.njk` test preview route;
- `src/assets/js/surface-switcher.js` path and query parameter handler;
- `content.schema.json` surface pattern updates;
- adherence to canonical brand tokens (no surface color overrides).

## Agent handoff checklist

When handing work to another agent, include:
- changed contracts;
- schema version;
- privacy impact;
- new external domains;
- new tokens;
- Storyblok component schemas added/changed;
- migration or deployment actions.
