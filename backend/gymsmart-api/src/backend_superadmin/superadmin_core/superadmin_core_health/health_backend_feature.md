# Health Backend Feature Map

## Module Purpose

This module owns the backend capability boundary for the superadmin_core/superadmin_core_health feature. It exposes 3 HTTP operations in the supplied source scope and keeps transport, validation, use-case, and persistence responsibilities separated across feature-local files. Mutations, authorization, persistence, and side effects must continue to respect the applicable backend architecture rules and the frontend contract frozen for this feature.

## Directory Structure

| File | Responsibility |
|---|---|
| `superadmin-health.controller.ts` | HTTP transport only; MUST NOT contain business logic or direct ORM access. |
| `superadmin-health.module.ts` | Registers feature dependencies and providers; MUST NOT bootstrap duplicate global infrastructure. |

## Feature Inventory


| Controller/Endpoint | HTTP | Path | Purpose | Request DTO | Response DTO |
|---|---|---|---|---|---|
| `superadmin-health.controller.ts::live` | GET | `/health/live` | This endpoint invokes `live` on `superadmin-health.controller.ts` and returns the feature contract for its requested operation. | `—` | `` |
| `superadmin-health.controller.ts::ready` | GET | `/health/ready` | This endpoint invokes `ready` on `superadmin-health.controller.ts` and returns the feature contract for its requested operation. | `—` | `Promise<` |
| `superadmin-health.controller.ts::deep` | GET | `/health/deep` | This endpoint invokes `deep` on `superadmin-health.controller.ts` and returns the feature contract for its requested operation. | `—` | `Promise<` |

## Approved External Dependencies

- **Business Feature Dependencies**: None
- **Infrastructure Dependencies**: superadmin_core_auth, superadmin_core_cache, superadmin_core_health
- **External/Other Dependencies**: None

## Data and State Architecture

- DB Entities: none in this module scope
- Redis Caching Keys: see code-defined cache keys; no undocumented keys are invented by this refresh.
- Event Emitters: none statically identified
- Background Jobs: none statically identified
- Idempotency Keys: none; no mutation endpoint in scope

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

| Endpoint | Controller Role Metadata | Resource-Level Check |
|---|---|---|
| `GET /health/live` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /health/ready` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |
| `GET /health/deep` | `SuperadminRole.SUPERADMIN` | Static resource-level enforcement requires endpoint-specific verification. |

## Edge Cases / AI Warnings
- Do not bypass JWT verification in protected flows — see Rule 83.
- Do not trust a client tenant identifier without server-side tenant authorization — see Rule 39.
- Do not expose credentials, tokens, or request bodies in logs — see Rule 14.

## Frozen API Contract
Use the exact controller decorators and DTOs in source; do not invent additional endpoints.

### Request Shape
No frontend-derived request shape is assigned to this module root; the module is an infrastructure/container boundary.

### Response Shape
No frontend-derived response shape is assigned to this module root; the module is an infrastructure/container boundary.

### UI-Required Fields
No dedicated frontend UI Data Requirements section was supplied for this module. The frozen Stage 1 requirement IDs remain the authoritative frontend-derived evidence; no additional fields are invented here.

### Pagination / Error Contract
- Pagination: list endpoints use backend-driven pagination, sorting, and filtering where their frontend contract requires it; non-paginated responses omit `meta`.
- Success envelope: global response infrastructure returns `success`, `message`, and `data`; paginated responses also include the canonical `meta`.
- Error envelope: `data` is `null`; validation failures use `VALIDATION.DTO.FAILED` with field-level `validationErrors`; business errors use machine-readable domain error codes.


## Rule Compliance Checklist
- [ ] Rule 19: Documentation remains synchronized with code changes.
- [ ] Rule 28: Responses use the canonical API envelope where applicable.
- [ ] Rule 83: RBAC/guards remain at the controller boundary.
