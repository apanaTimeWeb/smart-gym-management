// RESPONSIBILITY: Executes single-record retrieval for the invoices feature.
// FLOW: QueryController -> SuperadminInvoicesFindService -> repository findByIdOrThrow -> mapper.
import { Injectable } from '@nestjs/common';
import { SuperadminInvoicesRepository } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/superadmin-saas-billing-invoices.repository';
import { SuperadminInvoicesMapper } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/superadmin-saas-billing-invoices.mapper';
import type { SuperadminInvoicesDomainModel } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/types/superadmin-saas-billing-invoices.interfaces';
@Injectable()
export class SuperadminInvoicesFindService {
  constructor(private readonly repository: SuperadminInvoicesRepository) {}
  /** Retrieves one active invoices record by UUID. */
  async findInvoicesById(id: string): Promise<SuperadminInvoicesDomainModel> { return SuperadminInvoicesMapper.toDomain(await this.repository.findByIdOrThrow(id)); }
}