// RESPONSIBILITY: Executes paginated read logic for the analytics feature.
// FLOW: QueryController -> SuperadminAnalyticsListService -> repository -> mapper -> response DTO.
import { Injectable } from '@nestjs/common';
import { SuperadminAnalyticsRepository } from '@/backend_superadmin/superadmin_modules/analytics/superadmin-analytics.repository';
import { SuperadminAnalyticsMapper } from '@/backend_superadmin/superadmin_modules/analytics/superadmin-analytics.mapper';
import { buildPaginationMeta } from '@/backend_superadmin/superadmin_core/pagination/superadmin-core-pagination.utils';
import { SuperadminAnalyticsResponseDto } from '@/backend_superadmin/superadmin_modules/analytics/responses/superadmin-analytics-response.dto';
import type { SuperadminAnalyticsListQuery } from '@/backend_superadmin/superadmin_modules/analytics/types/superadmin-analytics.interfaces';

@Injectable()
export class SuperadminAnalyticsListService {
  constructor(private readonly repository: SuperadminAnalyticsRepository) {}
  /** Returns a paginated collection using an allowlisted sort field. */
  async findAnalyticsPage(query: SuperadminAnalyticsListQuery): Promise<{ data: SuperadminAnalyticsResponseDto[]; meta: ReturnType<typeof buildPaginationMeta> }> {
    const result = await this.repository.findPage(query);
    return { data: result.items.map((e) => SuperadminAnalyticsMapper.toResponse(SuperadminAnalyticsMapper.toDomain(e))), meta: buildPaginationMeta(query.page, query.limit, result.total) };
  }
}