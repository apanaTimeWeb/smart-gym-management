// RESPONSIBILITY: Reads the frontend contract state owned by this feature from PostgreSQL; no mock data is returned by the service.
// FLOW: Controller -> AnalyticsMainService -> AnalyticsRepository -> contract snapshot row -> canonical response interceptor.
import { Injectable, NotFoundException } from '@nestjs/common';
import { AnalyticsRepository } from '@/modules/superadmin/analytics/analytics.repository';
import { ANALYTICS_SNAPSHOT_KINDS } from '@/modules/superadmin/analytics/analytics.constants';

@Injectable()
export class AnalyticsMainService {
  constructor(private readonly repository: AnalyticsRepository) {}

  /** Returns the latest persisted frontend contract payload for this use case. */
  async findAnalyticsData(input: Record<string, unknown> = {}): Promise<unknown> {
    void input;
    const payload = await this.repository.findLatestByKind(ANALYTICS_SNAPSHOT_KINDS.MAIN);
    if (payload === null) throw new NotFoundException('Contract state is not provisioned');
    return payload;
  }
}
