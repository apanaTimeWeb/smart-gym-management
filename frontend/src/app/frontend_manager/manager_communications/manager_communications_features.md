# Manager Communications — Feature Map

## Module Purpose
Manager Communications is the tenant-scoped outbound messaging workspace. Managers can review campaign history, see communication KPIs, choose recipient segments, send WhatsApp or Email campaigns, manage scheduled automations, and run churn-recovery outreach. The module owns its message/campaign data, query state, forms, fixtures, and MSW handlers. It does not own member master-data business logic or billing workflows.

Module root: `frontend_manager/manager_communications/`

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
| Create | Exposed | ManagerCommunicationsApi |
| Read | Exposed | ManagerCommunicationsApi: fetchCampaigns, fetchCommunicationKPIs, fetchSegmentRecipients, fetchAutomations, fetchChurnedMembers, fetchChurnKPIs. |
| Update | Exposed | ManagerCommunicationsApi |
| Delete | Not exposed | No module API client uses DELETE in the supplied snapshot. |

## Directory Structure

Filesystem-verified directory ownership for the supplied source snapshot:

| Folder | Responsibility | Key Files |
|---|---|---|
| `manager_communications_api/` | Owns feature API clients and request/response transport contracts. | `ManagerCommunicationsApi.ts` |
| `manager_communications_components/` | Owns the feature UI component tree and feature-specific presentation. | — |
| `manager_communications_components/manager_communications_automations/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerCommunicationsAutomations.tsx` |
| `manager_communications_components/manager_communications_bulk_message_modal/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerCommunicationsBulkMessageModal.tsx` |
| `manager_communications_components/manager_communications_churn_recovery/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerCommunicationsChurnRecoveryComposer.tsx`, `ManagerCommunicationsChurnRecoveryEmptyState.tsx`, `ManagerCommunicationsChurnRecoveryKPIs.tsx`, `ManagerCommunicationsChurnRecoveryTab.tsx`, `ManagerCommunicationsChurnRecoveryTable.tsx`, `ManagerCommunicationsChurnRecoveryTableRow.tsx` |
| `manager_communications_components/manager_communications_composer/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerCommunicationsComposer.tsx` |
| `manager_communications_components/manager_communications_history/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerCommunicationsHistory.tsx` |
| `manager_communications_components/manager_communications_kpis/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerCommunicationsKPIs.tsx` |
| `manager_communications_components/manager_communications_main/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerCommunicationsMain.tsx` |
| `manager_communications_components/manager_communications_segment_picker/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerCommunicationsSegmentPicker.tsx` |
| `manager_communications_constants/` | Owns feature static UI configuration, status mappings, and query keys. | `ManagerCommunicationsChurnRecoveryKpiConstants.ts`, `ManagerCommunicationsConstants.ts`, `ManagerCommunicationsQueryKeys.ts`, `ManagerCommunicationsSharedConstants.test.ts`, `ManagerCommunicationsSharedConstants.ts`, `ManagerCommunicationsTableConstants.ts` |
| `manager_communications_hooks/` | Owns feature custom hooks for queries, mutations, UI orchestration, and URL state. | `useManagerCommunicationsChurnRecoveryLogic.test.ts`, `useManagerCommunicationsChurnRecoveryLogic.ts`, `useManagerCommunicationsChurnRecoveryMutations.test.ts`, `useManagerCommunicationsChurnRecoveryMutations.ts`, `useManagerCommunicationsChurnRecoveryQueries.test.ts`, `useManagerCommunicationsChurnRecoveryQueries.ts`, `useManagerCommunicationsForm.test.ts`, `useManagerCommunicationsForm.ts` (+6 more) |
| `manager_communications_locales/` | Owns module English and Hindi translation catalogs. | `manager_communications_en.json`, `manager_communications_hi.json` |
| `manager_communications_mocks/` | Owns module-local frontend-first mock assets. | — |
| `manager_communications_mocks/manager_communications_mocks_fixtures/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerCommunicationsMockData.ts` |
| `manager_communications_mocks/manager_communications_mocks_handlers/` | Owns the named feature-specific responsibility implied by this folder. | `ManagerCommunicationsMockHandlers.ts` |
| `manager_communications_schemas/` | Owns feature Zod validation and response schemas. | `ManagerCommunicationsFormSchema.ts`, `ManagerCommunicationsSchema.ts` |
| `manager_communications_store/` | Owns module-scoped Zustand UI state only. | `useManagerCommunicationsStore.test.ts`, `useManagerCommunicationsStore.ts` |
| `manager_communications_tests/` | Owns module behavior and utility tests. | `ManagerCommunicationsBehavior.test.tsx` |
| `manager_communications_types/` | Owns feature TypeScript domain/request/view-model contracts. | `ManagerCommunicationsBulkMessageModalTypes.ts`, `ManagerCommunicationsChurnRecoveryComposerTypes.ts`, `ManagerCommunicationsChurnRecoveryKpisTypes.ts`, `ManagerCommunicationsChurnRecoveryTableRowTypes.ts`, `ManagerCommunicationsChurnRecoveryTableTypes.ts`, `ManagerCommunicationsFormTypes.ts`, `ManagerCommunicationsTypes.ts` |
| `manager_communications_utils/` | Owns feature-local formatting/export/calculation utilities. | `ManagerCommunicationsFormatters.test.ts`, `ManagerCommunicationsFormatters.ts` |

## Root-level Routing and Documentation Files

Only the following root files are present and permitted by the architecture quarantine:
- `error.tsx`
- `loading.tsx`
- `manager_communications_features.md`
- `manager_communications_forbidden.md`
- `manager_communications_theme_contract.md`
- `manager_communications_url_config.ts`
- `not-found.tsx`
- `page.tsx`

## Approved External Dependencies
### Application Infrastructure
- `@/components/ui/manager_pagination/ManagerPagination`
- `@/components/ui/manager_stat_card/ManagerStatCard`
- `@/components/ui/manager_table_skeleton/ManagerTableSkeleton`
- `@/app/frontend_manager/manager_infrastructure/useManagerDebounce`
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
- `@/lib/logger`

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
| fetchCampaigns | `/manager/communications` | Uses the fetchCampaigns workflow with typed request/response handling. | `GET /manager/communications/campaigns` | ✅ Implemented |
| fetchCommunicationKPIs | `/manager/communications` | Uses the fetchCommunicationKPIs workflow with typed request/response handling. | `GET /manager/communications/kpis` | ✅ Implemented |
| fetchSegmentRecipients | `/manager/communications` | Uses the fetchSegmentRecipients workflow with typed request/response handling. | `GET /manager/communications/segments/:segment` | ✅ Implemented |
| sendCampaign | `/manager/communications` | Uses the sendCampaign workflow with typed request/response handling. | `POST /manager/communications/campaigns` | ✅ Implemented |
| fetchAutomations | `/manager/communications` | Uses the fetchAutomations workflow with typed request/response handling. | `GET /manager/communications/automations` | ✅ Implemented |
| updateAutomation | `/manager/communications` | Uses the updateAutomation workflow with typed request/response handling. | `PATCH /manager/communications/automations/:id` | ✅ Implemented |
| fetchChurnedMembers | `/manager/communications` | Uses the fetchChurnedMembers workflow with typed request/response handling. | `GET /manager/communications/churned-members` | ✅ Implemented |
| fetchChurnKPIs | `/manager/communications` | Uses the fetchChurnKPIs workflow with typed request/response handling. | `GET /manager/communications/churn-kpis` | ✅ Implemented |
| sendWinBackMessage | `/manager/communications` | Uses the sendWinBackMessage workflow with typed request/response handling. | `POST /manager/communications/win-back` | ✅ Implemented |

## User Flows & Interactions
### Flow 1: Send campaign
1. Manager opens the composer and selects a channel and recipient segment.
2. The recipient endpoint supplies the current segment audience through the module API.
3. React Hook Form + Zod validates the message payload before submission.
4. sendCampaign() submits the campaign; the backend/MSW response message is shown and the campaign history query is reconciled.
### Flow 2: Run churn recovery
1. Manager opens Churn Recovery and reviews churn KPIs and members.
2. Manager chooses a member and a win-back template tier/channel.
3. sendWinBackMessage() submits the outreach payload.
4. The module consumes the authoritative backend response and refreshes the affected churn/campaign views.

## Component Tree

- Route: `manager_communications/page.tsx`
  - `<ManagerCommunicationsMain>` is the canonical client/page orchestration component.
    - Direct feature-child imports are not statically enumerated from this Main file; see Component Responsibility Map.

## Data and State Architecture
- **Server state:** TanStack Query owns API responses and request status.
- **UI/shared client state:** Module-local Zustand or component-local state owns only transient UI selections, modal state, tab state, and drafts.
- **URL state:** Search/filter/sort/pagination state is URL-backed where the module exposes a server-backed list.
- **Zustand stores:** `manager_communications_store/useManagerCommunicationsStore.ts`
- **Contexts:** None. Stable cross-tree application concerns only.
- **Observed query-key fragments:** `['manager', 'communications']`; `['manager', 'communications', 'automations']`; `['manager', 'communications', 'campaigns', { search, channel, page, limit: 10 }]`; `['manager', 'communications', 'kpis']`; `['manager', 'communications', 'segment', selectedSegment]`; `['manager', 'communications', 'churn', 'members']`; `['manager', 'communications', 'churn', 'kpis']`
- **Local storage keys:** None documented in this module.
- **MSW handler/fixture locations:** `manager_communications/manager_communications_mocks/manager_communications_mocks_handlers/` and `manager_communications/manager_communications_mocks/manager_communications_mocks_fixtures/`.
- **Mock scenarios:** normal, empty, error, filter/search/pagination scenarios are required for every applicable list; the documented scenarios are the exact scenarios implemented by the module handlers and tests.

## API Contract
| Function | Method | Endpoint | Request | Response `data` type |
|---|---|---|---|---|
| `fetchCampaigns` | `GET` | `/api/v1/manager/communications/campaigns` | `{ page?, limit?, search?, channel?, status? }` | `{ campaigns: CommCampaign[]; total: number }` |
| `fetchCommunicationKPIs` | `GET` | `/api/v1/manager/communications/kpis` | `—` | `CommKPIData` |
| `fetchSegmentRecipients` | `GET` | `/api/v1/manager/communications/segments/:segment` | `{ segment: CommSegment }` | `CommRecipient[]` |
| `sendCampaign` | `POST` | `/api/v1/manager/communications/campaigns` | `{ title; channel; segment; message; subject; recipientCount; segmentLabel }` | `CommCampaign` |
| `fetchAutomations` | `GET` | `/api/v1/manager/communications/automations` | `—` | `CommAutomation[]` |
| `updateAutomation` | `PATCH` | `/api/v1/manager/communications/automations/:id` | `Partial<CommAutomation>` | `CommAutomation` |
| `fetchChurnedMembers` | `GET` | `/api/v1/manager/communications/churned-members` | `—` | `ChurnedMember[]` |
| `fetchChurnKPIs` | `GET` | `/api/v1/manager/communications/churn-kpis` | `—` | `ChurnKPIData` |
| `sendWinBackMessage` | `POST` | `/api/v1/manager/communications/win-back` | `{ memberId; memberName; phone; email; channel; templateTier; message; subject }` | `CommCampaign` |

## UI Data Requirements
| UI Element | Required Field(s) | API Endpoint | Response Path | Nullable? | Mocked? |
|---|---|---|---|---|---|
| KPI: Total sent | `totalSent` | `/api/v1/manager/communications/kpis` | `data.totalSent` | No | Yes |
| KPI: WhatsApp sent | `whatsappSent` | `/api/v1/manager/communications/kpis` | `data.whatsappSent` | No | Yes |
| KPI: Email sent | `emailSent` | `/api/v1/manager/communications/kpis` | `data.emailSent` | No | Yes |
| KPI: Campaigns this month | `campaignsThisMonth` | `/api/v1/manager/communications/kpis` | `data.campaignsThisMonth` | No | Yes |
| History: Title | `title` | `/api/v1/manager/communications/campaigns` | `data.campaigns[].title` | No | Yes |
| History: Channel | `channel` | `/api/v1/manager/communications/campaigns` | `data.campaigns[].channel` | No | Yes |
| History: Segment | `segmentLabel` | `/api/v1/manager/communications/campaigns` | `data.campaigns[].segmentLabel` | No | Yes |
| History: Sent count | `sentCount` | `/api/v1/manager/communications/campaigns` | `data.campaigns[].sentCount` | No | Yes |
| History: Status | `status` | `/api/v1/manager/communications/campaigns` | `data.campaigns[].status` | No | Yes |
| Churn: Member name | `name` | `/api/v1/manager/communications/churned-members` | `data[].name` | No | Yes |
| Churn: Plan | `plan` | `/api/v1/manager/communications/churned-members` | `data[].plan` | No | Yes |
| Churn: Exit date | `exitDate` | `/api/v1/manager/communications/churned-members` | `data[].exitDate` | No | Yes |
| Churn: Recovery | `recovered` | `/api/v1/manager/communications/churned-members` | `data[].recovered` | No | Yes |
| Churn KPI: Recovery rate | `recoveryRate` | `/api/v1/manager/communications/churn-kpis` | `data.recoveryRate` | No | Yes |

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
**Forbidden-pattern contract:** See `manager_communications_forbidden.md` for the module-specific forbidden patterns; that file is the canonical AI repair safety reference.

- **Never place live recipient/campaign records in constants; those belong to module fixtures:** Never place live recipient/campaign records in constants; those belong to module fixtures.
- **Recipient phone numbers are sensitive and should remain masked outside the composer context:** Recipient phone numbers are sensitive and should remain masked outside the composer context.
- **A campaign mutation must use the backend response message and reconcile the campaign list rather than inventing success copy:** A campaign mutation must use the backend response message and reconcile the campaign list rather than inventing success copy.
- **Automation updates must remain module-scoped; do not move automation business rules into global infrastructure:** Automation updates must remain module-scoped; do not move automation business rules into global infrastructure.
- **Churn recovery must preserve the selected member/template context while a send request is pending:** Churn recovery must preserve the selected member/template context while a send request is pending.
- **Do not allow both WhatsApp and Email to be selected when the UI contract requires a single medium choice:** Do not allow both WhatsApp and Email to be selected when the UI contract requires a single medium choice.

## Component Responsibility Map
| Component File | Responsibility |
|---|---|
| `manager_communications/manager_communications_components/manager_communications_churn_recovery/ManagerCommunicationsChurnRecoveryComposer.tsx` | Slide-in drawer composer for sending win-back messages to a single churned member. |
| `manager_communications/manager_communications_components/manager_communications_churn_recovery/ManagerCommunicationsChurnRecoveryEmptyState.tsx` | Empty state shown when no churned members exist — positive framing with a motivational message. |
| `manager_communications/manager_communications_components/manager_communications_churn_recovery/ManagerCommunicationsChurnRecoveryKPIs.tsx` | 4 KPI stat cards for the Churn Recovery tab — Total Churned, Churned This Month, Recovery Rate, Avg Days Since Exit. |
| `manager_communications/manager_communications_components/manager_communications_churn_recovery/ManagerCommunicationsChurnRecoveryTab.tsx` | Root orchestrator for the Churn Recovery / Win-Back tab. Renders KPIs, table, and composer drawer. No direct API calls. |
| `manager_communications/manager_communications_components/manager_communications_churn_recovery/ManagerCommunicationsChurnRecoveryTable.tsx` | Paginated, searchable, filterable table of churned/exited members in the Churn Recovery tab. |
| `manager_communications/manager_communications_components/manager_communications_churn_recovery/ManagerCommunicationsChurnRecoveryTableRow.tsx` | Single churned member row in the churn recovery table. Receives member data and callbacks via props. No API calls. |
| `manager_communications/manager_communications_components/manager_communications_automations/ManagerCommunicationsAutomations.tsx` | Renders the Automations tab in Communications, allowing managers to enable/disable and configure automated background triggers like Birthday and Anniversary messages. |
| `manager_communications/manager_communications_components/manager_communications_composer/ManagerCommunicationsComposer.tsx` | Full campaign composer. RHF owns draft state; the communications logic hook owns server data and mutation orchestration. |
| `manager_communications/manager_communications_components/manager_communications_history/ManagerCommunicationsHistory.tsx` | Paginated history table of past communication campaigns with search and channel filter. |
| `manager_communications/manager_communications_components/manager_communications_kpis/ManagerCommunicationsKPIs.tsx` | KPI stat cards for the Communications module — total sent, WhatsApp, Email, campaigns this month. |
| `manager_communications/manager_communications_components/manager_communications_main/ManagerCommunicationsMain.tsx` | Root client orchestrator for the Communications module — renders KPIs, tab switcher, and conditionally Composer, History, Automations, or Churn Recovery. |
| `manager_communications/manager_communications_components/manager_communications_segment_picker/ManagerCommunicationsSegmentPicker.tsx` | Segment picker — shows all audience segments as selectable cards with description and live recipient count. |
| `manager_communications_components/manager_communications_bulk_message_modal/ManagerCommunicationsBulkMessageModal.tsx` | Renders the Communications Bulk Message Modal interaction surface and delegates validation and mutation state to module-owned form/logic hooks. |

## Rule Compliance Checklist
- [x] Module-owned API, types/schemas, fixtures, handlers, tests, and feature documentation are scoped to this module.
- [x] API calls use the module API client and typed response contracts.
- [x] Server-backed pagination/filter/search follows explicit parameter propagation where applicable.
- [x] UI Data Requirements map displayed values to concrete endpoints and response paths.
- [x] Module-owned MSW fixtures/handlers remain the frontend-first server substitute.
- [x] Raw `any`, relative imports, barrel files, and hardcoded localhost mock origins are absent from audited Manager source.
- [ ] Host-repository CI/tooling, dependency/SCA/secret gates, CODEOWNERS, branch protection, and production build require root-repository verification.

## Internationalization
- Namespace: `MANAGER_COMMUNICATIONS`
- Active locales: `en`, `hi`
- English catalog: `manager_communications/manager_communications_locales/manager_communications_en.json`
- Hindi catalog: `manager_communications/manager_communications_locales/manager_communications_hi.json`
- Client UI strings use `next-intl` `useTranslations()`; route-boundary/server UI uses `getTranslations()`.
- Host application must provide the `next-intl` provider, locale negotiation, and build-time locale merge described in `INTEGRATION_GUIDE.md`.


## v4 Repair Verification Scope — 2026-10-02
- The module was re-audited against the complete supplied architecture, UI/UX, and repair specifications.
- Business Feature Dependencies and Role-Level Business Dependencies are explicitly recorded above.
- Runtime host-toolchain gates (production build, live typecheck, lint, browser execution, dependency/SCA/secret scans, and CODEOWNERS) remain host-repository verification items because those root configuration files were not supplied with the target ZIP.

## AI Repair / Discovery Index

- Primary orchestration: `ManagerCommunicationsMain.tsx`
- Primary query-key registry: `ManagerCommunicationsQueryKeys.ts`
- Primary module constants registry: `ManagerCommunicationsConstants.ts`
- Canonical schema file: `ManagerCommunicationsSchema.ts` in `manager_communications_schemas/`
- Module theme contract: `manager_communications_theme_contract.md`


## V9 Audit Synchronization — 2026-10-02

This section is generated from the repaired source tree. It is authoritative for current file ownership and AI discovery; it does not claim host-repository runtime verification when the host configuration is outside the supplied ZIP.

| Canonical discovery artifact | Current path | Present |
|---|---|---|
| Main | `manager_communications_components/manager_communications_main/ManagerCommunicationsMain.tsx` | YES |
| API client | `ManagerCommunicationsApi.ts` | YES |
| Schema file | `ManagerCommunicationsSchema.ts` | YES |
| Query-key registry | `ManagerCommunicationsQueryKeys.ts` | YES |
| Constants registry | `ManagerCommunicationsConstants.ts` | YES |
| URL config | `manager_communications_url_config.ts` | YES |
| Behavior test | `ManagerCommunicationsBehavior.test.tsx` | YES |
| Repair map | `stage_2_frontend_audit.md` in the delivery root | YES |
| Theme contract | `manager_communications_theme_contract.md` | YES |

### Current module boundary

- Business code is owned by `manager_communications/`; sibling business modules are not required for normal repair.
- Mock fixtures and handlers live under `manager_communications/manager_communications_mocks/manager_communications_mocks_fixtures/` and `manager_communications/manager_communications_mocks/manager_communications_mocks_handlers/`.
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
