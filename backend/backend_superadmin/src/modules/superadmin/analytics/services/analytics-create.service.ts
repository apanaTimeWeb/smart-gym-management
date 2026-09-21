// RESPONSIBILITY: Executes creation business flow for the analytics feature.
// FLOW: CommandController -> AnalyticsCreateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { AnalyticsRepository } from '@/modules/superadmin/analytics/analytics.repository';
import { AnalyticsMapper } from '@/modules/superadmin/analytics/analytics.mapper';
import type { AnalyticsCreateInput, AnalyticsDomainModel } from '@/modules/superadmin/analytics/types/analytics.interfaces';
@Injectable()
export class AnalyticsCreateService {
  constructor(private readonly repository: AnalyticsRepository) {}
  /** Creates a new analytics record. */
  async createAnalytics(input: AnalyticsCreateInput): Promise<AnalyticsDomainModel> { return AnalyticsMapper.toDomain(await this.repository.createAnalytics(input)); }
}
