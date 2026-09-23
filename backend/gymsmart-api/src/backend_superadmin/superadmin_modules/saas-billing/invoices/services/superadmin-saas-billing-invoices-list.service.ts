// RESPONSIBILITY: Executes paginated read logic for the invoices feature.
// FLOW: QueryController -> SuperadminInvoicesListService -> repository -> mapper -> response DTO.
import { Injectable } from '@nestjs/common';
import { SuperadminInvoicesRepository } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/superadmin-saas-billing-invoices.repository';
import { SuperadminInvoicesMapper } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/superadmin-saas-billing-invoices.mapper';
import { buildPaginationMeta } from '@/backend_superadmin/superadmin_core/pagination/superadmin-core-pagination.utils';
import type { SuperadminInvoicesListQuery } from '@/backend_superadmin/superadmin_modules/saas-billing/invoices/types/superadmin-saas-billing-invoices.interfaces';

@Injectable()
export class SuperadminInvoicesListService {
  constructor(private readonly repository: SuperadminInvoicesRepository) {}
  /** Returns a paginated collection using an allowlisted sort field. */
  async findInvoicesPage(query: SuperadminInvoicesListQuery): Promise<{ data: ReturnType<typeof SuperadminInvoicesMapper['toDomain']>[]; meta: ReturnType<typeof buildPaginationMeta> }> {
    const result = await this.repository.findPage(query);
    return { data: SuperadminInvoicesMapper.toDomainList(result.items), meta: buildPaginationMeta(query.page, query.limit, result.total) };
  }
}