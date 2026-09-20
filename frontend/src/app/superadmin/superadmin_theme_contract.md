# Superadmin — Theme Contract

## Required semantic tokens

`bg-page`, `bg-card`, `bg-header`, `bg-sidebar`, `bg-input`, `bg-floating`, `bg-overlay`, `bg-popover`, `bg-skeleton-base`, `bg-skeleton-highlight`, `bg-surface-hover`, `bg-surface-highlight`, `bg-surface-zebra`, `bg-primary`, `bg-primary-subtle`, `text-primary`, `text-secondary`, `text-disabled`, `text-on-primary`, `text-on-danger`, `text-on-success`, `text-on-info`, `text-success`, `text-warning`, `text-danger`, `text-info`, `bg-success-bg`, `bg-warning-bg`, `bg-danger-bg`, `bg-info-bg`, `border-border`, `border-focus`, `ring-primary`, `shadow-card`, `shadow-popover`, `shadow-dialog`, `shadow-toast`.

## Geometry / typography
Use the global `Inter` typography, layout geometry, control heights, touch targets, table row heights, radii, and spacing defined by `web_global_design(1).md`.

## Interaction
Use explicit focus-visible states, motion-safe transitions/animations, keyboard/touch alternatives, semantic modal/popover surfaces, and documented z-index layers.

## Responsive
Maintain usability at desktop, tablet, and narrow mobile widths. Dense tables follow the documented mobile card-stack strategy.

## Prohibited
No hardcoded feature colors, arbitrary CSS-variable Tailwind values, semantic background opacity modifiers, random z-index values, or feature-specific global theme definitions.
