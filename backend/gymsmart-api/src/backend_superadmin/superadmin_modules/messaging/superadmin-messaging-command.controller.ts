// RESPONSIBILITY: Owns HTTP transport for the messaging-command.controller controller surface; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning service -> canonical response envelope.
import { RequireIdempotencyKey } from '@/backend_superadmin/superadmin_core/superadmin_core_cache/superadmin-core-idempotency.decorator';
import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuperadminCoreJwtAuthGuard } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-jwt-auth.guard';
import { SuperadminCoreRolesGuard } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-auth.constants';
import { SuperadminCoreRateLimitGuard } from '@/backend_superadmin/superadmin_core/superadmin_core_cache/superadmin-core-rate-limit.guard';
import { SuperadminMessagingCreateService } from '@/backend_superadmin/superadmin_modules/messaging/messaging_services/superadmin-messaging-create.service';
import { SuperadminMessagingCreateDto } from '@/backend_superadmin/superadmin_modules/messaging/messaging_dtos/superadmin-messaging-create.dto';
import { SuperadminMessagingUpdateService } from '@/backend_superadmin/superadmin_modules/messaging/messaging_services/superadmin-messaging-update.service';
import { SuperadminMessagingUpdateDto } from '@/backend_superadmin/superadmin_modules/messaging/messaging_dtos/superadmin-messaging-update.dto';
import { SuperadminMessagingDeleteService } from '@/backend_superadmin/superadmin_modules/messaging/messaging_services/superadmin-messaging-delete.service';
import { SuperadminTenantMessageStatusService } from '@/backend_superadmin/superadmin_modules/messaging/messaging_services/superadmin-messaging-status.service';
import { SuperadminTenantMessageStatusDto } from '@/backend_superadmin/superadmin_modules/messaging/messaging_dtos/superadmin-messaging-status.dto';
import { SuperadminMessagingResponseDto } from '@/backend_superadmin/superadmin_modules/messaging/messaging_responses/superadmin-messaging-response.dto';

/**
 * Primary Intent: Defines SuperadminMessagingCommandController as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@ApiTags('messaging')
@Controller()
@UseGuards(SuperadminCoreJwtAuthGuard, SuperadminCoreRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminMessagingCommandController {
  constructor(private readonly createService: SuperadminMessagingCreateService, private readonly updateService: SuperadminMessagingUpdateService, private readonly deleteService: SuperadminMessagingDeleteService, private readonly statusService: SuperadminTenantMessageStatusService) {}
/**
 * Primary Intent: Executes the create use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Handles the create mutation for the feature. */
  @ApiOperation({ summary: 'create messaging' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post(['api/superadmin/messaging', 'api/superadmin/messaging'])
    @HttpCode(HttpStatus.CREATED)
  @UseGuards(SuperadminCoreRateLimitGuard)
  @ApiResponse({ type: SuperadminMessagingResponseDto })
  @ApiOperation({ summary: 'create' })
    /**
     * Primary Intent: Executes the create use case within its owning backend boundary.
     * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
     * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
     * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
     */
    async create(@Body() body: SuperadminMessagingCreateDto): Promise<SuperadminMessagingResponseDto> { return (this.createService.createMessaging(body)) as unknown as SuperadminMessagingResponseDto; }
/**
 * Primary Intent: Executes the createMessage use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Implements the explicit frontend /messages create contract. */
  @ApiOperation({ summary: 'create messaging message' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post(['api/superadmin/messaging/messages', 'api/superadmin/messaging/messages'])
  @UseGuards(SuperadminCoreRateLimitGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ type: SuperadminMessagingResponseDto })
  @ApiOperation({ summary: 'createMessage' })
  /**
   * Primary Intent: Executes the createMessage use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async createMessage(@Body() body: SuperadminMessagingCreateDto): Promise<SuperadminMessagingResponseDto> {
    return this.createService.createMessaging(body) as unknown as SuperadminMessagingResponseDto;
  }
/**
 * Primary Intent: Executes the update use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Handles the update mutation for the feature. */
  @ApiOperation({ summary: 'update messaging' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Patch(['api/superadmin/messaging/:id', 'api/superadmin/messaging/:id'])
  @UseGuards(SuperadminCoreRateLimitGuard)
  @ApiResponse({ type: SuperadminMessagingResponseDto })
  @ApiOperation({ summary: 'update' })
    /**
     * Primary Intent: Executes the update use case within its owning backend boundary.
     * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
     * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
     * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
     */
    async update(@Param('id') id: string, @Body() body: SuperadminMessagingUpdateDto): Promise<SuperadminMessagingResponseDto> { return (this.updateService.updateMessaging(id, body)) as unknown as SuperadminMessagingResponseDto; }
/**
 * Primary Intent: Executes the remove use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Handles the remove mutation for the feature. */
  @ApiOperation({ summary: 'remove messaging' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Delete(['api/superadmin/messaging/:id', 'api/superadmin/messaging/:id'])
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
    async remove(@Param('id') id: string): Promise<void> { await this.deleteService.deleteMessaging(id); }
/**
 * Primary Intent: Executes the changeStatus use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Handles the changeStatus mutation for the feature. */
  @ApiOperation({ summary: 'changeStatus messaging' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
@Patch(['api/superadmin/messaging/:id/status', 'api/superadmin/messaging/:id/status'])
    @UseGuards(SuperadminCoreRateLimitGuard)
  @ApiResponse({ type: SuperadminMessagingResponseDto })
  @ApiOperation({ summary: 'changeStatus' })
    /**
     * Primary Intent: Executes the changeStatus use case within its owning backend boundary.
     * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
     * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
     * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
     */
    async changeStatus(@Param('id') id: string, @Body() body: SuperadminTenantMessageStatusDto): Promise<SuperadminMessagingResponseDto> { return (this.statusService.changeTenantMessageStatus(id, body.status)) as unknown as SuperadminMessagingResponseDto; }

}
