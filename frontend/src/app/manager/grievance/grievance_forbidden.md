# Manager Grievance — Forbidden Patterns

- No sibling Manager business imports.
- No direct business URLs outside `grievance_url_config.ts`.
- No direct `react-hot-toast` in feature components/hooks; use Manager toast infrastructure.
- No fake success state without a corresponding API/mock state transition.
- No raw Tailwind theme colors or semantic background opacity modifiers.
- No unlabeled form fields or unlabeled icon-only buttons.
