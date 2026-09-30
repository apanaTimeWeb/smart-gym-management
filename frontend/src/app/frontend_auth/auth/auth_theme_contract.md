# Auth Module — Theme Portability Contract

`auth/` consumes the global Smart Gym 360 design system through semantic Tailwind tokens. The module defines no global business color tokens.

## Required semantic color tokens
- `--primary` → `bg-primary`
- `--primary-hover` → `bg-primary-hover`
- `--primary-subtle` → `bg-primary-subtle`
- `--text-primary` → `text-primary`
- `--text-secondary` → `text-secondary`
- `--text-disabled` → `text-disabled`
- `--text-on-primary` → `text-on-primary`
- `--danger-text` → `text-danger`
- `--danger-bg` → `bg-danger-bg`
- `--success` → `bg-success` (status indicator only)
- `--success-text` → `text-success`
- `--success-bg` → `bg-success-bg`
- `--warning-text` → `text-warning`
- `--warning-bg` → `bg-warning-bg`

## Required surfaces
- `--bg-page` → `bg-page`
- `--bg-sidebar` → `bg-sidebar`
- `--bg-card` → `bg-card`
- `--bg-input` → `bg-input`
- `--skeleton-base` → `bg-skeleton-base`
- `--skeleton-highlight` → `bg-skeleton-highlight`

## Required borders/focus/elevation
- `--border` → `border-border`
- `--border-focus` → `border-focus`
- `--focus-ring` → `ring-primary`
- `--shadow-card` → `shadow-card`

## Required motion tokens
- `duration-base`
- `motion-safe:transition-*`
- `motion-safe:active:scale-*`
- `motion-safe:animate-spin`
- `motion-safe:animate-pulse`
- `motion-safe:*transform`

## Typography
Auth uses the global default `Inter` typography system and semantic text tokens. No feature-local font token is defined.

## Portability constraints
- No raw hex/RGBA values in Auth JSX.
- No arbitrary `bg-[...]`, `text-[...]`, `border-[...]`, or `ring-[...]` theme values.
- No semantic background opacity modifiers such as `bg-success/10`.
- Solid `bg-primary` is paired with `text-on-primary`.
- Validation feedback uses `bg-danger-bg` with `text-danger`; the form alert does not depend on an undefined `border-danger` token.
