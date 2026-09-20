# Manager Communications — Feature Map

## Module Purpose
Manager Communications is the tenant-scoped outbound messaging workspace. Managers can review campaign history, see communication KPIs, choose recipient segments, send WhatsApp or Email campaigns, manage scheduled automations, and run churn-recovery outreach. The module owns its message/campaign data, query state, forms, fixtures, and MSW handlers. It does not own member master-data business logic or billing workflows.

## Directory Structure
| Folder | Responsibility | Key Files |
|---|---|---|
| `communications_api/` | Feature-owned responsibility for the communications module. | `ManagerCommunicationsApi.ts` |
| `communications_components/` | Feature-owned responsibility for the communications module. | `—` |
| `communications_hooks/` | Feature-owned responsibility for the communications module. | `ManagerUseManagerChurnRecoveryLogic.ts; ManagerUseManagerChurnRecoveryMutations.ts; ManagerUseManagerChurnRecoveryQueries.ts; ManagerUseManagerCommunicationsLogic.ts; ManagerUseManagerCommunicationsMutations.ts; ManagerUseManagerCommunicationsQueries.ts` |
| `communications_fixtures/` | Feature-owned responsibility for the communications module. | `ManagerCommunicationsMockData.ts` |
| `communications_mocks/` | Feature-owned responsibility for the communications module. | `—` |
| `communications_store/` | Feature-owned responsibility for the communications module. | `ManagerUseManagerCommunicationsStore.ts` |
| `communications_types/` | Feature-owned responsibility for the communications module. | `ManagerCommunicationsSchema.ts; ManagerCommunications_types.ts` |
| `communications_utils/` | Feature-owned responsibility for the communications module. | `ManagerCommunicationsSharedConstants.ts` |

## Approved External Dependencies

- Global framework/application infrastructure documented by the architecture standard may be used when required.
- Approved zero-business UI primitives may be imported from Manager application infrastructure.
- Sibling feature business logic, state, API services, fixtures, and tests are not dependencies.

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

## Data and State Architecture
TanStack Query owns communications server/API data. URL query parameters are the source of truth for searchable/filterable/paginated state and active history tab state. Zustand is limited to transient composer/selections UI state; it never owns API data or URL-backed filters. Query keys are module-prefixed.

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
- **Never place live recipient/campaign records in constants; those belong to module fixtures:** Never place live recipient/campaign records in constants; those belong to module fixtures.
- **Recipient phone numbers are sensitive and should remain masked outside the composer context:** Recipient phone numbers are sensitive and should remain masked outside the composer context.
- **A campaign mutation must use the backend response message and reconcile the campaign list rather than inventing success copy:** A campaign mutation must use the backend response message and reconcile the campaign list rather than inventing success copy.
- **Automation updates must remain module-scoped; do not move automation business rules into global infrastructure:** Automation updates must remain module-scoped; do not move automation business rules into global infrastructure.
- **Churn recovery must preserve the selected member/template context while a send request is pending:** Churn recovery must preserve the selected member/template context while a send request is pending.
- **Do not allow both WhatsApp and Email to be selected when the UI contract requires a single medium choice:** Do not allow both WhatsApp and Email to be selected when the UI contract requires a single medium choice.

## Component Responsibility Map
| Component File | Responsibility |
|---|---|
| `communications/communications_components/ManagerChurnRecovery/ManagerChurnRecoveryComposer.tsx` | Slide-in drawer composer for sending win-back messages to a single churned member. |
| `communications/communications_components/ManagerChurnRecovery/ManagerChurnRecoveryEmptyState.tsx` | Empty state shown when no churned members exist — positive framing with a motivational message. |
| `communications/communications_components/ManagerChurnRecovery/ManagerChurnRecoveryKPIs.tsx` | 4 KPI stat cards for the Churn Recovery tab — Total Churned, Churned This Month, Recovery Rate, Avg Days Since Exit. |
| `communications/communications_components/ManagerChurnRecovery/ManagerChurnRecoveryTab.tsx` | Root orchestrator for the Churn Recovery / Win-Back tab. Renders KPIs, table, and composer drawer. No direct API calls. |
| `communications/communications_components/ManagerChurnRecovery/ManagerChurnRecoveryTable.tsx` | Paginated, searchable, filterable table of churned/exited members in the Churn Recovery tab. |
| `communications/communications_components/ManagerChurnRecovery/ManagerChurnRecoveryTableRow.tsx` | Single churned member row in the churn recovery table. Receives member data and callbacks via props. No API calls. |
| `communications/communications_components/ManagerCommunicationsAutomations/ManagerCommunicationsAutomations.tsx` | Renders the Automations tab in Communications, allowing managers to enable/disable and configure automated background triggers like Birthday and Anniversary messages. |
| `communications/communications_components/ManagerCommunicationsComposer/ManagerCommunicationsComposer.tsx` | Full campaign composer. RHF owns draft state; the communications logic hook owns server data and mutation orchestration. |
| `communications/communications_components/ManagerCommunicationsHistory/ManagerCommunicationsHistory.tsx` | Paginated history table of past communication campaigns with search and channel filter. |
| `communications/communications_components/ManagerCommunicationsKPIs/ManagerCommunicationsKPIs.tsx` | KPI stat cards for the Communications module — total sent, WhatsApp, Email, campaigns this month. |
| `communications/communications_components/ManagerCommunicationsMain/ManagerCommunicationsMain.tsx` | Root client orchestrator for the Communications module — renders KPIs, tab switcher, and conditionally Composer, History, Automations, or Churn Recovery. |
| `communications/communications_components/ManagerCommunicationsSegmentPicker/ManagerCommunicationsSegmentPicker.tsx` | Segment picker — shows all audience segments as selectable cards with description and live recipient count. |

## Rule Compliance Checklist
- [x] Module-owned API, types/schemas, fixtures, handlers, tests, and feature documentation are scoped to this module.
- [x] API calls use the module API client and typed response contracts.
- [x] Server-backed pagination/filter/search follows explicit parameter propagation where applicable.
- [x] UI Data Requirements map displayed values to concrete endpoints and response paths.
- [x] Module-owned MSW fixtures/handlers remain the frontend-first server substitute.
- [x] Raw `any`, relative imports, barrel files, and hardcoded localhost mock origins are absent from audited Manager source.
- [ ] Host-repository CI/tooling, dependency/SCA/secret gates, CODEOWNERS, branch protection, and production build require root-repository verification.
