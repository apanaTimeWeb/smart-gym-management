# Forbidden Patterns — `manager/notifications`

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
