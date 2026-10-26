/**
 * Storyblok Visual Editor bridge loader.
 *
 * Privacy guarantee:
 * - 0 KB third-party requests in production.
 * - ONLY loads the external Storyblok Visual Editor bridge script when the page
 *   is explicitly loaded inside the Storyblok editor preview (?_storyblok=...).
 */
(() => {
  const isStoryblok =
    typeof window !== 'undefined' &&
    (window.location.search.includes('_storyblok') ||
      window.location.search.includes('_storyblok_tk') ||
      (window.self !== window.top && (document.referrer || '').includes('storyblok.com')));

  if (isStoryblok) {
    const bridge = document.createElement('script');
    bridge.src = 'https://app.storyblok.com/f/storyblok-v2-latest.js';
    bridge.async = true;
    bridge.onload = function () {
      if (window.StoryblokBridge) {
        const sb = new window.StoryblokBridge({
          preventClicks: true,
        });

        sb.on(['published', 'change'], function () {
          window.location.reload();
        });

        sb.on('input', function (event) {
          if (event && event.story) {
            window.location.reload();
          }
        });
      }
    };
    document.body.appendChild(bridge);
  }
})();
