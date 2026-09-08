# Forbidden Patterns — `admin/gym-health-alerts`

## 1. No `setInterval` for Refresh
**FORBIDDEN:** `setInterval(() => refetch(), 60000)` in components or hooks.
**ALLOWED:** `useQuery({ refetchInterval: 60_000 })` in the TanStack Query hook.

## 2. No Inline Alert Severity Colors
**FORBIDDEN:** `className={alert.severity === 'CRITICAL' ? 'text-red-500' : ...}` in JSX.
**ALLOWED:** `GYM_HEALTH_ALERT_SEVERITY_STYLES[alert.severity]` from `gym-health-alerts_utils/`.

## 3. No Non-Interactive KPI Cards
**FORBIDDEN:** KPI stat cards that are purely decorative.
**ALLOWED:** Clicking a severity KPI card filters the alert list to that severity only (Rule 70).

## 4. No Cross-Role Imports / No Relative Imports / No Barrel Files
Standard rules apply.
