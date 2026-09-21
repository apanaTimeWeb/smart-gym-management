// RESPONSIBILITY: Executes creation business flow for the analytics feature.
// FLOW: CommandController -> AnalyticsCreateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { AnalyticsRepository } from '@/modules/superadmin/analytics/analytics.repository';
import { AnalyticsMapper } from '@/modules/superadmin/analytics/analytics.mapper';
import type { AnalyticsCreateInput } from '@/modules/superadmin/analytics/types/analytics.interfaces';
import { AnalyticsResponseDto } from '@/modules/superadmin/analytics/responses/analytics-response.dto';
@Injectable()
export class AnalyticsCreateService {
  constructor(private readonly repository: AnalyticsRepository) {}
  /** Creates a new analytics record. */
  async createAnalytics(input: AnalyticsCreateInput): Promise<AnalyticsResponseDto> { return AnalyticsMapper.toResponse(AnalyticsMapper.toDomain(await this.repository.createAnalytics(input))); }
}
