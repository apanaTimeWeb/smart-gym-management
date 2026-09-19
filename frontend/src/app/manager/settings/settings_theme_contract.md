# Manager Settings — Theme Contract

Source of truth: `web_global_design.md`.

## Semantic tokens consumed by this module

- `--bg-page` → `bg-page`
- `--bg-card` → `bg-card`
- `--bg-input` → `bg-input`
- `--bg-overlay` → `bg-overlay`
- `--border` → `border-border`
- `--border-focus` → `border-focus` / `focus-visible:ring-primary`
- `--primary` → `bg-primary`, `text-primary` where semantically appropriate
- `--primary-subtle` → `bg-primary-subtle`
- `--text-primary` → `text-primary`
- `--text-secondary` → `text-secondary`
- `--danger-text` → `text-danger`
- `--danger-bg` → `bg-danger-bg`
- `--success-text` / `--success-bg` where future setting feedback requires semantic success state
- `--skeleton-base` / `--skeleton-highlight` for route loading UI
- `--shadow-card` for elevated sections
- `--shadow-dialog` for error/dialog surfaces

## Forbidden

- Raw hex/RGB colors in JSX.
- Undefined aliases such as `--background`, `--success`, or `--danger` where the global design defines separated semantic text/background tokens.
- Arbitrary theme values in JSX.
- Feature-specific global CSS variables not documented here.
