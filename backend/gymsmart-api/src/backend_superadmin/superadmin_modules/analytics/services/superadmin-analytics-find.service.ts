// RESPONSIBILITY: Executes single-record retrieval for the analytics feature.
// FLOW: QueryController -> SuperadminAnalyticsFindService -> repository findByIdOrThrow -> mapper.
import { Injectable } from '@nestjs/common';
import { SuperadminAnalyticsRepository } from '@/backend_superadmin/superadmin_modules/analytics/superadmin-analytics.repository';
import { SuperadminAnalyticsMapper } from '@/backend_superadmin/superadmin_modules/analytics/superadmin-analytics.mapper';
import { SuperadminAnalyticsResponseDto } from '@/backend_superadmin/superadmin_modules/analytics/responses/superadmin-analytics-response.dto';
@Injectable()
export class SuperadminAnalyticsFindService {
  constructor(private readonly repository: SuperadminAnalyticsRepository) {}
  /** Retrieves one active analytics record by UUID. */
  async findAnalyticsById(id: string): Promise<SuperadminAnalyticsResponseDto> { return SuperadminAnalyticsMapper.toResponse(SuperadminAnalyticsMapper.toDomain(await this.repository.findByIdOrThrow(id))); }
}