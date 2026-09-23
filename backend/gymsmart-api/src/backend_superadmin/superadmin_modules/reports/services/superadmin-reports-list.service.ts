// RESPONSIBILITY: Executes paginated read logic for the reports feature.
// FLOW: QueryController -> SuperadminReportsListService -> repository -> mapper -> response DTO.
import { Injectable } from '@nestjs/common';
import { SuperadminReportsRepository } from '@/backend_superadmin/superadmin_modules/reports/superadmin-reports.repository';
import { SuperadminReportsMapper } from '@/backend_superadmin/superadmin_modules/reports/superadmin-reports.mapper';
import { buildPaginationMeta } from '@/backend_superadmin/superadmin_core/pagination/superadmin-core-pagination.utils';
import type { SuperadminReportsListQuery } from '@/backend_superadmin/superadmin_modules/reports/types/superadmin-reports.interfaces';

@Injectable()
export class SuperadminReportsListService {
  constructor(private readonly repository: SuperadminReportsRepository) {}
  /** Returns a paginated collection using an allowlisted sort field. */
  async findReportsPage(query: SuperadminReportsListQuery): Promise<{ data: ReturnType<typeof SuperadminReportsMapper['toDomain']>[]; meta: ReturnType<typeof buildPaginationMeta> }> {
    const result = await this.repository.findPage(query);
    return { data: SuperadminReportsMapper.toDomainList(result.items), meta: buildPaginationMeta(query.page, query.limit, result.total) };
  }
}