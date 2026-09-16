# Manager PT Theme Contract

This module strictly adheres to the global design system defined in `web_global_design.md`.

## Allowed Variables
The Personal Training module is allowed to use the following semantic tokens:

- `--bg-page`: The main background color for the page layout.
- `--bg-card`: The background for cards, tables, and modals.
- `--bg-input`: The background for input fields and search bars.
- `--border`: Used for table row dividers, card borders, and input borders.
- `--primary`: The brand primary color, used for active tab underlines, primary buttons.
- `--primary-subtle`: Used for row hover states and subtle backgrounds.
- `--text-primary`: Primary headings and important data fields.
- `--text-secondary`: Used for table headers, descriptions, and placeholder texts.
- `--success`: Used for active package badges and success indicators.
- `--success-bg`: Subtle background for success badges.
- `--warning`: Used for expiring package badges.
- `--warning-bg`: Subtle background for warning badges.
- `--danger`: Used for expired packages and destructive actions.
- `--danger-bg`: Subtle background for destructive actions and badges.
- `--info`: Used for informative sections.
- `--info-bg`: Subtle background for informative actions.
- `--skeleton-base`: Base color for loading skeletons.
- `--skeleton-highlight`: Highlight color for loading skeletons.

## Forbidden Practices
- Do not use arbitrary color classes like `bg-[#123456]` or `text-green-500`.
- Do not use inline styles with `var(--)` variables in JSX. Always use global semantic tokens.
- Do not define arbitrary shadows or borders. Use standard Tailwind utilities.
