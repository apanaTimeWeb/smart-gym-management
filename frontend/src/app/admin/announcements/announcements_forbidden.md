# Forbidden Patterns — `admin/announcements`

## 1. No Announcements Received Here
**FORBIDDEN:** Rendering incoming system alerts or notifications in this module.
**ALLOWED:** This module is outbound-only — creating and publishing announcements to members/staff.

## 2. No Client-Side Publish Scheduling
**FORBIDDEN:** Using `setTimeout` or `setInterval` to trigger publish on the frontend.
**ALLOWED:** Send `scheduledAt: ISO8601` in the POST body; let the backend handle scheduling.

## 3. No Direct `apiFetch` in Components
**FORBIDDEN:** Calling `apiFetch` directly from `.tsx` files.
**ALLOWED:** All API calls go through the module's API client.

## 4. No Hardcoded URLs
**FORBIDDEN:** `'/admin/announcements'` string literals in components.
**ALLOWED:** Import from `AdminAnnouncementsUrlConfig`.

## 5. No Relative Imports
**FORBIDDEN:** `../../` import paths.
**ALLOWED:** Absolute `@/app/admin/announcements/...` paths.

## 6. No Cross-Role Imports
**FORBIDDEN:** Importing from `/manager`, `/trainer`, `/superadmin`.

## 7. No Barrel Files
**FORBIDDEN:** `index.ts` re-exports.
