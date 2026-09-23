// RESPONSIBILITY: Records manual invoice payments after validating the frontend payment contract.
// FLOW: Controller -> SuperadminInvoicesManualPaymentService -> SuperadminInvoicesRepository -> PostgreSQL.
import { BadRequestException, Injectable } from '@nestjs/common';
import { SuperadminInvoicesRepository } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/superadmin-saas-billing-invoices.repository';
import { SuperadminInvoicesManualPaymentDto } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/dtos/superadmin-saas-billing-invoices-manual-payment.dto';

@Injectable()
export class SuperadminInvoicesManualPaymentService {
  constructor(private readonly repository: SuperadminInvoicesRepository) {}

  /** Records a manual payment with integer minor-unit amount and explicit ISO currency. */
  async recordManualPayment(body: SuperadminInvoicesManualPaymentDto): Promise<unknown> {
    const tenantId = body.gymId.trim();
    const planName = body.planName.trim();
    if (!tenantId || !planName || body.amount <= 0) throw new BadRequestException({ error: 'VALIDATION_ERROR', errorCode: 'INVOICES.MANUAL_PAYMENT.INVALID', message: { key: 'saas-billing.ERRORS.VALIDATION_FAILED' } });
    return this.repository.createManualPaymentInvoice({ tenantId, tenantName: tenantId, amount: body.amount, currency: body.currency.toUpperCase(), planName });
  }
}