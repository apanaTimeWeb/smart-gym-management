# Landing — Theme Portability Contract

The `landing` module consumes the global design system and adds only narrowly justified feature-local visual variables. The receiving project must provide these global semantic tokens through its canonical `globals.css` + Tailwind mapping.

## Required Global Color / Surface Tokens

- `--primary`
- `--primary-hover`
- `--primary-subtle`
- `--bg-page`
- `--bg-card`
- `--bg-header`
- `--bg-input`
- `--bg-overlay`
- `--surface-hover`
- `--surface-highlight`
- `--surface-zebra`
- `--skeleton-base`
- `--skeleton-highlight`
- `--border`
- `--border-focus`
- `--focus-ring`
- `--text-primary`
- `--text-secondary`
- `--text-on-primary`
- `--success-text`
- `--success-bg`
- `--warning-text`
- `--warning-bg`
- `--danger-text`
- `--danger-bg`
- `--info-text`
- `--info-bg`
- `--purple-text`
- `--purple-bg`

## Required Shadow Tokens

- `--shadow-card`
- `--shadow-dialog`

## Required Radius Tokens

- `--radius-md`
- `--radius-lg`
- `--radius-xl`
- `--radius-full`

The module uses the global radius scale through `rounded-md`, `rounded-lg`, `rounded-xl`, and `rounded-full`; non-contract `rounded-2xl`/`rounded-3xl` utilities are intentionally not used.

## Required Motion Tokens / Utilities

- `duration-base`
- `duration-slow`
- `motion-safe:`
- `motion-reduce:`

## Typography

Landing uses the application's global default typography. It does not define a feature-local font family or global typography token.

## Feature-Local Visual Tokens

These are intentionally local to `landing.css` and must not become global design tokens:

- `--landing-hero-overlay` — hero image readability overlay; uses the global primary/page surface context without placing a raw theme color in JSX.
- `--landing-navbar-scrolled-bg` — translucent/scrolled navbar surface implemented in CSS so JSX does not use prohibited semantic background opacity modifiers.
- `--landing-cta-shadow` — local CTA glow treatment.
- `--landing-brand-facebook`
- `--landing-brand-instagram`
- `--landing-brand-x`
- `--landing-brand-youtube`

The four brand variables are allowed because the global design explicitly preserves external integration/brand colors in their native colors instead of converting them into the configurable ERP theme.

## Portability Rules

- No hardcoded theme hex values in module JSX.
- No arbitrary CSS-variable Tailwind classes in JSX.
- No semantic background opacity modifiers in JSX.
- Do not create feature-specific global tokens outside `landing.css`.
- If the module is copied to another compatible application, the receiving project only needs the tokens listed above plus the approved zero-business application infrastructure dependencies.
