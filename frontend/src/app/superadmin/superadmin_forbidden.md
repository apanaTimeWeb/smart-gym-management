# Superadmin — Forbidden Patterns

These rules apply throughout `src/app/superadmin` and are enforced or reviewed as part of the module acceptance process.

- **No cross-role business imports:** Superadmin must not import business code from `/admin`, `/manager`, `/trainer`, or another role root.
- **No sibling feature business imports from shell code:** global shell components may depend on shell-owned contracts/infrastructure and dumb UI primitives, but not on another feature's API/domain implementation.
- **No component-level API fetching:** API access belongs in feature hooks/query layers; Server Components are the documented exception for initial server-only work.
- **No API data in Zustand or Context:** server data belongs to TanStack Query.
- **No fake business fallbacks in UI:** mock server records belong in the owning feature's `*_mocks/fixtures/`; components must not invent missing business data.
- **No hardcoded module URLs:** use the single feature URL configuration.
- **No raw numeric HTTP status codes in API/mocking layers:** use `http-status-codes` constants.
- **No arbitrary Tailwind values:** use documented design tokens/framework scales unless a documented exception exists.
- **No generic `Props`/`Data` interfaces:** primary component props/types must be descriptively named.
- **No multi-component dumping files:** one primary React component per `.tsx` file.
- **No destructive action without confirmation:** critical/destructive mutations must use the Superadmin confirmation infrastructure and type-to-confirm where the action is irreversible.
- **No production `console.log`:** use the centralized logger.
- **No client-side auth/authorization replacement:** frontend visibility controls never replace backend authorization.

## Permission Boundary

This module does not invent a second permission model. Permission/UI capability checks, when required by the host product, must consume the approved application/session permission infrastructure. Frontend checks are a UI control only and do not replace backend authorization.

## Permission Boundary

This module does not invent a second permission model. Permission/UI capability checks, when required by the host product, must consume the approved application/session permission infrastructure. Frontend checks are a UI control only and do not replace backend authorization.
