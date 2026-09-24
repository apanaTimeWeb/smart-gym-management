# System Ops Container Backend Feature Map

## Module Purpose

This module is the role-level container for the Superadmin system-operations capability set, including backups, infrastructure, jobs, migrations, and the aggregate system-ops summary. It exists to document the ownership boundary and cross-feature composition without moving business logic into the container itself. The contained feature modules remain the AI repair units, and this document must never be treated as a permission to bypass those feature boundaries.

## Directory Structure

| File / Submodule | Responsibility |
|---|---|
| `backups/` | Owns backup lifecycle APIs, persistence, download, restore, scheduling, and health checks. |
| `infrastructure/` | Owns infrastructure status, telemetry, and Redis administration capabilities. |
| `jobs/` | Owns background-job inspection and administrative job actions. |
| `migrations/` | Owns migration status and administrative migration operations. |
| `superadmin-system-ops-summary-query.controller.ts` | Exposes the aggregate system-ops summary without moving sub-feature business logic into this container. |

## Feature Inventory

| Controller/Endpoint | HTTP | Path | Purpose | Request DTO | Response DTO |
|---|---|---|---|---|---|
| `backups/*` | mixed | `/superadmin/system-ops/backups/*` | Backup operations remain owned by the backups feature module and are not implemented in this container. | feature-local DTOs | feature-local response DTOs |
| `infrastructure/*` | mixed | `/superadmin/system-ops/infrastructure/*` | Infrastructure operations remain owned by the infrastructure feature module and are not implemented in this container. | feature-local DTOs | feature-local response DTOs |
| `jobs/*` | mixed | `/superadmin/system-ops/jobs/*` | Job administration remains owned by the jobs feature module and is exposed through its controllers. | feature-local DTOs | feature-local response DTOs |
| `migrations/*` | mixed | `/superadmin/system-ops/migrations/*` | Migration operations remain owned by the migrations feature module and are exposed through its controllers. | feature-local DTOs | feature-local response DTOs |
| `summary` | GET | `/superadmin/system-ops/summary` | Returns an aggregate operational snapshot assembled from the container's approved system-ops read path. | `—` | documented by controller contract |

## Approved External Dependencies

- **Business Feature Dependencies**: Only explicit system-ops sub-features documented in their own `_dependencies.md` files.
- **Infrastructure Dependencies**: central authentication, cache, database, observability, pagination, and tenancy infrastructure where explicitly imported by the owning sub-feature.
- **Runtime/Event Dependencies**: None statically identified at the container level.

## Data and State Architecture

- DB Entities: Owned by backups, infrastructure, jobs, and migrations feature modules; no container-level ORM entity is introduced solely for composition.
- Redis Caching Keys: none statically identified at container level.
- Event Emitters: none statically identified at container level.
- Background Jobs: queue/job behavior is owned and documented by the jobs feature.
- Idempotency Keys: mutation endpoints remain owned by their feature controllers and must enforce the authoritative idempotency rule.

## Business Flow / Key Sequences

1. A request enters the appropriate system-ops feature controller.
2. The global validation/authentication/authorization boundary executes before the feature use case.
3. The owning feature service performs the focused operation and uses its repository/data-access boundary.
4. Transactions, idempotency, audit, cache invalidation, and side effects are handled by the owning feature according to its documented contract.
5. The canonical response interceptor/exception filters produce the final API envelope.

## File Responsibility Map

Each contained feature owns its own controllers, DTOs, services, repositories, entities, mappings, jobs, and documentation. The container document records composition only and MUST NOT become a shared business-logic location. Cross-feature direct business imports remain prohibited unless explicitly permitted by the architecture's event/runtime dependency rules.

## Permissions and Security

Every system-ops endpoint requires the Superadmin role through the controller-layer guard chain where the actual controller declares it. Resource-level and tenant checks remain feature-specific and must be verified against each contained feature's implementation.

## Edge Cases / AI Warnings

- Do not move backup, infrastructure, job, or migration business logic into this container; doing so violates the feature-module repair boundary (Rules 0A-0C).
- Do not bypass controller-layer RBAC with service-level role checks; authorization must remain explicit at the controller boundary (Rule 83).
- Do not create a single aggregate “mega” API that merges unrelated system-ops widgets; dashboard/API fragmentation must follow Rule 123 where applicable.
- Do not add cross-feature direct business imports merely to reuse helpers; module-local duplication is preferred over shared business utilities (Rule 8C / Rule 69).

## Frozen API Contract

### Request Shape

The container itself owns no mutable request body contract. Endpoint request shapes are frozen in the individual backups, infrastructure, jobs, and migrations feature documents.

### Response Shape

The summary endpoint must follow the canonical response envelope and its controller-declared response DTO/shape. Contained feature endpoints must follow their own frozen contracts.

### UI-Required Fields

The aggregate summary must return every field actually consumed by the Superadmin system-ops UI; detailed widget data remains owned by the corresponding sub-feature endpoints.

### Pagination / Error Contract

Pagination applies only where an individual sub-feature exposes a paginated collection. Validation failures use the canonical validation error envelope; domain failures use the documented machine-readable error code contract.

## Rule Compliance Checklist

- [ ] Rule 82A: summary and widget response contracts contain complete frontend-required fields.
- [ ] Rule 83: RBAC is enforced at each controller layer.
- [ ] Rule 87: feature services remain single-purpose and within method/file limits.
- [ ] Rule 123: dashboard-facing aggregate data is not expanded into a mega API.
- [ ] Rule 19: this document stays synchronized with contained feature ownership and endpoint changes.
