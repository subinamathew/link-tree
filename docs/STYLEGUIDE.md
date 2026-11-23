# Echo Kirche — Official Design System & Styleguide

## Purpose

This document is the authoritative design system and styleguide for **Echo Kirche** and all related digital properties (including link-in-bio sites, web applications, and CMS components).

All development agents (Antigravity, Claude Code, GitHub Copilot, ChatGPT, Cursor, and human contributors) must strictly adhere to the tokens, typography scales, brand colors, media rules, and invariants defined here.

---

## 1. Spacing & Logo Clear Space (*Schutzzone*)

* **Logo Clear Space:** Maintain a minimum clear buffer around all four sides of the logo equal to the **height/width of the lowercase letter `"e"`** from the *echo* wordmark. No text, buttons, borders, or other graphics may enter this zone.
* **Logo Integrity:** Never stretch, compress, rotate, distort, or alter the proportions of the logo. Never recolor the logo outside approved brand colors.
* **Inverted Applications:** High-contrast white (`#FFFFFF`) logo is strictly used for dark mode or full-bleed Dark Teal Blue (`#08415C`) / Muted Lavender (`#846B8A`) backgrounds.

---

## 2. Typography, Sizes & Hierarchy

* **Headings & Logo Font:** `Clash Display`
  * **Semibold (600)** for main headings (H1–H6) and the word *echo*.
  * **Regular (400)** for sub-brand/location qualifiers (such as *kids* in *echo kids*).
* **Body, Buttons & Links Font:** `Inter` — **Regular (400)**.
* **Optional Digital Accent Fonts** (for special banners, callouts, or magazine-style highlights):
  * **Display/Headline Accent:** `Perandory Condensed` (`--font-accent-display`)
  * **Script/Subheading Accent:** `Sloop Script Pro` (`--font-accent-script`)

### Digital Type Scale & Linktree Usage

Apply this exact pixel hierarchy across all pages and components:

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

---

## 3. Colors & Contrast Rules

Use only the official Echo Kirche color palette:

* **Page Background:** Light Pastel Yellow (`#FEFADC`) — designated for soft backgrounds.
  * RGB: `rgb(254, 250, 220)`.
  * Full-bleed variation note: Muted Lavender (`#846B8A`) or Dark Teal Blue (`#08415C`) can also be used as full-bleed backgrounds with inverted white (`#FFFFFF`) or Light Pastel Yellow (`#FEFADC`) text/logos.
* **Primary Text & Dark Accents / Buttons:** Dark Teal Blue (`#08415C`).
  * RGB: `rgb(8, 65, 92)`.
  * Usage: Primary headings, body text, logos, action buttons, and dark UI accents.
* **Secondary Accents / Hover States:** Muted Lavender (`#846B8A`).
  * RGB: `rgb(132, 107, 138)`.
  * Usage: Secondary text, highlights, buttons/accents, hover states, and logo variations.
* **Inverted / High-Contrast:** Black (`#000000`) and white (`#FFFFFF`) for inverted logo applications, dark mode surfaces, and high-contrast card backgrounds.

### Invariant: Brand Color Constancy
Brand colors must **never** change based on URL parameters, surfaces, campus routes (`/gf`, `/wob`, `/he`), or sublinks. City switches and surfaces filter content visibility only; they never alter brand identity or action colors.

---

## 4. Images & Media Specs (Avatars / Banners)

* **Format & File Size:** `.webp` format only, **maximum 400 KB** per image.
* **Max Widths:**
  * **1900px** max width for hero/banner images.
  * **1400px** max width for standard images.
* **Aspect Ratios:** `3:2`, `4:3`, or `16:9` (also `3:4` for vertical portrait flyer cards).
* **Subject Matter:** Authentic photos of people, community, faces, and visible emotions.

---

## 5. Unspecified CSS Properties (Clean Web Defaults)

The official brand manual does **not** define rules for:
* **Line height (leading)** or **letter-spacing (kerning)**
* **Container / column widths** (e.g., standard mobile Linktree column width)
* **Border radius**, **drop shadows**, or **internal padding** for buttons and cards

For these unspecified properties, all agents and developers must use clean web defaults:
* **Line height (leading):**
  * Body text: `line-height: 1.4–1.5`
  * Headings: `line-height: 1.1–1.2`
* **Letter-spacing (kerning):** `letter-spacing: normal` (or subtle `-0.01em` on large Clash Display display headings)
* **Container / column width:** Centered `~600px` (or `~42rem` / `672px`) max-width container
* **Border radius:**
  * Small: `4px` (minor controls, badges)
  * Medium: `8px` (buttons, cards)
  * Large: `16px` (dialogs, flyouts)
  * Pill: `999px` (badges, pill tags)
* **Shadows:** Subtle (`0 1px 6px rgba(8, 65, 92, 0.06)` or `0 4px 20px rgba(8, 65, 92, 0.08)`), prioritizing borders and clean whitespace first.
* **Touch Targets:** Minimum `44px` height/width for all interactive touch targets.
* **Motion:** Respect `prefers-reduced-motion`; keep animations fast (< 250ms) and non-blocking.

---

## 6. Accessibility (WCAG 2.2 AA)

- All text colors must achieve at least 4.5:1 contrast against their backgrounds (3:1 for large text).
- Focus states must feature a visibly distinct focus ring (`:focus-visible`).
- State must never be communicated by color alone.
- Pure CSS interactivity (e.g. `<details>` / `<summary>`) must remain fully accessible via keyboard.
- Images require meaningful `alt` attributes or empty `alt=""` for decorative assets.
