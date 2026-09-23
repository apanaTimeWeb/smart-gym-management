// RESPONSIBILITY: Performs status transitions for invoices records through the repository boundary.
// FLOW: CommandController -> StatusService -> named repository update -> domain mapper.
import { Injectable } from '@nestjs/common';
import { SuperadminInvoicesRepository } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/superadmin-saas-billing-invoices.repository';
import { SuperadminInvoicesMapper } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/superadmin-saas-billing-invoices.mapper';
import type { SuperadminInvoicesDomainModel } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/types/superadmin-saas-billing-invoices.interfaces';
@Injectable()
export class SuperadminInvoicesStatusService {
  constructor(private readonly repository: SuperadminInvoicesRepository) {}
  /** Changes a status value after controller-level role authorization. */
  async changeInvoicesStatus(id: string, status: string): Promise<SuperadminInvoicesDomainModel> { return SuperadminInvoicesMapper.toDomain(await this.repository.updateInvoicesById(id, { status })); }
}