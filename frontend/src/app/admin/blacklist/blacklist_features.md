# Admin Blacklist — Feature Map

## Module Purpose
The Blacklist module allows gym admins to manage members who have been banned from the gym.
Admins can view the full blacklist (reason, date added, who added), add new members to the
blacklist with a mandatory reason, and remove members from the blacklist when appropriate.
Blacklisting a member immediately blocks their access to all gym services and the member app.
This is a high-sensitivity operation requiring `useConfirm()` for both add and remove actions.

## Feature Inventory
| Feature | Route | What the Admin Can Do | Main API Calls | Status |
|---|---|---|---|---|
| Blacklist Table | `/admin/blacklist` | View all blacklisted members with reason and date | `GET /admin/blacklist` | ✅ Live |
| Add to Blacklist | `/admin/blacklist` | Blacklist a member — requires reason | `POST /admin/blacklist` | ✅ Live |
| Remove from Blacklist | `/admin/blacklist` | Restore a member's access | `DELETE /admin/blacklist/:id/remove` | ✅ Live |

## Edge Cases / AI Warnings
- **Blacklisting is immediately effective** — the member's session is invalidated server-side.
- **Add and Remove both require `useConfirm()`** — single-click blacklisting is forbidden.
- **Reason field is mandatory** — validate non-empty before submission.
- **`BLACKLIST_STATUS_STYLES`** must be defined in `blacklist_utils/` constants — never inline.

## Rule Compliance Checklist
- [x] Rule 8: `page.tsx` is Server Component
- [x] Rule 11: `blacklist_url_config.ts` present
- [x] Rule 13: This document
- [x] Rule 40: `blacklist_forbidden.md` present
- [x] Rule 71: Both add + remove use `useConfirm()`
