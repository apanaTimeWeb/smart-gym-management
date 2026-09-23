// RESPONSIBILITY: Executes creation business flow for the invoices feature.
// FLOW: CommandController -> SuperadminInvoicesCreateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { SuperadminInvoicesRepository } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/superadmin-saas-billing-invoices.repository';
import { SuperadminInvoicesMapper } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/superadmin-saas-billing-invoices.mapper';
import type { SuperadminInvoicesCreateInput, SuperadminInvoicesDomainModel } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/types/superadmin-saas-billing-invoices.interfaces';
@Injectable()
export class SuperadminInvoicesCreateService {
  constructor(private readonly repository: SuperadminInvoicesRepository) {}
  /** Creates a new invoices record. */
  async createInvoices(input: SuperadminInvoicesCreateInput): Promise<SuperadminInvoicesDomainModel> { return SuperadminInvoicesMapper.toDomain(await this.repository.createInvoices(input)); }
}