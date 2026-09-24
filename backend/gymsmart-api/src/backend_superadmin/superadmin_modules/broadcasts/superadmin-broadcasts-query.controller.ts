// RESPONSIBILITY: Owns HTTP transport for the broadcasts-query.controller controller surface; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning service -> canonical response envelope.
import { HttpStatus, Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags, ApiOperation } from '@nestjs/swagger';
import { SuperadminCoreJwtAuthGuard } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-jwt-auth.guard';
import { SuperadminCoreRolesGuard } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-auth.constants';
import { SuperadminBroadcastsQueryDto } from '@/backend_superadmin/superadmin_modules/broadcasts/broadcasts_dtos/superadmin-broadcasts-query.dto';
import { SuperadminBroadcastsListService } from '@/backend_superadmin/superadmin_modules/broadcasts/broadcasts_services/superadmin-broadcasts-list.service';
import { SuperadminBroadcastsFindService } from '@/backend_superadmin/superadmin_modules/broadcasts/broadcasts_services/superadmin-broadcasts-find.service';
import { SuperadminBroadcastsResponseDto } from '@/backend_superadmin/superadmin_modules/broadcasts/broadcasts_responses/superadmin-broadcasts-response.dto';
import { SuperadminBroadcastsRepository } from '@/backend_superadmin/superadmin_modules/broadcasts/superadmin-broadcasts.repository';
import { SuperadminPaginatedResult } from '@/backend_superadmin/superadmin_core/superadmin_core_pagination/superadmin-core-paginated-result';

/**
 * Primary Intent: Defines SuperadminBroadcastsQueryController as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@ApiTags('broadcasts')
@Controller('/superadmin/broadcasts')
@UseGuards(SuperadminCoreJwtAuthGuard, SuperadminCoreRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminBroadcastsQueryController {
  constructor(private readonly listService: SuperadminBroadcastsListService, private readonly findService: SuperadminBroadcastsFindService, private readonly repository: SuperadminBroadcastsRepository) {}
/**
 * Primary Intent: Executes the findAll use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Returns a paginated broadcasts list. */
  // SLA: FAST
  @Get()
  @ApiResponse({ type: [SuperadminBroadcastsResponseDto] })
  @ApiOperation({ summary: 'findAll' })
  /**
   * Primary Intent: Executes the findAll use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async findAll(@Query() query: SuperadminBroadcastsQueryDto): Promise<SuperadminPaginatedResult<SuperadminBroadcastsResponseDto>> { return await this.listService.findBroadcastsPage(query); }
/**
 * Primary Intent: Executes the recipientCount use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Returns the current recipient count used by the broadcast composer. */
  // SLA: FAST
  @Get('recipient-count')
  @ApiResponse({ status: HttpStatus.OK, description: 'Recipient count for the broadcast composer.' })
  @ApiOperation({ summary: 'recipientCount' })
  /**
   * Primary Intent: Executes the recipientCount use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async recipientCount(): Promise<{ count: number }> { return { count: await this.repository.countRecipients() }; }
/**
 * Primary Intent: Executes the findOne use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Returns one broadcasts record. */
  // SLA: FAST
  @Get(':id')
  @ApiResponse({ type: SuperadminBroadcastsResponseDto })
  @ApiOperation({ summary: 'findOne' })
  /**
   * Primary Intent: Executes the findOne use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async findOne(@Param('id') id: string): Promise<SuperadminBroadcastsResponseDto> { return await this.findService.findBroadcastsById(id); }
}
