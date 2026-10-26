# Antigravity Implementation Brief

Use this file as the starting brief when handing the repository to Antigravity or another coding agent.

## Objective

Implement the static link-in-bio application specified by this repository.

Read, in this order:
1. `AGENTS.md`
2. `SKILLS.md`
3. `docs/ARCHITECTURE.md`
4. `docs/CONTENT-MODEL.md`
5. `docs/STYLEGUIDE.md`
6. `docs/STORYBOOK.md`
7. `docs/LEGAL-PRIVACY-DE.md`
8. `docs/PRIVACY-DEPENDENCIES.md`

## Phase 1 — foundation

Create:
- package/build setup;
- Eleventy config;
- Sass pipeline;
- JSON Schema validation;
- base document/layout;
- Storybook HTML + Vite config;
- CI scripts for production build and Storybook build.

Do not add a client framework.

## Phase 2 — components

Implement:
- ProfileHeader
- LinkButton
- ImageCardHorizontal
- ImageCardVertical
- VideoLinkCard
- SectionHeading
- FooterLegal

Use semantic HTML and shared markup/rendering logic where practical.

## Phase 3 — data and surfaces

Implement:
- content loading;
- schema validation;
- `showOn` / `hideOn` filtering;
- build-time `LINKTREE_SURFACE`;
- Storybook global `surface` toolbar.

## Phase 4 — legal/privacy

Implement:
- Impressum route/template;
- Datenschutz route/template;
- operator config with explicit placeholders;
- strict mode with zero third-party initial-load requests;
- no YouTube/Instagram/TikTok iframe embeds.

Do not manufacture legal operator details.

## Phase 5 — quality

Add:
- accessibility checks;
- responsive stories;
- HTML/content validation;
- checks for accidental production JS;
- production build inspection;
- deployment config for Netlify and Cloudflare Pages.

## Definition of done

The implementation must satisfy the Definition of Done in `AGENTS.md` and must build both the production site and Storybook from a clean checkout.

If a requirement is ambiguous, choose the option that:
1. sends less data to third parties;
2. uses less production JavaScript;
3. keeps content/design configuration separate from markup;
4. improves accessibility;
5. preserves host portability.
