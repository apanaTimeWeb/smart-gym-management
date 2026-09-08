# Admin Data Export — Feature Map

## Module Purpose
The Data Export module allows gym admins to request and download structured exports of their
gym data — members, attendance, payments, and audit logs — in CSV or Excel format. Exports
are generated server-side (asynchronously for large datasets) and downloaded when ready.
Admins can view their export request history and re-download previous exports. This module
is critical for compliance, accounting, and data portability.

## Feature Inventory
| Feature | Route | What the Admin Can Do | Main API Calls | Status |
|---|---|---|---|---|
| Request Export | `/admin/data-export` | Select data type + date range → trigger export | `POST /admin/data-export/request` | ✅ Live |
| Export History | `/admin/data-export` | View past export requests and download links | `GET /admin/data-export/history` | ✅ Live |
| Download Export | `/admin/data-export` | Download a completed export file | `GET /admin/data-export/:id/download` | ✅ Live |

## Edge Cases / AI Warnings
- **Large exports are async** — the backend processes them in a queue. Show a "processing" state and poll or use WebSocket for completion notification.
- **Download uses `window.open` or an anchor with `download` attribute** — never use `fetch()` to stream files client-side without proper handling.
- **Export files may contain sensitive PII** — show a data privacy notice before the first export.
- **Expired download links** — links may expire after 24 hours; show expiry time in the history table.

## Rule Compliance Checklist
- [x] Rule 8: `page.tsx` is Server Component
- [x] Rule 11: `data-export_url_config.ts` present
- [x] Rule 13: This document
- [x] Rule 40: `data-export_forbidden.md` present
