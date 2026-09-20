# Forbidden Patterns — `trainer/library`

1. Do not place Library business behavior in role-wide shared business folders.
2. TanStack Query owns Library server state; Zustand/React local state may own UI-only state only.
3. Never hardcode Library URLs outside `library_url_config.ts`.
4. Keep diet-plan/member demo records inside `library_mocks/fixtures/` and mutation behavior inside `library_mocks/`.
5. The documented Trainer Assign-to-Member flow must remain demonstrable in the feature's mock layer.
6. Do not place API calls directly in presentational components.
7. Do not expose raw backend errors in user-facing UI.
8. Use semantic global design tokens and accessible dialog/form behavior.
9. Do not rename framework-reserved route files.
10. Do not modify unrelated sibling modules to repair Library.
