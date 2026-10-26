/**
 * Justification per AGENTS.md runtime budget:
 * Privacy-compliant 2-click (click-to-load) YouTube embed.
 *
 * Rules satisfied:
 * - 0 KB framework hydration (pure vanilla DOM, 0 dependencies).
 * - Zero third-party requests and zero cookies on initial page load.
 * - Only injects the https://www.youtube.com iframe
 *   after explicit, user-initiated click on the play button.
 */
(() => {
  function initVideoEmbeds() {
    const cards = document.querySelectorAll('[data-video-embed="youtube"]');
    cards.forEach((card) => {
      const playBtn = card.querySelector('.video-link-card__play-btn');
      if (!playBtn) return;

      playBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const videoId = card.getAttribute('data-video-id');
        const title = card.getAttribute('data-video-title') || 'YouTube Video';
        if (!videoId) return;

        const media = card.querySelector('.video-link-card__media');
        if (media) {
          const iframe = document.createElement('iframe');
          iframe.src = `https://www.youtube.com/embed/${encodeURIComponent(videoId)}?autoplay=1`;
          iframe.title = title;
          iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
          iframe.setAttribute('allowfullscreen', 'true');
          iframe.style.inlineSize = '100%';
          iframe.style.blockSize = '100%';
          iframe.style.border = 'none';
          iframe.style.aspectRatio = '16 / 9';

          media.innerHTML = '';
          media.appendChild(iframe);
          card.classList.add('video-link-card--playing');
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initVideoEmbeds);
  } else {
    initVideoEmbeds();
  }
})();
