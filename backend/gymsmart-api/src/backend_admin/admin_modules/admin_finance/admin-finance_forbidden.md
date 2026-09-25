# finance Forbidden Patterns

## What is NEVER allowed in this module

1. **Do not call another Admin feature repository or service directly.** Consequence: AI repairs can create cross-feature coupling and break the Feature Module repair boundary. Rule: 0B/0C and Rule 49.

2. **Do not put TypeORM Entity instances into business-service public contracts.** Consequence: persistence schema details leak into business logic and schema changes create unrelated breakage. Rule: 89.

3. **Do not accept client tenant identifiers as authoritative without master-database authorization.** Consequence: a forged tenant header can route a request into another tenant database. Rule: 39.

4. **Do not build ORM sort/order identifiers from raw query input.** Consequence: unsafe dynamic identifiers can enable injection or unexpected query behavior. Rule: 92.

5. **Do not physically delete records owned by `finance`.** Consequence: audit/recovery guarantees are destroyed and referential integrity can break. Rule: 29.

6. **Do not change a response field required by the frontend without updating the frozen API contract and frontend contract together.** Consequence: UI fields can become undefined or semantically wrong. Rules: 67 and 82A.

7. **Do not bypass the idempotency contract for critical mutations.** Consequence: retries may execute a financial/resource mutation twice. Rule: 31.
