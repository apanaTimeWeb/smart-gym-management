# Manager Referrals — Feature Map

## Module Purpose
Manager Referrals is the branch referral tracking workspace. Managers can inspect referral KPIs, browse and filter referral records, create a referral, and claim an eligible reward. Referral records and reward state are API data owned by this module, with sensitive referee phone data masked in the list. Reward claims are financial/critical and require confirmation.

## Directory Structure
| Folder | Responsibility | Key Files |
|---|---|---|
| `referrals_api/` | Feature-owned responsibility for the referrals module. | `ManagerReferralsApi.ts` |
| `referrals_components/` | Feature-owned responsibility for the referrals module. | `—` |
| `referrals_context/` | Feature-owned responsibility for the referrals module. | `ManagerUseManagerReferralsLogic.ts` |
| `referrals_fixtures/` | Feature-owned responsibility for the referrals module. | `ManagerReferralsMockData.ts` |
| `referrals_mocks/` | Feature-owned responsibility for the referrals module. | `—` |
| `referrals_store/` | Feature-owned responsibility for the referrals module. | `ManagerUseManagerReferralsStore.ts` |
| `referrals_types/` | Feature-owned responsibility for the referrals module. | `ManagerReferralsSchema.ts; ManagerReferralsTypes.ts` |
| `referrals_utils/` | Feature-owned responsibility for the referrals module. | `ManagerReferralsConstants.ts; ManagerReferralsFormSchema.ts` |

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

## Data and State Architecture
TanStack Query owns referrals server/API data. UI-only filters, tabs, selections, and draft state remain local state or module-scoped Zustand where shared. React Context is limited to stable cross-tree concerns and does not become the source of truth for API data. Query keys are module-prefixed.

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
- **Reward claims are critical/financial and require double verification:** Reward claims are critical/financial and require double verification.
- **Referee phone must remain masked in list views:** Referee phone must remain masked in list views.
- **Reward amount must use centralized currency formatting:** Reward amount must use centralized currency formatting.
- **Referral fixtures must stay inside the referrals module; do not reuse inquiry fixtures:** Referral fixtures must stay inside the referrals module; do not reuse inquiry fixtures.
- **Claim success must reconcile the referral row and KPI state from the authoritative response:** Claim success must reconcile the referral row and KPI state from the authoritative response.

## Component Responsibility Map
| Component File | Responsibility |
|---|---|
| `referrals/referrals_components/ManagerReferralsMain/ManagerReferralsAddModal.tsx` | RHF + Zod form for manually creating a referral. |
| `referrals/referrals_components/ManagerReferralsMain/ManagerReferralsKPIs.tsx` | Display 4 key referral stats using ManagerStatCard. |
| `referrals/referrals_components/ManagerReferralsMain/ManagerReferralsMain.tsx` | Root client orchestrator for Referrals. |
| `referrals/referrals_components/ManagerReferralsMain/ManagerReferralsTable.tsx` | Display referrals table with claim reward action. |

## Rule Compliance Checklist
- [x] Module-owned API, types/schemas, fixtures, handlers, tests, and feature documentation are scoped to this module.
- [x] API calls use the module API client and typed response contracts.
- [x] Server-backed pagination/filter/search follows explicit parameter propagation where applicable.
- [x] UI Data Requirements map displayed values to concrete endpoints and response paths.
- [x] Module-owned MSW fixtures/handlers remain the frontend-first server substitute.
- [x] Raw `any`, relative imports, barrel files, and hardcoded localhost mock origins are absent from audited Manager source.
- [ ] Host-repository CI/tooling, dependency/SCA/secret gates, CODEOWNERS, branch protection, and production build require root-repository verification.
