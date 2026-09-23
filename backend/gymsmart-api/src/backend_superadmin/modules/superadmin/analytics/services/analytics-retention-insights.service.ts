// RESPONSIBILITY: Reads the frontend contract state owned by this feature from PostgreSQL; no mock data is returned by the service.
// FLOW: Controller -> AnalyticsRetentionInsightsService -> AnalyticsRepository -> contract snapshot row -> canonical response interceptor.
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AnalyticsRetentionInsightsResponseDto } from '@/backend_superadmin/modules/superadmin/analytics/analytics-retention-insights-response.dto';
import { AnalyticsRepository } from '@/backend_superadmin/modules/superadmin/analytics/analytics.repository';

@Injectable()
export class AnalyticsRetentionInsightsService {
  constructor(private readonly repository: AnalyticsRepository, private readonly config: ConfigService) {}

  /** Returns the latest persisted frontend contract payload for this use case. */
  async findAnalyticsRetentionInsights(input: Record<string, unknown> = {}): Promise<AnalyticsRetentionInsightsResponseDto> {
    return await this.repository.getLiveRetention(this.config.get<string>('app.defaultCurrency') ?? 'INR', input) as unknown as AnalyticsRetentionInsightsResponseDto;
  }
}