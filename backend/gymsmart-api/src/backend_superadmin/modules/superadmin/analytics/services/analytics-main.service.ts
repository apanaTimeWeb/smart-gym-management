// RESPONSIBILITY: Reads the frontend contract state owned by this feature from PostgreSQL; no mock data is returned by the service.
// FLOW: Controller -> AnalyticsMainService -> AnalyticsRepository -> contract snapshot row -> canonical response interceptor.
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AnalyticsRepository } from '@/backend_superadmin/modules/backend_superadmin/analytics/analytics.repository';
import { AnalyticsResponseDto } from '@/backend_superadmin/modules/backend_superadmin/analytics/responses/analytics-response.dto';

@Injectable()
export class AnalyticsMainService {
  constructor(private readonly repository: AnalyticsRepository, private readonly config: ConfigService) {}

  /** Returns the latest persisted frontend contract payload for this use case. */
  async findAnalyticsData(input: Record<string, unknown> = {}): Promise<AnalyticsResponseDto> {
    return await this.repository.getLiveAnalytics(this.config.get<string>('app.defaultCurrency') ?? 'INR', input) as unknown as AnalyticsResponseDto;
  }
}