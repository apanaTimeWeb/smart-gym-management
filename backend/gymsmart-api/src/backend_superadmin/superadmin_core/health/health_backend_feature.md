# Health Backend Feature Map

## Module Purpose
Provides application liveness and readiness health endpoints for local and container orchestration checks. This module is framework/infrastructure-facing and must remain independent from business feature modules. It must fail closed when authentication or required health dependencies are unavailable.

## Directory Structure
| File | Responsibility |
|---|---|
| [module controllers/services] | Owns the HTTP-facing health contract and supporting use cases. |

## Feature Inventory
| Controller/Endpoint | HTTP | Path | Purpose | Request DTO | Response DTO |
|---|---|---|---|---|---|
| Module-defined routes | GET/POST | module-owned paths | Provides the feature's documented health operations. | module DTOs where applicable | module response DTOs |

## Approved External Dependencies
- **Business Feature Dependencies**: None.
- **Infrastructure Dependencies**: ConfigService, logger, JWT or health infrastructure as defined in source.
- **Runtime/Event Dependencies**: None.

## Data and State Architecture
- DB Entities: none owned directly by the health module unless declared in source.
- Redis Caching Keys: none owned directly.
- Event Emitters: none owned directly.
- Background Jobs: none owned directly.
- Idempotency Keys: only where source endpoint contract explicitly requires a mutation key.

## Business Flow / Key Sequences
1. HTTP request reaches the module-owned controller.
2. Framework validation/guards execute before business behavior.
3. The module executes its isolated use case.
4. The response is passed through the canonical response infrastructure where applicable.

## File Responsibility Map
- Module controllers — transport only; MUST NOT contain business persistence logic.
- Module services — isolated use-case behavior.
- DTOs — edge validation only.

## Permissions and Security
- Authentication operations must fail closed for missing/invalid credentials.
- Health endpoints must expose only the intended operational state and must not leak secrets.

## Edge Cases / AI Warnings
- Do not bypass JWT verification in protected flows — see Rule 83.
- Do not trust a client tenant identifier without server-side tenant authorization — see Rule 39.
- Do not expose credentials, tokens, or request bodies in logs — see Rule 14.

## Frozen API Contract
Use the exact controller decorators and DTOs in source; do not invent additional endpoints.

## Rule Compliance Checklist
- [ ] Rule 19: Documentation remains synchronized with code changes.
- [ ] Rule 28: Responses use the canonical API envelope where applicable.
- [ ] Rule 83: RBAC/guards remain at the controller boundary.
