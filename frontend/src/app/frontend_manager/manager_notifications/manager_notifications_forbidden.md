# Forbidden Patterns — `frontend_manager/manager_notifications`

## 1. No `'use client'` in `page.tsx`
`page.tsx` must remain a Server Component. Only `ManagerNotificationsMain.tsx` uses `'use client'`.

## 2. No `alert()` or `window.confirm()`
Always use `useManagerConfirm()` from `ManagerConfirmProvider` (Rule 71).

## 3. No ManagerHeader import in any component
The layout handles the header. Never import `ManagerHeader` inside this module.

## 4. No animations without `motion-safe:` prefix
All Tailwind transition/animation classes must be prefixed with `motion-safe:` (Rule 29).

## 5. No cross-role imports
Zero imports from `/admin`, `/trainer`, `/superadmin`.

## 6. No hardcoded notification data in components
Seed data lives in `notifications_utils/ManagerNotificationsSharedConstants.ts` only.


## Mock Isolation Prohibitions
- Do not place feature mock data outside this module.
- Do not create duplicate global mock handlers for this module.
- Do not import another module's business fixtures.
- Do not add component-level fake business fallbacks.
- Do not bypass the module API client by reading fixtures directly.
- Do not modify global MSW bootstrap for a module-local feature change unless registration is actually required.
