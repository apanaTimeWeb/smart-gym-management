# Auth Module — Theme Portability Contract

`auth` consumes the global Smart Gym 360 design system through semantic Tailwind tokens. No Auth component defines raw color values or inline theme-variable styles.

## Exact global tokens consumed
### Surfaces
- `--bg-page` → `bg-page`
- `--bg-sidebar` → `bg-sidebar`
- `--bg-card` → `bg-card`
- `--bg-input` → `bg-input`
- `--skeleton-base` → `bg-skeleton-base`
- `--skeleton-highlight` → `bg-skeleton-highlight`

### Borders and focus
- `--border` → `border-border`
- `--border-focus` → `border-focus`
- `--focus-ring` → `ring-primary`

### Typography
- `--text-primary` → `text-primary`
- `--text-secondary` → `text-secondary`
- `--text-disabled` → `text-disabled`
- `--text-on-primary` → `text-on-primary`

### Semantic status
- `--danger` → `border-danger`
- `--success` → `border-success`
- `--danger-text` → `text-danger`
- `--danger-bg` → `bg-danger-bg`
- `--success-text` → `text-success`
- `--success-bg` → `bg-success-bg`
- `--warning-text` → `text-warning`
- `--warning-bg` → `bg-warning-bg`
- `--info-text` → `text-info`
- `--info-bg` → `bg-info-bg`

### Elevation and interaction
- `--shadow-card` → `shadow-card`
- `--primary` → `bg-primary`
- `--primary-hover` → `bg-primary-hover`

## Auth-specific visual contract
- Primary Login CTA uses solid `bg-primary text-on-primary`.
- Form controls use `bg-input`, `border-border`, and explicit `focus-visible:ring-primary`.
- Validation errors use `bg-danger-bg` / `text-danger`; semantic background opacity modifiers are not used.
- Loading skeletons use `bg-skeleton-base` / `bg-skeleton-highlight`.
- Interactive transitions are `motion-safe:` gated.
- Icon controls retain keyboard focus and a minimum touch target of 44px where applicable.
- No raw hex, raw RGBA, `bg-[...]`, `text-[...]`, `ring-[...]`, `border-[...]`, or semantic `/opacity` background modifiers are permitted in Auth JSX.
