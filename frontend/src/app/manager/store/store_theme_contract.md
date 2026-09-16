# Manager Store Theme Contract

This module strictly adheres to the global design system defined in `web_global_design.md`.

## Allowed Variables
The Store module is allowed to use the following semantic tokens:

- `--bg-page`: The main background color for the page layout.
- `--bg-card`: The background for cards, tables, and modal containers.
- `--bg-input`: The background for input fields and search bars.
- `--border`: Used for table row dividers, card borders, and input borders.
- `--primary`: The brand primary color, used for active tab underlines and primary buttons.
- `--primary-subtle`: Used for row hover states and subtle button backgrounds.
- `--text-primary`: Primary headings and important data fields.
- `--text-secondary`: Used for table headers, descriptions, and placeholder texts.
- `--success`: Used for success badges (e.g., Completed orders).
- `--success-bg`: Subtle background for success badges.
- `--warning`: Used for KPI highlights (e.g., Revenue).
- `--warning-bg`: Subtle background for warning KPIs.
- `--danger`: Used for destructive actions (e.g., Delete product).
- `--danger-bg`: Subtle background for destructive actions.
- `--skeleton-base`: Base color for loading skeletons.
- `--skeleton-highlight`: Highlight color for loading skeletons.

## Forbidden Practices
- Do not use arbitrary color classes like `bg-[#123456]` or `text-green-500`.
- Do not use inline styles with `var(--store-highlight)` or any custom non-global tokens. Always use global semantic tokens.
- Do not define arbitrary shadows or borders. Use standard Tailwind utilities (`shadow-sm`, `border-2`).
