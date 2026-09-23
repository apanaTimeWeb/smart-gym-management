// RESPONSIBILITY: Owns the command HTTP transport for this feature; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/body -> owning micro-service -> canonical response envelope.

import { Controller, UseGuards, HttpStatus, Body, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { SuperadminJwtAuthGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-jwt-auth.guard';
import { SuperadminRolesGuard } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.guard';
import { Roles } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/superadmin_core/auth/superadmin-core-auth.types';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequireIdempotencyKey } from '@/backend_superadmin/superadmin_core/cache/superadmin-core-idempotency.decorator';
import { SuperadminInvoicesManualPaymentDto } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/dtos/superadmin-saas-billing-invoices-manual-payment.dto';
import { SuperadminInvoicesManualPaymentService } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/services/superadmin-saas-billing-invoices-manual-payment.service';
import { SuperadminInvoicesResendService } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/services/superadmin-saas-billing-invoices-resend.service';

@ApiTags('invoicesrecoverycommand')
@Controller()
@UseGuards(SuperadminJwtAuthGuard, SuperadminRolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class SuperadminInvoicesRecoveryCommandController {
  constructor(private readonly manualPaymentService: SuperadminInvoicesManualPaymentService, private readonly resendService: SuperadminInvoicesResendService) {}


  /** Executes POST /superadmin/saas-billing/invoices/manual-payment. */
  @ApiOperation({ summary: 'POST /superadmin/saas-billing/invoices/manual-payment' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post('superadmin/saas-billing/invoices/manual-payment')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async manualPayment(@Body() body: SuperadminInvoicesManualPaymentDto): Promise<unknown> { return await this.manualPaymentService.recordManualPayment(body); }


  /** Executes POST /superadmin/saas-billing/invoices/:id/resend. */
  @ApiOperation({ summary: 'POST /superadmin/saas-billing/invoices/:id/resend' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post('superadmin/saas-billing/invoices/:id/resend')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async resend(@Param('id') id: string): Promise<null> { return await this.resendService.resendInvoice(id); }

}