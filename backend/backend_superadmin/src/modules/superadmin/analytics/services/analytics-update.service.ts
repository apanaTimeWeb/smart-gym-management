// RESPONSIBILITY: Executes partial update business flow for the analytics feature.
// FLOW: CommandController -> AnalyticsUpdateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { AnalyticsRepository } from '@/modules/superadmin/analytics/analytics.repository';
import { AnalyticsMapper } from '@/modules/superadmin/analytics/analytics.mapper';
import type { AnalyticsDomainModel, AnalyticsUpdateInput } from '@/modules/superadmin/analytics/types/analytics.interfaces';
@Injectable()
export class AnalyticsUpdateService {
  constructor(private readonly repository: AnalyticsRepository) {}
  /** Updates a analytics record by UUID. */
  async updateAnalytics(id: string, input: AnalyticsUpdateInput): Promise<AnalyticsDomainModel> { return AnalyticsMapper.toDomain(await this.repository.updateAnalyticsById(id, input)); }
}
