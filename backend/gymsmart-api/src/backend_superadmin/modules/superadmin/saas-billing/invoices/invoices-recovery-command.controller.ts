// RESPONSIBILITY: Owns the command HTTP transport for this feature; business logic remains outside the controller.
// FLOW: HTTP request -> DTO/body -> owning micro-service -> canonical response envelope.

import { Controller, UseGuards, HttpStatus, Body, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { JwtAuthGuard } from '@/backend_superadmin/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/backend_superadmin/core/auth/roles.guard';
import { Roles } from '@/backend_superadmin/core/auth/roles.decorator';
import { SuperadminRole } from '@/backend_superadmin/core/auth/auth.types';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequireIdempotencyKey } from '@/backend_superadmin/core/cache/idempotency.decorator';
import { InvoicesManualPaymentDto } from '@/backend_superadmin/modules/backend_superadmin/saas-billing/invoices/dtos/invoices-manual-payment.dto';
import { InvoicesManualPaymentService } from '@/backend_superadmin/modules/backend_superadmin/saas-billing/invoices/services/invoices-manual-payment.service';
import { InvoicesResendService } from '@/backend_superadmin/modules/backend_superadmin/saas-billing/invoices/services/invoices-resend.service';

@ApiTags('invoicesrecoverycommand')
@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class InvoicesRecoveryCommandController {
  constructor(private readonly manualPaymentService: InvoicesManualPaymentService, private readonly resendService: InvoicesResendService) {}


  /** Executes POST /superadmin/saas-billing/invoices/manual-payment. */
  @ApiOperation({ summary: 'POST /superadmin/saas-billing/invoices/manual-payment' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post('superadmin/saas-billing/invoices/manual-payment')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async manualPayment(@Body() body: InvoicesManualPaymentDto): Promise<unknown> { return await this.manualPaymentService.recordManualPayment(body); }


  /** Executes POST /superadmin/saas-billing/invoices/:id/resend. */
  @ApiOperation({ summary: 'POST /superadmin/saas-billing/invoices/:id/resend' })
  @RequireIdempotencyKey()
  // SLA: STANDARD
  @Post('superadmin/saas-billing/invoices/:id/resend')
  @ApiResponse({ status: HttpStatus.OK, description: 'Successful response.' })
  async resend(@Param('id') id: string): Promise<null> { return await this.resendService.resendInvoice(id); }

}