import { SuperadminSaasBillingInvoicesRecoveryCenterResponseDto } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/superadmin-saas-billing-invoices-recovery-center-response.dto';
// RESPONSIBILITY: Owns the query HTTP transport for this feature; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/query -> owning micro-service -> canonical response envelope.

import { Controller, UseGuards, HttpStatus, Body, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { SuperadminCoreJwtAuthGuard } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-jwt-auth.guard';
import { SuperadminCoreRolesGuard } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-auth.constants';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuperadminSaasBillingInvoicesRecoveryCenterService } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/invoices_services/superadmin-saas-billing-invoices-recovery-center.service';
import { SuperadminQueryDto } from '@/backend_superadmin/superadmin_core/superadmin_core_pagination/superadmin-query.dto';
import { SuperadminSaasBillingInvoicesResendJobRepository } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/invoices_repositories/superadmin-saas-billing-invoices-resend-job.repository';
import { SuperadminSaasBillingInvoicesResendJobStatusResponseDto } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/invoices_responses/superadmin-saas-billing-invoices-resend-job-status-response.dto';

/**
 * Primary Intent: Defines SuperadminSaasBillingInvoicesRecoveryQueryController as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@ApiTags('invoicesrecoveryquery')
@Controller()
@UseGuards(SuperadminCoreJwtAuthGuard, SuperadminCoreRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminSaasBillingInvoicesRecoveryQueryController {
  constructor(private readonly recoveryCenterService: SuperadminSaasBillingInvoicesRecoveryCenterService, private readonly resendJobs: SuperadminSaasBillingInvoicesResendJobRepository) {}
/**
 * Primary Intent: Executes the recoveryCenter use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Executes GET /superadmin/saas-billing/invoices/recovery-center. */
  // SLA: FAST
    @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  // SLA: FAST
@Get('superadmin/saas-billing/invoices/recovery-center')
  @Get('api/superadmin/saas-billing/invoices/recovery-center')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  @ApiOperation({ summary: 'recoveryCenter' })
  /**
   * Primary Intent: Executes the recoveryCenter use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async recoveryCenter(@Query() query: SuperadminQueryDto): Promise<SuperadminSaasBillingInvoicesRecoveryCenterResponseDto> { return await this.recoveryCenterService.findInvoicesRecoveryCenter({ query }); }
/**
 * Primary Intent: Executes the resendJobStatus use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Returns durable invoice resend status for the async communication lifecycle. */
  // SLA: FAST
  @Get('superadmin/saas-billing/invoices/resend-jobs/:jobId')
  @ApiResponse({ status: HttpStatus.OK, type: SuperadminSaasBillingInvoicesResendJobStatusResponseDto, description: 'Invoice resend job status.' })
  @ApiOperation({ summary: 'resendJobStatus' })
  /**
   * Primary Intent: Executes the resendJobStatus use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async resendJobStatus(@Param('jobId') jobId: string): Promise<SuperadminSaasBillingInvoicesResendJobStatusResponseDto> { return (await this.resendJobs.findByIdOrThrow(jobId)) as SuperadminSaasBillingInvoicesResendJobStatusResponseDto; }

}
