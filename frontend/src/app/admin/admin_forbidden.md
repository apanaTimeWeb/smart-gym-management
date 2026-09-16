# Admin — Forbidden Patterns

Future AI agents must read this file before modifying the module.

1. **No cross-role business imports.** Do not import Manager, Trainer, Superadmin, or another role's business components, types, stores, hooks, fixtures, or handlers.
2. **No server-data storage in Zustand/Context.** TanStack Query is the source of truth for API data, loading/error state, cache, pagination, and mutations.
3. **No direct fixture access from UI.** Production components must call the Admin API layer; MSW fixtures are transport-test data only.
4. **No hardcoded API URLs in components/hooks.** Routes belong in the module's centralized `*_url_config.ts` files.
5. **No relative imports.** Use the Admin `@/app/admin/...` absolute import path.
6. **No arbitrary Tailwind values or hardcoded theme colors.** Use the global semantic design tokens documented by `admin_theme_contract.md`.
7. **No raw browser storage in React components.** Authentication/session tokens must never be placed in browser storage.
8. **No `console.log`, `any`, `@ts-ignore`, `@ts-nocheck`, or raw numeric HTTP status codes in API/transport logic.**
9. **No `index.ts` barrel exports.** Import directly from the named Admin file.
10. **No fake business fallback records.** Empty/error states must remain explicit and distinguishable from successful server data.
11. **No client-only pagination/filtering when an endpoint is server-browsable.** Query parameters and query keys must carry the filter/search/page state.
12. **No single-click destructive or financial mutations.** Use the Admin confirmation provider and the documented double-verification flow.
13. **No hardcoded backend mutation success messages.** Use the response `message` supplied by the API; non-API local UI notices must be explicit UI copy rather than masquerading as backend results.
14. **No unguarded complex forms.** React Hook Form + Zod + the Admin unsaved-changes guard are required for complex workflows.
15. **No accessibility regressions.** Icon-only actions require labels/tooltips, entity rows need keyboard-equivalent interaction, and modal focus/Escape behavior must remain intact.
16. **No mobile-only hover actions.** Touch devices must retain visible row actions; hover can progressively enhance desktop presentation only.
17. **No stale feature documentation.** Any route, API, state, mock, field, or user-flow change must update the relevant Admin feature map in the same change.
