# members Backend Dependencies

## Upstream dependencies
- Core authentication and typed RBAC
- Core tenant authorization and request context
- Core tenant DataSource resolver
- Feature-local repository/service/DTO layers

## Downstream dependencies
- None from sibling business feature modules.

## Runtime events
- None in the current Trainer frontend-derived scope. Any future event must be registered in `backend_trainer/backend_core/event-registry.constants.ts` and added here in the same change.

## Dependency Rule
Direct imports from sibling feature business code are prohibited. Infrastructure references are permitted only when required by the documented architecture.

## Export Boundary
Trainer does not own tenant-wide export APIs. Rule 119 assigns data-export functionality to the top-level admin role container.

## Fix V1 closure
- No sibling feature business-code dependency was introduced by the Trainer backend repairs.
