# Manager Notifications Theme Contract

This module strictly adheres to the global design system defined in `web_global_design.md`.

## Allowed Variables
The Notifications module is allowed to use the following semantic tokens:

- `--bg-page`: The main background color for the page layout.
- `--bg-card`: The background for notification cards.
- `--border`: Used for dividers and card borders.
- `--primary`: The brand primary color, used for unread indicators and primary buttons.
- `--primary-subtle`: Background for unread notifications.
- `--text-primary`: Primary headings and important data fields.
- `--text-secondary`: Used for timestamps, descriptions, and placeholder texts.
- `--success`: Used for success notification icons.
- `--success-bg`: Subtle background for success icons.
- `--warning`: Used for warning notification icons.
- `--warning-bg`: Subtle background for warning icons.
- `--danger`: Used for alert notification icons.
- `--danger-bg`: Subtle background for alert icons.
- `--info`: Used for info notification icons.
- `--info-bg`: Subtle background for info icons.
- `--skeleton-base`: Base color for loading skeletons.
- `--skeleton-highlight`: Highlight color for loading skeletons.

## Forbidden Practices
- Do not use arbitrary color classes like `bg-[#123456]` or `text-green-500`.
- Do not use inline styles with `var(--)` variables in JSX. Always use global semantic tokens.
- Do not define arbitrary shadows or borders. Use standard Tailwind utilities.
