# features Backend Forbidden Operations

## Business Boundary
- Do not import sibling Superadmin business modules directly.
- Do not move business logic into `src/core/` or a domain-level shared folder.
- Do not create `common/`, `shared/`, or `_shared/` helpers for business behavior.

## Persistence Boundary
- Do not call TypeORM `Repository` methods directly from services.
- Do not call generic `.save()` from services; use named repository mutations.
- Do not hard-delete production records.

## API Boundary
- Do not manually shape the canonical `ApiResponse` envelope inside controllers.
- Do not return a minimal DTO when the frontend contract requires nested UI data.
- Do not accept arbitrary query sort fields; use allowlisted mappings.

## Security Boundary
- Do not trust `x-tenant-id` without master-database authorization.
- Do not log credentials, tokens, request/response bodies, or raw sensitive PII.
- Do not bypass `JwtAuthGuard`/`RolesGuard` on Superadmin endpoints.

## AI Repair Boundary
For a feature repair, default writable scope is this feature folder only; cross-feature changes require an explicit architectural dependency such as core infrastructure, API contract propagation, event registry, transaction infrastructure, or documented test-contract synchronization.
