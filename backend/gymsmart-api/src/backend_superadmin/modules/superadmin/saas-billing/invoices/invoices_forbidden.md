# Invoices Forbidden Patterns

- Do not import sibling feature business code.
- Do not call TypeORM directly from services.
- Do not use repository `save()` outside the repository boundary.
- Do not hard delete records.
- Do not add unvalidated dynamic sort/where fields.
