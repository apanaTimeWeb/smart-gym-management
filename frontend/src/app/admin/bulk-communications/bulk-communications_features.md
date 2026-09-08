# Admin Bulk Communications — Feature Map

## Module Purpose
The Bulk Communications module lets gym admins send mass messages to defined member
segments via WhatsApp or SMS. Admins can choose a pre-built template (or write a custom
message), select a target audience filter (all active members, expiring this week, specific
batch), preview the recipient list, and dispatch the campaign. The module also shows
delivery history and send status per batch. This is the primary tool for renewal reminders,
event invites, and gym announcements at scale.

## Feature Inventory
| Feature | Route | What the Admin Can Do | Main API Calls | Status |
|---|---|---|---|---|
| Send Campaign | `/admin/bulk-communications` | Choose template + audience → preview → send | `POST /admin/bulk-communications/send` | ✅ Live |
| Template Library | `/admin/bulk-communications` | Browse and select message templates | `GET /admin/bulk-communications/templates` | ✅ Live |
| Delivery History | `/admin/bulk-communications` | View past campaigns with delivery status | `GET /admin/bulk-communications/history` | ✅ Live |

## Edge Cases / AI Warnings
- **WhatsApp brand color is `#25D366`** — never remap to theme tokens. Use the hardcoded hex per Design §69.
- **Sending to large segments can cost SMS/WhatsApp credits** — show recipient count prominently before send and require `useConfirm()`.
- **Templates must come from the API** — never hardcode template text in components.

## Rule Compliance Checklist
- [x] Rule 8: `page.tsx` is Server Component
- [x] Rule 11: `bulk-communications_url_config.ts` present
- [x] Rule 13: This document
- [x] Rule 40: `bulk-communications_forbidden.md` present
