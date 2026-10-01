# INTEGRATION GUIDE — `frontend-superadmin-v5-fix`

Generated: 2026-10-01T07:22:40+00:00

## 1. Route placement
Place the repaired `frontend_superadmin/` role container under the host Next.js App Router at `src/app/frontend_superadmin/`. Do not create a second unprefixed business route tree.

### Routes represented
- `/superadmin/affiliates`
- `/superadmin/analytics`
- `/superadmin/dashboard`
- `/superadmin/features`
- `/superadmin/integrations`
- `/superadmin/messaging`
- `/superadmin/profile`
- `/superadmin/system-ops`
- `/superadmin/system-ops/backups`
- `/superadmin/system-ops/infrastructure`
- `/superadmin/system-ops/jobs`
- `/superadmin/system-ops/migrations`
- `/superadmin/tickets`

## 2. Required global infrastructure
The host application must provide the approved global infrastructure referenced by the module: canonical `@/lib/api`, `@/lib/logger`, auth/session/permission infrastructure, zero-business UI primitives, and the canonical global semantic theme/Tailwind mapping from the supplied Smart Gym 360 design system.

## 3. Playwright E2E
Copy the top-level `playwright_E2E/` directory to the host repository root. It contains the required route-mirrored `frontend_superadmin_e2e/` tree and **13** route specs. The host must provide `@playwright/test`, `FRONTEND_BASE_URL`, and authenticated `PLAYWRIGHT_STORAGE_STATE` when the host application requires an authenticated Superadmin session.

## 4. Environment
The role already contains central environment configuration for the documented Superadmin WebSocket endpoint. Keep secrets out of `NEXT_PUBLIC_*`.

## 5. Dependencies
No new production runtime dependency was introduced by v5 repair. The isolated E2E suite requires `@playwright/test` in the host test toolchain if it is not already installed. Because the supplied archive contains no `package.json` or lockfile, exact dependency versions are `BLOCKED_BY_SUPPLIED_SCOPE`.

## 6. Verification order
1. Host strict TypeScript.
2. ESLint/import-order/boundary checks.
3. Vitest + React Testing Library + MSW.
4. Production build.
5. Playwright E2E from the required isolated tree.
6. Accessibility keyboard/focus checks.
7. Responsive verification at approximately 375px, 768px, 1280px+ and narrow 320px where applicable.
8. Dark/light semantic theme verification.
9. Security/SCA/secrets/CI gates.

## 7. Supplied-scope limitation
The host dependency graph, CI configuration, browser runtime, authentication runtime, and backend runtime were not present in the supplied artifact. Those validations are intentionally documented as integration gates and are not falsely marked as completed.
