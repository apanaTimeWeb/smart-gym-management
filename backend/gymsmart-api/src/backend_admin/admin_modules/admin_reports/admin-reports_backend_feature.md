# Reports Backend Feature Map

## Module Purpose
This module provides the backend capability consumed by the frontend `reports` feature under the Admin domain. It is isolated as the AI repair unit and owns its controllers, DTOs, services, repository, mapper, entity, seed data, and tests. Cross-feature business logic is not placed here; declared runtime events or approved core infrastructure are used for external coupling.

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
| `admin-reports-exceptions.ts` | Feature-owned implementation artifact within the Admin feature boundary. |
| `admin-reports.constants.ts` | Feature-owned constants and machine-readable error/event identifiers. |
| `admin-reports.module.ts` | Feature module registration and dependency wiring. |
| `admin-reports.seeder.ts` | Idempotent feature-local seed data. |
| `admin-reports_backend_feature.md` | Authoritative feature map, frozen API contract, invariants and AI repair boundary. |
| `admin-reports_collection.json` | Module-local API collection for endpoint verification. |
| `admin-reports_dependencies.md` | Feature dependency registry; documents approved business/runtime/infrastructure dependencies. |
| `admin-reports_forbidden.md` | Feature forbidden-pattern register; records patterns the repair agent must not introduce. |
| `reports_controllers/admin-reports-command.controller.ts` | Thin HTTP command/query controller; no business or persistence logic. |
| `reports_controllers/admin-reports-query.controller.ts` | Thin HTTP command/query controller; no business or persistence logic. |
| `reports_domain/admin-reports.domain.ts` | Framework-independent domain model used by business services and presenters. |
| `reports_dtos/admin-reports-id.dto.ts` | Request/response validation and OpenAPI data contract. |
| `reports_dtos/admin-reports-mutation.dto.ts` | Request/response validation and OpenAPI data contract. |
| `reports_dtos/admin-reports-query.dto.ts` | Request/response validation and OpenAPI data contract. |
| `reports_dtos/admin-reports-response.dto.ts` | Request/response validation and OpenAPI data contract. |
| `reports_entities/admin-reports-entity.ts` | ORM persistence model only; never crosses into service-layer business logic. |
| `reports_mappers/admin-reports.mapper.spec.ts` | ORM/domain mapping or frontend response presentation; no database I/O. |
| `reports_mappers/admin-reports.mapper.ts` | ORM/domain mapping or frontend response presentation; no database I/O. |
| `reports_mappers/admin-reports.response.presenter.ts` | ORM/domain mapping or frontend response presentation; no database I/O. |
| `reports_repositories/admin-reports-repository.ts` | Feature-owned persistence/query access behind the repository boundary. |
| `reports_services/admin-reports-command.service.ts` | Single-use-case business orchestration within the feature boundary. |
| `reports_services/admin-reports-query.service.ts` | Single-use-case business orchestration within the feature boundary. |
| `reports_utils/admin-reports-pdf-generator.utils.spec.ts` | Feature-local pure utility; no cross-module business sharing. |
| `reports_utils/admin-reports-pdf-generator.utils.ts` | Feature-local pure utility; no cross-module business sharing. |
| `reports_utils/admin-reports-query-window.utils.ts` | Feature-local pure utility; no cross-module business sharing. |
| `reports_utils/admin-reports-xlsx-generator.utils.spec.ts` | Feature-local pure utility; no cross-module business sharing. |
| `reports_utils/admin-reports-xlsx-generator.utils.ts` | Feature-local pure utility; no cross-module business sharing. |
| `reports_workers/admin-reports.worker.ts` | Background worker lifecycle; owns async job processing for the feature. |
## Localization Contract
- Locale root: `_locales/` (exact Rule 116 layout).
- Catalogs: en, nl, fr, de, hi, mr, ta, te, kn, bn, gu, ml, pa.
- Files per locale: `messages.json` and `errors.json`.

## Feature Inventory
| Controller/Endpoint | HTTP | Path | Purpose | Request DTO | Response Type |
|---|---|---|---|---|---|
| `admin-reports-command.controller.ts:createExportJob` | POST | `/api/v1/admin/reports/exportReport` | Executes the `createExportJob` use case for Admin `reports` within the owning feature boundary. | `AdminReportsMutationDto` (body: AdminReportsMutationDto) | `Promise<AdminReportsExportResponseDto>` |
| `admin-reports-query.controller.ts:findReportData` | GET | `/api/v1/admin/reports/fetchReportData` | Executes the `findReportData` use case for Admin `reports` within the owning feature boundary. | `AdminReportsQueryDto` (query: AdminReportsQueryDto) | `Promise<AdminReportsDataResponseDto>` |
| `admin-reports-query.controller.ts:fetchRevenue` | GET | `/api/v1/admin/reports/revenue` | Executes the `fetchRevenue` use case for Admin `reports` within the owning feature boundary. | `None` (none) | `Promise<AdminReportsDataResponseDto>` |
| `admin-reports-query.controller.ts:fetchAttendance` | GET | `/api/v1/admin/reports/attendance` | Executes the `fetchAttendance` use case for Admin `reports` within the owning feature boundary. | `None` (none) | `Promise<AdminReportsDataResponseDto>` |
| `admin-reports-query.controller.ts:fetchMembers` | GET | `/api/v1/admin/reports/members` | Executes the `fetchMembers` use case for Admin `reports` within the owning feature boundary. | `None` (none) | `Promise<AdminReportsDataResponseDto>` |
| `admin-reports-query.controller.ts:fetchPayroll` | GET | `/api/v1/admin/reports/payroll` | Executes the `fetchPayroll` use case for Admin `reports` within the owning feature boundary. | `None` (none) | `Promise<AdminReportsDataResponseDto>` |
| `admin-reports-query.controller.ts:fetchPnl` | GET | `/api/v1/admin/reports/pnl` | Executes the `fetchPnl` use case for Admin `reports` within the owning feature boundary. | `None` (none) | `Promise<AdminReportsDataResponseDto>` |
| `admin-reports-query.controller.ts:findReportExportDownload` | GET | `/api/v1/admin/reports/export/:id/download` | Executes the `findReportExportDownload` use case for Admin `reports` within the owning feature boundary. | `None` (path: id: string) | `Promise<StreamableFile>` |

## Approved External Dependencies
- **Business Feature Dependencies**: None declared directly.
- **Infrastructure Dependencies**: NestJS, TypeORM, PostgreSQL, Redis-backed core services, request context, canonical response/validation infrastructure.
- **Runtime/Event Dependencies**: None declared in this v1 package unless listed in the dependency document.

## Data and State Architecture
- DB Entities: `reports` tenant table/entity plus JSONB frontend contract payload.
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
- `admin-reports-exceptions.ts` — Feature-owned implementation artifact.
- `admin-reports.constants.ts` — Feature-owned implementation artifact.
- `admin-reports.module.ts` — Feature module provider/controller registration only.
- `admin-reports.seeder.ts` — Idempotent feature seed data only.
- `admin-reports_collection.json` — Module-local API collection/configuration artifact.
- `admin-reports_dependencies.md` — Governance/documentation artifact for this feature; must remain aligned with code.
- `admin-reports_forbidden.md` — Governance/documentation artifact for this feature; must remain aligned with code.
- `reports_controllers/admin-reports-command.controller.ts` — Thin HTTP boundary; MUST NOT contain business or persistence logic.
- `reports_controllers/admin-reports-query.controller.ts` — Thin HTTP boundary; MUST NOT contain business or persistence logic.
- `reports_domain/admin-reports.domain.ts` — Framework-independent domain shape.
- `reports_dtos/admin-reports-id.dto.ts` — Request/response validation and API shape; MUST NOT perform side effects.
- `reports_dtos/admin-reports-mutation.dto.ts` — Request/response validation and API shape; MUST NOT perform side effects.
- `reports_dtos/admin-reports-query.dto.ts` — Request/response validation and API shape; MUST NOT perform side effects.
- `reports_dtos/admin-reports-response.dto.ts` — Request/response validation and API shape; MUST NOT perform side effects.
- `reports_entities/admin-reports-entity.ts` — ORM persistence mapping only.
- `_locales/en/errors.json` — Feature-local localization resources.
- `_locales/en/messages.json` — Feature-local localization resources.
- `_locales/hi/errors.json` — Feature-local localization resources.
- `_locales/hi/messages.json` — Feature-local localization resources.
- `reports_mappers/admin-reports.mapper.spec.ts` — Domain/ORM to API mapping only; MUST NOT perform DB I/O.
- `reports_mappers/admin-reports.mapper.ts` — Domain/ORM to API mapping only; MUST NOT perform DB I/O.
- `reports_repositories/admin-reports-repository.ts` — Feature-owned database/query access; MUST NOT contain HTTP/UI logic.
- `reports_services/admin-reports-command.service.ts` — Single use-case business flow; MUST NOT access TypeORM directly.
- `reports_services/admin-reports-query.service.ts` — Single use-case business flow; MUST NOT access TypeORM directly.
- `reports_utils/admin-reports-pdf-generator.utils.spec.ts` — Pure feature-local helper; MUST NOT become shared business infrastructure.
- `reports_utils/admin-reports-pdf-generator.utils.ts` — Pure feature-local helper; MUST NOT become shared business infrastructure.
- `reports_utils/admin-reports-query-window.utils.ts` — Pure feature-local helper; MUST NOT become shared business infrastructure.
- `reports_utils/admin-reports-xlsx-generator.utils.spec.ts` — Pure feature-local helper; MUST NOT become shared business infrastructure.
- `reports_utils/admin-reports-xlsx-generator.utils.ts` — Pure feature-local helper; MUST NOT become shared business infrastructure.
- `reports_workers/admin-reports.worker.ts` — Feature-local async job scheduling/processing.

## Permissions and Security
| Endpoint | Required Role(s) | Resource-Level Check |
|---|---|---|
| `GET /api/v1/admin/reports/fetchReportData` | ADMIN, SUPERADMIN, MANAGER | Tenant context is verified against the authenticated actor before DataSource selection; resource-level checks are feature-specific when applicable. |
| `POST /api/v1/admin/reports/exportReport` | ADMIN, SUPERADMIN, MANAGER | Tenant context is verified against the authenticated actor before DataSource selection; resource-level checks are feature-specific when applicable. |

## Edge Cases / AI Warnings
- Never bypass the `reports` repository boundary; direct ORM access from services violates Rule 89 and risks persistence leakage. — see Rules 7, 89.
- Never trust a client-supplied tenant identifier; tenant authorization must occur before DataSource resolution. — see Rule 39.
- Never change a frozen response field or nested structure unilaterally; doing so breaks the frontend contract. — see Rules 67 and 82A.
- Never implement a critical mutation without the idempotency contract where the operation can be retried. — see Rule 31.
- Never use an unallowlisted sort/filter value as an ORM identifier. — see Rule 92.

## Frozen API Contract
This section is generated from the current backend controllers/DTOs and must remain aligned with the frozen frontend requirement baseline. Frontend files remain read-only evidence.

### Request Shape
| Endpoint | Method | Request parameters/body |
|---|---|---|
| `/api/v1/admin/reports/exportReport` | POST | body: AdminReportsMutationDto; `tab: AdminReportsTab`, `format: AdminReportsFormat` |
| `/api/v1/admin/reports/fetchReportData` | GET | query: AdminReportsQueryDto; `branchId: string`, `gymId: string`, `range: string`, `startDate: string`, `endDate: string`, `status: AdminReportsStatus`, `priority: string`, `severity: string`, `dateRange: string`, `period: string`, `month: string`, `consumer: string` |
| `/api/v1/admin/reports/revenue` | GET | none; none |
| `/api/v1/admin/reports/attendance` | GET | none; none |
| `/api/v1/admin/reports/members` | GET | none; none |
| `/api/v1/admin/reports/payroll` | GET | none; none |
| `/api/v1/admin/reports/pnl` | GET | none; none |
| `/api/v1/admin/reports/export/:id/download` | GET | path: id: string; none |

### Response Shape
| Endpoint | Handler | Return Type | Response fields |
|---|---|---|---|
| `/api/v1/admin/reports/exportReport` | `createExportJob` | `Promise<AdminReportsExportResponseDto>` | AdminReportsExportResponseDto: `url: string`, `fileName: string` |
| `/api/v1/admin/reports/fetchReportData` | `findReportData` | `Promise<AdminReportsDataResponseDto>` | AdminReportsDataResponseDto: `revenueByGym: RevenueByGymDto[]`, `revenueByMethod: RevenueByMethodDto[]`, `revenueByPlan: RevenueByPlanDto[]`, `monthlyRevenue: MonthlyRevenueDto[]`, `membershipGrowth: MembershipGrowthRowDto[]`, `attendanceSummary: AttendanceSummaryRowDto[]`, `attendanceHeatmap: AttendanceHeatmapCellDto[]`, `payrollSummary: PayrollSummaryRowDto[]`, `pnlSummary: PnLRowDto[]`, `kpis: ReportsKpisDto` |
| `/api/v1/admin/reports/revenue` | `fetchRevenue` | `Promise<AdminReportsDataResponseDto>` | AdminReportsDataResponseDto: `revenueByGym: RevenueByGymDto[]`, `revenueByMethod: RevenueByMethodDto[]`, `revenueByPlan: RevenueByPlanDto[]`, `monthlyRevenue: MonthlyRevenueDto[]`, `membershipGrowth: MembershipGrowthRowDto[]`, `attendanceSummary: AttendanceSummaryRowDto[]`, `attendanceHeatmap: AttendanceHeatmapCellDto[]`, `payrollSummary: PayrollSummaryRowDto[]`, `pnlSummary: PnLRowDto[]`, `kpis: ReportsKpisDto` |
| `/api/v1/admin/reports/attendance` | `fetchAttendance` | `Promise<AdminReportsDataResponseDto>` | AdminReportsDataResponseDto: `revenueByGym: RevenueByGymDto[]`, `revenueByMethod: RevenueByMethodDto[]`, `revenueByPlan: RevenueByPlanDto[]`, `monthlyRevenue: MonthlyRevenueDto[]`, `membershipGrowth: MembershipGrowthRowDto[]`, `attendanceSummary: AttendanceSummaryRowDto[]`, `attendanceHeatmap: AttendanceHeatmapCellDto[]`, `payrollSummary: PayrollSummaryRowDto[]`, `pnlSummary: PnLRowDto[]`, `kpis: ReportsKpisDto` |
| `/api/v1/admin/reports/members` | `fetchMembers` | `Promise<AdminReportsDataResponseDto>` | AdminReportsDataResponseDto: `revenueByGym: RevenueByGymDto[]`, `revenueByMethod: RevenueByMethodDto[]`, `revenueByPlan: RevenueByPlanDto[]`, `monthlyRevenue: MonthlyRevenueDto[]`, `membershipGrowth: MembershipGrowthRowDto[]`, `attendanceSummary: AttendanceSummaryRowDto[]`, `attendanceHeatmap: AttendanceHeatmapCellDto[]`, `payrollSummary: PayrollSummaryRowDto[]`, `pnlSummary: PnLRowDto[]`, `kpis: ReportsKpisDto` |
| `/api/v1/admin/reports/payroll` | `fetchPayroll` | `Promise<AdminReportsDataResponseDto>` | AdminReportsDataResponseDto: `revenueByGym: RevenueByGymDto[]`, `revenueByMethod: RevenueByMethodDto[]`, `revenueByPlan: RevenueByPlanDto[]`, `monthlyRevenue: MonthlyRevenueDto[]`, `membershipGrowth: MembershipGrowthRowDto[]`, `attendanceSummary: AttendanceSummaryRowDto[]`, `attendanceHeatmap: AttendanceHeatmapCellDto[]`, `payrollSummary: PayrollSummaryRowDto[]`, `pnlSummary: PnLRowDto[]`, `kpis: ReportsKpisDto` |
| `/api/v1/admin/reports/pnl` | `fetchPnl` | `Promise<AdminReportsDataResponseDto>` | AdminReportsDataResponseDto: `revenueByGym: RevenueByGymDto[]`, `revenueByMethod: RevenueByMethodDto[]`, `revenueByPlan: RevenueByPlanDto[]`, `monthlyRevenue: MonthlyRevenueDto[]`, `membershipGrowth: MembershipGrowthRowDto[]`, `attendanceSummary: AttendanceSummaryRowDto[]`, `attendanceHeatmap: AttendanceHeatmapCellDto[]`, `payrollSummary: PayrollSummaryRowDto[]`, `pnlSummary: PnLRowDto[]`, `kpis: ReportsKpisDto` |
| `/api/v1/admin/reports/export/:id/download` | `findReportExportDownload` | `Promise<StreamableFile>` | Primitive/unknown return; runtime/static proof required. |

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

### `admin/reports/reports_api/AdminReportsBranchReferenceApi.ts`
- `L7: export const AdminReportsBranchReferenceApi = { fetchReportBranchReferences: () => apiFetch<ApiResponse<AdminReportsBranchReference[]>>(`${AdminReportsUrlConfig.api.branchReference}?consumer=reports`, { method: 'GET', dataSchema: schema }) };`

### `admin/reports/reports_api/AdminReportsApi.ts`
- `L15: fetchReportData: async (params?: AdminReportsQueryParams) => apiFetch<ApiResponse<ReportData>>(`${AdminReportsUrlConfig.api.base}/fetchReportData${buildQuery(params)}`, { method: 'GET', dataSchema: reportDataSchema }),`
- `L16: exportReport: async (params?: { tab?: string; format?: AdminReportsExportFormat }, idempotencyKey?: string) => apiFetch<ApiResponse<AdminReportsExportResponse>>(`${AdminReportsUrlConfig.api.base}/exportReport`, { method: 'POST', body: JSON.stringify(params ?? {}), dataSchema: z.object({ url: z.string(), fileName: z.string().optional() }),`

### `admin/reports/reports_api/AdminReportsBranchReferenceApi.ts`
- `L7: export const AdminReportsBranchReferenceApi = { fetchReportBranchReferences: () => apiFetch<ApiResponse<AdminReportsBranchReference[]>>(`${AdminReportsUrlConfig.api.branchReference}?consumer=reports`, { method: 'GET', dataSchema: schema }) };`

### `admin/reports/reports_api/AdminReportsApi.ts`
- `L15: fetchReportData: async (params?: AdminReportsQueryParams) => apiFetch<ApiResponse<ReportData>>(`${AdminReportsUrlConfig.api.base}/fetchReportData${buildQuery(params)}`, { method: 'GET', dataSchema: reportDataSchema }),`
- `L16: exportReport: async (params?: { tab?: string; format?: AdminReportsExportFormat }, idempotencyKey?: string) => apiFetch<ApiResponse<AdminReportsExportResponse>>(`${AdminReportsUrlConfig.api.base}/exportReport`, { method: 'POST', body: JSON.stringify(params ?? {}), dataSchema: z.object({ url: z.string(), fileName: z.string().optional() }),`


## Repair Delta — Static Hardening Pass
The `exportReport` mutation now creates a durable asynchronous export job and returns a download route whose final artifact extension matches the requested `pdf` or `excel` format. The worker generates a minimal valid PDF or XLSX artifact from the latest persisted report snapshot and stores it through the core object-storage abstraction; generation remains outside the HTTP request path. The export worker retains retry/DLQ behavior, and the response keeps the frontend `{ url, fileName }` contract.

### Export Artifact Contract
| Input `format` | Stored file | Download content type |
|---|---|---|
| `pdf` or omitted | `.pdf` | `application/pdf` |
| `excel` | `.xlsx` | `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet` |

### AI Warnings Added During Repair
- Do not move PDF/XLSX generation into the controller or synchronous request path — the export endpoint is explicitly `202 Accepted` and heavy work belongs in the queue worker (Rule 23).
- Do not return a JSON manifest under a `.pdf`/`.xlsx` extension — artifact bytes and MIME type must match the requested format.
- Do not remove the report repository boundary from the worker; ORM access remains feature-local and storage remains behind the core storage adapter.

## Repair Contract Status — 2026-09-23
- Query reads are isolated behind the feature repository and mapper boundary.
- State mutations require method-level `@RequireIdempotencyKey()` where applicable.
- Finite persistence states use module-owned enums; migrations are explicit.
- Monetary response DTOs must expose the paired ISO-4217 currency code.
- Any cached read must be invalidated by its owning feature after a successful mutation.
- Critical realtime events are persisted before publication; publication is deferred until commit.
- Rule 119 exports are asynchronous and artifact access uses expiring signed references.
