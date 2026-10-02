# Superadmin Layout — Forbidden Patterns

- No feature business records, hooks, stores, schemas, or fixtures.
- No imports from feature business implementations.
- No API mutation logic for domain actions.
- No hardcoded theme colors; use global semantic tokens.
- No generic shared-business bucket creation in this shell module.
