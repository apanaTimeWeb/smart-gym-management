# Backups Module — Backend Feature Documentation

## Overview
The Backups module tracks and manages database backup records for all tenant databases. It serves the superadmin interface's Backups page, showing per-tenant backup status, sizes, and timestamps.

## Folder Structure & File Responsibilities

### `controllers/`
- **`backups.controller.ts`**: Exposes `GET /superadmin/backups` (list all backup records with pagination) and `POST /superadmin/backups/trigger` (trigger an ad-hoc backup for a specific tenant).

### `services/`
- **`backups.service.ts`**: Returns backup records from `DUMMY_BACKUPS` in `superadmin.constants.ts`. The trigger action simulates queuing a backup job (Rule 23: Background Jobs).

### `dto/`
- **`find-backups.dto.ts`**: Pagination + optional `tenantId` filter.

### `entities/`
- **`backup-record.entity.ts`**: TypeORM entity — stores `tenantName`, `databaseName`, `sizeMB`, `status`, `timestamp`.

### Module Root
- **`backups.constants.ts`**: Message strings, `BACKUP_STATUS` values (Rule 5).
- **`backups.exceptions.ts`**: `BackupNotFoundException`, `BackupTriggerFailedException` (Rule 6).
- **`backups.interfaces.ts`**: `IBackupRecord` type shape (Rule 4).

## Core Business Logic
- Backups are typically triggered by a nightly cron job (Rule 23), not directly by this controller. The `POST /trigger` endpoint is for ad-hoc, emergency backups only.
- The `sizeMB` field is populated after the backup job completes and updates the record.
- A backup `status` of `IN_PROGRESS` means a lock should prevent another backup from being triggered for the same tenant.
