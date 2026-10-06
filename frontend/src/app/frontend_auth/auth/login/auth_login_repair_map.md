# Auth Login Repair Map — v9

## v9 Repair Scope
Repairs are limited to the Login child feature plus directly owned Auth contracts required for Login integration.

## Repairs
- Preserved canonical root `auth_url_config.ts` and direct absolute imports.
- Preserved parent Auth token-status query-key ownership; no redundant Login query-key namespace is created because Login has no independent server query.
- Preserved RHF + Zod validation and mutation orchestration.
- Preserved same-intent idempotency-key reuse across retries.
- Added Login English/Hindi locale parity regression coverage.
- Added/normalized AI responsibility/JSDoc metadata.
- Added responsive browser specifications for 320px, 375px, 768px and 1280px.
- Preserved structural loading, route error, component error, not-found, offline, password visibility, and credential-preservation behavior.

## Remaining Host Verification
Host runtime/tooling/configuration is not included in the supplied module archive. `tsc`, ESLint, Tailwind, Prettier, Vitest execution, Playwright browser execution, production build, accessibility browser inspection, security scans, CODEOWNERS and global theme/provider/middleware/toploader remain `NOT VERIFIED`.
