# Manager Inquiries Theme Contract

This contract defines the semantic CSS tokens required for the **Manager Inquiries** module. All components within this module must adhere exclusively to these tokens. Arbitrary values (`bg-blue-500`, `text-[#ff0000]`, `bg-[var(--danger)]`) are strictly prohibited.

## Core Backgrounds
* `--bg-page` - Primary application background.
* `--bg-card` - Background for modules, modals, and tables (e.g. `ManagerInquiriesTable`, `ManagerInquiriesModal`).
* `--bg-input` - Background for input fields, textareas, and dropdowns.

## Borders
* `--border` - Default border for cards, table rows, and modals.
* `--border-danger` - Validation error state border (e.g. required field in `ManagerInquiriesModal`).

## Text Colors
* `--text-primary` - Default high-contrast text (e.g. inquiry name, title).
* `--text-secondary` - Subdued text (e.g. inquiry phone, email, date).

## Semantic Status / KPIs
The inquiries module requires specific semantic colors for representing leads state and KPI indicators:

### Backgrounds
* `--info-bg` - Background for "Total Inquiries" KPI card icon.
* `--warning-bg` - Background for "New" and "Follow Up" KPI card icons, and initial avatars.
* `--success-bg` - Background for "Converted" KPI card icon and WhatsApp action button.
* `--primary-subtle` - Background for hover states on rows and buttons.
* `--danger-bg` - Background for delete actions.

### Text
* `--text-info` - Text for "Total Inquiries" KPI card icon.
* `--text-warning` - Text for "New" and "Follow Up" KPI card icons, and initial avatars.
* `--text-success` - Text for "Converted" KPI card icon.
* `--text-danger` - Text for destructive actions (Delete button, error messages).
* `--text-primary` (brand) - Brand color for action buttons (Add Inquiry) and checkbox highlights.

## Motion & Skeleton
* `motion-safe:animate-pulse` - Wrapper for loading skeletons.
* `--skeleton-base` / `--skeleton-highlight` - Default loading skeleton colors mapped to `bg-muted`.
