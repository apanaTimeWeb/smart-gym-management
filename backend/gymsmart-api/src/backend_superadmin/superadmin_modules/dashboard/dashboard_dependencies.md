# Dashboard Backend Dependency Graph

## Direct Business Imports
None. This feature must not import sibling Superadmin business modules directly.

## Local Feature Imports
- `superadmin-dashboard-overview-query.controller.ts`
- `superadmin-dashboard-query.controller.ts`
- `superadmin-dashboard-command.controller.ts`
- `superadmin-dashboard.entity.ts`
- `superadmin-dashboard.repository.ts`
- `superadmin-dashboard.mapper.ts`
- `dtos/superadmin-dashboard-create.dto.ts`
- `dtos/superadmin-dashboard-query.dto.ts`
- `dtos/superadmin-dashboard-update.dto.ts`
- `responses/superadmin-dashboard-response.dto.ts`
- `responses/superadmin-dashboard-kpis-response.dto.ts`
- `responses/superadmin-dashboard-growth-chart-response.dto.ts`
- `responses/superadmin-dashboard-recent-onboards-response.dto.ts`
- `responses/superadmin-dashboard-revenue-by-geography-response.dto.ts`
- `responses/superadmin-dashboard-revenue-by-tier-response.dto.ts`
- `responses/superadmin-dashboard-revenue-chart-response.dto.ts`
- `services/superadmin-dashboard-business-overview.service.ts`
- `services/superadmin-dashboard-create.service.ts`
- `services/superadmin-dashboard-delete.service.ts`
- `services/superadmin-dashboard-find.service.ts`
- `services/superadmin-dashboard-growth-chart.service.ts`
- `services/superadmin-dashboard-kpis.service.ts`
- `services/superadmin-dashboard-list.service.ts`
- `services/superadmin-dashboard-recent-onboards.service.ts`
- `services/superadmin-dashboard-revenue-by-geography.service.ts`
- `services/superadmin-dashboard-revenue-by-tier.service.ts`
- `services/superadmin-dashboard-revenue-chart.service.ts`
- `services/superadmin-dashboard-update.service.ts`

## Infrastructure Imports
- `@/backend_superadmin/superadmin_core/superadmin_core_auth/*` for authentication and role guards.
- `@/backend_superadmin/superadmin_core/superadmin_core_pagination/*` for standardized query contracts.
- `@nestjs/typeorm` feature registration for this module's entity.

## Runtime Event Dependencies
None currently declared.

## Dependency Direction
Controller -> DTO -> focused service -> repository/mapper -> infrastructure. The dashboard module must not import sibling business services or repositories directly.
