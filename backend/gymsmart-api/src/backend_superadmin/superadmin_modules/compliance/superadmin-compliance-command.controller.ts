// RESPONSIBILITY: Owns HTTP transport for the compliance-command.controller controller surface; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning service -> canonical response envelope.
import { RequireIdempotencyKey } from '@/backend_superadmin/superadmin_core/superadmin_core_cache/superadmin-core-idempotency.decorator';
import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuperadminCoreJwtAuthGuard } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-jwt-auth.guard';
import { SuperadminCoreRolesGuard } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-auth.constants';
import { SuperadminCoreRateLimitGuard } from '@/backend_superadmin/superadmin_core/superadmin_core_cache/superadmin-core-rate-limit.guard';
import { SuperadminComplianceCreateService } from '@/backend_superadmin/superadmin_modules/compliance/compliance_services/superadmin-compliance-create.service';
import { SuperadminComplianceCreateDto } from '@/backend_superadmin/superadmin_modules/compliance/compliance_dtos/superadmin-compliance-create.dto';
import { SuperadminComplianceUpdateService } from '@/backend_superadmin/superadmin_modules/compliance/compliance_services/superadmin-compliance-update.service';
import { SuperadminComplianceUpdateDto } from '@/backend_superadmin/superadmin_modules/compliance/compliance_dtos/superadmin-compliance-update.dto';
import { SuperadminComplianceDeleteService } from '@/backend_superadmin/superadmin_modules/compliance/compliance_services/superadmin-compliance-delete.service';
import { SuperadminComplianceResponseDto } from '@/backend_superadmin/superadmin_modules/compliance/compliance_responses/superadmin-compliance-response.dto';

/**
 * Primary Intent: Defines SuperadminComplianceCommandController as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@ApiTags('compliance')
@Controller()
@UseGuards(SuperadminCoreJwtAuthGuard, SuperadminCoreRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminComplianceCommandController {
  constructor(private readonly createService: SuperadminComplianceCreateService, private readonly updateService: SuperadminComplianceUpdateService, private readonly deleteService: SuperadminComplianceDeleteService) {}
/**
 * Primary Intent: Executes the create use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Handles the create mutation for the feature. */
  @ApiOperation({ summary: 'create compliance' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post(['superadmin/compliance', 'api/superadmin/compliance'])
    @HttpCode(HttpStatus.CREATED)
    @UseGuards(SuperadminCoreRateLimitGuard)
  @ApiResponse({ type: SuperadminComplianceResponseDto })
  @ApiOperation({ summary: 'create' })
    /**
     * Primary Intent: Executes the create use case within its owning backend boundary.
     * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
     * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
     * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
     */
    async create(@Body() body: SuperadminComplianceCreateDto): Promise<SuperadminComplianceResponseDto> { return this.createService.createCompliance(body); }
/**
 * Primary Intent: Executes the update use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Handles the update mutation for the feature. */
  @ApiOperation({ summary: 'update compliance' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Patch(['superadmin/compliance/:id', 'api/superadmin/compliance/:id'])
    @UseGuards(SuperadminCoreRateLimitGuard)
  @ApiResponse({ type: SuperadminComplianceResponseDto })
  @ApiOperation({ summary: 'update' })
    /**
     * Primary Intent: Executes the update use case within its owning backend boundary.
     * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
     * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
     * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
     */
    async update(@Param('id') id: string, @Body() body: SuperadminComplianceUpdateDto): Promise<SuperadminComplianceResponseDto> { return this.updateService.updateCompliance(id, body); }
/**
 * Primary Intent: Executes the remove use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Handles the remove mutation for the feature. */
  @ApiOperation({ summary: 'remove compliance' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
@Delete(['superadmin/compliance/:id', 'api/superadmin/compliance/:id'])
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
    async remove(@Param('id') id: string): Promise<void> { await this.deleteService.deleteCompliance(id); }

}
