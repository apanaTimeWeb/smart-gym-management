# Forbidden Patterns for `superadmin/cancellations`

1. **No Mixed UI and Logic:** All heavy logic MUST reside in custom hooks, not inside `.tsx` components.
2. **No Relative Imports:** Always use absolute paths starting with `@/app/superadmin/cancellations/...`.
3. **No Barrel Files:** Do not create `index.ts` files. Import files directly.
4. **No Direct `window.confirm`:** Use `SuperadminCancellationsActionModal` for all confirmations.
5. **No Arbitrary Tailwind Values:** Use design system tokens only (`bg-card`, `text-danger`, etc.).
6. **No Hardcoded Toast Messages:** Display `res.message` from the backend response envelope.
7. **No Direct `apiFetch` in Components:** All API calls go through `superadmin_cancellations_api.ts`.
8. **No Inline Status Styles:** `CANCELLATIONS_RISK_STYLES` and `CANCELLATIONS_ACTION_STATUS_STYLES` live in `cancellations_constants.ts` — never inline.
9. **No `key={index}`:** All list renders use stable IDs (`alert.id`).
10. **No Cross-Module Imports:** Zero imports from `/admin`, `/manager`, `/trainer`.
