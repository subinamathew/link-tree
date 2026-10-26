# Germany / EU Legal & Privacy Implementation Notes

This document is engineering guidance, not legal advice.

## Required legal surfaces

For a Germany-oriented public site, provide stable, easy-to-find links to:
- Impressum
- Datenschutz

The exact obligations and wording depend on the operator, purpose, hosting setup, and enabled services.

## Impressum implementation

Create `/impressum/` and populate it from operator configuration.

Potential fields to support, depending on the actual operator:
- legal name / responsible person;
- address;
- contact details;
- company registration details where applicable;
- VAT ID where applicable;
- responsible editorial person where applicable.

Do not populate non-applicable fields and do not invent placeholder values in production.

## Datenschutz implementation

The privacy notice should reflect what the deployed site actually processes, including:
- hosting/log data;
- contact mechanisms;
- external links;
- any optional embeds/analytics if later enabled;
- data-subject rights and relevant contact details.

Hosting providers may process request metadata even when the application itself uses no cookies.

## No-cookie / no-consent baseline

The engineering target is to avoid adding technologies that require consent before they run.

Strict mode therefore forbids by default:
- analytics;
- ad/retargeting pixels;
- social widgets;
- YouTube iframes;
- Instagram/TikTok embeds;
- remote font services;
- non-essential cookies;
- non-essential localStorage/sessionStorage;
- fingerprinting or comparable identifiers.

A site having no application cookies does not automatically eliminate all privacy obligations. The privacy notice still needs to match hosting and actual processing.

## YouTube

In strict mode:
- render a normal outbound link;
- optionally render a locally stored thumbnail;
- do not load YouTube domains before user navigation.

Any future inline embed requires a dedicated privacy review and likely a consent-aware design depending on implementation.

## Social networks

Instagram/TikTok/LinkedIn/etc. should be normal outbound links unless an embed feature is deliberately added later.

## Third-party dependency ledger

Every external origin contacted by the production page must be listed in `docs/PRIVACY-DEPENDENCIES.md`.

The intended strict-mode initial state is zero third-party origins on page load.

## Legal review trigger

Require human/legal review when adding:
- analytics;
- embedded media;
- forms that transmit personal data;
- newsletters;
- marketing tools;
- externally hosted fonts;
- personalization identifiers;
- authentication;
- advertising;
- a new hosting/data-processing provider.
