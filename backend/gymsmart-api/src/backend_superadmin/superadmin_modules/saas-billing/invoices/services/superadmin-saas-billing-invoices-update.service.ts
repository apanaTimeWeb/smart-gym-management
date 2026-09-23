// RESPONSIBILITY: Executes partial update business flow for the invoices feature.
// FLOW: CommandController -> SuperadminInvoicesUpdateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { SuperadminInvoicesRepository } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/superadmin-saas-billing-invoices.repository';
import { SuperadminInvoicesMapper } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/superadmin-saas-billing-invoices.mapper';
import type { SuperadminInvoicesDomainModel, SuperadminInvoicesUpdateInput } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/types/superadmin-saas-billing-invoices.interfaces';
@Injectable()
export class SuperadminInvoicesUpdateService {
  constructor(private readonly repository: SuperadminInvoicesRepository) {}
  /** Updates a invoices record by UUID. */
  async updateInvoices(id: string, input: SuperadminInvoicesUpdateInput): Promise<SuperadminInvoicesDomainModel> { return SuperadminInvoicesMapper.toDomain(await this.repository.updateInvoicesById(id, input)); }
}