# GitHub Copilot Instructions — Echo Kirche

You are working on the **Echo Kirche** static website and link-in-bio platform.

---

## 1. Official Echo Kirche Styleguide (Mandatory)

Always adhere to the official brand guidelines:

### 1.1 Spacing & Logo Clear Space (*Schutzzone*)
* **Logo Clear Space:** Maintain a minimum clear buffer around all four sides of the logo equal to the **height/width of the lowercase letter `"e"`** from the *echo* wordmark. No text, buttons, borders, or other graphics may enter this zone.
* **Logo Integrity:** Never stretch, compress, rotate, distort, or alter the proportions of the logo. Never recolor outside approved brand colors.
* **Inverted Logos:** White (`#FFFFFF`) logo for dark mode or full-bleed Dark Teal Blue (`#08415C`) / Muted Lavender (`#846B8A`) backgrounds.

### 1.2 Typography, Sizes & Hierarchy
* **Headings & Logo Font:** `Clash Display`
  * **Semibold (600)** for main headings and the word *echo*.
  * **Regular (400)** for sub-brand/location qualifiers (such as *kids* in *echo kids*).
* **Body, Buttons & Links Font:** `Inter` — **Regular (400)**.
* **Optional Digital Accent Fonts:** `Perandory Condensed` (headlines) and `Sloop Script Pro` (script accents/subheadings).

#### Type Scale & Linktree Usage:
- **H1:** Clash Display Semibold (600), `48px` — Main page title (if used)
- **H2:** Clash Display Semibold (600), `40px` — Major section headers
- **H3:** Clash Display Semibold (600), `32px` — Subsections
- **H4:** Clash Display Semibold (600), `24px` — Profile title / sub-brand header
- **H5:** Clash Display Semibold (600), `20px` — Cards, panels, and link buttons
- **H6:** Clash Display Semibold (600), `18px` — Small headings
- **Body Large:** Inter Regular (400), `18px` — Bio intro text or large body copy
- **Body:** Inter Regular (400), `16px` — Standard bio/description text
- **Body Small:** Inter Regular (400), `14px` — Secondary link descriptions
- **Caption:** Inter Regular (400), `12px` — Image captions / footer notes
- **Overline / Label:** Inter Regular (400), `10px–11px` — Tags, badges, category labels

### 1.3 Colors & Contrast Rules
* **Page Background:** Light Pastel Yellow (`#FEFADC`) — designated for soft backgrounds (`rgb(254, 250, 220)`). Full-bleed backgrounds can also use Muted Lavender (`#846B8A`) or Dark Teal Blue (`#08415C`) with inverted white (`#FFFFFF`) or `#FEFADC` text/logos.
* **Primary Text & Dark Accents / Buttons:** Dark Teal Blue (`#08415C`, `rgb(8, 65, 92)`).
* **Secondary Accents / Hover States:** Muted Lavender (`#846B8A`, `rgb(132, 107, 138)`).
* **Brand Color Constancy Invariant:** Brand colors must **never** change based on URL parameters, surfaces, campus routes (`/gf`, `/wob`, `/he`), or sublinks.

### 1.4 Images & Media Specs (Avatars / Banners)
* **Format & File Size:** `.webp` only, **maximum 400 KB** per image.
* **Max Widths:** **1900px** max width for hero/banner images; **1400px** max width for standard images.
* **Aspect Ratios:** `3:2`, `4:3`, or `16:9` (also `3:4` for portrait cards).
* **Subject Matter:** Authentic photos of people, community, faces, and visible emotions.

### 1.5 Unspecified CSS Properties (Clean Web Defaults)
* **Line height (leading):** `1.4–1.5` body text; `1.1–1.2` headings.
* **Letter-spacing (kerning):** `normal` (or `-0.01em` on large display headings).
* **Container / Column Width:** Centered `~600px` (or `~42rem` / `672px`) max-width container.
* **Border Radius:** `4px` (small), `8px` (medium), `16px` (large), `999px` (pill).
* **Drop Shadows:** Subtle, prioritizing borders and whitespace first.
* **Touch Targets:** Minimum `44px` height/width.

---

## 2. Technical Stack & Rules

- **Engine**: Eleventy (11ty) static generator + Nunjucks templates.
- **CSS**: Dart Sass compiling to `_site/css/main.css`. Always use semantic CSS variables (`--color-action-bg`, `--color-text`, etc.).
- **CMS**: Storyblok headless CMS with component schemas in `storyblok/components.json` and offline fallback in `src/_data/site.json`.
- **Zero JS Runtime**: No React/Vue/Svelte hydration. Interactivity uses pure HTML5/CSS (e.g. `<details>` / `<summary>` for dropdowns).
- **Privacy First (GDPR)**: No external fonts, no cookies on initial visit, 2-click consent facade for YouTube embeds.
- **Verification**: Always run `npm run build && npm test`.
