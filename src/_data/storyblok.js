import fs from 'node:fs';
import path from 'node:path';

function youtubeVideoId(value = '') {
  if (!value) return '';
  const raw = String(value).trim();
  if (/^[A-Za-z0-9_-]+$/.test(raw) && !raw.includes('/')) return raw;
  try {
    const url = new URL(raw);
    if (url.hostname === 'youtu.be') return url.pathname.split('/').filter(Boolean)[0] || '';
    if (url.hostname.endsWith('youtube.com')) {
      if (url.searchParams.get('v')) return url.searchParams.get('v') || '';
      const parts = url.pathname.split('/').filter(Boolean);
      const embedIndex = parts.indexOf('embed');
      if (embedIndex >= 0 && parts[embedIndex + 1]) return parts[embedIndex + 1];
      const liveIndex = parts.indexOf('live');
      if (liveIndex >= 0 && parts[liveIndex + 1]) return parts[liveIndex + 1];
    }
  } catch {}
  return '';
}

/**
 * Storyblok data provider for Eleventy.
 * Fetches content from Storyblok Content Delivery API when STORYBLOK_TOKEN is provided.
 * Falls back to local site.json / operator.json when offline or token is unset.
 */
export default async function () {
  const token = process.env.STORYBLOK_TOKEN;
  const version = process.env.STORYBLOK_VERSION || 'published';
  const slug = process.env.STORYBLOK_SLUG || 'home';

  if (token) {
    try {
      // 1. Initial fetch attempt for the slug
      let url = `https://api.storyblok.com/v2/cdn/stories/${encodeURIComponent(slug)}?token=${encodeURIComponent(token)}&version=${encodeURIComponent(version)}`;
      let res = await fetch(url, { headers: { Accept: 'application/json' } });

      // 2. If 404 and version was published, retry with draft (story might be in draft mode)
      if (res.status === 404 && version === 'published') {
        url = `https://api.storyblok.com/v2/cdn/stories/${encodeURIComponent(slug)}?token=${encodeURIComponent(token)}&version=draft`;
        res = await fetch(url, { headers: { Accept: 'application/json' } });
      }

      // 3. If still 404, list stories in space to find startpage or default story
      if (res.status === 404) {
        const listUrl = `https://api.storyblok.com/v2/cdn/stories?token=${encodeURIComponent(token)}&version=draft&per_page=5`;
        const listRes = await fetch(listUrl, { headers: { Accept: 'application/json' } });
        if (listRes.ok) {
          const listJson = await listRes.json();
          if (listJson && Array.isArray(listJson.stories) && listJson.stories.length > 0) {
            const foundStory = listJson.stories.find((s) => s.is_startpage) || listJson.stories[0];
            return {
              source: 'storyblok-api',
              story: foundStory,
              content: foundStory.content,
            };
          }
        }
      }

      if (res.ok) {
        const json = await res.json();
        if (json && json.story) {
          return {
            source: 'storyblok-api',
            story: json.story,
            content: json.story.content,
          };
        }
      }
      console.warn(`Storyblok API returned status ${res.status}. Falling back to local data.`);
    } catch (err) {
      console.warn(`Failed to fetch from Storyblok API (${err.message}). Falling back to local data.`);
    }
  }

  // Local fallback: map site.json and operator.json into Storyblok schema
  const sitePath = path.resolve('src/_data/site.json');
  const operatorPath = path.resolve('src/_data/operator.json');

  const site = JSON.parse(fs.readFileSync(sitePath, 'utf8'));
  const operator = JSON.parse(fs.readFileSync(operatorPath, 'utf8'));

  const bodyBloks = (site.links || []).map((item) => {
    if (item.type === 'link') {
      return {
        _uid: item.id,
        component: 'link_button',
        label: item.label,
        url: item.url,
        icon: item.icon || '',
        show_on: item.showOn || [],
        hide_on: item.hideOn || [],
      };
    }
    if (item.type === 'image-horizontal') {
      return {
        _uid: item.id,
        component: 'image_card_horizontal',
        label: item.label,
        url: item.url,
        image: {
          filename: item.image?.src || '',
          alt: item.image?.alt || '',
          width: item.image?.width || 1200,
          height: item.image?.height || 630,
        },
        show_on: item.showOn || [],
        hide_on: item.hideOn || [],
      };
    }
    if (item.type === 'image-vertical') {
      return {
        _uid: item.id,
        component: 'image_card_vertical',
        label: item.label,
        url: item.url,
        image: {
          filename: item.image?.src || '',
          alt: item.image?.alt || '',
          width: item.image?.width || 900,
          height: item.image?.height || 1200,
        },
        show_on: item.showOn || [],
        hide_on: item.hideOn || [],
      };
    }
    if (item.type === 'video-link') {
      return {
        _uid: item.id,
        component: 'video_link_card',
        label: item.label,
        url: item.provider === 'youtube' ? '' : item.url,
        provider: item.provider || 'youtube',
        youtube_video_id: item.provider === 'youtube' ? youtubeVideoId(item.youtube_video_id || item.url) : '',
        youtube_content_type: item.youtube_content_type || 'video',
        image: {
          filename: item.image?.src || '',
          alt: item.image?.alt || '',
          width: item.image?.width || 1280,
          height: item.image?.height || 720,
        },
        show_on: item.showOn || [],
        hide_on: item.hideOn || [],
      };
    }
    return {
      _uid: item.id,
      component: 'section_heading',
      title: item.title || item.label || '',
    };
  });

  const story = {
    name: site.profile?.name || 'Echo Kirche',
    content: {
      _uid: 'root-page',
      component: 'link_page',
      title: site.profile?.name || 'Echo Kirche',
      theme: 'light',
      surface: 'default',
      profile: [
        {
          _uid: 'profile-header',
          component: 'profile_header',
          name: site.profile?.name || 'Echo Kirche',
          bio: site.profile?.bio || '',
          avatar: site.profile?.avatar
            ? {
                filename: site.profile.avatar,
                alt: site.profile.name || 'Logo',
              }
            : null,
        },
      ],
      body: bodyBloks,
      footer: [
        {
          _uid: 'footer-legal',
          component: 'footer_legal',
          organization_name: operator.name || 'Echo Kirche',
          street: operator.address?.street || 'Schützenplatz 1',
          city: operator.address?.city || '38518 Gifhorn',
          email: operator.contact?.email || 'hello@kirche-echo.de',
          impressum_url: operator.urls?.impressum || 'https://kirche-echo.de/impressum/',
          datenschutz_url: operator.urls?.datenschutz || 'https://kirche-echo.de/datenschutz/',
          copyright_year: '2026',
          socials: (site.socials || []).map((s, idx) => ({
            _uid: `social-${idx}`,
            component: 'social_item',
            platform: s.platform,
            url: s.url,
            label: s.label || s.platform,
          })),
        },
      ],
    },
  };

  return {
    source: 'local-fallback',
    story,
    content: story.content,
  };
}
