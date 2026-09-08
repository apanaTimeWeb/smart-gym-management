# Admin Audit Logs — Feature Map

## Module Purpose
The Audit Logs module provides gym admins with an immutable chronological record of all
significant actions performed within their gym account — member additions, payment recordings,
staff changes, settings updates, and more. It is a compliance and accountability tool.
Admins can filter logs by date range, actor, action type, and entity. Logs cannot be
edited or deleted from the frontend — they are an append-only audit trail. Admins can
export the log as a CSV for compliance reporting.

## Feature Inventory
| Feature | Route | What the Admin Can Do | Main API Calls | Status |
|---|---|---|---|---|
| Audit Log List | `/admin/audit_logs` | Browse paginated action history with filters | `GET /admin/audit-logs?page&limit&actor&action&from&to` | ✅ Live |
| Export Logs | `/admin/audit_logs` | Download filtered log as CSV | `GET /admin/audit-logs/export?...` | ✅ Live |

## Edge Cases / AI Warnings
- **Logs are immutable** — never add delete or edit functionality.
- **Backend path is `/admin/audit-logs`** (hyphen), but the frontend folder is `audit_logs` (underscore). Use `AdminAuditLogsUrlConfig.BACKEND_API.BASE` — never hardcode.
- **Date filtering is UTC** — display timestamps in local time using `date-fns`, never raw ISO strings.
- Server-side pagination mandatory — do not fetch all records and filter on the client.

## Rule Compliance Checklist
- [x] Rule 8: `page.tsx` is Server Component
- [x] Rule 11: `audit_logs_url_config.ts` present
- [x] Rule 13: This document
- [x] Rule 40: `audit_logs_forbidden.md` present
