# Superadmin Repair Manifest

## Applied
- Removed sibling Superadmin business-module coupling; each consuming feature owns its local backend contract/URL when necessary.
- Consolidated duplicate System API files into `system/system_api/superadmin_system_api.ts`.
- Extracted System page orchestration into `useSuperadminSystemClient.ts`; `SuperadminSystemClient.tsx` is now view-focused.
- Moved the System tab union into `system_types/superadmin_system_types.ts`.
- Preserved Zod response validation at API boundaries.
- Preserved motion-safe animation variants and Superadmin confirmation accessibility behavior.
- Regenerated root and feature documentation from the current repository so required sections describe actual code rather than stale architecture.

## Verification status
Static source scans are part of this handoff. Full `npm run build`, typecheck, lint, Vitest, Playwright and production runtime checks require installing the host project's locked dependencies.
