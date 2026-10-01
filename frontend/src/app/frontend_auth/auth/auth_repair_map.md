# Auth Module Repair Map — v9

## Canonical Boundary
`frontend_auth/auth/` remains the Auth feature module and AI repair boundary. Login remains the owned `auth/login/` child feature. No sibling business feature is modified.

## Version Evidence
- Supplied original archive carried v7 evidence.
- v8 was previously delivered but user reported rule gaps.
- v9 is the corrective audit + repair cycle against the previously delivered v8 artifact.

## v9 Repairs
1. Removed the duplicate browser-facing MSW implementation `AuthMockBrowserTestHandlers.ts`; canonical browser behavior remains in `AuthMockBrowserHandlers.ts`.
2. Restored `auth_repair_map.md`, `auth_security_impact_analysis.md`, and `login/auth_login_repair_map.md` so AI-facing repair/security context remains complete.
3. Updated `auth_features.md` to match current handler/file ownership and Login query-key ownership.
4. Added `AuthLoginLocaleParity.test.ts` to guarantee English/Hindi locale leaf-key parity.
5. Added/normalized responsibility comments for production UI/route components and strengthened hook/utility JSDoc/data-flow metadata.
6. Expanded Login Playwright specification to include 320px, 375px, 768px and 1280px layout checks.
7. Cleaned the misplaced responsibility comment in `AuthContracts.ts`.
8. Preserved the v8 canonical root URL config and query-key placement; no regression rollback was introduced.

## Static Re-audit Results
- 118 `.ts`/`.tsx` files transpile with zero parser diagnostics.
- 0 production interactive controls missing `data-testid`.
- 0 relative imports.
- 0 barrel/index/facade files.
- 0 production raw hex/RGB theme values or arbitrary Tailwind theme values.
- 0 semantic background opacity modifiers.
- 0 inline style objects.
- 0 `console.log`, `@ts-ignore`, or `@ts-nocheck` in the supplied production scope.
- 0 applicable file-size violations.
- English/Hindi locale parity test exists.

## Host Verification Limits
Host `package.json`, lockfile, `tsconfig.json`, ESLint/Tailwind/Prettier configuration, global CSS/providers/middleware/toploader, CODEOWNERS, CI workflows, Playwright/Vitest runtime, production backend, SCA, and gitleaks are not present in the supplied module archive. They remain `NOT VERIFIED`.

## Source Conflict
The public route folder spellings `demo-login` and `exit-ghost-login` conflict with the blanket snake_case folder rule. Exact public URL behavior is preserved rather than inventing alternate routes.
