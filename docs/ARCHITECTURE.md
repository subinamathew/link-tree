# Architecture

## Summary

The application is a statically generated link-in-bio site with a Storybook development environment. It is optimized for minimal runtime work, portability, privacy, and design-system maintainability.

## Recommended stack

### Site generator
Eleventy (11ty)

Why:
- static output;
- no client framework required;
- data-driven collections/templates;
- easy deployment to Netlify or Cloudflare;
- Nunjucks templates map naturally to Storybook HTML stories.

### Component workshop
Storybook with `@storybook/html-vite`

Storybook is a development dependency only. Production must not load Storybook assets.

### Styling
Dart Sass/SCSS

SCSS compiles into a single minified CSS artifact. CSS custom properties represent the semantic theme.

### Content
YAML or JSON, validated before build.

Suggested source files:
- `src/data/site.yaml`
- `src/data/links.yaml`

## Proposed repository layout

```
.
├── .storybook/
│   ├── main.ts
│   └── preview.ts
├── docs/
├── scripts/
│   └── validate-content.mjs
├── src/
│   ├── _data/
│   ├── _includes/
│   │   ├── layouts/
│   │   └── components/
│   ├── assets/
│   │   └── images/
│   ├── content/
│   │   ├── index.njk
│   │   ├── impressum.njk
│   │   └── datenschutz.njk
│   ├── stories/
│   └── styles/
│       ├── tokens/
│       ├── base/
│       ├── components/
│       └── main.scss
├── content.schema.json
├── eleventy.config.mjs
└── package.json
```

## Rendering pipeline

1. Read site/profile configuration.
2. Validate config and content against JSON Schema.
3. Resolve the selected surface from build configuration.
4. Filter items using `showOn` and `hideOn`.
5. Render semantic component templates.
6. Compile SCSS.
7. Optimize/copy local media.
8. Output static files.

## Surface selection

Production builds may accept a build-time variable such as:

```
LINKTREE_SURFACE=instagram npm run build
```

Default is `default`.

A hosting platform may create multiple deploy contexts with different values, or separate routes may be generated from the same content if required later.

Storybook uses a global `surface` toolbar parameter rather than an environment variable.

## Component rendering strategy

Use pure rendering functions or Nunjucks macros for reusable markup.

Avoid maintaining a separate Storybook-only copy of component HTML. If a shared render helper is needed, it may be consumed by both Eleventy and Storybook build tooling.

## URL behavior

External links should default to normal anchors. If opening a new tab is enabled:
- include `rel="noopener noreferrer"`;
- make the behavior visible or understandable;
- do not force new tabs globally without a product decision.

## Media

Image card data should contain:
- local image source;
- alt text;
- width/height or aspect ratio;
- optional focal position;
- destination URL.

Portrait and landscape cards are layout variants, not separate content semantics beyond their rendering requirements.

Remote image hotlinking is discouraged because it adds external requests and reduces privacy/performance control.

## YouTube

Default behavior: render a link card that navigates to YouTube.

Optional future behavior: privacy-enhanced or click-to-load embeds. These are not part of the strict baseline and must undergo a privacy review.

## Deployment

### Netlify
- build command: `npm run build`
- publish directory: `_site`

### Cloudflare Pages
- build command: `npm run build`
- output directory: `_site`

No serverless functions are required for the base product.

## Security headers

Begin with:
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` denying unused capabilities
- a CSP compatible with zero inline scripts and local assets

CSP must be tested against Storybook separately; development tooling should not weaken production headers.

## Versioning

Add `schemaVersion` to site/content data.

Breaking schema changes require:
- version increment;
- migration note;
- updated example content;
- updated validator.

## Performance target

The base page should be practical on a slow mobile connection:
- zero production JS by default;
- one small CSS file;
- aggressively optimized local imagery;
- no third-party requests on initial render in strict mode;
- no layout shift from media.
