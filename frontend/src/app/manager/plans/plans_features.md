# Manager Plans — Feature Map

## Module Purpose
Manager Plans is the membership plan administration workspace. Managers can browse plans, create/update/delete plans, review membership overview metrics, and request or perform membership lifecycle actions such as activate, renew, and freeze. Plan and membership data remains server state owned by this module. Financial or destructive lifecycle changes must use the confirmation flow and authoritative responses.

## Directory Structure
| Folder | Responsibility | Key Files |
|---|---|---|
| `plans_api/` | Feature-owned responsibility for the plans module. | `ManagerPlansApi.ts; ManagerPlansChangeRequestApi.ts; ManagerPlansMembershipApi.ts; ManagerPlansServerApi.ts; ManagerUseManagerPlansMembershipMutations.ts; ManagerUseManagerPlansMembershipQueries.ts; ManagerUseManagerPlansQueries.ts` |
| `plans_components/` | Feature-owned responsibility for the plans module. | `—` |
| `plans_hooks/` | Feature-owned responsibility for the plans module. | `ManagerUseManagerPlansLogic.ts` |
| `plans_fixtures/` | Feature-owned responsibility for the plans module. | `ManagerPlansMembershipMockData.ts; ManagerPlansMockData.ts` |
| `plans_mocks/` | Feature-owned responsibility for the plans module. | `—` |
| `plans_types/` | Feature-owned responsibility for the plans module. | `ManagerPlansChangeRequestSchema.ts; ManagerPlansChangeRequestTypes.ts; ManagerPlansMembershipSchema.ts; ManagerPlansMembershipTypes.ts; ManagerPlansSchema.ts; ManagerPlansTypes.ts` |
| `plans_utils/` | Feature-owned responsibility for the plans module. | `ManagerPlansMembershipSchemas.ts; ManagerPlansSharedConstants.ts` |

## Approved External Dependencies

- Global framework/application infrastructure documented by the architecture standard may be used when required.
- Approved zero-business UI primitives may be imported from Manager application infrastructure.
- Sibling feature business logic, state, API services, fixtures, and tests are not dependencies.

## Feature Inventory
| Feature | Route | What the User Can Do | Main API Calls | Status |
|---|---|---|---|---|
| fetchPlans | `/manager/plans` | Uses the fetchPlans workflow with typed request/response handling. | `GET /manager/plans` | ✅ Implemented |
| fetchPlanById | `/manager/plans` | Uses the fetchPlanById workflow with typed request/response handling. | `GET /manager/plans/:id` | ✅ Implemented |
| createPlan | `/manager/plans` | Uses the createPlan workflow with typed request/response handling. | `POST /manager/plans` | ✅ Implemented |
| updatePlan | `/manager/plans` | Uses the updatePlan workflow with typed request/response handling. | `PATCH /manager/plans/:id` | ✅ Implemented |
| deletePlan | `/manager/plans` | Uses the deletePlan workflow with typed request/response handling. | `DELETE /manager/plans/:id` | ✅ Implemented |
| createChangeRequest | `/manager/plans` | Uses the createChangeRequest workflow with typed request/response handling. | `POST /manager/plans/change-requests` | ✅ Implemented |
| fetchMembershipOverview | `/manager/plans` | Uses the fetchMembershipOverview workflow with typed request/response handling. | `GET /manager/plans/membership-overview` | ✅ Implemented |
| activateMembership | `/manager/plans` | Uses the activateMembership workflow with typed request/response handling. | `POST /manager/plans/membership-activate` | ✅ Implemented |
| renewMembership | `/manager/plans` | Uses the renewMembership workflow with typed request/response handling. | `POST /manager/plans/membership-renew` | ✅ Implemented |
| freezeMembership | `/manager/plans` | Uses the freezeMembership workflow with typed request/response handling. | `POST /manager/plans/membership-freeze` | ✅ Implemented |

## User Flows & Interactions
### Flow 1: Manage plans
1. Manager opens the plan grid and loads the paginated plan list.
2. Create/edit actions validate through the module form/schema.
3. CRUD mutations send the request and reconcile the plan cache from the backend response.
### Flow 2: Process membership action
1. Manager opens a member-plan context and selects activate/renew/freeze or change-request.
2. The dedicated membership API sends the typed payload.
3. The backend response and message drive the UI; no optimistic destructive update is used.

## Data and State Architecture
TanStack Query owns plans server/API data. UI-only filters, tabs, selections, and draft state remain local state or module-scoped Zustand where shared. module-local state/query layer is limited to stable cross-tree concerns and does not become the source of truth for API data. Query keys are module-prefixed.

## API Contract
| Function | Method | Endpoint | Request | Response `data` type |
|---|---|---|---|---|
| `fetchPlans` | `GET` | `/api/v1/manager/plans` | `{ page?, limit?, search?, status? }` | `{ plans: Plan[]; total: number }` |
| `fetchPlanById` | `GET` | `/api/v1/manager/plans/:id` | `{ id: string }` | `Plan` |
| `createPlan` | `POST` | `/api/v1/manager/plans` | `Partial<Plan>` | `Plan` |
| `updatePlan` | `PATCH` | `/api/v1/manager/plans/:id` | `{ id: string; body: Partial<Plan> }` | `Plan` |
| `deletePlan` | `DELETE` | `/api/v1/manager/plans/:id` | `{ id: string }` | `{ id: string }` |
| `createChangeRequest` | `POST` | `/api/v1/manager/plans/change-requests` | `ManagerPlansChangeRequestPayload` | `ManagerPlansChangeRequestResponse` |
| `fetchMembershipOverview` | `GET` | `/api/v1/manager/plans/membership-overview` | `—` | `ManagerPlansMembershipOverview` |
| `activateMembership` | `POST` | `/api/v1/manager/plans/membership-activate` | `ManagerPlansActivatePayload` | `Record<string, never>` |
| `renewMembership` | `POST` | `/api/v1/manager/plans/membership-renew` | `ManagerPlansRenewPayload` | `Record<string, never>` |
| `freezeMembership` | `POST` | `/api/v1/manager/plans/membership-freeze` | `ManagerPlansFreezePayload` | `Record<string, never>` |

## UI Data Requirements
| UI Element | Required Field(s) | API Endpoint | Response Path | Nullable? | Mocked? |
|---|---|---|---|---|---|
| Plan: Name | `name` | `/api/v1/manager/plans` | `data.plans[].name` | No | Yes |
| Plan: Duration | `duration` | `/api/v1/manager/plans` | `data.plans[].duration` | No | Yes |
| Plan: Price | `price` | `/api/v1/manager/plans` | `data.plans[].price` | No | Yes |
| Plan: Active | `isActive` | `/api/v1/manager/plans` | `data.plans[].isActive` | No | Yes |
| Membership overview: Active count | `activeCount` | `/api/v1/manager/plans/membership-overview` | `data.activeCount` | No | Yes |
| Membership overview: Revenue | `revenue` | `/api/v1/manager/plans/membership-overview` | `data.revenue` | No | Yes |

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
- **Plan delete is destructive and must be confirmed:** Plan delete is destructive and must be confirmed.
- **Activate/renew/freeze are domain mutations; do not collapse them into a generic `updatePlan` call:** Activate/renew/freeze are domain mutations; do not collapse them into a generic `updatePlan` call.
- **Plan prices and membership revenue must use centralized currency formatting:** Plan prices and membership revenue must use centralized currency formatting.
- **Membership overview data must come from its dedicated endpoint, not the plan-list response:** Membership overview data must come from its dedicated endpoint, not the plan-list response.
- **The UI must consume backend response messages after lifecycle mutations:** The UI must consume backend response messages after lifecycle mutations.
- **Do not move plan business rules into global UI primitives:** Do not move plan business rules into global UI primitives.

## Component Responsibility Map
| Component File | Responsibility |
|---|---|
| `plans/plans_components/ManagerPlansMain/ManagerPlanCard.tsx` | Pure display component rendering a single membership plan. |
| `plans/plans_components/ManagerPlansMain/ManagerPlansGrid.tsx` | Renders the grid of plans or loading/empty states. |
| `plans/plans_components/ManagerPlansMain/ManagerPlansMain.tsx` | Framework entry component for the Plans module; delegates feature behavior and UI composition to `ManagerPlansContent`. |
| `plans/plans_components/ManagerPlansMain/ManagerPlansRequestChangeModal.tsx` | Renders the modal to request a change to a plan. |
| `plans/plans_components/ManagerPlansMain/ManagerPlansTabs.tsx` | Renders Manager plan tabs, lifecycle forms, and API-backed expiry/renewal views. |
| `plans/plans_components/ManagerPlansMain/ManagerPlansToolbar.tsx` | Renders search and filter controls for the plans list. |
| `plans/plans_hooks/ManagerUseManagerPlansLogic.ts` | module-local state/query layer — bridges TanStack Query plans with UI state (search, filters, modal) synced to URL. |

## Rule Compliance Checklist
- [x] Module-owned API, types/schemas, fixtures, handlers, tests, and feature documentation are scoped to this module.
- [x] API calls use the module API client and typed response contracts.
- [x] Server-backed pagination/filter/search follows explicit parameter propagation where applicable.
- [x] UI Data Requirements map displayed values to concrete endpoints and response paths.
- [x] Module-owned MSW fixtures/handlers remain the frontend-first server substitute.
- [x] Raw `any`, relative imports, barrel files, and hardcoded localhost mock origins are absent from audited Manager source.
- [ ] Host-repository CI/tooling, dependency/SCA/secret gates, CODEOWNERS, branch protection, and production build require root-repository verification.
