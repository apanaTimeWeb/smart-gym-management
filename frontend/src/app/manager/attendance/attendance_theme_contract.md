# Manager Attendance Module Theme Contract

This document enforces the styling boundaries for the Manager Attendance feature module (`src/app/manager/attendance`). All components within this module MUST use the global design tokens specified in `web_global_design.md`. Ad-hoc hex codes and raw CSS classes are strictly forbidden.

## Semantic Colors (Tailwind Tokens)

| Element Category | Tailwind Utility | Purpose in Attendance |
| :--- | :--- | :--- |
| **Backgrounds** | `bg-background` | Main page background. |
| | `bg-card` | Container backgrounds for Modals, Tables, and Lists. |
| | `bg-muted` | Skeleton loaders and unselected UI elements. |
| **Typography** | `text-foreground` | Primary text (headers, member/staff names). |
| | `text-secondary` | Subtitles, table headers, form labels. |
| **Status / Indicators** | `text-success` | Present status, positive feedback. |
| | `bg-success` | Present badge background, calendar present day background. |
| | `text-danger` | Absent status. |
| | `bg-danger` | Absent badge background, calendar absent day background. |
| | `text-warning` | Late check-ins. |
| | `text-primary` | Leave status. |
| | `bg-primary` | Leave badge background, calendar leave day background. |
| **Borders & Dividers**| `border-border` | Standard card and list item borders. |

## Layout & Spacing Rules

- **Containers:** Attendance layout components should use a maximum width constraint (e.g. `max-w-7xl mx-auto`) with standard padding (`p-4 md:p-6 lg:p-8`).
- **Grids:** Use responsive CSS Grid for Modals and Forms.
- **Spacing:** Enforce consistent gaps using standard Tailwind spacing scale (`gap-4`, `gap-6`, `space-y-4`).

## Component Rules

- **Modals:** Use `bg-card` with `shadow-xl` and `rounded-2xl`. Overlays should be `bg-black/50`.
- **Calendar:** Active dates should use hover scaling (`hover:scale-110`).
- **Forms:** All inputs must follow the global design system for `bg-input` and focus rings.
