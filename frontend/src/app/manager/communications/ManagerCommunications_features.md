# Manager Communications — Feature Map

## Module Purpose
Manager communications lets branch managers compose and send member campaigns, choose recipients/mediums, manage automation settings, and run churn-recovery outreach. It is restricted to Manager-owned communications for the current tenant.
## Directory Structure
| Folder | Responsibility | Key Files |
|---|---|---|
| `communications_components/ManagerCommunicationsComposer/` | RHF + Zod compose UI | `ManagerCommunicationsComposer.tsx` |
| `communications_context/` | Query/mutation orchestration | `ManagerUseManagerCommunicationsLogic.ts` |
| `communications_store/` | UI-only tab/filter/pagination state | `ManagerUseManagerCommunicationsStore.ts` |
| `communications_fixtures/` | Module-owned MSW records and static message templates | `ManagerCommunicationsMockData.ts` |
| `communications_api/` | API boundary | `ManagerCommunicationsApi.ts` |
| `communications_types/` | DTOs and Zod schemas | `ManagerCommunicationsSchema.ts` |

## Data and State Architecture
TanStack Query owns campaigns, recipients, KPIs, automations, and churn data. Zustand stores only UI state. Composer fields are local RHF draft state and are not kept in Zustand. Quick templates come from the module fixture layer.

## Loading, Empty, Error States
Independent sections render query loading/empty/error states. Mutation success/error messages display the backend response message.

## Edge Cases / AI Warnings
- Template records belong in `communications_fixtures/`, never inside JSX.
- Preserve failed form input; disable submission while the request is pending.
- Do not store server campaign/recipient data in Zustand.


## User Flows & Interactions
1. Open the `communications` route and load the feature Query state.
2. Use the visible filters/tabs or action controls to choose a workflow.
3. Submit through the owning Manager form/query/mutation layer.
4. On success, consume the backend response message and reconcile the relevant TanStack Query cache; on failure, preserve user-entered data and show the backend error message.


## API Contract
| API file | Functions | Endpoints |
|---|---|---|
| `ManagerCommunicationsApi.ts` | `fetchAutomations`, `fetchCampaigns`, `fetchChurnKPIs`, `fetchChurnedMembers`, `fetchKPIs`, `fetchSegmentRecipients`, `sendCampaign`, `sendWinBackMessage`, `updateAutomation` | See URL config expressions |


## UI Data Requirements
| UI/API field | Source |
|---|---|
| `avgDaysSinceExit` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `body` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `campaignsThisMonth` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `channel` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `churnedThisMonth` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `daysSinceExit` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `deliveredCount` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `description` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `email` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `emailSent` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `enabled` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `exitDate` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `expiryDate` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `failedCount` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `id` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `lastContactedAt` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `lifetimeValue` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `memberId` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `memberName` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `message` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `messageTemplate` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `name` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `openRate` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `pendingAmount` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `phone` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `plan` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `reason` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `recipientCount` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `recovered` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `recoveryRate` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `scheduledAt` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `segment` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `segmentLabel` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `sendTime` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `sentAt` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `sentBy` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `sentCount` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `status` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `subject` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `templateTier` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |


## Permissions and Security
- **Required role:** `MANAGER` for `/manager/communications`.
- **UI boundary:** `ManagerPermissionGate` enforces the Manager workspace capability before rendering the module shell.
- **Cross-role isolation:** feature code must not import business artifacts from Admin, Superadmin, Trainer, or another Manager feature; module infrastructure is the documented exception.
- **Sensitive mutations:** destructive/financial actions use the Manager confirmation flow before mutation.


## Component Responsibility Map
| Component | Responsibility |
|---|---|
| `communications_components/ManagerChurnRecovery/ManagerChurnRecoveryComposer.tsx` | Renders the `communications`-specific user interface section represented by this file; API access remains in the feature query/mutation layer. |
| `communications_components/ManagerChurnRecovery/ManagerChurnRecoveryEmptyState.tsx` | Renders the `communications`-specific user interface section represented by this file; API access remains in the feature query/mutation layer. |
| `communications_components/ManagerChurnRecovery/ManagerChurnRecoveryKPIs.tsx` | Renders the `communications`-specific user interface section represented by this file; API access remains in the feature query/mutation layer. |
| `communications_components/ManagerChurnRecovery/ManagerChurnRecoveryTab.tsx` | Renders the `communications`-specific user interface section represented by this file; API access remains in the feature query/mutation layer. |
| `communications_components/ManagerChurnRecovery/ManagerChurnRecoveryTable.tsx` | Renders the `communications`-specific user interface section represented by this file; API access remains in the feature query/mutation layer. |
| `communications_components/ManagerChurnRecovery/ManagerChurnRecoveryTableRow.tsx` | Renders the `communications`-specific user interface section represented by this file; API access remains in the feature query/mutation layer. |
| `communications_components/ManagerCommunicationsAutomations/ManagerCommunicationsAutomations.tsx` | Renders the `communications`-specific user interface section represented by this file; API access remains in the feature query/mutation layer. |
| `communications_components/ManagerCommunicationsComposer/ManagerCommunicationsComposer.tsx` | Renders the `communications`-specific user interface section represented by this file; API access remains in the feature query/mutation layer. |
| `communications_components/ManagerCommunicationsHistory/ManagerCommunicationsHistory.tsx` | Renders the `communications`-specific user interface section represented by this file; API access remains in the feature query/mutation layer. |
| `communications_components/ManagerCommunicationsKPIs/ManagerCommunicationsKPIs.tsx` | Renders the `communications`-specific user interface section represented by this file; API access remains in the feature query/mutation layer. |
| `communications_components/ManagerCommunicationsMain/ManagerCommunicationsMain.tsx` | Renders the `communications`-specific user interface section represented by this file; API access remains in the feature query/mutation layer. |
| `communications_components/ManagerCommunicationsSegmentPicker/ManagerCommunicationsSegmentPicker.tsx` | Renders the `communications`-specific user interface section represented by this file; API access remains in the feature query/mutation layer. |
