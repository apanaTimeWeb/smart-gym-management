# System Ops Container Backend Feature Map

## Module Purpose
The system-ops container composes the isolated `backups`, `infrastructure`, `jobs`, and `migrations` feature modules. It owns only cross-feature transport composition and summary orchestration; it does not absorb child business logic. Its primary invariant is that each child remains independently repairable and dependency-visible.

## Directory Structure
| File | Responsibility |
|---|---|
| system-ops-container.module.ts | Registers child system-ops feature modules without duplicating global infrastructure. |
| system-ops-summary-query.controller.ts | Exposes the system-ops summary read boundary. |
| system-ops.repository.ts | Owns system-ops summary persistence reads only. |

## Approved External Dependencies
- **Business Feature Dependencies**: `backups`, `infrastructure`, `jobs`, `migrations` child modules through approved runtime composition only.
- **Infrastructure Dependencies**: Core authentication, response envelope, pagination, database, and Redis infrastructure.
- **Runtime/Event Dependencies**: Only events explicitly listed by the child module dependency maps.

## Data and State Architecture
- DB Entities: System Ops summary records where present; child entities remain owned by child modules.
- Redis Caching Keys: Child-module keys only; no shared business cache key is introduced here.
- Event Emitters: None owned by this container.
- Background Jobs: None owned by this container; scheduled jobs remain in their owning feature.
- Idempotency Keys: Read-only summary endpoints do not require idempotency. Child mutation endpoints retain their own Rule 112 enforcement.

## Permissions and Security
The summary route requires the Superadmin role and inherits global authentication and tenant authorization. No child resource authorization is bypassed.

## Edge Cases / AI Warnings
1. Never move backup/job/migration business logic into this container; doing so violates Rule 0B/0C isolation.
2. Never introduce a global business cache here; doing so breaks Rule 115 cache ownership and AI repair locality.
3. Never add a local scheduler here; scheduled execution is distributed and registry-owned under Rule 42/96.

## Frozen API Contract
| Endpoint | Method | Contract |
|---|---|---|
| /api/superadmin/system-ops/summary | GET | SuperadminSystemOpsSummarySchema-compatible response. |

## Rule Compliance Checklist
- [x] Rule 0B/0C: Child features remain isolated.
- [x] Rule 19: Feature documentation is co-located.
- [x] Rule 48: Read transport is separate from child command controllers.
- [x] Rule 49: Child dependencies remain explicitly documented.
- [x] Rule 76/79/80: Authored transport/repository files carry responsibility, flow, and JSDoc context.
