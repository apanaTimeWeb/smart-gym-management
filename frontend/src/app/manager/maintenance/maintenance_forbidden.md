# Manager Maintenance — Forbidden Patterns

- No sibling Manager business imports.
- No direct business URLs outside `maintenance_url_config.ts`.
- No direct `react-hot-toast` in feature components/hooks; use Manager toast infrastructure.
- No fake success state without a corresponding API/mock state transition.
- No raw Tailwind theme colors or semantic background opacity modifiers.
- No numeric HTTP status literals in API/mock wrappers.
