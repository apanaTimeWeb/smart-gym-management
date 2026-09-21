// RESPONSIBILITY: Executes single-record retrieval for the analytics feature.
// FLOW: QueryController -> AnalyticsFindService -> repository findByIdOrThrow -> mapper.
import { Injectable } from '@nestjs/common';
import { AnalyticsRepository } from '@/modules/superadmin/analytics/analytics.repository';
import { AnalyticsMapper } from '@/modules/superadmin/analytics/analytics.mapper';
import type { AnalyticsDomainModel } from '@/modules/superadmin/analytics/types/analytics.interfaces';
@Injectable()
export class AnalyticsFindService {
  constructor(private readonly repository: AnalyticsRepository) {}
  /** Retrieves one active analytics record by UUID. */
  async findAnalyticsById(id: string): Promise<AnalyticsDomainModel> { return AnalyticsMapper.toDomain(await this.repository.findByIdOrThrow(id)); }
}
