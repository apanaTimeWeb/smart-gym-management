# Members Module - Backend Feature Documentation

## Overview
The Members module handles the core entity of the Smart Gym Management application: the Gym Members. It handles creation, lookup, statistics, modification, and subscription renewal workflows.

## Folder Structure & File Responsibilities

### `controllers/`
- **`create-member.controller.ts`**: Handles the `POST /api/members` endpoint for onboarding new gym members.
- **`find-member.controller.ts`**: Handles `GET /api/members` and `GET /api/members/:id` for paginated retrieval and specific lookups.
- **`update-member.controller.ts`**: Handles `PATCH` (update profile) and `DELETE` operations.
- **`renew-member.controller.ts`**: Handles `POST /api/members/:id/renew` for extending subscriptions.
- **`member-stats.controller.ts`**: Handles `GET /api/members/stats` to aggregate total active/pending/expired statuses.

### `services/`
- **`create-member.service.ts`**: Validates email uniqueness. Contains the core business logic to automatically calculate the `expiryDate` by adding months to the `joinDate` based on the chosen `BillingCycle` enum.
- **`find-member.service.ts`**: Executes queries and throws `MemberNotFoundException` if a member doesn't exist.
- **`update-member.service.ts`**: Validates member existence and delegates updates.
- **`renew-member.service.ts`**: Simplifies the renewal by currently just updating the status to `ACTIVE`. *(Future integration: will likely interface with Finance/Payments module).*
- **`member-stats.service.ts`**: Triggers `Promise.all` database counts for various statuses.
- **`members.repository.ts`**: Dedicated data-access layer utilizing `TypeORM`. Encapsulates `Repository<Member>`.

### `dto/`
- **`create-member.dto.ts`**: Uses `class-validator` to strictly enforce fields like `name`, `email`, `phone`, `gender`, `billingCycle`, etc.
- **`update-member.dto.ts`**: Generates a `PartialType` of the CreateDTO.
- **`find-member.dto.ts`**: Safely parses `limit` queries for pagination.
- **`renew-member.dto.ts`**: Accepts optional notes.

### `tests/`
- **`find-member.service.spec.ts`**: Co-located unit test verifying error propagation.

### Module Root
- **`entities/member.entity.ts`**: The TypeORM schema. The `id` is a `uuid` string. Features relations to `Plan`, `Payment`, and `Attendance`.
- **`members.constants.ts`**: Standardized success messages.
- **`members.exceptions.ts`**: Pre-configured HTTP exceptions like `MemberNotFoundException` and `DuplicateEmailException`.
- **`members.interfaces.ts`**: Typings for internal data flow.
- **`members.module.ts`**: The nest module linking dependencies.

## Core Logic & Workflows
1. **UUID Architecture**: `Member.id` is a UUID string. All corresponding foreign keys across the application (like `Attendance.memberId` and `Payment.memberId`) map to this UUID, preventing predictable integer enumeration.
2. **Subscription Calculation**: When creating a member, the system inspects the `BillingCycle` (e.g., `THREE_MONTHS`) and dynamically manipulates the `Date` object to calculate the exact `expiryDate`, avoiding the need for manual date math on the client.
