# Manager Grievance — Feature Map

## Module Purpose
The Manager Grievance module gives gym managers a focused queue for member complaints and their resolution status. Managers use it to review reported issues, search by member or issue text, record new complaints, and close open or resolving complaints with a resolution note. The module owns its complaint API contract, UI state, query keys, mock data and mutation behavior. Backend authorization remains outside this frontend module; the UI only follows the documented Manager permission context.

Module root: `frontend_manager/manager_grievance/`

## Dependency Manifest

Exact third-party packages imported by this module in the supplied source snapshot:
- `@hookform/resolvers`
- `@tanstack/react-query`
- `@testing-library/react`
- `@testing-library/user-event`
- `date-fns`
- `lucide-react`
- `msw`
- `next`
- `next-intl`
- `react`
- `react-hook-form`
- `vitest`
- `zod`

Application framework: `Next.js App Router`.

## Feature Lifecycle Contract

The following CRUD capability is derived from the module-owned API client verbs in the supplied source snapshot. Domain commands that happen to use `POST` are identified as Create-capable only at the transport level; they are not assumed to be generic CRUD records.

| Operation | Status | Evidence |
|---|---|---|
| Create | Exposed | ManagerGrievanceApi |
| Read | Exposed | ManagerGrievanceApi: fetchGrievanceTickets. |
| Update | Not exposed | No module API client uses PUT/PATCH in the supplied snapshot. |
| Delete | Not exposed | No module API client uses DELETE in the supplied snapshot. |

## Directory Structure

Filesystem-verified directory ownership for the supplied source snapshot:

| Folder | Responsibility | Key Files |
|---|---|---|
| `manager_grievance_api/` | Owns feature API clients and request/response transport contracts. | `ManagerGrievanceApi.ts` |
| `manager_grievance_components/` | Owns the feature UI component tree and feature-specific presentation. | `manager_grievance_components/manager_grievance_log_complaint_modal/ManagerGrievanceLogComplaintModal.tsx`, `ManagerGrievanceMain.tsx` |
| `manager_grievance_components/manager_grievance_content/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerGrievanceContent.tsx` |
| `manager_grievance_constants/` | Owns feature static UI configuration, status mappings, and query keys. | `ManagerGrievanceConstants.ts`, `ManagerGrievanceQueryKeys.ts` |
| `manager_grievance_hooks/` | Owns feature custom hooks for queries, mutations, UI orchestration, and URL state. | `useManagerGrievanceLogic.test.ts`, `useManagerGrievanceLogic.ts`, `useManagerGrievanceMutations.test.ts`, `useManagerGrievanceMutations.ts`, `useManagerGrievanceQueries.test.ts`, `useManagerGrievanceQueries.ts`, `useManagerGrievanceResolution.test.ts`, `useManagerGrievanceResolution.ts` (+2 more) |
| `manager_grievance_locales/` | Owns module English and Hindi translation catalogs. | `manager_grievance_en.json`, `manager_grievance_hi.json` |
| `manager_grievance_mocks/` | Owns module-local frontend-first mock assets. | — |
| `manager_grievance_mocks/manager_grievance_mocks_fixtures/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerGrievanceMockFixtures.ts` |
| `manager_grievance_mocks/manager_grievance_mocks_handlers/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerGrievanceMockHandlers.test.ts`, `ManagerGrievanceMockHandlers.ts` |
| `manager_grievance_schemas/` | Owns feature Zod validation and response schemas. | `ManagerGrievanceSchemas.ts` |
| `manager_grievance_tests/` | Owns module behavior and utility tests. | `ManagerGrievanceBehavior.test.tsx` |
| `manager_grievance_types/` | Owns feature TypeScript domain/request/view-model contracts. | `ManagerGrievanceContentTypes.ts`, `ManagerGrievanceLogComplaintModalTypes.ts`, `ManagerGrievanceResolutionTypes.ts`, `ManagerGrievanceTypes.ts` |
| `manager_grievance_utils/` | Owns feature-local formatting/export/calculation utilities. | `ManagerGrievanceFormatters.test.ts`, `ManagerGrievanceFormatters.ts` |

## Root-level Routing and Documentation Files

Only the following root files are present and permitted by the architecture quarantine:
- `error.tsx`
- `loading.tsx`
- `manager_grievance_features.md`
- `manager_grievance_forbidden.md`
- `manager_grievance_theme_contract.md`
- `manager_grievance_url_config.ts`
- `not-found.tsx`
- `page.tsx`

## Approved External Dependencies
### Application Infrastructure
- `@/app/frontend_manager/manager_navigation/manager_navigation_components/manager_navigation_header/ManagerHeader`
- `@/app/frontend_manager/manager_infrastructure/ManagerEnvConfig`
- `@/app/frontend_manager/manager_infrastructure/ManagerErrorMessage`
- `@/app/frontend_manager/manager_infrastructure/ManagerHttpStatus`
- `@/app/frontend_manager/manager_infrastructure/ManagerIdempotency`
- `@/app/frontend_manager/manager_infrastructure/ManagerMockApiUrl`
- `@/app/frontend_manager/manager_infrastructure/ManagerToastService`
- `@/app/frontend_manager/manager_infrastructure/useManagerUnsavedChangesGuard`
- `@/app/frontend_manager/manager_mocks/ManagerMswTestServer`
- `@/app/frontend_manager/manager_mocks/ManagerTestProviders`
- `@/lib/api`

### Business Feature Dependencies
- None. No imports from sibling feature business modules are permitted or present in the audited source.

### Role-Level Business Dependencies
- None.

### Third-Party Dependencies
- `@hookform`
- `@tanstack`
- `@testing-library/react`
- `@testing-library/user-event`
- `lucide-react`
- `msw`
- `next-intl`
- `react`
- `react-hook-form`
- `vitest`
- `zod`

## Feature Inventory
| Feature | Route | What the User Can Do | Key Components | Main API Calls | Status |
|---|---|---|---|---|---|
| Complaint queue | `/manager/grievance` | Browse complaint records and search by member or issue | `ManagerGrievanceContent.tsx` | GET `/manager/grievance` | Implemented |
| Log complaint | `/manager/grievance` | Create a new complaint and return to the queue | `ManagerGrievanceLogComplaintModal.tsx` | POST `/manager/grievance` | Implemented |
| Resolve complaint | `/manager/grievance` | Add a resolution note and close an open/resolving complaint | `ManagerGrievanceContent.tsx` | POST `/manager/grievance/:id/resolve` | Implemented |

## User Flows & Interactions
### Flow 1: Log a complaint
1. Manager opens `/manager/grievance` and clicks `Log Complaint`.
2. `ManagerGrievanceLogComplaintModal` opens with RHF + Zod validation.
3. Manager enters member name, category and issue description.
4. Submit calls the feature create mutation.
5. On success the feature invalidates the grievance list query, shows the backend mutation message through Manager toast infrastructure, closes the modal and renders the new record.
6. On validation or API error the form remains available and the user can correct/retry.

### Flow 2: Resolve a complaint
1. Manager clicks `Resolve` on an open/resolving record.
2. Inline resolution UI appears and requires a non-empty note.
3. Submit calls `POST /manager/grievance/:id/resolve`.
4. On success the record becomes `CLOSED`, the resolution note is visible and the next action is available.
5. On failure the original record remains visible and retry remains possible.

## Component Tree

- Route: `manager_grievance/page.tsx`
  - `<ManagerGrievanceMain>` is the canonical client/page orchestration component.
    - Direct feature-child imports are not statically enumerated from this Main file; see Component Responsibility Map.

## Data and State Architecture
- **Server state:** TanStack Query owns API responses and request status.
- **UI/shared client state:** Module-local Zustand or component-local state owns only transient UI selections, modal state, tab state, and drafts.
- **URL state:** No URL-backed list state was detected; this module must add URL state before introducing a searchable/filterable/paginated list.
- **Zustand stores:** None detected.
- **Contexts:** None. Stable cross-tree application concerns only.
- **Observed query-key fragments:** No static queryKey literals detected.
- **Local storage keys:** None documented in this module.
- **MSW handler/fixture locations:** `manager_grievance/manager_grievance_mocks/manager_grievance_mocks_handlers/` and `manager_grievance/manager_grievance_mocks/manager_grievance_mocks_fixtures/`.
- **Mock scenarios:** normal, empty, error, filter/search/pagination scenarios are required for every applicable list; the documented scenarios are the exact scenarios implemented by the module handlers and tests.

## API Contract
| Function | Method | Endpoint | Request | Response `data` type |
|---|---|---|---|---|
| `ManagerGrievanceApi.fetchGrievanceTickets` | GET | `/manager/grievance` | — | `GrievanceTicket[]` |
| `ManagerGrievanceApi.createGrievanceTicket` | POST | `/manager/grievance` | `CreateGrievanceTicketPayload` | `GrievanceTicket` |
| `ManagerGrievanceApi.resolveGrievanceTicket` | POST | `/manager/grievance/:id/resolve` | `{ resolutionNote: string }` | `GrievanceTicket` |

## UI Data Requirements
| UI Element | Required Field(s) | API Endpoint | Response Path | Nullable? | Mocked? |
|---|---|---|---|---|---|
| Complaint member | `memberName` | GET | `data[].memberName` | No | Yes |
| Complaint category | `category` | GET | `data[].category` | No | Yes |
| Complaint issue | `issue` | GET | `data[].issue` | No | Yes |
| Complaint status | `status` | GET | `data[].status` | No | Yes |
| Reported time | `loggedAt` | GET | `data[].loggedAt` | No | Yes |
| Resolution note | `resolutionNote` | GET | `data[].resolutionNote` | Yes | Yes |

## Permissions and Security
- **Required role:** `MANAGER`.
- **Destructive/irreversible actions:** Resolving a complaint changes its status to `CLOSED`; the current product flow requires an explicit resolution note before submission.
- **Cross-role isolation:** No imports from another role or Manager business feature.

### Hook Ownership
- `manager_grievance_hooks/useManagerGrievanceResolution.ts` owns inline resolution draft state, submit sequencing, and unsaved-change protection.

## Loading, Empty, and Error States
- Route loading: `loading.tsx` structural skeleton.
- Query error: inline safe error with `Retry`.
- Empty/search-no-match: contextual message with `Log Complaint` available in the page header.
- Mutation errors: Manager toast infrastructure plus preserved UI state.

## Edge Cases and AI Warnings
**Forbidden-pattern contract:** See `manager_grievance_forbidden.md` for the module-specific forbidden patterns; that file is the canonical AI repair safety reference.

- Never bypass `ManagerGrievanceUrlConfig`.
- Never import member/attendance/sales business logic to populate the complaint form.
- Mock mutations must update later GET results.
- Preserve `resolutionNote` only when the API returns it; do not invent a success state locally.

## Component Responsibility Map
| Component File | Responsibility |
|---|---|
| `ManagerGrievanceContent.tsx` | Queue rendering, search, empty/error/loading state and inline resolution interaction. |
| `ManagerGrievanceLogComplaintModal.tsx` | Complaint create form view and validation wiring. |

## Rule Compliance Checklist
- [x] Feature-local business ownership
- [x] Module-prefixed non-reserved files
- [x] API boundary schema validation
- [x] URL config ownership
- [x] Mutable MSW state + reset
- [x] Loading/error/empty states
- [x] Semantic theme tokens
- [x] Accessible labels and error associations

## Internationalization
- Namespace: `MANAGER_GRIEVANCE`
- Active locales: `en`, `hi`
- English catalog: `manager_grievance/manager_grievance_locales/manager_grievance_en.json`
- Hindi catalog: `manager_grievance/manager_grievance_locales/manager_grievance_hi.json`
- Client UI strings use `next-intl` `useTranslations()`; route-boundary/server UI uses `getTranslations()`.
- Host application must provide the `next-intl` provider, locale negotiation, and build-time locale merge described in `INTEGRATION_GUIDE.md`.


## v4 Repair Verification Scope — 2026-10-02
- The module was re-audited against the complete supplied architecture, UI/UX, and repair specifications.
- Business Feature Dependencies and Role-Level Business Dependencies are explicitly recorded above.
- Runtime host-toolchain gates (production build, live typecheck, lint, browser execution, dependency/SCA/secret scans, and CODEOWNERS) remain host-repository verification items because those root configuration files were not supplied with the target ZIP.

## AI Repair / Discovery Index

- Primary orchestration: `ManagerGrievanceContent.tsx`
- Primary query-key registry: `ManagerGrievanceQueryKeys.ts`
- Primary module constants registry: `ManagerGrievanceConstants.ts`
- Canonical schema file: `ManagerGrievanceSchemas.ts` in `manager_grievance_schemas/`
- Module theme contract: `manager_grievance_theme_contract.md`


## V9 Audit Synchronization — 2026-10-02

This section is generated from the repaired source tree. It is authoritative for current file ownership and AI discovery; it does not claim host-repository runtime verification when the host configuration is outside the supplied ZIP.

| Canonical discovery artifact | Current path | Present |
|---|---|---|
| Main | `manager_grievance_components/manager_grievance_main/ManagerGrievanceMain.tsx` | YES |
| API client | `ManagerGrievanceApi.ts` | YES |
| Schema file | `ManagerGrievanceSchemas.ts` | YES |
| Query-key registry | `ManagerGrievanceQueryKeys.ts` | YES |
| Constants registry | `ManagerGrievanceConstants.ts` | YES |
| URL config | `manager_grievance_url_config.ts` | YES |
| Behavior test | `ManagerGrievanceBehavior.test.tsx` | YES |
| Repair map | `stage_2_frontend_audit.md` in the delivery root | YES |
| Theme contract | `manager_grievance_theme_contract.md` | YES |

### Current module boundary

- Business code is owned by `manager_grievance/`; sibling business modules are not required for normal repair.
- Mock fixtures and handlers live under `manager_grievance/manager_grievance_mocks/manager_grievance_mocks_fixtures/` and `manager_grievance/manager_grievance_mocks/manager_grievance_mocks_handlers/`.
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
