import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const siteDir = path.resolve('_site');

describe('Component Markup & Accessibility Contracts', () => {
  const indexHtml = fs.readFileSync(path.join(siteDir, 'index.html'), 'utf8');
  const testHtml = fs.readFileSync(path.join(siteDir, 'test', 'index.html'), 'utf8');

  test('ProfileHeader component renders avatar and name', () => {
    assert.match(indexHtml, /class="profile-header"/, 'ProfileHeader container must exist');
    assert.match(indexHtml, /class="profile-header__name"/, 'ProfileHeader name must exist');
    assert.match(indexHtml, /Echo Kirche/, 'ProfileHeader must contain name text');
    assert.match(indexHtml, /class="profile-header__avatar"/, 'ProfileHeader avatar must exist');
  });

  test('LinkButton component renders accessible link with states and icon', () => {
    assert.match(indexHtml, /class="link-button/, 'LinkButton must have link-button class');
    assert.match(indexHtml, /href="https?:\/\//, 'LinkButton must have valid href');
    assert.match(indexHtml, /rel="noopener noreferrer"/, 'External links must have safe rel');
    assert.match(indexHtml, /class="link-button__icon"/, 'LinkButton icon wrapper must exist');
    assert.match(indexHtml, /class="link-button__label"/, 'LinkButton label wrapper must exist');
  });

  test('DropdownCard component renders accessible details/summary pattern', () => {
    assert.match(indexHtml, /<details class="dropdown-card"/, 'DropdownCard must use semantic <details>');
    assert.match(indexHtml, /<summary class="dropdown-card__summary link-button/, 'Summary must be styled as link-button');
    assert.match(indexHtml, /class="dropdown-card__chevron"/, 'DropdownCard must have chevron indicator');
    assert.match(indexHtml, /class="dropdown-card__content"/, 'DropdownCard drawer content must exist');
    assert.match(indexHtml, /class="dropdown-card__columns"/, 'DropdownCard column layout container must exist');
    assert.match(indexHtml, /class="dropdown-card__column"/, 'DropdownCard column items must exist');
    assert.match(indexHtml, /class="dropdown-card__column-badge"/, 'DropdownCard column badges must exist');
    assert.match(indexHtml, /class="dropdown-card__kids-badge"/, 'DropdownCard kids badge must exist');
    assert.match(indexHtml, /fa-child/, 'DropdownCard must render tiny child icon');
    assert.match(indexHtml, /Echo Kids verfügbar/, 'DropdownCard must show Echo Kids available label');
    assert.match(indexHtml, /BSK-Saal, Schützenplatz 3/, 'DropdownCard must show BSK-Saal venue');
    assert.match(indexHtml, /class="dropdown-card__action-link"/, 'DropdownCard action link must exist');
    assert.match(indexHtml, /Gifhorn \(10:00\)/, 'DropdownCard must include Gifhorn 10:00 card');
    assert.match(indexHtml, /Gifhorn \(12:00\)/, 'DropdownCard must include Gifhorn 12:00 card');
    assert.match(indexHtml, /Wolfsburg/, 'DropdownCard default must include Wolfsburg');
    assert.match(indexHtml, /Helmstedt/, 'DropdownCard default must include Helmstedt');
  });

  test('ImageCardHorizontal & ImageCardVertical render media cards with aspect ratios and arrows', () => {
    assert.match(indexHtml, /class="image-card image-card--horizontal"/, 'ImageCardHorizontal must exist');
    assert.match(indexHtml, /class="image-card__media"/, 'Image media wrapper must exist');
    assert.match(indexHtml, /class="image-card__title"/, 'Image title must exist');
    assert.match(indexHtml, /class="image-card__arrow"/, 'Interactive arrow badge must exist');
    assert.match(indexHtml, /loading="lazy"/, 'Images must use native lazy loading');
  });

  test('VideoLinkCard renders 2-click consent facade without initial iframe', () => {
    assert.match(indexHtml, /class="video-link-card"/, 'VideoLinkCard container must exist');
    assert.match(indexHtml, /class="video-link-card__play-btn"/, 'Play facade button must exist');
    assert.match(indexHtml, /class="video-link-card__play-badge"/, 'Play badge must exist');
    assert.match(indexHtml, /data-video-embed="youtube"/, 'Data attribute for facade embed must exist');
    assert.doesNotMatch(indexHtml, /<iframe/i, 'No initial <iframe> allowed on page load');
  });

  test('FooterLegal renders address, legal links, and social buttons', () => {
    assert.match(indexHtml, /class="footer-legal"/, 'FooterLegal container must exist');
    assert.match(indexHtml, /class="footer-legal__address"/, 'Footer address must exist');
    assert.match(indexHtml, /href="[^"]*\/impressum\/"/, 'Impressum link must exist');
    assert.match(indexHtml, /href="[^"]*\/datenschutz\/"/, 'Datenschutz link must exist');
    assert.match(indexHtml, /class="[^"]*\bsocial-button\b/, 'Social icon buttons must exist');
    assert.match(indexHtml, /aria-label="/, 'Social buttons must have accessible aria-labels');
  });

  test('SurfaceSwitcher renders only on /test page', () => {
    assert.doesNotMatch(indexHtml, /class="surface-switcher"/, 'Default page must NOT have surface-switcher');
    assert.match(testHtml, /class="surface-switcher"/, 'Test page MUST have surface-switcher');
    assert.match(testHtml, /class="surface-switcher__btn"/, 'Switcher buttons must exist on /test');
    assert.match(testHtml, /data-switch-value="gifhorn"/, 'Gifhorn switcher target must exist');
    assert.match(testHtml, /data-switch-value="wolfsburg"/, 'Wolfsburg switcher target must exist');
    assert.match(testHtml, /data-switch-value="helmstedt"/, 'Helmstedt switcher target must exist');
    assert.match(testHtml, /data-switch-value="instagram"/, 'Instagram switcher target must exist');
    assert.match(testHtml, /role="toolbar"/, 'Toolbar role must exist for switcher buttons');
  });
});
