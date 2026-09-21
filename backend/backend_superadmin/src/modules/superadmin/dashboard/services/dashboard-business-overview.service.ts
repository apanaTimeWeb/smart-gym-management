// RESPONSIBILITY: Reads the frontend contract state owned by this feature from PostgreSQL; no mock data is returned by the service.
// FLOW: Controller -> DashboardBusinessOverviewService -> DashboardRepository -> contract snapshot row -> canonical response interceptor.
import { Injectable, NotFoundException } from '@nestjs/common';
import type { DashboardBusinessOverviewResponseDto } from '@/modules/superadmin/dashboard/dashboard-business-overview-response.dto';
import { DashboardRepository } from '@/modules/superadmin/dashboard/dashboard.repository';
import { DASHBOARD_SNAPSHOT_KINDS } from '@/modules/superadmin/dashboard/dashboard.constants';

@Injectable()
export class DashboardBusinessOverviewService {
  constructor(private readonly repository: DashboardRepository) {}

  /** Returns the latest persisted frontend contract payload for this use case. */
  async findDashboardBusinessOverview(input: Record<string, unknown> = {}): Promise<DashboardBusinessOverviewResponseDto> {
    void input;
    const payload = await this.repository.findLatestByKind(DASHBOARD_SNAPSHOT_KINDS.BUSINESS_OVERVIEW);
    if (payload === null) throw new NotFoundException('Contract state is not provisioned');
    return payload as DashboardBusinessOverviewResponseDto;
  }
}
