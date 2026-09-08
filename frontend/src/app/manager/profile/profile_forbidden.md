# Manager Profile — Forbidden Patterns

## Strictly Forbidden in This Module

1. **No cross-role imports** — Never import from `/admin`, `/trainer`, or `/superadmin`.
2. **No email editing** — The email field must always be `readOnly`. Never add an onChange handler to it.
3. **No role editing** — The role field is display-only. Never make it a dropdown or editable input.
4. **No direct `window.localStorage` access** — Use `getUser()` from `@/lib/api` only.
5. **No hardcoded user data** — Never hardcode names, emails, or roles as fallback strings beyond generic placeholders like `'Manager'`.
6. **No `window.confirm()`** — Not applicable here but forbidden globally.
7. **No `any` types** — All API payloads must use typed interfaces from `ManagerProfileTypes.ts`.
