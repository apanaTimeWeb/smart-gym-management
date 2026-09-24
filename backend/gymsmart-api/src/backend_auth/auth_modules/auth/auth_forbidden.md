# Auth Forbidden Patterns

## What is NEVER allowed in this module

1. **Never store a plaintext refresh token in `auth_refresh_sessions`.**
   Consequence: a database read would expose reusable authentication credentials and turn a persistence compromise into direct account takeover.
   Rule: 52, 35.

2. **Never rotate a refresh session without the repository pessimistic row lock.**
   Consequence: two concurrent refresh requests could both observe the same token hash and create divergent sessions or replayable token state.
   Rule: 41.

3. **Never catch `AuthRefreshReuseDetectedException` and leave the revoked-session mutation inside the failed transaction.**
   Consequence: the exception rolls back the transaction and the replayed session can remain usable.
   Rule: 36, 41.

4. **Never accept a client-supplied session id for logout.**
   Consequence: an authenticated user could attempt to revoke another user's refresh session or create an IDOR path.
   Rule: 83, 85 and the Auth resource-scope contract.

5. **Never return Auth identity from request-body/profile input for `/auth/me`.**
   Consequence: the frontend would no longer have an authoritative server identity and could display tampered role or account data.
   Rule: 82A and the frozen Auth contract.

6. **Never put raw email addresses into Redis lockout keys.**
   Consequence: operational key inspection would expose identifiers that are unnecessary for the lockout mechanism.
   Rule: 35 and the Auth privacy contract.

7. **Never hard-delete an Auth user or refresh session from the API flow.**
   Consequence: auditability and recovery are lost, and historical references can break.
   Rule: 29.

8. **Never call TypeORM repositories directly from Auth controllers.**
   Consequence: controllers become coupled to persistence and future AI repairs must reason across HTTP and database layers.
   Rule: 7, 51 and the extreme-isolation principle.

9. **Never bypass the `AuthSessionOrchestrator` for login, refresh or logout transactions.**
   Consequence: session state and audit records can commit partially or lose the required rollback/security boundary.
   Rule: 8B, 36.

10. **Never add a new Superadmin business endpoint to Auth merely because it is convenient.**
    Consequence: the feature module becomes an uncontrolled business container and breaks frontend/backend 1:1 feature isolation.
    Rule: 0A, 0B, 38 and 67.
