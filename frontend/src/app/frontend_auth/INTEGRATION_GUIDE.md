# INTEGRATION GUIDE — Smart Gym 360 Auth v9-fix

## Included Scope
This package contains the repaired `frontend_auth/auth/` module, the isolated Login Playwright E2E test tree, and the required V2.4 verification artifacts. No sibling business feature implementation is included.

## Required Host Placement
Copy the module to:

```text
src/app/frontend_auth/auth/
```

Keep the canonical Login route under the module-owned `login/` route segment and do not create a second Login route tree.

## Required Host Infrastructure
The supplied archive did not contain the host application infrastructure needed to verify these contracts. The host project must provide the already-approved contracts consumed by this module, including:

- `@/lib/api`
- `@/lib/logger`
- `@/config/env`
- global theme/Tailwind semantic token mapping
- `next-intl` provider/loading configuration
- authentication/session middleware where the host owns redirects
- global top-loader integration where the host owns route transitions
- approved WebSocket/session infrastructure if future Auth features consume it

No new NPM dependency is added by this v9 package. Dependency versions MUST be checked against the host `package.json` before merge.

## Route Contract
Module-owned route entries are: `/auth/login`, `/auth/session`, `/auth/demo-login`, `/auth/refresh`, `/auth/logout`, `/auth/token`, `/auth/exit-ghost-login`, and retired `/auth/set-cookie`. The exact paths are centralized in `frontend_auth/auth/auth_url_config.ts`.

## i18n
Active Login locales are English and Hindi. Keep `auth_login_locales/` co-located inside the Login sub-feature. Do not move the strings to a global business translation folder.

## Theme
The module expects the semantic tokens listed by `auth_theme_contract.md` and `login/auth_login_theme_contract.md`. Host Tailwind/CSS must map those semantic classes to the canonical global CSS variables. Do not make this module compliant by adding raw hex values or arbitrary Tailwind values.

## E2E
Canonical E2E files:

```text
playwright_E2E/frontend_auth_e2e/auth/login/AuthLogin.spec.ts
playwright_E2E/frontend_auth_e2e/auth/login/AuthLoginE2eRouteConstants.ts
```

Run them in the host Playwright environment. Runtime browser execution is NOT VERIFIED in this package because the host runner/configuration was not supplied.

## Verification Before Merge
Run:

1. `tsc --noEmit`
2. ESLint + Tailwind linting + Prettier check
3. Vitest + React Testing Library + MSW tests
4. Playwright Login E2E
5. Direct `/auth/login` deep link + refresh + back/forward checks
6. Credential login success/failure/retry/idempotency verification
7. Demo gate verification in development/test and rejection outside the gate
8. Session/refresh/logout/ghost restore token-confidentiality tests
9. Responsive checks at 320px, 375px, 768px, and 1280px
10. Production Next.js build
11. `npm audit --audit-level=high` or approved SCA
12. `gitleaks detect` and pre-commit staged secret scan
13. CODEOWNERS/security review for Auth changes

The host-only items above are deliberately documented as NOT VERIFIED rather than guessed.
