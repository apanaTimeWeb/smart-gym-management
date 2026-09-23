// RESPONSIBILITY: Reads the frontend contract state owned by this feature from PostgreSQL; no mock data is returned by the service.
// FLOW: Controller -> SuperadminAnalyticsRetentionInsightsService -> SuperadminAnalyticsRepository -> contract snapshot row -> canonical response interceptor.
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SuperadminAnalyticsRetentionInsightsResponseDto } from '@/backend_superadmin/superadmin_modules/analytics/superadmin-analytics-retention-insights-response.dto';
import { SuperadminAnalyticsRepository } from '@/backend_superadmin/superadmin_modules/analytics/superadmin-analytics.repository';

@Injectable()
export class SuperadminAnalyticsRetentionInsightsService {
  constructor(private readonly repository: SuperadminAnalyticsRepository, private readonly config: ConfigService) {}

  /** Returns the latest persisted frontend contract payload for this use case. */
  async findAnalyticsRetentionInsights(input: Record<string, unknown> = {}): Promise<SuperadminAnalyticsRetentionInsightsResponseDto> {
    return await this.repository.getLiveRetention(this.config.get<string>('app.defaultCurrency') ?? 'INR', input) as unknown as SuperadminAnalyticsRetentionInsightsResponseDto;
  }
}