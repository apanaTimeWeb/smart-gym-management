# Backend Superadmin Role Backend Feature Map

## Module Purpose
This directory is the role/domain container for the Superadmin backend and mirrors the frontend Superadmin feature grouping. It contains isolated feature modules; the feature module, not this container, is the default AI repair boundary. Container wiring must stay limited to module registration and framework infrastructure and must not absorb business logic from child features.

## Directory Structure
| File | Responsibility |
|---|---|
| `backend-superadmin.module.ts` | Registers the complete Superadmin role/domain module graph. |
| `*/<feature>/*` | Owns one isolated Superadmin feature and its co-located docs/tests/data boundaries. |

## Feature Inventory
The concrete endpoint inventory is owned by each feature's `_backend_feature.md`; this file intentionally does not duplicate business contracts.

## Approved External Dependencies
- **Business Feature Dependencies**: Child feature modules only through their module boundary.
- **Infrastructure Dependencies**: Core auth, database, cache, observability and health infrastructure.
- **Runtime/Event Dependencies**: Declared events and queues in child feature dependency documents.

## Data and State Architecture
- DB Entities: owned by individual feature modules; no domain-level shared business entity.
- Redis Caching Keys: owned by core infrastructure or individual features.
- Event Emitters: declared by individual modules through the central event registry.
- Background Jobs: owned by feature modules and registered centrally where required.
- Idempotency Keys: enforced globally and declared on state-mutating feature endpoints.

## Business Flow / Key Sequences
1. Application imports `BackendSuperadminModule`.
2. The container registers CoreModule, AuthModule, HealthModule and isolated Superadmin feature modules.
3. Feature controllers receive requests and delegate to their own DTO/service/repository graph.
4. Global infrastructure applies authentication, validation, idempotency, audit and response handling.

## File Responsibility Map
- `backend-superadmin.module.ts` — module composition only; MUST NOT contain feature business logic.
- `core/` — framework-level infrastructure only.
- `modules/backend_superadmin/<feature>/` — business feature implementation and localized documentation.

## Permissions and Security
Superadmin role authorization is enforced at the controller boundary of protected child modules. Tenant authorization must be established before tenant data-source resolution.

## Edge Cases / AI Warnings
- Do not use the role/domain container as an AI repair boundary — see Rules 0A-0C.
- Do not create a domain-level shared business utility folder — see Rule 8C.
- Do not add direct sibling business imports; use declared events for runtime coupling — see Rule 49.

## Frozen API Contract
Each child feature owns its frozen API contract in its feature documentation. No domain-level API contract should override a child feature contract.

## Rule Compliance Checklist
- [ ] Rule 0A: Feature module remains the AI repair unit.
- [ ] Rule 0D: `backend_` role/domain namespace is used.
- [ ] Rule 19: Feature documentation is synchronized in the same commit as feature changes.
