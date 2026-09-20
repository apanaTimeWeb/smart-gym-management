# Superadmin — Forbidden Patterns

- Do not move feature business logic into role-wide shared folders.
- Do not import sibling feature business code, fixtures, handlers, stores, APIs, schemas, constants, or tests.
- Do not place fake backend records in production JSX.
- Do not simulate backend success with `setTimeout`, placeholder alerts, or toast-only mutations.
- Do not store server/API state as the primary source in Zustand or React Context.
- Do not use boolean network-loading state when TanStack Query query/mutation state is available.
- Do not use relative imports, barrel re-exports, `any`, `@ts-ignore`, or `@ts-nocheck`.
- Do not hardcode feature URLs or numeric HTTP status codes.
- Do not use raw/arbitrary Tailwind theme colors or semantic background opacity modifiers.
- Do not use random z-index values or motion that ignores reduced-motion preferences.
- Do not use `key={index}` for dynamic/filterable/reorderable records.
- Do not bypass `useConfirm()` for destructive flows requiring confirmation.
- Do not rotate an idempotency key while retrying the same confirmed irreversible action.
- Do not declare a route PASS from file existence alone; complete interaction and regression verification is required.
