// RESPONSIBILITY: Executes partial update business flow for the analytics feature.
// FLOW: CommandController -> SuperadminAnalyticsUpdateService -> named repository mutation -> mapper.
import { Injectable } from '@nestjs/common';
import { SuperadminAnalyticsRepository } from '@/backend_superadmin/superadmin_modules/analytics/superadmin-analytics.repository';
import { SuperadminAnalyticsMapper } from '@/backend_superadmin/superadmin_modules/analytics/superadmin-analytics.mapper';
import { SuperadminAnalyticsResponseDto } from '@/backend_superadmin/superadmin_modules/analytics/responses/superadmin-analytics-response.dto';
import type { SuperadminAnalyticsUpdateInput } from '@/backend_superadmin/superadmin_modules/analytics/types/superadmin-analytics.interfaces';
@Injectable()
export class SuperadminAnalyticsUpdateService {
  constructor(private readonly repository: SuperadminAnalyticsRepository) {}
  /** Updates a analytics record by UUID. */
  async updateAnalytics(id: string, input: SuperadminAnalyticsUpdateInput): Promise<SuperadminAnalyticsResponseDto> { return SuperadminAnalyticsMapper.toResponse(SuperadminAnalyticsMapper.toDomain(await this.repository.updateAnalyticsById(id, input))); }
}