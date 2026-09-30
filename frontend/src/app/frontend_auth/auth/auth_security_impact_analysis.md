# Auth Module — Security Impact Analysis

## Scope
This analysis covers the frontend Auth module changes affecting login, demo login, server-side session cookies, refresh, logout, token/session status, ghost-session restoration, and the retired set-cookie bridge.

## Security-Sensitive Flows
| Flow | Sensitive Boundary | Required Safeguard | Module Evidence | Verification |
|---|---|---|---|---|
| Credential Login | Browser credentials → server Auth route | Zod validation, idempotency, backend contract validation, HTTP-only session cookies, sanitized browser response | `session/route.ts`, `AuthApi.ts`, `AuthContracts.ts`, `AuthCookieUtils.ts` | PASS by source/test inspection |
| Demo Login | Browser role → server fixture | Server-only demo gate; browser receives no demo password/token | `demo-login/route.ts`, `AuthMockFixtures.ts`, `AuthMockPublicFixtures.ts` | PASS by source/test inspection |
| Session Status | Cookie → server identity resolver | Do not trust unsigned user identity cookie | `token/route.ts`, `AuthSessionServerUtils.ts` | PASS by security tests |
| Refresh | HTTP-only refresh cookie → token rotation | Contract validation, idempotency, tokens remain cookie-only | `refresh/route.ts` | PASS by source/test inspection; host runtime NOT VERIFIED |
| Logout | Cookie → upstream logout + local cleanup | Local cleanup remains authoritative; no token JSON response | `logout/route.ts` | PASS by source/test inspection |
| Ghost Restore | Stashed original session cookies | Restore only existing secure stash; no invented privileged session | `exit-ghost-login/route.ts` | PASS by security tests |
| Retired Cookie Bridge | Client-supplied token payload | Reject client token-to-cookie write | `set-cookie/route.ts` | PASS by security tests |

## Threats Considered
- Credential replay or changed-intent reuse under one idempotency key.
- Token exposure in browser-facing JSON.
- Forged `gymsmart_user` identity cookie being treated as authoritative.
- Public demo flag being trusted by the server.
- Browser bundle accidentally importing credential-bearing fixtures.
- Technical backend errors being exposed to users.
- Session state becoming stale after token rotation.

## Required Human Review
Because Auth is a security-critical frontend path, human CODEOWNERS review is required for the corresponding host repository paths. A CODEOWNERS file and repository branch-protection configuration were not supplied in this module artifact.

STATUS: NOT VERIFIED — HOST CODEOWNERS / BRANCH-PROTECTION EVIDENCE NOT PROVIDED.

## Required CI Security Gates
The host repository must run the documented SCA/dependency-vulnerability scan and secrets scan, including `gitleaks`, and block merge on critical/high dependency vulnerabilities or detected secrets. These gates cannot be executed or verified from the supplied module-only artifact.

STATUS: NOT VERIFIED — HOST CI / SECURITY TOOLING NOT PROVIDED.

## Security Acceptance
Module-level source and test safeguards are implemented. Full security acceptance requires host-level CODEOWNERS review, CI security scans, environment validation integration, and production runtime verification.
