# Superadmin Gym Detail Forbidden Patterns

- Do not omit the route `id` from the query key or API request.
- Do not read Gym 360 fixtures directly from components.
- Do not import sibling business modules.
- Do not expose raw technical API errors.
- Do not use blank rendering for nullable tenant fields; use `displayValue()`.
