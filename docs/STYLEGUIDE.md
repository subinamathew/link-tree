# Styleguide

## Purpose

The design system is intentionally token-first so the brand can be replaced later without rewriting components.

When a new styleguide is supplied, an agent should update token values first and only change component CSS when the new styleguide introduces a genuinely new semantic requirement.

## Token hierarchy

### Primitive tokens
Raw palette and scale values.

Examples:
- `--primitive-neutral-0`
- `--primitive-neutral-900`
- `--primitive-brand-500`
- `--primitive-space-4`

### Semantic tokens
Meaningful application roles.

Examples:
- `--color-page-bg`
- `--color-text`
- `--color-text-muted`
- `--color-surface`
- `--color-border`
- `--color-action-bg`
- `--color-action-text`
- `--color-focus-ring`

Components must consume semantic tokens, not primitive color tokens directly.

## Typography

Default:
- system font stack;
- no remote font requests.

Suggested stack:

```css
font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
```

Keep:
- body text at least 1rem by default;
- comfortable line-height;
- headings with sensible responsive scaling via `clamp()`.

## Layout

- mobile-first;
- primary content max width approximately 42rem;
- centered page shell;
- consistent vertical rhythm;
- touch targets approximately 44px minimum where practical;
- media cards preserve declared aspect ratio.

## Radius

Use semantic radius values:
- small: badges/minor controls;
- medium: buttons;
- large: cards/media.

Do not invent component-specific radius values without adding a token.

## Shadows

Use sparingly. Prefer borders and spacing first.

## Motion

Default to little or no motion. Any animation must:
- respect `prefers-reduced-motion`;
- not block interaction;
- not be required for comprehension.

## Surface styling

Surface variants such as Instagram or LinkedIn may alter:
- accent color;
- selected emphasis;
- small contextual labels.

They should not create separate design systems unless explicitly required.

## Updating from a future uploaded styleguide

Agent workflow:

1. Extract brand palette, typography, spacing, radius, border, and motion rules.
2. Map values to existing semantic tokens.
3. Add primitive tokens only when necessary.
4. Add semantic tokens only when no existing role is appropriate.
5. Run contrast checks.
6. Review all Storybook components.
7. Do not hard-code the new palette directly into component files.
8. Document intentional deviations.

## Accessibility

- normal text contrast: target WCAG AA;
- focus states must be visibly distinct;
- never communicate state by color alone;
- decorative images use empty alt text;
- meaningful image cards require useful alt text.
