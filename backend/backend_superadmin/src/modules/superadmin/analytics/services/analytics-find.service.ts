// RESPONSIBILITY: Executes single-record retrieval for the analytics feature.
// FLOW: QueryController -> AnalyticsFindService -> repository findByIdOrThrow -> mapper.
import { Injectable } from '@nestjs/common';
import { AnalyticsRepository } from '@/modules/superadmin/analytics/analytics.repository';
import { AnalyticsMapper } from '@/modules/superadmin/analytics/analytics.mapper';
import { AnalyticsResponseDto } from '@/modules/superadmin/analytics/responses/analytics-response.dto';
@Injectable()
export class AnalyticsFindService {
  constructor(private readonly repository: AnalyticsRepository) {}
  /** Retrieves one active analytics record by UUID. */
  async findAnalyticsById(id: string): Promise<AnalyticsResponseDto> { return AnalyticsMapper.toResponse(AnalyticsMapper.toDomain(await this.repository.findByIdOrThrow(id))); }
}
