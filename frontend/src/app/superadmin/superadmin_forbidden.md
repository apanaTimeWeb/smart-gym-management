# Superadmin — Forbidden Patterns

- Do not move business logic into role-wide shared folders when the behavior belongs to a feature.
- Do not mount parallel base and `V1Client` page trees for the same route.
- Do not import sibling feature business fixtures, handlers, stores, or utilities.
- Do not bypass feature API boundaries by reading fixtures directly from UI components.
- Do not add component-level fake server state or simulated success toasts for backend outcomes.
- Do not use marker-only tests or tautological `JSON.stringify(x).toBe(JSON.stringify(x))` assertions.
- Do not expose mutable MSW handler state without a reset function and test isolation.
- Do not add raw/arbitrary Tailwind colors, generic shadows, or unsupported one-off breakpoints.
- Do not use `key={index}` for dynamic/filterable/reorderable data.
- Do not use `@ts-ignore` / `@ts-nocheck` to hide contract errors.
- Do not claim `npm build`, lint, Vitest, Playwright, or browser responsive execution as verified when the host dependency environment is absent.
