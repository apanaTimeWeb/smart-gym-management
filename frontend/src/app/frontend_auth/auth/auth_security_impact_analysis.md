# Auth Security Impact Analysis — v9

## Scope
Frontend-only review of `frontend_auth/auth/`. Backend authorization/implementation remains outside scope.

## Re-verified Security Contracts
- Auth tokens are server-owned/HTTP-only and are not returned in browser JSON.
- Session identity resolves from the access-token authority rather than the convenience identity cookie.
- Demo authentication has separate public presentation gating and private server issuance gating.
- Credential-bearing mock data is isolated from browser-safe public fixtures.
- Refresh/logout/ghost restore validate and mutate server-owned cookie state.
- Retired `set-cookie` rejects client token/cookie injection.
- Auth mutation API methods require idempotency keys and retry reuse follows the same intent fingerprint.
- User-facing error paths expose safe messages; raw backend objects and technical stacks are not rendered.

## v9 Security-Adjacent Repairs
- Removed the duplicate browser MSW handler so browser behavior has one canonical module-owned mock implementation.
- Preserved root URL ownership and query-key namespace boundaries.
- Preserved security regression suites and added no new secret-bearing browser fixture.

## Host Security Gates
`NOT VERIFIED`: CODEOWNERS enforcement, human approval, gitleaks, npm/SCA scan, host security headers, global auth middleware, browser runtime security verification. These cannot be fabricated without the host repository.
