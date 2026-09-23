// RESPONSIBILITY: Executes creation business flow for the analytics feature.
// FLOW: CommandController -> SuperadminAnalyticsCreateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { SuperadminAnalyticsRepository } from '@/backend_superadmin/superadmin_modules/analytics/superadmin-analytics.repository';
import { SuperadminAnalyticsMapper } from '@/backend_superadmin/superadmin_modules/analytics/superadmin-analytics.mapper';
import { SuperadminAnalyticsResponseDto } from '@/backend_superadmin/superadmin_modules/analytics/responses/superadmin-analytics-response.dto';
import type { SuperadminAnalyticsCreateInput } from '@/backend_superadmin/superadmin_modules/analytics/types/superadmin-analytics.interfaces';
@Injectable()
export class SuperadminAnalyticsCreateService {
  constructor(private readonly repository: SuperadminAnalyticsRepository) {}
  /** Creates a new analytics record. */
  async createAnalytics(input: SuperadminAnalyticsCreateInput): Promise<SuperadminAnalyticsResponseDto> { return SuperadminAnalyticsMapper.toResponse(SuperadminAnalyticsMapper.toDomain(await this.repository.createAnalytics(input))); }
}