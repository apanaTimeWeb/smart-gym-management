# superadmin_gyms — Theme Contract

This contract is generated from the current module source tree and lists the exact approved global visual semantics consumed by this module/sub-feature. Host CSS/Tailwind resolution remains a host-level integration responsibility.

## Exact Consumed Semantic Tokens
- `bg-card` → `--bg-card`
- `bg-danger` → `--danger`
- `bg-danger-bg` → `--danger-bg`
- `bg-floating` → `--bg-floating`
- `bg-input` → `--bg-input`
- `bg-overlay` → `--bg-overlay`
- `bg-page` → `--bg-page`
- `bg-primary` → `--primary`
- `bg-primary-hover` → `--primary-hover`
- `bg-primary-subtle` → `--primary-subtle`
- `bg-purple-bg` → `--purple-bg`
- `bg-skeleton-base` → `--skeleton-base`
- `bg-skeleton-highlight` → `--skeleton-highlight`
- `bg-success` → `--success`
- `bg-success-bg` → `--success-bg`
- `bg-surface-highlight` → `--surface-highlight`
- `bg-surface-hover` → `--surface-hover`
- `bg-warning` → `--warning`
- `bg-warning-bg` → `--warning-bg`
- `border-border` → `--border`
- `border-focus` → `--border-focus`
- `ring-primary` → `--focus-ring`
- `shadow-card` → `--shadow-card`
- `shadow-dialog` → `--shadow-dialog`
- `text-danger` → `--danger-text`
- `text-disabled` → `--text-disabled`
- `text-on-danger` → `--text-on-danger`
- `text-on-primary` → `--text-on-primary`
- `text-on-success` → `--text-on-success`
- `text-on-warning` → `--text-on-warning`
- `text-primary` → `--text-primary`
- `text-purple-text` → `--purple-text`
- `text-secondary` → `--text-secondary`
- `text-success` → `--success-text`
- `text-warning` → `--warning-text`

## Radius Tokens
- `rounded-full`
- `rounded-lg`
- `rounded-md`
- `rounded-xl`

## Shadow Tokens
- `shadow-card`
- `shadow-dialog`

## Motion Tokens
- `motion-safe:active:scale-95`
- `motion-safe:animate-in`
- `motion-safe:animate-pulse`
- `motion-safe:animate-spin`
- `motion-safe:duration-base`
- `motion-safe:ease-in-out`
- `motion-safe:fade-in`
- `motion-safe:transition-all`
- `motion-safe:transition-colors`
- `motion-safe:transition-opacity`

## Chart CSS Tokens
- None detected in source.

## Global Design Ownership
- Semantic color, surface, typography, radius, shadow, motion, and chart definitions belong to the global design system.
- Business status registries, business configuration, and feature logic remain module-owned.

## Required Host Token Chain
`global design source → canonical CSS variable → Tailwind semantic mapping → module theme contract → JSX/CSS usage`.
The repaired role package does not contain host-level `globals.css`/Tailwind configuration, so host token resolution remains `NOT VERIFIED` until host integration.

## Forbidden Patterns
- Raw hex/RGB/HSL theme colors in production JSX/CSS.
- Arbitrary `bg-[...]`, `text-[...]`, `border-[...]`, or `ring-[...]` theme references.
- Semantic background opacity modifiers such as `bg-success/10`.
- Feature-specific global design-token definitions.
- Motion/animation without `motion-safe:` protection.
