# Security Impact Analysis

## Scope

Version 1 implements the supplied frontend Auth contract and the shared NestJS infrastructure required to run it. The supplied frontend does not establish Superadmin business capabilities beyond authentication in this scope, so no unrelated business endpoints are introduced.

## High-Risk Areas

### Authentication and Session Rotation

- Access tokens are short-lived JWTs.
- Refresh tokens are persisted as SHA-256 hashes rather than plaintext. Rotated/revoked raw refresh tokens are additionally represented in Redis only by a SHA-256 denylist key.
- Refresh rotation uses a pessimistic row lock to serialize concurrent refresh requests.
- Replay detection revokes the session and writes an audit record in a separate committed transaction so a detected replay cannot roll back the security action.

### Brute-Force Protection

- Login attempts are tracked in Redis using an email fingerprint rather than raw email in the lockout key.
- The configured attempt threshold causes a temporary lock and a committed audit record.

### API Boundary

- Global request validation uses `whitelist` and `forbidNonWhitelisted`.
- Helmet and exact-origin CORS are enabled.
- Critical response fields are normalized through the canonical response envelope.
- Authentication and role checks run at the global/controller boundary.

### Logging / Privacy

- `nestjs-pino` is the only application logger.
- Authorization headers, cookies, credentials, tokens, and password fields are redacted.
- Request IDs and trace IDs are propagated through AsyncLocalStorage.

## Required Human Review

Per the governing backend architecture, authentication, authorization, migrations, webhook/security-sensitive code, and tenant routing require CODEOWNERS human review even when automated checks pass.

## Verification Boundary

Runtime verification requiring a live PostgreSQL and Redis instance is environment-dependent. Source-level type checking, linting, formatting, isolation checks, and unit tests are the automated verification gates included in this repository.
