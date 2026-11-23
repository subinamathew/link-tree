/**
 * Storyblok Visual Editor bridge loader - 0 KB third-party requests in production.
 * Only loaded when explicitly in Storyblok editor preview (?_storyblok=...).
 */
(() => {
  const isSB =
    typeof window !== 'undefined' &&
    (location.search.includes('_storyblok') ||
      location.search.includes('_storyblok_tk') ||
      location.search.includes('_token') ||
      (window.self !== window.top && (document.referrer || '').includes('storyblok.com')) ||
      window.__TEST_STORYBLOK_BRIDGE__);

  if (!isSB) return;

  const THEMES = ['light', 'white', 'pale', 'warm', 'soft', 'dark', 'teal', 'lavender'];
  const SURFACES = ['instagram', 'wolfsburg', 'gifhorn', 'helmstedt', 'default', 'all'];

  const I = {
    arr: '<svg class="fa-svg fa-arrow-right" viewBox="0 0 448 512" fill="currentColor" width="16" height="16"><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0-105.4 105.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>',
    chev: '<svg class="fa-svg fa-chevron-down" viewBox="0 0 448 512" fill="currentColor" width="14" height="14"><path d="M201.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 274.7 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/></svg>',
    play: '<svg viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>',
    link: '<svg class="fa-svg fa-link" viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M3.9 12a3.1 3.1 0 0 1 3.1-3.1h4V7H7a5 5 0 0 0 0 10h4v-1.9H7a3.1 3.1 0 0 1-3.1-3.1zm4.1 1h8v-2H8v2zm9-6h-4v1.9h4a3.1 3.1 0 0 1 0 6.2h-4V17h4a5 5 0 0 0 0-10z"/></svg>'
  };

  const q = new URLSearchParams(location.search);
  const token = q.get('_token') || q.get('_storyblok_tk[token]') || '';
  const pathSeg = (typeof location !== 'undefined' && location.pathname ? location.pathname : '').toLowerCase().replace(/^\/|\/$/g, '').split('/')[0];
  const slug = q.get('_slug') || (pathSeg && pathSeg !== 'home' && pathSeg !== 'index.html' ? pathSeg : 'home');

  function esc(s) {
    return s ? String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;') : '';
  }

  function resolveUrl(u) {
    if (!u) return '#';
    let url = '#';
    if (typeof u === 'string') url = u.trim();
    else if (typeof u === 'object') {
      if (u.linktype === 'email') {
        const m = (u.url || u.cached_url || '').trim();
        url = m ? (m.startsWith('mailto:') ? m : `mailto:${m}`) : '#';
      } else if (u.linktype === 'story') {
        const s = (u.cached_url || u.url || '').replace(/^\/|\/$/g, '').trim();
        url = (!s || s === 'home') ? '/' : `/${s}/`;
      } else {
        url = (u.url || u.cached_url || '#').trim();
      }
    }
    const low = url.toLowerCase();
    return (low.startsWith('javascript:') || low.startsWith('data:') || low.startsWith('vbscript:')) ? '#' : url;
  }

  function setFilters(li, b) {
    const s = b.show_on || b.showOn;
    const h = b.hide_on || b.hideOn;
    const d = b.display_in_default !== undefined ? b.display_in_default : b.displayInDefault;
    if (s) li.dataset.showOn = Array.isArray(s) ? s.join(',') : s; else delete li.dataset.showOn;
    if (h) li.dataset.hideOn = Array.isArray(h) ? h.join(',') : h; else delete li.dataset.hideOn;
    if (d !== undefined) li.dataset.displayInDefault = String(d); else delete li.dataset.displayInDefault;
  }

  function renderBlok(li, b) {
    setFilters(li, b);
    const c = b.component || b.type || 'link_button';
    const label = b.label || b.title || '';
    const url = resolveUrl(b.url);
    const src = b.image?.filename || b.image?.src || '';

    if (c === 'section_heading' || c === 'section-heading') {
      const h = li.querySelector('.section-heading');
      if (h) h.textContent = label;
      else li.innerHTML = `<h2 class="section-heading">${esc(label)}</h2>`;
      return;
    }

    if (c === 'link_button' || c === 'link') {
      const a = li.querySelector('a.link-button');
      if (a) {
        a.href = url;
        const l = a.querySelector('.link-button__label');
        if (l) l.textContent = label;
      } else {
        li.innerHTML = `<a class="link-button link-button--with-icon" href="${url}" rel="noopener noreferrer"><span class="link-button__icon" aria-hidden="true">${I.link}</span><span class="link-button__label">${esc(label)}</span></a>`;
      }
      return;
    }

    if (c.startsWith('image_card') || c.startsWith('image-')) {
      const isV = c.includes('vertical');
      const card = li.querySelector('.image-card');
      if (card && ((isV && card.classList.contains('image-card--vertical')) || (!isV && card.classList.contains('image-card--horizontal')))) {
        card.href = url;
        const t = card.querySelector('.image-card__title');
        if (t) t.textContent = label;
        const img = card.querySelector('img');
        if (img && src) img.src = src;
      } else {
        const cls = isV ? 'image-card image-card--vertical' : 'image-card image-card--horizontal';
        li.innerHTML = `<a class="${cls}" href="${url}" rel="noopener noreferrer">${src ? `<div class="image-card__media"><img src="${esc(src)}" alt="${esc(label)}" loading="lazy"></div>` : ''}<div class="image-card__content"><span class="image-card__title">${esc(label)}</span><span class="image-card__arrow" aria-hidden="true">${I.arr}</span></div></a>`;
      }
      return;
    }

    if (c === 'video_link_card' || c === 'video-link') {
      const card = li.querySelector('.video-link-card');
      const id = b.youtube_video_id || '';
      const prov = b.provider || 'youtube';
      const dest = id ? `https://www.youtube.com/watch?v=${id}` : url;
      if (card) {
        const t = card.querySelector('.video-link-card__title');
        if (t) { t.textContent = label; if (t.tagName === 'A') t.href = dest; }
        const img = card.querySelector('img');
        if (img && src) img.src = src;
      } else {
        li.innerHTML = `<div class="video-link-card"${prov === 'youtube' && id ? ` data-video-embed="youtube" data-video-id="${esc(id)}" data-video-title="${esc(label)}"` : ''}>${src ? `<div class="video-link-card__media"><img src="${esc(src)}" alt="${esc(label)}" loading="lazy"><button type="button" class="video-link-card__play-btn" aria-label="Video abspielen: ${esc(label)}"><span class="video-link-card__play-badge" aria-hidden="true">${I.play}</span></button><span class="video-link-card__arrow" aria-hidden="true">${I.arr}</span></div>` : ''}<div class="video-link-card__content"><a class="video-link-card__title" href="${dest}" target="_blank" rel="noopener noreferrer">${esc(label)}</a><span class="video-link-card__provider">${esc(prov)}</span></div></div>`;
      }
      return;
    }

    if (c === 'dropdown_card' || c === 'dropdown-card') {
      const card = li.querySelector('details.dropdown-card');
      if (card) {
        const lbl = card.querySelector('.link-button__label');
        if (lbl) lbl.textContent = label;
        const desc = card.querySelector('.dropdown-card__description');
        if (desc && b.description) desc.textContent = b.description;
      } else {
        li.innerHTML = `<details class="dropdown-card"><summary class="dropdown-card__summary link-button link-button--with-icon"><span class="link-button__icon" aria-hidden="true">${I.link}</span><span class="link-button__label">${esc(label)}</span><span class="dropdown-card__chevron" aria-hidden="true">${I.chev}</span></summary><div class="dropdown-card__content">${b.description ? `<p class="dropdown-card__description">${esc(b.description)}</p>` : ''}</div></details>`;
      }
      return;
    }

    if (c === 'group_block' || c === 'content_block' || c === 'group-block') {
      let grp = li.querySelector('section.group-block');
      const desc = b.description || '';
      if (!grp) {
        li.innerHTML = `<section class="group-block group-block--${esc(b.variant || 'card')}">${label ? `<header class="group-block__header"><h2 class="group-block__title">${esc(label)}</h2>${desc ? `<p class="group-block__description">${esc(desc)}</p>` : ''}</header>` : ''}<ul class="group-block__list" role="list"></ul></section>`;
        grp = li.querySelector('section.group-block');
      } else {
        const h = grp.querySelector('.group-block__title');
        if (h) h.textContent = label;
        const p = grp.querySelector('.group-block__description');
        if (p) p.textContent = desc;
      }
      const sub = grp?.querySelector('.group-block__list');
      if (sub) reconcile(sub, b.items || b.body || b.links || []);
    }
  }

  function reconcile(container, bloks) {
    if (!container || !Array.isArray(bloks)) return;
    const existing = Array.from(container.children).filter(el => el.classList && el.classList.contains('linktree-item'));
    const map = new Map();
    existing.forEach(el => {
      if (el.dataset.uid) map.set(el.dataset.uid, el);
    });

    const validUids = new Set(bloks.map(b => b._uid || b.id).filter(Boolean));
    existing.forEach(el => {
      if (el.dataset.uid && !validUids.has(el.dataset.uid)) el.remove();
    });

    bloks.forEach(b => {
      const uid = b._uid || b.id || '';
      let li = uid ? map.get(uid) : null;
      if (!li) {
        li = document.createElement('li');
        li.className = 'linktree-item';
        if (uid) li.dataset.uid = uid;
      }
      renderBlok(li, b);
      container.appendChild(li);
    });
  }

  function applyContent(content) {
    if (!content) return;

    if (content.theme !== undefined) {
      const t = typeof content.theme === 'object' && content.theme ? content.theme.value : content.theme;
      if (t) {
        const norm = String(t).toLowerCase().trim();
        if (THEMES.includes(norm)) {
          document.documentElement.dataset.theme = norm;
          if (typeof window.applyTheme === 'function') window.applyTheme(norm, false);
        }
      }
    }

    if (content.surface !== undefined) {
      const s = typeof content.surface === 'object' && content.surface ? content.surface.value : content.surface;
      if (s) {
        const normS = String(s).toLowerCase().trim();
        if (SURFACES.includes(normS)) {
          if (typeof window.applySurface === 'function') window.applySurface(normS, false);
          else document.documentElement.dataset.surface = normS;
        }
      }
    }

    if (content.title) document.title = content.title;

    if (content.profile && Array.isArray(content.profile) && content.profile[0]) {
      const p = content.profile[0];
      const nameEl = document.querySelector('.profile-header__name-text');
      if (nameEl && p.name) nameEl.textContent = p.name;
      const bioEl = document.querySelector('.profile-header__bio');
      if (bioEl && p.bio !== undefined) bioEl.textContent = p.bio;
      const av = document.querySelector('.profile-header__avatar');
      if (av && p.avatar) {
        const s = typeof p.avatar === 'object' && p.avatar ? p.avatar.filename : p.avatar;
        if (s) av.src = s;
      }
    }

    if (content.body && Array.isArray(content.body)) {
      const c = document.querySelector('.linktree-list');
      if (c) reconcile(c, content.body);
    }

    if (typeof window.applySurface === 'function') {
      window.applySurface(document.documentElement.dataset.surface || 'default', false);
    }
    if (typeof window.initVideoEmbeds === 'function') {
      window.initVideoEmbeds();
    }
  }

  if (typeof window !== 'undefined') {
    window.storyblokApplyContent = applyContent;
  }

  async function fetchDraft(s, t) {
    if (!t) return null;
    try {
      const res = await fetch(`https://api.storyblok.com/v2/cdn/stories/${encodeURIComponent(s)}?token=${encodeURIComponent(t)}&version=draft&cv=${Date.now()}`);
      if (res.ok) {
        const d = await res.json();
        return d?.story?.content;
      }
    } catch (e) {
      console.warn('Could not fetch Storyblok draft preview:', e);
    }
    return null;
  }

  const bridge = document.createElement('script');
  bridge.src = 'https://app.storyblok.com/f/storyblok-v2-latest.js';
  bridge.async = true;
  bridge.onload = () => {
    if (!window.StoryblokBridge) return;
    const isFramed = typeof window !== 'undefined' && window.self !== window.top;
    const sb = new window.StoryblokBridge({ preventClicks: isFramed, resolveLinks: 'url' });

    sb.on('published', () => window.location.reload());

    sb.on('input', (event) => {
      if (event?.story?.content) applyContent(event.story.content);
    });

    sb.on('change', async (event) => {
      if (event?.story?.content) {
        applyContent(event.story.content);
      } else if (token) {
        const draft = await fetchDraft(slug, token);
        if (draft) applyContent(draft);
      }
    });

    if (token) {
      fetchDraft(slug, token).then((draft) => {
        if (draft) applyContent(draft);
      });
    }
  };
  document.body.appendChild(bridge);
})();
