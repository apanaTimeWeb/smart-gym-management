// RESPONSIBILITY: Owns the dashboard gym-growth widget use case.
// FLOW: QueryController -> SuperadminDashboardGrowthChartService -> SuperadminDashboardRepository -> PostgreSQL.
import { Injectable } from '@nestjs/common';
import { SuperadminDashboardRepository } from '@/backend_superadmin/superadmin_modules/dashboard/superadmin-dashboard.repository';
import type { SuperadminDashboardGrowthChartProjection, SuperadminDashboardWidgetQuery } from '@/backend_superadmin/superadmin_modules/dashboard/types/superadmin-dashboard.interfaces';

@Injectable()
export class SuperadminDashboardGrowthChartService {
  constructor(private readonly repository: SuperadminDashboardRepository) {}

  /** Returns new-gym points for the selected dashboard range. */
  async getGrowthChart(query: SuperadminDashboardWidgetQuery = {}): Promise<SuperadminDashboardGrowthChartProjection[]> {
    return this.repository.getDashboardGrowthChart(query);
  }
}
