# Manager Grievance — Feature Map

## Module Purpose
The Manager Grievance module gives gym managers a focused queue for member complaints and their resolution status. Managers use it to review reported issues, search by member or issue text, record new complaints, and close open or resolving complaints with a resolution note. The module owns its complaint API contract, UI state, query keys, mock data and mutation behavior. Backend authorization remains outside this frontend module; the UI only follows the documented Manager permission context.

## Directory Structure
| Folder | Responsibility | Key Files |
|---|---|---|
| `grievance_components/` | Renders complaint list, create modal and inline resolution form | `ManagerGrievanceMain.tsx`, `ManagerGrievanceLogComplaintModal.tsx` |
| `grievance_hooks/` | Owns query/mutation orchestration and user-flow logic | `ManagerUseManagerGrievanceLogic.ts`, `ManagerUseManagerGrievanceMutations.ts` |
| `grievance_api/` | Typed API client and TanStack Query key contract | `ManagerGrievanceApi.ts`, `ManagerUseManagerGrievanceQueries.ts` |
| `grievance_types/` | Zod schemas and domain payload types | `ManagerGrievanceTypes.ts` |
| `grievance_constants/` | Static category configuration | `ManagerGrievanceConstants.ts` |
| `grievance_mocks/fixtures/` | Seeded complaint records | `ManagerGrievanceMockFixtures.ts` |
| `grievance_mocks/handlers/` | Mutable MSW handlers and reset function | `ManagerGrievanceMockHandlers.ts` |

## Approved External Dependencies
### Application Infrastructure
- `@/lib/api` — global HTTP transport and response parsing
- `@/lib/formatters` — approved display formatting
- `@/app/manager/manager_components/ManagerLayout/ManagerHeader` — zero-business Manager shell presentation
- `@/app/manager/manager_infrastructure/ManagerToastService` — Manager feedback infrastructure

### Business Feature Dependencies
- None

### Role-Level Business Dependencies
- None

## Feature Inventory
| Feature | Route | What the User Can Do | Key Components | Main API Calls | Status |
|---|---|---|---|---|---|
| Complaint queue | `/manager/grievance` | Browse complaint records and search by member or issue | `ManagerGrievanceMain.tsx` | GET `/manager/grievance` | Implemented |
| Log complaint | `/manager/grievance` | Create a new complaint and return to the queue | `ManagerGrievanceLogComplaintModal.tsx` | POST `/manager/grievance` | Implemented |
| Resolve complaint | `/manager/grievance` | Add a resolution note and close an open/resolving complaint | `ManagerGrievanceMain.tsx` | POST `/manager/grievance/:id/resolve` | Implemented |

## User Flows & Interactions
### Flow 1: Log a complaint
1. Manager opens `/manager/grievance` and clicks `Log Complaint`.
2. `ManagerGrievanceLogComplaintModal` opens with RHF + Zod validation.
3. Manager enters member name, category and issue description.
4. Submit calls the feature create mutation.
5. On success the feature invalidates the grievance list query, shows the backend mutation message through Manager toast infrastructure, closes the modal and renders the new record.
6. On validation or API error the form remains available and the user can correct/retry.

### Flow 2: Resolve a complaint
1. Manager clicks `Resolve` on an open/resolving record.
2. Inline resolution UI appears and requires a non-empty note.
3. Submit calls `POST /manager/grievance/:id/resolve`.
4. On success the record becomes `CLOSED`, the resolution note is visible and the next action is available.
5. On failure the original record remains visible and retry remains possible.

## Data and State Architecture
- **State pattern:** TanStack Query for server state + local component state for search/modal/resolution UI state.
- **Zustand stores:** None.
- **Context providers:** None.
- **Local-storage keys:** None.
- **MSW handler:** `grievance_mocks/handlers/ManagerGrievanceMockHandlers.ts`.
- **MSW fixtures:** `grievance_mocks/fixtures/ManagerGrievanceMockFixtures.ts`.
- **MSW scenarios:** normal list, empty list through UI filtering, API error via host override, create mutation, resolve mutation, missing-record 404, mutable in-memory state reset.

## API Contract
| Function | Method | Endpoint | Request | Response `data` type |
|---|---|---|---|---|
| `ManagerGrievanceApi.fetchGrievanceTickets` | GET | `/manager/grievance` | — | `GrievanceTicket[]` |
| `ManagerGrievanceApi.createGrievanceTicket` | POST | `/manager/grievance` | `CreateGrievanceTicketPayload` | `GrievanceTicket` |
| `ManagerGrievanceApi.resolveGrievanceTicket` | POST | `/manager/grievance/:id/resolve` | `{ resolutionNote: string }` | `GrievanceTicket` |

## UI Data Requirements
| UI Element | Required Field(s) | API Endpoint | Response Path | Nullable? | Mocked? |
|---|---|---|---|---|---|
| Complaint member | `memberName` | GET | `data[].memberName` | No | Yes |
| Complaint category | `category` | GET | `data[].category` | No | Yes |
| Complaint issue | `issue` | GET | `data[].issue` | No | Yes |
| Complaint status | `status` | GET | `data[].status` | No | Yes |
| Reported time | `loggedAt` | GET | `data[].loggedAt` | No | Yes |
| Resolution note | `resolutionNote` | GET | `data[].resolutionNote` | Yes | Yes |

## Permissions and Security
- **Required role:** `MANAGER`.
- **Destructive/irreversible actions:** Resolving a complaint changes its status to `CLOSED`; the current product flow requires an explicit resolution note before submission.
- **Cross-role isolation:** No imports from another role or Manager business feature.

## Loading, Empty, and Error States
- Route loading: `loading.tsx` structural skeleton.
- Query error: inline safe error with `Retry`.
- Empty/search-no-match: contextual message with `Log Complaint` available in the page header.
- Mutation errors: Manager toast infrastructure plus preserved UI state.

## Edge Cases and AI Warnings
- Never bypass `ManagerGrievanceUrlConfig`.
- Never import member/attendance/sales business logic to populate the complaint form.
- Mock mutations must update later GET results.
- Preserve `resolutionNote` only when the API returns it; do not invent a success state locally.

## Component Responsibility Map
| Component File | Responsibility |
|---|---|
| `ManagerGrievanceMain.tsx` | Queue rendering, search, empty/error/loading state and inline resolution interaction. |
| `ManagerGrievanceLogComplaintModal.tsx` | Complaint create form view and validation wiring. |

## Rule Compliance Checklist
- [x] Feature-local business ownership
- [x] Module-prefixed non-reserved files
- [x] API boundary schema validation
- [x] URL config ownership
- [x] Mutable MSW state + reset
- [x] Loading/error/empty states
- [x] Semantic theme tokens
- [x] Accessible labels and error associations
