# export-data Forbidden Changes

## What is NEVER allowed in this scope

1. **Never generate large archives synchronously inside an HTTP controller.**
   Consequence: Large exports can exceed endpoint time budgets and tie up application workers under load.
   Rule: 23

2. **Never remove `@RequireIdempotencyKey()` from export mutations.**
   Consequence: Network retries can create duplicate export jobs and repeated delivery side effects.
   Rule: 112

3. **Never accept arbitrary tenant IDs without master-database authorization.**
   Consequence: An export could include data belonging to a tenant the actor is not authorized to access.
   Rule: 39

4. **Never let controllers call the ORM repository directly.**
   Consequence: The HTTP layer would bypass persistence boundaries and make soft-delete, transaction, and audit guarantees inconsistent.
   Rule: 7 / 99

5. **Never hardcode queue names in a second location.**
   Consequence: Producer and consumer names can drift and leave exports permanently unprocessed without an obvious compile-time failure.
   Rule: 50 / 96

