# Manager Expenses Module Theme Contract

This document enforces the styling boundaries for the Manager Expenses feature module (`src/app/manager/expenses`). All components within this module MUST use the global design tokens specified in `web_global_design.md`. Ad-hoc hex codes and raw CSS classes are strictly forbidden.

## Semantic Colors (Tailwind Tokens)

| Element Category | Tailwind Utility | Purpose in Expenses |
| :--- | :--- | :--- |
| **Backgrounds** | `bg-background` | Main page background. |
| | `bg-card` | Container backgrounds for Modals, Tables, KPIs, and Charts. |
| | `bg-input` | Form inputs, table hover states, and chart backgrounds. |
| **Typography** | `text-foreground` | Primary text (headers, expense titles). |
| | `text-secondary` | Subtitles, table headers, form labels, dates. |
| **Status / Indicators** | `text-success` | Paid status, positive feedback, total paid KPI. |
| | `bg-success` | Paid badge background. |
| | `bg-success/10` | Paid action button hover. |
| | `text-warning` | Pending status, highest category KPI. |
| | `text-danger` | Total expenses KPI (if used as alert), delete actions. |
| | `bg-danger-bg` | Delete action button hover. |
| | `text-info` | Expenses this month KPI. |
| | `text-primary` | Total tracked expenses KPI, active tab text. |
| **Borders & Dividers**| `border-border` | Standard card and list item borders. |

## Layout & Spacing Rules

- **Containers:** Expense layout components should use a maximum width constraint (`max-w-screen-2xl mx-auto`) with standard padding (`p-4 md:p-6 lg:p-8`).
- **Grids:** Use responsive CSS Grid for KPIs (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`) and form layouts.
- **Spacing:** Enforce consistent gaps using standard Tailwind spacing scale (`gap-4`, `gap-6`, `space-y-6`).

## Component Rules

- **Modals:** Use `bg-card` with `shadow-xl` and `rounded-2xl`. Overlays should be `bg-black/50` or `backdrop-blur-sm`.
- **KPI Cards:** Hover states should use `hover:shadow-md` and icon `group-hover:scale-110`.
- **Forms:** All inputs must follow the global design system for `bg-input` and focus rings. `Loader2` should be used for all saving states.
- **Charts (react-apexcharts):** Tooltips must use `theme: 'dark'` and follow the standard design system hex colors inside the chart configuration object. Canvas elements cannot resolve Tailwind classes dynamically.
