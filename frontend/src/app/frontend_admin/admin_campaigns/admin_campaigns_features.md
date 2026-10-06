# Admin Campaigns — Feature Map

## Module Purpose
The Admin Campaigns module provides the admin-side campaign composition workspace for audience, template, recipient, and message-content preparation. Users can load available audiences and templates, inspect recipients for a chosen audience, compose a message, and use the campaign queue UI defined by the current frontend. The supplied API surface is read-only, so the module must not invent a send/create endpoint that is absent from the supplied contract. It does not own the underlying member database or external messaging-provider credentials.

## Routes

| Route | Page Entry | Main Component |
|---|---|---|
| `/admin/campaigns` | ``frontend_admin/admin_campaigns/page.tsx`` | ``frontend_admin/admin_campaigns/admin_campaigns_components/admin_campaigns_main/AdminCampaignsMain.tsx`` |

## Dependency Manifest
- Next.js App Router 15.x (framework usage)
- TypeScript (strict mode policy)
- TanStack Query 5.x
- Zod 3.x
- lucide-react
- next-intl

## Directory Structure

Canonical module root: `admin_campaigns/`. This map is generated from the delivered source tree and is the primary ownership reference for future AI repairs.

| Folder | Responsibility | Key Files |
|---|---|---|
| `admin_campaigns_api/` | Typed API transport boundary. | AdminCampaignsApi.ts |
| `admin_campaigns_components/` | Feature component root. | (empty) |
| `admin_campaigns_constants/` | Static business configuration and query-key registries. | AdminCampaignsConstants.ts, AdminCampaignsExternalUrlConstants.ts, AdminCampaignsQueryKeys.ts |
| `admin_campaigns_hooks/` | Feature data-flow and interaction hooks. | useAdminCampaignsLogic.test.ts, useAdminCampaignsLogic.ts |
| `admin_campaigns_locales/` | Module-owned localized resources. | admin_campaigns_en.json, admin_campaigns_hi.json |
| `admin_campaigns_mocks/` | Module-owned MSW mock infrastructure. | (empty) |
| `admin_campaigns_schemas/` | Zod validation/runtime contracts. | AdminCampaignsSchemas.ts |
| `admin_campaigns_types/` | Domain, DTO, state, and prop type contracts. | AdminCampaignsErrorPropsTypes.ts, AdminCampaignsSectionStatePropsTypes.ts, AdminCampaignsTypes.ts |
| `admin_campaigns_utils/` | Feature-local deterministic utilities and formatters. | AdminCampaignsQueueUtils.test.ts, AdminCampaignsQueueUtils.ts, AdminCampaignsWhatsAppUtils.test.ts, AdminCampaignsWhatsAppUtils.ts |
| `admin_campaigns_components/admin_campaigns_audience_picker/` | Feature-owned implementation boundary. | AdminCampaignsAudiencePicker.tsx |
| `admin_campaigns_components/admin_campaigns_composer/` | Feature-owned implementation boundary. | AdminCampaignsComposer.tsx |
| `admin_campaigns_components/admin_campaigns_main/` | Feature-owned implementation boundary. | AdminCampaignsMain.tsx |
| `admin_campaigns_components/admin_campaigns_queue_panel/` | Feature-owned implementation boundary. | AdminCampaignsQueuePanel.tsx |
| `admin_campaigns_components/admin_campaigns_section_state/` | Feature-owned implementation boundary. | AdminCampaignsSectionState.tsx |
| `admin_campaigns_components/admin_campaigns_template_picker/` | Feature-owned implementation boundary. | AdminCampaignsTemplatePicker.tsx |
| `admin_campaigns_mocks/admin_campaigns_fixtures/` | Module-owned mock API datasets. | AdminCampaignsMockFixtures.ts |
| `admin_campaigns_mocks/admin_campaigns_handlers/` | Module-owned MSW request handlers. | AdminCampaignsMockHandlers.ts |

## Feature Lifecycle Contract
- **Create:** Not present in supplied API surface.
- **Read:** Present for the supplied route/query surfaces unless the module is explicitly scope-blocked.
- **Update:** Not present in supplied API surface.
- **Delete:** Not present in supplied API surface.
- This contract is source-derived from the delivered frontend and does not invent backend behavior.

## External Dependencies
### Application Infrastructure
- `@/app/frontend_admin/admin_layout/admin_layout_shared/AdminLayoutTableSkeleton`
- `@/app/frontend_admin/admin_layout/admin_layout_shell/AdminLayoutNotFound`
- `@/app/frontend_admin/admin_layout/admin_layout_utils/AdminLayoutMonitoring`
- `@/lib/api`

### Business Feature Dependencies
- None

### Role-Level Business Dependencies
- None

## Feature Inventory
| UI / Route Surface | Evidence in source |
|---|---|
| `page.tsx` | Canonical Next.js route entry. |
| `AdminCampaignsAudiencePicker.tsx` | `Renders AdminCampaignsAudiencePicker for the admin frontend module; feature logic stays in dedicated hooks, stores, APIs, and schemas.` |
| `AdminCampaignsComposer.tsx` | `Renders AdminCampaignsComposer for the admin frontend module; feature logic stays in dedicated hooks, stores, APIs, and schemas.` |
| `AdminCampaignsMain.tsx` | `Renders AdminCampaignsMain for the admin frontend module; feature logic stays in dedicated hooks, stores, APIs, and schemas.` |
| `AdminCampaignsQueuePanel.tsx` | `Renders AdminCampaignsQueuePanel for the admin frontend module; feature logic stays in dedicated hooks, stores, APIs, and schemas.` |
| `AdminCampaignsSectionState.tsx` | `Renders section-level loading and retry states for Campaigns data pickers.` |
| `AdminCampaignsTemplatePicker.tsx` | `Renders AdminCampaignsTemplatePicker for the admin frontend module; feature logic stays in dedicated hooks, stores, APIs, and schemas.` |


## User Flows
### Flow 1: Open/read data
Open/read data: route → Main → query hook → module API → Zod validation → rendered result.

### Flow 2: Read-only flow
Read-only flow: route → Main → query hook → module API → validated response → visible state, with loading/empty/error recovery.



## State Map
- **Server state:** TanStack Query is the server/async source of truth where the module exposes query hooks.
- **UI state:** local React state or module-scoped Zustand only; server response data is not stored as primary client state.
- **Hooks:** `useAdminCampaignsLogic.ts`
- **Stores:** No module-scoped Zustand store detected.
- **Query-key registry:** `admin`, `campaigns`, `detail`, `list`
- **Locales:** `en` and `hi` are module-owned and active in the supplied architecture.
- **Browser persistence:** no direct browser storage access is present in production feature source.


## API Contract Summary
| API file | Function | Method | Parameters | Declared response generic |
|---|---|---|---|---|
| `AdminCampaignsApi.ts` | `fetchAudiences` | `GET` | `—` | `ApiResponse<AdminCampaignsAudience[]` |
| `AdminCampaignsApi.ts` | `fetchTemplates` | `GET` | `—` | `ApiResponse<AdminCampaignsTemplate[]` |
| `AdminCampaignsApi.ts` | `fetchRecipients` | `GET` | `audienceId: string` | `ApiResponse<{ recipients: AdminCampaignsRecipient[] }` |

URL builders are centralized in module-owned URL config files. Exact configured entries are listed below.


- Mutation contract: every POST/PATCH/PUT/DELETE API client function in this source requires an idempotency key and injects `Idempotency-Key`; retries reuse the same key.
- Response contract: API calls consume typed/Zod-validated responses through the module API boundary.


## UI Data Requirements
The following is the **source-grounded UI surface inventory** for this repair cycle. It records the concrete component evidence available in the role-only archive. The supplied artifact does not include the backend API contract, so an exact backend response-path claim is **BLOCKED BY SUPPLIED SCOPE** unless the path is directly asserted by the module-owned type/mock contract. No response path is invented.

| UI component | Responsibility evidence | Interactive test IDs | Backend response path | Status |
|---|---|---:|---|---|
| `AdminCampaignsAudiencePicker.tsx` | Renders AdminCampaignsAudiencePicker for the admin frontend module; feature logic stays in dedicated hooks, stores, APIs, and schemas. | 1 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminCampaignsComposer.tsx` | Renders AdminCampaignsComposer for the admin frontend module; feature logic stays in dedicated hooks, stores, APIs, and schemas. | 2 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminCampaignsMain.tsx` | Renders AdminCampaignsMain for the admin frontend module; feature logic stays in dedicated hooks, stores, APIs, and schemas. | 3 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminCampaignsQueuePanel.tsx` | Renders AdminCampaignsQueuePanel for the admin frontend module; feature logic stays in dedicated hooks, stores, APIs, and schemas. | 4 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminCampaignsSectionState.tsx` | Renders section-level loading and retry states for Campaigns data pickers. | 2 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |
| `AdminCampaignsTemplatePicker.tsx` | Renders AdminCampaignsTemplatePicker for the admin frontend module; feature logic stays in dedicated hooks, stores, APIs, and schemas. | 1 | `BLOCKED BY SUPPLIED SCOPE` (backend contract not supplied) | `SOURCE-VERIFIED UI SURFACE` |

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
| `AdminCampaignsAudiencePicker.tsx` | Renders AdminCampaignsAudiencePicker for the admin frontend module; feature logic stays in dedicated hooks, stores, APIs, and schemas. | 1 |
| `AdminCampaignsComposer.tsx` | Renders AdminCampaignsComposer for the admin frontend module; feature logic stays in dedicated hooks, stores, APIs, and schemas. | 2 |
| `AdminCampaignsMain.tsx` | Renders AdminCampaignsMain for the admin frontend module; feature logic stays in dedicated hooks, stores, APIs, and schemas. | 3 |
| `AdminCampaignsQueuePanel.tsx` | Renders AdminCampaignsQueuePanel for the admin frontend module; feature logic stays in dedicated hooks, stores, APIs, and schemas. | 4 |
| `AdminCampaignsSectionState.tsx` | Renders section-level loading and retry states for Campaigns data pickers. | 2 |
| `AdminCampaignsTemplatePicker.tsx` | Renders AdminCampaignsTemplatePicker for the admin frontend module; feature logic stays in dedicated hooks, stores, APIs, and schemas. | 1 |


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


## Component Tree

`admin_campaigns_components/`
- `admin_campaigns_audience_picker/AdminCampaignsAudiencePicker.tsx`
- `admin_campaigns_composer/AdminCampaignsComposer.tsx`
- `admin_campaigns_main/AdminCampaignsMain.tsx`
- `admin_campaigns_queue_panel/AdminCampaignsQueuePanel.tsx`
- `admin_campaigns_section_state/AdminCampaignsSectionState.tsx`
- `admin_campaigns_template_picker/AdminCampaignsTemplatePicker.tsx`

## Known Forbidden Patterns

Canonical forbidden-pattern reference: `admin_campaigns_forbidden.md`.

- No sibling business-module imports.
- No hardcoded business fallback data.
- No feature-specific business logic in global UI primitives.
- No bypass of the module API/state boundaries.
