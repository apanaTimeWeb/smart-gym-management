# Manager Referrals — Feature Map

## Module Purpose
Manager Referrals tracks member referrals from creation through joining and reward claiming. Search, status filtering, and pagination are server-backed, and reward mutations reconcile the TanStack Query cache.
## Directory Structure
| Folder | Responsibility |
|---|---|
| `referrals_components/ManagerReferralsMain/` | View layer and add-referral modal |
| `referrals_api/` | API boundary |
| `referrals_context/` | TanStack Query/mutation orchestration |
| `referrals_store/` | UI-only filter/pagination/modal state |
| `referrals_types/` | Referral DTOs and runtime schemas |
| `referrals_utils/` | Form validation helpers |
| `referrals_fixtures/` | MSW referral records |

## Feature Inventory
| Feature | Main API |
|---|---|
| KPI Overview | `GET /manager/referrals/kpis` |
| View Referrals | `GET /manager/referrals` |
| Log Referral | `POST /manager/referrals` |
| Claim Reward | `POST /manager/referrals/:id/claim` |

## Data and State Architecture
TanStack Query owns referral/KPI responses. Zustand owns only list controls and modal visibility. `ManagerReferralsAddModal` uses React Hook Form + Zod for its four-field form, with unsaved-change protection.

## Edge Cases / AI Warnings
- Failed submissions preserve form values.
- Claim actions reconcile the query cache after success.
- Reward and referral records are never hardcoded in component JSX.


## User Flows & Interactions
1. Open the `referrals` route and load the feature Query state.
2. Use the visible filters/tabs or action controls to choose a workflow.
3. Submit through the owning Manager form/query/mutation layer.
4. On success, consume the backend response message and reconcile the relevant TanStack Query cache; on failure, preserve user-entered data and show the backend error message.


## API Contract
| API file | Functions | Endpoints |
|---|---|---|
| `ManagerReferralsApi.ts` | `claimReward`, `createReferral`, `fetchKPIs`, `fetchReferrals` | See URL config expressions |


## UI Data Requirements
| UI/API field | Source |
|---|---|
| `claimedRewards` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `conversionDate` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `conversionRate` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `dateReferred` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `id` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `pendingRewards` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `planJoined` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `refereeName` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `refereePhone` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `referrerId` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `referrerName` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `rewardAmount` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `rewardExpiryDate` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `rewardStatus` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `rewardType` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `status` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `totalConverted` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `totalReferrals` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `totalRewardsPaidOut` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |


## Permissions and Security
- **Required role:** `MANAGER` for `/manager/referrals`.
- **UI boundary:** `ManagerPermissionGate` enforces the Manager workspace capability before rendering the module shell.
- **Cross-role isolation:** feature code must not import business artifacts from Admin, Superadmin, Trainer, or another Manager feature; module infrastructure is the documented exception.
- **Sensitive mutations:** destructive/financial actions use the Manager confirmation flow before mutation.


## Component Responsibility Map
| Component | Responsibility |
|---|---|
| `referrals_components/ManagerReferralsMain/ManagerReferralsAddModal.tsx` | Renders the `referrals`-specific user interface section represented by this file; API access remains in the feature query/mutation layer. |
| `referrals_components/ManagerReferralsMain/ManagerReferralsKPIs.tsx` | Renders the `referrals`-specific user interface section represented by this file; API access remains in the feature query/mutation layer. |
| `referrals_components/ManagerReferralsMain/ManagerReferralsMain.tsx` | Renders the `referrals`-specific user interface section represented by this file; API access remains in the feature query/mutation layer. |
| `referrals_components/ManagerReferralsMain/ManagerReferralsTable.tsx` | Renders the `referrals`-specific user interface section represented by this file; API access remains in the feature query/mutation layer. |
