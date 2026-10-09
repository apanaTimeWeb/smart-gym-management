# frontend_trainer — Forbidden Patterns (v8-fix)

- No sibling feature business imports.
- No business records or mock data in shared/global folders.
- No root feature artifact files except framework-reserved routes and documentation.
- No duplicate route tree or mirrored business implementation.
- No raw theme colors, arbitrary Tailwind values, semantic background opacity modifiers, or inline color styles in JSX.
- No API data in Context/Zustand as primary source of truth.
- No fake/no-op handlers, placeholder success, or UI-only filters/pagination.
- No relative imports or barrel `index.ts` files.
- No `any`, `@ts-ignore`, `@ts-nocheck`, or `console.log` in committed source.
