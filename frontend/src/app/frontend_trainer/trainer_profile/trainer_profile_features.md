# trainer_profile — Feature Map (v8-fix)

## Module Purpose
The Profile module lets a trainer view and update their own profile details and change their password. The feature uses React Hook Form and Zod for non-trivial form validation and protects unsaved changes during navigation. Successful writes reconcile the Query cache from the authoritative backend response and show the backend message. Editing another user's profile or role-level authentication administration is outside this module.

## Dependency Manifest
**Approved application/role infrastructure:** `@/lib/api`, approved `trainer_infrastructure/*` shell/feedback/realtime/guard primitives, and framework routing/runtime facilities required by the host.
**Feature-local utilities:** numeric/date/currency/null/masking formatters are kept inside `trainer_profile_utils/`; no module imports `@/lib/formatters`.
**Direct third-party packages detected in feature source:** @hookform/resolvers, @tanstack/react-query, @testing-library/jest-dom, @testing-library/react, @testing-library/user-event, http-status-codes, lucide-react, msw, next, next-intl, react, react-hook-form, vitest, zod.
**Sibling business-module dependencies:** None identified in feature source.

## Feature Lifecycle Contract
Feature lifecycle follows the documented list/detail → action/form → validated API mutation → TanStack Query reconciliation → visible result pattern.
Expected public route contract: `/trainer/profile`. The physical Next.js `page.tsx/loading.tsx/error.tsx/not-found.tsx` files are now inside this canonical feature module. Public URL rewrites/mounting in the host application are outside the supplied archive and therefore remain host-scope verification.

## Directory Structure
```text
trainer_profile/
├── error.tsx
├── loading.tsx
├── not-found.tsx
├── page.tsx
├── trainer_profile_api/
├──   TrainerProfileApi.ts
├──   TrainerProfileApiBehavior.test.ts
├── trainer_profile_components/
├──   trainer_profile_loading_skeleton/
├──     TrainerProfileLoadingSkeleton.tsx
├──   trainer_profile_main/
├──     TrainerProfileMain.tsx
├──     TrainerProfileMainBehavior.test.tsx
├──   trainer_profile_not_found_view/
├──     TrainerProfileNotFoundView.tsx
├── trainer_profile_constants/
├──   TrainerProfileConstants.test.ts
├──   TrainerProfileConstants.ts
├──   TrainerProfileQueryKeys.ts
├── trainer_profile_features.md
├── trainer_profile_forbidden.md
├── trainer_profile_hooks/
├──   useTrainerProfileLogic.test.ts
├──   useTrainerProfileLogic.ts
├──   useTrainerProfileMutations.test.ts
├──   useTrainerProfileMutations.ts
├── trainer_profile_locales/
├──   trainer_profile_en.json
├──   trainer_profile_hi.json
├── trainer_profile_mocks/
├──   trainer_profile_fixtures/
├──     TrainerProfileMockData.ts
├──   trainer_profile_handlers/
├──     TrainerProfileMockHandlers.ts
├── trainer_profile_schemas/
├──   TrainerProfileApiSchema.ts
├──   TrainerProfileSchema.ts
├── trainer_profile_tests/
├──   TrainerProfileRouteStates.test.tsx
├── trainer_profile_theme_contract.md
├── trainer_profile_types/
├──   TrainerProfileMutationTypes.ts
├──   TrainerProfileTypes.ts
└── trainer_profile_url_config.ts
```

Root files are intentionally limited to framework-reserved route files and module documentation. All business/config/schema/query/api artifacts are inside their role+module-prefixed subfolders.

## Approved External Dependencies
- Application infrastructure: approved global API transport, auth/session plumbing, global logging/error monitoring, and zero-business UI/shell primitives.
- Role infrastructure: `trainer_infrastructure_*` zero-business shell/feedback/realtime/guard facilities.
- Business Feature Dependencies: None.

## Feature Inventory
| Feature | Route | API | Status |
|---|---|---|---|
| View profile | `/trainer/profile` | `GET /trainer/profile` | Live via API/MSW |
| Edit personal info | `/trainer/profile` | `PATCH /trainer/profile` | Live via API/MSW |
| Change password | `/trainer/profile` | `PATCH /trainer/trainer_profile/password` | Live via API/MSW |

## User Flows & Interactions
All discovered actionable controls are recorded in the v8-fix actionable-control matrix. Important flows are verified through their module-owned hooks, mutations, MSW handlers, and co-located tests.

## Data & State Architecture
- Server/API state → TanStack Query only.
- UI-only shared state → module-scoped Zustand where required.
- Private UI state → local React state.
- URL/filter/search/pagination state → URL/query parameters where the feature documents those interactions.
- API responses are validated at the feature API boundary with Zod.

## API Contract
| Function | Method | Endpoint | Request | Response |
|---|---|---|---|---|
| `fetchTrainerProfile()` | GET | `/trainer/profile` | — | `TrainerProfile` |
| `updateTrainerProfile(dto)` | PATCH | `/trainer/profile` | `UpdateTrainerProfileDto` | `TrainerProfile` |
| `changeTrainerPassword(dto)` | PATCH | `/trainer/trainer_profile/password` | `ChangePasswordDto` | mutation envelope/message |

## UI Data Requirements
| UI element | Field | Source |
|---|---|---|
| Name | `name` | profile response |
| Email | `email` | profile response |
| Phone | `phone` | profile response/form |
| Specializations | `specialization[]` | profile response/form constants |
| Password status | backend `message` | password mutation response |

## Permissions and Security
- Required capability: `trainer.view`.
- Profile access is self-scoped to the authenticated Trainer.
- Password mutation is a protected security-sensitive action and must never expose credentials or raw API errors.
- Frontend visibility does not replace backend authorization.

## Loading, Empty, and Error States
- Route `loading.tsx` provides profile-shaped skeleton UI.
- Profile query failure is rendered through a safe route/section error state.
- Mutation states disable submit buttons and preserve drafts on failure.

## Edge Cases and AI Warnings
- **Password fields stay hidden by default:** Use the Eye/EyeOff toggle rather than exposing plaintext.
- **Dirty form protection:** Profile forms use `useTrainerUnsavedChangesGuard(isDirty)` for browser exits and approved navigation callbacks.
- **Failed mutation:** Preserve entered form data on failure; reset only after a successful response.
- **Email is read-only:** Do not add an email-update control to this module.
- **Sensitive error messages:** Show the standardized backend `message`; never expose raw response objects or credentials.

## Component Responsibility Map
| Component | Responsibility |
|---|---|
| `TrainerProfileMain.tsx` | Renders personal/security forms and delegates data/validation/mutations. |

## Current v8-fix Architecture Evidence
- Route files owned by the feature: not-found.tsx, error.tsx, page.tsx, loading.tsx.
- Query files: TrainerProfileQueryKeys.ts, useTrainerProfileMutations.ts.
- Hook files: useTrainerProfileLogic.test.ts, useTrainerProfileLogic.ts.
- Constants: TrainerProfileConstants.test.ts, TrainerProfileConstants.ts.
- Schemas: TrainerProfileApiSchema.ts, TrainerProfileSchema.ts.
- Types: TrainerProfileMutationTypes.ts, TrainerProfileTypes.ts.
- Locales: en.json, hi.json.
- Utils: None.
- Module-owned tests: 6 files.
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
- `/trainer/profile` → `page.tsx` (canonical route owner).
- Route lifecycle files (`page.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`) are physically owned by this feature module.

## User Flows
1. Enter the feature route and load server-backed data.
2. Use documented search/filter/detail controls.
3. Submit a create/update/action form after feature validation.
4. Execute the mutation with its idempotency contract.
5. Reconcile TanStack Query and surface backend success/error feedback.

## Component Tree
```text
trainer_profile/
  page.tsx
  trainer_profile_components/
    trainer_profile_loading_skeleton/
      TrainerProfileLoadingSkeleton.tsx
    trainer_profile_main/
      TrainerProfileMain.tsx
    trainer_profile_not_found_view/
      TrainerProfileNotFoundView.tsx
```

## API Contract Summary
The module-owned URL config is the single URL source-of-truth; API services consume these paths. Key declared paths:
- `export const TRAINER_PROFILE_PAGE_DASHBOARD = '/trainer/dashboard' as const;`
- `export const TRAINER_PROFILE_PAGE_LIST = '/trainer/profile' as const;`
- `export const TRAINER_PROFILE_API_PROFILE = '/trainer/profile' as const;`
- `export const TRAINER_PROFILE_API_PASSWORD = '/trainer/trainer_profile/password' as const;`

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
- Do not import sibling feature business code into `trainer_profile`.
- Do not hardcode URLs outside the module URL config.
- Do not duplicate server state in Zustand or hardcode business statuses in components/schemas.
- Do not introduce raw theme colors, semantic background opacity modifiers, or non-canonical z-index values.
- Preserve the module theme contract and locale ownership when repairing this feature.
