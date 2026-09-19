# Manager Role — Theme Portability Contract

The Manager role consumes the global Smart Gym 360 design system through semantic tokens. Feature modules retain their own theme contracts for feature-specific token usage.

## Core semantic tokens used by Manager surfaces

- `--primary`, `--primary-hover`, `--primary-subtle`
- `--bg-page`, `--bg-card`, `--bg-sidebar`, `--bg-header`, `--bg-input`, `--bg-floating`, `--bg-overlay`, `--bg-popover`
- `--surface-hover`, `--surface-highlight`, `--surface-zebra`
- `--border`, `--border-focus`, `--focus-ring`
- `--text-primary`, `--text-secondary`, `--text-disabled`, `--text-on-primary`, `--text-on-danger`, `--text-on-success`, `--text-on-info`
- `--success-text`, `--success-bg`, `--warning-text`, `--warning-bg`, `--danger-text`, `--danger-bg`, `--info-text`, `--info-bg`, `--purple-text`, `--purple-bg`
- `--skeleton-base`, `--skeleton-highlight`
- `--chart-primary`, `--chart-success`, `--chart-danger`, `--chart-warning`, `--chart-info`, `--chart-secondary`, `--chart-grid`, `--chart-tooltip-bg`
- `--shadow-card`, `--shadow-popover`, `--shadow-dialog`, `--shadow-toast`
- `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-xl`, `--radius-full`
- `--layout-header-height`, `--layout-sidebar-width`, `--layout-sidebar-width-collapsed`, `--layout-content-padding`, `--control-height`, `--touch-target-min`, `--table-row-height`, `--table-row-height-compact`, `--modal-width`, `--drawer-width`

## JSX rule

Use semantic Tailwind classes such as `bg-card`, `text-primary`, `bg-success`, `text-danger`, `border-border`, `ring-primary`, `bg-surface-hover`, `shadow-card`.

Do not use raw theme hex values or arbitrary Tailwind theme expressions such as `bg-[#...]` or `bg-[var(--...)]` in JSX.

## Non-Tailwind component configuration

Chart libraries may require direct color strings. When that happens, use documented semantic CSS variables such as `var(--chart-primary)` rather than raw colors.

## External integration exception

Native external brand colors explicitly required by the global design system may remain as feature integration colors. In Manager messaging, WhatsApp uses native `#25D366`; this is not part of the ERP theme and must not be generalized into the ERP palette.
