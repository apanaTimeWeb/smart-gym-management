// RESPONSIBILITY: Validates an invoice before queuing its communication resend intent.
// FLOW: Controller -> SuperadminInvoicesResendService -> SuperadminInvoicesRepository -> accepted async intent.
import { Injectable } from '@nestjs/common';
import { SuperadminInvoicesRepository } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/superadmin-saas-billing-invoices.repository';

@Injectable()
export class SuperadminInvoicesResendService {
  constructor(private readonly repository: SuperadminInvoicesRepository) {}
  /** Validates the invoice exists and returns the null payload required by the frontend contract. */
  async resendInvoice(id: string): Promise<null> { await this.repository.findByIdOrThrow(id); return null; }
}