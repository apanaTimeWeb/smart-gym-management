// RESPONSIBILITY: Owns the query HTTP transport for this feature; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning micro-service -> canonical response envelope.

import { Controller, UseGuards, Body, Delete, Get, Param, Patch, Post, Query, HttpStatus } from '@nestjs/common';
import { SuperadminCoreJwtAuthGuard } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-jwt-auth.guard';
import { SuperadminCoreRolesGuard } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-auth.constants';
import { SuperadminFeaturesRolloutInsightsResponseDto } from '@/backend_superadmin/superadmin_modules/features/superadmin-features-rollout-insights-response.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuperadminFeaturesRolloutInsightsService } from '@/backend_superadmin/superadmin_modules/features/features_services/superadmin-features-rollout-insights.service';
import { SuperadminFeaturesMainService } from '@/backend_superadmin/superadmin_modules/features/features_services/superadmin-features-main.service';
import { SuperadminFeaturesResponseDataDto } from '@/backend_superadmin/superadmin_modules/features/superadmin-features-response-data.dto';

/**
 * Primary Intent: Defines SuperadminFeaturesRolloutInsightsQueryController as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@ApiTags('featuresrolloutinsightsquery')
@Controller()
@UseGuards(SuperadminCoreJwtAuthGuard, SuperadminCoreRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminFeaturesRolloutInsightsQueryController {
  constructor(private readonly rolloutInsightsService: SuperadminFeaturesRolloutInsightsService, private readonly mainService: SuperadminFeaturesMainService) {}
/**
 * Primary Intent: Executes the findFeaturesRolloutInsights use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Executes GET /superadmin/features/rollout-insights. */
  // SLA: FAST
    @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  // SLA: FAST
@Get(['superadmin/features/rollout-insights', 'superadmin/features/rollout-insights'])
  @ApiResponse({ type: SuperadminFeaturesRolloutInsightsResponseDto })
  @ApiOperation({ summary: 'findFeaturesRolloutInsights' })
  /**
   * Primary Intent: Executes the findFeaturesRolloutInsights use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async findFeaturesRolloutInsights(): Promise<SuperadminFeaturesRolloutInsightsResponseDto> { return await this.rolloutInsightsService.findFeaturesRolloutInsights(); }
/**
 * Primary Intent: Executes the findFeaturesData use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Executes GET /superadmin/features. */
  // SLA: FAST
  @Get('superadmin/features')
  @ApiResponse({ type: SuperadminFeaturesResponseDataDto })
  @ApiOperation({ summary: 'findFeaturesData' })
  /**
   * Primary Intent: Executes the findFeaturesData use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async findFeaturesData(): Promise<SuperadminFeaturesResponseDataDto> { return await this.mainService.findFeaturesData() as unknown as SuperadminFeaturesResponseDataDto; }

}
