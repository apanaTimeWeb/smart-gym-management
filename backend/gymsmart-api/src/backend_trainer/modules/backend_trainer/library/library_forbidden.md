# library_forbidden.md

## What is NEVER allowed in this module

1. Never assign a diet plan to a member without trainer ownership authorization. Rule 83. Consequence: cross-member data mutation becomes possible.
2. Never mutate a diet plan without an idempotency key. Rule 112. Consequence: retries can duplicate state transitions.
3. Never read or assign soft-deleted diet plans. Rule 29. Consequence: inactive business data can reappear.
4. Never import Members business services directly into Library. Rule 49. Consequence: sibling feature coupling breaks AI isolation.
5. Never expose ORM entities as library response contracts. Rules 82/82A. Consequence: DB changes become API breaking changes.
