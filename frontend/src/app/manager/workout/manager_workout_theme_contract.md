# Manager Workout Theme Contract

This module strictly adheres to the global design system defined in `web_global_design.md`.

## Allowed Variables
The Workout module is allowed to use the following semantic tokens:

- `--bg-page`: The main background color for the page layout.
- `--bg-card`: The background for cards, tables, and modal containers.
- `--bg-input`: The background for input fields and search bars.
- `--border`: Used for table row dividers, card borders, and input borders.
- `--primary`: The brand primary color, used for active tab underlines, primary buttons, and banner gradients.
- `--primary-subtle`: Used for row hover states and subtle button backgrounds.
- `--text-primary`: Primary headings and important data fields.
- `--text-secondary`: Used for table headers, descriptions, and placeholder texts.
- `--success`: Used for success badges (e.g., Beginner level).
- `--success-bg`: Subtle background for success badges.
- `--warning`: Used for warning badges (e.g., Intermediate level).
- `--warning-bg`: Subtle background for warning badges.
- `--danger`: Used for destructive actions (e.g., Delete workout) and Advanced level badges.
- `--danger-bg`: Subtle background for destructive actions and badges.
- `--info`: Used for informative sections and banner gradients.
- `--info-bg`: Subtle background for informative actions.
- `--skeleton-base`: Base color for loading skeletons.
- `--skeleton-highlight`: Highlight color for loading skeletons.

## Component Specific Patterns
- **Workout/Exercise Badges**:
  - Beginner: `bg-success-bg text-success`
  - Intermediate: `bg-warning-bg text-warning`
  - Advanced: `bg-danger-bg text-danger`
- **Banner**: Uses `bg-gradient-to-br from-primary to-info`.
- **Modals**: Fixed at `z-40`, background `bg-black/60`. Dialog container `bg-card rounded-2xl border-2 border-warning`.

## Forbidden Practices
- Do not use arbitrary color classes like `bg-[#123456]` or `text-green-500`.
- Do not use inline styles with `var(--workout-highlight)` or any custom non-global tokens. Always use global semantic tokens.
- Do not define arbitrary shadows or borders. Use standard Tailwind utilities.
