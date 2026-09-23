// RESPONSIBILITY: Owns the dashboard gym-growth widget use case.
// FLOW: QueryController -> DashboardGrowthChartService -> DashboardRepository -> PostgreSQL.
import { Injectable } from '@nestjs/common';
import { DashboardRepository } from '@/backend_superadmin/modules/superadmin/dashboard/dashboard.repository';
import type { DashboardGrowthChartProjection, DashboardWidgetQuery } from '@/backend_superadmin/modules/superadmin/dashboard/types/dashboard.interfaces';

@Injectable()
export class DashboardGrowthChartService {
  constructor(private readonly repository: DashboardRepository) {}

  /** Returns new-gym points for the selected dashboard range. */
  async getGrowthChart(query: DashboardWidgetQuery = {}): Promise<DashboardGrowthChartProjection[]> {
    return this.repository.getDashboardGrowthChart(query);
  }
}
