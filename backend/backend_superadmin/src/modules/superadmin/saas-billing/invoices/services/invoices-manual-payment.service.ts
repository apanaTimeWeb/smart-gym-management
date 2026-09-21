// RESPONSIBILITY: Records a manual invoice payment against the invoice identified by the frontend contract.
// FLOW: Controller -> InvoicesManualPaymentService -> InvoicesRepository -> PostgreSQL.
import { BadRequestException, Injectable } from '@nestjs/common';
import { InvoicesRepository } from '@/modules/superadmin/saas-billing/invoices/invoices.repository';

@Injectable()
export class InvoicesManualPaymentService {
  constructor(private readonly repository: InvoicesRepository) {}
  /** Records a manual payment and returns the persisted invoice representation. */
  async recordManualPayment(body: Record<string, unknown>): Promise<unknown> {
    const tenantId = typeof body.gymId === 'string' ? body.gymId : '';
    const amount = Number(body.amount);
    if (!tenantId || !Number.isFinite(amount) || amount <= 0) throw new BadRequestException('gymId and positive amount are required');
    return this.repository.createManualPaymentInvoice({ tenantId, tenantName: typeof body.tenantName === 'string' ? body.tenantName : tenantId, amount, currency: typeof body.currency === 'string' ? body.currency : 'INR', planName: typeof body.planName === 'string' ? body.planName : 'Manual payment' });
  }
}
