// RESPONSIBILITY: Owns explicitly versioned/specialized frontend contract endpoints for the invoices feature.
// FLOW: HTTP -> specialized micro-service -> typed result -> canonical response interceptor.
import { RequireIdempotencyKey } from '@/core/cache/idempotency.decorator';
import type { InvoicesRecoveryCenterResponseDto } from '@/modules/superadmin/saas-billing/invoices/invoices-recovery-center-response.dto';
import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/core/auth/jwt-auth.guard';
import { RolesGuard } from '@/core/auth/roles.guard';
import { Roles } from '@/core/auth/roles.decorator';
import { SuperadminRole } from '@/core/auth/auth.types';
import { InvoicesManualPaymentService } from '@/modules/superadmin/saas-billing/invoices/services/invoices-manual-payment.service';
import { InvoicesRecoveryCenterService } from '@/modules/superadmin/saas-billing/invoices/services/invoices-recovery-center.service';
import { InvoicesResendService } from '@/modules/superadmin/saas-billing/invoices/services/invoices-resend.service';

@ApiTags('invoices-special')
@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SuperadminRole.SUPERADMIN)
export class InvoicesSpecialController {
  constructor(private readonly manualPaymentService: InvoicesManualPaymentService, private readonly recoveryCenterService: InvoicesRecoveryCenterService, private readonly resendService: InvoicesResendService) {}

  /** Executes POST /superadmin/saas-billing/invoices/manual-payment. */
  @RequireIdempotencyKey()
  @ApiOperation({ summary: 'POST /superadmin/saas-billing/invoices/manual-payment' })
  @Post('superadmin/saas-billing/invoices/manual-payment')
  async manualPayment(@Body() body: Record<string, unknown>): Promise<unknown> { return await this.manualPaymentService.recordManualPayment(body); }

  /** Executes GET /superadmin/saas-billing/invoices/recovery-center. */
  @ApiOperation({ summary: 'GET /superadmin/saas-billing/invoices/recovery-center' })
  @Get('superadmin/saas-billing/invoices/recovery-center')
  async recoveryCenter(@Query() query: Record<string, string>): Promise<unknown> { return await this.recoveryCenterService.findInvoicesRecoveryCenter(); }

  /** Executes POST /superadmin/saas-billing/invoices/:id/resend. */
  @RequireIdempotencyKey()
  @ApiOperation({ summary: 'POST /superadmin/saas-billing/invoices/:id/resend' })
  @Post('superadmin/saas-billing/invoices/:id/resend')
  async resend(@Param('id') id: string): Promise<null> { return await this.resendService.resendInvoice(id); }

}
