# superadmin_tickets — Theme Contract

## Exact Consumed Semantic Tokens
- bg-card
- bg-danger-bg
- bg-header
- bg-input
- bg-overlay
- bg-primary
- bg-primary-hover
- bg-primary-subtle
- bg-skeleton-base
- bg-skeleton-highlight
- bg-success-bg
- bg-surface-hover
- border-border
- border-focus
- ring-primary
- shadow-card
- text-danger
- text-on-primary
- text-primary
- text-success
- text-warning

## Radius
- rounded-full
- rounded-lg
- rounded-md
- rounded-xl

## Shadows
- shadow-card
- shadow-dialog

## Motion
- motion-safe:active
- motion-safe:animate-pulse
- motion-safe:animate-spin
- motion-safe:duration-base
- motion-safe:transition-all
- motion-safe:transition-colors

## Chart Tokens
- No chart CSS-variable token references detected in source; chart components must inherit approved semantic chart configuration.

## Global Design Ownership
The global design system owns the semantic color/surface/typography/radius/shadow/motion token definitions. This module consumes those semantics and does not define global business tokens.

## Required Host Token Chain
`UI/UX design source → canonical CSS variable → Tailwind mapping → this module theme contract → JSX/CSS usage`. The supplied frontend bundle does not include the host global CSS/Tailwind mapping, so the final audit must not claim the host token-definition chain is runtime-verified.

## Forbidden Patterns
- Raw hex/RGB colors in production JSX/CSS.
- Semantic opacity modifiers.
- Arbitrary Tailwind CSS-variable token definitions.
- Business status registries in global UI primitives.
- Motion/animation without `motion-safe:` protection.
