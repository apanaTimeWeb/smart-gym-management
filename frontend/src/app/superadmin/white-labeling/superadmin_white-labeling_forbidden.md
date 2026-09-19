# Superadmin White-labeling — Forbidden Patterns

1. **NO Cross-Module Business Imports**: Do not import components or stores from `gyms`, `plans`, or other superadmin features.
2. **NO Hardcoded API Strings**: Always use `superadmin_white_labeling_url_config.ts` for endpoints.
3. **NO Missing MSW Data**: The MSW mocks must return a fully compliant object matching the Zod schema. Do not return partial mocks.
4. **NO Direct React Context for State**: Use Zustand for UI state and TanStack Query for server state.
5. **NO Unstyled Generic Components**: All lists must use `AdminTableSkeleton` for loading and `AdminEmptyState` for empty results if applicable, or custom ones adhering to the theme contract.
