# Admin Members — Feature Map

## Module Purpose
The Members module gives gym admins a comprehensive read-focused view of all gym members.
Because admins are viewers (not operators), this module emphasises search, filtering, and
profile inspection. Admins can view member profiles, subscription status, attendance
summary, and payment history. Write operations (adding members, renewals, payments) belong
to the Manager role. The admin can export the member list for reporting purposes.

## Feature Inventory
| Feature | Route | What the Admin Can Do | Main API Calls | Status |
|---|---|---|---|---|
| Member List | `/admin/members` | Paginated, searchable, filterable member directory | `GET /admin/members?page&limit&search&status` | ✅ Live |
| Member Profile | `/admin/members` | View full profile: personal info, plan, attendance, payments | `GET /admin/members/:id` | ✅ Live |
| Export Members | `/admin/members` | Download member list as CSV | `GET /admin/members/export` | ✅ Live |

## Edge Cases / AI Warnings
- **Admins are read-only** — never add Add Member, Edit Member, Renew, or Payment buttons here.
- **Phone numbers must be masked** in list view: `98****2310`. Use `maskSensitiveData()` from `@/lib/utils`.
- **Row click opens profile** — no separate View/Eye button (Rule 19).
- Server-side pagination is mandatory.

## Rule Compliance Checklist
- [x] Rule 8: `page.tsx` is Server Component
- [x] Rule 11: `members_url_config.ts` present
- [x] Rule 13: This document
- [x] Rule 40: `members_forbidden.md` present
- [x] Rule 43: Phone masking in list view
