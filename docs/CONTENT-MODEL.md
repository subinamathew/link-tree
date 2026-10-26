# Content Model

## Site object

Suggested shape:

```yaml
schemaVersion: 1
profile:
  name: Example Person
  bio: Short optional bio
  avatar: /assets/images/avatar.webp
surface: default
legal:
  copyrightFrom: 2026
links: []
```

Legal identity/address values should live in a separate operator configuration that is not filled with fake production data.

## Link item

```yaml
- id: website
  type: link
  label: My website
  url: https://example.com
  showOn: [default, instagram]
```

## Horizontal image item

```yaml
- id: project
  type: image-horizontal
  label: Project
  url: https://example.com/project
  image:
    src: /assets/images/project.webp
    alt: Project preview
    width: 1200
    height: 630
```

## Vertical image item

```yaml
- id: poster
  type: image-vertical
  label: Poster
  url: https://example.com/poster
  image:
    src: /assets/images/poster.webp
    alt: Poster preview
    width: 900
    height: 1200
```

## Video link item

```yaml
- id: youtube-demo
  type: video-link
  label: Watch the demo
  provider: youtube
  url: https://www.youtube.com/watch?v=...
  image:
    src: /assets/images/demo-thumbnail.webp
    alt: Demo video thumbnail
    width: 1280
    height: 720
```

The thumbnail should be stored locally for the strict privacy profile.

## Surface filtering

`showOn`: optional allow-list.

`hideOn`: optional deny-list.

Resolution:
1. if `showOn` exists and the current surface is absent, hide;
2. if `hideOn` contains the current surface, hide;
3. otherwise show.

Reject items that specify contradictory or invalid values during validation.

## Ordering

Array order is display order.

A future CMS may add an explicit numeric position, but the initial format should stay simple.

## URL validation

Validator should allow:
- `https:`
- optional `mailto:`
- optional `tel:` if explicitly enabled by site policy.

Reject:
- `javascript:`
- `data:` destinations;
- malformed URLs.

## Author-provided text

Treat label, bio, and alt fields as plain text. Do not render arbitrary HTML from content by default.
