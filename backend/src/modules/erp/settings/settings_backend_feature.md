# Settings Module - Backend Feature Guide

## 1. Overview
The **Settings** module is responsible for managing settings-related operations within the Smart Gym Management system. It exposes RESTful APIs for creating, reading, updating, and deleting settings data, while maintaining strict access control based on user roles and tenant scopes.

## 2. Directory Structure

```text
src/modules/.../settings/
├── controllers/
├── dto/
├── entities/
├── services/
├── tests/
├── settings.constants.ts
├── settings.exceptions.ts
├── settings.interfaces.ts
├── settings.module.ts
├── settings.repository.ts
```

## 3. Core Components

### 3.1 Controllers (`controllers/`)
Handles incoming HTTP requests and maps them to the appropriate services. All endpoints are secured using guards (JWT, Roles, or API Key). DTOs are used heavily here to validate incoming payloads before they hit the business logic.

### 3.2 Services (`services/`)
Contains the core business logic.
- Each service generally handles a single micro-feature (e.g., `create-settings.service.ts`, `find-settings.service.ts`).
- Services utilize Dependency Injection to access repositories, external APIs, and cross-module providers.

### 3.3 Data Access
- **Entities (`entities/`)**: TypeORM entities defining the SQL table structure.
- **Repositories (`settings.repository.ts`)**: Abstracts direct database calls. For ERP modules, it relies on `TENANT_CONNECTION` to query the isolated tenant database. For Superadmin, it queries the master DB.

### 3.4 Data Transfer Objects (`dto/`)
Defines the expected shape of incoming request bodies and query parameters. Uses `class-validator` to ensure strict typing and security (e.g., rejecting unexpected fields or malformed data).

## 4. Workflows & Architecture Rules
- **No `any` types**: All service inputs must use the strongly typed DTOs.
- **Error Handling**: Standard `HttpException` filters catch and format errors for the frontend.
- **Logging**: Operations are logged via `Logger` and intercepted by `AuditInterceptor` for compliance tracking.
