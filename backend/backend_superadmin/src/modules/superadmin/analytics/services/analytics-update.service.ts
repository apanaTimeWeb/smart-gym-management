// RESPONSIBILITY: Executes partial update business flow for the analytics feature.
// FLOW: CommandController -> AnalyticsUpdateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { AnalyticsRepository } from '@/modules/superadmin/analytics/analytics.repository';
import { AnalyticsMapper } from '@/modules/superadmin/analytics/analytics.mapper';
import type { AnalyticsUpdateInput } from '@/modules/superadmin/analytics/types/analytics.interfaces';
import { AnalyticsResponseDto } from '@/modules/superadmin/analytics/responses/analytics-response.dto';
@Injectable()
export class AnalyticsUpdateService {
  constructor(private readonly repository: AnalyticsRepository) {}
  /** Updates a analytics record by UUID. */
  async updateAnalytics(id: string, input: AnalyticsUpdateInput): Promise<AnalyticsResponseDto> { return AnalyticsMapper.toResponse(AnalyticsMapper.toDomain(await this.repository.updateAnalyticsById(id, input))); }
}
