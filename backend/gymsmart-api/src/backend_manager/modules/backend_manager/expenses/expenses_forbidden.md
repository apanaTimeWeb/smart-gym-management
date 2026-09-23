# Expenses Forbidden Operations

1. Direct sibling business imports — Rule 0C/49 — would violate the feature repair boundary.
2. ORM access from services — Rules 7/99 — would leak persistence primitives into business logic.
3. Raw client tenant selection — Rule 39 — could route a request into another gym database.
4. Unallowlisted sort/filter input — Rule 92 — can create unsafe dynamic query paths.
5. Returning TypeORM entities from use cases — Rule 89 — couples callers to persistence schema.
6. Hard `DELETE` execution — Rule 29 — would destroy recoverable production data.
7. Removing Idempotency-Key from critical mutation routes — Rule 31 — permits duplicate side effects on retry.


## V2 Forbidden Invariants
- **Do not import a sibling Manager feature directly** — creates prohibited business coupling — Rule 0C/49.
- **Do not call TypeORM directly from a service** — leaks persistence concerns and bypasses Rule 7/99.
- **Do not trust x-tenant-id without master authorization** — can route a request across tenant boundaries — Rule 39.
- **Do not bypass the canonical response envelope** — breaks the frontend API contract — Rule 28.
- **Do not hard-delete records** — destroys audit/recovery guarantees — Rule 29.
