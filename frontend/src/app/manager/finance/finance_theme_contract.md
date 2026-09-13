# Manager Finance — Theme Contract

The Finance module tracks payments, revenue, and high-level KPIs. It uses semantic tokens for highlighting different payment methods, statuses, and revenue trends.

## Semantic Colors

- `--primary`: Used for primary actions and highlighted text. (e.g., `#EAB308` or `#FACC15` in charts)
- `--primary-foreground`: Text color on primary backgrounds.
- `--secondary`: Used for secondary/fallback text and neutral status backgrounds.
- `--secondary-foreground`: Text color on secondary backgrounds.
- `--success`: Used for Cash payments and positive financial indicators. (e.g., `text-success`, `bg-success/10`)
- `--warning`: Used for Card payments and pending statuses. (e.g., `text-warning`, `bg-warning/10`)
- `--danger`: Used for unpaid/failed transactions and expense trends in charts. (e.g., `#EF4444` in charts, `text-danger`)

## Backgrounds and Surfaces

- `--bg-page`: The main background of the finance view.
- `--bg-card`: The background of KPI cards, charts, and the payments table.
- `--bg-input`: Background for the tab switcher and input elements.
- `--border`: Standard border color for all cards and table divisions.

## External Chart Limitations

Third-party chart libraries (like ApexCharts) sometimes cannot resolve CSS custom properties directly depending on how they render to canvas or SVG. In these explicit cases, the Finance module maps theme semantics to hardcoded hex values strictly inside the chart configuration options (e.g., `#FACC15` for primary/revenue, `#EF4444` for danger/expenses, and `#A1A1AA` for neutral text). These hex values are not allowed in regular JSX `className` props.

## Loading and Empty States

- `--skeleton-base`: Base color for loading skeletons.
- `--skeleton-highlight`: Highlight color for loading skeletons.
