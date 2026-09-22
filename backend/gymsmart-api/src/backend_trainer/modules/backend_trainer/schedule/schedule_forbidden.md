# schedule_forbidden.md

## What is NEVER allowed in this module

1. Never replace availability with a hard delete. Rule 29. Consequence: historical state is lost.
2. Never enforce weekly availability uniqueness in a way that conflicts with soft deletion. Rule 29/DB constraints. Consequence: a Trainer cannot safely replace availability.
3. Never accept schedule mutation without idempotency. Rule 112. Consequence: client retries can duplicate leave requests or replacement work.
4. Never expose another Trainer’s leave/availability records. Rule 83. Consequence: resource-level authorization is broken.
5. Never let PATCH compatibility silently become the canonical frontend contract. Rules 19/67. Consequence: future AI repairs follow stale API documentation.
