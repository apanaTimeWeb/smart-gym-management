// RESPONSIBILITY: Reads the frontend contract state owned by this feature from PostgreSQL; no mock data is returned by the service.
// FLOW: Controller -> AnalyticsRetentionInsightsService -> AnalyticsRepository -> contract snapshot row -> canonical response interceptor.
import { Injectable, NotFoundException } from '@nestjs/common';
import { AnalyticsRetentionInsightsResponseDto } from '@/backend_superadmin/modules/superadmin/analytics/analytics-retention-insights-response.dto';
import { AnalyticsRepository } from '@/backend_superadmin/modules/superadmin/analytics/analytics.repository';
import { ANALYTICS_SNAPSHOT_KINDS } from '@/backend_superadmin/modules/superadmin/analytics/analytics.constants';

@Injectable()
export class AnalyticsRetentionInsightsService {
  constructor(private readonly repository: AnalyticsRepository) {}

  /** Returns the latest persisted frontend contract payload for this use case. */
  async findAnalyticsRetentionInsights(input: Record<string, unknown> = {}): Promise<AnalyticsRetentionInsightsResponseDto> {
    void input;
    const payload = await this.repository.findLatestByKind(ANALYTICS_SNAPSHOT_KINDS.RETENTION_INSIGHTS);
    if (payload === null) throw new NotFoundException('Contract state is not provisioned');
    return payload as unknown as AnalyticsRetentionInsightsResponseDto;
  }
}
