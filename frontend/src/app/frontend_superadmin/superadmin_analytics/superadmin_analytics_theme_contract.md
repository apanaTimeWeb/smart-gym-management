# superadmin_analytics — Theme Contract

This contract is generated from the current module source tree and lists the exact approved global visual semantics consumed by this module/sub-feature. Host CSS/Tailwind resolution remains a host-level integration responsibility.

## Exact Consumed Semantic Tokens
- `bg-card` → `--bg-card`
- `bg-danger-bg` → `--danger-bg`
- `bg-floating` → `--bg-floating`
- `bg-input` → `--bg-input`
- `bg-primary` → `--primary`
- `bg-primary-hover` → `--primary-hover`
- `bg-skeleton-base` → `--skeleton-base`
- `bg-skeleton-highlight` → `--skeleton-highlight`
- `bg-success-bg` → `--success-bg`
- `bg-warning-bg` → `--warning-bg`
- `border-border` → `--border`
- `ring-primary` → `--focus-ring`
- `shadow-card` → `--shadow-card`
- `text-danger` → `--danger-text`
- `text-on-primary` → `--text-on-primary`
- `text-primary` → `--text-primary`
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

## Motion Tokens
- `motion-safe:active:scale-95`
- `motion-safe:animate-pulse`
- `motion-safe:duration-base`
- `motion-safe:hover:-translate-y-1`
- `motion-safe:transition-all`
- `motion-safe:transition-colors`

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
