// RESPONSIBILITY: Executes paginated read logic for the dashboard feature.
// FLOW: QueryController -> DashboardListService -> repository -> mapper -> response DTO.
import { Injectable } from '@nestjs/common';
import { DashboardRepository } from '@/modules/superadmin/dashboard/dashboard.repository';
import { DashboardMapper } from '@/modules/superadmin/dashboard/dashboard.mapper';
import { buildPaginationMeta } from '@/core/pagination/pagination.utils';
import type { DashboardListQuery } from '@/modules/superadmin/dashboard/types/dashboard.interfaces';

@Injectable()
export class DashboardListService {
  constructor(private readonly repository: DashboardRepository) {}
  /** Returns a paginated collection using an allowlisted sort field. */
  async findDashboardPage(query: DashboardListQuery): Promise<{ data: ReturnType<typeof DashboardMapper['toDomain']>[]; meta: ReturnType<typeof buildPaginationMeta> }> {
    const result = await this.repository.findPage(query);
    return { data: DashboardMapper.toDomainList(result.items), meta: buildPaginationMeta(query.page, query.limit, result.total) };
  }
}
