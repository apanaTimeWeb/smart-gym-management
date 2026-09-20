# Trainer Theme Contract

Trainer shell consumes the Smart Gym 360 global design system through semantic Tailwind tokens.

Required global tokens used by Trainer shell/feedback/shared primitives:
- Surfaces: `--bg-page`, `--bg-card`, `--bg-floating`, `--bg-overlay`, `--bg-popover`, `--bg-sidebar`, `--bg-header`, `--bg-input`.
- Borders/focus: `--border`, `--border-focus`, `--focus-ring`.
- Text: `--text-primary`, `--text-secondary`, `--text-disabled`, `--text-on-primary`, `--text-on-danger`, `--text-on-success`, `--text-on-info`.
- Semantic state: `--success-text`, `--success-bg`, `--warning-text`, `--warning-bg`, `--danger-text`, `--danger-bg`, `--info-text`, `--info-bg`, `--purple-text`, `--purple-bg`.
- Loading: `--skeleton-base`, `--skeleton-highlight`.
- Elevation: `--shadow-card`, `--shadow-popover`, `--shadow-dialog`, `--shadow-toast`.

Trainer JSX must use the mapped semantic Tailwind classes and must not use raw hex colors, arbitrary color values, or legacy global color utility names where a semantic token exists.
