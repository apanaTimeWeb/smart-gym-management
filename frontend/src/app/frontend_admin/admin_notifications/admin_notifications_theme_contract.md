# Admin notifications — Theme Contract

## Ownership
This feature consumes global semantic design tokens only; feature-specific business status mappings remain owned by the `notifications` module.

## Exact Global Tokens Used by This Module
- `--bg-card`
- `--bg-header`
- `--bg-input`
- `--border`
- `--danger-text`
- `--focus-ring`
- `--primary`
- `--primary-hover`
- `--text-on-primary`
- `--text-primary`
- `--text-secondary`

## Required Rules
- Feature JSX MUST use the canonical Tailwind semantic token classes mapped by `WEB_FRONTEND_UI_UX_DESIGN.md`.
- No raw hex/RGB/RGBA colors, arbitrary CSS-variable Tailwind values, or undefined business color variables are permitted in this module.
- Business statuses and payment modes are mapped locally to the global semantic/status/payment tokens; the global design system does not own the feature status registry.
- Any new global token dependency MUST be added to this file in the same change.
- Responsive, focus-visible, reduced-motion, modal/popover surface, and accessibility behavior must follow the global design system.

## Verified Architecture Boundary
- Business Feature Dependencies: None. The module does not import sibling business modules.
- Role-Level Business Dependencies: Only documented Admin shell context where the feature legitimately consumes it.
- Global Design Dependency: `WEB_FRONTEND_UI_UX_DESIGN.md` semantic tokens and zero-business UI primitives.

## V17 Verified Theme Dependencies
This section is mechanically derived from the current TSX class usage in this repair snapshot.

### Semantic / surface tokens
- `--bg-card`
- `--bg-header`
- `--bg-input`
- `--bg-popover`
- `--border`
- `--danger-bg`
- `--danger-text`
- `--focus-ring`
- `--primary`
- `--primary-subtle`
- `--shadow-card`
- `--shadow-popover`
- `--skeleton-base`
- `--text-disabled`
- `--text-on-primary`
- `--text-primary`
- `--text-secondary`

### Radius tokens
- `--radius-full`
- `--radius-lg`
- `--radius-xl`

### Motion tokens
- `duration-base`

### Chart tokens
- None.
