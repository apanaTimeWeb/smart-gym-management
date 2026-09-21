// RESPONSIBILITY: Executes paginated read logic for the analytics feature.
// FLOW: QueryController -> AnalyticsListService -> repository -> mapper -> response DTO.
import { Injectable } from '@nestjs/common';
import { AnalyticsRepository } from '@/modules/superadmin/analytics/analytics.repository';
import { AnalyticsMapper } from '@/modules/superadmin/analytics/analytics.mapper';
import { buildPaginationMeta } from '@/core/pagination/pagination.utils';
import type { AnalyticsListQuery } from '@/modules/superadmin/analytics/types/analytics.interfaces';

@Injectable()
export class AnalyticsListService {
  constructor(private readonly repository: AnalyticsRepository) {}
  /** Returns a paginated collection using an allowlisted sort field. */
  async findAnalyticsPage(query: AnalyticsListQuery): Promise<{ data: ReturnType<typeof AnalyticsMapper['toDomain']>[]; meta: ReturnType<typeof buildPaginationMeta> }> {
    const result = await this.repository.findPage(query);
    return { data: AnalyticsMapper.toDomainList(result.items), meta: buildPaginationMeta(query.page, query.limit, result.total) };
  }
}
