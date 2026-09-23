// RESPONSIBILITY: Executes single-record retrieval for the invoices feature.
// FLOW: QueryController -> InvoicesFindService -> repository findByIdOrThrow -> mapper.
import { Injectable } from '@nestjs/common';
import { InvoicesRepository } from '@/backend_superadmin/modules/superadmin/saas-billing/invoices/invoices.repository';
import { InvoicesMapper } from '@/backend_superadmin/modules/superadmin/saas-billing/invoices/invoices.mapper';
import type { InvoicesDomainModel } from '@/backend_superadmin/modules/superadmin/saas-billing/invoices/types/invoices.interfaces';
@Injectable()
export class InvoicesFindService {
  constructor(private readonly repository: InvoicesRepository) {}
  /** Retrieves one active invoices record by UUID. */
  async findInvoicesById(id: string): Promise<InvoicesDomainModel> { return InvoicesMapper.toDomain(await this.repository.findByIdOrThrow(id)); }
}