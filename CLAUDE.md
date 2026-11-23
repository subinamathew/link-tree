# CLAUDE.md — Echo Kirche Link-Tree

This file provides guidance for Anthropic's Claude Code and Claude-based development agents working on the Echo Kirche project.

---

## 1. Authoritative Echo Kirche Styleguide

All front-end, component, and design modifications MUST follow this official styleguide:

### 1.1 Spacing & Logo Clear Space (*Schutzzone*)
* **Logo Clear Space:** Maintain a minimum clear buffer around all four sides of the logo equal to the **height/width of the lowercase letter `"e"`** from the *echo* wordmark. No text, buttons, borders, or other graphics may enter this zone.
* **Logo Integrity:** Never stretch, compress, rotate, distort, or alter the proportions of the logo. Never recolor outside approved brand colors.
* **Inverted Logos:** White (`#FFFFFF`) logo on dark mode or full-bleed Dark Teal Blue (`#08415C`) / Muted Lavender (`#846B8A`) backgrounds.

### 1.2 Typography, Sizes & Hierarchy
* **Headings & Logo Font:** `Clash Display`
  * **Semibold (600)** for main headings (H1–H6) and the word *echo*.
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
* **Page Background:** Light Pastel Yellow (`#FEFADC`) — designated for soft backgrounds (`rgb(254, 250, 220)`). Full-bleed backgrounds can also use Muted Lavender (`#846B8A`) or Dark Teal Blue (`#08415C`) with inverted white (`#FFFFFF`) or `#FEFADC` text/logos.
* **Primary Text & Dark Accents / Buttons:** Dark Teal Blue (`#08415C`, `rgb(8, 65, 92)`).
* **Secondary Accents / Hover States:** Muted Lavender (`#846B8A`, `rgb(132, 107, 138)`).
* **Brand Color Constancy Invariant:** Brand colors must **never** change based on URL parameters, surfaces, campus routes (`/gf`, `/wob`, `/he`), or sublinks. City switches and surfaces filter content visibility only; they never alter brand identity or action colors.

### 1.4 Images & Media Specs (Avatars / Banners)
* **Format & File Size:** `.webp` format only, **maximum 400 KB** per image.
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

## 2. Core Architecture & Build Stack

- **Static Generation**: Eleventy (11ty) v3.x with Nunjucks templates.
- **Styles**: Dart Sass compiling `src/styles/main.scss` to `_site/css/main.css`.
- **Headless CMS**: Storyblok API v2 with local offline fallback (`src/_data/site.json`).
- **Validation**: JSON Schema Draft-07 via Ajv (`npm run validate`).
- **JavaScript Budget**: 0 KB production runtime framework; justified vanilla helper (< 1.5 KB) for 2-click YouTube consent facade.
- **Privacy**: Strict GDPR/DSGVO compliance. Zero third-party connections on initial page visit.

---

## 3. Essential Commands

```bash
# Validate local data against JSON Schema
npm run validate

# Compile Sass styles
npm run build:sass

# Build Eleventy static site
npm run build:eleventy

# Run complete production build pipeline (validate -> sass -> 11ty -> verify)
npm run build

# Run automated test suites (markup, states, routes, security)
npm test

# Start local dev server with hot reload
npm run dev
```
