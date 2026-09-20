# Manager Role — Forbidden Patterns

This file is the quick safety contract for future AI repairs. Read the owning feature's `_features.md`, `_theme_contract.md`, and `_forbidden.md` before changing feature code.

1. **No sibling business imports.** A Manager feature must not import business components, hooks, stores, contexts, APIs, types, schemas, constants, fixtures, handlers or tests from another Manager feature or another role.
2. **No role-wide business bucket.** Do not move feature business logic into `manager_components/`, `manager_utils/`, or another role-wide folder merely to share it.
3. **No fake server data in production UI.** Backend-driven records belong in the feature API contract/MSW fixture path, not in component fallback literals.
4. **No Context server-state storage.** React Context must not own API response data or loading state. Use TanStack Query for server state and Zustand/local state for UI state.
5. **No raw ERP theme colors in JSX.** Do not introduce raw hex, arbitrary Tailwind theme values, or undefined theme aliases. Use documented semantic tokens/classes. Native external-brand colors are allowed only for the integrations explicitly exempted by the design system.
6. **No authenticated ERP gradients.** Gradients belong to the documented landing-page CTA exception, not Manager ERP screens.
7. **No hardcoded URLs.** Feature navigation and API/integration destinations must come from the feature's single URL config file.
8. **No hardcoded numeric HTTP statuses in API wrappers.** Use the approved HTTP status constants/enums.
9. **No `any`, `@ts-ignore`, `@ts-nocheck`, or silent unsafe narrowing.** Validate unknown API payloads at the feature boundary.
10. **No visual-only controls.** Add/Save/Apply/Delete/Retry/Next/Export/Search/Filter/Sort/Pagination/Tabs must produce a real, testable result.
11. **No toast-only mutation success.** Mutation success must update or invalidate the visible data state; mock mutations must change later reads where the feature is mutable.
12. **No automated bulk WhatsApp sending.** Manager messaging must keep the documented manual per-recipient send flow.
13. **No destructive action without confirmation.** Use the approved confirmation UI for destructive/irreversible actions.
14. **No permanent button collapse during loading.** Preserve the documented button width/label stability while showing a loading indicator.
15. **No blank optional data rendering.** Use the canonical nullable-display behavior (`—`) where the application contract requires it, while preserving meaningful `0`/`false` values.
16. **No untracked feature repair.** End every repair with a changed-file list. Unexpected sibling or unrelated business changes are an architecture failure.

## Required Mock/AI-Isolation Prohibitions

For future feature repairs, these patterns are explicitly forbidden:

- Do not place feature mock data outside the owning feature module.
- Do not create duplicate global mock handlers for a Manager feature.
- Do not import another feature module's business fixtures.
- Do not add component-level fake business fallbacks to hide incomplete API/MSW responses.
- Do not bypass the owning module API client by reading fixtures directly from production UI/hooks.
- Do not modify the global MSW bootstrap for a module-local change unless registration is actually required.
