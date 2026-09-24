// RESPONSIBILITY: Owns HTTP transport for the analytics-query.controller controller surface; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning service -> canonical response envelope.
import { HttpStatus, Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags, ApiOperation } from '@nestjs/swagger';
import { SuperadminCoreJwtAuthGuard } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-jwt-auth.guard';
import { SuperadminCoreRolesGuard } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-auth.constants';
import { SuperadminAnalyticsQueryDto } from '@/backend_superadmin/superadmin_modules/analytics/analytics_dtos/superadmin-analytics-query.dto';
import { SuperadminAnalyticsListService } from '@/backend_superadmin/superadmin_modules/analytics/analytics_services/superadmin-analytics-list.service';
import { SuperadminAnalyticsFindService } from '@/backend_superadmin/superadmin_modules/analytics/analytics_services/superadmin-analytics-find.service';
import { SuperadminAnalyticsResponseDto } from '@/backend_superadmin/superadmin_modules/analytics/analytics_responses/superadmin-analytics-response.dto';

/**
 * Primary Intent: Defines SuperadminAnalyticsQueryController as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@ApiTags('analytics')
@Controller('/superadmin/analytics')
@UseGuards(SuperadminCoreJwtAuthGuard, SuperadminCoreRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminAnalyticsQueryController {
  constructor(private readonly listService: SuperadminAnalyticsListService, private readonly findService: SuperadminAnalyticsFindService) {}
/**
 * Primary Intent: Executes the findOne use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Returns one analytics record. */
  // SLA: FAST
  @Get(':id')
  @ApiResponse({ type: SuperadminAnalyticsResponseDto })
  @ApiOperation({ summary: 'findOne' })
  /**
   * Primary Intent: Executes the findOne use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async findOne(@Param('id') id: string): Promise<SuperadminAnalyticsResponseDto> { return await this.findService.findAnalyticsById(id); }
}
