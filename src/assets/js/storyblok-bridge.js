/**
 * Storyblok Visual Editor bridge loader.
 *
 * Privacy guarantee:
 * - 0 KB third-party requests in production.
 * - ONLY loads the external Storyblok Visual Editor bridge script when the page
 *   is explicitly loaded inside the Storyblok editor preview (?_storyblok=...).
 */
(() => {
  if (typeof window !== 'undefined' && window.location.search.includes('_storyblok')) {
    const bridge = document.createElement('script');
    bridge.src = 'https://app.storyblok.com/f/storyblok-v2-latest.js';
    bridge.onload = function () {
      if (window.StoryblokBridge) {
        const sb = new window.StoryblokBridge();
        sb.on(['published', 'change'], function () {
          window.location.reload();
        });
      }
    };
    document.body.appendChild(bridge);
  }
})();
