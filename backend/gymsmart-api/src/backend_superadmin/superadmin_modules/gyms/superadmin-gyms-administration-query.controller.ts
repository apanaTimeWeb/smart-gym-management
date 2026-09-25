// RESPONSIBILITY: Owns the query HTTP transport for this feature; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning micro-service -> canonical response envelope.

import { Controller, UseGuards, HttpStatus, Body, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { SuperadminCoreJwtAuthGuard } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-jwt-auth.guard';
import { SuperadminCoreRolesGuard } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-auth.constants';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuperadminGymsBusinessControlsService } from '@/backend_superadmin/superadmin_modules/gyms/gyms_services/superadmin-gyms-business-controls.service';
import { SuperadminGymsBusinessControlsResponseDto } from '@/backend_superadmin/superadmin_modules/gyms/superadmin-gyms-business-controls-response.dto';
import { SuperadminGymsDetailBusinessOverviewResponseDto } from '@/backend_superadmin/superadmin_modules/gyms/superadmin-gyms-detail-business-overview-response.dto';
import { SuperadminGymsDetailBusinessOverviewService } from '@/backend_superadmin/superadmin_modules/gyms/gyms_services/superadmin-gyms-detail-business-overview.service';
import { SuperadminGymsOperationalService } from '@/backend_superadmin/superadmin_modules/gyms/gyms_services/superadmin-gyms-operational.service';
import { SuperadminQueryDto } from '@/backend_superadmin/superadmin_core/superadmin_core_pagination/superadmin-query.dto';

/**
 * Primary Intent: Defines SuperadminGymsAdministrationQueryController as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@ApiTags('gymsadministrationquery')
@Controller()
@UseGuards(SuperadminCoreJwtAuthGuard, SuperadminCoreRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminGymsAdministrationQueryController {
  constructor(private readonly businessControlsService: SuperadminGymsBusinessControlsService, private readonly detailBusinessOverviewService: SuperadminGymsDetailBusinessOverviewService, private readonly operationalService: SuperadminGymsOperationalService) {}
/**
 * Primary Intent: Executes the businessControls use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Executes GET /superadmin/gyms/business-controls. */
  // SLA: FAST
    @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  // SLA: FAST
@Get(['superadmin/gyms/business-controls', 'superadmin/gyms/business-controls'])
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  @ApiOperation({ summary: 'businessControls' })
  /**
   * Primary Intent: Executes the businessControls use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async businessControls(@Query() query: SuperadminQueryDto): Promise<SuperadminGymsBusinessControlsResponseDto> { return await this.businessControlsService.findGymsBusinessControls({ query }) as unknown as SuperadminGymsBusinessControlsResponseDto; }
/**
 * Primary Intent: Executes the stats use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Returns live Gym aggregate statistics. */
  // SLA: FAST
  @Get('superadmin/gyms/stats')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  @ApiOperation({ summary: 'stats' })
  /**
   * Primary Intent: Executes the stats use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async stats(): Promise<{ totalActive: number; totalSuspended: number; mrrContribution: number }> { return this.operationalService.stats(); }
/**
 * Primary Intent: Executes the detailBusinessOverview use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Executes GET /superadmin/gym-detail/business-overview. */
  // SLA: FAST
    @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  // SLA: FAST
@Get(['superadmin/gym-detail/business-overview', 'superadmin/gym-detail/business-overview'])
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  @ApiOperation({ summary: 'detailBusinessOverview' })
  /**
   * Primary Intent: Executes the detailBusinessOverview use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async detailBusinessOverview(@Query() query: SuperadminQueryDto): Promise<SuperadminGymsDetailBusinessOverviewResponseDto> { return await this.detailBusinessOverviewService.findGymsDetailBusinessOverview({ query }) as unknown as SuperadminGymsDetailBusinessOverviewResponseDto; }

}
