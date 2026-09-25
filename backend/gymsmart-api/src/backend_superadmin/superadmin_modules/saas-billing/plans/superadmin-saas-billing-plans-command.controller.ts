// RESPONSIBILITY: Owns POST/PATCH/DELETE endpoints for the plans feature; business logic stays in micro-services.
// FLOW: HTTP mutation -> DTO -> use-case service -> named repository mutation -> canonical response interceptor.

import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequireIdempotencyKey } from '@/backend_superadmin/superadmin_core/superadmin_core_cache/superadmin-core-idempotency.decorator';
import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { SuperadminCoreJwtAuthGuard } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-jwt-auth.guard';
import { SuperadminCoreRolesGuard } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-auth.constants';
import { SuperadminCoreRateLimitGuard } from '@/backend_superadmin/superadmin_core/superadmin_core_cache/superadmin-core-rate-limit.guard';
import { SuperadminSaasBillingPlansCreateService } from '@/backend_superadmin/superadmin_modules/saas-billing/plans/plans_services/superadmin-saas-billing-plans-create.service';
import { SuperadminSaasBillingPlansCreateDto } from '@/backend_superadmin/superadmin_modules/saas-billing/plans/plans_dtos/superadmin-saas-billing-plans-create.dto';
import { SuperadminSaasBillingPlansUpdateService } from '@/backend_superadmin/superadmin_modules/saas-billing/plans/plans_services/superadmin-saas-billing-plans-update.service';
import { SuperadminSaasBillingPlansUpdateDto } from '@/backend_superadmin/superadmin_modules/saas-billing/plans/plans_dtos/superadmin-saas-billing-plans-update.dto';
import { SuperadminSaasBillingPlansDeleteService } from '@/backend_superadmin/superadmin_modules/saas-billing/plans/plans_services/superadmin-saas-billing-plans-delete.service';
import { SuperadminSaasBillingPlansArchiveService } from '@/backend_superadmin/superadmin_modules/saas-billing/plans/plans_services/superadmin-saas-billing-plans-archive.service';

/**
 * Primary Intent: Defines SuperadminSaasBillingPlansCommandController as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@ApiTags('plans')
@Controller()
@UseGuards(SuperadminCoreJwtAuthGuard, SuperadminCoreRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminSaasBillingPlansCommandController {
  constructor(private readonly createService: SuperadminSaasBillingPlansCreateService, private readonly updateService: SuperadminSaasBillingPlansUpdateService, private readonly deleteService: SuperadminSaasBillingPlansDeleteService, private readonly archiveService: SuperadminSaasBillingPlansArchiveService) {}
/**
 * Primary Intent: Executes the create use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Handles the create mutation for the feature. */
  @ApiOperation({ summary: 'create plans' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post(['superadmin/saas-billing/plans', 'superadmin/saas-billing/plans'])
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Successful response.' })
    @HttpCode(HttpStatus.CREATED)
  @UseGuards(SuperadminCoreRateLimitGuard)
  @ApiOperation({ summary: 'create' })
    /**
     * Primary Intent: Executes the create use case within its owning backend boundary.
     * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
     * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
     * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
     */
    async create(@Body() body: SuperadminSaasBillingPlansCreateDto): Promise<Awaited<ReturnType<SuperadminSaasBillingPlansCreateService['createPlans']>>> { return this.createService.createPlans(body); }
/**
 * Primary Intent: Executes the update use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Handles the update mutation for the feature. */
  @ApiOperation({ summary: 'update plans' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Patch(['superadmin/saas-billing/plans/:id', 'superadmin/saas-billing/plans/:id'])
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  @UseGuards(SuperadminCoreRateLimitGuard)
  @ApiOperation({ summary: 'update' })
    /**
     * Primary Intent: Executes the update use case within its owning backend boundary.
     * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
     * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
     * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
     */
    async update(@Param('id') id: string, @Body() body: SuperadminSaasBillingPlansUpdateDto): Promise<Awaited<ReturnType<SuperadminSaasBillingPlansUpdateService['updatePlans']>>> { return this.updateService.updatePlans(id, body); }
/**
 * Primary Intent: Executes the remove use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Handles the remove mutation for the feature. */
  @ApiOperation({ summary: 'remove plans' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Delete(['superadmin/saas-billing/plans/:id', 'superadmin/saas-billing/plans/:id'])
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
    async remove(@Param('id') id: string): Promise<void> { await this.deleteService.deletePlans(id); }
/**
 * Primary Intent: Executes the archive use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Archives a plan using the soft state transition required by the frontend. */
  @RequireIdempotencyKey()
  // SLA: STANDARD
@Patch(['superadmin/saas-billing/plans/:id/archive', 'superadmin/saas-billing/plans/:id/archive'])
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  @ApiOperation({ summary: 'archive' })
  /**
   * Primary Intent: Executes the archive use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async archive(@Param('id') id: string): Promise<Awaited<ReturnType<SuperadminSaasBillingPlansArchiveService['archive']>>> { return this.archiveService.archive(id); }

}
