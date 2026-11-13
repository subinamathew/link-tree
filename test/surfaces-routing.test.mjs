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
});
