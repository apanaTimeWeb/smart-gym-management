# Coupons Module — Backend Feature Documentation

## Overview
The Coupons module manages discount codes that gym tenants can use during signup or SaaS subscription renewals. It tracks usage limits and expiration dates.

## Folder Structure & File Responsibilities

### `controllers/`
- **`coupons.controller.ts`**: Exposes standard CRUD endpoints for managing promotional coupons.

### `services/`
- **`coupons.service.ts`**: Contains business logic for creating, fetching, and updating coupons. Currently utilizes dummy data from `superadmin.constants.ts`.

### `dto/`
- **`create-coupons.dto.ts`**: Validates required fields such as `code`, `discountPercentage`, and `expiryDate`.
- **`update-coupons.dto.ts`**: `PartialType` of the create DTO.

### `entities/`
- **`coupons.entity.ts`**: TypeORM entity representing the `superadmin_coupons` table.

### Module Root
- **`coupons.constants.ts`**: Defines success/error message constants (Rule 5).
- **`coupons.exceptions.ts`**: Standardized custom exceptions (Rule 6).
- **`coupons.interfaces.ts`**: Standard interfaces for internal data transfer (Rule 4).
