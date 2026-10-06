# Manager Inquiries — Feature Map

## Module Purpose
Manager Inquiries is the lead and conversion workspace. Managers can browse/search/filter incoming inquiries, review inquiry details, create or edit leads, and convert a qualified inquiry into a member. The module owns inquiry data and plan lookup mocks. Conversion and deletion are business-critical and must remain explicitly confirmed and server-authoritative.

Module root: `frontend_manager/manager_inquiries/`

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
| Create | Exposed | ManagerInquiriesApi |
| Read | Exposed | ManagerInquiriesApi: fetchInquiries, fetchInquiryPlans, fetchInquiryPlansSnapshot, fetchInquiryById, fetchInquiryStats. |
| Update | Exposed | ManagerInquiriesApi |
| Delete | Exposed | ManagerInquiriesApi |

## Directory Structure

Filesystem-verified directory ownership for the supplied source snapshot:

| Folder | Responsibility | Key Files |
|---|---|---|
| `manager_inquiries_api/` | Owns feature API clients and request/response transport contracts. | `ManagerInquiriesApi.ts` |
| `manager_inquiries_components/` | Owns the feature UI component tree and feature-specific presentation. | — |
| `manager_inquiries_components/manager_inquiries_bulk_message_modal/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerInquiriesBulkMessageModal.tsx` |
| `manager_inquiries_components/manager_inquiries_convert_lead_modal/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerInquiriesConvertLeadForm.tsx`, `ManagerInquiriesConvertLeadModal.tsx`, `ManagerInquiriesConvertLeadSuccess.tsx` |
| `manager_inquiries_components/manager_inquiries_kpis/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerInquiriesKPIs.tsx` |
| `manager_inquiries_components/manager_inquiries_main/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerInquiriesMain.tsx` |
| `manager_inquiries_components/manager_inquiries_main/manager_inquiries_content/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerInquiriesContent.tsx` |
| `manager_inquiries_components/manager_inquiries_message_modal/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerInquiriesMessageModal.tsx` |
| `manager_inquiries_components/manager_inquiries_modal/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerInquiriesModal.tsx` |
| `manager_inquiries_components/manager_inquiries_table/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerInquiriesTable.tsx` |
| `manager_inquiries_components/manager_inquiries_toolbar/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerInquiriesToolbar.tsx` |
| `manager_inquiries_constants/` | Owns feature static UI configuration, status mappings, and query keys. | `ManagerInquiriesConstants.ts`, `ManagerInquiriesConvertConstants.test.ts`, `ManagerInquiriesConvertConstants.ts`, `ManagerInquiriesKpiConstants.ts`, `ManagerInquiriesQueryKeys.ts`, `ManagerInquiriesSharedConstants.test.ts`, `ManagerInquiriesSharedConstants.ts` |
| `manager_inquiries_hooks/` | Owns feature custom hooks for queries, mutations, UI orchestration, and URL state. | `ManagerInquiriesBuildQueryParams.ts`, `useManagerInquiriesConvertLeadForm.test.ts`, `useManagerInquiriesConvertLeadForm.ts`, `useManagerInquiriesForm.test.ts`, `useManagerInquiriesForm.ts`, `useManagerInquiriesLogic.test.ts`, `useManagerInquiriesLogic.ts`, `useManagerInquiriesMutations.test.ts` (+3 more) |
| `manager_inquiries_locales/` | Owns module English and Hindi translation catalogs. | `manager_inquiries_en.json`, `manager_inquiries_hi.json` |
| `manager_inquiries_mocks/` | Owns module-local frontend-first mock assets. | — |
| `manager_inquiries_mocks/manager_inquiries_mocks_fixtures/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerInquiriesMockData.ts` |
| `manager_inquiries_mocks/manager_inquiries_mocks_handlers/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerInquiriesMockHandlers.ts` |
| `manager_inquiries_schemas/` | Owns feature Zod validation and response schemas. | `ManagerInquiriesConvertLeadFormSchema.ts`, `ManagerInquiriesFormSchema.ts`, `ManagerInquiriesSchema.ts` |
| `manager_inquiries_store/` | Owns module-scoped Zustand UI state only. | `useManagerInquiriesUiStore.test.ts`, `useManagerInquiriesUiStore.ts` |
| `manager_inquiries_tests/` | Owns module behavior and utility tests. | `ManagerInquiriesBehavior.test.tsx` |
| `manager_inquiries_types/` | Owns feature TypeScript domain/request/view-model contracts. | `ManagerInquiriesBulkMessageModalTypes.ts`, `ManagerInquiriesConvertLeadFormTypes.ts`, `ManagerInquiriesConvertLeadSuccessTypes.ts`, `ManagerInquiriesFormTypes.ts`, `ManagerInquiriesMessageTypes.ts`, `ManagerInquiriesPlanSnapshotTypes.ts`, `ManagerInquiriesTypes.ts` |
| `manager_inquiries_utils/` | Owns feature-local formatting/export/calculation utilities. | `ManagerInquiriesFormatters.test.ts`, `ManagerInquiriesFormatters.ts` |

## Root-level Routing and Documentation Files

Only the following root files are present and permitted by the architecture quarantine:
- `error.tsx`
- `loading.tsx`
- `manager_inquiries_features.md`
- `manager_inquiries_forbidden.md`
- `manager_inquiries_theme_contract.md`
- `manager_inquiries_url_config.ts`
- `not-found.tsx`
- `page.tsx`

## Approved External Dependencies
### Application Infrastructure
- `@/components/ui/manager_confirm_provider/ManagerConfirmProvider`
- `@/components/ui/manager_toast/ManagerToast`
- `@/components/ui/manager_toast/ManagerToastTypes`
- `@/app/frontend_manager/manager_navigation/manager_navigation_components/manager_navigation_header/ManagerHeader`
- `@/components/ui/manager_pagination/ManagerPagination`
- `@/components/ui/manager_searchable_dropdown/ManagerSearchableDropdown`
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

### Business Feature Dependencies
- None. No imports from sibling feature business modules are permitted or present in the audited source.

### Role-Level Business Dependencies
- `@/app/frontend_manager/manager_navigation/ManagerNavigationConfig`

### Third-Party Dependencies
- `${inq.name}`
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
| fetchInquiries | `/manager/inquiries` | Uses the fetchInquiries workflow with typed request/response handling. | `GET /manager/inquiries` | ✅ Implemented |
| fetchInquiryPlans | `/manager/inquiries` | Uses the fetchInquiryPlans workflow with typed request/response handling. | `GET /manager/inquiries/plans` | ✅ Implemented |
| fetchInquiryPlansSnapshot | `/manager/inquiries` | Uses the fetchInquiryPlansSnapshot workflow with typed request/response handling. | `GET /manager/inquiries/plans-snapshot` | ✅ Implemented |
| convertLead | `/manager/inquiries` | Uses the convertLead workflow with typed request/response handling. | `POST /manager/inquiries/:id/convert` | ✅ Implemented |
| fetchInquiryById | `/manager/inquiries` | Uses the fetchInquiryById workflow with typed request/response handling. | `GET /manager/inquiries/:id` | ✅ Implemented |
| fetchInquiryStats | `/manager/inquiries` | Uses the fetchInquiryStats workflow with typed request/response handling. | `GET /manager/inquiries/stats` | ✅ Implemented |
| createInquiry | `/manager/inquiries` | Uses the createInquiry workflow with typed request/response handling. | `POST /manager/inquiries` | ✅ Implemented |
| updateInquiry | `/manager/inquiries` | Uses the updateInquiry workflow with typed request/response handling. | `PATCH /manager/inquiries/:id` | ✅ Implemented |
| deleteInquiry | `/manager/inquiries` | Uses the deleteInquiry workflow with typed request/response handling. | `DELETE /manager/inquiries/:id` | ✅ Implemented |

## User Flows & Interactions
### Flow 1: Manage inquiries
1. Manager searches and filters the inquiry list.
2. The logic hook propagates debounced search, status, date, page, and limit to fetchInquiries().
3. MSW filters the module-owned fixture and returns the correct total.
4. The table renders the returned page and supports detail/edit actions.
### Flow 2: Convert lead
1. Manager opens an inquiry detail and chooses Convert.
2. The conversion form validates required member/plan inputs with RHF + Zod.
3. convertLead(id, body) sends the request.
4. The authoritative member ID/message is consumed and the inquiry cache is reconciled.

## Component Tree

- Route: `manager_inquiries/page.tsx`
  - `<ManagerInquiriesMain>` is the canonical client/page orchestration component.
    - Direct feature-child imports are not statically enumerated from this Main file; see Component Responsibility Map.

## Data and State Architecture
- **Server state:** TanStack Query owns API responses and request status.
- **UI/shared client state:** Module-local Zustand or component-local state owns only transient UI selections, modal state, tab state, and drafts.
- **URL state:** Search/filter/sort/pagination state is URL-backed where the module exposes a server-backed list.
- **Zustand stores:** `manager_inquiries_store/useManagerInquiriesUiStore.ts`, `manager_inquiries_store/useManagerInquiriesUiStore.ts`
- **Contexts:** None. Stable cross-tree application concerns only.
- **Observed query-key fragments:** `['manager', 'inquiries', 'list', params]`; `['manager', 'inquiries', 'stats']`; `['manager', 'inquiries', 'plans']`; `['manager', 'inquiries', 'plans-snapshot']`; `['manager', 'inquiries']`
- **Local storage keys:** None documented in this module.
- **MSW handler/fixture locations:** `manager_inquiries/manager_inquiries_mocks/manager_inquiries_mocks_handlers/` and `manager_inquiries/manager_inquiries_mocks/manager_inquiries_mocks_fixtures/`.
- **Mock scenarios:** normal, empty, error, filter/search/pagination scenarios are required for every applicable list; the documented scenarios are the exact scenarios implemented by the module handlers and tests.

## API Contract
| Function | Method | Endpoint | Request | Response `data` type |
|---|---|---|---|---|
| `fetchInquiries` | `GET` | `/api/v1/manager/inquiries` | `{ page?, limit?, search?, status?, date? }` | `{ inquiries: Inquiry[]; total: number }` |
| `fetchInquiryPlans` | `GET` | `/api/v1/manager/inquiries/plans` | `—` | `{ name: string }[]` |
| `fetchInquiryPlansSnapshot` | `GET` | `/api/v1/manager/inquiries/plans-snapshot` | `—` | `{ name: string }[]` |
| `convertLead` | `POST` | `/api/v1/manager/inquiries/:id/convert` | `Record<string, unknown>` | `{ memberId: string }` |
| `fetchInquiryById` | `GET` | `/api/v1/manager/inquiries/:id` | `{ id: string }` | `Inquiry` |
| `fetchInquiryStats` | `GET` | `/api/v1/manager/inquiries/stats` | `—` | `InquiryStats` |
| `createInquiry` | `POST` | `/api/v1/manager/inquiries` | `Partial<Inquiry>` | `Inquiry` |
| `updateInquiry` | `PATCH` | `/api/v1/manager/inquiries/:id` | `{ id: string; body: Partial<Inquiry> }` | `Inquiry` |
| `deleteInquiry` | `DELETE` | `/api/v1/manager/inquiries/:id` | `{ id: string }` | `{ id: string }` |

## UI Data Requirements
| UI Element | Required Field(s) | API Endpoint | Response Path | Nullable? | Mocked? |
|---|---|---|---|---|---|
| KPI: Total inquiries | `total` | `/api/v1/manager/inquiries/stats` | `data.total` | No | Yes |
| KPI: New | `new` | `/api/v1/manager/inquiries/stats` | `data.new` | No | Yes |
| KPI: Follow-up | `followUp` | `/api/v1/manager/inquiries/stats` | `data.followUp` | No | Yes |
| KPI: Converted | `converted` | `/api/v1/manager/inquiries/stats` | `data.converted` | No | Yes |
| KPI: Lost | `lost` | `/api/v1/manager/inquiries/stats` | `data.lost` | No | Yes |
| Table: Name | `name` | `/api/v1/manager/inquiries` | `data.inquiries[].name` | No | Yes |
| Table: Phone | `phone` | `/api/v1/manager/inquiries` | `data.inquiries[].phone` | No | Yes |
| Table: Email | `email` | `/api/v1/manager/inquiries` | `data.inquiries[].email` | Yes | Yes |
| Table: Interest | `interest` | `/api/v1/manager/inquiries` | `data.inquiries[].interest` | No | Yes |
| Table: Status | `status` | `/api/v1/manager/inquiries` | `data.inquiries[].status` | No | Yes |
| Table: Source | `source` | `/api/v1/manager/inquiries` | `data.inquiries[].source` | Yes | Yes |
| Table: Created at | `createdAt` | `/api/v1/manager/inquiries` | `data.inquiries[].createdAt` | No | Yes |
| Table: Follow-up date | `followUpDate` | `/api/v1/manager/inquiries` | `data.inquiries[].followUpDate` | Yes | Yes |
| Detail: Follow-up logs | `followUpLogs[].note` | `/api/v1/manager/inquiries/:id` | `data.followUpLogs[].note` | Yes | Yes |

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
**Forbidden-pattern contract:** See `manager_inquiries_forbidden.md` for the module-specific forbidden patterns; that file is the canonical AI repair safety reference.

- **Search/filter/page changes must reach the MSW handler; do not hide a broken param path with client-side filtering:** Search/filter/page changes must reach the MSW handler; do not hide a broken param path with client-side filtering.
- **Converted inquiries must consume the backend `memberId`; do not invent a new member ID on the client:** Converted inquiries must consume the backend `memberId`; do not invent a new member ID on the client.
- **Lead conversion is critical and should require explicit confirmation where the UI triggers a destructive state transition:** Lead conversion is critical and should require explicit confirmation where the UI triggers a destructive state transition.
- **Optional email/source/notes/follow-up fields must use displayValue() when rendered as detail data:** Optional email/source/notes/follow-up fields must use displayValue() when rendered as detail data.
- **Plan options from the backend belong in the API/mock layer, not UI constants:** Plan options from the backend belong in the API/mock layer, not UI constants.
- **Preserve failed inquiry form input after a server error:** Preserve failed inquiry form input after a server error.

## Component Responsibility Map
| Component File | Responsibility |
|---|---|
| `manager_inquiries/manager_inquiries_components/manager_inquiries_convert_lead_modal/ManagerInquiriesConvertLeadForm.tsx` | Renders the form fields for converting a lead. |
| `manager_inquiries/manager_inquiries_components/manager_inquiries_convert_lead_modal/ManagerInquiriesConvertLeadModal.tsx` | Renders the Add Member form specifically for converting a lead within the Inquiries page. |
| `manager_inquiries/manager_inquiries_components/manager_inquiries_convert_lead_modal/ManagerInquiriesConvertLeadSuccess.tsx` | Renders the success state after converting a lead. |
| `manager_inquiries/manager_inquiries_components/manager_inquiries_table/ManagerInquiriesTable.tsx` | Renders the paginated, filterable table of inquiries with row actions, status updates, and bulk selection. |
| `manager_inquiries/manager_inquiries_components/manager_inquiries_kpis/ManagerInquiriesKPIs.tsx` | Renders the four KPI stat cards (Total, New, Follow Up, Converted) for the Inquiries module. |
| `manager_inquiries/manager_inquiries_components/manager_inquiries_main/ManagerInquiriesMain.tsx` | Framework entry component for the Inquiries module; delegates feature behavior and UI composition to `ManagerInquiriesContent`. |
| `manager_inquiries/manager_inquiries_components/manager_inquiries_modal/ManagerInquiriesModal.tsx` | Renders the modal form for creating or editing an inquiry lead. Uses React Hook Form + Zod validation. |
| `manager_inquiries/manager_inquiries_components/manager_inquiries_toolbar/ManagerInquiriesToolbar.tsx` | Renders the search/filter toolbar and bulk-action bar for the Inquiries module. |
| `manager_inquiries/manager_inquiries_hooks/useManagerInquiriesLogic.ts` | Provides inquiries state and actions to the entire inquiries module hierarchy via module-local state/query layer. |
| `manager_inquiries_components/manager_inquiries_bulk_message_modal/ManagerInquiriesBulkMessageModal.tsx` | Renders the Inquiries Bulk Message Modal interaction surface and delegates validation and mutation state to module-owned form/logic hooks. |
| `manager_inquiries_components/manager_inquiries_main/manager_inquiries_content/ManagerInquiriesContent.tsx` | Composes the Inquiries Content content sections while keeping data/state orchestration outside the view layer. |
| `manager_inquiries_components/manager_inquiries_message_modal/ManagerInquiriesMessageModal.tsx` | Renders the Inquiries Message Modal interaction surface and delegates validation and mutation state to module-owned form/logic hooks. |

## Rule Compliance Checklist
- [x] Module-owned API, types/schemas, fixtures, handlers, tests, and feature documentation are scoped to this module.
- [x] API calls use the module API client and typed response contracts.
- [x] Server-backed pagination/filter/search follows explicit parameter propagation where applicable.
- [x] UI Data Requirements map displayed values to concrete endpoints and response paths.
- [x] Module-owned MSW fixtures/handlers remain the frontend-first server substitute.
- [x] Raw `any`, relative imports, barrel files, and hardcoded localhost mock origins are absent from audited Manager source.
- [ ] Host-repository CI/tooling, dependency/SCA/secret gates, CODEOWNERS, branch protection, and production build require root-repository verification.

## Internationalization
- Namespace: `MANAGER_INQUIRIES`
- Active locales: `en`, `hi`
- English catalog: `manager_inquiries/manager_inquiries_locales/manager_inquiries_en.json`
- Hindi catalog: `manager_inquiries/manager_inquiries_locales/manager_inquiries_hi.json`
- Client UI strings use `next-intl` `useTranslations()`; route-boundary/server UI uses `getTranslations()`.
- Host application must provide the `next-intl` provider, locale negotiation, and build-time locale merge described in `INTEGRATION_GUIDE.md`.


## v4 Repair Verification Scope — 2026-10-02
- The module was re-audited against the complete supplied architecture, UI/UX, and repair specifications.
- Business Feature Dependencies and Role-Level Business Dependencies are explicitly recorded above.
- Runtime host-toolchain gates (production build, live typecheck, lint, browser execution, dependency/SCA/secret scans, and CODEOWNERS) remain host-repository verification items because those root configuration files were not supplied with the target ZIP.

## AI Repair / Discovery Index

- Primary orchestration: `ManagerInquiriesMain.tsx`
- Primary query-key registry: `ManagerInquiriesQueryKeys.ts`
- Primary module constants registry: `ManagerInquiriesConstants.ts`
- Canonical schema file: `ManagerInquiriesSchema.ts` in `manager_inquiries_schemas/`
- Module theme contract: `manager_inquiries_theme_contract.md`


## V9 Audit Synchronization — 2026-10-02

This section is generated from the repaired source tree. It is authoritative for current file ownership and AI discovery; it does not claim host-repository runtime verification when the host configuration is outside the supplied ZIP.

| Canonical discovery artifact | Current path | Present |
|---|---|---|
| Main | `manager_inquiries_components/manager_inquiries_main/ManagerInquiriesMain.tsx` | YES |
| API client | `ManagerInquiriesApi.ts` | YES |
| Schema file | `ManagerInquiriesSchema.ts` | YES |
| Query-key registry | `ManagerInquiriesQueryKeys.ts` | YES |
| Constants registry | `ManagerInquiriesConstants.ts` | YES |
| URL config | `manager_inquiries_url_config.ts` | YES |
| Behavior test | `ManagerInquiriesBehavior.test.tsx` | YES |
| Repair map | `stage_2_frontend_audit.md` in the delivery root | YES |
| Theme contract | `manager_inquiries_theme_contract.md` | YES |

### Current module boundary

- Business code is owned by `manager_inquiries/`; sibling business modules are not required for normal repair.
- Mock fixtures and handlers live under `manager_inquiries/manager_inquiries_mocks/manager_inquiries_mocks_fixtures/` and `manager_inquiries/manager_inquiries_mocks/manager_inquiries_mocks_handlers/`.
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
