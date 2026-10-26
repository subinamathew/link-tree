# Deployment

The product should remain host-portable.

## Build contract

- command: `npm run build`
- output: `_site/`
- static assets only
- no required server functions

## Netlify

Use a minimal `netlify.toml` after implementation:

```toml
[build]
  command = "npm run build"
  publish = "_site"
```

Add production headers only after testing them against the generated site.

## Cloudflare Pages

Configure:
- build command: `npm run build`
- output directory: `_site`

Do not require Workers for the initial version.

## Multiple source builds

If separate deployed variants are needed, use environment variables such as:

```
LINKTREE_SURFACE=instagram
```

The content remains shared; the selected surface changes filtering/theme context at build time.

Alternative future approach: generate `/instagram/`, `/default/`, etc. in one build. Choose this only if separate URLs are desirable.

## Cache strategy

- hashed assets: long immutable cache;
- HTML: shorter cache/revalidation;
- legal pages are HTML and should update promptly after deployment.

## Custom domains

Use HTTPS. Keep canonical URL/site metadata in site configuration rather than templates.
