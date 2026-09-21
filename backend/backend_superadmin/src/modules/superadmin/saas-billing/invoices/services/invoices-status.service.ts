// RESPONSIBILITY: Performs status transitions for invoices records through the repository boundary.
// FLOW: CommandController -> StatusService -> named repository update -> domain mapper.
import { Injectable } from '@nestjs/common';
import { InvoicesRepository } from '@/modules/superadmin/saas-billing/invoices/invoices.repository';
import { InvoicesMapper } from '@/modules/superadmin/saas-billing/invoices/invoices.mapper';
import type { InvoicesDomainModel } from '@/modules/superadmin/saas-billing/invoices/types/invoices.interfaces';
@Injectable()
export class InvoicesStatusService {
  constructor(private readonly repository: InvoicesRepository) {}
  /** Changes a status value after controller-level role authorization. */
  async changeInvoicesStatus(id: string, status: string): Promise<InvoicesDomainModel> { return InvoicesMapper.toDomain(await this.repository.updateInvoicesById(id, { status })); }
}
