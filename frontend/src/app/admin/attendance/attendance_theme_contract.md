# Admin attendance — Theme Contract

## Ownership
This feature consumes global semantic design tokens only; feature-specific business status mappings remain owned by the `attendance` module.

## Exact Global Tokens Used by This Module
- `--bg-card`
- `--bg-input`
- `--bg-page`
- `--border`
- `--danger-bg`
- `--danger-text`
- `--focus-ring`
- `--info-bg`
- `--info-text`
- `--primary`
- `--success-bg`
- `--success-text`
- `--text-on-primary`
- `--text-primary`
- `--text-secondary`
- `--warning-bg`
- `--warning-text`

## Required Rules
- Feature JSX MUST use the canonical Tailwind semantic token classes mapped by `web_global_design.md`.
- No raw hex/RGB/RGBA colors, arbitrary CSS-variable Tailwind values, or undefined business color variables are permitted in this module.
- Business statuses and payment modes are mapped locally to the global semantic/status/payment tokens; the global design system does not own the feature status registry.
- Any new global token dependency MUST be added to this file in the same change.
- Responsive, focus-visible, reduced-motion, modal/popover surface, and accessibility behavior must follow the global design system.

## Verified Architecture Boundary
- Business Feature Dependencies: None unless explicitly documented in `attendance_features.md`.
- Role-Level Business Dependencies: Only documented Admin shell context where the feature legitimately consumes it.
- Global Design Dependency: `web_global_design.md` semantic tokens and zero-business UI primitives.
