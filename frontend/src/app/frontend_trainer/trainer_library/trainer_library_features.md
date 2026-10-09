# trainer_library — Feature Map (v8-fix)

## Module Purpose
The Diet Library module gives trainers access to gym-managed diet plans and the ability to assign an existing plan to a trainer-visible member. Users can search/filter the library, open plan details, review nutrition information, and complete the assignment flow. Diet-plan creation and modification remain outside the Trainer role when the API contract says those actions are Manager-owned. Backend-driven plan data stays in the feature API and MSW fixture boundary rather than component constants.

## Dependency Manifest
**Approved application/role infrastructure:** `@/lib/api`, approved `trainer_infrastructure/*` shell/feedback/realtime/guard primitives, and framework routing/runtime facilities required by the host.
**Feature-local utilities:** numeric/date/currency/null/masking formatters are kept inside `trainer_library_utils/`; no module imports `@/lib/formatters`.
**Direct third-party packages detected in feature source:** @tanstack/react-query, @testing-library/jest-dom, @testing-library/react, http-status-codes, lucide-react, msw, next, next-intl, react, vitest, zod.
**Sibling business-module dependencies:** None identified in feature source.

## Feature Lifecycle Contract
Feature lifecycle follows the documented list/detail → action/form → validated API mutation → TanStack Query reconciliation → visible result pattern.
Expected public route contract: `/trainer/library`. The physical Next.js `page.tsx/loading.tsx/error.tsx/not-found.tsx` files are now inside this canonical feature module. Public URL rewrites/mounting in the host application are outside the supplied archive and therefore remain host-scope verification.

## Directory Structure
```text
trainer_library/
├── error.tsx
├── loading.tsx
├── not-found.tsx
├── page.tsx
├── trainer_library_api/
├──   TrainerLibraryApi.ts
├──   TrainerLibraryApiBehavior.test.ts
├── trainer_library_components/
├──   trainer_library_assign_modal/
├──     TrainerLibraryAssignModal.tsx
├──   trainer_library_diet_grid/
├──     TrainerLibraryDietGrid.tsx
├──   trainer_library_diet_modal/
├──     TrainerLibraryDietModal.tsx
├──   trainer_library_empty_state/
├──     TrainerLibraryEmptyState.tsx
├──   trainer_library_loading_skeleton/
├──     TrainerLibraryLoadingSkeleton.tsx
├──   trainer_library_main/
├──     TrainerLibraryMain.tsx
├──     TrainerLibraryMainBehavior.test.tsx
├──   trainer_library_not_found_view/
├──     TrainerLibraryNotFoundView.tsx
├──   trainer_library_tabs/
├──     TrainerLibraryTabs.tsx
├── trainer_library_constants/
├──   TrainerLibraryConstants.test.ts
├──   TrainerLibraryConstants.ts
├──   TrainerLibraryQueryKeys.ts
├── trainer_library_features.md
├── trainer_library_forbidden.md
├── trainer_library_hooks/
├──   useTrainerLibraryAssignment.test.ts
├──   useTrainerLibraryAssignment.ts
├──   useTrainerLibraryDiet.test.ts
├──   useTrainerLibraryDiet.ts
├──   useTrainerLibraryLogic.test.ts
├──   useTrainerLibraryLogic.ts
├──   useTrainerLibraryMutations.test.ts
├──   useTrainerLibraryMutations.ts
├── trainer_library_locales/
├──   trainer_library_en.json
├──   trainer_library_hi.json
├── trainer_library_mocks/
├──   trainer_library_fixtures/
├──     TrainerLibraryMockData.ts
├──   trainer_library_handlers/
├──     TrainerLibraryMockHandlers.ts
├── trainer_library_schemas/
├──   TrainerLibraryApiSchema.ts
├──   TrainerLibraryDomainSchemas.ts
├── trainer_library_tests/
├──   TrainerLibraryRouteStates.test.tsx
├── trainer_library_theme_contract.md
├── trainer_library_types/
├──   TrainerLibraryAssignModalProps.ts
├──   TrainerLibraryDietGridProps.ts
├──   TrainerLibraryDietModalProps.ts
├──   TrainerLibraryEmptyStateProps.ts
├──   TrainerLibraryMutationTypes.ts
├──   TrainerLibraryQueryParamsTypes.ts
├──   TrainerLibraryTabsProps.ts
├──   TrainerLibraryTypes.ts
├── trainer_library_url_config.ts
├── trainer_library_utils/
├──   TrainerLibraryDisplayValue.test.ts
└──   TrainerLibraryDisplayValue.ts
```

Root files are intentionally limited to framework-reserved route files and module documentation. All business/config/schema/query/api artifacts are inside their role+module-prefixed subfolders.

## Approved External Dependencies
- Application infrastructure: approved global API transport, auth/session plumbing, global logging/error monitoring, and zero-business UI/shell primitives.
- Role infrastructure: `trainer_infrastructure_*` zero-business shell/feedback/realtime/guard facilities.
- Business Feature Dependencies: None.

## Feature Inventory
| Feature | Behavior |
|---|---|
| Diet plan grid | Displays trainer-visible plans with pagination. |
| Search | Changes server query and result set. |
| Goal filter | Changes server query and result set. |
| Diet details | Opens feature-owned modal/detailed presentation. |
| Assign to Member | Opens member selector and PATCHes the assignment relationship. |

## User Flows & Interactions
List → search/filter → page → open plan → Assign → select member → submit → success → assigned-member query refresh.

## Data & State Architecture
- Server/API state → TanStack Query only.
- UI-only shared state → module-scoped Zustand where required.
- Private UI state → local React state.
- URL/filter/search/pagination state → URL/query parameters where the feature documents those interactions.
- API responses are validated at the feature API boundary with Zod.

## API Contract
| Function | Method | Endpoint | Request | Response data |
|---|---|---|---|---|
| `fetchDietPlans` | GET | `TRAINER_LIBRARY_URLS.API.DIET_PLANS_BASE` | search/goal/page/limit params | diet plan records + pagination |
| `fetchAssignedMembers` | GET | `TRAINER_LIBRARY_URLS.API.ASSIGNED_MEMBERS` | none | assigned-member records |
| assignment mutation | PATCH/POST per API contract | `TRAINER_LIBRARY_URLS.API.ASSIGN_DIET(memberId)` | member + diet relationship | authoritative assignment response |

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

## API Path Verification Gate
- **BLOCKED_BY_SUPPLIED_SCOPE:** The supplied repair package does not include authoritative backend/OpenAPI path authority. Existing `/trainer/trainer_library/...` API paths are preserved until the host supplies canonical endpoint evidence; no invented rewrite was applied.

## Current v8-fix Architecture Evidence
- Route files owned by the feature: not-found.tsx, error.tsx, page.tsx, loading.tsx.
- Query files: TrainerLibraryQueryKeys.ts, useTrainerLibraryMutations.ts.
- Hook files: useTrainerLibraryAssignment.test.ts, useTrainerLibraryAssignment.ts, useTrainerLibraryDiet.test.ts, useTrainerLibraryDiet.ts, useTrainerLibraryLogic.test.ts, useTrainerLibraryLogic.ts.
- Constants: TrainerLibraryConstants.test.ts, TrainerLibraryConstants.ts.
- Types: TrainerLibraryAssignModalProps.ts, TrainerLibraryDietGridProps.ts, TrainerLibraryDietModalProps.ts, TrainerLibraryEmptyStateProps.ts, TrainerLibraryMutationTypes.ts, TrainerLibraryTabsProps.ts, TrainerLibraryTypes.ts.
- Locales: en.json, hi.json.
- Utils: TrainerLibraryDisplayValue.ts, TrainerLibraryFormatNumber.ts.
- Module-owned tests: 10 files.
- Mock/fixture files: 2 files.

## Rule Compliance Checklist
- [x] Canonical feature module retained as single source of business implementation.
- [x] Route files physically owned by this module.
- [x] Prefixed snake_case internal folders.
- [x] Role+module filename contract for module-owned artifacts.
- [x] Component/hook/store/schema/API size ceilings.
- [x] No global business formatter dependency.
- [x] Feature-owned localization, mocks, schemas, query keys, and tests.
- [x] No raw theme colors/arbitrary Tailwind values in feature JSX.
- [x] No fake/no-op controls found in static source checks.
- [ ] Host build/CI/runtime/browser verification — NOT VERIFIED; host application configuration was not supplied.
- [x] URL configuration placement follows the documented feature-root URL configuration exception; no source conflict remains.

## Routes
- `/trainer/library` → `page.tsx` (canonical route owner).
- Route lifecycle files (`page.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`) are physically owned by this feature module.

## User Flows
1. Enter the feature route and load server-backed data.
2. Use documented search/filter/detail controls.
3. Submit a create/update/action form after feature validation.
4. Execute the mutation with its idempotency contract.
5. Reconcile TanStack Query and surface backend success/error feedback.

## Component Tree
```text
trainer_library/
  page.tsx
  trainer_library_components/
    trainer_library_assign_modal/
      TrainerLibraryAssignModal.tsx
    trainer_library_diet_grid/
      TrainerLibraryDietGrid.tsx
    trainer_library_diet_modal/
      TrainerLibraryDietModal.tsx
    trainer_library_empty_state/
      TrainerLibraryEmptyState.tsx
    trainer_library_loading_skeleton/
      TrainerLibraryLoadingSkeleton.tsx
    trainer_library_main/
      TrainerLibraryMain.tsx
    trainer_library_not_found_view/
      TrainerLibraryNotFoundView.tsx
    trainer_library_tabs/
      TrainerLibraryTabs.tsx
```

## API Contract Summary
The module-owned URL config is the single URL source-of-truth; API services consume these paths. Backend API paths remain subject to host/OpenAPI confirmation per the supplied repair scope. Key declared paths:
- `export const TRAINER_LIBRARY_PAGE_DASHBOARD = '/trainer/dashboard' as const;`
- `export const TRAINER_LIBRARY_PAGE_LIST = '/trainer/library' as const;`
- `export const TRAINER_LIBRARY_API_DIET_PLANS_BASE = '/trainer/trainer_library/diet-plans' as const;`
- `export const TRAINER_LIBRARY_API_ASSIGNED_MEMBERS = '/trainer/trainer_library/assigned-members' as const;`
- `export const TRAINER_LIBRARY_API_ASSIGN_DIET = (memberId: string) => `/trainer/trainer_members/${memberId}/diet` as const;`

## State Map
- Server/API state: TanStack Query.
- Shared UI state: no module-scoped Zustand store is present; keep state local or server-owned.
- Private interaction state: local React state.
- URL-backed filters/pagination: URL/search parameters where documented by the feature.

## Permissions
- Trainer role only within `frontend_trainer`; feature must not introduce manager/superadmin business capabilities.
- Business permissions and status mappings remain feature-owned; do not move them into global UI infrastructure.

## External Dependencies
- Approved global/application infrastructure only: API transport, auth/session, logging/error monitoring, routing/runtime plumbing, and zero-business UI primitives.
- Trainer role infrastructure may be consumed through `trainer_infrastructure_*` contracts. No sibling business-module imports are permitted.

## Known Forbidden Patterns
- Do not import sibling feature business code into `trainer_library`.
- Do not hardcode URLs outside the module URL config.
- Do not duplicate server state in Zustand or hardcode business statuses in components/schemas.
- Do not introduce raw theme colors, semantic background opacity modifiers, or non-canonical z-index values.
- Preserve the module theme contract and locale ownership when repairing this feature.
