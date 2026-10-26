# Storybook Contract

## Framework

Use Storybook's HTML + Vite integration (`@storybook/html-vite`).

Storybook is development tooling only. It must not add runtime dependencies to the generated production page.

## Global toolbar

Create a global toolbar item:

- key: `surface`
- label/title: `Surface`
- initial value: `default`
- options: `default`, `instagram`, `tiktok`, `linkedin`, `youtube`

Allow stories to add custom values where needed.

A global decorator should place the selected surface on the preview root, for example:

```html
<div class="sb-surface" data-surface="instagram">...</div>
```

Components may consume this as styling context, but visibility logic should be tested independently so Storybook does not become the production implementation.

## Required story matrix

### LinkButton
- default
- long label
- keyboard focus
- each surface

### ImageCardHorizontal
- typical image
- long label
- image missing/fallback behavior

### ImageCardVertical
- typical portrait
- long label

### VideoLinkCard
- YouTube link
- no thumbnail
- local thumbnail
- verify no iframe/network embed is generated

### ProfileHeader
- no avatar
- avatar
- long bio

### FooterLegal
- Impressum + Datenschutz
- copyright range

## Addons

At minimum:
- accessibility addon

Optional:
- interactions/test tooling where it does not bleed into production.

## Styling

Import the same compiled/source SCSS entry used by production where Storybook supports it.

Do not create a second independent Storybook stylesheet.

## Acceptance

`npm run storybook:build` must pass in CI before merge.
