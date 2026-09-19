# Manager Library — Feature Map

## Module Purpose
Manager Library is the branch content library for reusable diet plans and exercises. Managers can search and page through exercises and diet plans, create/update/delete library entries, and use those records from member workflows. The module owns all library fixtures and MSW handlers. Backend-driven diet-plan and exercise data must never be duplicated as component constants.

## Directory Structure
| Folder | Responsibility | Key Files |
|---|---|---|
| `library_api/` | Feature-owned responsibility for the library module. | `ManagerLibraryApi.ts; ManagerLibraryServerApi.ts` |
| `library_components/` | Feature-owned responsibility for the library module. | `—` |
| `library_hooks/` | Feature-owned responsibility for the library module. | `ManagerUseManagerLibraryLogic.ts; ManagerUseManagerLibraryLogic.ts` |
| `library_fixtures/` | Feature-owned responsibility for the library module. | `ManagerLibraryDietMockData.ts; ManagerLibraryMockData.ts` |
| `library_mocks/` | Feature-owned responsibility for the library module. | `—` |
| `library_types/` | Feature-owned responsibility for the library module. | `ManagerLibrarySchema.ts; ManagerLibraryTypes.ts` |
| `library_utils/` | Feature-owned responsibility for the library module. | `ManagerLibrarySharedConstants.ts` |

## Feature Inventory
| Feature | Route | What the User Can Do | Main API Calls | Status |
|---|---|---|---|---|
| fetchExercises | `/manager/library` | Uses the fetchExercises workflow with typed request/response handling. | `GET /manager/library/exercises` | ✅ Implemented |
| createExercise | `/manager/library` | Uses the createExercise workflow with typed request/response handling. | `POST /manager/library/exercises` | ✅ Implemented |
| updateExercise | `/manager/library` | Uses the updateExercise workflow with typed request/response handling. | `PATCH /manager/library/exercises/:id` | ✅ Implemented |
| deleteExercise | `/manager/library` | Uses the deleteExercise workflow with typed request/response handling. | `DELETE /manager/library/exercises/:id` | ✅ Implemented |
| fetchDietPlans | `/manager/library` | Uses the fetchDietPlans workflow with typed request/response handling. | `GET /manager/library/diet-plans` | ✅ Implemented |
| createDietPlan | `/manager/library` | Uses the createDietPlan workflow with typed request/response handling. | `POST /manager/library/diet-plans` | ✅ Implemented |
| updateDietPlan | `/manager/library` | Uses the updateDietPlan workflow with typed request/response handling. | `PATCH /manager/library/diet-plans/:id` | ✅ Implemented |
| deleteDietPlan | `/manager/library` | Uses the deleteDietPlan workflow with typed request/response handling. | `DELETE /manager/library/diet-plans/:id` | ✅ Implemented |

## User Flows & Interactions
### Flow 1: Manage diet plans
1. Manager switches to diet plans and searches the library.
2. fetchDietPlans(params) sends server-side search and pagination.
3. MSW filters the diet-plan fixtures and returns the total.
4. The diet grid renders the page and the edit/delete actions reconcile the query cache.
### Flow 2: Manage exercises
1. Manager searches the exercise library.
2. fetchExercises(params) loads the server-backed list.
3. Create/update/delete actions use the module API and Zod schemas.
4. The response becomes the new Query cache source of truth.

## Data and State Architecture
TanStack Query owns library server/API data. UI-only filters, tabs, selections, and draft state remain local state or module-scoped Zustand where shared. module-local state/query layer is limited to stable cross-tree concerns and does not become the source of truth for API data. Query keys are module-prefixed.

## API Contract
| Function | Method | Endpoint | Request | Response `data` type |
|---|---|---|---|---|
| `fetchExercises` | `GET` | `/api/v1/manager/library/exercises` | `{ page?, limit?, search?, category?, difficulty? }` | `{ exercises: Exercise[]; total: number }` |
| `createExercise` | `POST` | `/api/v1/manager/library/exercises` | `Partial<Exercise>` | `Exercise` |
| `updateExercise` | `PATCH` | `/api/v1/manager/library/exercises/:id` | `{ id: string; body: Partial<Exercise> }` | `Exercise` |
| `deleteExercise` | `DELETE` | `/api/v1/manager/library/exercises/:id` | `{ id: string }` | `{ id: string }` |
| `fetchDietPlans` | `GET` | `/api/v1/manager/library/diet-plans` | `{ page?, limit?, search?, goal? }` | `{ dietPlans: DietPlan[]; total: number }` |
| `createDietPlan` | `POST` | `/api/v1/manager/library/diet-plans` | `Partial<DietPlan>` | `DietPlan` |
| `updateDietPlan` | `PATCH` | `/api/v1/manager/library/diet-plans/:id` | `{ id: string; body: Partial<DietPlan> }` | `DietPlan` |
| `deleteDietPlan` | `DELETE` | `/api/v1/manager/library/diet-plans/:id` | `{ id: string }` | `{ id: string }` |

## UI Data Requirements
| UI Element | Required Field(s) | API Endpoint | Response Path | Nullable? | Mocked? |
|---|---|---|---|---|---|
| Diet table/grid: Name | `name` | `/api/v1/manager/library/diet-plans` | `data.dietPlans[].name` | No | Yes |
| Diet: Goal | `goal` | `/api/v1/manager/library/diet-plans` | `data.dietPlans[].goal` | No | Yes |
| Diet: Calories | `calories` | `/api/v1/manager/library/diet-plans` | `data.dietPlans[].calories` | Yes | Yes |
| Diet: Protein | `protein` | `/api/v1/manager/library/diet-plans` | `data.dietPlans[].protein` | Yes | Yes |
| Diet: Carbs | `carbs` | `/api/v1/manager/library/diet-plans` | `data.dietPlans[].carbs` | Yes | Yes |
| Diet: Fats | `fats` | `/api/v1/manager/library/diet-plans` | `data.dietPlans[].fats` | Yes | Yes |
| Diet: Active | `isActive` | `/api/v1/manager/library/diet-plans` | `data.dietPlans[].isActive` | No | Yes |
| Diet: Meals | `meals[]` | `/api/v1/manager/library/diet-plans` | `data.dietPlans[].meals[]` | No | Yes |
| Exercise: Name | `name` | `/api/v1/manager/library/exercises` | `data.exercises[].name` | No | Yes |
| Exercise: Category | `category` | `/api/v1/manager/library/exercises` | `data.exercises[].category` | No | Yes |
| Exercise: Muscle group | `muscleGroup` | `/api/v1/manager/library/exercises` | `data.exercises[].muscleGroup` | Yes | Yes |
| Exercise: Difficulty | `difficulty` | `/api/v1/manager/library/exercises` | `data.exercises[].difficulty` | No | Yes |
| Exercise: Active | `isActive` | `/api/v1/manager/library/exercises` | `data.exercises[].isActive` | No | Yes |

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
- **Diet plans must come from the `/diet-plans` endpoint; do not silently reuse member diet-plan snapshots:** Diet plans must come from the `/diet-plans` endpoint; do not silently reuse member diet-plan snapshots.
- **Pagination total must be the filtered server total:** Pagination total must be the filtered server total.
- **Optional nutrition values require explicit nullable display behavior:** Optional nutrition values require explicit nullable display behavior.
- **Exercise and diet-plan delete actions are destructive and need confirmation:** Exercise and diet-plan delete actions are destructive and need confirmation.
- **Do not put diet/exercise server records into shared UI constants:** Do not put diet/exercise server records into shared UI constants.
- **When the backend changes a library record, reconcile the Query cache with the response object:** When the backend changes a library record, reconcile the Query cache with the response object.

## Component Responsibility Map
| Component File | Responsibility |
|---|---|
| `library/library_components/ManagerLibraryDietGrid/ManagerLibraryDietGrid.tsx` | Renders the diet plan cards grid with macronutrient info and action buttons. |
| `library/library_components/ManagerLibraryDietModal/ManagerLibraryDietModal.tsx` | Form modal for creating or editing a diet plan in the Diet Library module. |
| `library/library_components/ManagerLibraryMain/ManagerLibraryMain.tsx` | Framework entry component for the Diet Library module; delegates feature behavior and UI composition to `ManagerLibraryContent`. |
| `library/library_components/ManagerLibraryTabs/ManagerLibraryTabs.tsx` | Renders the tabbed view switching between Diet Plans and Exercises in the Diet Library. |
| `library/library_hooks/ManagerUseManagerLibraryLogic.ts` | Provides UI orchestration state to the Diet Library module hierarchy. Async data is managed in useManagerLibraryLogic. |

## Rule Compliance Checklist
- [x] Module-owned API, types/schemas, fixtures, handlers, tests, and feature documentation are scoped to this module.
- [x] API calls use the module API client and typed response contracts.
- [x] Server-backed pagination/filter/search follows explicit parameter propagation where applicable.
- [x] UI Data Requirements map displayed values to concrete endpoints and response paths.
- [x] Module-owned MSW fixtures/handlers remain the frontend-first server substitute.
- [x] Raw `any`, relative imports, barrel files, and hardcoded localhost mock origins are absent from audited Manager source.
- [ ] Host-repository CI/tooling, dependency/SCA/secret gates, CODEOWNERS, branch protection, and production build require root-repository verification.
