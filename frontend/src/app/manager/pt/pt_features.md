# Manager Pt — Feature Map

## Module Purpose
Manager PT is the personal-training operations workspace. Managers can review PT KPIs, trainer workload, package offerings, active assignments, and complete sessions. PT assignment and revenue-related data is server state owned by this module. Financial assignment/payment data must never use unsafe optimistic updates.

## Directory Structure
| Folder | Responsibility | Key Files |
|---|---|---|
| `pt_api/` | Feature-owned responsibility for the pt module. | `ManagerPtApi.ts` |
| `pt_components/` | Feature-owned responsibility for the pt module. | `—` |
| `pt_hooks/` | Feature-owned responsibility for the pt module. | `ManagerUseManagerPtLogic.ts` |
| `pt_fixtures/` | Feature-owned responsibility for the pt module. | `ManagerPtMockData.ts` |
| `pt_mocks/` | Feature-owned responsibility for the pt module. | `—` |
| `pt_types/` | Feature-owned responsibility for the pt module. | `ManagerPtAssignmentSchema.ts; ManagerPtSchema.ts; ManagerPtTypes.ts` |

## Approved External Dependencies

- Global framework/application infrastructure documented by the architecture standard may be used when required.
- Approved zero-business UI primitives may be imported from Manager application infrastructure.
- Sibling feature business logic, state, API services, fixtures, and tests are not dependencies.

## Feature Inventory
| Feature | Route | What the User Can Do | Main API Calls | Status |
|---|---|---|---|---|
| fetchPtDashboardKpis | `/manager/pt` | Uses the fetchPtDashboardKpis workflow with typed request/response handling. | `GET /manager/pt/kpis` | ✅ Implemented |
| fetchWorkload | `/manager/pt` | Uses the fetchWorkload workflow with typed request/response handling. | `GET /manager/pt/workload` | ✅ Implemented |
| fetchPackages | `/manager/pt` | Uses the fetchPackages workflow with typed request/response handling. | `GET /manager/pt/packages` | ✅ Implemented |
| fetchAssignments | `/manager/pt` | Uses the fetchAssignments workflow with typed request/response handling. | `GET /manager/pt/assignments` | ✅ Implemented |
| createAssignment | `/manager/pt` | Uses the createAssignment workflow with typed request/response handling. | `POST /manager/pt/assignments` | ✅ Implemented |
| markSessionComplete | `/manager/pt` | Uses the markSessionComplete workflow with typed request/response handling. | `PATCH /manager/pt/assignments/:assignmentId/complete-session` | ✅ Implemented |

## User Flows & Interactions
### Flow 1: Assign PT package
1. Manager opens the assignment form and selects member, trainer, package and start date.
2. RHF + Zod validates the assignment payload.
3. createAssignment() submits the request.
4. The authoritative assignment response becomes Query cache state.
### Flow 2: Complete PT session
1. Manager selects an active assignment and marks a session complete.
2. markSessionComplete(assignmentId) sends the action.
3. The server response updates the assignment counts and revenue-related display.

## Data and State Architecture
TanStack Query owns pt server/API data. UI-only filters, tabs, selections, and draft state remain local state or module-scoped Zustand where shared. module-local state/query layer is limited to stable cross-tree concerns and does not become the source of truth for API data. Query keys are module-prefixed.

## API Contract
| Function | Method | Endpoint | Request | Response `data` type |
|---|---|---|---|---|
| `fetchPtDashboardKpis` | `GET` | `/api/v1/manager/pt/kpis` | `—` | `PtDashboardKpis` |
| `fetchWorkload` | `GET` | `/api/v1/manager/pt/workload` | `—` | `PtTrainerWorkload[]` |
| `fetchPackages` | `GET` | `/api/v1/manager/pt/packages` | `—` | `PtPackage[]` |
| `fetchAssignments` | `GET` | `/api/v1/manager/pt/assignments` | `{ page?, limit?, search?, trainerId?, status? }` | `PtAssignmentsResponse` |
| `createAssignment` | `POST` | `/api/v1/manager/pt/assignments` | `CreatePtAssignmentPayload` | `PtAssignment` |
| `markSessionComplete` | `PATCH` | `/api/v1/manager/pt/assignments/:assignmentId/complete-session` | `{ assignmentId: string }` | `PtAssignment` |

## UI Data Requirements
| UI Element | Required Field(s) | API Endpoint | Response Path | Nullable? | Mocked? |
|---|---|---|---|---|---|
| KPI: Active assignments | `totalActiveAssignments` | `/api/v1/manager/pt/kpis` | `data.totalActiveAssignments` | No | Yes |
| KPI: Sessions today | `sessionsScheduledToday` | `/api/v1/manager/pt/kpis` | `data.sessionsScheduledToday` | No | Yes |
| KPI: Expiring packages | `packagesExpiringSoon` | `/api/v1/manager/pt/kpis` | `data.packagesExpiringSoon` | No | Yes |
| KPI: PT revenue | `monthlyPtRevenue` | `/api/v1/manager/pt/kpis` | `data.monthlyPtRevenue` | No | Yes |
| Workload: Trainer | `trainerName` | `/api/v1/manager/pt/workload` | `data[].trainerName` | No | Yes |
| Workload: Active clients | `activeClients` | `/api/v1/manager/pt/workload` | `data[].activeClients` | No | Yes |
| Assignment: Member | `memberName` | `/api/v1/manager/pt/assignments` | `data.assignments[].memberName` | No | Yes |
| Assignment: Trainer | `trainerName` | `/api/v1/manager/pt/assignments` | `data.assignments[].trainerName` | No | Yes |
| Assignment: Package | `packageName` | `/api/v1/manager/pt/assignments` | `data.assignments[].packageName` | No | Yes |
| Assignment: Sessions remaining | `sessionsRemaining` | `/api/v1/manager/pt/assignments` | `data.assignments[].sessionsRemaining` | No | Yes |
| Assignment: Payment status | `paymentStatus` | `/api/v1/manager/pt/assignments` | `data.assignments[].paymentStatus` | No | Yes |
| Assignment: Amount paid | `amountPaid` | `/api/v1/manager/pt/assignments` | `data.assignments[].amountPaid` | No | Yes |

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
- **PT revenue values must use formatCurrencyFromMinorUnits:** PT revenue values must use formatCurrencyFromMinorUnits.
- **Assignment completion changes a server-side session count; reconcile with the response:** Assignment completion changes a server-side session count; reconcile with the response.
- **Do not store assignment arrays in Zustand:** Do not store assignment arrays in Zustand.
- **Optional nextSessionDate must render via centralized date formatting/empty fallback:** Optional nextSessionDate must render via centralized date formatting/empty fallback.
- **Trainer workload and assignment list are separate server datasets; do not merge them into one response shape in the UI:** Trainer workload and assignment list are separate server datasets; do not merge them into one response shape in the UI.

## Component Responsibility Map
| Component File | Responsibility |
|---|---|
| `pt/pt_components/ManagerPtMain/ManagerPtAssignmentForm.tsx` | Renders and validates the PT assignment form; submission is delegated to the API mutation callback. |
| `pt/pt_components/ManagerPtMain/ManagerPtAssignmentsTable.tsx` | Data table to track active PT assignments and mark sessions. |
| `pt/pt_components/ManagerPtMain/ManagerPtExpiringSoon.tsx` | Shows a list of members whose PT packages are nearing completion (< 3 sessions left). |
| `pt/pt_components/ManagerPtMain/ManagerPtKPIs.tsx` | Renders the top-level KPI stat cards for the PT Dashboard. |
| `pt/pt_components/ManagerPtMain/ManagerPtMain.tsx` | Root client component for Manager PT page. |
| `pt/pt_components/ManagerPtMain/ManagerPtTrainerWorkload.tsx` | Renders the trainer workload to help managers balance assignment distribution. |

## Rule Compliance Checklist
- [x] Module-owned API, types/schemas, fixtures, handlers, tests, and feature documentation are scoped to this module.
- [x] API calls use the module API client and typed response contracts.
- [x] Server-backed pagination/filter/search follows explicit parameter propagation where applicable.
- [x] UI Data Requirements map displayed values to concrete endpoints and response paths.
- [x] Module-owned MSW fixtures/handlers remain the frontend-first server substitute.
- [x] Raw `any`, relative imports, barrel files, and hardcoded localhost mock origins are absent from audited Manager source.
- [ ] Host-repository CI/tooling, dependency/SCA/secret gates, CODEOWNERS, branch protection, and production build require root-repository verification.
