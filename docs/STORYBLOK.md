# Storyblok Headless CMS Integration

This link-in-bio site integrates with **Storyblok** as its headless Content Management System while guaranteeing a **privacy-first, static-first delivery model**.

---

## 1. Architecture & Privacy Guarantees

1. **Static Build Ingestion**:
   - During Eleventy builds, content is fetched from the Storyblok Content Delivery API v2.
   - If `STORYBLOK_TOKEN` is unset or build is offline, the site automatically falls back to `src/_data/site.json` and `src/_data/operator.json`.
   - Production static outputs retain **0 KB runtime JavaScript** hydration.

2. **Visual Editor Bridge (Live Editing)**:
   - When loaded inside the Storyblok Visual Editor (which adds `?_storyblok=...` to the iframe preview URL), [`src/assets/js/storyblok-bridge.js`](file:///Users/Shared/projeckt/goto/link-tree/src/assets/js/storyblok-bridge.js) conditionally loads the Storyblok Bridge (`https://app.storyblok.com/f/storyblok-v2-latest.js`).
   - Standard visitors never trigger this script, maintaining zero third-party calls on production visits.

---

## 2. Storyblok Blok Components Schema

Component schemas are declared in [`storyblok/components.json`](file:///Users/Shared/projeckt/goto/link-tree/storyblok/components.json) for direct synchronization via the Storyblok CLI:

| Blok Component | Type | Description |
|---|---|---|
| `link_page` | Content Type | Root content type holding page title, theme (`light`, `pale`, `soft`, `dark`, `teal`, `lavender`), surface, `profile` blok, `body` bloks, and `footer` blok. |
| `profile_header` | Nestable Blok | Organization name, biography, and vector/raster avatar asset. |
| `group_block` | Nestable Blok | Container block with optional title, description, and style variant (`card`, `soft`, `outline`, `transparent`) that groups nested buttons, cards, and videos inside. |
| `link_button` | Nestable Blok | Label, URL, optional icon selection (`church`, `calendar`, `video`, `heart`, `users`, `location`, `music`, `newsletter`, `podcast`, `envelope`, `globe`, `logo`, `link`), and surface filtering rules (`show_on`, `hide_on`). |
| `image_card_horizontal` | Nestable Blok | 16:9 featured horizontal media card with title, URL, image asset, and bottom-right arrow indicator badge (`->`). |
| `image_card_vertical` | Nestable Blok | 3:4 portrait orientation media card with title, URL, image asset, and bottom-right arrow indicator badge (`->`). |
| `video_link_card` | Nestable Blok | Privacy-first video card. YouTube uses a `youtube_video_id` plus optional `youtube_content_type` (`video` or `live`); non-YouTube providers may use `url`. The YouTube player loads only after an explicit click using YouTube Privacy-Enhanced Mode. |
| `section_heading` | Nestable Blok | Section title divider. |
| `footer_legal` | Nestable Blok | Organization contact info (`organization_name`, `street`, `city`, `email`), legal URLs (`impressum_url`, `datenschutz_url`), copyright year, and `socials` list. |
| `social_item` | Nestable Blok | Circular social button with platform (`instagram`, `whatsapp`, `youtube`, `spotify`, `email`, `website`, `facebook`, `tiktok`, `linkedin`), URL, and label. |

---

## 3. Synchronizing Components with Storyblok

To push the components schema to your Storyblok Space:

```bash
# Login to Storyblok CLI
npx storyblok login

# Push component schemas to your space
npx storyblok push-components storyblok/components.json --space <YOUR_SPACE_ID>
```

To pull updated schemas from Storyblok:

```bash
npx storyblok pull-components --space <YOUR_SPACE_ID>
```

---

## 4. Local Development & Deployment

### Local Development
```bash
# Run with local JSON fallback:
npm run dev

# Or with a live Storyblok Space:
STORYBLOK_TOKEN="your_access_token" STORYBLOK_VERSION="draft" npm run dev
```

### Production Build
```bash
# Production static build
npm run build
```


## YouTube and YouTube Live

For YouTube, editors enter only the YouTube Video ID in `youtube_video_id`.

Example:

- Full watch URL: `https://www.youtube.com/watch?v=M7lc1UVf-VE`
- Storyblok value: `M7lc1UVf-VE`

A scheduled or currently-live YouTube broadcast is handled the same way: use that broadcast's Video ID and set `youtube_content_type` to `live`.

The site does not require the YouTube Data API and does not poll YouTube for live status. On initial page load it makes no YouTube player request. After the visitor presses Play, it embeds:

`https://www.youtube-nocookie.com/embed/VIDEO_ID`
