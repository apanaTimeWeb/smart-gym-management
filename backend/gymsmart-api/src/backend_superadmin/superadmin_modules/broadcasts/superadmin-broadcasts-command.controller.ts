// RESPONSIBILITY: Owns HTTP transport for the broadcasts-command.controller controller surface; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning service -> canonical response envelope.
import { RequireIdempotencyKey } from '@/backend_superadmin/superadmin_core/superadmin_core_cache/superadmin-core-idempotency.decorator';
import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuperadminCoreJwtAuthGuard } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-jwt-auth.guard';
import { SuperadminCoreRolesGuard } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-auth.constants';
import { SuperadminCoreRateLimitGuard } from '@/backend_superadmin/superadmin_core/superadmin_core_cache/superadmin-core-rate-limit.guard';
import { SuperadminBroadcastsCreateService } from '@/backend_superadmin/superadmin_modules/broadcasts/broadcasts_services/superadmin-broadcasts-create.service';
import { SuperadminBroadcastsCreateDto } from '@/backend_superadmin/superadmin_modules/broadcasts/broadcasts_dtos/superadmin-broadcasts-create.dto';
import { SuperadminBroadcastsUpdateService } from '@/backend_superadmin/superadmin_modules/broadcasts/broadcasts_services/superadmin-broadcasts-update.service';
import { SuperadminBroadcastsUpdateDto } from '@/backend_superadmin/superadmin_modules/broadcasts/broadcasts_dtos/superadmin-broadcasts-update.dto';
import { SuperadminBroadcastsDeleteService } from '@/backend_superadmin/superadmin_modules/broadcasts/broadcasts_services/superadmin-broadcasts-delete.service';
import { SuperadminBroadcastsStatusService } from '@/backend_superadmin/superadmin_modules/broadcasts/broadcasts_services/superadmin-broadcasts-status.service';
import { SuperadminBroadcastsStatusDto } from '@/backend_superadmin/superadmin_modules/broadcasts/broadcasts_dtos/superadmin-broadcasts-status.dto';
import { SuperadminBroadcastsResponseDto, SuperadminBroadcastDeliveryResultDto } from '@/backend_superadmin/superadmin_modules/broadcasts/broadcasts_responses/superadmin-broadcasts-response.dto';
import { SuperadminBroadcastsDeliveryService } from '@/backend_superadmin/superadmin_modules/broadcasts/broadcasts_services/superadmin-broadcasts-delivery.service';
import { SuperadminBroadcastsDeliveryDto } from '@/backend_superadmin/superadmin_modules/broadcasts/broadcasts_dtos/superadmin-broadcasts-delivery.dto';

/**
 * Primary Intent: Defines SuperadminBroadcastsCommandController as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@ApiTags('broadcasts')
@Controller()
@UseGuards(SuperadminCoreJwtAuthGuard, SuperadminCoreRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminBroadcastsCommandController {
  constructor(private readonly createService: SuperadminBroadcastsCreateService, private readonly updateService: SuperadminBroadcastsUpdateService, private readonly deleteService: SuperadminBroadcastsDeleteService, private readonly statusService: SuperadminBroadcastsStatusService, private readonly deliveryService: SuperadminBroadcastsDeliveryService) {}
/**
 * Primary Intent: Executes the create use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Handles the create mutation for the feature. */
  @ApiOperation({ summary: 'create broadcasts' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post(['api/superadmin/broadcasts', 'api/superadmin/broadcasts'])
    @HttpCode(HttpStatus.CREATED)
  @UseGuards(SuperadminCoreRateLimitGuard)
  @ApiResponse({ type: SuperadminBroadcastsResponseDto })
  @ApiOperation({ summary: 'create' })
    /**
     * Primary Intent: Executes the create use case within its owning backend boundary.
     * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
     * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
     * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
     */
    async create(@Body() body: SuperadminBroadcastsCreateDto): Promise<SuperadminBroadcastsResponseDto> { return this.createService.createBroadcasts(body); }
/**
 * Primary Intent: Executes the update use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Handles the update mutation for the feature. */
  @ApiOperation({ summary: 'update broadcasts' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Patch(['api/superadmin/broadcasts/:id', 'api/superadmin/broadcasts/:id'])
  @UseGuards(SuperadminCoreRateLimitGuard)
  @ApiResponse({ type: SuperadminBroadcastsResponseDto })
  @ApiOperation({ summary: 'update' })
    /**
     * Primary Intent: Executes the update use case within its owning backend boundary.
     * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
     * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
     * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
     */
    async update(@Param('id') id: string, @Body() body: SuperadminBroadcastsUpdateDto): Promise<SuperadminBroadcastsResponseDto> { return this.updateService.updateBroadcasts(id, body); }
/**
 * Primary Intent: Executes the remove use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Handles the remove mutation for the feature. */
  @ApiOperation({ summary: 'remove broadcasts' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Delete(['api/superadmin/broadcasts/:id', 'api/superadmin/broadcasts/:id'])
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
    async remove(@Param('id') id: string): Promise<void> { await this.deleteService.deleteBroadcasts(id); }
/**
 * Primary Intent: Executes the deliver use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Records a broadcast recipient delivery result. */
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post(['api/superadmin/broadcasts/:broadcastId/deliveries/:recipientId', 'api/superadmin/broadcasts/:broadcastId/deliveries/:recipientId'])
  @ApiOperation({ summary: 'Record broadcast recipient delivery' })
  @ApiResponse({ type: SuperadminBroadcastDeliveryResultDto })
  /**
   * Primary Intent: Executes the deliver use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async deliver(@Param('broadcastId') broadcastId: string, @Param('recipientId') recipientId: string, @Body() body: SuperadminBroadcastsDeliveryDto): Promise<SuperadminBroadcastDeliveryResultDto> { return this.deliveryService.deliver({ broadcastId: body.broadcastId || broadcastId, recipientId: body.recipientId || recipientId }); }
/**
 * Primary Intent: Executes the changeStatus use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Handles the changeStatus mutation for the feature. */
  @ApiOperation({ summary: 'changeStatus broadcasts' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
@Patch(['api/superadmin/broadcasts/:id/status', 'api/superadmin/broadcasts/:id/status'])
    @UseGuards(SuperadminCoreRateLimitGuard)
  @ApiResponse({ type: SuperadminBroadcastsResponseDto })
  @ApiOperation({ summary: 'changeStatus' })
    /**
     * Primary Intent: Executes the changeStatus use case within its owning backend boundary.
     * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
     * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
     * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
     */
    async changeStatus(@Param('id') id: string, @Body() body: SuperadminBroadcastsStatusDto): Promise<SuperadminBroadcastsResponseDto> { return this.statusService.changeBroadcastsStatus(id, body.status); }

}
