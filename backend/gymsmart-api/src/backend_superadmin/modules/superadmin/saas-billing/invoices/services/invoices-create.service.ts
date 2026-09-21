// RESPONSIBILITY: Executes creation business flow for the invoices feature.
// FLOW: CommandController -> InvoicesCreateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { InvoicesRepository } from '@/backend_superadmin/modules/superadmin/saas-billing/invoices/invoices.repository';
import { InvoicesMapper } from '@/backend_superadmin/modules/superadmin/saas-billing/invoices/invoices.mapper';
import type { InvoicesCreateInput, InvoicesDomainModel } from '@/backend_superadmin/modules/superadmin/saas-billing/invoices/types/invoices.interfaces';
@Injectable()
export class InvoicesCreateService {
  constructor(private readonly repository: InvoicesRepository) {}
  /** Creates a new invoices record. */
  async createInvoices(input: InvoicesCreateInput): Promise<InvoicesDomainModel> { return InvoicesMapper.toDomain(await this.repository.createInvoices(input)); }
}
