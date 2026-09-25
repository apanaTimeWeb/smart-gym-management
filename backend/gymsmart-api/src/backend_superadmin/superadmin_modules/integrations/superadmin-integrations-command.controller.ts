// RESPONSIBILITY: Owns HTTP transport for the integrations-command.controller controller surface; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning service -> canonical response envelope.
import { RequireIdempotencyKey } from '@/backend_superadmin/superadmin_core/superadmin_core_cache/superadmin-core-idempotency.decorator';
import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuperadminCoreJwtAuthGuard } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-jwt-auth.guard';
import { SuperadminCoreRolesGuard } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-auth.constants';
import { SuperadminCoreRateLimitGuard } from '@/backend_superadmin/superadmin_core/superadmin_core_cache/superadmin-core-rate-limit.guard';
import { SuperadminIntegrationsGenerateKeyDto } from '@/backend_superadmin/superadmin_modules/integrations/integrations_dtos/superadmin-integrations-generate-key.dto';
import { SuperadminIntegrationsCreateService } from '@/backend_superadmin/superadmin_modules/integrations/integrations_services/superadmin-integrations-create.service';
import { SuperadminIntegrationsCreateDto } from '@/backend_superadmin/superadmin_modules/integrations/integrations_dtos/superadmin-integrations-create.dto';
import { SuperadminIntegrationsUpdateService } from '@/backend_superadmin/superadmin_modules/integrations/integrations_services/superadmin-integrations-update.service';
import { SuperadminIntegrationsUpdateDto } from '@/backend_superadmin/superadmin_modules/integrations/integrations_dtos/superadmin-integrations-update.dto';
import { SuperadminIntegrationsDeleteService } from '@/backend_superadmin/superadmin_modules/integrations/integrations_services/superadmin-integrations-delete.service';
import { SuperadminIntegrationKeyStatusService } from '@/backend_superadmin/superadmin_modules/integrations/integrations_services/superadmin-integrations-status.service';
import { SuperadminIntegrationKeyStatusDto } from '@/backend_superadmin/superadmin_modules/integrations/integrations_dtos/superadmin-integrations-status.dto';
import { SuperadminIntegrationsResponseDto } from '@/backend_superadmin/superadmin_modules/integrations/integrations_responses/superadmin-integrations-response.dto';

/**
 * Primary Intent: Defines SuperadminIntegrationsCommandController as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@ApiTags('integrations')
@Controller()
@UseGuards(SuperadminCoreJwtAuthGuard, SuperadminCoreRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminIntegrationsCommandController {
  constructor(private readonly createService: SuperadminIntegrationsCreateService, private readonly updateService: SuperadminIntegrationsUpdateService, private readonly deleteService: SuperadminIntegrationsDeleteService, private readonly statusService: SuperadminIntegrationKeyStatusService) {}
/**
 * Primary Intent: Executes the create use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Handles the create mutation for the feature. */
  @ApiOperation({ summary: 'create integrations' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post(['superadmin/integrations', 'superadmin/integrations'])
    @HttpCode(HttpStatus.CREATED)
  @UseGuards(SuperadminCoreRateLimitGuard)
  @ApiResponse({ type: SuperadminIntegrationsResponseDto })
  @ApiOperation({ summary: 'create' })
    /**
     * Primary Intent: Executes the create use case within its owning backend boundary.
     * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
     * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
     * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
     */
    async create(@Body() body: SuperadminIntegrationsCreateDto): Promise<SuperadminIntegrationsResponseDto> { return (this.createService.createIntegrations(body)) as unknown as SuperadminIntegrationsResponseDto; }
/**
 * Primary Intent: Executes the update use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Handles the update mutation for the feature. */
  @ApiOperation({ summary: 'update integrations' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Patch(['superadmin/integrations/:id', 'superadmin/integrations/:id'])
  @UseGuards(SuperadminCoreRateLimitGuard)
  @ApiResponse({ type: SuperadminIntegrationsResponseDto })
  @ApiOperation({ summary: 'update' })
    /**
     * Primary Intent: Executes the update use case within its owning backend boundary.
     * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
     * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
     * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
     */
    async update(@Param('id') id: string, @Body() body: SuperadminIntegrationsUpdateDto): Promise<SuperadminIntegrationsResponseDto> { return (this.updateService.updateIntegrations(id, body)) as unknown as SuperadminIntegrationsResponseDto; }
/**
 * Primary Intent: Executes the remove use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Handles the remove mutation for the feature. */
  @ApiOperation({ summary: 'remove integrations' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Delete(['superadmin/integrations/:id', 'superadmin/integrations/:id'])
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
    async remove(@Param('id') id: string): Promise<void> { await this.deleteService.deleteIntegrations(id); }
/**
 * Primary Intent: Executes the changeStatus use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Handles the changeStatus mutation for the feature. */
  @ApiOperation({ summary: 'changeStatus integrations' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
@Patch(['superadmin/integrations/:id/status', 'superadmin/integrations/:id/status'])
    @UseGuards(SuperadminCoreRateLimitGuard)
  @ApiResponse({ type: SuperadminIntegrationsResponseDto })
  @ApiOperation({ summary: 'changeStatus' })
    /**
     * Primary Intent: Executes the changeStatus use case within its owning backend boundary.
     * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
     * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
     * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
     */
    async changeStatus(@Param('id') id: string, @Body() body: SuperadminIntegrationKeyStatusDto): Promise<SuperadminIntegrationsResponseDto> { return (this.statusService.changeIntegrationKeyStatus(id, body.status)) as unknown as SuperadminIntegrationsResponseDto; }

}
