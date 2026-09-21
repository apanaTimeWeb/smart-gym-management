// RESPONSIBILITY: Executes paginated read logic for the reports feature.
// FLOW: QueryController -> ReportsListService -> repository -> mapper -> response DTO.
import { Injectable } from '@nestjs/common';
import { ReportsRepository } from '@/backend_superadmin/modules/superadmin/reports/reports.repository';
import { ReportsMapper } from '@/backend_superadmin/modules/superadmin/reports/reports.mapper';
import { buildPaginationMeta } from '@/backend_superadmin/core/pagination/pagination.utils';
import type { ReportsListQuery } from '@/backend_superadmin/modules/superadmin/reports/types/reports.interfaces';

@Injectable()
export class ReportsListService {
  constructor(private readonly repository: ReportsRepository) {}
  /** Returns a paginated collection using an allowlisted sort field. */
  async findReportsPage(query: ReportsListQuery): Promise<{ data: ReturnType<typeof ReportsMapper['toDomain']>[]; meta: ReturnType<typeof buildPaginationMeta> }> {
    const result = await this.repository.findPage(query);
    return { data: ReportsMapper.toDomainList(result.items), meta: buildPaginationMeta(query.page, query.limit, result.total) };
  }
}
