# Landing — Forbidden Backend Patterns

1. **Do not expose raw TypeORM entities from Landing services.** Consequence: persistence details leak into business code and AI repairs can couple the module to schema changes. Rule 89.
2. **Do not mutate `LandingBookingEntity` or call generic repository `save()` from a service.** Consequence: repository-owned mutation/audit boundaries can be bypassed. Rule 99.
3. **Do not add a newsletter subscription endpoint solely because the footer contains a newsletter form.** Consequence: it would create a backend feature unsupported by the supplied frontend contract; the current frontend uses `mailto:`. Frontend contract / Rule 67.
4. **Do not let anonymous Landing requests select a tenant from client-supplied `x-tenant-id`.** Consequence: a forged tenant identifier could route a public mutation into another tenant database. Rule 39.
5. **Do not return unwrapped booking/contact responses.** Consequence: the frontend Zod response parser expects `{success,message,data,...}` and would reject raw objects. Rule 28.
6. **Do not store local-date strings in `landing_bookings.date`.** Consequence: date semantics become timezone-dependent and violate UTC storage. Rule 71.
7. **Do not return booking/contact PII in application logs.** Consequence: request logs can become a secondary PII data leak. Rule 14 / Rule 35.
8. **Do not treat Redis as the authoritative idempotency state.** Consequence: Redis failures after a committed mutation must never cause a second execution; durable `idempotency_records` state is authoritative. Rule 31.
9. **Do not bypass the canonical versioned `/api/v1/landing/*` route when adding new endpoints.** Consequence: clients can become coupled to unversioned paths and future API evolution becomes breaking. Rule 26.
