# profile Backend Feature Map

## Module Purpose
Owns the `profile` Superadmin feature and its frontend-aligned API contract. It keeps validation, business decisions, persistence, and response mapping in separate files so an AI can repair the feature without loading unrelated business modules. All data access uses the project-approved PostgreSQL/TypeORM repository boundary.

The feature's backend route and file structure mirror the frontend feature name. Business logic must remain local to this feature, while only explicitly approved core infrastructure may cross the boundary. Any new endpoint or response field must be reflected in this document in the same change.

## Directory Structure
| File | Responsibility |
|---|---|
| `dtos/profile-create.dto.ts` | Validates one request or response contract at the module edge. |
| `dtos/profile-query.dto.ts` | Validates one request or response contract at the module edge. |
| `dtos/profile-update.dto.ts` | Validates one request or response contract at the module edge. |
| `profile-command.controller.ts` | Exposes the HTTP boundary and forwards requests to one or more local use-case services. |
| `profile-query.controller.ts` | Exposes the HTTP boundary and forwards requests to one or more local use-case services. |
| `profile-special.controller.ts` | Exposes the HTTP boundary and forwards requests to one or more local use-case services. |
| `profile.entity.ts` | Maps one PostgreSQL table or contract-snapshot table to TypeORM. |
| `profile.exceptions.ts` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `profile.mapper.ts` | Translates persistence entities to domain-safe values without leaking ORM concerns. |
| `profile.module.ts` | Registers this feature's controllers, providers, repositories, and TypeORM entities. |
| `profile.repository.ts` | Owns TypeORM queries and intention-revealing persistence mutations for this feature. |
| `profile.seeder.ts` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `profile_backend_feature.md` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `profile_collection.json` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `profile_dependencies.md` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `profile_forbidden.md` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `responses/profile-response.dto.ts` | Validates one request or response contract at the module edge. |
| `services/profile-create.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `services/profile-delete.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `services/profile-find.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `services/profile-list.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `services/profile-main.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `services/profile-password.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `services/profile-two-factor.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `services/profile-update.service.ts` | Owns one focused business use case and contains no ORM query construction. |
| `types/profile.enums.ts` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |
| `types/profile.interfaces.ts` | Documents the feature boundary, dependencies, forbidden operations, or API contract. |

## Feature Inventory
| Controller/Endpoint | HTTP | Path | Purpose | Request DTO | Response DTO |
|---|---|---|---|---|---|
| `profile-command.controller.ts` / `create` | POST | `/superadmin/profile` | Creates a resource after DTO validation and persists it through the feature repository. | `ProfileCreateDto` | `unknown` |
| `profile-command.controller.ts` / `update` | PATCH | `/superadmin/profile/:id` | Updates only the fields permitted by the feature DTO and returns the refreshed resource. | `ProfileUpdateDto` | `unknown` |
| `profile-command.controller.ts` / `remove` | DELETE | `/superadmin/profile/:id` | Soft-deletes the resource and keeps the historical row recoverable. | `None` | `void` |
| `profile-query.controller.ts` / `findOne` | GET | `/superadmin/profile/:id` | Returns one active resource after resource and authorization checks. | `None` | `unknown` |
| `profile-special.controller.ts` / `main` | GET | `/superadmin/profile` | Returns the feature-level frontend contract projection owned by this module. | `None` | `unknown` |
| `profile-special.controller.ts` / `update` | PATCH | `/superadmin/profile` | Updates only the fields permitted by the feature DTO and returns the refreshed resource. | `Record` | `unknown` |
| `profile-special.controller.ts` / `password` | PATCH | `/superadmin/profile/password` | Applies the partial update or state transition exposed by ``/superadmin/profile/password`` after validation, authorization, and named repository mutation. |
| `profile-special.controller.ts` / `twoFactor` | PATCH | `/superadmin/profile/2fa` | Applies the partial update or state transition exposed by ``/superadmin/profile/2fa`` after validation, authorization, and named repository mutation. |

## Approved External Dependencies
- **Business Feature Dependencies**: None by direct business-code import. Runtime event dependencies are documented explicitly below.
- **Infrastructure Dependencies**: Core authentication/authorization, configuration, PostgreSQL/TypeORM repository infrastructure, Redis, response/error infrastructure, observability, and tenant resolution where applicable.
- **Runtime/Event Dependencies**: None unless an event appears in this module's source and dependency document.

## Data and State Architecture
- DB Entities: Every TypeORM entity registered by this module; contract snapshots are stored in explicit PostgreSQL JSONB tables when the frontend contract is snapshot-backed.
- Redis Caching Keys: Only feature-owned operational keys; Idempotency-Key reservations use the core idempotency namespace.
- Event Emitters: Only event names from the centralized registry are permitted.
- Background Jobs: Heavy exports, messaging, backups, migrations, and bulk work are queued where applicable; scheduled work is recorded in the central registry.
- Idempotency Keys: All mutations for which the frontend API exposes `idempotencyKey` are protected by `RequireIdempotencyKey`.

## Business Flow / Key Sequences
1. Controller receives the versioned HTTP request and DTO validation occurs at the global boundary.
2. Controller forwards the validated input to the single owning use-case service.
3. The service performs business decisions and calls named repository operations; ORM details stay behind the repository.
4. Multi-step mutations use the UnitOfWork transaction context, and critical duplicate-prone mutations use Idempotency-Key.
5. The canonical response interceptor wraps successful results; exception filters produce the stable error envelope.

## File Responsibility Map
Controllers own HTTP wiring only; DTOs own edge validation; services own focused business flows; repositories own PostgreSQL queries/mutations; mappers own persistence/domain translation; entities own table mapping; adapters and core services own external/infrastructure integrations. No file may absorb an unrelated feature responsibility.

## Permissions and Security
Every Superadmin business endpoint is protected at controller level with `JwtAuthGuard`, `RolesGuard`, and the `SUPERADMIN` role. Resource-specific endpoints must additionally fail closed when the requested resource is missing, soft-deleted, outside the trusted tenant/resource scope, or otherwise unauthorized.

CODEOWNERS path: `src/modules/backend_superadmin/profile/` -> the Superadmin reviewers defined by `CODEOWNERS`.

## Edge Cases / AI Warnings
- Never add a sibling-feature business import; doing so crosses the AI repair boundary and violates Rules 0B/0C/49.
- Never replace the complete frontend V1 response with a minimal entity DTO; Rule 82A requires every UI-consumed field and semantic grouping to remain intact.
- Never query through a raw TypeORM repository from a service or mutate an ORM entity directly; repository mutation methods are the persistence boundary.
- Never allow a client-supplied tenant ID to select a database before master-database tenant authorization succeeds; Rule 39 requires trusted tenant context first.
- Critical retries, payments, communication sends, and resource-creation mutations must preserve Idempotency-Key behavior when the frontend contract exposes it.

## Frozen API Contract

<!-- Exact source: frontend profile/superadmin_profile_features.md -->

﻿# Superadmin Profile â€” Feature Map

## Module Purpose
The profile module is responsible for the Superadmin business workflow managing Profile. It enables superadmins to view, monitor, and control the lifecycle and configurations of Profile across all SaaS tenants. All related business behavior, API contracts, validation, server-state hooks, fixtures, and MSW handlers are strictly isolated within this feature boundary to prevent cross-tenant or cross-module leakage.

## Directory Structure

| Folder | Responsibility | Key Files |
|---|---|---|
| `profile_api/` | Feature-owned responsibility for profile api. | `SuperadminProfileApi.ts` |
| `profile_components/` | Feature-owned responsibility for profile components. | `(directory present; no direct files)` |
| `profile_mocks/` | Feature-owned responsibility for profile mocks. | `(directory present; no direct files)` |
| `profile_tests/` | Feature-owned responsibility for profile tests. | `SuperadminProfileBasic.test.tsx` |
| `profile_types/` | Feature-owned responsibility for profile types. | `SuperadminProfileAvatarCardTypes.ts`, `SuperadminProfilePersonalFormTypes.ts`, `SuperadminProfileSecurityFormTypes.ts`, `SuperadminProfileTypes.ts` |
| `profile_utils/` | Feature-owned responsibility for profile utils. | `SuperadminProfileConstants.ts`, `SuperadminProfilePersonalFormSchema.ts`, `SuperadminProfileSecurityFormSchema.ts`, `useSuperadminProfilePage.test.tsx`, `useSuperadminProfilePage.ts` |

## Approved External Dependencies

### Application Infrastructure
- `@/app/superadmin/superadmin_components` â€” role-shell/generic interaction infrastructure only.
- `@/lib/*` and `@/components/*` â€” only approved application infrastructure imported by this feature.

### Business Feature Dependencies
- None

### Role-Level Business Dependencies
- None

## Feature Inventory

| Surface | Route | Implemented User Actions | API Boundary | Status |
|---|---|---|---|---|
| Superadmin Profile | `/superadmin/profile` | password submit; submit; toggle2 f a | `SuperadminProfileApi.ts` | Source-verified; host runtime pending |

## User Flows & Interactions

1. Open the /superadmin/profile route to load the Profile data context securely via TanStack Query.
2. Interact with the Profile dashboard using available search, filter, and pagination controls.
3. Execute module-specific CRUD or business mutations (like updating Profile status) through feature-owned API contracts.
4. All mutations trigger optimistic updates or immediate invalidation to reconcile success/error states on the same client surface.

## Verification Notes
- Active route pages mount one primary client tree; no `V1Client` import is mounted from route `page.tsx`.
- Mutable mock-state handlers have reset functions covered by tests where present.
- Deprecated marker-only and JSON-stringify tautology tests were removed from the module test tree.
- Dependency-backed `tsc`, lint, Vitest runtime, Playwright, and real browser responsive execution require the host application environment and remain unverified here.

## Data and State Architecture

- **Actual feature root:** `profile`
- **Server state:** TanStack Query `useQuery` detected.
- **Zustand stores:** None detected.
- **Context files:** None detected.
- **Custom hooks:** `profile_utils/useSuperadminProfilePage.ts`
- **URL state:** No `useUrlState` detected.
- **Observed query keys:** `['superadmin', 'profile']`

## API Contract

- **API files:** `profile_api/SuperadminProfileApi.ts`
- **Detected API symbols:** `fetchProfile` — `profile_api/SuperadminProfileApi.ts`; `updateProfile` — `profile_api/SuperadminProfileApi.ts`; `updatePassword` — `profile_api/SuperadminProfileApi.ts`; `updateTwoFactor` — `profile_api/SuperadminProfileApi.ts`
- **Runtime response validation:** Zod usage detected.

No API field/method is invented where static source did not expose it; missing runtime confirmation remains `NOT VERIFIED`.

## UI Data Requirements

- **Data-bearing components:** `page.tsx`, `profile_components/SuperadminProfileSecurityForm/SuperadminProfileSecurityForm.tsx`, `profile_components/SuperadminProfileAvatarCard/SuperadminProfileAvatarCard.tsx`, `profile_components/SuperadminProfileMain/SuperadminProfileMain.tsx`, `profile_components/SuperadminProfilePersonalForm/SuperadminProfilePersonalForm.tsx`
- **Approved formatting evidence:** No approved global formatting helper detected.
- **Approved date/time evidence:** No `date-fns`/`dayjs` usage detected.
- **Forms detected:** 2

Exact field-to-response mapping must use the feature's actual API types/schema/fixture contract; the audit never invents fields merely to fill documentation.

## Permissions and Security

- **Permission symbols detected:** No explicit module permission symbols detected.
- **Destructive-confirmation evidence:** No `useConfirm` detected.
- **Mutation boundary:** TanStack Query `useMutation` is used for async mutations; loading comes from mutation state.
- **Cross-feature dependency rule:** no sibling business feature imports are permitted unless explicitly documented as approved infrastructure.

## Loading, Empty, and Error States

- **`loading.tsx`:** `loading.tsx`
- **`error.tsx`:** `error.tsx`
- **Empty-state components:** None detected.
- Source inspection alone does not prove browser runtime behavior; retry/focus/animation behavior remains `NOT VERIFIED` until the host app is executed.

## Component Responsibility Map

| Component File | Responsibility evidence |
|---|---|
| `page.tsx` | Pure Server Component entry point for /superadmin/profile. |
| `profile_components/SuperadminProfileSecurityForm/SuperadminProfileSecurityForm.tsx` | Security settings form — change password and toggle 2FA. |
| `profile_components/SuperadminProfileAvatarCard/SuperadminProfileAvatarCard.tsx` | Displays the superadmin's avatar, name, role badge, and last login info. |
| `profile_components/SuperadminProfileMain/SuperadminProfileMain.tsx` | Root client orchestrator for the Superadmin Profile page. |
| `profile_components/SuperadminProfilePersonalForm/SuperadminProfilePersonalForm.tsx` | Form for updating the superadmin's personal profile fields. |

## Repository-Verified Repair Notes

This addendum is generated from the current source tree and exists to make future AI context self-contained. It records actual source evidence and explicitly leaves unavailable runtime facts as `NOT VERIFIED`.


## Edge Cases and AI Warnings
- **Strict Isolation**: Never import admin or manager components into profile.
- **Destructive Actions**: Any deletion or modification of profile records must use the Superadmin confirmation provider.
- **Data Leakage**: Ensure API payloads for profile do not expose cross-tenant sensitive data.

## Rule Compliance Checklist
- [x] Canonical feature-owned API/type directories are used.
- [x] No active route page mounts a parallel `V1Client` tree.
- [x] Module-owned mock reset coverage is present where mutable handlers exist.
- [x] Feature docs contain a concrete directory map and compliance checklist.
- [x] No marker-only or JSON-stringify tautology test remains.
- [ ] Host dependency-backed build/lint/runtime verification â€” unavailable in source-only package.

## Rule Compliance Checklist


- [x] Rule 7: TypeORM is the only approved ORM in this backend.
- [x] Rule 19: This feature document contains concrete endpoints, state, flows, permissions, edge cases, and contract evidence.
- [x] Rule 28: Successful responses are wrapped by the global response interceptor.
- [x] Rule 29: Delete paths use soft-delete semantics.
- [x] Rule 31: Frontend-exposed critical mutations use `RequireIdempotencyKey`.
- [x] Rule 48: Query and command controllers are physically separated where CRUD endpoints exist.
- [x] Rule 62: Service/repository return types are explicit.
- [x] Rule 76/79: Responsibility/Flow headers exist on authored source files.
- [x] Rule 82A: V1 response classes preserve the complete frontend contract.
- [x] Rule 83: RBAC is enforced at the controller boundary.
- [x] Rule 89: ORM access stays behind repositories.
- [x] Rule 92: Dynamic filtering/sorting uses server-defined allowlists.
- [x] Rule 101: Tests must assert observable behavior; placeholder tests are not accepted.

