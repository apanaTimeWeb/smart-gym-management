# Manager Sales Theme Contract

This document lists the semantic Tailwind CSS tokens required by the `manager/sales` feature module. It adheres strictly to the `web_global_design.md` architecture.

## Background Colors
- `bg-card`: Card backgrounds for tables, KPI boxes, and charts.
- `bg-input`: Search bar and dropdown filter backgrounds.
- `bg-primary/10`: Subtle background for active states or primary KPI highlights.
- `bg-success/10`: Subtle background for successful metrics.
- `bg-warning/10`: Subtle background for pending/warning metrics.
- `bg-danger/10`: Subtle background for overdue/failed metrics.

## Text Colors
- `text-foreground`: Primary text color.
- `text-secondary`: Secondary/muted text for labels and sub-values.
- `text-primary`: Primary highlights.
- `text-success`: Positive metrics or completed statuses.
- `text-warning`: Pending metrics.
- `text-danger`: Negative metrics or overdue statuses.

## Border Colors
- `border-border`: General structural borders.

## ApexCharts Configuration
For charts, the module uses `react-apexcharts`. Since Canvas/SVG libraries do not reliably resolve all Tailwind variable classes, hex colors are permitted strictly within the ApexCharts configuration object:
- `#4F46E5`: Primary Sales (revenue)
- `#10B981`: Store POS (storeRevenue)
- `#F43F5E`: New Members Trend (newMembers)
- `#A1A1AA`: Axis labels (zinc-400 / secondary text)

## Semantic Status Mapping
- `Success / Completed`: `text-success`, `bg-success/10`
- `Pending / Warning`: `text-warning`, `bg-warning/10`
- `Overdue / Danger`: `text-danger`, `bg-danger/10`
