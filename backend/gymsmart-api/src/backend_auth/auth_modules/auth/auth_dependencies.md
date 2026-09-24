# Auth Dependency Map

## Owned Business Module

`auth`

## Business Feature Dependencies

None in the supplied Superadmin/Auth scope.

## Core Infrastructure Dependencies

- `core-database`: PostgreSQL/TypeORM and transaction context.
- `core-cache`: Redis lockout state and rate limiting.
- `core-audit`: committed audit trail for critical Auth state changes.
- `core-security`: JWT authentication and controller RBAC.
- `core-request-context`: request/trace/session context propagation.
- `core-http`: response envelope, validation/error normalization and SLA interceptor.
- `core-logging`: structured redacted logging.

## Runtime Events

None. Auth has no declared event emission or subscription in the supplied frontend contract.

## Dependency Rules

1. Auth business code MUST NOT import another business feature directly (Rule 0B/49).
2. Core infrastructure imports are allowed only for framework plumbing and declared architectural contracts.
3. Any future Auth event must be registered in the central event registry and added here before implementation (Rule 49/50).
