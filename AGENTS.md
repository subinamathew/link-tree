# AGENTS.md

## Mission

Build and maintain a privacy-first, static link-in-bio site from the contracts in this repository.

This file is authoritative for coding agents such as Antigravity, Codex, Claude Code, and similar tools.

## Non-negotiable architecture

1. Prefer static HTML and CSS. Production JavaScript is opt-in, not the default.
2. Use Eleventy (11ty) for static generation and Nunjucks for templates.
3. Use Sass/SCSS for styling. Compile to a single minified production CSS file.
4. Use Storybook with the HTML + Vite framework for component development.
5. Never introduce React/Vue/Svelte solely for component rendering.
6. Content must be data-driven and validated against a schema before build.
7. All visual constants must come from design tokens in `src/styles/tokens/`.
8. External embeds, analytics, trackers, remote fonts, and non-essential browser storage are forbidden by default.
9. Accessibility and performance are acceptance criteria, not optional enhancements.
10. Never place secrets, API keys, personal legal data, or production credentials in examples.

## Production runtime budget

- Client-side JavaScript: target 0 KB.
- If JS is necessary, each feature must justify itself in code comments and documentation.
- No framework hydration.
- No runtime dependency on Storybook.
- No remote font request; use a system font stack unless explicitly approved.
- Images must have explicit width/height and responsive `srcset`/sizes when applicable.
- Prefer AVIF/WebP plus a safe fallback where the pipeline supports it.

## Components

Required UI primitives:

- `ProfileHeader`
- `LinkButton`
- `ImageCardHorizontal`
- `ImageCardVertical`
- `VideoLinkCard`
- `SectionHeading`
- `FooterLegal`

Every component must:
- render valid semantic HTML;
- work without JavaScript;
- have focus-visible styles;
- meet WCAG 2.2 AA contrast for normal usage;
- have at least one Storybook story;
- expose only documented variants;
- avoid inline styles except for narrowly justified CSS custom-property values.

## Source/surface variants

The page can be rendered for a configurable source/surface. Initial values:

- `default`
- `instagram`
- `tiktok`
- `linkedin`
- `youtube`
- `custom:<slug>`

A content item may define `showOn` and `hideOn`. If both are omitted, it is shown everywhere.

Storybook must expose a global toolbar control named `surface` so stories can preview the same component under different source contexts.

Do not fork markup per surface unless there is a real semantic difference. Prefer design-token or class-level variation.

## Content item types

Supported initial item types:

- `link`
- `image-horizontal`
- `image-vertical`
- `video-link`

`video-link` means a normal outbound link card by default. Do not create a YouTube iframe in the default privacy profile.

## Privacy profiles

### strict (default)
- no analytics
- no pixels
- no third-party embeds
- no remote fonts
- no non-essential cookies
- no localStorage/sessionStorage
- no service-worker tracking or identifiers

### consented (future, explicit feature)
May allow privacy-impacting features only after an explicit product decision, legal review, and a consent implementation appropriate to the actual technology used.

Agents must never silently switch from `strict` to `consented`.

## Legal pages

Generate:
- `/impressum/`
- `/datenschutz/`

Keep personal/company legal data in a dedicated site config, not hard-coded into templates.

Do not claim that this repository guarantees legal compliance. Legal text must be reviewed for the actual operator, hosting setup, and enabled third-party services.

## CSS rules

- SCSS architecture: tokens -> base -> utilities -> components -> pages.
- Use CSS custom properties for runtime theme values.
- Use Sass variables/maps only for compile-time composition.
- Follow mobile-first responsive design.
- Prefer logical properties (`margin-inline`, `padding-block`) over physical equivalents.
- Avoid selector nesting deeper than 3 levels.
- Avoid `!important` except documented utility exceptions.
- No IDs for styling.
- No utility framework unless explicitly requested.
- Keep specificity low and predictable.
- Respect `prefers-reduced-motion`.
- Animations are optional and must not be required for comprehension.

## Storybook requirements

- Framework: `@storybook/html-vite`.
- Stories live beside components or in `src/stories/`.
- Add global toolbar control `surface`.
- Add backgrounds/theme controls only if they are token-driven.
- Accessibility addon is required.
- Viewport presets should include common narrow mobile widths.
- Stories must cover empty/long labels, portrait/landscape media, disabled/hidden states where relevant.

## Validation

A pull request is not complete until:

- production build succeeds;
- Storybook build succeeds;
- content schema validation succeeds;
- Sass compiles without warnings;
- HTML is semantically valid to the extent supported by CI tooling;
- no unexpected production JS bundles are emitted;
- Lighthouse/performance budget is not materially regressed;
- no third-party domains are introduced without being documented in `docs/PRIVACY-DEPENDENCIES.md`.

## Agent change protocol

Before changing architecture:
1. Read `README.md`, this file, `SKILLS.md`, and all documents under `docs/`.
2. Explain the reason in the PR description.
3. Update the relevant docs/schema/tests in the same change.
4. Preserve backward-compatible content when feasible.
5. Never invent legal identity information or publish placeholders as real data.

## Definition of done

The site can be built from a clean checkout, Storybook can render each component and surface variant, content can be changed without modifying templates, style changes can be made centrally through tokens, and the strict profile creates no avoidable consent-triggering third-party requests.
