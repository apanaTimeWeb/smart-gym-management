// RESPONSIBILITY: Executes partial update business flow for the invoices feature.
// FLOW: CommandController -> InvoicesUpdateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { InvoicesRepository } from '@/backend_superadmin/modules/superadmin/saas-billing/invoices/invoices.repository';
import { InvoicesMapper } from '@/backend_superadmin/modules/superadmin/saas-billing/invoices/invoices.mapper';
import type { InvoicesDomainModel, InvoicesUpdateInput } from '@/backend_superadmin/modules/superadmin/saas-billing/invoices/types/invoices.interfaces';
@Injectable()
export class InvoicesUpdateService {
  constructor(private readonly repository: InvoicesRepository) {}
  /** Updates a invoices record by UUID. */
  async updateInvoices(id: string, input: InvoicesUpdateInput): Promise<InvoicesDomainModel> { return InvoicesMapper.toDomain(await this.repository.updateInvoicesById(id, input)); }
}