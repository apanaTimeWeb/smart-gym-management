# Manager Grievance — Forbidden Patterns

- No sibling Manager business imports.
- No direct business URLs outside `grievance_url_config.ts`.
- No direct toast-library calls in feature components/hooks; use Manager toast infrastructure.
- No fake success state without a corresponding API/mock state transition.
- No raw Tailwind theme colors or semantic background opacity modifiers.
- No unlabeled form fields or unlabeled icon-only buttons.


## Mock Isolation Prohibitions
- Do not place feature mock data outside this module.
- Do not create duplicate global mock handlers for this module.
- Do not import another module's business fixtures.
- Do not add component-level fake business fallbacks.
- Do not bypass the module API client by reading fixtures directly.
- Do not modify global MSW bootstrap for a module-local feature change unless registration is actually required.
