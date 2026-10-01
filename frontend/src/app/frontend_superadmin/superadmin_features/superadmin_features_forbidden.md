# superadmin_features — Forbidden Patterns

The following are forbidden inside this module:

- Cross-feature business imports or sibling-module business utilities.
- Raw `fetch`/`axios` from components.
- Direct TanStack mutations from components.
- Hardcoded backend/API URLs in UI or API wrappers outside URL config.
- Inline query-key arrays when the module query-key registry exists.
- Hardcoded business status literals or currency symbols in JSX.
- Secrets/tokens/passwords/payment data in browser storage.
- `any`, `@ts-ignore`, `@ts-nocheck`, `console.log`.
- Placeholder/fake controls that do not complete a real UI → state/API → feedback → UI loop.
- Snapshot-only or serialization-only tests as the sole proof of a user workflow.
- Raw technical error details shown to users.
- New shared business utilities created merely to reduce duplication.

## Repair discipline
When a violation is found, repair the owning module rather than broadening the blast radius. If a rule genuinely requires application infrastructure, document that dependency before changing it.
