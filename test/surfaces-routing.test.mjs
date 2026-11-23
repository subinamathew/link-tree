import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const siteDir = path.resolve('_site');

describe('Surface Routing, Shortcuts & Filter Verification', () => {
  const surfaces = [
    { slug: 'ig', expectedSwitch: 'instagram' },
    { slug: 'instagram', expectedSwitch: 'instagram' },
    { slug: 'gf', expectedSwitch: 'gifhorn' },
    { slug: 'gifhorn', expectedSwitch: 'gifhorn' },
    { slug: 'wob', expectedSwitch: 'wolfsburg' },
    { slug: 'wolfsburg', expectedSwitch: 'wolfsburg' },
    { slug: 'he', expectedSwitch: 'helmstedt' },
    { slug: 'helmstedt', expectedSwitch: 'helmstedt' },
  ];

  for (const { slug, expectedSwitch } of surfaces) {
    test(`Static route /${slug}/ exists and renders with switch "${expectedSwitch}"`, () => {
      const pagePath = path.join(siteDir, slug, 'index.html');
      assert.ok(fs.existsSync(pagePath), `Page /${slug}/index.html must exist`);
      const html = fs.readFileSync(pagePath, 'utf8');
      assert.match(html, new RegExp(`data-surface="${expectedSwitch}"`), `Page must specify data-surface="${expectedSwitch}"`);
    });
  }

  test('Default landing page / excludes city-specific standalone buttons by default', () => {
    const defaultHtml = fs.readFileSync(path.join(siteDir, 'index.html'), 'utf8');
    assert.doesNotMatch(defaultHtml, /class="link-button[^"]*"\s+href="https:\/\/kirche-echo\.de\/gifhorn"/, 'Default route must not show Gifhorn specific button');
    assert.doesNotMatch(defaultHtml, /class="link-button[^"]*"\s+href="https:\/\/kirche-echo\.de\/wolfsburg"/, 'Default route must not show Wolfsburg specific button');
    assert.doesNotMatch(defaultHtml, /class="link-button[^"]*"\s+href="https:\/\/kirche-echo\.de\/helmstedt"/, 'Default route must not show Helmstedt specific button');
  });

  test('Dedicated location routes include their specific location button', () => {
    const gfHtml = fs.readFileSync(path.join(siteDir, 'gifhorn', 'index.html'), 'utf8');
    assert.match(gfHtml, /class="link-button[^"]*"\s+href="https:\/\/kirche-echo\.de\/gifhorn"/, 'Gifhorn route must show Gifhorn button');

    const wobHtml = fs.readFileSync(path.join(siteDir, 'wolfsburg', 'index.html'), 'utf8');
    assert.match(wobHtml, /class="link-button[^"]*"\s+href="https:\/\/kirche-echo\.de\/wolfsburg"/, 'Wolfsburg route must show Wolfsburg button');

    const heHtml = fs.readFileSync(path.join(siteDir, 'helmstedt', 'index.html'), 'utf8');
    assert.match(heHtml, /class="link-button[^"]*"\s+href="https:\/\/kirche-echo\.de\/helmstedt"/, 'Helmstedt route must show Helmstedt button');
  });

  test('Surface image holders render correct images per location/surface', () => {
    const defaultHtml = fs.readFileSync(path.join(siteDir, 'index.html'), 'utf8');
    assert.match(defaultHtml, /es26-hero-1-1536x864\.webp/, 'Default page must render es26-hero-1 image');
    assert.doesNotMatch(defaultHtml, /echo-home-gifhorn/, 'Default page must not render Gifhorn image');

    const igHtml = fs.readFileSync(path.join(siteDir, 'instagram', 'index.html'), 'utf8');
    assert.match(igHtml, /es26-hero-1-1536x864\.webp/, 'Instagram page must render es26-hero-1 image');

    const gfHtml = fs.readFileSync(path.join(siteDir, 'gifhorn', 'index.html'), 'utf8');
    assert.match(gfHtml, /echo-home-gifhorn-1024x682\.webp/, 'Gifhorn route must render echo-home-gifhorn image');

    const wobHtml = fs.readFileSync(path.join(siteDir, 'wolfsburg', 'index.html'), 'utf8');
    assert.match(wobHtml, /echo-home-wolfsburg-1024x666\.webp/, 'Wolfsburg route must render echo-home-wolfsburg image');

    const heHtml = fs.readFileSync(path.join(siteDir, 'helmstedt', 'index.html'), 'utf8');
    assert.match(heHtml, /echo-home-helmstedt-803x1024\.webp/, 'Helmstedt route must render echo-home-helmstedt image');
  });

  test('Brand colors preserved across all surfaces (no surface color overrides)', () => {
    const css = fs.readFileSync(path.join(siteDir, 'css', 'main.css'), 'utf8');
    assert.doesNotMatch(css, /\[data-surface="[^"]+"\]\s*\{[^}]*--color-action-bg:/, 'Surfaces must not override brand action colors');
  });

  test('displayInDefault controls visibility on default page while custom surfaces retain their elements', () => {
    const defaultHtml = fs.readFileSync(path.join(siteDir, 'index.html'), 'utf8');
    assert.match(defaultHtml, /data-display-in-default="true"/, 'Default page must include items marked with displayInDefault="true"');
    assert.doesNotMatch(defaultHtml, /data-display-in-default="false"/, 'Default page must NOT include items marked with displayInDefault="false"');

    const testHtml = fs.readFileSync(path.join(siteDir, 'test', 'index.html'), 'utf8');
    assert.match(testHtml, /data-display-in-default="false"/, 'Test switcher page must preserve all items for dynamic client-side filtering');
  });

  test('Footer variations render correct location details, addresses, mailto and socials per campus', () => {
    // Gifhorn
    const gfHtml = fs.readFileSync(path.join(siteDir, 'gifhorn', 'index.html'), 'utf8');
    assert.match(gfHtml, /Echo Gifhorn/, 'Gifhorn footer must contain Echo Gifhorn');
    assert.match(gfHtml, /Schützenplatz 1/, 'Gifhorn footer must contain Schützenplatz 1');
    assert.match(gfHtml, /38518 Gifhorn/, 'Gifhorn footer must contain 38518 Gifhorn');
    assert.match(gfHtml, /href="mailto:info@kirche-echo\.de"/, 'Gifhorn footer must link to info@kirche-echo.de');
    assert.match(gfHtml, /href="https:\/\/www\.instagram\.com\/kircheimbrauhaus\/"/, 'Gifhorn footer must link to Gifhorn Instagram');
    assert.match(gfHtml, /href="https:\/\/whatsapp\.com\/channel\/0029Vb6fOzl11ulLp4jHlI0V"/, 'Gifhorn footer must link to Gifhorn WhatsApp');

    // Wolfsburg
    const wobHtml = fs.readFileSync(path.join(siteDir, 'wolfsburg', 'index.html'), 'utf8');
    assert.match(wobHtml, /Echo Wolfsburg/, 'Wolfsburg footer must contain Echo Wolfsburg');
    assert.match(wobHtml, /Leonardo Hotel Wolfsburg City Center/, 'Wolfsburg footer must contain Leonardo Hotel');
    assert.match(wobHtml, /Rathausstraße 1/, 'Wolfsburg footer must contain Rathausstraße 1');
    assert.match(wobHtml, /38440 Wolfsburg/, 'Wolfsburg footer must contain 38440 Wolfsburg');
    assert.match(wobHtml, /href="mailto:info@kirche-echo\.de"/, 'Wolfsburg footer must link to info@kirche-echo.de');
    assert.match(wobHtml, /href="https:\/\/www\.instagram\.com\/echo\.wolfsburg\/"/, 'Wolfsburg footer must link to Wolfsburg Instagram');
    assert.match(wobHtml, /href="https:\/\/whatsapp\.com\/channel\/0029VaAagKEI7BeE8yhtQW0f"/, 'Wolfsburg footer must link to Wolfsburg WhatsApp');

    // Helmstedt
    const heHtml = fs.readFileSync(path.join(siteDir, 'helmstedt', 'index.html'), 'utf8');
    const heFooter = heHtml.match(/<footer[\s\S]*?<\/footer>/)?.[0] || '';
    assert.match(heFooter, /Echo Helmstedt/, 'Helmstedt footer must contain Echo Helmstedt');
    assert.match(heFooter, /Helmstedt/, 'Helmstedt footer must contain Helmstedt');
    assert.doesNotMatch(heFooter, /Schützenplatz 1/, 'Helmstedt footer must not contain Gifhorn street');
    assert.doesNotMatch(heFooter, /Leonardo Hotel/, 'Helmstedt footer must not contain Wolfsburg venue');
    assert.match(heFooter, /href="mailto:david\.loewens@kib-gifhorn\.de\?subject=Kontakt%20EchoHelmstedt"/, 'Helmstedt footer must have mailto with subject');
    assert.match(heFooter, />david\.loewens@kib-gifhorn\.de</, 'Helmstedt footer must display David Loewens email');
    assert.match(heFooter, /href="https:\/\/www\.instagram\.com\/echo\.helmstedt\/"/, 'Helmstedt footer must link to Helmstedt Instagram');
    assert.match(heFooter, /href="https:\/\/whatsapp\.com\/channel\/0029VbDmLfb2P59tKORzGs21"/, 'Helmstedt footer must link to Helmstedt WhatsApp');

    // Test page contains all 3 footer variations with data-show-on
    const testHtml = fs.readFileSync(path.join(siteDir, 'test', 'index.html'), 'utf8');
    assert.match(testHtml, /data-show-on="default,gifhorn,instagram"/, 'Test page must render Gifhorn footer with data-show-on');
    assert.match(testHtml, /data-show-on="wolfsburg"/, 'Test page must render Wolfsburg footer with data-show-on');
    assert.match(testHtml, /data-show-on="helmstedt"/, 'Test page must render Helmstedt footer with data-show-on');
  });

  test('Unmatched surface parameter or route (e.g. /bs or ?surface=bs) redirects to home without params', () => {
    const switcherJs = fs.readFileSync(path.join(siteDir, 'assets', 'js', 'surface-switcher.js'), 'utf8');

    // Verify presence of unmatched route & parameter validation
    assert.match(switcherJs, /VALID_ROUTES/, 'surface-switcher.js must define VALID_ROUTES');
    assert.match(switcherJs, /isUnmatchedPath/, 'surface-switcher.js must check isUnmatchedPath');
    assert.match(switcherJs, /isUnmatchedParam/, 'surface-switcher.js must check isUnmatchedParam');
    assert.match(switcherJs, /isTestBlocked/, 'surface-switcher.js must check isTestBlocked');
    assert.match(switcherJs, /location\.replace\('\/'\)/, 'surface-switcher.js must redirect to home via location.replace');

    // Simulate validation logic against test scenarios
    const VALID_ROUTES = ['', 'index.html', 'home', 'gf', 'gifhorn', 'wob', 'wolfsburg', 'he', 'helmstedt', 'ig', 'instagram', 'test', 'impressum', 'datenschutz', 'assets', 'css', '404', '404.html'];
    const VALID_SLUGS = ['ig', 'instagram', 'wob', 'wolfsburg', 'gf', 'gifhorn', 'he', 'helmstedt', 'default', 'all'];

    const checkRedirect = (pathname, search = '', hostname = 'example.com') => {
      const seg = pathname.toLowerCase().replace(/^\/|\/$/g, '').split('/')[0];
      const q = new URLSearchParams(search);
      const p = q.get('surface') || q.get('switch') || q.get('campus') || q.get('location');

      const isPreview =
        hostname === 'localhost' ||
        hostname === '127.0.0.1' ||
        q.has('_storyblok') ||
        q.has('_storyblok_tk') ||
        q.has('preview') ||
        q.has('_token') ||
        q.has('_storyblok_c');

      const is404 = seg === '404' || seg === '404.html';
      const isTestBlocked = Boolean(seg === 'test' && !isPreview);
      const isUnmatchedPath = Boolean(seg && !VALID_ROUTES.includes(seg));
      const isUnmatchedParam = Boolean(p && !VALID_SLUGS.includes(p.toLowerCase().replace(/^\/|\/$/g, '').trim()));
      const isUnmatchedFlag = Boolean(q.has('bs') || q.has('/bs'));

      return !isPreview && (is404 || isTestBlocked || isUnmatchedPath || isUnmatchedParam || isUnmatchedFlag) ? '/' : null;
    };

    // /test is blocked on published production site, but allowed in preview
    assert.equal(checkRedirect('/test', '', 'example.com'), '/', '/test on published site must redirect to home');
    assert.equal(checkRedirect('/test', '?foo=bar', 'example.com'), '/', '/test without preview param must redirect to home');
    assert.equal(checkRedirect('/test', '?_storyblok=123', 'example.com'), null, '/test in Storyblok preview must be allowed');
    assert.equal(checkRedirect('/test', '?preview=true', 'example.com'), null, '/test with preview param must be allowed');
    assert.equal(checkRedirect('/test', '', 'localhost'), null, '/test on localhost must be allowed');

    // Unmatched cases must redirect to home ('/') when not in preview
    assert.equal(checkRedirect('/bs'), '/', '/bs must redirect to home');
    assert.equal(checkRedirect('/bs/'), '/', '/bs/ must redirect to home');
    assert.equal(checkRedirect('/bs', '?foo=bar'), '/', '/bs?foo=bar must redirect to home without params');
    assert.equal(checkRedirect('/', '?surface=bs'), '/', '?surface=bs must redirect to home without params');
    assert.equal(checkRedirect('/', '?switch=bs'), '/', '?switch=bs must redirect to home without params');
    assert.equal(checkRedirect('/', '?surface=/bs'), '/', '?surface=/bs must redirect to home without params');
    assert.equal(checkRedirect('/', '?bs'), '/', '?bs flag must redirect to home without params');
    assert.equal(checkRedirect('/gf', '?surface=bs'), '/', '/gf?surface=bs must redirect to home without params');
    assert.equal(checkRedirect('/unknown-path'), '/', 'unknown path must redirect to home');

    // 404 page redirects automatically to root when not in preview
    assert.equal(checkRedirect('/404'), '/', '/404 must redirect to home');
    assert.equal(checkRedirect('/404.html'), '/', '/404.html must redirect to home');
    assert.equal(checkRedirect('/404', '?_storyblok=123'), null, '404 in preview must not redirect');

    // Storyblok preview requests are exempt from redirects to prevent interrupting the editor
    assert.equal(checkRedirect('/unknown-path', '?_storyblok=123'), null, 'Storyblok preview on unknown path must be exempt from redirect');
    assert.equal(checkRedirect('/home'), null, '/home must not redirect');
    assert.equal(checkRedirect('/home/'), null, '/home/ must not redirect');
    assert.equal(checkRedirect('/home', '?_storyblok=123'), null, '/home with _storyblok must not redirect');
    assert.equal(checkRedirect('/', '?_storyblok=123&surface=bs'), null, 'Storyblok preview with surface param must not redirect');

    // Valid cases must NOT redirect (return null)
    assert.equal(checkRedirect('/gf'), null, '/gf must not redirect');
    assert.equal(checkRedirect('/gifhorn'), null, '/gifhorn must not redirect');
    assert.equal(checkRedirect('/wob'), null, '/wob must not redirect');
    assert.equal(checkRedirect('/wolfsburg'), null, '/wolfsburg must not redirect');
    assert.equal(checkRedirect('/he'), null, '/he must not redirect');
    assert.equal(checkRedirect('/helmstedt'), null, '/helmstedt must not redirect');
    assert.equal(checkRedirect('/ig'), null, '/ig must not redirect');
    assert.equal(checkRedirect('/impressum'), null, '/impressum must not redirect');
    assert.equal(checkRedirect('/datenschutz'), null, '/datenschutz must not redirect');
    assert.equal(checkRedirect('/'), null, '/ root must not redirect');
    assert.equal(checkRedirect('/', '?surface=gf'), null, '?surface=gf must not redirect');
    assert.equal(checkRedirect('/', '?surface=gifhorn'), null, '?surface=gifhorn must not redirect');
    assert.equal(checkRedirect('/', '?theme=dark'), null, '?theme=dark must not redirect');
  });

  test('Netlify configuration redirects unmatched routes to 404, maps /home to /, and blocks /test in production', () => {
    const toml = fs.readFileSync(path.resolve('netlify.toml'), 'utf8');
    const headers = fs.readFileSync(path.resolve('_headers'), 'utf8');

    assert.match(toml, /from\s*=\s*"\/\*"\s*\n\s*to\s*=\s*"\/404\.html"\s*\n\s*status\s*=\s*404/, 'Netlify configuration must serve /404.html for /* with 404 status');
    assert.match(toml, /from\s*=\s*"\/test"\s*\n\s*to\s*=\s*"\/"\s*\n\s*status\s*=\s*302/, 'Netlify configuration must redirect /test to / in production');
    assert.match(toml, /from\s*=\s*"\/test"\s*\n\s*query\s*=\s*\{_storyblok\s*=\s*":storyblok"\}\s*\n\s*to\s*=\s*"\/test\/index\.html"/, 'Netlify configuration must permit /test with _storyblok preview');
    assert.match(toml, /from\s*=\s*"\/home"\s*\n\s*to\s*=\s*"\/"\s*\n\s*status\s*=\s*200/, 'Netlify configuration must map /home to / with 200 rewrite');

    // Cross-Origin-Opener-Policy must not be set as it breaks Storyblok Visual Editor postMessage iframe connection
    assert.doesNotMatch(toml, /Cross-Origin-Opener-Policy/, 'Netlify toml must not set Cross-Origin-Opener-Policy');
    assert.doesNotMatch(headers, /Cross-Origin-Opener-Policy/, '_headers must not set Cross-Origin-Opener-Policy');

    // Catch-all query rewrites for /* must not be present
    assert.doesNotMatch(toml, /from\s*=\s*"\/\*"\s*\n\s*query\s*=/, 'Netlify toml must not have catch-all query rewrites for /*');
  });

  test('404 page exists and contains automatic redirect to root, accessible link, and favicon', () => {
    const notFoundHtml = fs.readFileSync(path.resolve('_site/404.html'), 'utf8');
    assert.match(notFoundHtml, /http-equiv="refresh"\s+content="0;\s*url=\/"/, '404 page must auto-refresh to root');
    assert.match(notFoundHtml, /<a\s+href="\/"[^>]*class="[^"]*link-button[^"]*"[^>]*>Zurück zur Startseite<\/a>/, '404 page must render an accessible fallback link to /');
    assert.doesNotMatch(notFoundHtml, /class="lazy-loader"/, '404 page must not render lazy-loader');
    assert.match(notFoundHtml, /<link\s+rel="icon"\s+type="image\/webp"\s+href="\/assets\/images\/favicon\.webp">/, '404 page must render favicon.webp in head');
  });
});


