# Manager Dashboard Module Theme Contract

This document enforces the styling boundaries for the Manager Dashboard feature module (`src/app/manager/dashboard`). All components within this module MUST use the global design tokens specified in `web_global_design.md`. Ad-hoc hex codes and raw CSS classes are strictly forbidden.

## Semantic Colors (Tailwind Tokens)

| Element Category | Tailwind Utility | Purpose in Dashboard |
| :--- | :--- | :--- |
| **Backgrounds** | `bg-background` | Main page background. |
| | `bg-card` | Container backgrounds for KPI cards, charts, and lists. |
| | `bg-input` | Search bars and empty states. |
| **Typography** | `text-foreground` | Primary text (headers, member names, total values). |
| | `text-secondary` | Subtitles, chart axis labels, plan names. |
| | `text-primary` | Emphasized statistics (e.g. active members count). |
| **Status / Indicators** | `text-success` | Positive growth rates, active status, today's collection. |
| | `text-warning` | Pending status, low stock alerts, pending payments. |
| | `text-danger` | Expired status, churn rate, high drop-off metrics. |
| | `text-info` | Neutral metrics (e.g. total members, total products). |
| **Borders & Dividers**| `border-border` | Standard card and list item borders. |
| | `divide-border` | Separators within recent members and payment lists. |

## Layout & Spacing Rules

- **Containers:** Dashboard layout components should use a maximum width constraint (e.g. `max-w-7xl mx-auto`) with standard padding (`p-4 md:p-6 lg:p-8`).
- **Grids:** Use responsive CSS Grid for KPIs (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`) and chart layouts.
- **Spacing:** Enforce consistent gaps using standard Tailwind spacing scale (`gap-4`, `gap-6`, `space-y-4`).

## Component Rules

- **ManagerStatCard:** Use the shared `ManagerStatCard` component for all KPIs to guarantee visual consistency.
- **Charts (react-apexcharts):** 
  - Tooltips must use `theme: 'dark'` and handle numeric formatting via `formatCurrencyFromMinorUnits` or `formatKPI`.
  - Chart lines/areas must map strictly to hex colors (e.g. `#0ea5e9` for primary/info, `#22c55e` for success/revenue) inside the ApexCharts config object, since canvas elements do not resolve Tailwind classes reliably.
- **Empty States:** Use `bg-card` and `border-border` for empty dashboard sections.
