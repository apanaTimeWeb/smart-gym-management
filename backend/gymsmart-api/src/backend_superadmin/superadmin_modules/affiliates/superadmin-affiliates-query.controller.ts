// RESPONSIBILITY: Owns HTTP transport for the affiliates-query.controller controller surface; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning service -> canonical response envelope.
import { HttpStatus, Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags, ApiOperation } from '@nestjs/swagger';
import { SuperadminCoreJwtAuthGuard } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-jwt-auth.guard';
import { SuperadminCoreRolesGuard } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-auth.constants';
import { SuperadminAffiliatesQueryDto } from '@/backend_superadmin/superadmin_modules/affiliates/affiliates_dtos/superadmin-affiliates-query.dto';
import { SuperadminAffiliatesListService } from '@/backend_superadmin/superadmin_modules/affiliates/affiliates_services/superadmin-affiliates-list.service';
import { SuperadminAffiliatesFindService } from '@/backend_superadmin/superadmin_modules/affiliates/affiliates_services/superadmin-affiliates-find.service';
import { SuperadminAffiliatesPayoutService } from '@/backend_superadmin/superadmin_modules/affiliates/affiliates_services/superadmin-affiliates-payout.service';
import { SuperadminAffiliatesResponseDto, SuperadminAffiliatePayoutRecordDto } from '@/backend_superadmin/superadmin_modules/affiliates/affiliates_responses/superadmin-affiliates-response.dto';
import { SuperadminPaginatedResult } from '@/backend_superadmin/superadmin_core/superadmin_core_pagination/superadmin-core-paginated-result';

/**
 * Primary Intent: Defines SuperadminAffiliatesQueryController as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@ApiTags('affiliates')
@Controller()
@UseGuards(SuperadminCoreJwtAuthGuard, SuperadminCoreRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminAffiliatesQueryController {
  constructor(private readonly listService: SuperadminAffiliatesListService, private readonly findService: SuperadminAffiliatesFindService, private readonly payoutService: SuperadminAffiliatesPayoutService) { }
  /**
   * Primary Intent: Executes the payoutHistory use case within the owning backend feature boundary.
   * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
   * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
   * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
   */

  /** Returns payout history across active affiliates. */
  // SLA: FAST
  @Get(['superadmin/affiliates/payout-history', 'api/superadmin/affiliates/payout-history'])
  @ApiResponse({ type: [SuperadminAffiliatePayoutRecordDto] })
  @ApiOperation({ summary: 'payoutHistory' })
  /**
   * Primary Intent: Executes the payoutHistory use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async payoutHistory(): Promise<SuperadminAffiliatePayoutRecordDto[]> { return this.payoutService.history(); }
  /**
   * Primary Intent: Executes the findAll use case within the owning backend feature boundary.
   * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
   * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
   * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
   */

  /** Returns a paginated affiliates list. */
  // SLA: FAST
  @Get(['superadmin/affiliates', 'api/superadmin/affiliates'])
  @ApiResponse({ type: [SuperadminAffiliatesResponseDto] })
  @ApiOperation({ summary: 'findAll' })
  /**
   * Primary Intent: Executes the findAll use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async findAll(@Query() query: SuperadminAffiliatesQueryDto): Promise<SuperadminPaginatedResult<SuperadminAffiliatesResponseDto>> {
    console.log(`[${Date.now()}] START findAll`);
    const result = await this.listService.findAffiliatesPage(query);
    console.log(`[${Date.now()}] END findAll`);
    return result;
  }
  /**
   * Primary Intent: Executes the findOne use case within the owning backend feature boundary.
   * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
   * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
   * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
   */

  /** Returns one affiliates record. */
  // SLA: FAST
  @Get(['superadmin/affiliates/:id', 'api/superadmin/affiliates/:id'])
  @ApiResponse({ type: SuperadminAffiliatesResponseDto })
  @ApiOperation({ summary: 'findOne' })
  /**
   * Primary Intent: Executes the findOne use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async findOne(@Param('id') id: string): Promise<SuperadminAffiliatesResponseDto> { return await this.findService.findAffiliatesById(id); }
}
