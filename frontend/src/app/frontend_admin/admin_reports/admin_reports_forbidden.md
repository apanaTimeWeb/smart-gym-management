# Forbidden Patterns — `admin/reports`

## 1. No Recharts or Chart.js
**FORBIDDEN:** `import { LineChart } from 'recharts'` or any Chart.js import.
**ALLOWED:** `import Chart from 'react-apexcharts'` only.

## 2. No Mutations
**FORBIDDEN:** Any write operation (POST, PATCH, DELETE) from this module.
**ALLOWED:** Read-only GET calls for report data.

## 3. No Raw Date Display
**FORBIDDEN:** Rendering ISO date strings directly.
**ALLOWED:** Always format with `date-fns` or `dayjs`.

## 4. No Native Range Date Picker
**FORBIDDEN:** Two separate `<input type="date">` elements for a date range.
**ALLOWED:** Use `AdminDateRangePicker` shared component or a proper date range picker component.

## 5. No Cross-Role Imports / No Relative Imports / No Barrel Files
Standard rules apply.
