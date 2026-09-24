# Backups Dependencies

## Business Feature Dependencies
None by direct import. Cross-feature runtime dependencies use the central event registry only.

## Infrastructure Dependencies
TypeORM PostgreSQL repository boundary, Redis-backed rate limiting, canonical response envelope, auth/RBAC guards.

## Runtime/Event Dependencies
None unless explicitly listed in this file in a future contract change.

## Repair Addendum — Runtime Dependencies
- Infrastructure: Redis queue primitives via `SuperadminCoreDistributedJobQueueService`, tenant DataSource resolver, ConfigService, structured logger.
- Background Jobs: `superadmin:backups` and `superadmin:backups-restore`; terminal failures route to matching `:dlq` lists.
