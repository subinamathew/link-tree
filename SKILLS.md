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

## Skill: storybook-component

Use whenever a UI component or visual variant changes.

Rules:
- Storybook HTML + Vite;
- production markup must be the same markup rendered by the site templates where practical;
- Storybook decorators may preview contexts but must not hide production coupling;
- expose the global `surface` toolbar control.

Deliverables:
- stories covering core states;
- accessibility checks;
- responsive examples.

## Skill: sass-design-system

Use for all presentation work.

Rules:
- update tokens before scattering new values;
- semantic tokens are preferred over literal colors in components;
- new brand/styleguide inputs should primarily change token files, not component selectors;
- keep components themeable through CSS custom properties.

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

## Agent handoff checklist

When handing work to another agent, include:
- changed contracts;
- schema version;
- privacy impact;
- new external domains;
- new tokens;
- Storybook stories added/changed;
- migration or deployment actions.
