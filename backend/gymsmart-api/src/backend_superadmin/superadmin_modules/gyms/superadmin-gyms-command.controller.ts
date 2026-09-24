// RESPONSIBILITY: Owns HTTP transport for the gyms-command.controller controller surface; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning service -> canonical response envelope.
import { RequireIdempotencyKey } from '@/backend_superadmin/superadmin_core/superadmin_core_cache/superadmin-core-idempotency.decorator';
import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuperadminCoreJwtAuthGuard } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-jwt-auth.guard';
import { SuperadminCoreRolesGuard } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-auth.constants';
import { SuperadminCoreRateLimitGuard } from '@/backend_superadmin/superadmin_core/superadmin_core_cache/superadmin-core-rate-limit.guard';
import { SuperadminGymsCreateService } from '@/backend_superadmin/superadmin_modules/gyms/gyms_services/superadmin-gyms-create.service';
import { SuperadminGymsCreateDto } from '@/backend_superadmin/superadmin_modules/gyms/gyms_dtos/superadmin-gyms-create.dto';
import { SuperadminGymsUpdateService } from '@/backend_superadmin/superadmin_modules/gyms/gyms_services/superadmin-gyms-update.service';
import { SuperadminGymsUpdateDto } from '@/backend_superadmin/superadmin_modules/gyms/gyms_dtos/superadmin-gyms-update.dto';
import { SuperadminGymsDeleteService } from '@/backend_superadmin/superadmin_modules/gyms/gyms_services/superadmin-gyms-delete.service';
import { SuperadminGymsStatusService } from '@/backend_superadmin/superadmin_modules/gyms/gyms_services/superadmin-gyms-status.service';
import { SuperadminGymsProvisionService } from '@/backend_superadmin/superadmin_modules/gyms/gyms_services/superadmin-gyms-provision.service';
import { SuperadminGymsProvisionDto } from '@/backend_superadmin/superadmin_modules/gyms/gyms_dtos/superadmin-gyms-provision.dto';
import { SuperadminGymsOwnerEmailDto } from '@/backend_superadmin/superadmin_modules/gyms/gyms_dtos/superadmin-gyms-owner-email.dto';
import { SuperadminGymsStatusDto } from '@/backend_superadmin/superadmin_modules/gyms/gyms_dtos/superadmin-gyms-status.dto';
import { SuperadminGymsResponseDto } from '@/backend_superadmin/superadmin_modules/gyms/gyms_responses/superadmin-gyms-response.dto';

/**
 * Primary Intent: Defines SuperadminGymsCommandController as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@ApiTags('gyms')
@Controller('/superadmin/gyms')
@UseGuards(SuperadminCoreJwtAuthGuard, SuperadminCoreRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminGymsCommandController {
  constructor(private readonly createService: SuperadminGymsCreateService, private readonly updateService: SuperadminGymsUpdateService, private readonly deleteService: SuperadminGymsDeleteService, private readonly statusService: SuperadminGymsStatusService, private readonly provisionService: SuperadminGymsProvisionService) {}
/**
 * Primary Intent: Executes the create use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Handles the create mutation for the feature. */
  @ApiOperation({ summary: 'create gyms' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
@Post()
    @HttpCode(HttpStatus.CREATED)
  @UseGuards(SuperadminCoreRateLimitGuard)
  @ApiResponse({ type: SuperadminGymsResponseDto })
  @ApiOperation({ summary: 'create' })
    /**
     * Primary Intent: Executes the create use case within its owning backend boundary.
     * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
     * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
     * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
     */
    async create(@Body() body: SuperadminGymsCreateDto): Promise<SuperadminGymsResponseDto> { return (this.createService.createGyms(body)) as unknown as SuperadminGymsResponseDto; }
/**
 * Primary Intent: Executes the provision use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Provisions a new isolated tenant using client-owned fields only. */
  // SLA: STANDARD

  // SLA: STANDARD
  @Post('/provision')
  @RequireIdempotencyKey()
  @UseGuards(SuperadminCoreRateLimitGuard)
  @ApiResponse({ type: SuperadminGymsResponseDto })
  @ApiOperation({ summary: 'provision' })
  /**
   * Primary Intent: Executes the provision use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async provision(@Body() body: SuperadminGymsProvisionDto): Promise<SuperadminGymsResponseDto> { return (this.provisionService.provisionGym(body)) as unknown as SuperadminGymsResponseDto; }
/**
 * Primary Intent: Executes the update use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Handles the update mutation for the feature. */
  // SLA: STANDARD
  @Patch(':id')
  @RequireIdempotencyKey()
  @UseGuards(SuperadminCoreRateLimitGuard)
  @ApiResponse({ type: SuperadminGymsResponseDto })
  @ApiOperation({ summary: 'update' })
    /**
     * Primary Intent: Executes the update use case within its owning backend boundary.
     * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
     * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
     * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
     */
    async update(@Param('id') id: string, @Body() body: SuperadminGymsUpdateDto): Promise<SuperadminGymsResponseDto> { return (this.updateService.updateGyms(id, body)) as unknown as SuperadminGymsResponseDto; }
/**
 * Primary Intent: Executes the remove use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Handles the remove mutation for the feature. */
  // SLA: STANDARD
  @Delete(':id')
  @RequireIdempotencyKey()
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
    async remove(@Param('id') id: string): Promise<void> { await this.deleteService.deleteGyms(id); }
/**
 * Primary Intent: Executes the changeStatus use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Handles the changeStatus mutation for the feature. */
  @ApiOperation({ summary: 'changeStatus gyms' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
@Patch(':id/status')
    @UseGuards(SuperadminCoreRateLimitGuard)
  @ApiResponse({ type: SuperadminGymsResponseDto })
  @ApiOperation({ summary: 'changeStatus' })
    /**
     * Primary Intent: Executes the changeStatus use case within its owning backend boundary.
     * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
     * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
     * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
     */
    async changeStatus(@Param('id') id: string, @Body() body: SuperadminGymsStatusDto): Promise<SuperadminGymsResponseDto> { return (this.statusService.changeGymsStatus(id, body.status)) as unknown as SuperadminGymsResponseDto; }

}
