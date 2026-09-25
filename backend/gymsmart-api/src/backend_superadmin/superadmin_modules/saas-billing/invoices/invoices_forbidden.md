# Invoices Forbidden Patterns

- Do not import sibling feature business code.
- Do not call TypeORM directly from services.
- Do not use repository `save()` outside the repository boundary.
- Do not hard delete records.
- Do not add unvalidated dynamic sort/where fields.


## Audit-enforced prohibitions

1. Do not bypass the module repository boundary for persistence. Consequence: direct ORM access can bypass soft-delete and audit hooks. Rule: 7 / 99.
2. Do not import another Superadmin feature's business service or repository. Consequence: a repair can create cross-feature runtime coupling and violate the AI write boundary. Rule: 0B / 49.
3. Do not emit an unregistered runtime event. Consequence: consumers become invisible to the dependency graph and event contracts drift. Rule: 49 / 50.
4. Do not return raw ORM entities from business services. Consequence: persistence metadata leaks into business code and schema changes propagate unexpectedly. Rule: 89.
5. Do not accept unvalidated dynamic sort/filter fields. Consequence: unsafe query construction can enable injection or inconsistent results. Rule: 92.

## Financial Safety Additions
- Never record a manual payment by changing invoice state alone; append the required balanced ledger pair inside the same transaction.
- Never treat invoice status as the financial ledger of record.

