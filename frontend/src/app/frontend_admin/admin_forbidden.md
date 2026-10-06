# Admin Role — Forbidden Patterns

## Current v12_fix Guardrails
- Do not place business feature components, hooks, stores, schemas, API clients, or business utilities directly in the role container.
- Do not import sibling business feature implementations to share business logic.
- Do not create a second route tree or duplicate a canonical feature implementation.
- Keep the Admin shell limited to application infrastructure and approved cross-tree concerns.
- Keep server state in TanStack Query and transient UI state in module-local state/Zustand.
- Keep realtime through the centralized `AdminLayoutWebSocketProvider` using socket.io-client with `transports: ['websocket']`.
- Do not add relative imports or barrel `index.ts` files.

# Admin — Forbidden Patterns

Future AI agents must read this file before modifying the module.

1. **No cross-role business imports.** Do not import Manager, Trainer, Superadmin, or another role's business components, types, stores, hooks, fixtures, or handlers.
2. **No server-data storage in Zustand/Context.** TanStack Query is the source of truth for API data, loading/error state, cache, pagination, and mutations.
3. **No direct fixture access from UI.** Production components must call the Admin API layer; MSW fixtures are transport-test data only.
4. **No hardcoded API URLs in components/hooks.** Routes belong in the module's centralized `*_url_config.ts` files.
5. **No relative imports.** Use the Admin `@/app/frontend_admin/...` absolute import path.
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
18. **No micro-management of daily attendance and single inquiries.** The Admin role is strictly for View/Report of aggregated trends. Do not build UI for day-to-day data entry (e.g., QR scanners, single attendance approvals, single inquiries management). Leave those workflows to the Manager role.
19. **No deep Trainer workflow controls.** Do not build UI in Admin to manually intervene in Trainer schedules or workout plans. Admin should only see aggregated Trainer Performance (in HR/Sales). Trainer scheduling is strictly confined to the Manager and Trainer modules.

- Admin shell aggregation is allowed only in `admin_layout/admin_layout_shell/` as documented in `admin_features.md`; it must remain read-only and must not import feature mocks or own feature business logic.
- **Shell Aggregation Exception:** `admin_layout/admin_layout_shell/` may import minimal read-only selectors/query hooks from Admin feature modules for persistent header/search/notification/profile/usage affordances. This is the only cross-feature shell exception; it must not perform feature mutations, import feature mocks/fixtures, or become a replacement for module-local business/query logic.


## v6 Repair Guardrails
- Every button must declare its intended `type` explicitly.
- Every navigational `Link` must provide an explicit `focus-visible` treatment.
- Do not duplicate static `data-testid` identifiers.
- External navigation URLs must be owned by the owning module URL config.
- Do not convert `BLOCKED BY SUPPLIED SCOPE` contracts into invented API behavior.

## v12 Repair Guardrails
- v12 repair also normalizes all production `data-testid` prefixes to the exact `[moduleName]-[component]-[action/state]` contract.
- v12 repair keeps the Admin print media contract semantic through feature-local print tokens justified by Design §14.

- Do not bypass the feature-module boundary to repair sibling business modules.
- Do not fabricate Data Export API/request/response contracts; the module remains explicitly scope-blocked until the backend contract is supplied.
- Do not remove RHF/Zod or unsaved-change protection from modified Admin forms.
- Do not add interactive UI without a semantic `data-testid`.
