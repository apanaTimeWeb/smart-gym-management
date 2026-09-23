// RESPONSIBILITY: Executes the soft-delete flow for the invoices feature.
// FLOW: CommandController -> SuperadminInvoicesDeleteService -> repository named soft-delete -> audit hook.
import { Injectable } from '@nestjs/common';
import { SuperadminInvoicesRepository } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/superadmin-saas-billing-invoices.repository';
@Injectable()
export class SuperadminInvoicesDeleteService {
  constructor(private readonly repository: SuperadminInvoicesRepository) {}
  /** Soft-deletes one invoices record. */
  async deleteInvoices(id: string): Promise<null> { await this.repository.deleteInvoicesById(id); return null; }
}