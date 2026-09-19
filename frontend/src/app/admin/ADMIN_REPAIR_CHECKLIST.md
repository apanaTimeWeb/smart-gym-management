# Smart Gym 360 — Admin Repair Checklist (Final)

Source of truth:
- `web_frontend_development_instruction.md`
- `web_global_design.md`
- `Pasted markdown.md`

Scope: `admin/` role container and its 22 owning feature modules.

## Phase 0 — Baseline & Safety
- [x] Archive unpacked without modifying the source archive
- [x] Pre-repair audit preserved
- [x] Working baseline identified and preserved
- [x] Final changed-file manifest generated

## Phase 1 — P0 Architecture / Data Integrity
- [x] Intent-scoped idempotency-key utilities added and tested
- [x] HR payroll/advance/due critical mutations use idempotency keys after confirmation
- [x] HR staff deletion uses confirmation + idempotency key
- [x] Plans delete uses confirmation + idempotency key
- [x] Coupons delete uses confirmation + idempotency key
- [x] Announcements delete uses confirmation + idempotency key
- [x] Blacklist destructive/cross-branch mutations use confirmation + idempotency keys
- [x] Subscriptions upgrade/auto-renew/payment-method removal use confirmation + idempotency keys
- [x] Data-export job deletion uses confirmation + idempotency key
- [x] Admin shell branch-selection state explicitly documented as shell/context state
- [x] Cross-feature business import scan passes

## Phase 2 — API / State / Mock Contracts
- [x] Members export uses actual filtered module records through module API + MSW
- [x] Finance P&L period/status reaches request, query key and mock result
- [x] Subscription invoice pagination reaches URL/store/query/API/mock/UI
- [x] Subscription auto-renew mutates module mock state
- [x] Canonical pagination metadata includes `hasNextPage` / `hasPrevPage`
- [x] Subscription feature map reconciled to actual UI/API flows
- [x] Sales range/branch/search parameters reach the request/mock/rendered result where applicable

## Phase 3 — Forms / Type Safety
- [x] Removed `schema: any` from Admin Settings forms
- [x] Preserved RHF + Zod resolver typing
- [x] Critical payroll payment boundary requires explicit confirmation before mutation
- [x] Failed mutation paths retain existing form state unless the flow explicitly resets after success

## Phase 4 — Modularity / Isolation
- [x] Mixed responsibilities extracted into module-owned child components/utilities
- [x] Component files remain at or below 300 lines
- [x] Hooks/stores/API/types/schema ceilings verified with category-aware static scan
- [x] No role-wide business dependency introduced
- [x] No sibling business imports detected
- [x] New reusable logic remains owned by the consuming module/admin zero-business infrastructure boundary
- [x] Dedicated module-owned EmptyState components added for applicable data tables

## Phase 5 — Design System / Theme Portability
- [x] Canonical semantic token vocabulary applied in Admin production TS/TSX
- [x] Status background/text token naming normalized
- [x] Payment token naming reconciled to global design semantics
- [x] Chart semantic tokens corrected
- [x] Raw white-opacity border/shadow usages removed where semantic tokens exist
- [x] Admin and feature theme contracts regenerated/reconciled to current token usage
- [x] Responsive table/interaction state annotations preserved

## Phase 6 — Tests & Static Verification
- [x] Idempotency key creation/reuse unit tests added
- [x] Members CSV export utility test added
- [x] Finance P&L fixture-selection test added
- [x] Sales membership-report filter test added
- [x] Subscription invoice pagination test added
- [x] TypeScript/TSX parser scan: 0 parse errors / 654 files
- [x] Relative import scan: 0
- [x] Cross-feature business import scan: 0
- [x] Old theme-token scan: 0
- [x] Arbitrary Tailwind value scan: 0
- [x] `@ts-ignore` / `@ts-nocheck`: 0
- [x] `console.*`: 0
- [x] Dedicated table EmptyState scan: 0 missing
- [x] Component/hook/store/API/types/schema ceilings: 0 violations

## Phase 7 — Documentation
- [x] `admin_features.md` updated with critical-action infrastructure and shell exception
- [x] `ADMIN_FIX_V2_CHANGELOG.md` updated
- [x] `ADMIN_FIX_V2_VERIFICATION.md` updated
- [x] Affected feature maps reconciled to actual APIs/query keys/flows
- [x] Finance component responsibility map added
- [x] Theme contracts reconciled to canonical tokens
- [x] Forbidden documentation reconciled with final architecture
- [x] Final changed-file manifest generated

## Phase 8 — External Runtime Gates
- [ ] Typecheck — NOT VERIFIED: consuming application `package.json`/dependencies were not present in the archive
- [ ] ESLint — NOT VERIFIED: consuming application config/dependencies were not present
- [ ] Vitest/RTL — NOT VERIFIED: runtime test dependencies were not present
- [ ] Playwright — NOT VERIFIED: runnable Next.js application was not present
- [ ] Production build — NOT VERIFIED: full application was not present
- [ ] Browser accessibility — NOT VERIFIED: no runnable browser environment in this repair checkout
- [ ] Responsive/browser verification — NOT VERIFIED: no runnable application environment in this repair checkout
- [ ] SCA/secret/security CI — NOT VERIFIED: consuming repository CI configuration was not included

## Phase 9 — Final Handoff
- [x] Final repair report created
- [x] Before vs after findings recorded
- [x] Exact changed-file list included
- [x] Remaining NOT VERIFIED items explicitly listed
- [x] Binary acceptance criteria created for independent AI verification
