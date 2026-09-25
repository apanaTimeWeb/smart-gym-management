# Hr Backend Feature Map

## Module Purpose
This module provides the backend capability consumed by the frontend `hr` feature under the Admin domain. It is isolated as the AI repair unit and owns its controllers, DTOs, services, repository, mapper, entity, seed data, and tests. Cross-feature business logic is not placed here; declared runtime events or approved core infrastructure are used for external coupling.

## Directory Structure
| File | Responsibility |
|---|---|
| `_locales/bn/errors.json` | Feature-owned implementation artifact within the Admin feature boundary. |
| `_locales/bn/messages.json` | Feature-owned implementation artifact within the Admin feature boundary. |
| `_locales/de/errors.json` | Feature-owned implementation artifact within the Admin feature boundary. |
| `_locales/de/messages.json` | Feature-owned implementation artifact within the Admin feature boundary. |
| `_locales/en/errors.json` | Feature-owned implementation artifact within the Admin feature boundary. |
| `_locales/en/messages.json` | Feature-owned implementation artifact within the Admin feature boundary. |
| `_locales/fr/errors.json` | Feature-owned implementation artifact within the Admin feature boundary. |
| `_locales/fr/messages.json` | Feature-owned implementation artifact within the Admin feature boundary. |
| `_locales/gu/errors.json` | Feature-owned implementation artifact within the Admin feature boundary. |
| `_locales/gu/messages.json` | Feature-owned implementation artifact within the Admin feature boundary. |
| `_locales/hi/errors.json` | Feature-owned implementation artifact within the Admin feature boundary. |
| `_locales/hi/messages.json` | Feature-owned implementation artifact within the Admin feature boundary. |
| `_locales/kn/errors.json` | Feature-owned implementation artifact within the Admin feature boundary. |
| `_locales/kn/messages.json` | Feature-owned implementation artifact within the Admin feature boundary. |
| `_locales/ml/errors.json` | Feature-owned implementation artifact within the Admin feature boundary. |
| `_locales/ml/messages.json` | Feature-owned implementation artifact within the Admin feature boundary. |
| `_locales/mr/errors.json` | Feature-owned implementation artifact within the Admin feature boundary. |
| `_locales/mr/messages.json` | Feature-owned implementation artifact within the Admin feature boundary. |
| `_locales/nl/errors.json` | Feature-owned implementation artifact within the Admin feature boundary. |
| `_locales/nl/messages.json` | Feature-owned implementation artifact within the Admin feature boundary. |
| `_locales/pa/errors.json` | Feature-owned implementation artifact within the Admin feature boundary. |
| `_locales/pa/messages.json` | Feature-owned implementation artifact within the Admin feature boundary. |
| `_locales/ta/errors.json` | Feature-owned implementation artifact within the Admin feature boundary. |
| `_locales/ta/messages.json` | Feature-owned implementation artifact within the Admin feature boundary. |
| `_locales/te/errors.json` | Feature-owned implementation artifact within the Admin feature boundary. |
| `_locales/te/messages.json` | Feature-owned implementation artifact within the Admin feature boundary. |
| `admin-hr-exceptions.ts` | Feature-owned implementation artifact within the Admin feature boundary. |
| `admin-hr.constants.ts` | Feature-owned constants and machine-readable error/event identifiers. |
| `admin-hr.module.ts` | Feature module registration and dependency wiring. |
| `admin-hr.seeder.ts` | Idempotent feature-local seed data. |
| `admin-hr_backend_feature.md` | Authoritative feature map, frozen API contract, invariants and AI repair boundary. |
| `admin-hr_collection.json` | Module-local API collection for endpoint verification. |
| `admin-hr_dependencies.md` | Feature dependency registry; documents approved business/runtime/infrastructure dependencies. |
| `admin-hr_forbidden.md` | Feature forbidden-pattern register; records patterns the repair agent must not introduce. |
| `hr_controllers/admin-hr-command.controller.ts` | Thin HTTP command/query controller; no business or persistence logic. |
| `hr_controllers/admin-hr-query.controller.ts` | Thin HTTP command/query controller; no business or persistence logic. |
| `hr_domain/admin-hr.domain.ts` | Framework-independent domain model used by business services and presenters. |
| `hr_dtos/admin-hr-id.dto.ts` | Request/response validation and OpenAPI data contract. |
| `hr_dtos/admin-hr-mutation-fields.dto.ts` | Request/response validation and OpenAPI data contract. |
| `hr_dtos/admin-hr-mutation.dto.ts` | Request/response validation and OpenAPI data contract. |
| `hr_dtos/admin-hr-query.dto.ts` | Request/response validation and OpenAPI data contract. |
| `hr_dtos/admin-hr-response.dto.ts` | Request/response validation and OpenAPI data contract. |
| `hr_entities/admin-hr-entity.ts` | ORM persistence model only; never crosses into service-layer business logic. |
| `hr_mappers/admin-hr.mapper.spec.ts` | ORM/domain mapping or frontend response presentation; no database I/O. |
| `hr_mappers/admin-hr.mapper.ts` | ORM/domain mapping or frontend response presentation; no database I/O. |
| `hr_mappers/admin-hr.response.presenter.ts` | ORM/domain mapping or frontend response presentation; no database I/O. |
| `hr_repositories/admin-hr-repository.ts` | Feature-owned persistence/query access behind the repository boundary. |
| `hr_services/admin-hr-command.service.ts` | Single-use-case business orchestration within the feature boundary. |
| `hr_services/admin-hr-query.service.ts` | Single-use-case business orchestration within the feature boundary. |
| `hr_utils/admin-hr-query-window.utils.ts` | Feature-local pure utility; no cross-module business sharing. |
## Localization Contract
- Locale root: `_locales/` (exact Rule 116 layout).
- Catalogs: en, nl, fr, de, hi, mr, ta, te, kn, bn, gu, ml, pa.
- Files per locale: `messages.json` and `errors.json`.

## Feature Inventory
| Controller/Endpoint | HTTP | Path | Purpose | Request DTO | Response Type |
|---|---|---|---|---|---|
| `admin-hr-command.controller.ts:createStaff` | POST | `/api/v1/admin/hr/staff` | Executes the `createStaff` use case for Admin `hr` within the owning feature boundary. | `AdminHrMutationDto` (body: AdminHrMutationDto) | `Promise<AdminHrStaffDto>` |
| `admin-hr-command.controller.ts:updateStaff` | PATCH | `/api/v1/admin/hr/staff/:id` | Executes the `updateStaff` use case for Admin `hr` within the owning feature boundary. | `AdminHrMutationDto` (body: AdminHrMutationDto) | `Promise<AdminHrStaffDto>` |
| `admin-hr-command.controller.ts:deleteStaff` | DELETE | `/api/v1/admin/hr/staff/:id` | Executes the `deleteStaff` use case for Admin `hr` within the owning feature boundary. | `None` (path: id: string) | `Promise<unknown>` |
| `admin-hr-command.controller.ts:updateBulkDeactivate` | POST | `/api/v1/admin/hr/staff/bulk-deactivate` | Executes the `updateBulkDeactivate` use case for Admin `hr` within the owning feature boundary. | `AdminHrMutationDto` (body: AdminHrMutationDto) | `Promise<unknown>` |
| `admin-hr-command.controller.ts:createPayroll` | POST | `/api/v1/admin/hr/payrolls` | Executes the `createPayroll` use case for Admin `hr` within the owning feature boundary. | `AdminHrMutationDto` (body: AdminHrMutationDto) | `Promise<AdminHrPayrollDto>` |
| `admin-hr-command.controller.ts:updatePayroll` | PATCH | `/api/v1/admin/hr/payrolls/:id` | Executes the `updatePayroll` use case for Admin `hr` within the owning feature boundary. | `AdminHrMutationDto` (body: AdminHrMutationDto) | `Promise<AdminHrPayrollDto>` |
| `admin-hr-command.controller.ts:updatePayrollStatus` | PATCH | `/api/v1/admin/hr/payrolls/:id/status` | Executes the `updatePayrollStatus` use case for Admin `hr` within the owning feature boundary. | `AdminHrMutationDto` (body: AdminHrMutationDto) | `Promise<AdminHrPayrollDto>` |
| `admin-hr-command.controller.ts:createAdvance` | POST | `/api/v1/admin/hr/advances` | Executes the `createAdvance` use case for Admin `hr` within the owning feature boundary. | `AdminHrMutationDto` (body: AdminHrMutationDto) | `Promise<unknown>` |
| `admin-hr-command.controller.ts:updatePayDue` | POST | `/api/v1/admin/hr/dues/pay` | Executes the `updatePayDue` use case for Admin `hr` within the owning feature boundary. | `AdminHrMutationDto` (body: AdminHrMutationDto) | `Promise<unknown>` |
| `admin-hr-query.controller.ts:findAllStaff` | GET | `/api/v1/admin/hr/staff` | Executes the `findAllStaff` use case for Admin `hr` within the owning feature boundary. | `AdminHrQueryDto` (query: AdminHrQueryDto) | `Promise<AdminHrStaffListResponseDto>` |
| `admin-hr-query.controller.ts:findStaffById` | GET | `/api/v1/admin/hr/staff/:id` | Executes the `findStaffById` use case for Admin `hr` within the owning feature boundary. | `None` (path: id: string) | `Promise<AdminHrStaffDto>` |
| `admin-hr-query.controller.ts:findAllPayrolls` | GET | `/api/v1/admin/hr/payrolls` | Executes the `findAllPayrolls` use case for Admin `hr` within the owning feature boundary. | `AdminHrQueryDto` (query: AdminHrQueryDto) | `Promise<AdminHrPayrollListResponseDto>` |
| `admin-hr-query.controller.ts:findHrSummary` | GET | `/api/v1/admin/hr/summary` | Executes the `findHrSummary` use case for Admin `hr` within the owning feature boundary. | `AdminHrQueryDto` (query: AdminHrQueryDto) | `Promise<AdminHrSummaryDto>` |
| `admin-hr-query.controller.ts:findLedger` | GET | `/api/v1/admin/hr/staff/:id/ledger` | Executes the `findLedger` use case for Admin `hr` within the owning feature boundary. | `AdminHrQueryDto` (query: AdminHrQueryDto) | `Promise<AdminHrLedgerEntryDto[]>` |
| `admin-hr-query.controller.ts:findPerformance` | GET | `/api/v1/admin/hr/performance` | Executes the `findPerformance` use case for Admin `hr` within the owning feature boundary. | `AdminHrQueryDto` (query: AdminHrQueryDto) | `Promise<AdminHrStaffPerformanceRecordDto[]>` |

## Approved External Dependencies
- **Business Feature Dependencies**: None declared directly.
- **Infrastructure Dependencies**: NestJS, TypeORM, PostgreSQL, Redis-backed core services, request context, canonical response/validation infrastructure.
- **Runtime/Event Dependencies**: None declared in this v1 package unless listed in the dependency document.

## Data and State Architecture
- DB Entities: `hr` tenant table/entity plus JSONB frontend contract payload.
- Redis Caching Keys: No feature-specific cache key is required in v1 unless later documented.
- Event Emitters: None declared in v1.
- Background Jobs: Data export uses the background-job pattern documented at core level; other endpoints are synchronous unless the route contract indicates otherwise.
- Idempotency Keys: Required on critical mutations; command controllers accept `Idempotency-Key` where duplicate execution would be unsafe.

## Business Flow / Key Sequences
1. Controller receives the frontend-aligned request.
2. Global validation, JWT authentication, tenant authorization, and canonical response/error infrastructure execute at the framework boundary.
3. The feature service validates the business state and calls only the feature repository.
4. The repository resolves the trusted tenant DataSource, performs parameterized TypeORM access, and returns an entity/domain mapping.
5. Mutation results are audited and returned through the canonical response interceptor.

## File Responsibility Map
- `admin-hr-exceptions.ts` — Feature-owned implementation artifact.
- `admin-hr.constants.ts` — Feature-owned implementation artifact.
- `admin-hr.module.ts` — Feature module provider/controller registration only.
- `admin-hr.seeder.ts` — Idempotent feature seed data only.
- `admin-hr_collection.json` — Module-local API collection/configuration artifact.
- `admin-hr_dependencies.md` — Governance/documentation artifact for this feature; must remain aligned with code.
- `admin-hr_forbidden.md` — Governance/documentation artifact for this feature; must remain aligned with code.
- `hr_controllers/admin-hr-command.controller.ts` — Thin HTTP boundary; MUST NOT contain business or persistence logic.
- `hr_controllers/admin-hr-query.controller.ts` — Thin HTTP boundary; MUST NOT contain business or persistence logic.
- `hr_domain/admin-hr.domain.ts` — Framework-independent domain shape.
- `hr_dtos/admin-hr-id.dto.ts` — Request/response validation and API shape; MUST NOT perform side effects.
- `hr_dtos/admin-hr-mutation.dto.ts` — Request/response validation and API shape; MUST NOT perform side effects.
- `hr_dtos/admin-hr-query.dto.ts` — Request/response validation and API shape; MUST NOT perform side effects.
- `hr_dtos/admin-hr-response.dto.ts` — Request/response validation and API shape; MUST NOT perform side effects.
- `hr_entities/admin-hr-entity.ts` — ORM persistence mapping only.
- `_locales/en/errors.json` — Feature-local localization resources.
- `_locales/en/messages.json` — Feature-local localization resources.
- `_locales/hi/errors.json` — Feature-local localization resources.
- `_locales/hi/messages.json` — Feature-local localization resources.
- `hr_mappers/admin-hr.mapper.spec.ts` — Domain/ORM to API mapping only; MUST NOT perform DB I/O.
- `hr_mappers/admin-hr.mapper.ts` — Domain/ORM to API mapping only; MUST NOT perform DB I/O.
- `hr_repositories/admin-hr-repository.ts` — Feature-owned database/query access; MUST NOT contain HTTP/UI logic.
- `hr_services/admin-hr-command.service.ts` — Single use-case business flow; MUST NOT access TypeORM directly.
- `hr_services/admin-hr-query.service.ts` — Single use-case business flow; MUST NOT access TypeORM directly.
- `hr_utils/admin-hr-query-window.utils.ts` — Pure feature-local helper; MUST NOT become shared business infrastructure.

## Permissions and Security
| Endpoint | Required Role(s) | Resource-Level Check |
|---|---|---|
| `POST /api/v1/admin/hr/staff` | ADMIN, SUPERADMIN, MANAGER | Tenant context is verified against the authenticated actor before DataSource selection; resource-level checks are feature-specific when applicable. |
| `PATCH /api/v1/admin/hr/staff/:id` | ADMIN, SUPERADMIN, MANAGER | Tenant context is verified against the authenticated actor before DataSource selection; resource-level checks are feature-specific when applicable. |
| `DELETE /api/v1/admin/hr/staff/:id` | ADMIN, SUPERADMIN, MANAGER | Tenant context is verified against the authenticated actor before DataSource selection; resource-level checks are feature-specific when applicable. |
| `POST /api/v1/admin/hr/staff/bulk-deactivate` | ADMIN, SUPERADMIN, MANAGER | Tenant context is verified against the authenticated actor before DataSource selection; resource-level checks are feature-specific when applicable. |
| `POST /api/v1/admin/hr/payrolls` | ADMIN, SUPERADMIN, MANAGER | Tenant context is verified against the authenticated actor before DataSource selection; resource-level checks are feature-specific when applicable. |
| `PATCH /api/v1/admin/hr/payrolls/:id` | ADMIN, SUPERADMIN, MANAGER | Tenant context is verified against the authenticated actor before DataSource selection; resource-level checks are feature-specific when applicable. |
| `PATCH /api/v1/admin/hr/payrolls/:id/status` | ADMIN, SUPERADMIN, MANAGER | Tenant context is verified against the authenticated actor before DataSource selection; resource-level checks are feature-specific when applicable. |
| `POST /api/v1/admin/hr/advances` | ADMIN, SUPERADMIN, MANAGER | Tenant context is verified against the authenticated actor before DataSource selection; resource-level checks are feature-specific when applicable. |
| `POST /api/v1/admin/hr/dues/pay` | ADMIN, SUPERADMIN, MANAGER | Tenant context is verified against the authenticated actor before DataSource selection; resource-level checks are feature-specific when applicable. |
| `GET /api/v1/admin/hr/staff` | ADMIN, SUPERADMIN, MANAGER | Tenant context is verified against the authenticated actor before DataSource selection; resource-level checks are feature-specific when applicable. |
| `GET /api/v1/admin/hr/staff/:id` | ADMIN, SUPERADMIN, MANAGER | Tenant context is verified against the authenticated actor before DataSource selection; resource-level checks are feature-specific when applicable. |
| `GET /api/v1/admin/hr/payrolls` | ADMIN, SUPERADMIN, MANAGER | Tenant context is verified against the authenticated actor before DataSource selection; resource-level checks are feature-specific when applicable. |
| `GET /api/v1/admin/hr/summary` | ADMIN, SUPERADMIN, MANAGER | Tenant context is verified against the authenticated actor before DataSource selection; resource-level checks are feature-specific when applicable. |
| `GET /api/v1/admin/hr/staff/:id/ledger` | ADMIN, SUPERADMIN, MANAGER | Tenant context is verified against the authenticated actor before DataSource selection; resource-level checks are feature-specific when applicable. |
| `GET /api/v1/admin/hr/performance` | ADMIN, SUPERADMIN, MANAGER | Tenant context is verified against the authenticated actor before DataSource selection; resource-level checks are feature-specific when applicable. |

## Edge Cases / AI Warnings
- Never bypass the `hr` repository boundary; direct ORM access from services violates Rule 89 and risks persistence leakage. — see Rules 7, 89.
- Never trust a client-supplied tenant identifier; tenant authorization must occur before DataSource resolution. — see Rule 39.
- Never change a frozen response field or nested structure unilaterally; doing so breaks the frontend contract. — see Rules 67 and 82A.
- Never implement a critical mutation without the idempotency contract where the operation can be retried. — see Rule 31.
- Never use an unallowlisted sort/filter value as an ORM identifier. — see Rule 92.

## Frozen API Contract
This section is generated from the current backend controllers/DTOs and must remain aligned with the frozen frontend requirement baseline. Frontend files remain read-only evidence.

### Request Shape
| Endpoint | Method | Request parameters/body |
|---|---|---|
| `/api/v1/admin/hr/staff` | POST | body: AdminHrMutationDto; `id: string`, `staff: string`, `total: string`, `employeeId: number`, `name: string`, `email: string`, `phone: string`, `role: string`, `salary: number`, `branch: string`, `gender: string`, `address: string`, `aadhaar: string`, `upiId: string`, `bankAccountNumber: string`, `advanceSalary: number`, `joinDate: string`, `isActive: boolean`, `salaryType: string`, `paymentCycle: string`, `currentDue: number`, `assignedBranches: string[]`, `primaryBranchId: string`, `emergencyContactName: string`, `emergencyContactPhone: string`, `department: string`, `certifications: string[]`, `contractType: string`, `terminationDate: string`, `payrolls: string`, `month: string`, `amount: number`, `paidAmount: number`, `pendingAmount: number`, `status: AdminHrStatus`, `paidAt: string`, `notes: string`, `ledger: Record<string, unknown>`, `advances: Record<string, unknown>`, `performance: Record<string, unknown>`, `ids: string[]`, `currency: string` |
| `/api/v1/admin/hr/staff/:id` | PATCH | body: AdminHrMutationDto; `id: string`, `staff: string`, `total: string`, `employeeId: number`, `name: string`, `email: string`, `phone: string`, `role: string`, `salary: number`, `branch: string`, `gender: string`, `address: string`, `aadhaar: string`, `upiId: string`, `bankAccountNumber: string`, `advanceSalary: number`, `joinDate: string`, `isActive: boolean`, `salaryType: string`, `paymentCycle: string`, `currentDue: number`, `assignedBranches: string[]`, `primaryBranchId: string`, `emergencyContactName: string`, `emergencyContactPhone: string`, `department: string`, `certifications: string[]`, `contractType: string`, `terminationDate: string`, `payrolls: string`, `month: string`, `amount: number`, `paidAmount: number`, `pendingAmount: number`, `status: AdminHrStatus`, `paidAt: string`, `notes: string`, `ledger: Record<string, unknown>`, `advances: Record<string, unknown>`, `performance: Record<string, unknown>`, `ids: string[]`, `currency: string` |
| `/api/v1/admin/hr/staff/:id` | DELETE | path: id: string; none |
| `/api/v1/admin/hr/staff/bulk-deactivate` | POST | body: AdminHrMutationDto; `id: string`, `staff: string`, `total: string`, `employeeId: number`, `name: string`, `email: string`, `phone: string`, `role: string`, `salary: number`, `branch: string`, `gender: string`, `address: string`, `aadhaar: string`, `upiId: string`, `bankAccountNumber: string`, `advanceSalary: number`, `joinDate: string`, `isActive: boolean`, `salaryType: string`, `paymentCycle: string`, `currentDue: number`, `assignedBranches: string[]`, `primaryBranchId: string`, `emergencyContactName: string`, `emergencyContactPhone: string`, `department: string`, `certifications: string[]`, `contractType: string`, `terminationDate: string`, `payrolls: string`, `month: string`, `amount: number`, `paidAmount: number`, `pendingAmount: number`, `status: AdminHrStatus`, `paidAt: string`, `notes: string`, `ledger: Record<string, unknown>`, `advances: Record<string, unknown>`, `performance: Record<string, unknown>`, `ids: string[]`, `currency: string` |
| `/api/v1/admin/hr/payrolls` | POST | body: AdminHrMutationDto; `id: string`, `staff: string`, `total: string`, `employeeId: number`, `name: string`, `email: string`, `phone: string`, `role: string`, `salary: number`, `branch: string`, `gender: string`, `address: string`, `aadhaar: string`, `upiId: string`, `bankAccountNumber: string`, `advanceSalary: number`, `joinDate: string`, `isActive: boolean`, `salaryType: string`, `paymentCycle: string`, `currentDue: number`, `assignedBranches: string[]`, `primaryBranchId: string`, `emergencyContactName: string`, `emergencyContactPhone: string`, `department: string`, `certifications: string[]`, `contractType: string`, `terminationDate: string`, `payrolls: string`, `month: string`, `amount: number`, `paidAmount: number`, `pendingAmount: number`, `status: AdminHrStatus`, `paidAt: string`, `notes: string`, `ledger: Record<string, unknown>`, `advances: Record<string, unknown>`, `performance: Record<string, unknown>`, `ids: string[]`, `currency: string` |
| `/api/v1/admin/hr/payrolls/:id` | PATCH | body: AdminHrMutationDto; `id: string`, `staff: string`, `total: string`, `employeeId: number`, `name: string`, `email: string`, `phone: string`, `role: string`, `salary: number`, `branch: string`, `gender: string`, `address: string`, `aadhaar: string`, `upiId: string`, `bankAccountNumber: string`, `advanceSalary: number`, `joinDate: string`, `isActive: boolean`, `salaryType: string`, `paymentCycle: string`, `currentDue: number`, `assignedBranches: string[]`, `primaryBranchId: string`, `emergencyContactName: string`, `emergencyContactPhone: string`, `department: string`, `certifications: string[]`, `contractType: string`, `terminationDate: string`, `payrolls: string`, `month: string`, `amount: number`, `paidAmount: number`, `pendingAmount: number`, `status: AdminHrStatus`, `paidAt: string`, `notes: string`, `ledger: Record<string, unknown>`, `advances: Record<string, unknown>`, `performance: Record<string, unknown>`, `ids: string[]`, `currency: string` |
| `/api/v1/admin/hr/payrolls/:id/status` | PATCH | body: AdminHrMutationDto; `id: string`, `staff: string`, `total: string`, `employeeId: number`, `name: string`, `email: string`, `phone: string`, `role: string`, `salary: number`, `branch: string`, `gender: string`, `address: string`, `aadhaar: string`, `upiId: string`, `bankAccountNumber: string`, `advanceSalary: number`, `joinDate: string`, `isActive: boolean`, `salaryType: string`, `paymentCycle: string`, `currentDue: number`, `assignedBranches: string[]`, `primaryBranchId: string`, `emergencyContactName: string`, `emergencyContactPhone: string`, `department: string`, `certifications: string[]`, `contractType: string`, `terminationDate: string`, `payrolls: string`, `month: string`, `amount: number`, `paidAmount: number`, `pendingAmount: number`, `status: AdminHrStatus`, `paidAt: string`, `notes: string`, `ledger: Record<string, unknown>`, `advances: Record<string, unknown>`, `performance: Record<string, unknown>`, `ids: string[]`, `currency: string` |
| `/api/v1/admin/hr/advances` | POST | body: AdminHrMutationDto; `id: string`, `staff: string`, `total: string`, `employeeId: number`, `name: string`, `email: string`, `phone: string`, `role: string`, `salary: number`, `branch: string`, `gender: string`, `address: string`, `aadhaar: string`, `upiId: string`, `bankAccountNumber: string`, `advanceSalary: number`, `joinDate: string`, `isActive: boolean`, `salaryType: string`, `paymentCycle: string`, `currentDue: number`, `assignedBranches: string[]`, `primaryBranchId: string`, `emergencyContactName: string`, `emergencyContactPhone: string`, `department: string`, `certifications: string[]`, `contractType: string`, `terminationDate: string`, `payrolls: string`, `month: string`, `amount: number`, `paidAmount: number`, `pendingAmount: number`, `status: AdminHrStatus`, `paidAt: string`, `notes: string`, `ledger: Record<string, unknown>`, `advances: Record<string, unknown>`, `performance: Record<string, unknown>`, `ids: string[]`, `currency: string` |
| `/api/v1/admin/hr/dues/pay` | POST | body: AdminHrMutationDto; `id: string`, `staff: string`, `total: string`, `employeeId: number`, `name: string`, `email: string`, `phone: string`, `role: string`, `salary: number`, `branch: string`, `gender: string`, `address: string`, `aadhaar: string`, `upiId: string`, `bankAccountNumber: string`, `advanceSalary: number`, `joinDate: string`, `isActive: boolean`, `salaryType: string`, `paymentCycle: string`, `currentDue: number`, `assignedBranches: string[]`, `primaryBranchId: string`, `emergencyContactName: string`, `emergencyContactPhone: string`, `department: string`, `certifications: string[]`, `contractType: string`, `terminationDate: string`, `payrolls: string`, `month: string`, `amount: number`, `paidAmount: number`, `pendingAmount: number`, `status: AdminHrStatus`, `paidAt: string`, `notes: string`, `ledger: Record<string, unknown>`, `advances: Record<string, unknown>`, `performance: Record<string, unknown>`, `ids: string[]`, `currency: string` |
| `/api/v1/admin/hr/staff` | GET | query: AdminHrQueryDto; `branchId: string`, `gymId: string`, `range: string`, `startDate: string`, `endDate: string`, `status: AdminHrStatus`, `priority: string`, `severity: string`, `dateRange: string`, `period: AdminHrPerformancePeriod`, `month: string`, `consumer: string` |
| `/api/v1/admin/hr/staff/:id` | GET | path: id: string; none |
| `/api/v1/admin/hr/payrolls` | GET | query: AdminHrQueryDto; `branchId: string`, `gymId: string`, `range: string`, `startDate: string`, `endDate: string`, `status: AdminHrStatus`, `priority: string`, `severity: string`, `dateRange: string`, `period: AdminHrPerformancePeriod`, `month: string`, `consumer: string` |
| `/api/v1/admin/hr/summary` | GET | query: AdminHrQueryDto; `branchId: string`, `gymId: string`, `range: string`, `startDate: string`, `endDate: string`, `status: AdminHrStatus`, `priority: string`, `severity: string`, `dateRange: string`, `period: AdminHrPerformancePeriod`, `month: string`, `consumer: string` |
| `/api/v1/admin/hr/staff/:id/ledger` | GET | query: AdminHrQueryDto; `branchId: string`, `gymId: string`, `range: string`, `startDate: string`, `endDate: string`, `status: AdminHrStatus`, `priority: string`, `severity: string`, `dateRange: string`, `period: AdminHrPerformancePeriod`, `month: string`, `consumer: string` |
| `/api/v1/admin/hr/performance` | GET | query: AdminHrQueryDto; `branchId: string`, `gymId: string`, `range: string`, `startDate: string`, `endDate: string`, `status: AdminHrStatus`, `priority: string`, `severity: string`, `dateRange: string`, `period: AdminHrPerformancePeriod`, `month: string`, `consumer: string` |

### Response Shape
| Endpoint | Handler | Return Type | Response fields |
|---|---|---|---|
| `/api/v1/admin/hr/staff` | `createStaff` | `Promise<AdminHrStaffDto>` | AdminHrStaffDto: `id: string`, `employeeId: string`, `name: string`, `email: string`, `phone: string`, `role: string`, `salary: number`, `branch: string`, `gender: string`, `address: string`, `aadhaar: string`, `upiId: string`, `bankAccountNumber: string`, `advanceSalary: number`, `joinDate: string`, `joiningDate: string`, `isActive: boolean`, `salaryType: string`, `paymentCycle: string`, `currentDue: number`, `assignedBranches: string[]`, `primaryBranchId: string`, `emergencyContactName: string`, `emergencyContactPhone: string`, `department: string`, `certifications: string[]`, `contractType: string`, `terminationDate: string`, `currency: string` |
| `/api/v1/admin/hr/staff/:id` | `updateStaff` | `Promise<AdminHrStaffDto>` | AdminHrStaffDto: `id: string`, `employeeId: string`, `name: string`, `email: string`, `phone: string`, `role: string`, `salary: number`, `branch: string`, `gender: string`, `address: string`, `aadhaar: string`, `upiId: string`, `bankAccountNumber: string`, `advanceSalary: number`, `joinDate: string`, `joiningDate: string`, `isActive: boolean`, `salaryType: string`, `paymentCycle: string`, `currentDue: number`, `assignedBranches: string[]`, `primaryBranchId: string`, `emergencyContactName: string`, `emergencyContactPhone: string`, `department: string`, `certifications: string[]`, `contractType: string`, `terminationDate: string`, `currency: string` |
| `/api/v1/admin/hr/staff/:id` | `deleteStaff` | `Promise<unknown>` | Primitive/unknown return; runtime/static proof required. |
| `/api/v1/admin/hr/staff/bulk-deactivate` | `updateBulkDeactivate` | `Promise<unknown>` | Primitive/unknown return; runtime/static proof required. |
| `/api/v1/admin/hr/payrolls` | `createPayroll` | `Promise<AdminHrPayrollDto>` | AdminHrPayrollDto: `id: string`, `staffId: string`, `month: string`, `amount: number`, `paidAmount: number`, `pendingAmount: number`, `status: AdminHrStatus`, `paidAt: string`, `notes: string`, `staff: AdminHrStaffRoleDto`, `currency: string` |
| `/api/v1/admin/hr/payrolls/:id` | `updatePayroll` | `Promise<AdminHrPayrollDto>` | AdminHrPayrollDto: `id: string`, `staffId: string`, `month: string`, `amount: number`, `paidAmount: number`, `pendingAmount: number`, `status: AdminHrStatus`, `paidAt: string`, `notes: string`, `staff: AdminHrStaffRoleDto`, `currency: string` |
| `/api/v1/admin/hr/payrolls/:id/status` | `updatePayrollStatus` | `Promise<AdminHrPayrollDto>` | AdminHrPayrollDto: `id: string`, `staffId: string`, `month: string`, `amount: number`, `paidAmount: number`, `pendingAmount: number`, `status: AdminHrStatus`, `paidAt: string`, `notes: string`, `staff: AdminHrStaffRoleDto`, `currency: string` |
| `/api/v1/admin/hr/advances` | `createAdvance` | `Promise<unknown>` | Primitive/unknown return; runtime/static proof required. |
| `/api/v1/admin/hr/dues/pay` | `updatePayDue` | `Promise<unknown>` | Primitive/unknown return; runtime/static proof required. |
| `/api/v1/admin/hr/staff` | `findAllStaff` | `Promise<AdminHrStaffListResponseDto>` | AdminHrStaffListResponseDto: `staff: AdminHrStaffDto[]`, `total: number` |
| `/api/v1/admin/hr/staff/:id` | `findStaffById` | `Promise<AdminHrStaffDto>` | AdminHrStaffDto: `id: string`, `employeeId: string`, `name: string`, `email: string`, `phone: string`, `role: string`, `salary: number`, `branch: string`, `gender: string`, `address: string`, `aadhaar: string`, `upiId: string`, `bankAccountNumber: string`, `advanceSalary: number`, `joinDate: string`, `joiningDate: string`, `isActive: boolean`, `salaryType: string`, `paymentCycle: string`, `currentDue: number`, `assignedBranches: string[]`, `primaryBranchId: string`, `emergencyContactName: string`, `emergencyContactPhone: string`, `department: string`, `certifications: string[]`, `contractType: string`, `terminationDate: string`, `currency: string` |
| `/api/v1/admin/hr/payrolls` | `findAllPayrolls` | `Promise<AdminHrPayrollListResponseDto>` | AdminHrPayrollListResponseDto: `payrolls: AdminHrPayrollDto[]`, `total: number` |
| `/api/v1/admin/hr/summary` | `findHrSummary` | `Promise<AdminHrSummaryDto>` | AdminHrSummaryDto: `totalSalaryThisMonth: number`, `totalSalaryPaid: number`, `totalSalaryDue: number`, `totalAdvanceGiven: number`, `pendingPaymentsCount: number`, `totalStaff: number`, `activeStaff: number`, `totalPayrollThisMonth: number`, `paidCount: number`, `pendingCount: number`, `currency: string` |
| `/api/v1/admin/hr/staff/:id/ledger` | `findLedger` | `Promise<AdminHrLedgerEntryDto[]>` | AdminHrLedgerEntryDto: `id: string`, `staffId: string`, `date: string`, `type: string`, `credit: number`, `debit: number`, `balance: number`, `notes: string`, `referenceNo: string`, `paymentMode: string`, `openingBalance: number`, `currency: string` |
| `/api/v1/admin/hr/performance` | `findPerformance` | `Promise<AdminHrStaffPerformanceRecordDto[]>` | AdminHrStaffPerformanceRecordDto: `id: string`, `name: string`, `role: string`, `branchName: string`, `sessionsTaken: number`, `membersAdded: number`, `attendancePct: number`, `rating: number`, `status: AdminHrStatus` |

### UI-Required Fields
The response contract must contain every backend-derived field in the frozen Stage 1 requirement baseline, including table fields, KPIs, chart series, lookup labels, relationship values, computed values, and status badges. Frontend-side reconstruction of business semantics is not an accepted substitute.

### Pagination / Error Contract
- All paginated list endpoints must use server-driven `page`, `limit`, filtering and allowlisted sorting as defined by the module DTO.
- All endpoints return the canonical `ApiResponse<T>` envelope through the global response interceptor; validation failures use `VALIDATION.DTO.FAILED` with `data = null` and `validationErrors[]`.
- Non-paginated endpoints omit `meta`.

## Rule Compliance Checklist
- [ ] Rule 7: TypeORM is the single approved ORM and remains behind repositories.
- [ ] Rule 19: This document is updated with module code changes.
- [ ] Rule 28: Canonical response envelope is provided globally.
- [ ] Rule 29: Soft deletes only.
- [ ] Rule 31: Idempotency applied to critical mutations.
- [ ] Rule 34: N+1 reviewed.
- [ ] Rule 36: Fail-fast on missing resources.
- [ ] Rule 48: Read/write controllers are separate.
- [ ] Rule 56: `findByIdOrThrow()` is used explicitly.
- [ ] Rule 62: Explicit return types are required.
- [ ] Rule 76/79/80: Responsibility/flow comments and JSDoc are required.
- [ ] Rule 82A: Response DTO covers the frontend UI data contract.
- [ ] Rule 83: RBAC uses controller-layer typed role guards.
- [ ] Rule 85/87: Guard clauses and small single-purpose service methods.
- [ ] Rule 89: ORM entities are mapped before business use.
- [ ] Rule 92: User-controlled ORM identifiers are allowlisted.
- [ ] Rule 93: Security-sensitive areas require human review.
- [ ] Rule 101: Tests must prove observable behavior.

## Source-Frozen Frontend API Contract

The following frontend API-client call sites were inspected during the audit and are retained here as contract evidence. This section is evidence of the current frontend requirement, not proof that the backend implementation works. Any deliberate contract change must update the frontend contract, backend contract, types/schemas, mocks, and tests together.

### `admin/hr/hr_api/AdminHrBranchReferenceApi.ts`
- `L7: export const AdminHrBranchReferenceApi = { fetchHrBranchReferences: () => apiFetch<ApiResponse<AdminHrBranchReference[]>>(`${AdminHrUrlConfig.BACKEND_API.BRANCH_REFERENCE}?consumer=hr`, { method: 'GET', dataSchema: schema }) };`

### `admin/hr/hr_api/AdminHrApi.ts`
- `L13: return apiFetch<ApiResponse<{ admin_staff: Staff[]; total: number }>>(`${AdminHrUrlConfig.BACKEND_API.STAFF_BASE}${query ? `?${query}` : ''}`, { dataSchema: z.object({ admin_staff: z.array(admin_staffSchema), total: z.number() }) });`
- `L15: fetchStaffById: async (id: string) => apiFetch<ApiResponse<Staff>>(AdminHrUrlConfig.BACKEND_API.STAFF_GET_ONE(id), { dataSchema: admin_staffSchema }),`
- `L16: createStaff: async (body: Partial<Staff>, idempotencyKey?: string) => apiFetch<ApiResponse<Staff>>(AdminHrUrlConfig.BACKEND_API.STAFF_BASE, { method: 'POST', body: JSON.stringify(body), dataSchema: admin_staffSchema,`
- `L19: updateStaff: async (id: string, body: Partial<Staff>, idempotencyKey?: string) => apiFetch<ApiResponse<Staff>>(AdminHrUrlConfig.BACKEND_API.STAFF_UPDATE(id), { method: 'PATCH', body: JSON.stringify({ id, ...body }), headers: idempotencyKey ? { 'Idempotency-Key': idempotencyKey } : undefined, dataSchema: admin_staffSchema }),`
- `L20: deleteStaff: async (id: string, idempotencyKey: string) => apiFetch<ApiResponse<null>>(AdminHrUrlConfig.BACKEND_API.STAFF_DELETE(id), { method: 'DELETE', headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: z.null() }),`
- `L21: bulkDeactivateStaff: async (ids: string[], idempotencyKey?: string) => apiFetch<ApiResponse<null>>(AdminHrUrlConfig.BACKEND_API.BULK_DEACTIVATE, { method: 'POST', body: JSON.stringify({ ids }), dataSchema: z.null(),`
- `L26: return apiFetch<ApiResponse<{ payrolls: Payroll[]; total: number }>>(`${AdminHrUrlConfig.BACKEND_API.PAYROLLS_BASE}${query ? `?${query}` : ''}`, { dataSchema: z.object({ payrolls: z.array(payrollSchema), total: z.number() }) });`
- `L28: createPayroll: async (body: Partial<Payroll>, idempotencyKey: string) => apiFetch<ApiResponse<Payroll>>(AdminHrUrlConfig.BACKEND_API.PAYROLLS_BASE, { method: 'POST', body: JSON.stringify(body), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: payrollSchema }),`
- `L29: updatePayroll: async (id: string, body: Partial<Payroll>, idempotencyKey: string) => apiFetch<ApiResponse<Payroll>>(AdminHrUrlConfig.BACKEND_API.PAYROLL_UPDATE(id), { method: 'PATCH', body: JSON.stringify({ id, ...body }), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: payrollSchema }),`
- `L30: updatePayrollStatus: async (id: string, status: string, idempotencyKey: string) => apiFetch<ApiResponse<Payroll>>(AdminHrUrlConfig.BACKEND_API.PAYROLL_STATUS_UPDATE(id), { method: 'PATCH', body: JSON.stringify({ id, status }), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: payrollSchema }),`
- `L31: fetchSummary: async (branchId?: string) => apiFetch<ApiResponse<HrSummary>>(`${AdminHrUrlConfig.BACKEND_API.SUMMARY}${branchId ? `?branchId=${encodeURIComponent(branchId)}` : ''}`, { dataSchema: hrSummarySchema }),`
- `L32: fetchLedger: async (admin_staffId: string) => apiFetch<ApiResponse<LedgerEntry[]>>(`${AdminHrUrlConfig.BACKEND_API.STAFF_GET_ONE(admin_staffId)}/ledger`, { dataSchema: z.array(ledgerEntrySchema) }),`
- `L33: giveAdvance: async (data: Record<string, unknown>, idempotencyKey: string) => apiFetch<ApiResponse<null>>(AdminHrUrlConfig.BACKEND_API.ADVANCES, { method: 'POST', body: JSON.stringify(data), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: z.null() }),`
- `L34: payDue: async (data: Record<string, unknown>, idempotencyKey: string) => apiFetch<ApiResponse<null>>(AdminHrUrlConfig.BACKEND_API.DUES_PAY, { method: 'POST', body: JSON.stringify(data), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: z.null() }),`
- `L38: return apiFetch<ApiResponse<StaffPerformanceRecord[]>>(`${AdminHrUrlConfig.BACKEND_API.PERFORMANCE}?${query.toString()}`, { dataSchema: z.array(admin_staffPerformanceRecordSchema) });`

### `admin/hr/hr_api/AdminHrBranchReferenceApi.ts`
- `L7: export const AdminHrBranchReferenceApi = { fetchHrBranchReferences: () => apiFetch<ApiResponse<AdminHrBranchReference[]>>(`${AdminHrUrlConfig.BACKEND_API.BRANCH_REFERENCE}?consumer=hr`, { method: 'GET', dataSchema: schema }) };`

### `admin/hr/hr_api/AdminHrApi.ts`
- `L13: return apiFetch<ApiResponse<{ admin_staff: Staff[]; total: number }>>(`${AdminHrUrlConfig.BACKEND_API.STAFF_BASE}${query ? `?${query}` : ''}`, { dataSchema: z.object({ admin_staff: z.array(admin_staffSchema), total: z.number() }) });`
- `L15: fetchStaffById: async (id: string) => apiFetch<ApiResponse<Staff>>(AdminHrUrlConfig.BACKEND_API.STAFF_GET_ONE(id), { dataSchema: admin_staffSchema }),`
- `L16: createStaff: async (body: Partial<Staff>, idempotencyKey?: string) => apiFetch<ApiResponse<Staff>>(AdminHrUrlConfig.BACKEND_API.STAFF_BASE, { method: 'POST', body: JSON.stringify(body), dataSchema: admin_staffSchema,`
- `L19: updateStaff: async (id: string, body: Partial<Staff>, idempotencyKey?: string) => apiFetch<ApiResponse<Staff>>(AdminHrUrlConfig.BACKEND_API.STAFF_UPDATE(id), { method: 'PATCH', body: JSON.stringify({ id, ...body }), headers: idempotencyKey ? { 'Idempotency-Key': idempotencyKey } : undefined, dataSchema: admin_staffSchema }),`
- `L20: deleteStaff: async (id: string, idempotencyKey: string) => apiFetch<ApiResponse<null>>(AdminHrUrlConfig.BACKEND_API.STAFF_DELETE(id), { method: 'DELETE', headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: z.null() }),`
- `L21: bulkDeactivateStaff: async (ids: string[], idempotencyKey?: string) => apiFetch<ApiResponse<null>>(AdminHrUrlConfig.BACKEND_API.BULK_DEACTIVATE, { method: 'POST', body: JSON.stringify({ ids }), dataSchema: z.null(),`
- `L26: return apiFetch<ApiResponse<{ payrolls: Payroll[]; total: number }>>(`${AdminHrUrlConfig.BACKEND_API.PAYROLLS_BASE}${query ? `?${query}` : ''}`, { dataSchema: z.object({ payrolls: z.array(payrollSchema), total: z.number() }) });`
- `L28: createPayroll: async (body: Partial<Payroll>, idempotencyKey: string) => apiFetch<ApiResponse<Payroll>>(AdminHrUrlConfig.BACKEND_API.PAYROLLS_BASE, { method: 'POST', body: JSON.stringify(body), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: payrollSchema }),`
- `L29: updatePayroll: async (id: string, body: Partial<Payroll>, idempotencyKey: string) => apiFetch<ApiResponse<Payroll>>(AdminHrUrlConfig.BACKEND_API.PAYROLL_UPDATE(id), { method: 'PATCH', body: JSON.stringify({ id, ...body }), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: payrollSchema }),`
- `L30: updatePayrollStatus: async (id: string, status: string, idempotencyKey: string) => apiFetch<ApiResponse<Payroll>>(AdminHrUrlConfig.BACKEND_API.PAYROLL_STATUS_UPDATE(id), { method: 'PATCH', body: JSON.stringify({ id, status }), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: payrollSchema }),`
- `L31: fetchSummary: async (branchId?: string) => apiFetch<ApiResponse<HrSummary>>(`${AdminHrUrlConfig.BACKEND_API.SUMMARY}${branchId ? `?branchId=${encodeURIComponent(branchId)}` : ''}`, { dataSchema: hrSummarySchema }),`
- `L32: fetchLedger: async (admin_staffId: string) => apiFetch<ApiResponse<LedgerEntry[]>>(`${AdminHrUrlConfig.BACKEND_API.STAFF_GET_ONE(admin_staffId)}/ledger`, { dataSchema: z.array(ledgerEntrySchema) }),`
- `L33: giveAdvance: async (data: Record<string, unknown>, idempotencyKey: string) => apiFetch<ApiResponse<null>>(AdminHrUrlConfig.BACKEND_API.ADVANCES, { method: 'POST', body: JSON.stringify(data), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: z.null() }),`
- `L34: payDue: async (data: Record<string, unknown>, idempotencyKey: string) => apiFetch<ApiResponse<null>>(AdminHrUrlConfig.BACKEND_API.DUES_PAY, { method: 'POST', body: JSON.stringify(data), headers: { 'Idempotency-Key': idempotencyKey }, dataSchema: z.null() }),`
- `L38: return apiFetch<ApiResponse<StaffPerformanceRecord[]>>(`${AdminHrUrlConfig.BACKEND_API.PERFORMANCE}?${query.toString()}`, { dataSchema: z.array(admin_staffPerformanceRecordSchema) });`

## Repair Contract Status — 2026-09-23
- Query reads are isolated behind the feature repository and mapper boundary.
- State mutations require method-level `@RequireIdempotencyKey()` where applicable.
- Finite persistence states use module-owned enums; migrations are explicit.
- Monetary response DTOs must expose the paired ISO-4217 currency code.
- Any cached read must be invalidated by its owning feature after a successful mutation.
- Critical realtime events are persisted before publication; publication is deferred until commit.
- Rule 119 exports are asynchronous and artifact access uses expiring signed references.
