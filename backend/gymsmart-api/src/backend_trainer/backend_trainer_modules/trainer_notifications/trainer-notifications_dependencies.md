# notifications Backend Dependencies

## Upstream dependencies
- Core authentication and typed RBAC
- Core tenant authorization and request context
- Core tenant DataSource resolver
- Feature-local repository/service/DTO layers
- Socket.IO Redis adapter (`@socket.io/redis-adapter`) for horizontal realtime fan-out

## Downstream dependencies
- None from sibling business feature modules.

## Runtime events
- `notification.received` is emitted only after a persisted notification transaction resolves.
- Notification delivery has no frontend-frozen producer trigger; the canonical delivery service is the production integration boundary. Any future event must be registered in `backend_trainer/backend_core/event-registry.constants.ts` and added here in the same change.

## Dependency Rule
Direct imports from sibling feature business code are prohibited. Infrastructure references are permitted only when required by the documented architecture.

## Fix V1 closure
- No sibling feature business-code dependency was introduced by the Trainer backend repairs.
