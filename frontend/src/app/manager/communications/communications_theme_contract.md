# Manager Communications Theme Contract

This contract defines the semantic CSS tokens required for the **Manager Communications** module. All components within this module must adhere exclusively to these tokens. Arbitrary values (`bg-blue-500`, `text-[#ff0000]`, `bg-[var(--danger)]`) are strictly prohibited.

## Core Backgrounds
* `--bg-page` - Primary application background.
* `--bg-card` - Background for modules, modals, and tables (e.g. `ManagerCommunicationsMain`, `ManagerCommunicationsHistory`).
* `--bg-input` - Background for input fields, textareas, and dropdowns.
* `--bg-muted` - Background for muted/inactive UI elements.

## Borders
* `--border` - Default border for cards, table rows, and modals.
* `--border-danger` - Validation error state border (e.g. required field in forms).

## Text Colors
* `--text-primary` - Default high-contrast text.
* `--text-secondary` - Subdued text (e.g. descriptions, timestamps).
* `--text-foreground` - Primary reading text.

## Semantic Status / KPIs
The communications module requires specific semantic colors for representing campaign status and KPI indicators:

### Backgrounds
* `--info-bg` - Background for active states or informational icons.
* `--warning-bg` - Background for partial successes or warning states.
* `--success-bg` - Background for sent statuses or successful outcomes.
* `--danger-bg` - Background for failed statuses or alerts.
* `--primary-subtle` - Background for hover states on rows and buttons.

### Text
* `--text-info` - Text for informational content.
* `--text-warning` - Text for warnings or partial success.
* `--text-success` - Text for successful sent messages.
* `--text-danger` - Text for failed messages or destructive actions.
* `--text-primary` (brand) - Brand color for action buttons (e.g., Send Campaign, Switch Tabs).

## Motion & Skeleton
* `motion-safe:animate-pulse` - Wrapper for loading skeletons.
* `--skeleton-base` / `--skeleton-highlight` - Default loading skeleton colors mapped to `bg-muted`.
