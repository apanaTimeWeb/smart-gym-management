# Progress Tracking — Features

## Overview
Standalone module for tracking member body measurements and fitness metrics over time.
Has two tabs: **Individual** (single-member history) and **Compare Members** (side-by-side multi-member analysis).

## Directory Structure
| File/Folder | Responsibility |
|---|---|
| `page.tsx` | Server Component — renders TrainerProgressMain |
| `loading.tsx` | Skeleton: header + metric tabs + chart + table |
| `error.tsx` | Error boundary with retry |
| `progress_components/TrainerProgressMain/` | Root Client Component — tab switcher + layout |
| `progress_components/TrainerProgressChart/` | SVG line chart for individual member metric trend |
| `progress_components/TrainerProgressTable/` | History table with edit/delete per row |
| `progress_components/TrainerProgressModal/` | Add / Edit entry form (react-hook-form) |
| `progress_components/TrainerProgressEmptyState/` | Empty state when no entries exist |
| `progress_components/TrainerProgressMemberSelector/` | Toggle-chip multi-member selector (max 4) |
| `progress_components/TrainerProgressComparisonChart/` | ApexCharts grouped bar chart — side-by-side metric comparison |
| `progress_components/TrainerProgressComparisonTable/` | Snapshot table with trend badge + delta columns |
| `progress_context/useTrainerProgressLogic.ts` | All state: entries, tab, comparison selection, snapshots, trend |
| `progress_types/TrainerProgressTypes.ts` | `ProgressEntry`, `ProgressSummary`, `ComparisonMemberSnapshot`, `ComparisonMetric` |
| `progress_api/TrainerProgressApi.ts` | API wrappers — fetchProgressEntries, createProgressEntry, etc. |
| `progress_utils/TrainerProgressSharedConstants.ts` | `PROGRESS_CHART_METRICS`, `COMPARISON_METRICS`, `COMPARISON_MAX_MEMBERS`, mock data |
| `TrainerProgressUrlConfig.ts` | `TRAINER_PROGRESS_ROUTES` + `TRAINER_PROGRESS_API_ROUTES` |

## Feature Inventory
| Feature | Tab | Purpose | Status |
|---|---|---|---|
| Add Entry | Individual | Record weight, height, body fat, muscle mass, measurements | ✅ Live |
| Auto BMI | Individual | Calculated from weight + height on save, never raw input | ✅ Live |
| Line Chart | Individual | SVG trend chart for weight / BMI / body fat / muscle mass | ✅ Live |
| Entry Table | Individual | Full history with edit + delete (useConfirm protected) | ✅ Live |
| Empty State | Individual | Friendly prompt when no entries exist | ✅ Live |
| Member Selector | Compare | Toggle chips for up to 4 members, clear-all button | ✅ Live |
| Comparison Chart | Compare | ApexCharts grouped bar — 6 switchable metrics, gold primary bar | ✅ Live |
| Comparison Table | Compare | Snapshot per member: latest values + Δ weight + Δ muscle + trend badge | ✅ Live |
| Trend Detection | Compare | improving / plateau / declining / insufficient derived from first→latest delta | ✅ Live |

## Data Flow
```
page.tsx (Server Component)
  └── TrainerProgressMain (Client)
        ├── useTrainerProgressLogic (all state + mock data + snapshot computation)
        │
        ├── [Individual tab]
        │     ├── TrainerProgressChart (SVG line chart)
        │     ├── TrainerProgressTable (history table)
        │     └── TrainerProgressModal (add / edit form)
        │
        └── [Compare tab]
              ├── TrainerProgressMemberSelector (toggle chips)
              ├── TrainerProgressComparisonChart (ApexCharts bar)
              └── TrainerProgressComparisonTable (snapshot + trend + delta)
```

## Comparison Trend Logic
Computed in `useTrainerProgressLogic → buildSnapshot()`:
- **improving** — weight dropped > 0.5 kg OR muscle gained > 0.5 kg
- **plateau** — weight change ≤ ±0.5 kg AND muscle change ≤ ±0.3 kg
- **declining** — weight increased > 0.5 kg AND no muscle gain
- **insufficient** — fewer than 2 entries

## Mock Data
- Individual: `MOCK_PROGRESS_ENTRIES` in SharedConstants (member `m1`)
- Comparison: `MOCK_COMPARISON_ENTRIES` in SharedConstants (members `m1`–`m4`)
- Replace with `fetchProgressEntries(memberId)` from `progress_api/TrainerProgressApi.ts` when backend is ready

## Rule Compliance Checklist
- [x] Rule 2: Total Role Isolation — trainer's assigned members only
- [x] Rule 6: Logic/UI Separation — all state + snapshot logic in `useTrainerProgressLogic`
- [x] Rule 8: Server/Client Boundary — `page.tsx` = Server Component
- [x] Rule 9: `loading.tsx` + `error.tsx` present
- [x] Rule 11: `TrainerProgressUrlConfig.ts` present
- [x] Rule 13: Feature Map — this document
- [x] Rule 20: No native `<select>` for large datasets — toggle chips used
- [x] Rule 29: All animations use `motion-safe:` prefix
- [x] Rule 40: `progress_forbidden.md` present
- [x] Rule 71: No `alert()` / `window.confirm()` — `useConfirm()` used for delete
- [x] Design: ApexCharts only (no Recharts/Chart.js), gold primary `#FACC15` as first bar color
