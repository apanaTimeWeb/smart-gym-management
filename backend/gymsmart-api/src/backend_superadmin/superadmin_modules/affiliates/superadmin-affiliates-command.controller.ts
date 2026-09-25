// RESPONSIBILITY: Owns HTTP transport for the affiliates-command.controller controller surface; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning service -> canonical response envelope.
import { RequireIdempotencyKey } from '@/backend_superadmin/superadmin_core/superadmin_core_cache/superadmin-core-idempotency.decorator';
import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuperadminCoreJwtAuthGuard } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-jwt-auth.guard';
import { SuperadminCoreRolesGuard } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-auth.constants';
import { SuperadminCoreRateLimitGuard } from '@/backend_superadmin/superadmin_core/superadmin_core_cache/superadmin-core-rate-limit.guard';
import { SuperadminAffiliatesCreateService } from '@/backend_superadmin/superadmin_modules/affiliates/affiliates_services/superadmin-affiliates-create.service';
import { SuperadminAffiliatesCreateDto } from '@/backend_superadmin/superadmin_modules/affiliates/affiliates_dtos/superadmin-affiliates-create.dto';
import { SuperadminAffiliatesUpdateService } from '@/backend_superadmin/superadmin_modules/affiliates/affiliates_services/superadmin-affiliates-update.service';
import { SuperadminAffiliatesUpdateDto } from '@/backend_superadmin/superadmin_modules/affiliates/affiliates_dtos/superadmin-affiliates-update.dto';
import { SuperadminAffiliatesDeleteService } from '@/backend_superadmin/superadmin_modules/affiliates/affiliates_services/superadmin-affiliates-delete.service';
import { SuperadminAffiliatesStatusService } from '@/backend_superadmin/superadmin_modules/affiliates/affiliates_services/superadmin-affiliates-status.service';
import { SuperadminAffiliatesPayoutOrchestratorService } from '@/backend_superadmin/superadmin_modules/affiliates/affiliates_services/superadmin-affiliates-payout-orchestrator.service';
import { SuperadminAffiliateStatusDto } from '@/backend_superadmin/superadmin_modules/affiliates/affiliates_dtos/superadmin-affiliates-status.dto';
import { SuperadminAffiliatesResponseDto } from '@/backend_superadmin/superadmin_modules/affiliates/affiliates_responses/superadmin-affiliates-response.dto';

/**
 * Primary Intent: Defines SuperadminAffiliatesCommandController as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@ApiTags('affiliates')
@Controller()
@UseGuards(SuperadminCoreJwtAuthGuard, SuperadminCoreRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminAffiliatesCommandController {
  constructor(private readonly createService: SuperadminAffiliatesCreateService, private readonly updateService: SuperadminAffiliatesUpdateService, private readonly deleteService: SuperadminAffiliatesDeleteService, private readonly statusService: SuperadminAffiliatesStatusService, private readonly payoutService: SuperadminAffiliatesPayoutOrchestratorService) {}
/**
 * Primary Intent: Executes the create use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Handles the create mutation for the feature. */
  @ApiOperation({ summary: 'create affiliates' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post(['superadmin/affiliates', 'api/superadmin/affiliates'])
    @HttpCode(HttpStatus.CREATED)
  @UseGuards(SuperadminCoreRateLimitGuard)
  @ApiResponse({ type: SuperadminAffiliatesResponseDto })
  @ApiOperation({ summary: 'create' })
    /**
     * Primary Intent: Executes the create use case within its owning backend boundary.
     * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
     * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
     * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
     */
    async create(@Body() body: SuperadminAffiliatesCreateDto): Promise<SuperadminAffiliatesResponseDto> { return this.createService.createAffiliates(body); }
/**
 * Primary Intent: Executes the update use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Handles the update mutation for the feature. */
  @ApiOperation({ summary: 'update affiliates' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Patch(['superadmin/affiliates/:id', 'api/superadmin/affiliates/:id'])
  @UseGuards(SuperadminCoreRateLimitGuard)
  @ApiResponse({ type: SuperadminAffiliatesResponseDto })
  @ApiOperation({ summary: 'update' })
    /**
     * Primary Intent: Executes the update use case within its owning backend boundary.
     * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
     * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
     * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
     */
    async update(@Param('id') id: string, @Body() body: SuperadminAffiliatesUpdateDto): Promise<SuperadminAffiliatesResponseDto> { return this.updateService.updateAffiliates(id, body); }

  /**
   * Primary Intent: Requests an atomic ledger-backed payout for the affiliate's current pending liability.
   * Edge Cases: Zero balance, concurrent requests, and retries are rejected or safely serialized by the orchestrator.
   * Side-Effects: Creates paired debit/credit ledger entries and an audit-visible payout projection.
   * AI-Note: Never accept a client payout amount; the locked repository row is authoritative.
   */
  // SLA: STANDARD
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post(['superadmin/affiliates/:id/pay', 'api/superadmin/affiliates/:id/pay'])
  @ApiResponse({ type: SuperadminAffiliatesResponseDto })
  @ApiOperation({ summary: 'pay' })
  /**
   * Primary Intent: Executes the pay use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async pay(@Param('id') id: string): Promise<SuperadminAffiliatesResponseDto> { return this.payoutService.pay(id); }
/**
 * Primary Intent: Executes the remove use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Handles the remove mutation for the feature. */
  @ApiOperation({ summary: 'remove affiliates' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Delete(['superadmin/affiliates/:id', 'api/superadmin/affiliates/:id'])
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
    @UseGuards(SuperadminCoreRateLimitGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'remove' })
    /**
     * Primary Intent: Executes the remove use case within its owning backend boundary.
     * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
     * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
     * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
     */
    async remove(@Param('id') id: string): Promise<void> { await this.deleteService.deleteAffiliates(id); }
/**
 * Primary Intent: Executes the changeStatus use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Handles the changeStatus mutation for the feature. */
  @ApiOperation({ summary: 'changeStatus affiliates' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Patch(['superadmin/affiliates/:id/status', 'api/superadmin/affiliates/:id/status'])
    @UseGuards(SuperadminCoreRateLimitGuard)
  @ApiResponse({ type: SuperadminAffiliatesResponseDto })
  @ApiOperation({ summary: 'changeStatus' })
    /**
     * Primary Intent: Executes the changeStatus use case within its owning backend boundary.
     * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
     * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
     * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
     */
    async changeStatus(@Param('id') id: string, @Body() body: SuperadminAffiliateStatusDto): Promise<SuperadminAffiliatesResponseDto> { return this.statusService.changeAffiliatesStatus(id, body.status); }

}
