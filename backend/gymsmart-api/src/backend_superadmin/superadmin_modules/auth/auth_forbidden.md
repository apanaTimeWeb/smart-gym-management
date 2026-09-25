# Auth Forbidden Changes

## What is NEVER allowed in this scope

1. **Never bypass the global authentication/transport guard chain on protected auth-adjacent routes.**
   Consequence: Unverified callers could reach session-management capabilities intended for authenticated actors.
   Rule: 83 / 93

2. **Never trust tenant metadata from the client without master-database authorization.**
   Consequence: An attacker could select a tenant they are not entitled to access.
   Rule: 39

3. **Never log refresh tokens, access tokens, passwords, or request bodies.**
   Consequence: Authentication secrets could be copied into centralized logs and remain accessible after rotation.
   Rule: 14 / 35

4. **Never place credential normalization or lockout state in controller code.**
   Consequence: Multiple transport paths could apply different credential rules and make account protection inconsistent.
   Rule: 1 / 3 / 15

5. **Never change auth mutation idempotency requirements in the service layer.**
   Consequence: Retries could execute session mutations inconsistently because the mandatory controller-level guard was bypassed.
   Rule: 112

