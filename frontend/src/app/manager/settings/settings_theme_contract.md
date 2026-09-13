# Manager Settings Theme Contract

This module strictly adheres to the global design system defined in `web_global_design.md`.

## Allowed Variables
The Settings module is allowed to use the following semantic tokens:

- `--bg-page`: The main background color for the page layout.
- `--bg-card`: The background for setting sections, cards, and modals.
- `--bg-input`: The background for input fields.
- `--background`: Used for toggle switch thumbs.
- `--border`: Used for dividers, card borders, and input borders.
- `--primary`: The brand primary color, used for active tab underlines, primary buttons, and active toggles.
- `--primary-subtle`: Used for subtle active backgrounds.
- `--text-primary`: Primary headings and important data fields.
- `--text-secondary`: Used for labels, descriptions, and placeholder texts.
- `--success`: Used for success messages.
- `--danger`: Used for error messages and destructive actions.
- `--danger-bg`: Subtle background for destructive actions.
- `--skeleton-base`: Base color for loading skeletons.
- `--skeleton-highlight`: Highlight color for loading skeletons.

## Forbidden Practices
- Do not use arbitrary color classes like `bg-[#123456]` or `text-green-500`.
- Do not use inline styles with `var(--)` variables in JSX. Always use global semantic tokens.
- Do not define arbitrary shadows or borders. Use standard Tailwind utilities.
