# Admin — Theme Portability Contract

The Admin module depends on the global design token system. The consuming project must provide these semantic Tailwind tokens through its global CSS/design configuration. The module does not define private hardcoded colors in JSX.

## Surface Tokens

- `bg-page` / `--bg-page` — route/page background.
- `bg-card` / `--bg-card` — cards, tables, panels.
- `bg-sidebar` / `--bg-sidebar` — Admin navigation surface.
- `bg-header` / `--bg-header` — Admin header surface.
- `bg-input` / `--bg-input` — form controls.
- `bg-floating` / `--bg-floating` — floating UI surfaces.
- `bg-popover` / `--bg-popover` — dropdown/popover surfaces.
- `bg-overlay` / `--bg-overlay` — modal/overlay surfaces.

## Text / Focus Tokens

- `text-primary` / `--text-primary` — primary content.
- `text-secondary` / `--text-secondary` — secondary content.
- `text-disabled` / `--text-disabled` — disabled content.
- `text-primary-foreground` — foreground for primary/status surfaces where the design contract calls for it.
- `border-border` / `--border` — standard borders.
- `border-border-focus` / `--border-focus` — focused controls.

## Semantic Status Tokens

- `primary`, `primary-hover`, `primary-subtle`
- `success`, `success-bg`
- `warning`, `warning-bg`
- `danger`, `danger-bg`
- `info`, `info-bg`
- `purple`, `purple-bg`

## Payment Tokens

- `pay-cash`, `pay-cash-bg`
- `pay-upi`, `pay-upi-bg`
- `pay-card`, `pay-card-bg`
- `pay-bank`, `pay-bank-bg`

## Loading / Motion

- `skeleton-base`, `skeleton-highlight`
- All transitions/animations use `motion-safe:` unless a documented accessibility exception exists.
- Route-level loading uses shape-matched skeletons; button-level asynchronous feedback may use a spinner.

## Layout Contract

The Admin shell follows the documented z-index scale: header `z-20`, dropdown/popover `z-30`, modal `z-40`, toast `z-50`. The active sidebar item uses the documented subtle primary background + gold edge treatment rather than a solid primary fill.

## Portability Requirement

When copying this module into another project, provide the above global design tokens and the application's approved API/auth/permission/monitoring infrastructure. Do not introduce module-local hex values merely to compensate for missing global tokens.
