# Broadcasts Module — Backend Feature Documentation

## Overview
The Broadcasts module manages platform-wide announcements sent by superadmins to all gym tenants (or a filtered audience). Broadcasts appear in the tenant's ERP notification center and/or are sent via email.

## Folder Structure & File Responsibilities

### `controllers/`
- **`broadcasts.controller.ts`**: Full CRUD + send action:
  - `GET /superadmin/broadcasts` — list all broadcasts
  - `POST /superadmin/broadcasts` — create a new broadcast (status: DRAFT)
  - `PATCH /superadmin/broadcasts/:id` — update a DRAFT/SCHEDULED broadcast
  - `DELETE /superadmin/broadcasts/:id` — remove a broadcast
  - `POST /superadmin/broadcasts/:id/send` — immediately send a DRAFT/SCHEDULED broadcast

### `services/`
- **`broadcasts.service.ts`**: Business logic using `DUMMY_BROADCASTS` from `superadmin.constants.ts`.

### `dto/`
- **`create-broadcasts.dto.ts`**: Validates `title`, `content`, `audience` (enum), and optional `scheduledDate`.
- **`update-broadcasts.dto.ts`**: `PartialType` of the create DTO.

### `entities/`
- **`broadcasts.entity.ts`**: TypeORM entity for the `superadmin_broadcasts` table.

### Module Root
- **`broadcasts.constants.ts`**: Message strings, `BROADCAST_AUDIENCE` values (Rule 5).
- **`broadcasts.exceptions.ts`**: `BroadcastNotFoundException`, `BroadcastAlreadySentException` (Rule 6).
- **`broadcasts.interfaces.ts`**: `IBroadcast` type shape (Rule 4).

## Core Business Logic
- A broadcast with `status: SENT` is **immutable** — attempts to update or delete it will throw `BroadcastAlreadySentException`.
- The `POST /:id/send` action queues the broadcast delivery as a background job (Rule 23) returning `202 Accepted` immediately. The actual email/notification delivery happens asynchronously.
- `audience` filtering (`PRO_ONLY`, `ENTERPRISE_ONLY`, etc.) filters which gym tenants receive the message based on their `SaaSPlanTier`.
