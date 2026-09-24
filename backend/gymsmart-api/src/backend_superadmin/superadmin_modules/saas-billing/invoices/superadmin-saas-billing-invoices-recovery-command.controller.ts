// RESPONSIBILITY: Owns the command HTTP transport for this feature; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/body -> owning micro-service -> canonical response envelope.

import { Controller, UseGuards, HttpCode, HttpStatus, Body, Param, Post, Res } from '@nestjs/common';
import { SuperadminCoreJwtAuthGuard } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-jwt-auth.guard';
import { SuperadminCoreRolesGuard } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/superadmin_core_auth/superadmin-core-auth.constants';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequireIdempotencyKey } from '@/backend_superadmin/superadmin_core/superadmin_core_cache/superadmin-core-idempotency.decorator';
import { SuperadminSaasBillingInvoicesManualPaymentDto } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/invoices_dtos/superadmin-saas-billing-invoices-manual-payment.dto';
import { SuperadminSaasBillingInvoicesManualPaymentOrchestratorService } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/invoices_services/superadmin-saas-billing-invoices-manual-payment-orchestrator.service';
import type { Response } from 'express';
import { SuperadminSaasBillingInvoicesResendService } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/invoices_services/superadmin-saas-billing-invoices-resend.service';

/**
 * Primary Intent: Defines SuperadminSaasBillingInvoicesRecoveryCommandController as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@ApiTags('invoicesrecoverycommand')
@Controller()
@UseGuards(SuperadminCoreJwtAuthGuard, SuperadminCoreRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminSaasBillingInvoicesRecoveryCommandController {
  constructor(private readonly manualPaymentService: SuperadminSaasBillingInvoicesManualPaymentOrchestratorService, private readonly resendService: SuperadminSaasBillingInvoicesResendService) {}
/**
 * Primary Intent: Executes the manualPayment use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Executes POST /superadmin/saas-billing/invoices/manual-payment. */
  @ApiOperation({ summary: 'POST /superadmin/saas-billing/invoices/manual-payment' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post('superadmin/saas-billing/invoices/manual-payment')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  @ApiOperation({ summary: 'manualPayment' })
  /**
   * Primary Intent: Executes the manualPayment use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async manualPayment(@Body() body: SuperadminSaasBillingInvoicesManualPaymentDto): Promise<Awaited<ReturnType<SuperadminSaasBillingInvoicesManualPaymentService['recordManualPayment']>>> { return await this.manualPaymentService.record(body); }
/**
 * Primary Intent: Executes the resend use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /** Executes POST /superadmin/saas-billing/invoices/:id/resend. */
  @ApiOperation({ summary: 'POST /superadmin/saas-billing/invoices/:id/resend' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
@Post('superadmin/saas-billing/invoices/:id/resend')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiResponse({ status: HttpStatus.ACCEPTED, description: 'Invoice resend queued. The Location header points to the durable job status resource; the canonical data payload remains null for frontend compatibility.' })
  @ApiOperation({ summary: 'resend' })
  /**
   * Primary Intent: Executes the resend use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  async resend(@Param('id') id: string, @Res({ passthrough: true }) response: Response): Promise<null> {
    const job = await this.resendService.resendInvoice(id);
    response.setHeader('Location', job.statusUrl);
    return null;
  }

}
