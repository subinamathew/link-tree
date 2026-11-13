import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const cssPath = path.resolve('_site/css/main.css');

describe('Component State Changes & CSS Verification', () => {
  const css = fs.readFileSync(cssPath, 'utf8');

  test('LinkButton interactive state changes (:hover, :active, :focus-visible)', () => {
    assert.match(css, /\.link-button:hover/, 'LinkButton must define :hover state');
    assert.match(css, /\.link-button:active/, 'LinkButton must define :active state');
    assert.match(css, /\.link-button:focus-visible/, 'LinkButton must define :focus-visible state');
    assert.match(css, /translateY\(-1px\)/, 'LinkButton :hover must have translateY micro-interaction');
  });

  test('DropdownCard open and interactive state changes', () => {
    assert.match(css, /\.dropdown-card\[open\]/, 'DropdownCard must define [open] state');
    assert.match(css, /rotate\(180deg\)/, 'DropdownCard open state must rotate chevron 180deg');
    assert.match(css, /\.dropdown-card__summary:focus-visible/, 'DropdownCard summary must define :focus-visible');
    assert.match(css, /\.dropdown-card__chevron\{position:absolute;/, 'DropdownCard chevron must be absolutely positioned to keep label centered');
    assert.match(css, /\.dropdown-card__summary\{[^}]*text-align:center/, 'DropdownCard summary must be centered');
    assert.match(css, /\.dropdown-card__action-link:hover/, 'DropdownCard action link must define :hover');
    assert.match(css, /\.dropdown-card__action-link:focus-visible/, 'DropdownCard action link must define :focus-visible');
  });

  test('ImageCard interactive states (:hover, :active, :focus-visible, arrow slide)', () => {
    assert.match(css, /\.image-card:hover/, 'ImageCard must define :hover state');
    assert.match(css, /\.image-card:active/, 'ImageCard must define :active state');
    assert.match(css, /\.image-card:focus-visible/, 'ImageCard must define :focus-visible state');
    assert.match(css, /\.image-card:hover\s+\.image-card__arrow/, 'ImageCard :hover must animate arrow indicator');
    assert.match(css, /translateX\(2px\)/, 'Arrow icon must slide right on card hover');
  });

  test('VideoLinkCard interactive and playback states', () => {
    assert.match(css, /\.video-link-card:not\(\.video-link-card--playing\):hover/, 'VideoLinkCard must style hover when not playing');
    assert.match(css, /\.video-link-card:not\(\.video-link-card--playing\):active/, 'VideoLinkCard must style active when not playing');
    assert.match(css, /\.video-link-card__play-btn:focus-visible/, 'Play button must define :focus-visible');
    assert.match(css, /\.video-link-card:focus-within/, 'VideoLinkCard must style :focus-within');
  });

  test('SocialButton interactive states (:hover, :active, :focus-visible)', () => {
    assert.match(css, /\.social-button:hover/, 'SocialButton must define :hover state');
    assert.match(css, /\.social-button:active/, 'SocialButton must define :active state');
    assert.match(css, /\.social-button:focus-visible/, 'SocialButton must define :focus-visible state');
  });

  test('SurfaceSwitcher interactive states (:hover, .is-active, [aria-pressed="true"], :focus-visible)', () => {
    assert.match(css, /\.surface-switcher__btn:hover/, 'SurfaceSwitcher button must define :hover');
    assert.match(css, /\.surface-switcher__btn\.is-active|\.surface-switcher__btn\[aria-pressed="true"\]/, 'SurfaceSwitcher must define active chip state');
    assert.match(css, /\.surface-switcher__btn:focus-visible/, 'SurfaceSwitcher button must define :focus-visible');
  });

  test('Accessible Focus Rings across components', () => {
    assert.match(css, /outline-offset:\s*(2px|3px)/, 'Focus rings must have appropriate outline-offset for WCAG visibility');
    assert.match(css, /outline:\s*3px solid var\(--color-focus-ring\)/, 'Primary controls must use strong 3px focus ring');
  });

  test('Accessibility prefers-reduced-motion reset', () => {
    assert.match(css, /@media\s*\(prefers-reduced-motion:\s*reduce\)/, 'CSS must support prefers-reduced-motion');
    assert.match(css, /transition-duration:\s*0?\.01ms\s*!important/, 'Reduced motion must collapse transition durations');
  });
});
