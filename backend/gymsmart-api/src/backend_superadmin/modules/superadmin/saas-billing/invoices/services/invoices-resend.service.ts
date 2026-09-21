// RESPONSIBILITY: Validates an invoice before queuing its communication resend intent.
// FLOW: Controller -> InvoicesResendService -> InvoicesRepository -> accepted async intent.
import { Injectable } from '@nestjs/common';
import { InvoicesRepository } from '@/backend_superadmin/modules/superadmin/saas-billing/invoices/invoices.repository';

@Injectable()
export class InvoicesResendService {
  constructor(private readonly repository: InvoicesRepository) {}
  /** Validates the invoice exists and returns the null payload required by the frontend contract. */
  async resendInvoice(id: string): Promise<null> { await this.repository.findByIdOrThrow(id); return null; }
}
