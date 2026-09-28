# attendance Backend Dependencies

## Upstream dependencies
- Core authentication and typed RBAC
- Core tenant authorization and request context
- Core tenant DataSource resolver
- Feature-local repository/service/DTO layers

## Downstream dependencies
- None from sibling business feature modules.

## Runtime events
- Publishes `ATTENDANCE.RECORD.CREATED` after a successful attendance record insert.
- Publishes `ATTENDANCE.SESSION.CLOSED` after a successful checkout mutation.
- Both events are stored in the append-only `immutable_domain_events` tenant log and are registered in `backend_trainer/backend_core/event-registry.constants.ts`.

## Dependency Rule
Direct imports from sibling feature business code are prohibited. Infrastructure references are permitted only when required by the documented architecture.

## Export Boundary
Trainer does not own tenant-wide export APIs. Rule 119 assigns data-export functionality to the top-level admin role container.

## Fix V1 closure
- No sibling feature business-code dependency was introduced by the Trainer backend repairs.
