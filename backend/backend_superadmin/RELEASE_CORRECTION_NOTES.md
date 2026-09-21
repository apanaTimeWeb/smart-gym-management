# Superadmin Backend — Corrected Release Notes

This ZIP contains source-level corrections applied after the exhaustive frontend/backend audit.

## Corrected in this release
- Feature flag CRUD/toggle endpoint paths and release-note route wiring.
- Gym provisioning input alignment, Aadhaar encryption-before-persistence, tenant migration-class execution, controlled impersonation, owner-email validation, and export route handling.
- Broadcast recipient-count and delivery operations.
- Persistent Superadmin notifications with read/read-all operations.
- Report revenue/cancellation/health routes with query-aware filtering and comparison selection.
- Invoice download/export route contracts.
- Plan archive operation.
- Ticket close/assign/reply operations with repository-owned mutations.
- Infrastructure uptime-history and frontend audit-log route aliases.
- Explicit database migration artifacts for newly introduced notification persistence.
- Static route collision cleanup.

## Verification
- Architecture gate: PASS after corrections.
- Route duplicate scan: PASS.
- Python E2E syntax compilation: PASS.
- Runtime Nest/PostgreSQL/Redis verification: NOT VERIFIED because the supplied environment does not contain the project dependency tree/runtime infrastructure.

## Known remaining work
1. Full request-scoped database-per-tenant routing across every feature repository remains a global infrastructure integration item.
2. Production queue workers/DLQs and real external provider adapters require infrastructure not contained in this role ZIP.
3. CI SAST/SCA/GitLeaks/Husky/CODEOWNERS enforcement requires repository-host configuration.
4. Snapshot-backed dashboard/analytics/operational insight services still require migration to live domain queries before final architecture acceptance.
5. The host-level frontend `apiFetch` boundary is outside the supplied frontend scope, so `/api` prefix normalization and some shared endpoint ownership remain not verified.
