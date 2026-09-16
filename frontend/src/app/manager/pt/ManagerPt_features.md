# Manager PT — Feature Map

## Module Purpose
Manager PT provides branch-level oversight of trainer workload, assignments, packages, and session completion. Managers can assign trainers and monitor delivery but do not execute trainer-only session workflows.
## Directory Structure

| Folder | Responsibility | Key Files |
|---|---|---|
| `pt_components/ManagerPtMain/` | Root client components for PT management | `ManagerPtMain.tsx`, `ManagerPtKPIs.tsx`, `ManagerPtTrainerWorkload.tsx`, `ManagerPtExpiringSoon.tsx`, `ManagerPtAssignmentsTable.tsx` |
| `pt_api/` | API calls for PT KPIs, workload, packages, and assignments | `ManagerPtApi.ts` |
| `pt_types/` | TypeScript interfaces for PT entities and state | `ManagerPtTypes.ts` |
| `pt_context/` | Logic hook for fetching data and managing tab state | `ManagerUseManagerPtLogic.ts` |
| `pt_utils/` | Centralized constants including mock data | `ManagerPtSharedConstants.ts`, `ManagerPtConstants.ts` |

## Feature Inventory

| Feature | Route | What the User Can Do | Key Components | Main API Calls | Status |
|---|---|---|---|---|---|
| Dashboard KPIs | `/manager/pt` | View top-level stats (Active PTs, Sessions Today, Revenue) | `ManagerPtKPIs` | `GET /manager/pt/dashboard-kpis` (mocked) | ✅ Live |
| Trainer Workload | `/manager/pt` | Monitor active clients and rating per trainer | `ManagerPtTrainerWorkload` | `GET /manager/pt/workload` (mocked) | ✅ Live |
| Expiring Packages | `/manager/pt` | See packages with < 3 sessions left for renewals | `ManagerPtExpiringSoon` | Calculated via assignments | ✅ Live |
| Active Assignments | `/manager/pt` | Track session progress and manually mark sessions | `ManagerPtAssignmentsTable` | `GET /manager/pt/assignments` | ✅ Live |
| PT Packages | `/manager/pt` | Browse available PT packages and pricing | `ManagerPtMain` | `GET /manager/pt/packages` | ✅ Live |

## Edge Cases and AI Warnings
- **No cross-role imports** — Zero imports from `/admin`, `/trainer`, or `/superadmin`.
- **Managers cannot conduct PT sessions** — They assign and oversee. Never add a "Start Session" button for managers. (They can only "Mark Session" as a fallback).
- **Expiring Logic** — A package is considered "expiring soon" if `(totalSessions - completedSessions) <= 3`.

## Rule Compliance Checklist
- [x] Rule 1: Micro-modularization (Components broken down into `ManagerPtKPIs`, `ManagerPtTrainerWorkload`, etc.)
- [x] Rule 8: page.tsx = Server Component
- [x] Rule 9: `loading.tsx` and `error.tsx` present
- [x] Rule 11: `Manager_url_config.ts` present
- [x] Rule 2: Zero cross-role imports
- [x] Rule 38: No generic `Props` exported


## User Flows & Interactions
1. Open the `pt` route and load the feature Query state.
2. Use the visible filters/tabs or action controls to choose a workflow.
3. Submit through the owning Manager form/query/mutation layer.
4. On success, consume the backend response message and reconcile the relevant TanStack Query cache; on failure, preserve user-entered data and show the backend error message.


## API Contract
| API file | Functions | Endpoints |
|---|---|---|
| `ManagerPtApi.ts` | `createAssignment`, `fetchAssignments`, `fetchDashboardKpis`, `fetchPackages`, `fetchWorkload`, `markSessionComplete` | See URL config expressions |


## UI Data Requirements
| UI/API field | Source |
|---|---|
| `activeClients` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `amountPaid` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `assignmentId` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `completedSessions` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `description` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `durationDays` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `durationMinutes` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `endDate` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `id` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `location` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `memberFeedback` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `memberId` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `memberName` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `monthlyPtRevenue` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `name` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `nextSessionDate` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `packageId` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `packageName` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `packagesExpiringSoon` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `paymentStatus` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `price` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `rating` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `sessionCount` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `sessionDate` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `sessionNumber` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `sessionsRemaining` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `sessionsScheduledToday` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `startDate` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `status` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `totalActiveAssignments` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `totalAmount` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `totalSessions` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `totalSessionsConducted` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `trainerId` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `trainerName` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |
| `trainerNotes` | Manager feature type/schema and the corresponding API response field; confirm exact response path in the consuming component before backend contract changes. |


## Permissions and Security
- **Required role:** `MANAGER` for `/manager/pt`.
- **UI boundary:** `ManagerPermissionGate` enforces the Manager workspace capability before rendering the module shell.
- **Cross-role isolation:** feature code must not import business artifacts from Admin, Superadmin, Trainer, or another Manager feature; module infrastructure is the documented exception.
- **Sensitive mutations:** destructive/financial actions use the Manager confirmation flow before mutation.


## Component Responsibility Map
| Component | Responsibility |
|---|---|
| `pt_components/ManagerPtMain/ManagerPtAssignmentForm.tsx` | Renders the `pt`-specific user interface section represented by this file; API access remains in the feature query/mutation layer. |
| `pt_components/ManagerPtMain/ManagerPtAssignmentsTable.tsx` | Renders the `pt`-specific user interface section represented by this file; API access remains in the feature query/mutation layer. |
| `pt_components/ManagerPtMain/ManagerPtExpiringSoon.tsx` | Renders the `pt`-specific user interface section represented by this file; API access remains in the feature query/mutation layer. |
| `pt_components/ManagerPtMain/ManagerPtKPIs.tsx` | Renders the `pt`-specific user interface section represented by this file; API access remains in the feature query/mutation layer. |
| `pt_components/ManagerPtMain/ManagerPtMain.tsx` | Renders the `pt`-specific user interface section represented by this file; API access remains in the feature query/mutation layer. |
| `pt_components/ManagerPtMain/ManagerPtTrainerWorkload.tsx` | Renders the `pt`-specific user interface section represented by this file; API access remains in the feature query/mutation layer. |
