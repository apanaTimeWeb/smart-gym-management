# Admin Announcements — Feature Map

## Module Purpose
The Announcements module lets gym admins create, schedule, and publish notices to members
and staff across their branch(es). Admins can draft announcements with rich text, set a
target audience (all members, specific batch, all staff), schedule a publish date, and
view engagement metrics. This is strictly an outbound communication tool — admins push
announcements, members receive them via the member app or notice board. Admins cannot
receive announcements here; that belongs in Notifications.

## Feature Inventory
| Feature | Route | What the Admin Can Do | Main API Calls | Status |
|---|---|---|---|---|
| Announcement List | `/admin/announcements` | View all published + scheduled announcements | `GET /admin/announcements` | ✅ Live |
| Create Announcement | `/admin/announcements` | Draft + publish or schedule a new announcement | `POST /admin/announcements` | ✅ Live |
| Publish Draft | `/admin/announcements` | Publish a draft immediately | `POST /admin/announcements/:id/publish` | ✅ Live |
| Delete Announcement | `/admin/announcements` | Permanently delete an announcement | `DELETE /admin/announcements/:id` | ✅ Live |

## Edge Cases / AI Warnings
- **Admins cannot receive announcements** — the module is outbound only. Incoming alerts go to `notifications/`.
- **Scheduled announcements run server-side** — the frontend only sets the schedule; it does not poll or fire the publish itself.
- **Deletion is permanent** — use `useConfirm()` before calling delete.
- All API calls must import from `AdminAnnouncementsUrlConfig` — never hardcode `/admin/announcements`.

## Rule Compliance Checklist
- [x] Rule 8: `page.tsx` is Server Component
- [x] Rule 11: `announcements_url_config.ts` present
- [x] Rule 13: This document
- [x] Rule 40: `announcements_forbidden.md` present
