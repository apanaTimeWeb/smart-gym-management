# attendance_forbidden.md

## What is NEVER allowed in this module

1. Never create an attendance record without validating the Trainer/member ownership boundary. Rule 83. Consequence: a Trainer can create records against another Trainer’s member.
2. Never bypass the open-staff-attendance invariant in the create path. Rule 41. Consequence: concurrent self check-in can create duplicate open attendance rows.
3. Never hard-delete an attendance record. Rule 29. Consequence: audit/history recovery is lost and deletion semantics diverge.
4. Never interpolate frontend sort keys directly into SQL. Rule 35. Consequence: dynamic ordering can become an injection surface.
5. Never export attendance synchronously for unbounded data. Rule 23. Consequence: a large export can block the HTTP thread.
