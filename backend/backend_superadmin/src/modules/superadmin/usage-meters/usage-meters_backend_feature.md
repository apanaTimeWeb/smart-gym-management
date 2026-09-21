# usage-meters Backend Feature Map

## Module Purpose
This feature owns the Superadmin backend capability represented by the matching frontend route slice.

This document is intentionally feature-local so an AI can modify this feature without loading sibling business modules. All persistence is PostgreSQL through the project-approved TypeORM repository boundary, and all externally visible responses pass through the canonical response envelope.

## Directory Structure
| File | Responsibility |
|---|---|
| `dtos/usage-meters-create.dto.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `dtos/usage-meters-query.dto.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `dtos/usage-meters-update.dto.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `responses/usage-meters-response.dto.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `services/usage-meters-create.service.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `services/usage-meters-delete.service.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `services/usage-meters-find.service.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `services/usage-meters-list.service.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `services/usage-meters-main.service.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `services/usage-meters-update.service.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `types/usage-meters.enums.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `types/usage-meters.interfaces.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `usage-meters-command.controller.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `usage-meters-query.controller.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `usage-meters-special.controller.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `usage-meters.entity.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `usage-meters.exceptions.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `usage-meters.mapper.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `usage-meters.module.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `usage-meters.repository.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `usage-meters.seeder.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |

## Feature Inventory
| Controller/Endpoint | HTTP | Path | Purpose | Request DTO | Response DTO |
|---|---|---|---|---|---|
| `usage-meters-command.controller.ts` | POST | `/superadmin/usage-meters` | Implements the `POST /superadmin/usage-meters` contract for this feature. | DTO validated at controller boundary | Feature response contract |
| `usage-meters-command.controller.ts` | PATCH | `/superadmin/usage-meters:id` | Implements the `PATCH /superadmin/usage-meters:id` contract for this feature. | DTO validated at controller boundary | Feature response contract |
| `usage-meters-command.controller.ts` | DELETE | `/superadmin/usage-meters:id` | Implements the `DELETE /superadmin/usage-meters:id` contract for this feature. | DTO validated at controller boundary | Feature response contract |
| `usage-meters-query.controller.ts` | GET | `/superadmin/usage-meters:id` | Implements the `GET /superadmin/usage-meters:id` contract for this feature. | DTO validated at controller boundary | Feature response contract |
| `usage-meters-special.controller.ts` | GET | `superadmin/usage-meters` | Implements the `GET superadmin/usage-meters` contract for this feature. | DTO validated at controller boundary | Feature response contract |
## Approved External Dependencies
- **Business Feature Dependencies**: None by direct import. Cross-feature runtime coupling must use registered events.
- **Infrastructure Dependencies**: Core configuration, authentication/authorization, PostgreSQL/TypeORM, Redis where applicable, canonical response/error infrastructure.
- **Runtime/Event Dependencies**: Only events explicitly listed in this feature's dependency document.

## Data and State Architecture
- DB Entities: Listed directly by the feature module and TypeORM registration.
- Redis Caching Keys: Feature-specific keys only; no global business cache helper.
- Event Emitters: Only centralized registry names.
- Background Jobs: Only named queue work documented by this feature.
- Idempotency Keys: Required for applicable resource/financial/communication mutations.

## Business Flow / Key Sequences
For each mutation, the controller validates the request, the use-case service applies business rules, the repository owns PostgreSQL mutation/query details, and the mapper/response DTO exposes only contract-approved fields. Heavy work is queued rather than performed in the HTTP request.

## File Responsibility Map
Every file has one responsibility. Controllers own HTTP wiring only; DTOs own edge validation; services own use-case decisions; repositories own ORM access; mappers own domain/response translation; adapters own external APIs.

## Permissions and Security
All Superadmin endpoints require the Superadmin role at the controller boundary. Resource-specific operations must additionally verify the requested resource belongs to the authorized scope before performing mutations.

## Edge Cases / AI Warnings
- Cross-feature direct business imports violate the feature write boundary and can introduce hidden coupling — see Rules 0B/0C and Rule 49.
- DTO acceptance does not prove behavior; every accepted field must reach the intended use case and persistence/query path — see Rule 82A.
- Soft-deleted records must never silently reappear in standard reads — see Rule 29.
- User-controlled sorting/filtering must resolve only through allowlists — see Rule 92.

## Frozen API Contract

<!-- Exact source: frontend usage-meters/superadmin_usage-meters_features.md -->

﻿# Superadmin Usage Meters â€” Feature Map

## Module Purpose
The usage-meters module is responsible for the Superadmin business workflow managing Usage Meters. It enables superadmins to view, monitor, and control the lifecycle and configurations of Usage Meters across all SaaS tenants. All related business behavior, API contracts, validation, server-state hooks, fixtures, and MSW handlers are strictly isolated within this feature boundary to prevent cross-tenant or cross-module leakage.

## Directory Structure

| Folder | Responsibility | Key Files |
|---|---|---|
| `usage-meters_api/` | Feature-owned responsibility for usage-meters api. | `SuperadminUsageMetersApi.ts` |
| `usage-meters_components/` | Feature-owned responsibility for usage-meters components. | `SuperadminUsageMetersClient.tsx` |
| `usage-meters_mocks/` | Feature-owned responsibility for usage-meters mocks. | `(directory present; no direct files)` |
| `usage-meters_tests/` | Feature-owned responsibility for usage-meters tests. | `SuperadminUsage-metersBasic.test.tsx` |
| `usage-meters_types/` | Feature-owned responsibility for usage-meters types. | `SuperadminUsageMetersTypes.ts` |
| `usage-meters_utils/` | Feature-owned responsibility for usage-meters utils. | `SuperadminUsageMetersConstants.ts`, `SuperadminUsageMetersUtils.ts`, `useSuperadminUsageMetersPage.ts` |

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
| Superadmin Usage Meters | `/superadmin/usage-meters` | view the module surface; use the documented filters and controls; open supported detail/edit surfaces | `SuperadminUsageMetersApi.ts` | Source-verified; host runtime pending |

## User Flows & Interactions

1. Open the /superadmin/usage-meters route to load the Usage Meters data context securely via TanStack Query.
2. Interact with the Usage Meters dashboard using available search, filter, and pagination controls.
3. Execute module-specific CRUD or business mutations (like updating Usage Meters status) through feature-owned API contracts.
4. All mutations trigger optimistic updates or immediate invalidation to reconcile success/error states on the same client surface.

## Verification Notes
- Active route pages mount one primary client tree; no `V1Client` import is mounted from route `page.tsx`.
- Mutable mock-state handlers have reset functions covered by tests where present.
- Deprecated marker-only and JSON-stringify tautology tests were removed from the module test tree.
- Dependency-backed `tsc`, lint, Vitest runtime, Playwright, and real browser responsive execution require the host application environment and remain unverified here.

## Data and State Architecture

- **Actual feature root:** `usage-meters`
- **Server state:** TanStack Query `useQuery` detected.
- **Zustand stores:** None detected.
- **Context files:** None detected.
- **Custom hooks:** `usage-meters_utils/useSuperadminUsageMetersPage.ts`
- **URL state:** `useUrlState` detected.
- **Observed query keys:** `['superadmin', 'usage-meters', params]`

## API Contract

- **API files:** `usage-meters_api/SuperadminUsageMetersApi.ts`
- **Detected API symbols:** `fetchUsageMeters` — `usage-meters_api/SuperadminUsageMetersApi.ts`
- **Runtime response validation:** Zod usage detected.

No API field/method is invented where static source did not expose it; missing runtime confirmation remains `NOT VERIFIED`.

## UI Data Requirements

- **Data-bearing components:** `page.tsx`, `usage-meters_components/SuperadminUsageMetersClient.tsx`, `usage-meters_components/SuperadminUsageMetersEmptyState/SuperadminUsageMetersEmptyState.tsx`
- **Approved formatting evidence:** approved `formatCurrencyFromMinorUnits`/`formatNumber` usage detected.
- **Approved date/time evidence:** No `date-fns`/`dayjs` usage detected.
- **Forms detected:** 0

Exact field-to-response mapping must use the feature's actual API types/schema/fixture contract; the audit never invents fields merely to fill documentation.

## Permissions and Security

- **Permission symbols detected:** No explicit module permission symbols detected.
- **Destructive-confirmation evidence:** No `useConfirm` detected.
- **Mutation boundary:** No direct TanStack Query `useMutation` usage detected.
- **Cross-feature dependency rule:** no sibling business feature imports are permitted unless explicitly documented as approved infrastructure.

## Loading, Empty, and Error States

- **`loading.tsx`:** `loading.tsx`
- **`error.tsx`:** `error.tsx`
- **Empty-state components:** `usage-meters_components/SuperadminUsageMetersEmptyState/SuperadminUsageMetersEmptyState.tsx`
- Source inspection alone does not prove browser runtime behavior; retry/focus/animation behavior remains `NOT VERIFIED` until the host app is executed.

## Component Responsibility Map

| Component File | Responsibility evidence |
|---|---|
| `page.tsx` | Renders the page component. |
| `usage-meters_components/SuperadminUsageMetersClient.tsx` | Renders the Superadmin feature UI for SuperadminUsageMetersClient. Owns presentation and user interaction orchestration only; business data access remains in the feature API/query layer. |
| `usage-meters_components/SuperadminUsageMetersEmptyState/SuperadminUsageMetersEmptyState.tsx` | Renders the empty state UI for the Usage Meters table when no data is available. |

## Repository-Verified Repair Notes

This addendum is generated from the current source tree and exists to make future AI context self-contained. It records actual source evidence and explicitly leaves unavailable runtime facts as `NOT VERIFIED`.


## Edge Cases and AI Warnings
- **Strict Isolation**: Never import admin or manager components into usage-meters.
- **Destructive Actions**: Any deletion or modification of usage-meters records must use the Superadmin confirmation provider.
- **Data Leakage**: Ensure API payloads for usage-meters do not expose cross-tenant sensitive data.

## Rule Compliance Checklist
- [x] Canonical feature-owned API/type directories are used.
- [x] No active route page mounts a parallel `V1Client` tree.
- [x] Module-owned mock reset coverage is present where mutable handlers exist.
- [x] Feature docs contain a concrete directory map and compliance checklist.
- [x] No marker-only or JSON-stringify tautology test remains.
- [ ] Host dependency-backed build/lint/runtime verification â€” unavailable in source-only package.

## Rule Compliance Checklist


- [ ] Rule 7: TypeORM is the sole approved ORM.
- [ ] Rule 19: This document is updated with module code changes.
- [ ] Rule 28: Canonical response envelope is global and automatic.
- [ ] Rule 29: Soft deletes only.
- [ ] Rule 31: Idempotency for applicable critical mutations.
- [ ] Rule 34: N+1/index review for required relations and filters.
- [ ] Rule 36: Fail-fast null/constraint checks.
- [ ] Rule 41: Concurrency protection where state is contested.
- [ ] Rule 48: Query/command controller separation.
- [ ] Rule 62: Explicit return types.
- [ ] Rule 76/79/80: Responsibility/flow comments and JSDoc.
- [ ] Rule 82A: Complete frontend UI data contract.
- [ ] Rule 83: RBAC at controller layer.
- [ ] Rule 86/87: Intention-revealing names and small single-responsibility methods.
- [ ] Rule 89: ORM entities stay behind repositories.
- [ ] Rule 92: Query allowlists.

