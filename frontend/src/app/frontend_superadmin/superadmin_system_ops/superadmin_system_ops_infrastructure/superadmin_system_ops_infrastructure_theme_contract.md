# Infrastructure Theme Contract

This module consumes only semantic design-system tokens. The global stylesheet remains the source of truth; this contract documents the exact tokens observed in the module code.

## Consumed Global Tokens
- `--primary`
- `--primary-hover`
- `--primary-subtle`
- `--bg-card`
- `--bg-sidebar`
- `--bg-input`
- `--bg-overlay`
- `--surface-hover`
- `--focus-ring`
- `--border`
- `--border-focus`
- `--text-primary`
- `--text-secondary`
- `--text-on-primary`
- `--skeleton-base`
- `--skeleton-highlight`
- `--success-bg`
- `--success-text`
- `--warning-bg`
- `--warning-text`
- `--danger-bg`
- `--danger-text`
- `--shadow-card`
- `--shadow-dialog`

## Portability Requirements
- Semantic Tailwind classes map to the canonical variables defined by `WEB_FRONTEND_UI_UX_DESIGN.md`.
- No raw hex/RGB/HSL theme values, arbitrary CSS-variable Tailwind classes, or semantic background opacity modifiers may be introduced.
- Solid semantic backgrounds must use the matching `text-on-*` token where the design system requires contrasting text.
- Typography, geometry, radius, focus-ring, responsive, motion-safe, and elevation behavior follow the global design system rather than feature-local color definitions.
