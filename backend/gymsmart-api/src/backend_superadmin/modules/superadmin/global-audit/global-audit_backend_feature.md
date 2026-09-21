# global-audit Backend Feature Map

## Module Purpose
This feature owns the Superadmin backend capability represented by the matching frontend route slice.

This document is intentionally feature-local so an AI can modify this feature without loading sibling business modules. All persistence is PostgreSQL through the project-approved TypeORM repository boundary, and all externally visible responses pass through the canonical response envelope.

## Directory Structure
| File | Responsibility |
|---|---|
| `dtos/global-audit-create.dto.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `dtos/global-audit-query.dto.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `dtos/global-audit-update.dto.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `global-audit-command.controller.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `global-audit-contract-snapshot.entity.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `global-audit-contract-snapshot.repository.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `global-audit-query.controller.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `global-audit-special.controller.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `global-audit.constants.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `global-audit.entity.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `global-audit.exceptions.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `global-audit.mapper.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `global-audit.module.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `global-audit.repository.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `global-audit.seeder.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `responses/global-audit-response.dto.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `services/global-audit-create.service.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `services/global-audit-delete.service.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `services/global-audit-find.service.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `services/global-audit-investigation.service.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `services/global-audit-list.service.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `services/global-audit-update.service.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `types/global-audit.enums.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |
| `types/global-audit.interfaces.ts` | Owns the single business or infrastructure responsibility encoded by its filename. It must not absorb unrelated feature behavior. |

## Feature Inventory
| Controller/Endpoint | HTTP | Path | Purpose | Request DTO | Response DTO |
|---|---|---|---|---|---|
| `global-audit-command.controller.ts` | POST | `/superadmin/global-audit` | Implements the `POST /superadmin/global-audit` contract for this feature. | DTO validated at controller boundary | Feature response contract |
| `global-audit-command.controller.ts` | PATCH | `/superadmin/global-audit:id` | Implements the `PATCH /superadmin/global-audit:id` contract for this feature. | DTO validated at controller boundary | Feature response contract |
| `global-audit-command.controller.ts` | DELETE | `/superadmin/global-audit:id` | Implements the `DELETE /superadmin/global-audit:id` contract for this feature. | DTO validated at controller boundary | Feature response contract |
| `global-audit-query.controller.ts` | GET | `/superadmin/global-audit` | Implements the `GET /superadmin/global-audit` contract for this feature. | DTO validated at controller boundary | Feature response contract |
| `global-audit-query.controller.ts` | GET | `/superadmin/global-audit:id` | Implements the `GET /superadmin/global-audit:id` contract for this feature. | DTO validated at controller boundary | Feature response contract |
| `global-audit-special.controller.ts` | GET | `superadmin/global-audit/investigation` | Implements the `GET superadmin/global-audit/investigation` contract for this feature. | DTO validated at controller boundary | Feature response contract |
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

<!-- Exact source: frontend global-audit/superadmin_global-audit_features.md -->

﻿# Superadmin Global Audit â€” Feature Map

## Module Purpose
The global-audit module is responsible for the Superadmin business workflow managing Global Audit. It enables superadmins to view, monitor, and control the lifecycle and configurations of Global Audit across all SaaS tenants. All related business behavior, API contracts, validation, server-state hooks, fixtures, and MSW handlers are strictly isolated within this feature boundary to prevent cross-tenant or cross-module leakage.

## Directory Structure

| Folder | Responsibility | Key Files |
|---|---|---|
| `global-audit_api/` | Feature-owned responsibility for global-audit api. | `SuperadminGlobalAuditApi.ts`, `SuperadminGlobalAuditInvestigationApi.ts` |
| `global-audit_mocks/` | Feature-owned responsibility for global-audit mocks. | `(directory present; no direct files)` |
| `global-audit_tests/` | Feature-owned responsibility for global-audit tests. | `SuperadminGlobal-auditBasic.test.tsx`, `SuperadminGlobalAuditInvestigation.test.ts` |
| `global-audit_types/` | Feature-owned responsibility for global-audit types. | `SuperadminGlobalAuditFilterTypes.ts`, `SuperadminGlobalAuditTypes.ts`, `SuperadminGlobalAuditV1Types.ts` |
| `global-audit_utils/` | Feature-owned responsibility for global-audit utils. | `SuperadminGlobalAuditConstants.ts`, `useSuperadminGlobalAuditData.ts`, `useSuperadminGlobalAuditV1.ts` |
| `global_audit_utils/` | Feature-owned responsibility for global audit utils. | `SuperadminGlobalAuditStatusBadgeConfig.ts` |

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
| Superadmin Global Audit | `/superadmin/global-audit` | view the module surface; use the documented filters and controls; open supported detail/edit surfaces | `SuperadminGlobalAuditInvestigationApi.ts`, `SuperadminGlobalAuditApi.ts` | Source-verified; host runtime pending |

## User Flows & Interactions

1. Open the /superadmin/global-audit route to load the Global Audit data context securely via TanStack Query.
2. Interact with the Global Audit dashboard using available search, filter, and pagination controls.
3. Execute module-specific CRUD or business mutations (like updating Global Audit status) through feature-owned API contracts.
4. All mutations trigger optimistic updates or immediate invalidation to reconcile success/error states on the same client surface.

## Verification Notes
- Active route pages mount one primary client tree; no `V1Client` import is mounted from route `page.tsx`.
- Mutable mock-state handlers have reset functions covered by tests where present.
- Deprecated marker-only and JSON-stringify tautology tests were removed from the module test tree.
- Dependency-backed `tsc`, lint, Vitest runtime, Playwright, and real browser responsive execution require the host application environment and remain unverified here.

## Data and State Architecture

- **Actual feature root:** `global-audit`
- **Server state:** TanStack Query `useQuery` detected.
- **Zustand stores:** None detected.
- **Context files:** None detected.
- **Custom hooks:** `global-audit_utils/useSuperadminGlobalAuditV1.ts`, `global-audit_utils/useSuperadminGlobalAuditData.ts`
- **URL state:** `useUrlState` detected.
- **Observed query keys:** `['superadmin', 'global_audit_investigation']`, `['superadmin', 'global-audit', queryParams]`

## API Contract

- **API files:** `global-audit_api/SuperadminGlobalAuditInvestigationApi.ts`, `global-audit_api/SuperadminGlobalAuditApi.ts`
- **Detected API symbols:** `fetchGlobalAuditInvestigation` — `global-audit_api/SuperadminGlobalAuditInvestigationApi.ts`; `fetchGlobalLogs` — `global-audit_api/SuperadminGlobalAuditApi.ts`
- **Runtime response validation:** Zod usage detected.

No API field/method is invented where static source did not expose it; missing runtime confirmation remains `NOT VERIFIED`.

## UI Data Requirements

- **Data-bearing components:** `page.tsx`, `global-audit_components/SuperadminGlobalAuditV1SuspiciousActivityPanel.tsx`, `global-audit_components/SuperadminGlobalAuditClient.tsx`, `global-audit_components/SuperadminGlobalAuditV1BeforeAndAfterChangesPanel.tsx`, `global-audit_components/SuperadminGlobalAuditV1InvestigationSummaryCards.tsx`
- **Approved formatting evidence:** No approved global formatting helper detected.
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
- **Empty-state components:** None detected.
- Source inspection alone does not prove browser runtime behavior; retry/focus/animation behavior remains `NOT VERIFIED` until the host app is executed.

## Component Responsibility Map

| Component File | Responsibility evidence |
|---|---|
| `page.tsx` | Server component entry point for the Superadmin Global Audit module. |
| `global-audit_components/SuperadminGlobalAuditV1SuspiciousActivityPanel.tsx` | Renders the Superadmin global-audit V1 Suspicious activity view. |
| `global-audit_components/SuperadminGlobalAuditClient.tsx` | Renders the Global Audit Logs dashboard for superadmins to monitor system-wide security events. |
| `global-audit_components/SuperadminGlobalAuditV1BeforeAndAfterChangesPanel.tsx` | Renders the Superadmin global-audit V1 Before & after changes view. |
| `global-audit_components/SuperadminGlobalAuditV1InvestigationSummaryCards.tsx` | Provides working risk/filter selection for the Superadmin audit-investigation insight view. |

## Repository-Verified Repair Notes

This addendum is generated from the current source tree and exists to make future AI context self-contained. It records actual source evidence and explicitly leaves unavailable runtime facts as `NOT VERIFIED`.


## Edge Cases and AI Warnings
- **Strict Isolation**: Never import admin or manager components into global-audit.
- **Destructive Actions**: Any deletion or modification of global-audit records must use the Superadmin confirmation provider.
- **Data Leakage**: Ensure API payloads for global-audit do not expose cross-tenant sensitive data.

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

