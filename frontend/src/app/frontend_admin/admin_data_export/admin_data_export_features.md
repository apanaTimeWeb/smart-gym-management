# Admin Data Export — Feature Map

## Module Purpose
The Admin Data Export module is the designated administrative entry point for requesting a full data export and offboarding workflow. The current supplied frontend intentionally stops at the scope boundary because no authoritative export API contract is included. The module therefore documents the route and preserves a non-invented blocked state rather than fabricating an endpoint or mock response. It must not be treated as complete until the backend export contract is supplied and the asynchronous request, completion feedback, and recovery flow can be implemented from that contract.

## Routes

| Route | Page Entry | Main Component |
|---|---|---|
| `/admin/data-export` | ``frontend_admin/admin_data_export/page.tsx`` | ``frontend_admin/admin_data_export/admin_data_export_components/admin_data_export_main/AdminDataExportMain.tsx`` |

## Dependency Manifest
- Next.js App Router 15.x (framework usage)
- TypeScript (strict mode policy)
- Zod 3.x
- lucide-react
- next-intl

## Directory Structure

Canonical module root: `admin_data_export/`. This map is generated from the delivered source tree and is the primary ownership reference for future AI repairs.

| Folder | Responsibility | Key Files |
|---|---|---|
| `admin_data_export_api/` | Typed API transport boundary. | (empty) |
| `admin_data_export_components/` | Feature component root. | (empty) |
| `admin_data_export_constants/` | Static business configuration and query-key registries. | AdminDataExportConstants.ts, AdminDataExportQueryKeys.ts |
| `admin_data_export_locales/` | Module-owned localized resources. | admin_data_export_en.json, admin_data_export_hi.json |
| `admin_data_export_schemas/` | Zod validation/runtime contracts. | AdminDataExportSchema.ts |
| `admin_data_export_types/` | Domain, DTO, state, and prop type contracts. | AdminDataExportErrorPropsTypes.ts |
| `admin_data_export_components/admin_data_export_main/` | Feature-owned implementation boundary. | AdminDataExportMain.tsx |

## Feature Lifecycle Contract
- **Create:** BLOCKED_BY_SUPPLIED_SCOPE — no authoritative export API contract is supplied; do not invent the request endpoint.
- **Read:** Present for the supplied route/query surfaces unless the module is explicitly scope-blocked.
- **Update:** Not present in supplied API surface.
- **Delete:** Not present in supplied API surface.
- This contract is source-derived from the delivered frontend and does not invent backend behavior.

## External Dependencies
### Application Infrastructure
- `@/app/frontend_admin/admin_layout/admin_layout_shared/AdminLayoutErrorFallback`
- `@/app/frontend_admin/admin_layout/admin_layout_shell/AdminLayoutNotFound`

### Business Feature Dependencies
- None

### Role-Level Business Dependencies
- None

## Feature Inventory
| UI / Route Surface | Evidence in source |
|---|---|
| `page.tsx` | Canonical Next.js route entry. |
| `AdminDataExportMain.tsx` | `Route-level orchestrator for the documented scope-blocked Admin Data Export feature.` |


## User Flows
### Flow 1: Read-only flow
Read-only flow: route → Main → query hook → module API → validated response → visible state, with loading/empty/error recovery.



## State Map
- **Server state:** TanStack Query is the server/async source of truth where the module exposes query hooks.
- **UI state:** local React state or module-scoped Zustand only; server response data is not stored as primary client state.
- **Hooks:** No module hooks detected.
- **Stores:** No module-scoped Zustand store detected.
- **Query-key registry:** `admin`, `data-export`, `detail`, `list`
- **Locales:** `en` and `hi` are module-owned and active in the supplied architecture.
- **Browser persistence:** no direct browser storage access is present in production feature source.


## API Contract Summary
- **BLOCKED BY SUPPLIED SCOPE:** No trustworthy request/response contract or executable mock transport for the export action is present in the supplied role-only archive. The module therefore does not invent an API client or fake a production export path.

- Mutation contract: every POST/PATCH/PUT/DELETE API client function in this source requires an idempotency key and injects `Idempotency-Key`; retries reuse the same key.
- Response contract: API calls consume typed/Zod-validated responses through the module API boundary.


## UI Data Requirements
The following is the **source-grounded UI surface inventory** for this repair cycle. It records the concrete component evidence available in the role-only archive. The supplied artifact does not include the backend API contract, so an exact backend response-path claim is **BLOCKED BY SUPPLIED SCOPE** unless the path is directly asserted by the module-owned type/mock contract. No response path is invented.

| UI component | Responsibility evidence | Interactive test IDs | Backend response path | Status |
|---|---|---:|---|---|
| `AdminDataExportMain.tsx` | Route-level orchestrator for the documented scope-blocked Admin Data Export feature. | 0 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |

Feature-owned mock fixtures remain the source for deterministic frontend demo data; production components do not embed fake business-record arrays.


## Permissions and Security
- **Role container:** `frontend_admin/` → Admin role surface.
- **Frontend permission evidence:** No module-local `usePermissions` reference was found; frontend authorization remains an approved application-infrastructure boundary, and backend authorization is outside this supplied scope.
- **Destructive/financial UI:** must remain behind the module’s documented confirmation/permission flow; backend authorization is not evaluated in this role-only audit.
- **Sensitive data:** list/detail masking behavior must remain feature-owned; no role-independent global business masking layer is introduced.

## Loading, Empty, and Error States
- `loading.tsx`, `error.tsx`, and `not-found.tsx` are present.
- The module must use structural skeletons for complex asynchronous sections and contextual empty/error/retry UI rather than a blank screen or generic full-page spinner.
- Runtime evidence for actual state transitions is `NOT VERIFIED` without host execution.

## Edge Cases and AI Warnings
- **Feature isolation:** Do not import sibling Admin business modules or move business behavior into a global helper merely to reduce duplication.
- **Mutation retry identity:** When this feature has mutations, the existing user-intent idempotency key must be reused across retries; never generate a new key for a retry.
- **Server-state ownership:** Keep API response data in TanStack Query; do not create a parallel Zustand copy.
- **Scope preservation:** Resource IDs, branch/tenant context, and URL/query state must stay aligned from route → query key → request → mock/response → rendered record.
- **Documentation freshness:** Any new component, API endpoint, flow, mock scenario, or theme dependency must be reflected in this feature map in the same change.


## Component Responsibility Map
| Component | Responsibility | Test IDs |
|---|---|---:|
| `AdminDataExportMain.tsx` | Route-level orchestrator for the documented scope-blocked Admin Data Export feature. | 0 |


## Repair Notes — v17_fix

- Canonicalized the module URL configuration without changing the supplied endpoint path values.
- Updated this feature map with concrete business purpose, dependency manifest, lifecycle ownership, directory ownership, and external-dependency boundaries.
- Preserved module-local business logic and approved application-infrastructure dependencies; no cross-feature business abstraction was introduced.
- Kept any scope-blocked behavior explicitly blocked rather than fabricating API contracts.
- Runtime/browser/host build verification remains outside the role-only supplied archive.
## Rule Compliance Checklist
- [x] Canonical feature module exists and owns business-specific source artifacts.
- [x] Child folders use module-prefixed `snake_case` naming.
- [x] Role/module prefixes are preserved in non-framework file names.
- [x] No production relative imports or barrel/facade files were detected in the supplied source audit.
- [x] Production component and extended file-size ceilings pass the current source scan.
- [x] Module-owned mocks/fixtures/handlers are present unless explicitly scope-blocked.
- [x] No production `any`, TypeScript ignore directives, console logging, direct browser storage, or semantic background opacity modifiers were detected.
- [x] Interactive production elements carry machine-readable `data-testid` attributes under the current source-compliance test contract.
- [x] Password-secret fields in this role now have explicit eye-icon visibility toggles.
- [ ] Host TypeScript/ESLint/Next build/Vitest/RTL/Playwright/browser accessibility/SCA/gitleaks gates are `NOT VERIFIED` because the supplied artifact is role-only and contains no host project configuration/runtime.
- [ ] API/mock contract: `BLOCKED BY SUPPLIED SCOPE` — no authoritative export request/response contract was supplied.


## Component Tree

`admin_data_export_components/`
- `admin_data_export_main/AdminDataExportMain.tsx`

## Known Forbidden Patterns

Canonical forbidden-pattern reference: `admin_data_export_forbidden.md`.

- No sibling business-module imports.
- No hardcoded business fallback data.
- No feature-specific business logic in global UI primitives.
- No bypass of the module API/state boundaries.
