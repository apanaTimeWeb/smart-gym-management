// RESPONSIBILITY: Executes paginated read logic for the invoices feature.
// FLOW: QueryController -> InvoicesListService -> repository -> mapper -> response DTO.
import { Injectable } from '@nestjs/common';
import { InvoicesRepository } from '@/backend_superadmin/modules/superadmin/saas-billing/invoices/invoices.repository';
import { InvoicesMapper } from '@/backend_superadmin/modules/superadmin/saas-billing/invoices/invoices.mapper';
import { buildPaginationMeta } from '@/backend_superadmin/core/pagination/pagination.utils';
import type { InvoicesListQuery } from '@/backend_superadmin/modules/superadmin/saas-billing/invoices/types/invoices.interfaces';

@Injectable()
export class InvoicesListService {
  constructor(private readonly repository: InvoicesRepository) {}
  /** Returns a paginated collection using an allowlisted sort field. */
  async findInvoicesPage(query: InvoicesListQuery): Promise<{ data: ReturnType<typeof InvoicesMapper['toDomain']>[]; meta: ReturnType<typeof buildPaginationMeta> }> {
    const result = await this.repository.findPage(query);
    return { data: InvoicesMapper.toDomainList(result.items), meta: buildPaginationMeta(query.page, query.limit, result.total) };
  }
}
