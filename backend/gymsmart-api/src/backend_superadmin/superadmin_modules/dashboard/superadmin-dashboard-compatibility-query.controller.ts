// RESPONSIBILITY: Owns the legacy/frontend-compatible Superadmin dashboard aggregate GET route.
// FLOW: HTTP GET -> isolated dashboard API read service -> typed response -> global response envelope.
import { Controller, Get, HttpStatus, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuperadminCoreJwtAuthGuard } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-jwt-auth.guard';
import { SuperadminCoreRolesGuard } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-auth.constants';
import { SuperadminQueryDto } from '@/backend_superadmin/superadmin_core/superadmin_core_pagination/superadmin-query.dto';
import { SuperadminDashboardApiReadService } from '@/backend_superadmin/superadmin_modules/dashboard/dashboard_services/superadmin-dashboard-api-read.service';
import { SuperadminDashboardApiResponseDto } from '@/backend_superadmin/superadmin_modules/dashboard/dashboard_responses/superadmin-dashboard-api-response.dto';
/**
 * Primary Intent: Preserves the frontend-compatible aggregate dashboard read while new consumers use isolated widget endpoints. Edge Cases: It is read-only and contains no SQL.
 * Side-Effects: None beyond downstream read queries. AI-Note: Do not add new widget business logic here.
 */
@ApiTags('dashboard-compatibility')
@Controller()
@UseGuards(SuperadminCoreJwtAuthGuard, SuperadminCoreRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminDashboardCompatibilityQueryController {
  constructor(private readonly service: SuperadminDashboardApiReadService) {}
  /**
   * Primary Intent: Serves the existing frontend Dashboard GET contract while preserving isolated widget ownership.
   * Edge Cases: Query validation and widget empty-result semantics remain delegated to the existing query DTO and widget services.
   * Side-Effects: None; the endpoint is read-only.
   * AI-Note: This is a compatibility composition endpoint, not a location for SQL or new dashboard business rules.
   */
  // SLA: FAST
  @Get(['api/v1/superadmin/dashboard', 'api/superadmin/dashboard'])
  @ApiResponse({ status: HttpStatus.OK, type: SuperadminDashboardApiResponseDto })
  @ApiOperation({ summary: 'dashboard' })
  /**
   * Primary Intent: Executes the dashboard use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async dashboard(@Query() query: SuperadminQueryDto): Promise<SuperadminDashboardApiResponseDto> {
    return this.service.findDashboard(query);
  }
}
