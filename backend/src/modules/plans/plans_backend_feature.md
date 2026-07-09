# Plans Module - Backend Feature Documentation

## Overview
The Plans Module manages the various subscription tiers (`PlanTier`) available to members. It defines the pricing models and features associated with each membership option.

## Folder Structure & File Responsibilities

### `controllers/`
- **`create-plan.controller.ts`**: Handles the `POST /api/plans` endpoint to register a new plan.
- **`find-plan.controller.ts`**: Manages `GET /api/plans` and `GET /api/plans/:id`. Ensures that standard `find` queries only return active plans.
- **`update-plan.controller.ts`**: Exposes `PATCH` for pricing or feature updates, and `DELETE` for soft-deletions.

### `services/`
- **`create-plan.service.ts`**: Verifies that a Plan's tier is unique before inserting it into the database via the Repository layer.
- **`find-plan.service.ts`**: Retrieves records and throws `PlanNotFoundException` when appropriate.
- **`update-plan.service.ts`**: Modifies the `isActive` property to `false` for soft deletion, ensuring that legacy `Member` records referencing this plan do not throw foreign key constraint errors.
- **`plans.repository.ts`**: Encapsulates `TypeORM` database operations (`find`, `findOne`, `create`, `update`) for the `Plan` entity.

### `dto/`
- **`create-plan.dto.ts`**: Strictly validates incoming variables. Validates all four duration prices (`price1Month`, `price3Month`, etc) and maps the `tier` variable securely against the global `PlanTier` enumeration.
- **`update-plan.dto.ts`**: Extends `CreatePlanDto` using NestJS's `@nestjs/swagger` `PartialType`.

### Module Root
- **`entities/plan.entity.ts`**: The TypeORM schema. We upgraded the ID column (`id`) to be a UUID string. 
- **`plans.constants.ts`**: Centralized string constants for all success and error messages.
- **`plans.exceptions.ts`**: Inherits standard HttpExceptions to throw domain-specific errors like `DuplicatePlanTierException`.

## Core Logic & Workflows
1. **The UUID Cascade**: When transitioning the legacy architecture to the enterprise UUID architecture, we converted `Plan.id` to `@PrimaryGeneratedColumn('uuid')`. To prevent the `Members` module from crashing, this migration also forced an update on `Member.planId` to become a `string`. 
2. **Soft Deletion Mechanism**: Like most enterprise systems, we cannot afford to `DELETE FROM plans` because thousands of `Member` rows depend on the `planId` foreign key. Deactivating a plan instead ensures it no longer appears in the `GET /api/plans` dropdown in the frontend while preserving historical integrity.
