# Superadmin Repair Scope

This package contains only the Superadmin module. `SA-01 — Superadmin has no actual route-level role gate` is intentionally NOT fixed because route-level authentication/authorization belongs outside `src/app/superadmin` (for example the application middleware/auth boundary). This package does not modify middleware, the global API transport, or any other role/business module.

## In-scope repair goals
- Preserve Superadmin-only business isolation and tenant/platform communication boundaries.
- Complete module-local data/API contracts, UI interactions, mutations, mock behavior, loading/error/empty/retry states, accessibility, responsive behavior, and documentation where the repair can be performed within Superadmin.
- Keep feature-specific mocks, fixtures, handlers, schemas, API clients, utilities, tests, forbidden rules, and theme contracts inside Superadmin.
- Preserve the documented TanStack Query server-state / module-scoped UI-state architecture.
- Replace visual-only interactions with testable terminal flows wherever their behavior belongs to Superadmin.
- Keep destructive and financial actions confirmation-gated.
- Preserve the application's external route/auth boundary; do not add a competing route-level authorization mechanism inside this folder.

## Out-of-scope by design
- `middleware.ts`
- global authentication/session authorization boundary
- global `src/lib/api.ts` transport behavior
- other role/business modules
- backend implementation

## Verification limitation
Runtime commands are only reported as PASS when actually executed. Static repository checks may pass independently. If the host project cannot install/execute its declared toolchain, the affected runtime checks remain NOT VERIFIED.
