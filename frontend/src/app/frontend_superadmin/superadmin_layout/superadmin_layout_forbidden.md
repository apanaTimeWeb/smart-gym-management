# Superadmin Layout — Forbidden Patterns

- No feature business records, hooks, stores, schemas, or fixtures.
- No imports from feature business implementations.
- No API mutation logic for domain actions.
- No hardcoded theme colors; use global semantic tokens.
- No generic shared-business bucket creation in this shell module.

## Module-Specific Forbidden Baseline (Rule 40)

- Do not place feature mock data outside this module.
- Do not create duplicate global mock handlers for this module.
- Do not create role-wide business components, stores, APIs, schemas, or utilities for this module.
- Do not import sibling feature business logic; only approved global infrastructure is allowed.
- Do not bypass the module URL config, runtime validation, query-key ownership, cache invalidation, or mutation idempotency requirements.
- Do not hardcode feature UI copy, business status labels, currency symbols, raw theme colors, or arbitrary Tailwind values.
