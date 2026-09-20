# Manager Infrastructure — Feature Map

## Module Purpose
`manager_infrastructure/` contains stable role-level infrastructure that multiple Manager features can safely consume without creating business coupling. It owns safe error-message normalization, environment/configuration access, HTTP-status constants, money/pagination helpers, permission-gate infrastructure, idempotency and unsaved-change helpers, and the Manager toast service.

## Directory Structure
Key files are `ManagerEnvConfig.ts`, `ManagerErrorMessage.ts`, `ManagerHttpStatus.ts`, `ManagerGymIdentity.ts`, `ManagerMoney.ts`, `ManagerPaginationDefaults.ts`, `ManagerPermissionGate.tsx`, `ManagerIdempotency.ts`, `ManagerUnsavedChangesGuard.ts`, `ManagerToastService.ts`, and their documented tests/contracts.

## Ownership Contract
Infrastructure must remain business-neutral. Feature-specific URLs, statuses, API behavior, fixtures and workflow logic must remain in feature modules.

## Data / State
Helpers consume typed arguments; they do not own server/API response state. Feature modules remain the owners of query and mutation state.

## Security / Permissions
`ManagerPermissionGate.tsx` supports frontend permission presentation only; it is not a replacement for backend authorization.

## Verification Checklist
- [x] No feature-business registry is owned here.
- [x] Error presentation can use backend-provided messages through the shared service.
- [x] HTTP status values are centralized.
- [x] Infrastructure test files are colocated.
- [ ] Real host lint/type/test/build/security verification: NOT VERIFIED from this role snapshot.

## Approved External Dependencies

- Global framework/application infrastructure documented by the architecture standard may be used when required.
- Approved zero-business UI primitives may be imported from Manager application infrastructure.
- Sibling feature business logic, state, API services, fixtures, and tests are not dependencies.

