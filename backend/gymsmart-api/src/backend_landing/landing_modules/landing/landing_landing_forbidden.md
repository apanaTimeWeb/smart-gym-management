# Landing — Forbidden Backend Patterns

1. **Do not expose raw TypeORM entities from Landing services.** Consequence: persistence details leak into business code and AI repairs can couple the module to schema changes. Rule 89.
2. **Do not mutate Landing ORM entities or call generic `save()` from services.** Consequence: repository-owned mutation and audit boundaries can be bypassed. Rule 99.
3. **Do not replace the frontend-required `/api/landing/bookings` contract with the historical singular route.** Consequence: the supplied frontend API client will fail its live contract. Rule 67 / frontend contract freeze.
4. **Do not let anonymous Landing requests select a tenant from client-supplied `x-tenant-id`.** Consequence: a forged tenant identifier could route a public mutation into another tenant database. Rule 39.
5. **Do not return unwrapped booking/contact responses.** Consequence: API consumers receive a shape that violates Rule 28 and the frontend strict Zod response schema. Rule 28 / Rule 82A.
6. **Do not store local-date strings in `landing_bookings.date`.** Consequence: date semantics become timezone-dependent. Rule 71.
7. **Do not return booking/contact PII in application logs.** Consequence: operational logs can become a secondary PII leak. Rule 14 / Rule 35.
8. **Do not treat Redis as authoritative idempotency state.** Consequence: Redis loss after a committed mutation can cause unsafe duplicate execution. Rule 103.
9. **Do not update `processing=false` unless a deterministic replay response already exists.** Consequence: a completed idempotency row could become unreplayable. Rule 103.
10. **Do not add a backend newsletter endpoint without frontend evidence.** Consequence: it expands the frozen contract without a current consumer. Rule 67.
