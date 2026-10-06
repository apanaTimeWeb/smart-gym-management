# Superadmin White-labeling — Forbidden Patterns

1. **NO Cross-Module Business Imports**: Do not import components or stores from `gyms`, `plans`, or other superadmin features.
2. **NO Hardcoded API Strings**: Always use `superadmin_white_labeling_url_config.ts` for endpoints.
3. **NO Missing MSW Data**: The MSW mocks must return a fully compliant object matching the Zod schema. Do not return partial mocks.
4. **NO Direct React Context for State**: Use Zustand for UI state and TanStack Query for server state.
5. **NO Unstyled Generic Components**: All lists must use `AdminTableSkeleton` for loading and `AdminEmptyState` for empty results if applicable, or custom ones adhering to the theme contract.

## Module-Specific Forbidden Baseline (Rule 40)

- Do not place feature mock data outside this module.
- Do not create duplicate global mock handlers for this module.
- Do not create role-wide business components, stores, APIs, schemas, or utilities for this module.
- Do not import sibling feature business logic; only approved global infrastructure is allowed.
- Do not bypass the module URL config, runtime validation, query-key ownership, cache invalidation, or mutation idempotency requirements.
- Do not hardcode feature UI copy, business status labels, currency symbols, raw theme colors, or arbitrary Tailwind values.
