# trainer_members — Feature Map (v8-fix)

## Module Purpose
The Members module is the trainer's member workspace for browsing assigned members, opening member profiles, reviewing fitness/trainer_attendance/progress information, recording trainer notes, and initiating documented member messaging. Search, filtering, sorting, pagination, and selected-member identity are URL/Query/store concerns according to their ownership. Member server data remains in TanStack Query while only UI state is stored locally. Billing, tenant administration, and unrelated role-level member business logic are outside this module.

## Dependency Manifest
**Approved application/role infrastructure:** `@/lib/api`, approved `trainer_infrastructure/*` shell/feedback/realtime/guard primitives, and framework routing/runtime facilities required by the host.
**Feature-local utilities:** numeric/date/currency/null/masking formatters are kept inside `trainer_members_utils/`; no module imports `@/lib/formatters`.
**Direct third-party packages detected in feature source:** @hookform/resolvers, @tanstack/react-query, @testing-library/jest-dom, @testing-library/react, date-fns, http-status-codes, lucide-react, msw, next, next-intl, react, react-hook-form, vitest, zod, zustand.
**Sibling business-module dependencies:** None identified in feature source.

## Feature Lifecycle Contract
Feature lifecycle follows the documented list/detail → action/form → validated API mutation → TanStack Query reconciliation → visible result pattern.
Expected public route contract: `/trainer/members`. The physical Next.js `page.tsx/loading.tsx/error.tsx/not-found.tsx` files are now inside this canonical feature module. Public URL rewrites/mounting in the host application are outside the supplied archive and therefore remain host-scope verification.

## Directory Structure
```text
trainer_members/
├── error.tsx
├── loading.tsx
├── not-found.tsx
├── page.tsx
├── trainer_members_api/
├──   TrainerMembersApi.ts
├──   TrainerMembersApiBehavior.test.ts
├── trainer_members_components/
├──   trainer_members_content/
├──     TrainerMembersContent.tsx
├──   trainer_members_empty_state/
├──     TrainerMembersEmptyState.tsx
├──   trainer_members_kpis/
├──     TrainerMembersKPIs.tsx
├──   trainer_members_loading_skeleton/
├──     TrainerMembersLoadingSkeleton.tsx
├──   trainer_members_main/
├──     TrainerMembersMain.tsx
├──     TrainerMembersMainBehavior.test.tsx
├──   trainer_members_message_modal/
├──     TrainerMembersMessageModal.tsx
├──   trainer_members_not_found_view/
├──     TrainerMembersNotFoundView.tsx
├──   trainer_members_profile/
├──     TrainerMembersProfile.tsx
├──     TrainerMembersProfileAssessment.tsx
├──     TrainerMembersProfileAttendance.tsx
├──     TrainerMembersProfileDiet.tsx
├──     TrainerMembersProfileFitness.tsx
├──     TrainerMembersProfileNotes.tsx
├──     TrainerMembersProfileOverview.tsx
├──     TrainerMembersProfileProgress.tsx
├──     TrainerMembersProfileWorkout.tsx
├──   trainer_members_table/
├──     TrainerMembersTable.tsx
├──   trainer_members_toolbar/
├──     TrainerMembersToolbar.tsx
├── trainer_members_constants/
├──   TrainerMembersConstants.test.ts
├──   TrainerMembersConstants.ts
├──   TrainerMembersQueryKeys.ts
├── trainer_members_features.md
├── trainer_members_forbidden.md
├── trainer_members_hooks/
├──   useTrainerMembersFilters.test.ts
├──   useTrainerMembersFilters.ts
├──   useTrainerMembersMutations.test.ts
├──   useTrainerMembersMutations.ts
├──   useTrainerMembersQuery.test.ts
├──   useTrainerMembersQuery.ts
├──   useTrainerMembersSelectedMember.test.ts
├──   useTrainerMembersSelectedMember.ts
├──   useTrainerMembersToolbar.test.ts
├──   useTrainerMembersToolbar.ts
├── trainer_members_locales/
├──   trainer_members_en.json
├──   trainer_members_hi.json
├── trainer_members_mocks/
├──   trainer_members_fixtures/
├──     TrainerMembersMockData.ts
├──   trainer_members_handlers/
├──     TrainerMembersMockHandlers.ts
├── trainer_members_schemas/
├──   TrainerMembersDomainSchemas.ts
├──   TrainerMembersFormSchema.ts
├──   TrainerMembersNoteSchemas.ts
├──   TrainerMembersProfileDataSchemas.ts
├──   TrainerMembersSnapshotSchemas.ts
├── trainer_members_store/
├──   useTrainerMembersStore.test.ts
├──   useTrainerMembersStore.ts
├── trainer_members_tests/
├──   TrainerMembersRouteStates.test.tsx
├── trainer_members_theme_contract.md
├── trainer_members_types/
├──   TrainerMembersDietSnapshot.ts
├──   TrainerMembersEmptyStateProps.ts
├──   TrainerMembersMessageModalTypes.ts
├──   TrainerMembersMessagingTypes.ts
├──   TrainerMembersMutationTypes.ts
├──   TrainerMembersNoteTypes.ts
├──   TrainerMembersProfileTypes.ts
├──   TrainerMembersQueryTypes.ts
├──   TrainerMembersStoreTypes.ts
├──   TrainerMembersTypes.ts
├──   TrainerMembersWorkoutSnapshot.ts
├── trainer_members_url_config.ts
├── trainer_members_utils/
├──   TrainerMembersDisplayFormatters.test.ts
└──   TrainerMembersDisplayFormatters.ts
```

Root files are intentionally limited to framework-reserved route files and module documentation. All business/config/schema/query/api artifacts are inside their role+module-prefixed subfolders.

## Approved External Dependencies
- Application infrastructure: approved global API transport, auth/session plumbing, global logging/error monitoring, and zero-business UI/shell primitives.
- Role infrastructure: `trainer_infrastructure_*` zero-business shell/feedback/realtime/guard facilities.
- Business Feature Dependencies: None.

## Feature Inventory
| Feature | Behavior |
|---|---|
| Directory | Search/filter/paginated member list. |
| Profile | Member-scoped detail and supporting tabs. |
| Trainer Notes | Add note → POST → member detail/cache refresh. |
| Assign diet/workout | Uses Members-owned API contract for trainer member assignments. |
| Attendance/progress | Member-scoped supporting reads. |
| Messaging | Feature-owned WhatsApp/email modal with keyboard-accessible focus handling. |

## User Flows & Interactions
Directory → select member → profile → Notes → Add Note → save → updated note visible. Messaging opens a Members-owned modal; external delivery URLs are generated by `trainer_members_url_config.ts`.

## Data & State Architecture
- Server/API state → TanStack Query only.
- UI-only shared state → module-scoped Zustand where required.
- Private UI state → local React state.
- URL/filter/search/pagination state → URL/query parameters where the feature documents those interactions.
- API responses are validated at the feature API boundary with Zod.

## API Contract
| Function | Method | Endpoint | Request | Response data |
|---|---|---|---|---|
| `fetchMembers` | GET | `TRAINER_MEMBERS_URLS.API.BASE` | search/status/progressStatus/page/limit | member list + pagination |
| `fetchMemberById` | GET | `TRAINER_MEMBERS_URLS.API.GET_ONE(id)` | member ID | member detail |
| `fetchMemberStats` | GET | `TRAINER_MEMBERS_URLS.API.STATS` | none | member KPIs |
| `updateMember` | PATCH | `TRAINER_MEMBERS_URLS.API.UPDATE(id)` | partial member payload + idempotency key for mutation | updated member |
| `addMemberNote` | POST | `TRAINER_MEMBERS_URLS.API.NOTES(id)` | note payload + idempotency key | created note |
| supporting reads | GET | attendance/diet/trainer_workout/progress URLs in `TRAINER_MEMBERS_URLS` | member ID | feature-owned member snapshots |

## UI Data Requirements
| UI Element | Required fields | Source |
|---|---|---|
| Member table | `id`, name, phone/email display, membership/status/progress fields rendered by table | member list |
| Profile overview | identity, membership, progress summary fields | member detail/supporting reads |
| Attendance tab | date/check-in/check-out/status fields | member attendance endpoint |
| Diet tab | assigned plan and nutrition fields rendered by profile | member diet endpoint |
| Workout tab | assigned workout plan/exercise fields rendered by profile | member workout endpoint |
| Progress tab | measurement fields and progress photos where present | member progress endpoint |
| Notes | note text/created time/author fields | notes endpoint/mock state |
| Messaging | member `name`, contact fields | member response + feature URL config |

## Permissions and Security
- Required capability: `trainer.view`.
- Trainer sees trainer-visible member records only.
- Member list masks sensitive phone data where required; full details remain inside profile context.
- Destructive edits/record mutations use feature confirmation where required.
- Frontend role checks are not a substitute for backend authorization.

## Loading, Empty, and Error States
- Route `loading.tsx` uses member-shaped KPI/table skeletons.
- Empty list uses `TrainerMembersEmptyState`.
- Profile sub-sections expose local loading/error states where independently fetched.
- Mutation buttons disable and show loading state.
- Route error uses Retry fallback.

## Edge Cases and AI Warnings
- **Member ID is the identity key:** never substitute array index or another member's ID.
- **Profile tabs must keep the selected member:** tab changes must not reset the member identity.
- **Notes are real mutations:** after successful save, subsequent detail reads must show the note.
- **Messaging is Members-owned:** do not move WhatsApp/email business logic back to role-wide feedback infrastructure.
- **Update retries need one idempotency key per intent:** never generate a new key for a retry of the same update.

## Component Responsibility Map
| Component area | Responsibility |
|---|---|
| `TrainerMembersMain` | Member list/profile orchestration. |
| `TrainerMembersToolbar` | Search/filter and primary actions. |
| `TrainerMembersTable` | Semantic paginated member table. |
| `TrainerMembersProfile` | Member profile shell and tabs. |
| `TrainerMembersMessageModal` | Member-owned messaging workflow. |
| Profile subcomponents | Individual profile sections; no cross-feature business ownership. |

## Current v8-fix Architecture Evidence
- Route files owned by the feature: not-found.tsx, error.tsx, page.tsx, loading.tsx.
- Query files: TrainerMembersQueryKeys.ts, useTrainerMembersMutations.test.ts, useTrainerMembersMutations.ts, useTrainerMembersQuery.test.ts, useTrainerMembersQuery.ts, useTrainerMembersSelectedMember.test.ts, useTrainerMembersSelectedMember.ts.
- Hook files: useTrainerMembersFilters.test.ts, useTrainerMembersFilters.ts.
- Constants: TrainerMembersConstants.test.ts, TrainerMembersConstants.ts.
- Schemas: TrainerMembersDomainSchemas.ts, TrainerMembersFormSchema.ts, TrainerMembersNoteSchemas.ts, TrainerMembersProfileDataSchemas.ts, TrainerMembersSnapshotSchemas.ts.
- Types: TrainerMembersDietSnapshot.ts, TrainerMembersEmptyStateProps.ts, TrainerMembersMessageModalTypes.ts, TrainerMembersMessagingTypes.ts, TrainerMembersMutationTypes.ts, TrainerMembersNoteTypes.ts, TrainerMembersProfileTypes.ts, TrainerMembersQueryTypes.ts, TrainerMembersStoreTypes.ts, TrainerMembersWorkoutSnapshot.ts, TrainerMembersTypes.ts.
- Locales: en.json, hi.json.
- Utils: TrainerMembersDisplayFormatters.ts.
- Module-owned tests: 11 files.
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
- `/trainer/members` → `page.tsx` (canonical route owner).
- Route lifecycle files (`page.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`) are physically owned by this feature module.

## User Flows
1. Enter the feature route and load server-backed data.
2. Use documented search/filter/detail controls.
3. Submit a create/update/action form after feature validation.
4. Execute the mutation with its idempotency contract.
5. Reconcile TanStack Query and surface backend success/error feedback.

## Component Tree
```text
trainer_members/
  page.tsx
  trainer_members_components/
    trainer_members_content/
      TrainerMembersContent.tsx
    trainer_members_empty_state/
      TrainerMembersEmptyState.tsx
    trainer_members_kpis/
      TrainerMembersKPIs.tsx
    trainer_members_loading_skeleton/
      TrainerMembersLoadingSkeleton.tsx
    trainer_members_main/
      TrainerMembersMain.tsx
    trainer_members_message_modal/
      TrainerMembersMessageModal.tsx
    trainer_members_not_found_view/
      TrainerMembersNotFoundView.tsx
    trainer_members_profile/
      TrainerMembersProfile.tsx
    trainer_members_table/
      TrainerMembersTable.tsx
    trainer_members_toolbar/
      TrainerMembersToolbar.tsx
```

## API Contract Summary
The module-owned URL config is the single URL source-of-truth; API services consume these paths. Key declared paths:
- `export const TRAINER_MEMBERS_PAGE_DASHBOARD = '/trainer/dashboard' as const;`
- `export const TRAINER_MEMBERS_PAGE_LIST = '/trainer/members' as const;`
- `export const TRAINER_MEMBERS_PAGE_ADD = '/trainer/members' as const;`
- `export const TRAINER_MEMBERS_API_BASE = '/trainer/members' as const;`
- `export const TRAINER_MEMBERS_API_STATS = '/trainer/trainer_members/stats' as const;`
- `export const TRAINER_MEMBERS_API_GET_ONE = (id: string) => `/trainer/trainer_members/${id}` as const;`
- `export const TRAINER_MEMBERS_API_UPDATE = (id: string) => `/trainer/trainer_members/${id}` as const;`
- `export const TRAINER_MEMBERS_API_NOTES = (id: string) => `/trainer/trainer_members/${id}/notes` as const;`
- `export const TRAINER_MEMBERS_API_ATTENDANCE = (id: string) => `/trainer/trainer_members/${id}/attendance` as const;`
- `export const TRAINER_MEMBERS_API_DIET_PLANS = '/trainer/trainer_library/diet-plans' as const;`
- `export const TRAINER_MEMBERS_API_WORKOUT_PLANS = '/trainer/trainer_workout/workouts' as const;`
- `export const TRAINER_MEMBERS_API_PROGRESS_ENTRIES = (id: string) => `/trainer/trainer_progress_tracking/${id}/entries` as const;`

## State Map
- Server/API state: TanStack Query.
- Shared UI state: module-scoped Zustand where required.
- Private interaction state: local React state.
- URL-backed filters/pagination: URL/search parameters where documented by the feature.

## Permissions
- Trainer role only within `frontend_trainer`; feature must not introduce manager/superadmin business capabilities.
- Business permissions and status mappings remain feature-owned; do not move them into global UI infrastructure.

## External Dependencies
- Approved global/application infrastructure only: API transport, auth/session, logging/error monitoring, routing/runtime plumbing, and zero-business UI primitives.
- Trainer role infrastructure may be consumed through `trainer_infrastructure_*` contracts. No sibling business-module imports are permitted.

## Known Forbidden Patterns
- Do not import sibling feature business code into `trainer_members`.
- Do not hardcode URLs outside the module URL config.
- Do not duplicate server state in Zustand or hardcode business statuses in components/schemas.
- Do not introduce raw theme colors, semantic background opacity modifiers, or non-canonical z-index values.
- Preserve the module theme contract and locale ownership when repairing this feature.
