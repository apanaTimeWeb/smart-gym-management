// RESPONSIBILITY: Executes the soft-delete flow for the invoices feature.
// FLOW: CommandController -> InvoicesDeleteService -> repository named soft-delete -> audit hook.
import { Injectable } from '@nestjs/common';
import { InvoicesRepository } from '@/backend_superadmin/modules/superadmin/saas-billing/invoices/invoices.repository';
@Injectable()
export class InvoicesDeleteService {
  constructor(private readonly repository: InvoicesRepository) {}
  /** Soft-deletes one invoices record. */
  async deleteInvoices(id: string): Promise<null> { await this.repository.deleteInvoicesById(id); return null; }
}
