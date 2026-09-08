# profile — Forbidden Patterns

These rules are absolute for this module. No exceptions.

1. **No API calls in `.tsx` files** — All fetch/mutation calls must go through `superadmin_profile_api.ts`. Components receive data and callbacks via props only.

2. **No hardcoded credentials or PII** — Never embed real passwords, tokens, or personal data in mock objects or test fixtures.

3. **No hardcoded URLs** — All API paths must reference `SuperadminProfileUrlConfig.BACKEND_API.*`. No inline strings like `"/superadmin/profile"`.

4. **No direct `fetch()` calls** — Always use the shared `apiFetch` wrapper from `@/lib/api`.

5. **No `useEffect` for data fetching** — Data loading belongs in the API layer or a custom hook. `useEffect` is only permitted for form `reset()` sync after prop changes.

6. **No inline style objects** — Use CSS variable tokens (`bg-card`, `text-danger`, `text-secondary`) exclusively. No `style={{ color: '#...' }}` or arbitrary Tailwind values.

7. **No password stored in component state beyond the form lifecycle** — Password field values must be cleared immediately after submission via `reset()`.

8. **No 2FA toggle without password confirmation** — The `handleToggle2FA` handler must always require a non-empty `twoFAPassword` before calling the API.

9. **No mutation logic in child components** — `SuperadminProfilePersonalForm` and `SuperadminProfileSecurityForm` emit callbacks to `SuperadminProfileMain`. They never call the API directly.

10. **No tab state in child components** — Tab switching (`personal` / `security`) is owned exclusively by `SuperadminProfileMain`. Child components are stateless regarding navigation.
