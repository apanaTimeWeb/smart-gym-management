// RESPONSIBILITY: Executes paginated read logic for the analytics feature.
// FLOW: QueryController -> AnalyticsListService -> repository -> mapper -> response DTO.
import { Injectable } from '@nestjs/common';
import { AnalyticsRepository } from '@/backend_superadmin/modules/backend_superadmin/analytics/analytics.repository';
import { AnalyticsMapper } from '@/backend_superadmin/modules/backend_superadmin/analytics/analytics.mapper';
import { buildPaginationMeta } from '@/backend_superadmin/core/pagination/pagination.utils';
import { AnalyticsResponseDto } from '@/backend_superadmin/modules/backend_superadmin/analytics/responses/analytics-response.dto';
import type { AnalyticsListQuery } from '@/backend_superadmin/modules/backend_superadmin/analytics/types/analytics.interfaces';

@Injectable()
export class AnalyticsListService {
  constructor(private readonly repository: AnalyticsRepository) {}
  /** Returns a paginated collection using an allowlisted sort field. */
  async findAnalyticsPage(query: AnalyticsListQuery): Promise<{ data: AnalyticsResponseDto[]; meta: ReturnType<typeof buildPaginationMeta> }> {
    const result = await this.repository.findPage(query);
    return { data: result.items.map((e) => AnalyticsMapper.toResponse(AnalyticsMapper.toDomain(e))), meta: buildPaginationMeta(query.page, query.limit, result.total) };
  }
}