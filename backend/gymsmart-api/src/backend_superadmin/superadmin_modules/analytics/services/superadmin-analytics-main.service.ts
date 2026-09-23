// RESPONSIBILITY: Reads the frontend contract state owned by this feature from PostgreSQL; no mock data is returned by the service.
// FLOW: Controller -> SuperadminAnalyticsMainService -> SuperadminAnalyticsRepository -> contract snapshot row -> canonical response interceptor.
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SuperadminAnalyticsRepository } from '@/backend_superadmin/superadmin_modules/analytics/superadmin-analytics.repository';
import { SuperadminAnalyticsResponseDto } from '@/backend_superadmin/superadmin_modules/analytics/responses/superadmin-analytics-response.dto';

@Injectable()
export class SuperadminAnalyticsMainService {
  constructor(private readonly repository: SuperadminAnalyticsRepository, private readonly config: ConfigService) {}

  /** Returns the latest persisted frontend contract payload for this use case. */
  async findAnalyticsData(input: Record<string, unknown> = {}): Promise<SuperadminAnalyticsResponseDto> {
    return await this.repository.getLiveAnalytics(this.config.get<string>('app.defaultCurrency') ?? 'INR', input) as unknown as SuperadminAnalyticsResponseDto;
  }
}