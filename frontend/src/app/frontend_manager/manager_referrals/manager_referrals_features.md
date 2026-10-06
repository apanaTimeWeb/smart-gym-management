# Manager Referrals — Feature Map

## Module Purpose
Manager Referrals is the branch referral tracking workspace. Managers can inspect referral KPIs, browse and filter referral records, create a referral, and claim an eligible reward. Referral records and reward state are API data owned by this module, with sensitive referee phone data masked in the list. Reward claims are financial/critical and require confirmation.

Module root: `frontend_manager/manager_referrals/`

## Dependency Manifest

Exact third-party packages imported by this module in the supplied source snapshot:
- `@hookform/resolvers`
- `@tanstack/react-query`
- `@testing-library/react`
- `@testing-library/user-event`
- `date-fns`
- `http-status-codes`
- `lucide-react`
- `msw`
- `next`
- `next-intl`
- `react`
- `react-hook-form`
- `vitest`
- `zod`
- `zustand`

Application framework: `Next.js App Router`.

## Feature Lifecycle Contract

The following CRUD capability is derived from the module-owned API client verbs in the supplied source snapshot. Domain commands that happen to use `POST` are identified as Create-capable only at the transport level; they are not assumed to be generic CRUD records.

| Operation | Status | Evidence |
|---|---|---|
| Create | Exposed | ManagerReferralsApi, query |
| Read | Exposed | ManagerReferralsApi: fetchReferralKPIs, fetchReferrals. |
| Update | Not exposed | No module API client uses PUT/PATCH in the supplied snapshot. |
| Delete | Not exposed | No module API client uses DELETE in the supplied snapshot. |

## Directory Structure

Filesystem-verified directory ownership for the supplied source snapshot:

| Folder | Responsibility | Key Files |
|---|---|---|
| `manager_referrals_api/` | Owns feature API clients and request/response transport contracts. | `ManagerReferralsApi.ts` |
| `manager_referrals_components/` | Owns the feature UI component tree and feature-specific presentation. | — |
| `manager_referrals_components/manager_referrals_main/` | Owns the named feature-specific responsibility implied by this folder. | ManagerReferralsMain.tsx |
| `manager_referrals_constants/` | Owns feature static UI configuration, status mappings, and query keys. | `ManagerReferralsConstants.ts`, `ManagerReferralsFilterConstants.ts`, `ManagerReferralsQueryKeys.ts` |
| `manager_referrals_hooks/` | Owns feature custom hooks for queries, mutations, UI orchestration, and URL state. | `useManagerReferralsForm.test.ts`, `useManagerReferralsForm.ts`, `useManagerReferralsLogic.test.ts`, `useManagerReferralsLogic.ts` |
| `manager_referrals_locales/` | Owns module English and Hindi translation catalogs. | `manager_referrals_en.json`, `manager_referrals_hi.json` |
| `manager_referrals_mocks/` | Owns module-local frontend-first mock assets. | — |
| `manager_referrals_mocks/manager_referrals_mocks_fixtures/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerReferralsMockData.ts` |
| `manager_referrals_mocks/manager_referrals_mocks_handlers/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerReferralsMockHandlers.ts` |
| `manager_referrals_schemas/` | Owns feature Zod validation and response schemas. | `ManagerReferralsFormSchema.ts`, `ManagerReferralsSchema.ts` |
| `manager_referrals_store/` | Owns module-scoped Zustand UI state only. | `useManagerReferralsStore.test.ts`, `useManagerReferralsStore.ts` |
| `manager_referrals_tests/` | Owns module behavior and utility tests. | `ManagerReferralsBehavior.test.tsx` |
| `manager_referrals_types/` | Owns feature TypeScript domain/request/view-model contracts. | `ManagerReferralsFormTypes.ts`, `ManagerReferralsTypes.ts` |
| `manager_referrals_utils/` | Owns feature-local formatting/export/calculation utilities. | `ManagerReferralsFormatters.test.ts`, `ManagerReferralsFormatters.ts` |

## Root-level Routing and Documentation Files

Only the following root files are present and permitted by the architecture quarantine:
- `error.tsx`
- `loading.tsx`
- `manager_referrals_features.md`
- `manager_referrals_forbidden.md`
- `manager_referrals_theme_contract.md`
- `manager_referrals_url_config.ts`
- `not-found.tsx`
- `page.tsx`

## Approved External Dependencies
### Application Infrastructure
- `@/components/ui/manager_confirm_provider/ManagerConfirmProvider`
- `@/components/ui/manager_empty_state/ManagerEmptyState`
- `@/components/ui/manager_pagination/ManagerPagination`
- `@/components/ui/manager_searchable_dropdown/ManagerSearchableDropdown`
- `@/components/ui/manager_stat_card/ManagerStatCard`
- `@/app/frontend_manager/manager_infrastructure/useManagerDebounce`
- `@/app/frontend_manager/manager_infrastructure/ManagerEnvConfig`
- `@/app/frontend_manager/manager_infrastructure/ManagerErrorMessage`
- `@/app/frontend_manager/manager_infrastructure/ManagerHttpStatus`
- `@/app/frontend_manager/manager_infrastructure/ManagerIdempotency`
- `@/app/frontend_manager/manager_infrastructure/ManagerMockApiUrl`
- `@/app/frontend_manager/manager_infrastructure/ManagerPaginationDefaults`
- `@/app/frontend_manager/manager_infrastructure/ManagerToastService`
- `@/app/frontend_manager/manager_infrastructure/useManagerUnsavedChangesGuard`
- `@/app/frontend_manager/manager_mocks/ManagerMswTestServer`
- `@/app/frontend_manager/manager_mocks/ManagerTestProviders`
- `@/lib/api`
- `@/lib/logger`
- `@/lib/useDateRangeSuffix`

### Business Feature Dependencies
- None. No imports from sibling feature business modules are permitted or present in the audited source.

### Role-Level Business Dependencies
- `@/app/frontend_manager/manager_navigation/ManagerNavigationConfig`

### Third-Party Dependencies
- `@hookform`
- `@tanstack`
- `@testing-library/react`
- `lucide-react`
- `msw`
- `next`
- `next-intl`
- `react`
- `react-hook-form`
- `vitest`
- `zod`
- `zustand`

## Feature Inventory
| Feature | Route | What the User Can Do | Main API Calls | Status |
|---|---|---|---|---|
| fetchReferralKPIs | `/manager/referrals` | Uses the fetchReferralKPIs workflow with typed request/response handling. | `GET /manager/referrals/kpis` | ✅ Implemented |
| fetchReferrals | `/manager/referrals` | Uses the fetchReferrals workflow with typed request/response handling. | `GET /manager/referrals` | ✅ Implemented |
| createReferral | `/manager/referrals` | Uses the createReferral workflow with typed request/response handling. | `POST /manager/referrals` | ✅ Implemented |
| claimReward | `/manager/referrals` | Uses the claimReward workflow with typed request/response handling. | `POST /manager/referrals/:referralId/claim` | ✅ Implemented |

## User Flows & Interactions
### Flow 1: Track referrals
1. Manager opens the referral list with search/status/page state.
2. fetchReferrals(params) sends the current filters.
3. MSW filters and paginates the module-owned fixture.
4. The table renders the returned referrals and masks sensitive referee contact data.
### Flow 2: Claim reward
1. Manager chooses an eligible referral.
2. The claim confirmation dialog performs double verification.
3. claimReward(referralId) sends the mutation.
4. The authoritative referral response updates reward status and the KPI cache.

## Component Tree

- Route: `manager_referrals/page.tsx`
  - `<ManagerReferralsMain>` is the canonical client/page orchestration component.
    - Direct feature-child imports are not statically enumerated from this Main file; see Component Responsibility Map.

## Data and State Architecture
- **Server state:** TanStack Query owns API responses and request status.
- **UI/shared client state:** Module-local Zustand or component-local state owns only transient UI selections, modal state, tab state, and drafts.
- **URL state:** Search/filter/sort/pagination state is URL-backed where the module exposes a server-backed list.
- **Zustand stores:** `manager_referrals_store/useManagerReferralsStore.ts`
- **Contexts:** None. Stable cross-tree application concerns only.
- **Observed query-key fragments:** `['manager', 'referrals', 'kpis']`; `['manager', 'referrals', 'list', { page, search: debouncedSearch, status }]`; `['manager', 'referrals']`
- **Local storage keys:** None documented in this module.
- **MSW handler/fixture locations:** `manager_referrals/manager_referrals_mocks/manager_referrals_mocks_handlers/` and `manager_referrals/manager_referrals_mocks/manager_referrals_mocks_fixtures/`.
- **Mock scenarios:** normal, empty, error, filter/search/pagination scenarios are required for every applicable list; the documented scenarios are the exact scenarios implemented by the module handlers and tests.

## API Contract
| Function | Method | Endpoint | Request | Response `data` type |
|---|---|---|---|---|
| `fetchReferralKPIs` | `GET` | `/api/v1/manager/referrals/kpis` | `—` | `ManagerReferralsKPIs` |
| `fetchReferrals` | `GET` | `/api/v1/manager/referrals` | `{ page: number; limit: number; search?: string; status?: string }` | `ManagerReferral[]` |
| `createReferral` | `POST` | `/api/v1/manager/referrals` | `CreateReferralDto` | `ManagerReferral` |
| `claimReward` | `POST` | `/api/v1/manager/referrals/:referralId/claim` | `{ referralId: string }` | `ManagerReferral` |

## UI Data Requirements
| UI Element | Required Field(s) | API Endpoint | Response Path | Nullable? | Mocked? |
|---|---|---|---|---|---|
| KPI: Total referrals | `totalReferrals` | `/api/v1/manager/referrals/kpis` | `data.totalReferrals` | No | Yes |
| KPI: Converted | `totalConverted` | `/api/v1/manager/referrals/kpis` | `data.totalConverted` | No | Yes |
| KPI: Pending rewards | `pendingRewards` | `/api/v1/manager/referrals/kpis` | `data.pendingRewards` | No | Yes |
| KPI: Claimed rewards | `claimedRewards` | `/api/v1/manager/referrals/kpis` | `data.claimedRewards` | No | Yes |
| Table: Referrer name | `referrerName` | `/api/v1/manager/referrals` | `data[].referrerName` | No | Yes |
| Table: Referee name | `refereeName` | `/api/v1/manager/referrals` | `data[].refereeName` | No | Yes |
| Table: Referee phone | `refereePhone` | `/api/v1/manager/referrals` | `data[].refereePhone` | No | Yes |
| Table: Date | `dateReferred` | `/api/v1/manager/referrals` | `data[].dateReferred` | No | Yes |
| Table: Status | `status` | `/api/v1/manager/referrals` | `data[].status` | No | Yes |
| Table: Reward status | `rewardStatus` | `/api/v1/manager/referrals` | `data[].rewardStatus` | No | Yes |
| Table: Reward amount | `rewardAmount` | `/api/v1/manager/referrals` | `data[].rewardAmount` | No | Yes |

## Permissions and Security
- **Required role:** `MANAGER`.
- **UI guard:** `ManagerPermissionGate` provides the Manager workspace capability boundary; module-specific permissions remain documented at the feature level when applicable.
- **Critical actions:** destructive/financial actions use explicit confirmation and server-authoritative responses.
- **Sensitive data:** list views use masking/display rules appropriate to the data type.
- **Cross-role isolation:** no business imports from other role roots or unrelated business modules.

## Loading, Empty, and Error States
- Route-level `loading.tsx` provides a layout-matching skeleton.
- Data sections use dedicated inline skeletons while TanStack Query is pending.
- Entity lists provide module-specific empty-state UI where the entity is user-browsable.
- Module `error.tsx` provides a safe retry fallback and does not expose raw backend/stack-trace text.

## Edge Cases and AI Warnings
**Forbidden-pattern contract:** See `manager_referrals_forbidden.md` for the module-specific forbidden patterns; that file is the canonical AI repair safety reference.

- **Reward claims are critical/financial and require double verification:** Reward claims are critical/financial and require double verification.
- **Referee phone must remain masked in list views:** Referee phone must remain masked in list views.
- **Reward amount must use centralized currency formatting:** Reward amount must use centralized currency formatting.
- **Referral fixtures must stay inside the referrals module; do not reuse inquiry fixtures:** Referral fixtures must stay inside the referrals module; do not reuse inquiry fixtures.
- **Claim success must reconcile the referral row and KPI state from the authoritative response:** Claim success must reconcile the referral row and KPI state from the authoritative response.

## Component Responsibility Map
| Component File | Responsibility |
|---|---|
| `manager_referrals/manager_referrals_components/manager_referrals_add_modal/ManagerReferralsAddModal.tsx` | RHF + Zod form for manually creating a referral. |
| `manager_referrals/manager_referrals_components/manager_referrals_kpis/ManagerReferralsKPIs.tsx` | Display 4 key referral stats using ManagerStatCard. |
| `manager_referrals/manager_referrals_components/manager_referrals_main/ManagerReferralsMain.tsx` | Root client orchestrator for Referrals. |
| `manager_referrals/manager_referrals_components/manager_referrals_table/ManagerReferralsTable.tsx` | Display referrals table with claim reward action. |

## Rule Compliance Checklist
- [x] Module-owned API, types/schemas, fixtures, handlers, tests, and feature documentation are scoped to this module.
- [x] API calls use the module API client and typed response contracts.
- [x] Server-backed pagination/filter/search follows explicit parameter propagation where applicable.
- [x] UI Data Requirements map displayed values to concrete endpoints and response paths.
- [x] Module-owned MSW fixtures/handlers remain the frontend-first server substitute.
- [x] Raw `any`, relative imports, barrel files, and hardcoded localhost mock origins are absent from audited Manager source.
- [ ] Host-repository CI/tooling, dependency/SCA/secret gates, CODEOWNERS, branch protection, and production build require root-repository verification.

## Internationalization
- Namespace: `MANAGER_REFERRALS`
- Active locales: `en`, `hi`
- English catalog: `manager_referrals/manager_referrals_locales/manager_referrals_en.json`
- Hindi catalog: `manager_referrals/manager_referrals_locales/manager_referrals_hi.json`
- Client UI strings use `next-intl` `useTranslations()`; route-boundary/server UI uses `getTranslations()`.
- Host application must provide the `next-intl` provider, locale negotiation, and build-time locale merge described in `INTEGRATION_GUIDE.md`.


## v4 Repair Verification Scope — 2026-10-02
- The module was re-audited against the complete supplied architecture, UI/UX, and repair specifications.
- Business Feature Dependencies and Role-Level Business Dependencies are explicitly recorded above.
- Runtime host-toolchain gates (production build, live typecheck, lint, browser execution, dependency/SCA/secret scans, and CODEOWNERS) remain host-repository verification items because those root configuration files were not supplied with the target ZIP.

## AI Repair / Discovery Index

- Primary orchestration: `ManagerReferralsMain.tsx`
- Primary query-key registry: `ManagerReferralsQueryKeys.ts`
- Primary module constants registry: `ManagerReferralsConstants.ts`
- Canonical schema file: `ManagerReferralsSchema.ts` in `manager_referrals_schemas/`
- Module theme contract: `manager_referrals_theme_contract.md`


## V9 Audit Synchronization — 2026-10-02

This section is generated from the repaired source tree. It is authoritative for current file ownership and AI discovery; it does not claim host-repository runtime verification when the host configuration is outside the supplied ZIP.

| Canonical discovery artifact | Current path | Present |
|---|---|---|
| Main | `manager_referrals_components/manager_referrals_main/ManagerReferralsMain.tsx` | YES |
| API client | `ManagerReferralsApi.ts` | YES |
| Schema file | `ManagerReferralsSchema.ts` | YES |
| Query-key registry | `ManagerReferralsQueryKeys.ts` | YES |
| Constants registry | `ManagerReferralsConstants.ts` | YES |
| URL config | `manager_referrals_url_config.ts` | YES |
| Behavior test | `ManagerReferralsBehavior.test.tsx` | YES |
| Repair map | `stage_2_frontend_audit.md` in the delivery root | YES |
| Theme contract | `manager_referrals_theme_contract.md` | YES |

### Current module boundary

- Business code is owned by `manager_referrals/`; sibling business modules are not required for normal repair.
- Mock fixtures and handlers live under `manager_referrals/manager_referrals_mocks/manager_referrals_mocks_fixtures/` and `manager_referrals/manager_referrals_mocks/manager_referrals_mocks_handlers/`.
- External application infrastructure is limited to documented zero-business/global providers and the host transport/runtime boundary.

### Verification boundary

- Source-level structural checks can be performed from the supplied artifact.
- Production build, real TypeScript project type-check, browser click-through, Tailwind/global CSS verification, dependency/SCA/secret scans, and CI/CODEOWNERS enforcement require the host repository configuration and therefore remain NOT VERIFIED when absent from the supplied ZIP.


## Current Audit Boundary

This document is maintained against the current filesystem. Feature-owned URL configuration is the single root-level TypeScript exception allowed by the architecture; all other implementation files live under prefixed responsibility folders. Playwright E2E coverage lives separately under `playwright_e2e/frontend_manager_e2e/<module>/` and never imports sibling-module helpers.

## Routes
- Canonical route file: `page.tsx` in this feature module.
- Route-specific loading/error/not-found files, where present, remain physically owned by this module.

## API Contract Summary
- Canonical module API files live under the module-owned `_api` folder.
- API paths are defined by the module-owned `*_url_config.ts`; mutation methods require the documented idempotency-key contract.

## State Map
- Server state → TanStack Query.
- Shared UI/client state → module-scoped Zustand.
- Component-private state → local React state.
- Shareable list filters/search/pagination → URL state where applicable.

## External Dependencies
- Only approved global application infrastructure/UI primitives and documented third-party packages may cross the feature boundary.
- No sibling feature business implementation is an external dependency.

## Known Forbidden Patterns
- See the module-owned `*_forbidden.md` for the complete forbidden-pattern contract.
- Business logic must remain inside this feature module; global UI remains zero-business.

## Testing and Verification
- Module tests live under the module-owned test folders and alongside custom hooks/utilities as required.
- MSW fixtures/handlers are module-owned.
- Playwright E2E lives under the role-isolated `playwright_e2e/frontend_manager_e2e/<module>/` tree.
