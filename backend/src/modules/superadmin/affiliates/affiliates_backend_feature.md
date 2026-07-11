# Affiliates Module — Backend Feature Documentation

## Overview
The Affiliates module manages the referral partner program for the SaaS platform. Affiliates are external partners (e.g., influencers, consultants) who refer new gym tenants to the platform and earn commission per successful referral.

## Folder Structure & File Responsibilities

### `controllers/`
- **`affiliates.controller.ts`**: Full CRUD endpoints — `GET /superadmin/affiliates`, `POST`, `PATCH /:id`, `DELETE /:id`. All routes are protected by `JwtAuthGuard`.

### `services/`
- **`affiliates.service.ts`**: Business logic using dummy data from `superadmin.constants.ts`. Will be replaced with TypeORM repository queries when the database layer is wired up.

### `dto/`
- **`create-affiliates.dto.ts`**: Validates `name`, `email`, `referralCode` for new affiliates.
- **`update-affiliates.dto.ts`**: `PartialType` of the create DTO.

### `entities/`
- **`affiliates.entity.ts`**: TypeORM entity defining the `superadmin_affiliates` table.

### Module Root
- **`affiliates.constants.ts`**: Success/error message constants (Rule 5).
- **`affiliates.exceptions.ts`**: `AffiliateNotFoundException`, `DuplicateAffiliateCodeException` (Rule 6).
- **`affiliates.interfaces.ts`**: `IAffiliate`, `IAffiliateListResponse` type shapes (Rule 4).
- **`affiliates.module.ts`**: NestJS module wiring.

## Core Business Logic
- Each affiliate gets a unique `referralCode` string used in gym signup URLs.
- `totalReferred` and `commissionEarned` are calculated counters — they are updated when a referred gym's status transitions to `ACTIVE`.
- Status `ACTIVE`/`INACTIVE` controls whether the referral code is accepted on the signup page.
