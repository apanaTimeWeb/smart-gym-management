# Trainer Library — Feature Map

## Module Purpose
The Diet Library module gives trainers access to gym-managed diet plans and the ability to assign an existing plan to a trainer-visible member. Users can search/filter the library, open plan details, review nutrition information, and complete the assignment flow. Diet-plan creation and modification remain outside the Trainer role when the API contract says those actions are Manager-owned. Backend-driven plan data stays in the feature API and MSW fixture boundary rather than component constants.

## Directory Structure
- `page.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx` — route states.
- `library_components/` — tabs, grid, diet modal, assignment modal, empty/loading states.
- `library_hooks/` — query/filter orchestration, diet modal logic, assignment mutation.
- `library_api/` — feature API boundary.
- `library_types/` — Zod schemas and domain contracts.
- `library_utils/TrainerLibrarySharedConstants.ts` — static goals/filter options/form defaults.
- `library_mocks/fixtures/` / `library_mocks/handlers/` — feature-owned demo data and mutable assignment state.
- `library_url_config.ts` — page/API URL contract.
- `library_tests/` — API/main/route behavior.

## Feature Inventory
| Feature | Behavior |
|---|---|
| Diet plan grid | Displays trainer-visible plans with pagination. |
| Search | Changes server query and result set. |
| Goal filter | Changes server query and result set. |
| Diet details | Opens feature-owned modal/detailed presentation. |
| Assign to Member | Opens member selector and PATCHes the assignment relationship. |

## Approved External Dependencies
- Application infrastructure: `@/lib/api`, `@/lib/formatters`, and approved zero-business Trainer UI/feedback infrastructure used directly by this module.
- Business Feature Dependencies: None.
- Role-Level Business Dependencies: None.

## Data and State Architecture
- TanStack Query owns diet plans and assigned-member data.
- URL owns search/goal/page filters.
- Modal state is local UI state.
- No React Context owns library server data.
- Assignment mock state is mutable so successful assignment appears in subsequent reads.

## User Flows & Interactions
List → search/filter → page → open plan → Assign → select member → submit → success → assigned-member query refresh.

## Architecture Notes
`library_url_config.ts` is the only Library URL contract. Static goals are constants; mocked diet/member records live in fixtures, not UI components.

## Approved External Dependencies
- Application infrastructure: `@/lib/api`, approved Trainer feedback/UI primitives.
- Business Feature Dependencies: None.
- Role-Level Business Dependencies: None.

## API Contract
| Function | Method | Endpoint | Request | Response data |
|---|---|---|---|---|
| `fetchDietPlans` | GET | `LibraryUrlConfig.BACKEND_API.DIET_PLANS_BASE` | search/goal/page/limit params | diet plan records + pagination |
| `fetchAssignedMembers` | GET | `LibraryUrlConfig.BACKEND_API.ASSIGNED_MEMBERS` | none | assigned-member records |
| assignment mutation | PATCH/POST per API contract | `LibraryUrlConfig.BACKEND_API.ASSIGN_DIET(memberId)` | member + diet relationship | authoritative assignment response |

## UI Data Requirements
| UI Element | Required fields | Source |
|---|---|---|
| Diet plan cards | `id`, `name`, goal, description, metadata rendered by card | diet plan response |
| Goal filter | documented goal values from feature constants | query/API contract |
| Search | diet-plan searchable text fields | query/API contract |
| Assign modal | member `id`, `name`, selected plan identity | assigned-member response + selected plan |
| Pagination | total/page/limit | response meta |

## Permissions and Security
- Required capability: `trainer.view`.
- Trainer can view and assign a diet plan to a trainer-visible member.
- Diet-plan authoring/Manager-owned CRUD is intentionally outside this module.
- Assignment action must not expose raw API error objects.

## Loading, Empty, and Error States
- `loading.tsx` and `TrainerLibraryLoadingSkeleton` mirror toolbar + card grid.
- Empty state uses `TrainerLibraryEmptyState` with contextual search information.
- Assignment modal has disabled/loading state while saving.
- Route error uses module Retry fallback.

## Edge Cases and AI Warnings
- **No Manager CRUD leakage:** do not add diet-plan create/edit/delete actions here.
- **Assignment must change visible state:** a success toast without changed assignment data is insufficient.
- **Search/goal/page are server inputs:** do not fetch a large unfiltered dataset and filter only in JSX.
- **Selected member identity must survive the modal flow:** do not replace the selected member with a hardcoded fixture ID.
- **Mock state must be feature-owned:** do not import member/diet fixtures from another business module.

## Component Responsibility Map
| Component area | Responsibility |
|---|---|
| `TrainerLibraryMain` | Library composition. |
| `TrainerLibraryTabs` | Search/goal/filter controls. |
| `TrainerLibraryDietGrid` | Paginated plan presentation. |
| `TrainerLibraryDietModal` | Plan detail presentation. |
| `TrainerLibraryAssignModal` | Member assignment interaction. |
| `TrainerLibraryEmptyState` | Contextual no-result state. |

## Rule Compliance Checklist
- [x] Module-owned fixture and MSW boundary
- [x] Search/goal/page contract
- [x] Assignment mutation changes mock-visible state
- [x] No Manager CRUD leakage
- [x] RHF/Zod used where a non-trivial form exists
- [x] Semantic theme usage
- [ ] Parent-app runtime/tooling verification — NOT VERIFIED
