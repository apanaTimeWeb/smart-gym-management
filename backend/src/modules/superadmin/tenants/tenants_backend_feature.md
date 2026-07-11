# Tenants Module — Backend Feature Documentation

## Overview
The Tenants module is responsible for **low-level database provisioning** for new gym tenants. It implements Rule 39 of the architecture guidelines: **Database-per-Tenant Architecture** — every gym gets its own isolated PostgreSQL database rather than sharing a multi-tenant table.

> **IMPORTANT DISTINCTION:** Tenant *CRUD* operations (list gyms, update plan, suspend account) live in the `gyms` module. The `tenants` module **only** handles database infrastructure lifecycle operations.

## Folder Structure & File Responsibilities

### `controllers/`
- **`provision-tenant.controller.ts`**: Exposes `POST /superadmin/tenants/provision`. Accepts a `tenantId`, triggers database creation and migration, and returns the result. This controller is intentionally thin (Rule 1 — micro-modularization).

### `services/`
- **`provision-tenant.service.ts`**: Contains the core infrastructure logic:
  1. Creates a new PostgreSQL database named `tenant_db_{tenantId}` using the master `DataSource`.
  2. Constructs a temporary `DataSource` pointed at the new database.
  3. Runs all pending TypeORM migrations on the tenant database.
  4. Destroys the temporary connection afterwards.

### `dto/`
- **`provision-tenant.dto.ts`**: Validates the `tenantId` field before provisioning begins (Rule 3 — strict DTO isolation).

### Module Root
- **`tenants.constants.ts`**: Standard success/error message strings (Rule 5).
- **`tenants.exceptions.ts`**: `TenantProvisionFailedException` and `TenantMigrationFailedException` (Rule 6).
- **`tenants.interfaces.ts`**: `IProvisionTenantResult` and `ITenantProvisionRequest` type shapes (Rule 4).
- **`tenants.module.ts`**: NestJS module wiring. Exports `ProvisionTenantService` for use by the `gyms` module orchestration flow.

## Core Business Logic & Workflows

### Provisioning Flow (Rule 39 — Database-per-Tenant)
```
POST /superadmin/tenants/provision
  │
  ├── 1. Validate tenantId via ProvisionTenantDto
  │
  ├── 2. ProvisionTenantService.provisionNewTenant(tenantId)
  │     ├── 2a. masterDataSource.query(`CREATE DATABASE tenant_db_{tenantId}`)
  │     │       └── Ignore PG error code 42P04 (already exists) — idempotent
  │     ├── 2b. Build a new DataSource pointing at tenant_db_{tenantId}
  │     ├── 2c. tenantDataSource.runMigrations()
  │     └── 2d. tenantDataSource.destroy()  // Always clean up
  │
  └── 3. Return { success: true, databaseName, provisionedAt }
```

### When to Call This Endpoint
This endpoint should be called **immediately after** `POST /superadmin/gyms` successfully creates a new gym record. The workflow is:
1. `POST /superadmin/gyms` → creates the gym record in the master DB
2. `POST /superadmin/tenants/provision` → provisions the tenant's isolated database
3. Gym admin can now log in and their ERP data is stored in isolation

### Error Handling
- If `CREATE DATABASE` fails for any reason **other than** the database already existing, a `TenantProvisionFailedException` is thrown.
- If migrations fail, a `TenantMigrationFailedException` is thrown after rollback cleanup.
- Both exceptions return `500 Internal Server Error` with a structured error envelope (Rule 28).
