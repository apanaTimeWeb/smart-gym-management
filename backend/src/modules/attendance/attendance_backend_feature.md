# Attendance Module - Backend Feature Documentation

## Overview
The Attendance module tracks daily check-ins and check-outs for both Gym Members and Staff. It calculates real-time daily statistics and adheres strictly to the micro-modular architecture, utilizing TypeORM for all database interactions.

## Folder Structure & File Responsibilities

### `controllers/`
- **`mark-attendance.controller.ts`**: Handles the `POST /api/attendance` endpoint. Used by scanners or receptionists to check-in/out a user.
- **`find-attendance.controller.ts`**: Handles `GET /api/attendance`. Supports query filtering (e.g., by memberId or staffId) for fetching historical records.
- **`attendance-stats.controller.ts`**: Handles `GET /api/attendance/today-stats`. Returns aggregated check-in counts for the current day.

### `services/`
- **`mark-attendance.service.ts`**: Business logic validating that an attendance record is linked to a valid user, and delegating the creation.
- **`find-attendance.service.ts`**: Handles the fetching logic for historical attendances.
- **`attendance-stats.service.ts`**: Calculates date ranges (midnight to midnight) to fetch accurate daily aggregates.
- **`attendance.repository.ts`**: The dedicated data-access layer wrapping `Repository<Attendance>`. Abstracts all SQL where-clauses and joins.

### `dto/`
- **`mark-attendance.dto.ts`**: Validates the payload for marking attendance, ensuring the `AttendanceType` enum is respected.
- **`find-attendance.dto.ts`**: Validates query parameters for filtering records.

### `tests/`
- **`mark-attendance.service.spec.ts`**: Co-located unit tests ensuring `UserNotLinkedException` triggers correctly.

### Module Root
- **`attendance.constants.ts`**: Centralized response messages.
- **`attendance.exceptions.ts`**: Custom exceptions (e.g., `UserNotLinkedException`).
- **`attendance.interfaces.ts`**: Typings for internal data shapes.
- **`entities/attendance.entity.ts`**: The TypeORM entity schema with a `uuid` primary key.
- **`attendance.module.ts`**: Configures DI, linking controllers to services and the repository.

## Core Logic & Workflows
1. **Polymorphic Foreign Keys**: An `Attendance` row belongs to either a `Member` or a `Staff`. The `mark-attendance` logic guarantees at least one ID is present to prevent orphaned records.
2. **Stats Calculation**: The stats service dynamically calculates the current day's bounding timestamps (00:00:00 to 23:59:59) and runs parallel database queries via `Promise.all` in the repository for performance optimization.
