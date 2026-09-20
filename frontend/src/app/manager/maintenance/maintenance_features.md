# Manager Maintenance — Feature Map

## Module Purpose
The Manager Maintenance module gives gym managers a dedicated operational queue for equipment and facility issues. Managers can log a maintenance issue, assign a priority through the documented static options, review reported equipment/area details and mark unresolved issues as resolved. The module owns its API contract, query keys, form validation, mock state and UI transitions. It does not own vendor business systems, billing logic or backend authorization.

## Directory Structure
| Folder | Responsibility | Key Files |
|---|---|---|
| `maintenance_components/` | Renders maintenance queue, create modal and issue status UI | `ManagerMaintenanceMain.tsx`, `ManagerMaintenanceLogIssueModal.tsx` |
| `maintenance_hooks/` | Owns query/mutation orchestration and user-flow logic | `ManagerUseManagerMaintenanceLogic.ts`, `ManagerUseManagerMaintenanceMutations.ts` |
| `maintenance_api/` | Typed API client | `ManagerMaintenanceApi.ts` |
| `maintenance_types/` | Zod schemas and domain types | `ManagerMaintenanceTypes.ts` |
| `maintenance_constants/` | Static priority configuration | `ManagerMaintenanceConstants.ts` |
| `maintenance_mocks/fixtures/` | Seeded maintenance records | `ManagerMaintenanceMockFixtures.ts` |
| `maintenance_mocks/handlers/` | Mutable MSW handlers and reset function | `ManagerMaintenanceMockHandlers.ts` |

## Approved External Dependencies
### Application Infrastructure
- `@/lib/api` — global HTTP transport and response parsing
- `@/lib/formatters` — approved formatting utilities
- `@/app/manager/manager_components/ManagerLayout/ManagerHeader` — zero-business shell presentation
- `@/app/manager/manager_infrastructure/ManagerEnvConfig` — approved display configuration
- `@/app/manager/manager_infrastructure/ManagerToastService` — Manager feedback infrastructure

### Business Feature Dependencies
- None

### Role-Level Business Dependencies
- None

## Feature Inventory
| Feature | Route | What the User Can Do | Key Components | Main API Calls | Status |
|---|---|---|---|---|---|
| Maintenance queue | `/manager/maintenance` | Review maintenance issues and their current status/priority | `ManagerMaintenanceMain.tsx` | GET `/manager/maintenance` | Implemented |
| Log issue | `/manager/maintenance` | Record a maintenance issue with title, equipment, priority and estimated cost | `ManagerMaintenanceLogIssueModal.tsx` | POST `/manager/maintenance` | Implemented |
| Resolve issue | `/manager/maintenance` | Mark an unresolved issue as resolved | `ManagerMaintenanceMain.tsx` | POST `/manager/maintenance/:id/resolve` | Implemented |

## User Flows & Interactions
### Flow 1: Log a maintenance issue
1. Manager clicks `Log Issue`.
2. `ManagerMaintenanceLogIssueModal` opens with RHF + Zod validation.
3. Manager enters title, equipment/area, priority and optional non-negative cost.
4. Submit calls the create mutation.
5. Success invalidates the maintenance list, uses the backend message via Manager toast infrastructure and closes the form.
6. The new issue appears in the queue from the mutable mock/API read path.

### Flow 2: Resolve an issue
1. Manager clicks `Mark as Resolved`.
2. The mutation calls the feature resolve endpoint.
3. The successful response is followed by query invalidation.
4. The record re-renders with `RESOLVED` status and the action is removed.

## Data and State Architecture
- **State pattern:** TanStack Query for server state + local component state for modal visibility.
- **Zustand stores:** None.
- **Context providers:** None.
- **Local-storage keys:** None.
- **MSW handler:** `maintenance_mocks/handlers/ManagerMaintenanceMockHandlers.ts`.
- **MSW fixtures:** `maintenance_mocks/fixtures/ManagerMaintenanceMockFixtures.ts`.
- **MSW scenarios:** normal list, empty list, API error override, create mutation, resolve mutation, missing-record 404, mutable state reset.

## API Contract
| Function | Method | Endpoint | Request | Response `data` type |
|---|---|---|---|---|
| `ManagerMaintenanceApi.fetchMaintenanceIssues` | GET | `/manager/maintenance` | — | `MaintenanceTicket[]` |
| `ManagerMaintenanceApi.createMaintenanceTicket` | POST | `/manager/maintenance` | `CreateMaintenanceTicketPayload` | `MaintenanceTicket` |
| `ManagerMaintenanceApi.resolveMaintenanceTicket` | POST | `/manager/maintenance/:id/resolve` | — | `MaintenanceTicket` |

## UI Data Requirements
| UI Element | Required Field(s) | API Endpoint | Response Path | Nullable? | Mocked? |
|---|---|---|---|---|---|
| Title | `title` | GET | `data[].title` | No | Yes |
| Equipment/area | `equipment` | GET | `data[].equipment` | No | Yes |
| Priority | `priority` | GET | `data[].priority` | No | Yes |
| Status | `status` | GET | `data[].status` | No | Yes |
| Vendor | `assignedVendor` | GET | `data[].assignedVendor` | Yes | Yes |
| Estimated cost | `estimatedCost` | GET | `data[].estimatedCost` | Yes | Yes |
| Reported time | `reportedAt` | GET | `data[].reportedAt` | No | Yes |

## Permissions and Security
- **Required role:** `MANAGER`.
- **Destructive/irreversible actions:** Resolution is a state transition and must complete through the API/mutation path; UI must not show success before the mutation succeeds.
- **Cross-role isolation:** None.

## Loading, Empty, and Error States
- Route loading: structural `loading.tsx` skeleton using both skeleton semantic tokens.
- Query error: safe inline error plus `Retry`.
- Empty list: contextual empty state with access to `Log Issue`.
- Mutation loading: button label remains stable in the create modal and the queue action is disabled by the mutation state.

## Edge Cases and AI Warnings
- Estimated cost must be non-negative.
- Do not use raw color utilities or semantic opacity modifiers.
- Do not hardcode maintenance URLs outside `maintenance_url_config.ts`.
- Mock state must reflect create/resolve results on later reads.

## Component Responsibility Map
| Component File | Responsibility |
|---|---|
| `ManagerMaintenanceMain.tsx` | Issue queue rendering and resolve action with all async UI states. |
| `ManagerMaintenanceLogIssueModal.tsx` | Issue create form view and validation wiring. |

## Rule Compliance Checklist
- [x] Feature-local business ownership
- [x] Module-prefixed non-reserved files
- [x] API boundary schema validation
- [x] URL config ownership
- [x] Mutable MSW state + reset
- [x] Loading/error/empty states
- [x] Semantic theme tokens
- [x] Accessible form labels and errors
