# Forbidden Patterns for Superadmin Module

This file documents explicit anti-patterns that must **NEVER** be used in the `superadmin` module.

1. **Do not use `recharts` or `Chart.js`**. The canonical chart library is strictly `ApexCharts` (`react-apexcharts`) for this project (Global Rule 10).
2. **Do not use `any`**. Use `unknown` and assert with Zod if exact shape is missing. Use explicit types for all chart arrays (e.g., `RevenueChartData[]`, not `any[]`) (Frontend Rule 27).
3. **Do not hardcode Tailwind hex colors** (e.g. `bg-gradient-to-r from-blue-400 to-indigo-500` or `text-white`). Always use design system CSS variables mapped to Tailwind classes (`bg-primary`, `text-foreground`, `text-primary`, etc) (Frontend Rule 4, 36).
4. **Do not place `// RESPONSIBILITY:` before `"use client"`**. The responsibility comment must ALWAYS be placed directly *after* `"use client"` (Frontend Rule 38).
5. **Do not name components with arbitrary suffixes** like `DashboardClient.tsx`. Components must be suffixed with their structural purpose like `DashboardView.tsx`, `*Modal.tsx`, `*Table.tsx` (Frontend Rule 2).
6. **Do not omit JSDoc or Data Flow Comments** on custom hooks or context files. Data flow must be explicitly mapped in the comment header (Frontend Rule 37, 39).
7. **Do not use generic spinners or "Loading..." strings** for initial data fetching. Skeleton loaders (`animate-pulse`) are mandatory (Frontend Rule 26).
8. **Do not create barrel files** (`index.ts` / `index.js`). Every component must be explicitly imported from its exact file path (Frontend Rule 32).
