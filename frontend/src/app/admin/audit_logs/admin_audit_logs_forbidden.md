# Forbidden Patterns — `admin/audit_logs`

## 1. No Delete or Edit of Log Entries
**FORBIDDEN:** Any button, form, or API call that modifies or deletes audit log records.
**REASON:** Audit logs are an immutable compliance record.

## 2. No Client-Side Full-Table Fetch
**FORBIDDEN:** Fetching all audit log records and filtering/paginating on the client.
**ALLOWED:** Always pass `page`, `limit`, and filter params to the backend API.

## 3. No Raw ISO Timestamp Display
**FORBIDDEN:** Rendering `log.timestamp` directly in JSX.
**ALLOWED:** Always convert to local time with `date-fns` or `dayjs` before display.

## 4. No Hardcoded Backend Path
**FORBIDDEN:** `'/admin/audit-logs'` string literals in components or hooks.
**ALLOWED:** Import from `AdminAuditLogsUrlConfig`.

## 5. No Cross-Role Imports / No Relative Imports / No Barrel Files
Standard rules apply — see `admin_forbidden.md` for global admin rules.
