# HR Module - Backend Feature Documentation

## Overview
The HR Module is a dual-domain module responsible for managing the Gym's `Staff` and their associated `Payroll`. It handles onboarding, salary assignments, payroll record generation, and status tracking (paid vs pending).

## Folder Structure & File Responsibilities

### `controllers/`
- **`staff.controller.ts`**: Manages the `GET`, `POST`, `PATCH`, and `DELETE` (soft delete) operations for `Staff`.
- **`payroll.controller.ts`**: Handles generating payroll records and updating their status (`/api/hr/payrolls/:id/status`).
- **`hr-stats.controller.ts`**: Exposes `/api/hr/summary` which provides dashboard-level aggregations.

### `services/`
- **`staff.service.ts`**: Handles staff CRUD and email uniqueness validation. Soft deletes staff by toggling `isActive` to `false` instead of actually deleting the row.
- **`payroll.service.ts`**: Enforces foreign key constraints by ensuring `staffId` is valid before creating a payroll record. Automatically tags `paidAt` with the current date when status transitions to `Paid`.
- **`hr-stats.service.ts`**: Performs memory-efficient looping to calculate total payroll payouts, pending payouts, and active staff counts.
- **`hr.repository.ts`**: Centralized TypeORM data access wrapper. Holds `Repository<Staff>` and `Repository<Payroll>`.

### `dto/`
- **`create-staff.dto.ts`**: Uses `class-validator` to strictly enforce fields like `role`, `salary`, and `email`.
- **`create-payroll.dto.ts`**: Validates the payload for generating a month's payroll.
- **`find-staff.dto.ts` & `find-payroll.dto.ts`**: Validates pagination limiters.
- **`update-payroll-status.dto.ts`**: Simplifies the status update endpoint payload requirements.

### `tests/`
- **`staff.service.spec.ts`**: Unit test suite confirming exception handling.

### Module Root
- **`entities/staff.entity.ts`**: The TypeORM schema for Staff. Primary Key `id` is a `uuid` string.
- **`entities/payroll.entity.ts`**: The TypeORM schema for Payroll. Primary Key `id` is a `uuid` string. Foreign Key `staffId` is a `uuid` string linking to the `Staff` table.
- **`hr.constants.ts`**: Contains all standardized response messages (e.g. `HR_MESSAGES.PAYROLL_STATUS_UPDATED_SUCCESS`).
- **`hr.exceptions.ts`**: Shared HTTP exceptions such as `PayrollNotFoundException`.
- **`hr.interfaces.ts`**: Standardizes the service responses via `HrResponse`.
- **`hr.module.ts`**: Configures all nested micro-providers and imports `TypeOrmModule.forFeature([Staff, Payroll])`.

## Core Logic & Workflows
1. **Cascading UUID Architecture**: Both `Staff.id` and `Payroll.id` utilize UUIDs. Notably, because `Staff.id` is globally tracked, any external dependencies (such as the `Attendance` module which logs Staff check-ins) also utilize UUID strings for the `staffId` foreign key.
2. **Soft Deletion**: We do not destroy `Staff` rows in the database, because deleting a staff member would sever their historical `Payroll` records. Instead, `remove()` toggles `isActive: false`, which filters them out of regular `findAll` queries.
