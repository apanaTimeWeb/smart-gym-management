// RESPONSIBILITY: Records manual invoice payments after validating the frontend payment contract.
// FLOW: Controller -> InvoicesManualPaymentService -> InvoicesRepository -> PostgreSQL.
import { BadRequestException, Injectable } from '@nestjs/common';
import { InvoicesRepository } from '@/backend_superadmin/modules/superadmin/saas-billing/invoices/invoices.repository';
import { InvoicesManualPaymentDto } from '@/backend_superadmin/modules/superadmin/saas-billing/invoices/dtos/invoices-manual-payment.dto';

@Injectable()
export class InvoicesManualPaymentService {
  constructor(private readonly repository: InvoicesRepository) {}

  /** Records a manual payment with integer minor-unit amount and explicit ISO currency. */
  async recordManualPayment(body: InvoicesManualPaymentDto): Promise<unknown> {
    const tenantId = body.gymId.trim();
    const planName = body.planName.trim();
    if (!tenantId || !planName || body.amount <= 0) throw new BadRequestException({ error: 'VALIDATION_ERROR', errorCode: 'INVOICES.MANUAL_PAYMENT.INVALID', message: { key: 'saas-billing.ERRORS.VALIDATION_FAILED' } });
    return this.repository.createManualPaymentInvoice({ tenantId, tenantName: tenantId, amount: body.amount, currency: body.currency.toUpperCase(), planName });
  }
}