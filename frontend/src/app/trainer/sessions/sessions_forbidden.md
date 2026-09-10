# Trainer Sessions — Forbidden Patterns

## What is STRICTLY FORBIDDEN in this module

1. **No `alert()` or `window.confirm()`** — All destructive actions (cancel session) MUST use `useConfirm()` from `TrainerConfirmProvider`. Native browser dialogs are blocked in iframes and break the design system.

2. **No native `<select>` elements** — Member selection and duration selection MUST use `SearchableDropdown` from `trainer_components/TrainerShared/`. Rule 20.

3. **`TrainerHeader` must be rendered in the *Main.tsx root** — `TrainerSessionsMain.tsx` (and all other module Main components) is the correct and ONLY place to render `TrainerHeader`. `TrainerLayout.tsx` only provides the sidebar — it does NOT render a header. Do NOT duplicate `TrainerHeader` inside child components below the Main level (e.g., never in `TrainerSessionsKPIs.tsx` or sub-modals).

4. **No inline mock data** — All mock sessions, members, and duration options live exclusively in `TrainerSessionsSharedConstants.ts`. Never define arrays like `const MOCK_SESSIONS = [...]` inside a component file.

5. **No cross-role imports** — Zero imports from `/admin`, `/manager`, or `/superadmin`. This module is fully self-contained.

6. **No hardcoded API URLs** — All endpoints must be imported from `TrainerSessionsUrlConfig.ts`.

7. **No `key={index}` on session lists** — Always use `session.id` as the React key.

8. **No optimistic UI for session cancellation** — Cancellation is destructive. Only update state after confirmed `2xx` response from the API.
