# INTEGRATION_GUIDE.md — Auth v5_fix

## Target
Integrate `frontend_auth/auth/**` into the host Next.js application.

## Route placement
Preserve the feature route structure under the host App Router so these routes resolve exactly:
- `/auth/login`
- `/auth/session`
- `/auth/demo-login`
- `/auth/refresh`
- `/auth/logout`
- `/auth/token`
- `/auth/exit-ghost-login`
- `/auth/set-cookie`

Do not rename Next.js reserved route files such as `page.tsx`, `loading.tsx`, or `error.tsx`.

## Required host dependencies / infrastructure
The module expects the host to provide the approved infrastructure imports already documented in `auth_features.md`:
- `@/lib/api`
- `@/lib/logger`
- `@/config/env`
- `@/components/ThemeToggle`
- React / Next.js / TanStack Query / React Hook Form / Zod / next-intl / lucide-react / MSW / http-status-codes / Playwright as configured by the host.

## Host configuration requirements
- Central `ApiResponse<T>` and `ValidationErrorItem` / `PaginationMeta` contracts must match the Auth module contract.
- Tailwind must map the semantic tokens consumed by the module (`bg-page`, `bg-card`, `bg-input`, `bg-primary`, `text-on-primary`, `bg-danger-bg`, `text-danger`, `bg-warning-bg`, skeleton and motion tokens, etc.).
- Global ThemeProvider must supply the documented dark/light token system.
- `next-intl` must load the co-located Auth Login `en` and `hi` locale objects through the host's merge/loader mechanism.
- Global route progress/top-loader must be wired according to the host architecture.
- The Auth Login assets referenced by `AuthLoginSharedConstants.ASSETS` must exist at `/logo.png` and `/gym-hero.jpg`. These assets were not included in the supplied module artifact.

## Environment
No new Auth runtime environment key is required beyond the host's validated API-base/runtime configuration already consumed through `@/config/env`. The development demo flow is gated by the existing non-production `AUTH_DEMO_MODE` server check and public client demo visibility flag.

## E2E
Keep `frontend_e2e/auth_e2e/auth/AuthLogin.spec.ts` in the separate top-level E2E tree. Configure Playwright to run the host app before the suite. Credential-based host E2E requires `AUTH_E2E_EMAIL` and `AUTH_E2E_PASSWORD`.

## Verification
1. Run host `tsc --noEmit`.
2. Run configured lint + Tailwind checks.
3. Run module/Vitest tests through the host test runner.
4. Start the host application and run `AuthLogin.spec.ts`.
5. Verify Login at 375px, 768px, 1280px+, and approximately 320px.
6. Verify both `en` and `hi` Login locale loading.
7. Verify global ThemeProvider, semantic token mapping, top-loader, logger and API transport integration.
8. Run required CI SCA and gitleaks scans.
9. Verify CODEOWNERS/security-review requirements for Auth changes.

## Important scope note
This module artifact has been source-audited, but the supplied task did not include the host repository/runtime. The above host checks are integration verification requirements and remain `NOT VERIFIED` in this delivery.
