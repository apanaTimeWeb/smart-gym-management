# Forbidden Patterns — `admin/gym-comparison`

## 1. No Recharts or Chart.js
**FORBIDDEN:** Importing from `recharts` or `chart.js`.
**ALLOWED:** `react-apexcharts` only — per Design §10 and Rule 62.

## 2. No Native `<select multiple>` for Branch Selection
**FORBIDDEN:** `<select multiple>` HTML element.
**ALLOWED:** Custom popover with checkboxes and search input.

## 3. No Member-Level Data
**FORBIDDEN:** Fetching individual member records in this module.
**ALLOWED:** Aggregate branch metrics only.

## 4. No Cross-Role Imports / No Relative Imports / No Barrel Files
Standard rules apply.
