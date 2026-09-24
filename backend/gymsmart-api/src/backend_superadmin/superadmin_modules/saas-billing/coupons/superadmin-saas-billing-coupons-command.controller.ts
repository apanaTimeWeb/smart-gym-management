// RESPONSIBILITY: Owns HTTP transport for the coupons-command.controller controller surface; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning service -> canonical response envelope.
import { SuperadminSaasBillingCouponsStatusDto } from '@/backend_superadmin/superadmin_modules/saas-billing/coupons/coupons_dtos/superadmin-saas-billing-coupons-status.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequireIdempotencyKey } from '@/backend_superadmin/superadmin_core/superadmin_core_cache/superadmin-core-idempotency.decorator';
import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { SuperadminCoreJwtAuthGuard } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-jwt-auth.guard';
import { SuperadminCoreRolesGuard } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-auth.constants';
import { SuperadminCoreRateLimitGuard } from '@/backend_superadmin/superadmin_core/superadmin_core_cache/superadmin-core-rate-limit.guard';
import { SuperadminSaasBillingCouponsCreateService } from '@/backend_superadmin/superadmin_modules/saas-billing/coupons/coupons_services/superadmin-saas-billing-coupons-create.service';
import { SuperadminSaasBillingCouponsCreateDto } from '@/backend_superadmin/superadmin_modules/saas-billing/coupons/coupons_dtos/superadmin-saas-billing-coupons-create.dto';
import { SuperadminSaasBillingCouponsUpdateService } from '@/backend_superadmin/superadmin_modules/saas-billing/coupons/coupons_services/superadmin-saas-billing-coupons-update.service';
import { SuperadminSaasBillingCouponsUpdateDto } from '@/backend_superadmin/superadmin_modules/saas-billing/coupons/coupons_dtos/superadmin-saas-billing-coupons-update.dto';
import { SuperadminSaasBillingCouponsDeleteService } from '@/backend_superadmin/superadmin_modules/saas-billing/coupons/coupons_services/superadmin-saas-billing-coupons-delete.service';
import { SuperadminSaasBillingCouponsStatusService } from '@/backend_superadmin/superadmin_modules/saas-billing/coupons/coupons_services/superadmin-saas-billing-coupons-status.service';

/**
 * Primary Intent: Defines SuperadminSaasBillingCouponsCommandController as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@ApiTags('coupons')
@Controller('/superadmin/saas-billing/coupons')
@UseGuards(SuperadminCoreJwtAuthGuard, SuperadminCoreRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminSaasBillingCouponsCommandController {
  constructor(private readonly createService: SuperadminSaasBillingCouponsCreateService, private readonly updateService: SuperadminSaasBillingCouponsUpdateService, private readonly deleteService: SuperadminSaasBillingCouponsDeleteService, private readonly statusService: SuperadminSaasBillingCouponsStatusService) {}
/**
 * Primary Intent: Executes the create use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Handles the create mutation for the feature. */
  @ApiOperation({ summary: 'create coupons' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post()
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
    async create(@Body() body: SuperadminSaasBillingCouponsCreateDto): Promise<Awaited<ReturnType<SuperadminSaasBillingCouponsCreateService['createCoupons']>>> { return this.createService.createCoupons(body); }
/**
 * Primary Intent: Executes the update use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Handles the update mutation for the feature. */
  @ApiOperation({ summary: 'update coupons' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Patch(':id')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  @UseGuards(SuperadminCoreRateLimitGuard)
  @ApiOperation({ summary: 'update' })
    /**
     * Primary Intent: Executes the update use case within its owning backend boundary.
     * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
     * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
     * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
     */
    async update(@Param('id') id: string, @Body() body: SuperadminSaasBillingCouponsUpdateDto): Promise<Awaited<ReturnType<SuperadminSaasBillingCouponsUpdateService['updateCoupons']>>> { return this.updateService.updateCoupons(id, body); }
/**
 * Primary Intent: Executes the remove use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Handles the remove mutation for the feature. */
  @ApiOperation({ summary: 'remove coupons' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Delete(':id')
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
    async remove(@Param('id') id: string): Promise<void> { await this.deleteService.deleteCoupons(id); }
/**
 * Primary Intent: Executes the changeStatus use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Handles the changeStatus mutation for the feature. */
  @ApiOperation({ summary: 'changeStatus coupons' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
@Patch(':id/status')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
    @UseGuards(SuperadminCoreRateLimitGuard)
  @ApiOperation({ summary: 'changeStatus' })
    /**
     * Primary Intent: Executes the changeStatus use case within its owning backend boundary.
     * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
     * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
     * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
     */
    async changeStatus(@Param('id') id: string, @Body() body: SuperadminSaasBillingCouponsStatusDto): Promise<Awaited<ReturnType<SuperadminSaasBillingCouponsStatusService['changeCouponsStatus']>>> { return this.statusService.changeCouponsStatus(id, body.status); }

}
