# Admin Usage & Subscription — Feature Map

## Module Purpose
The Usage module gives gym admins real-time visibility into their subscription plan limits
and current resource consumption. Admins can monitor how many members they have vs their plan
cap, how much storage they're using, how many SMS have been sent, and when their billing cycle
renews. This module is read-only for data but allows admins to request a plan upgrade (which
triggers a notification to the Superadmin). It prevents surprise service disruptions by
surfacing near-limit warnings with color-coded progress bars.

---

## Directory Structure

| Folder / File | Responsibility | Key Files |
|---|---|---|
| `page.tsx` | Server Component entry point | — |
| `loading.tsx` | Skeleton matching metric cards grid | — |
| `error.tsx` | Module-level error boundary with retry | — |
| `usage_api/AdminUsageApi.ts` | API client — `fetchMyUsage()`, `requestUpgrade()` | `AdminUsageApi.ts` |
| `usage_components/AdminUsageMain/` | Root client orchestrator | `AdminUsageMain.tsx` |
| `usage_components/AdminUsageMetricCard/` | Single resource metric card with progress bar | `AdminUsageMetricCard.tsx` |
| `usage_components/AdminUsagePlanCard/` | Current plan info + upgrade CTA | `AdminUsagePlanCard.tsx` |
| `usage_context/useAdminUsageLogic.ts` | Custom hook — fetches usage data, derives metric cards | `useAdminUsageLogic.ts` |
| `usage_types/` | Types: `AdminUsageData`, `AdminUsageMetric`, `UsageFetchState` | — |
| `usage_utils/` | Constants: `USAGE_WARNING_THRESHOLD`, metric label map | — |
| `usage_url_config.ts` | Centralized URL config | `usage_url_config.ts` |

---

## Feature Inventory

| Feature | Route | What the Admin Can Do | Key Components | Main API Calls | Status |
|---|---|---|---|---|---|
| Usage Dashboard | `/admin/usage` | View all plan limits and current consumption with progress bars | `AdminUsageMain`, `AdminUsageMetricCard` | `GET /admin/usage` | ✅ Live (mock data) |
| Current Plan Banner | `/admin/usage` | View active plan name, monthly price, billing cycle end date | `AdminUsagePlanCard` | — | ✅ Live |
| Plan Comparison | `/admin/usage` | Compare current plan vs available upgrade tiers | `AdminUsagePlanCard` | `GET /admin/usage/plans` | ⚠️ Stub |
| Request Upgrade | `/admin/usage` | Send upgrade request to Superadmin | `AdminUsagePlanCard` | `POST /admin/usage/upgrade-request` | ⚠️ Stub |

---

## Edge Cases and AI Warnings

- **The current `adminUsageApi` in `admin_api/admin_usage_api.ts` is a mock stub** — it resolves with hardcoded data via `setTimeout`. The canonical implementation must use `adminUsageApi.fetchMyUsage()` from `usage_api/AdminUsageApi.ts` via `apiFetch`.
- **Near-limit warning threshold** — when usage reaches ≥80% of a limit, the progress bar must turn amber (`text-warning`). When ≥95%, it must turn red (`text-danger`). This threshold must be defined as `USAGE_WARNING_THRESHOLD = 0.8` and `USAGE_CRITICAL_THRESHOLD = 0.95` in `usage_utils/`, never hardcoded in components.
- **Admins cannot change their plan directly.** The "Upgrade" action sends a request to the Superadmin — it does not charge or change anything immediately. The UI must make this clear.

---

## Rule Compliance Checklist

- [x] Rule 8: Server/Client Boundary — `page.tsx` is Server Component
- [x] Rule 9: `loading.tsx` + `error.tsx` present
- [x] Rule 11: Centralized URL Config — `AdminUsageUrlConfig` in `usage_url_config.ts`
- [x] Rule 13: Feature Map — this document
- [x] Rule 40: `usage_forbidden.md` present
- [ ] Rule 14: Mock stub in `admin_usage_api.ts` must be replaced with real `apiFetch` call
- [ ] Rule 75: MSW handler not yet configured
