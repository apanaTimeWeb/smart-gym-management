# Forbidden Patterns for `superadmin/churn-alerts`

1. **No Mixed UI and Logic:** All heavy logic MUST reside in custom hooks, not inside `.tsx` components.
2. **No Relative Imports:** Always use absolute paths starting with `@/app/superadmin/churn-alerts/...`.
3. **No Barrel Files:** Do not create `index.ts` files. Import files directly.
4. **No Direct `window.confirm`:** Use `SuperadminChurnActionModal` for all confirmations.
5. **No Arbitrary Tailwind Values:** Use design system tokens only (`bg-card`, `text-danger`, etc.).
6. **No Hardcoded Toast Messages:** Display `res.message` from the backend response envelope.
7. **No Direct `apiFetch` in Components:** All API calls go through `superadmin_churn_api.ts`.
8. **No Inline Status Styles:** `CHURN_RISK_STYLES` and `CHURN_ACTION_STATUS_STYLES` live in `churn_constants.ts` — never inline.
9. **No `key={index}`:** All list renders use stable IDs (`alert.id`).
10. **No Cross-Module Imports:** Zero imports from `/admin`, `/manager`, `/trainer`.
