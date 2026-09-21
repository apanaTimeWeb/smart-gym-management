# Jobs Dependencies

## Business Feature Dependencies
None by direct import. Cross-feature runtime dependencies use the central event registry only.

## Infrastructure Dependencies
TypeORM PostgreSQL repository boundary, Redis-backed rate limiting, canonical response envelope, auth/RBAC guards.

## Runtime/Event Dependencies
None unless explicitly listed in this file in a future contract change.
