# Forbidden Patterns — `admin/usage`

## 1. No Direct Plan Changes
**FORBIDDEN:** Any API call that directly switches the gym's subscription plan.
**REASON:** Plan changes require Superadmin authorization. Admins can only submit a request.
**ALLOWED:** `POST /admin/usage/upgrade-request` — sends a request to the Superadmin.

## 2. No Hardcoded Usage Thresholds
**FORBIDDEN:** `if (percent >= 0.8)` inline in JSX or hooks.
**REASON:** Thresholds must be named constants so they can be changed in one place.
**ALLOWED:** Import `USAGE_WARNING_THRESHOLD` and `USAGE_CRITICAL_THRESHOLD` from `usage_utils/`.

## 3. No Mock Stubs in Production
**FORBIDDEN:** Shipping `admin_api/admin_usage_api.ts` with `Promise.resolve(hardcoded_data)` to production.
**ALLOWED:** Use `adminUsageApi.fetchMyUsage()` from `usage_api/AdminUsageApi.ts` which calls `apiFetch`.

## 4. No Cross-Role Imports
**FORBIDDEN:** Importing from `/manager`, `/trainer`, or `/superadmin` modules.

## 5. No Direct `apiFetch` in Components
**FORBIDDEN:** Calling `apiFetch` directly from `.tsx` files.
**ALLOWED:** All API calls go through `usage_api/AdminUsageApi.ts`.

## 6. No Relative Imports
**FORBIDDEN:** Relative paths like `../../usage_types/...`
**ALLOWED:** Absolute paths: `@/app/admin/usage/usage_types/...`

## 7. No Barrel Files
**FORBIDDEN:** `index.ts` re-exports.
