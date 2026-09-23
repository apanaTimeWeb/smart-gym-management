// RESPONSIBILITY: Executes creation business flow for the analytics feature.
// FLOW: CommandController -> AnalyticsCreateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { AnalyticsRepository } from '@/backend_superadmin/modules/superadmin/analytics/analytics.repository';
import { AnalyticsMapper } from '@/backend_superadmin/modules/superadmin/analytics/analytics.mapper';
import { AnalyticsResponseDto } from '@/backend_superadmin/modules/superadmin/analytics/responses/analytics-response.dto';
import type { AnalyticsCreateInput } from '@/backend_superadmin/modules/superadmin/analytics/types/analytics.interfaces';
@Injectable()
export class AnalyticsCreateService {
  constructor(private readonly repository: AnalyticsRepository) {}
  /** Creates a new analytics record. */
  async createAnalytics(input: AnalyticsCreateInput): Promise<AnalyticsResponseDto> { return AnalyticsMapper.toResponse(AnalyticsMapper.toDomain(await this.repository.createAnalytics(input))); }
}