# Audit Logs Module — Backend Feature Documentation

## Overview
The Audit Logs module provides a **read-only, append-only** global activity trail of all significant actions performed by Superadmin staff (`SUPERADMIN`, `SUPPORT_AGENT`, `BILLING_ADMIN` roles). This implements Rule 30 (Audit Trail / Activity Log).

> **This is different from the ERP `audit` module**, which tracks tenant-level data changes (member updates, payment deletions). This module tracks *superadmin-level* platform operations.

## Folder Structure & File Responsibilities

### `controllers/`
- **`audit-logs.controller.ts`**: Read-only endpoint. Exposes `GET /superadmin/audit-logs` with filtering by `actorRole`, `tenantId`, and pagination.

### `services/`
- **`audit-logs.service.ts`**: Fetches from dummy data in `superadmin.constants.ts` (`DUMMY_GLOBAL_AUDIT_LOGS`). Will query the `superadmin_audit_logs` table once the DB is wired.

### `dto/`
- **`find-audit-logs.dto.ts`**: Query params — `page`, `limit`, optional `tenantId`, `actorRole` filter.

### `entities/`
- **`global-audit-log.entity.ts`**: TypeORM entity for the `superadmin_audit_logs` table with columns: `actorName`, `actorRole` (enum), `action`, `targetResource`, `timestamp`, `ipAddress`.

### Module Root
- **`audit-logs.constants.ts`**: `AUDIT_LOG_ACTIONS` action string constants and error messages (Rule 5).
- **`audit-logs.exceptions.ts`**: `AuditLogNotFoundException` (Rule 6).
- **`audit-logs.interfaces.ts`**: `IGlobalAuditLog` type shape (Rule 4).

## Core Business Logic
1. **Write path**: Audit log entries are created by a global `AuditInterceptor` / event listeners in other superadmin modules, NOT by a direct API call. There is no `POST /audit-logs` endpoint — logs are an internal side-effect.
2. **Read path**: The controller only supports paginated `GET` queries. No updates or deletes are permitted on audit logs.
3. **Actor Roles**: Valid roles are `SUPERADMIN`, `SUPPORT_AGENT`, and `BILLING_ADMIN` — defined in the `IGlobalAuditLog` interface.
