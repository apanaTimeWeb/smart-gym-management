# workout_forbidden.md

## What is NEVER allowed in this module

1. Never soft-delete a workout/exercise without requiring `deletedAt IS NULL`. Rule 29. Consequence: repeated deletes can mutate already-deleted resources.
2. Never update a workout without trainer ownership scope. Rule 83. Consequence: another Trainer’s plan can be modified.
3. Never expose ORM entities directly as workout responses. Rules 82/82A. Consequence: persistence changes leak into API contracts.
4. Never accept arbitrary workout fields from the client. Rule 37. Consequence: mass assignment can modify protected state.
5. Never create/update/delete workout resources without an idempotency key. Rule 112. Consequence: retries can duplicate mutations.
