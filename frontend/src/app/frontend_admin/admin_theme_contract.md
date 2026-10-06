# Admin Role — Theme Contract

## Current v12_fix Contract
- Authenticated Admin UI uses semantic theme tokens rather than hardcoded colors.
- Semantic background opacity modifiers and arbitrary Tailwind color values are forbidden.
- Motion-sensitive transitions/animations use `motion-safe:` guards.
- Feature modules own their UI styling contract; the Admin shell owns only shared application infrastructure styling.

# Admin — Theme Portability Contract

The Admin role shell and its feature modules consume the host application's canonical semantic theme tokens. Business behavior is not defined by this contract.

## Core surface tokens
- `--bg-page` via `bg-page`
- `--bg-card` via `bg-card`
- `--bg-sidebar` via `bg-sidebar`
- `--bg-header` via `bg-header`
- `--bg-input` via `bg-input`
- `--bg-floating` via `bg-floating`
- `--bg-overlay` via `bg-overlay`
- `--bg-popover` via `bg-popover`
- `--surface-hover` via `bg-surface-hover`
- `--surface-highlight` via `bg-surface-highlight`
- `--surface-zebra` via `bg-surface-zebra`

## Text / border / focus tokens
- `--text-primary` via `text-primary`
- `--text-secondary` via `text-secondary`
- `--text-disabled` via `text-disabled`
- `--text-on-primary` via `text-on-primary`
- `--text-on-danger` via `text-on-danger`
- `--text-on-success` via `text-on-success`
- `--text-on-info` via `text-on-info`
- `--border` via `border-border`
- `--border-focus` via `border-focus`
- `--focus-ring` via `ring-primary`

## Semantic status tokens
- `--success-text` / `--success-bg` via `text-success` / `bg-success`
- `--warning-text` / `--warning-bg` via `text-warning` / `bg-warning`
- `--danger-text` / `--danger-bg` via `text-danger` / `bg-danger`
- `--info-text` / `--info-bg` via `text-info` / `bg-info`
- `--purple-text` / `--purple-bg` for feature-defined purple statuses where applicable

## Chart tokens
- `--chart-primary`, `--chart-success`, `--chart-danger`, `--chart-warning`, `--chart-info`, `--chart-secondary`, `--chart-grid`, `--chart-tooltip-bg`

## Payment tokens
- `--pay-cash-text`, `--pay-cash-bg`
- `--pay-upi-text`, `--pay-upi-bg`
- `--pay-card-text`, `--pay-card-bg`
- `--pay-bank-text`, `--pay-bank-bg`

## Layout / typography / motion
- Layout tokens: `--layout-header-height`, `--layout-sidebar-width`, `--layout-sidebar-width-collapsed`, `--layout-content-padding`, `--control-height`, `--touch-target-min`, `--table-row-height`, `--modal-width`, `--drawer-width`
- Typography tokens: `--font-size-page-title`, `--font-size-section-title`, `--font-size-badge`, `--font-size-kpi`, `--font-size-table-header`, `--font-size-body`, `--font-size-caption`
- Skeleton tokens: `--skeleton-base`, `--skeleton-highlight`
- Shadow tokens: `--shadow-card`, `--shadow-popover`, `--shadow-dialog`, `--shadow-toast`

## Feature-local print tokens
- `--admin-print-background`: pure-white print background required by Design §14.
- `--admin-print-text`: pure-black print text required by Design §14.

These are explicitly justified feature-local visual tokens for print media; they must only be used inside the Admin print stylesheet and must not become general UI color tokens.

## Portability requirement
The host project must map these variables to semantic Tailwind utilities exactly as defined by `WEB_FRONTEND_UI_UX_DESIGN.md`. Feature code must not introduce raw hex/RGBA values or arbitrary Tailwind color utilities to compensate for missing tokens.
