# AGENTS.md

## Mission

Build and maintain a privacy-first, static link-in-bio site from the contracts in this repository.

This file is authoritative for all coding agents including **Antigravity**, **Claude Code**, **GitHub Copilot**, **ChatGPT**, **Codex**, and related LLM agent tooling.

---

## 1. Authoritative Echo Kirche Styleguide

All agents must strictly follow the official **Echo Kirche** design system:

### 1.1 Spacing & Logo Clear Space (*Schutzzone*)
* **Logo Clear Space:** Maintain a minimum clear buffer around all four sides of the logo equal to the **height/width of the lowercase letter `"e"`** from the *echo* wordmark. No text, buttons, borders, or other graphics may enter this zone.
* **Logo Integrity:** Never stretch, compress, rotate, distort, or alter the proportions of the logo. Never recolor the logo outside approved brand colors.
* **Inverted Applications:** High-contrast white (`#FFFFFF`) logo is strictly used on dark mode or full-bleed Dark Teal Blue (`#08415C`) / Muted Lavender (`#846B8A`) backgrounds.

### 1.2 Typography, Sizes & Hierarchy
* **Headings & Logo Font:** `Clash Display`
  * **Semibold (600)** for main headings and the word *echo*.
  * **Regular (400)** for sub-brand/location qualifiers (such as *kids* in *echo kids*).
* **Body, Buttons & Links Font:** `Inter` — **Regular (400)**.
* **Optional Digital Accent Fonts** (for special banners or highlights): `Perandory Condensed` (headlines) and `Sloop Script Pro` (script accents/subheadings).

#### Exact Pixel Hierarchy & Linktree Usage

| Element | Font | Weight | Digital Size | Linktree Clone Usage |
| :--- | :--- | :--- | :--- | :--- |
| **H1** | Clash Display | Semibold (600) | **48px** (`3rem`) | Main page title (if used) |
| **H2** | Clash Display | Semibold (600) | **40px** (`2.5rem`) | Major section headers |
| **H3** | Clash Display | Semibold (600) | **32px** (`2rem`) | Subsections |
| **H4** | Clash Display | Semibold (600) | **24px** (`1.5rem`) | Profile title / sub-brand header |
| **H5** | Clash Display | Semibold (600) | **20px** (`1.25rem`) | Cards, panels, and link buttons |
| **H6** | Clash Display | Semibold (600) | **18px** (`1.125rem`) | Small headings |
| **Body Large** | Inter | Regular (400) | **18px** (`1.125rem`) | Bio intro text or large body copy |
| **Body** | Inter | Regular (400) | **16px** (`1rem`) | Standard bio/description text |
| **Body Small** | Inter | Regular (400) | **14px** (`0.875rem`) | Secondary link descriptions |
| **Caption** | Inter | Regular (400) | **12px** (`0.75rem`) | Image captions / footer notes |
| **Overline / Label** | Inter | Regular (400) | **10px–11px** (`0.625rem–0.6875rem`) | Tags, badges, category labels |

### 1.3 Colors & Contrast Rules
* **Page Background:** Light Pastel Yellow (`#FEFADC`) — designated for soft backgrounds (`rgb(254, 250, 220)`). *(Muted Lavender `#846B8A` or Dark Teal Blue `#08415C` can also be used as full-bleed backgrounds with inverted white `#FFFFFF` or Light Pastel Yellow `#FEFADC` text/logos.)*
* **Primary Text & Dark Accents / Buttons:** Dark Teal Blue (`#08415C`, `rgb(8, 65, 92)`).
* **Secondary Accents / Hover States:** Muted Lavender (`#846B8A`, `rgb(132, 107, 138)`).
* **Brand Color Constancy Invariant:** Brand colors must **never** change based on URL parameters, surfaces, campus routes (`/gf`, `/wob`, `/he`), or sublinks. City switches and surfaces filter content visibility only; they never alter brand identity or action colors.

### 1.4 Images & Media Specs (Avatars / Banners)
* **Format & File Size:** `.webp` only, **maximum 400 KB** per image.
* **Max Widths:** **1900px** max width for hero/banner images; **1400px** max width for standard images.
* **Aspect Ratios:** `3:2`, `4:3`, or `16:9` (also `3:4` for portrait cards).
* **Subject Matter:** Authentic photos of people, community, faces, and visible emotions.

### 1.5 Unspecified CSS Properties (Clean Web Defaults)
For properties not defined in the manual, use these defaults:
* **Line height (leading):** `1.4–1.5` for body text; `1.1–1.2` for headings.
* **Letter-spacing (kerning):** `normal` (or `-0.01em` on large display headings).
* **Container / Column Width:** Centered `~600px` (or `~42rem` / `672px`) max-width container.
* **Border Radius:** `4px` (small/controls), `8px` (medium/buttons/cards), `16px` (large/modals), `999px` (pill badges).
* **Drop Shadows:** Subtle (`0 1px 6px rgba(8, 65, 92, 0.06)` or `0 4px 20px rgba(8, 65, 92, 0.08)`), prioritizing borders and whitespace first.
* **Touch Targets:** Minimum `44px` height/width.

---

## 2. Non-Negotiable Architecture

1. Prefer static HTML and CSS. Production JavaScript is opt-in, not the default.
2. Use Eleventy (11ty) for static generation and Nunjucks for templates.
3. Use Sass/SCSS for styling. Compile to a single minified production CSS file (`_site/css/main.css`).
4. Use Storyblok as headless CMS with CLI component schemas and visual editing.
5. Never introduce React/Vue/Svelte solely for component rendering.
6. Content must be data-driven and validated against a schema before build (`content.schema.json`).
7. All visual constants must come from design tokens in `src/styles/tokens/`.
8. External embeds, analytics, trackers, remote fonts, and non-essential browser storage are forbidden by default.
9. Accessibility and performance are acceptance criteria, not optional enhancements (WCAG 2.2 AA).
10. Never place secrets, API keys, personal legal data, or production credentials in examples.

---

## 3. Production Runtime Budget

- Client-side JavaScript: target 0 KB.
- If JS is necessary, each feature must justify itself in code comments and documentation (< 1.5 KB total).
- No framework hydration.
- No runtime third-party dependency in production (Storyblok Bridge loads only during visual editor preview).
- No remote font request; self-host `Clash Display` and use system font fallback stacks.
- Images must have explicit width/height and responsive `srcset`/sizes when applicable.
- Use `.webp` format (`max 400KB`, 1900px max width for heroes, 1400px for standard cards).

---

## 4. Components

Required UI primitives:
- `ProfileHeader` (Logo avatar with lowercase "e" clear space buffer, church name, bio tagline)
- `LinkButton` (Action button with primary `#08415C` fill and lavender hover state)
- `DropdownCard` & `dropdown_time_item` (Pure CSS details/summary service times, Echo Kids badge)
- `ImageCardHorizontal` (16:9 media card with title & arrow)
- `ImageCardVertical` (3:4 portrait flyer card with title & arrow)
- `VideoLinkCard` (Privacy 2-click YouTube player facade with YouTube ID model)
- `GroupBlock` (Container box grouping nested cards and buttons)
- `SectionHeading` (Uppercase category divider)
- `FooterLegal` (Church legal data, Impressum/Datenschutz, social items)

Every component must:
- render valid semantic HTML;
- work without JavaScript;
- have focus-visible styles;
- meet WCAG 2.2 AA contrast for normal usage;
- map to a Storyblok blok component schema in `storyblok/components.json`;
- adhere to Echo Kirche typography scale and brand colors;
- avoid inline styles except for narrowly justified CSS custom-property values.

---

## 5. Source / Surface Variants

The page can be rendered for configurable campus and channel surfaces:
- `default` (`/`)
- `gifhorn` (`/gf`, `/gifhorn`)
- `wolfsburg` (`/wob`, `/wolfsburg`)
- `helmstedt` (`/he`, `/helmstedt`)
- `instagram` (`/ig`, `/instagram`)
- `all` (`/test` - preview testing only, redirected on production)

Dual-tier content curation:
- **Tier 1 (`display_in_default` / `displayInDefault`)**: Curates the default landing page (`/`).
- **Tier 2 (`show_on` / `hide_on`)**: Targets specific campus or channel routes.

Surfaces control content filtering only; they must **never** alter brand colors.

---

## 6. Privacy Profiles

### strict (default)
- no analytics, no pixels, no third-party embeds on initial load
- no remote fonts
- no non-essential cookies, localStorage, or sessionStorage
- 2-click consent facade for YouTube (`youtube-nocookie.com` only on explicit click)

### consented (future, explicit feature)
May allow privacy-impacting features only after an explicit product decision, legal review, and a consent implementation appropriate to the actual technology used. Agents must never silently switch from `strict` to `consented`.

---

## 7. CSS Rules

- SCSS architecture: tokens -> base -> utilities -> components -> pages.
- Use CSS custom properties for runtime theme values (`--echo-teal`, `--echo-purple`, `--echo-cream`).
- Follow mobile-first responsive design.
- Prefer logical properties (`margin-inline`, `padding-block`) over physical equivalents.
- Avoid selector nesting deeper than 3 levels.
- Avoid `!important`.
- No IDs for styling.
- Respect `prefers-reduced-motion`.

---

## 8. Storyblok Requirements

- Schema declaration: `storyblok/components.json`.
- Bridge script: `src/assets/js/storyblok-bridge.js` (activates only in `?_storyblok=...` editor mode).
- Offline fallback: Eleventy must build completely from local data (`src/_data/site.json`) when `STORYBLOK_TOKEN` is unset.
- Content schema: `content.schema.json` validates local source files.

---

## 9. Validation & Definition of Done

A task or pull request is not complete until:
- production build succeeds (`npm run build`);
- automated test suites pass (`npm test`);
- Storyblok schema is valid and synchronizable;
- content schema validation succeeds (`npm run validate`);
- Sass compiles without warnings;
- HTML is semantically valid;
- no unexpected production JS bundles are emitted;
- Lighthouse/performance budget is not regressed;
- Echo Kirche styleguide (clear space, colors, typography, type scale, media specs, web defaults) is 100% honored.
