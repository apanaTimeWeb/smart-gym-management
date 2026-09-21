// RESPONSIBILITY: Reads the frontend contract state owned by this feature from PostgreSQL; no mock data is returned by the service.
// FLOW: Controller -> DashboardMetricsService -> DashboardRepository -> contract snapshot row -> canonical response interceptor.
import { Injectable, NotFoundException } from '@nestjs/common';
import { DashboardRepository } from '@/modules/superadmin/dashboard/dashboard.repository';
import { DASHBOARD_SNAPSHOT_KINDS } from '@/modules/superadmin/dashboard/dashboard.constants';

@Injectable()
export class DashboardMetricsService {
  constructor(private readonly repository: DashboardRepository) {}

  /** Returns the latest persisted frontend contract payload for this use case. */
  async findDashboardMetrics(input: Record<string, unknown> = {}): Promise<unknown> {
    void input;
    const payload = await this.repository.findLatestByKind(DASHBOARD_SNAPSHOT_KINDS.METRICS);
    if (payload === null) throw new NotFoundException('Contract state is not provisioned');
    return payload;
  }
}
